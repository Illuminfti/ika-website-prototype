---
name: copy-suite
description: |
  Complete copywriting skill suite covering 6 content formats plus anti-AI humanizer.
  Master routing skill that directs to the right format based on the request.
  Formats: social copy, thread copy, long-form social, conversion copy, web copy,
  articles/blog/newsletter. Each format has a complete workflow, templates, and
  deep reference research. Load this skill first, then load the matching format.
---

# Copy Suite - Master Router

## Format Selection

When a copy request comes in, identify the format and load the matching file:

| Request Type | Load This Format | Examples |
|-------------|-----------------|----------|
| Single tweet, short post, hook, one-liner | `formats/social-copy.md` | "Write a tweet about X," "Create a hook for X" |
| Tweet thread, multi-part narrative | `formats/thread-copy.md` | "Write a thread about X," "Create a 10-tweet breakdown" |
| Long social post, essay-style, thought leadership | `formats/long-form.md` | "Write a LinkedIn post about X," "Long-form take on X" |
| Sales page, email sequence, ad copy, CTA, popup | `formats/conversion-copy.md` | "Write the sales page," "Create an email sequence" |
| Landing page, product page, about page, pricing, hero | `formats/web-copy.md` | "Write the landing page copy," "Rewrite our hero section" |
| Article, blog post, newsletter | `formats/articles-blog.md` | "Write an article about X," "Newsletter edition on X" |

## Post-Writing: Humanizer Pass

After drafting any piece, run it through `humanizer.md` as a quality gate. This catches AI patterns your editorial instinct might miss. Especially important for:
- Long-form content (more surface area for AI patterns to sneak in)
- First drafts in a new voice (before calibration is tight)
- Conversion copy (where template-sounding language is most tempting)

## Deep Reference

Each format has a corresponding research file in `references/`:
- `references/social-copy-research.md` - 2200+ lines: hook science, viral patterns, master creator analysis, humor guide
- `references/thread-copy-research.md` - 2300+ lines: thread architecture, creator analysis, mega-thread templates
- `references/long-form-research.md` - 1800+ lines: storytelling frameworks, LinkedIn algorithm, master writers
- `references/conversion-copy-research.md` - 450+ lines: email templates, emotional triggers, split testing
- `references/web-copy-research.md` - 800+ lines: psychological principles, section templates, expert patterns
- `references/articles-blog-research.md` - 670+ lines: article blueprints, SEO checklist, newsletter templates

Load a reference file when the format skill doesn't cover your specific need, or when you want deeper examples and pattern analysis.

## Workflow (Every Piece)

1. **Identify format** - Use the table above
2. **Load format skill** - Read the matching file
3. **Name the one job** - 5 words or fewer
4. **Draft** - Follow the format's workflow
5. **Humanizer pass** - Run through humanizer.md
6. **Quality gate** - Run the 6-point check (see Quality Gate section below)
7. **Deliver** - In chat, publish-ready

## Quality Gate (Quick Reference)

1. One Job Test - Can you name the job in 5 words?
2. AI Pattern Scan - Does any phrase feel like ChatGPT?
3. Voice Test - One person talking to one person?
4. Read Aloud Test - Where does the mouth stumble?
5. Cut Test - Can any sentence be removed without losing meaning?
6. Resonance Test - Would the reader share this because they felt something?
