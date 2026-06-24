# EVINIE — Social Media App (Frontend Prototype)

A complete, high-fidelity mobile social-app frontend. **Connect. Earn. Grow.**
Built mobile-first (430×932), thumb-first, human-centric — brand orange `#FF6A01`, Plus Jakarta Sans.

> Interactive HTML/CSS/JS prototype — no backend. All data is mocked; every screen is navigable.

## ✨ Features (56 screens)

- **Auth** — Splash · Onboarding · Login · Register · OTP · Profile Setup · Forgot Password
- **Home** — News feed, stories, post composer, reactions, announcements, inline widgets
- **Create** — Post · Poll · Story (center FAB → create sheet)
- **Discover** — Search, trending hashtags, suggested people, who's online, contact suggestions, profile views
- **Notifications** — Filtered alerts (likes, comments, mentions, friend requests, eGifts, wallet, system…)
- **Profile** — Own / others' profiles, stats, tabs, Edit Profile (settings, 2FA, notification toggles)
- **Messages** — Conversation list, 1:1 chat, group chat (voice notes, images, typing)
- **Marketplace** — Browse, product detail, checkout (wallet), order confirmation, sell/manage products
- **Wallet** — Balance, UserPoints, fund (Paystack/Flutterwave), cashout, transaction history
- **eGifts** — Send gifts, manage sent/received
- **Verification** — Get verified flow
- **Ads** — Campaigns, create ad, analytics, boost post
- **Groups · Polls · Events · Blogs · Videos** — Browse, detail, create flows

## ▶️ Run locally

```bash
node server.mjs
# open http://localhost:8000/
```

A tiny zero-dependency static server (Node ≥ 18). The app is a single page; deep-link any screen with `#scr-<id>` (e.g. `http://localhost:8000/#scr-wallet`).

## 🛠️ Project structure

`index.html` is a **generated** build — do not edit it directly.

| File | Purpose |
|---|---|
| `shell.html` | Template: design system (CSS), app shell, JS router, auth + home screens |
| `build/*.html` | Feature screen fragments (one per module) + `_drawer.html`, `_sheets.html` |
| `build/assemble.mjs` | Injects fragments into `shell.html` → writes `index.html` |
| `CONTRACT.md` | Design-system contract used to build the screens |
| `index.html` | **Built output** (served) |
| `server.mjs` | Static dev server (port 8000) |

### Rebuild after editing sources
```bash
node build/assemble.mjs
```

## 🎨 Design system

- **Brand:** `#FF6A01` (gradient `#FF8A2B → #FF6A01`)
- **Font:** Plus Jakarta Sans
- **Frame:** 430 × 932 (mobile)
- **Buttons:** 48px tall, 16px bold · **Body:** 13–14px · balanced weights (headings ~700)
- Reusable components: buttons, inputs, cards, chips, segmented tabs, post cards, stories, sheets, drawer, toasts

---
Built with [Claude Code](https://claude.com/claude-code).
