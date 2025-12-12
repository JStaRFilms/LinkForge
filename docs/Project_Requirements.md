# LinkForge — Project Requirements Document (PRD)

## Project Overview

**Project Name:** LinkForge  
**Mission:** One link. Infinite possibilities. A self-hosted link-in-bio tool that YOU control — custom domain, analytics, themes, no monthly fees.

**The Vibe:** Premium, fast, mobile-first. A Linktree killer that's free and self-owned.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 15 (App Router) |
| Database | Prisma + SQLite (swappable to Postgres) |
| Styling | Tailwind CSS v4 |
| Auth | NextAuth.js (optional for v1) |
| Deploy | Vercel |

---

## Design Principles

1. **Mobile-First** — 90% of bio link clicks come from phones
2. **Performance** — Target < 2s load time
3. **Premium Aesthetics** — Not a generic template; inspired by Linktree, Bento.me, Read.cv
4. **Self-Hosted Freedom** — No vendor lock-in, no monthly fees

---

## Functional Requirements

| Requirement ID | Description | User Story | Expected Behavior / Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| FR-001 | Link Dashboard | As a user, I want to manage my links (add, edit, delete, reorder), so that I can keep my bio page updated. | CRUD operations for links with drag-and-drop reordering. Dashboard at `/dashboard`. | MUS |
| FR-002 | Public Profile Page | As a visitor, I want to view a user's link-in-bio page, so that I can access their links. | Shareable page at `/{username}` displaying profile info and links. | MUS |
| FR-003 | Theme System | As a user, I want to choose from 2-3 themes (light, dark, custom), so that my page reflects my brand. | Theme selector in dashboard; themes applied to public profile. | MUS |
| FR-004 | Click Analytics | As a user, I want to track how many times each link is clicked, so that I can measure engagement. | Click counts stored per link; basic stats displayed in dashboard. | MUS |
| FR-005 | Custom Domains | As a user, I want to use my own domain, so that my bio link looks professional. | CNAME setup flow; domain verified and routed to profile. | Future |
| FR-006 | Social Icons | As a user, I want to add social media icons, so that visitors can find me elsewhere. | Icon picker in dashboard; icons displayed on public profile. | Future |
| FR-007 | Newsletter Embed | As a user, I want to embed a newsletter signup form, so that I can grow my email list. | Embed code input; form rendered on public profile. | Future |
| FR-008 | Multiple Profiles | As a user, I want to create multiple bio pages, so that I can have separate pages for different brands. | Profile switcher in dashboard; unique slugs per profile. | Future |

---

## Non-Functional Requirements

| Requirement ID | Description | Target |
| :--- | :--- | :--- |
| NFR-001 | Page Load Time | < 2 seconds (LCP) |
| NFR-002 | Mobile Responsiveness | 100% usable on mobile viewports |
| NFR-003 | Accessibility | WCAG 2.1 AA compliance |
| NFR-004 | SEO | Proper meta tags, Open Graph, Twitter Cards |

---

## Design Inspiration

| Source | What to Steal |
| :--- | :--- |
| [Linktree](https://linktr.ee) | Simplicity, brand recognition |
| [Bento.me](https://bento.me) | Beautiful cards, layout flexibility |
| [Read.cv](https://read.cv) | Clean typography, premium feel |

---

## Success Metrics (MUS)

- [ ] User can add, edit, delete, and reorder links
- [ ] Public profile renders at `/{username}`
- [ ] At least 3 themes available
- [ ] Click counts tracked and displayed

---

## Out of Scope (v1)

- User authentication (public-only first)
- Custom domains
- Social icons
- Newsletter embed
- Multiple profiles

These are marked as `Future` in the FR table and will be addressed post-MUS.
