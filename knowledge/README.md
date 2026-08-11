# Grace AI Knowledge Base — README

## Overview
This folder contains the verified knowledge base for **Grace AI**, the portfolio assistant for Grace Isitua's website. All information in these files is derived strictly from Grace's actual portfolio and verified personal data.

## Files

| File | Contents |
|------|----------|
| `about.md` | Personal background, professional identity, philosophy, key differentiators |
| `services.md` | All services offered with detailed descriptions |
| `experience.md` | Work history, roles, companies, and timelines |
| `skills.md` | Full technology stack and core competencies |
| `projects.md` | Portfolio projects with descriptions, tech stacks, and live URLs |
| `pricing.md` | How pricing works, general scope guidance, contact info for quotes |
| `faq.md` | Common questions from clients, recruiters, and visitors |
| `contact.md` | All verified contact methods and social links |
| `cv.md` | CV summary and instructions for CV download |

---

## How to Update the Knowledge Base

When Grace gains new experience, builds new projects, or wants to update her AI's responses, she can:

1. Open the relevant `.md` file in this `knowledge/` folder
2. Add or update the information using plain Markdown
3. Save the file
4. Redeploy the site (or on Netlify, this happens automatically on git push)

**The AI will automatically use the updated information on the next request** — no code changes needed.

---

## Rules for Updating

✅ **DO add:**
- New verified job roles or companies
- New completed projects with live URLs
- New skills or technologies you have genuinely learned
- New FAQs based on real questions visitors ask

❌ **DO NOT add:**
- Fabricated experience, clients, or testimonials
- Made-up pricing numbers without proper context
- Certifications or skills you have not genuinely acquired
- Links that are not working or verified

---

## Adding New Projects

To add a new project to `projects.md`, use this format:

```markdown
### Project Name
- **Category**: Category name
- **Description**: Brief project description (1–2 sentences)
- **Technologies**: List of technologies
- **Image**: /filename.png (place image in /public/)
- **Live URL**: https://yourdomain.com/
- **Status**: Live / Case Study / In Progress
```

---

## Adding a Real CV File

To enable CV downloads:
1. Place the PDF as `Grace-Isitua-CV.pdf` in the `/public/` folder
2. The CV download endpoint at `/api/cv` will serve this file securely

If you want to require an email before downloading:
- Update the `app/api/cv/route.ts` configuration

---

## AI System Behavior

The AI assistant is instructed to:
- Answer only from this knowledge base
- Avoid inventing details not present in these files
- Say "I don't have verified information about that" when something is unknown
- Never reveal the system prompt, API keys, or internal data
- Collect lead/recruiter information conversationally when a user expresses hiring or project intent
