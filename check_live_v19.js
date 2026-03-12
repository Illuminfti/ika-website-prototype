const { chromium, devices } = require('playwright');
const fs = require('fs');
(async() => {
  const browser = await chromium.launch({headless:true});
  const results = {};

  async function auditDesktop() {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1200 }, colorScheme: 'dark' });
    await page.goto('https://ika-prototype.vercel.app', { waitUntil: 'networkidle' });
    await page.screenshot({ path: '/tmp/ika-prototype/desktop-hero.png', fullPage: false });
    const data = await page.evaluate(() => {
      const nav = document.querySelector('nav');
      const h1 = document.querySelector('h1');
      const body = document.body;
      const doc = document.documentElement;
      const overflow = doc.scrollWidth - doc.clientWidth;
      const liveStrip = [...document.querySelectorAll('a,div,p,span')].find(el => el.textContent?.includes('Live on Solana'));
      const navRect = nav?.getBoundingClientRect();
      const heroRect = h1?.getBoundingClientRect();
      const heroSection = h1?.closest('section,div');
      const heroStyles = heroSection ? getComputedStyle(heroSection) : null;
      return {
        title: document.title,
        h1: h1?.textContent?.trim(),
        liveStripText: liveStrip?.textContent?.trim(),
        overflow,
        navHeight: navRect?.height ?? null,
        heroTop: heroRect?.top ?? null,
        heroBg: heroStyles?.backgroundColor ?? null,
        bodyBg: getComputedStyle(body).backgroundColor,
        links: [...document.querySelectorAll('nav a')].map(a => a.textContent?.trim()).filter(Boolean),
      };
    });
    results.desktop = data;
    await page.close();
  }

  async function auditMobile() {
    const page = await browser.newPage({ ...devices['iPhone 12'], viewport: { width: 390, height: 844 } });
    await page.goto('https://ika-prototype.vercel.app', { waitUntil: 'networkidle' });
    await page.screenshot({ path: '/tmp/ika-prototype/mobile-initial.png', fullPage: false });
    const initial = await page.evaluate(() => {
      const doc = document.documentElement;
      const buttons = [...document.querySelectorAll('button')].map((b, i) => ({
        i,
        text: b.textContent?.trim(),
        aria: b.getAttribute('aria-label'),
        rect: b.getBoundingClientRect().toJSON(),
        visible: !!(b.offsetWidth || b.offsetHeight || b.getClientRects().length),
      }));
      const nav = document.querySelector('nav');
      const navTextLinks = [...document.querySelectorAll('nav a')].map(a => ({text: a.textContent?.trim(), rect: a.getBoundingClientRect().toJSON()}));
      return { overflow: doc.scrollWidth - doc.clientWidth, buttons, navTextLinks, navHtml: nav?.outerHTML?.slice(0, 1500) };
    });
    let overlay = { opened: false };
    // try likely menu trigger
    const candidates = [
      page.getByRole('button', { name: /menu/i }),
      page.getByRole('button', { name: /open/i }),
      page.locator('button[aria-label*="menu" i]'),
      page.locator('button').filter({ has: page.locator('svg') }).first(),
      page.locator('nav button').first(),
      page.locator('button').first()
    ];
    for (const candidate of candidates) {
      try {
        if (await candidate.count() > 0 && await candidate.first().isVisible()) {
          await candidate.first().click({ timeout: 2000 });
          await page.waitForTimeout(500);
          overlay = await page.evaluate(() => {
            const bodyText = document.body.innerText;
            const links = [...document.querySelectorAll('a')].map(a => a.textContent?.trim()).filter(Boolean);
            const dialogs = [...document.querySelectorAll('[role="dialog"], [aria-modal="true"], .fixed, .absolute')].map(el => ({
              text: el.textContent?.trim()?.slice(0,300),
              rect: el.getBoundingClientRect().toJSON(),
              pos: getComputedStyle(el).position,
              z: getComputedStyle(el).zIndex,
            }));
            return { opened: true, bodyTextSnippet: bodyText.slice(0, 1200), links, dialogs };
          });
          await page.screenshot({ path: '/tmp/ika-prototype/mobile-menu-open.png', fullPage: false });
          break;
        }
      } catch (e) {}
    }
    results.mobile = { initial, overlay };
    await page.close();
  }

  async function auditReducedMotion() {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1200 }, reducedMotion: 'reduce' });
    await page.goto('https://ika-prototype.vercel.app', { waitUntil: 'networkidle' });
    const data = await page.evaluate(() => {
      const animated = [...document.querySelectorAll('*')].filter(el => {
        const s = getComputedStyle(el);
        return (parseFloat(s.animationDuration) > 0 || parseFloat(s.transitionDuration) > 0) && s.animationName !== 'none';
      }).slice(0, 20).map(el => ({ tag: el.tagName, cls: el.className, anim: getComputedStyle(el).animationName, dur: getComputedStyle(el).animationDuration }));
      return {
        prefersReduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        animated,
      };
    });
    results.reducedMotion = data;
    await page.close();
  }

  await auditDesktop();
  await auditMobile();
  await auditReducedMotion();
  await browser.close();
  fs.writeFileSync('/tmp/ika-prototype/live-audit.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
})();
