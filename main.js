/* ═══════════════════════════════════════════
   IKA — Shared JavaScript
═══════════════════════════════════════════ */

const prefersRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMob = () => window.innerWidth < 768;

/* ─── NAV SCROLL ─── */
(function(){
  const nav = document.querySelector('.nav');
  if(!nav) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if(!ticking){
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }, {passive:true});
})();

/* ─── MOBILE NAV ─── */
(function(){
  const tog = document.getElementById('navToggle');
  const mob = document.getElementById('mobileNav');
  if(!tog || !mob) return;

  function toggleMenu(){
    const open = !mob.classList.contains('open');
    tog.classList.toggle('active', open);
    mob.classList.toggle('open', open);
    tog.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  tog.addEventListener('click', toggleMenu);
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if(mob.classList.contains('open')) toggleMenu();
  }));
  tog.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggleMenu(); }
  });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape' && mob.classList.contains('open')) toggleMenu();
  });
})();

/* ─── ACTIVE NAV LINK ─── */
(function(){
  const path = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(a => {
    const href = a.getAttribute('href');
    if(href && !href.startsWith('#') && !href.startsWith('http')){
      const linkPath = href.replace(/\/$/, '').replace(/\.html$/, '');
      if(path === linkPath || path.endsWith(linkPath)){
        a.classList.add('active');
      }
    }
  });
})();

/* ─── GSAP INIT ─── */
function initGSAP(){
  if(typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined'){
    document.querySelectorAll('.reveal,.word').forEach(el => {
      el.style.opacity = '1'; el.style.transform = 'none';
    });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // Reveals — with distinct choreography per element type
  gsap.utils.toArray('.reveal').forEach(el => {
    if(el.closest('.hero') || el.closest('.hero-entrance')) return;
    const isTag = el.classList.contains('tag');
    const startY = isTag ? 12 : 28;
    gsap.set(el, {opacity:0, y:startY});
    ScrollTrigger.create({
      trigger: el,
      start: 'top 87%',
      once: true,
      onEnter: () => {
        const d = parseFloat((el.className.match(/rd-(\d)/) || [])[1] || 0) * .1;
        const dur = isTag ? .5 : .75;
        gsap.to(el, {opacity:1, y:0, duration:dur, delay:d, ease:'power3.out'});
      }
    });
  });

  // Word reveals
  document.querySelectorAll('.char-reveal').forEach(el => {
    if(el.closest('.hero') || el.closest('.hero-entrance')) return;
    const html = el.innerHTML;
    const plain = html.replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim();
    el.setAttribute('aria-label', plain);
    el.innerHTML = '';
    const nodes = [];
    html.split(/(<br\s*\/?>)/gi).forEach(part => {
      if(part.match(/<br\s*\/?>/i)){ el.appendChild(document.createElement('br')); return; }
      part.split(/(\s+)/).forEach(tok => {
        const sp = document.createElement('span');
        if(/^\s+$/.test(tok)){ sp.className = 'word-space'; sp.innerHTML = '&nbsp;'; }
        else if(tok){ sp.className = 'word'; sp.textContent = tok; sp.setAttribute('aria-hidden','true'); sp.style.opacity = '0'; sp.style.transform = 'translateY(14px)'; nodes.push(sp); }
        el.appendChild(sp);
      });
    });
    gsap.to(nodes, {
      opacity:1, y:0, stagger:.04, duration:.5, ease:'power3.out',
      scrollTrigger:{trigger:el, start:'top 85%', toggleActions:'play none none none'}
    });
    ScrollTrigger.create({
      trigger:el, start:'top 93%', once:true,
      onEnter:() => {
        setTimeout(() => {
          nodes.forEach(n => {
            if(parseFloat(getComputedStyle(n).opacity) < .5){
              n.style.opacity = '1'; n.style.transform = 'none';
            }
          });
        }, 900);
      }
    });
  });
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', () => setTimeout(initGSAP, 80));
} else {
  setTimeout(initGSAP, 80);
}
