# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: the AI/Presale team at ЦТиП (a small internal team, currently the only users). Confirmed potential future expansion to the whole company, but this is undecided/unscheduled — the product must not assume it, and the current design target is the small internal team.

## Product Purpose

DIGTP is an internal Wiki/documentation platform for the team, forked from Docmost (open-source Confluence/Notion alternative). It exists to hold team knowledge and documentation. There is an explicit, confirmed intent to grow it into a CRM (deals, clients, pipeline) later — the current build should leave room structurally for that, without building CRM functionality now.

## Positioning

An internal-only tool for ЦТиП. Confirmed: it will never be exposed outside ЦТиП — no external/public-facing use case exists or is planned.

## Operating Context

Self-hosted via Docker on internal infrastructure (not cloud-hosted SaaS). Accessed by team members through the browser. Currently backed by the stock Docmost feature set: pages/wiki content, spaces, comments, search, page permissions, sharing.

## Capabilities and Constraints

- Existing codebase: React + Vite + Mantine UI (component library), forked from docmost/docmost (AGPL 3.0 core). Not greenfield — stack is not up for reconsideration.
- CRM functionality (deals, clients, pipeline) does not exist yet in the codebase. It is a confirmed future direction, not a current requirement — navigation/IA should not foreclose it, but no CRM screens should be invented now.
- The forked `ee/` (Enterprise Edition) source tree exists but its licensed features are not available (no license); the UI for those was already stripped of "upgrade to paid" messaging in prior work — a redesign should keep that gating intact, not restore paid-feature promotion.

## Brand Commitments

Binding as of 2026-08-27: the ЦТиП "AI Team Book" brandbook (`/Users/shmulev/Documents/ЦТиП/Projects_Orca/brandbook/ai_team_book.html`) is the authoritative design system — the "Bento" system. Confirmed and adopted:
- Name: "DIGTP".
- Palette: warm neutral ground (`--bg` #F5F6F4 light / `--ink` #171B18 dark), mint green accent (`--mint` #1E9E62, `--mint-soft` #34C77B, `--deep` #0E7A46, `--mint-tint` #F1F8F3).
- Type: Manrope (body/UI), IBM Plex Mono (eyebrows, labels, tabular data).
- Component language: pill-shaped (999px radius) nav/active states — mint-tint background + deep-green text in light mode, not a solid fill; 22/16/12px radii on tiles; soft layered shadows.
- **The app must render both of its own light/dark themes in this system** (the user was explicit: light theme fully light with green/black accents, dark theme fully dark with green/white accents — never a fixed dark block that ignores the app's own theme toggle). The brandbook itself only shows a light mode; the dark-mode counterpart was derived in-session (theme.ts's `--shell-*` dark tokens) in the same spirit, not copied from the source file.
- Supersedes the earlier ad-hoc "em-700 #0A6E5C" palette from an even earlier session pass — that palette is retired in favor of the brandbook's mint.

## Evidence on Hand

No user research, testimonials, or usage data exists — this is a brand-new internal rollout to a small team. Nothing here should be fabricated for the design.

## Product Principles

1. Small internal team today — design for a handful of daily users doing real work, not a marketed audience.
2. Wiki-first, CRM-ready — the primary job right now is documentation/knowledge; don't design CRM screens, but don't paint the IA into a corner either.
3. Internal tool, not a storefront — utility, clarity, and day-to-day usability outrank persuasive/marketing polish.
4. Full creative freedom on visual identity — no legacy brand equity to protect; the redesign can replace name treatment, color, and visual language wholesale if it serves the product better.
