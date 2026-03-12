# IKA-104 Hero Tone Mini-Spec

## Goal
Kill the remaining "red blob" read in the hero without losing the Solana launch framing or the cross-chain signing position.

## Recommended announcement strip copy

### Option A
**Live on Solana. Native signing for Bitcoin, Ethereum, and more →**
- Strongest option
- Keeps launch signal
- Immediately explains what is live and why it matters

### Option B
**Now live on Solana. Cross-chain signing without bridge custody →**
- Good if we want the trustless angle first
- Slightly more technical and colder

### Option C
**Solana is live. Your app can now sign across chains natively →**
- Clear and direct
- Slightly less premium in cadence than A

## Winner
**Option A**

Reason: it keeps the launch framing but upgrades the strip from generic announcement energy into product signal. It reads cleaner than "the first trustless signing network" and ties directly into the hero promise.

## Exact hero accent rules

### 1) Left text field stays near-black
- Keep the entire left copy column visually calm
- No pink haze, glow, bloom, or ambient wash behind headline, tagline, subcopy, or proof cards
- Background behind the text should read as near-black with only extremely subtle cool depth
- If any atmospheric lift is needed on the left, use a faint blue-black or graphite treatment only, never pink/magenta

### 2) Localize energy inside and to the right of the signing panel
- Accent energy should live **inside the hero visual shell** and spill only slightly beyond its right edge
- Brightest concentration belongs around the programmable signing core, connection lines, and right-side cards
- The glow should feel like contained system energy, not a background blob
- Keep the left half of the hero at least one full visual step darker than the right half

### 3) Ban broad pink/magenta haze
- No full-width coral wash
- No center-screen magenta cloud
- No radial bloom large enough to tint the headline area
- If coral is used, it should appear as a precise accent, not the dominant atmosphere

### 4) Preferred accent mix
- Base atmosphere: deep black, graphite, very dark navy
- Structural highlight: icy blue / electric blue
- Secondary premium contrast: restrained violet
- Coral/pink: only for focused product accents or CTA emphasis

### 5) Practical visual read
The hero should feel like:
- left side = authority, clarity, control
- right side = contained signing energy and system motion

Not:
- left side = marketing glow
- whole hero = pink fog with text on top

## Primary CTA recommendation
**Yes, reduce the pink dominance slightly, but do not remove brand identity.**

Recommendation:
- Keep the primary CTA as the warmest accent in the text column
- Desaturate the fill a touch or darken it slightly so it feels premium rather than candy-bright
- Let hover/focus states carry more of the vivid coral energy than the resting state
- Maintain clear hierarchy over the secondary CTA, but avoid letting the button become the loudest object on first glance

Practical rule:
- The eye should go **headline → signing panel → CTA**
- Not **CTA first because the pink is shouting**

## Premium tone while preserving the product position
We still need the page to say:
- this is live on Solana
- this is native cross-chain signing
- this is programmable infrastructure for agents/apps moving capital across chains

To preserve that without losing taste:
- Keep the copy sharp and infrastructure-grade, not slogan-heavy
- Make the visual drama come from the signing system illustration, not from background color mass
- Treat interoperability as a control-layer capability, not a rainbow multichain ad
- Show cross-chain reach through the node/signing composition and the copy, while keeping the palette disciplined

## Direct implementation handoff
1. Replace the announcement strip copy with **Option A**.
2. Rework `.hero-glow` so it is tighter, right-biased, and unable to tint the left text field.
3. Ensure any supporting bloom is clipped to the visual shell or heavily biased to the shell interior/right side.
4. Keep headline and subcopy sitting on clean near-black.
5. Tone the primary CTA down one notch in resting state while preserving strong hover energy.
6. Re-check the hero at desktop width first. The fix succeeds only if the first read is "premium cross-chain infra" rather than "pink blob".

## Proof
Workspace artifact: `/tmp/ika-prototype/IKA-104-HERO-TONE-MINI-SPEC.md`
