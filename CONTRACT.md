# EVINIE — Screen Build Contract (READ FIRST)

You build **HTML screen fragments** for a mobile social app prototype. They drop into an existing
shell (`index.html`) that already loads Tailwind CDN + FontAwesome 6.5 + Plus Jakarta Sans and
defines ALL the CSS classes below. **Do NOT** write `<html>`, `<head>`, `<style>`, `<script>`,
Tailwind config, or redefine any class. Reuse the classes. Inline `style="..."` is allowed for
one-off layout (the shell itself does this freely).

## HOW YOU OUTPUT
- You will be told an exact output file path. Use the **Write** tool to create that file.
- The file contains ONLY `<section class="screen" ...>...</section>` blocks (one per screen),
  concatenated. No wrapper, no comments needed beyond a leading `<!-- module -->` line.
- Use real Unsplash image URLs (`https://images.unsplash.com/photo-XXXX?w=400&q=80`) and
  realistic mock data (Bangladeshi/Nigerian names, ₦ or numbers). Currency in spec is ₦ (Naira).

## SCREEN TEMPLATE (every screen is one of these)
```html
<section class="screen" id="scr-NAME"
         data-topbar="app|back|none" data-nav="show|hide"
         data-tab="home|discover|notifications|profile" data-title="Header Title">
   ... content ...
</section>
```
- `data-topbar="app"` → persistent EVINIE top bar (use for the 4 tab roots only).
- `data-topbar="back"` → persistent back-arrow bar; put the page title in `data-title`. **Use this
  for almost every sub-screen** (detail/form/list pages) so users can go back.
- `data-topbar="none"` → screen renders its own header (chat, viewers, fullscreen).
- `data-nav="show"` → bottom nav visible (tab roots + screens that conceptually keep the nav).
  Most sub-screens use `data-nav="hide"`.
- Only the 4 tab roots set `data-tab`.

## NAVIGATION API (use in onclick)
- `App.go('scr-id')` — push to a screen.
- `App.back()` — go back.
- `App.tab('scr-id')` — switch bottom-nav tab (resets stack). Tab roots: `scr-home`,
  `scr-discover`, `scr-notifications`, `scr-profile`.
- `App.openSheet('sheet-id')` / `App.closeSheet()` — bottom sheet.
- `App.openDrawer()` — side menu.
- `App.toast('Message')` — transient confirmation. Use for any action without a destination
  (Save, Send, Like, Submit, Buy, etc.). NEVER leave a button dead — every button does something.

## DESIGN TOKENS (already defined; reference, don't redefine)
- Font: Plus Jakarta Sans (default). Brand: amber gradient `var(--brand-grad)` = `#E19201→#BB8013`.
- Text: `--ink` #1C1917 (primary), `--ink-2` #57534E (secondary), `--ink-3` #A8A29E (muted),
  `--line` #EFECE8 (hairline), `--bg` #F6F4F1 (canvas), `--surface` #fff.
- Status: `--ok` green, `--warn` amber, `--danger` red, `--info` cyan.
- Body text = 12–14px. Headings bold. Buttons = 48px tall, 16px bold. Radius ~14–18px.
- Generous spacing, no clutter, thumb-first (primary actions at bottom).

## COMPONENT CATALOG (copy these patterns)

**Layout helpers:** `.pad` (16px padding), `.stack` (12px gap between children),
`.card` + `.card-p`, `.divider`, `.section-title` (uppercase label), `.empty` (empty state).

**Buttons** (always include a real onclick):
```html
<button class="btn btn-primary" onclick="App.toast('Done')">Primary</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-dark">Dark</button>
<button class="btn btn-success">Green</button>
<button class="btn-sm btn-soft">Small soft pill</button>   <!-- btn-sm = auto width 40px -->
```

**Form field:**
```html
<div class="field">
  <label class="label">Email Address</label>
  <input class="input" type="email" placeholder="you@email.com">
</div>
<textarea class="input" placeholder="..."></textarea>
<select class="input"><option>One</option></select>
<div class="seg"><button class="active">A</button><button>B</button></div>  <!-- segmented toggle -->
```

**Card / list row:**
```html
<div class="card">
  <div class="list-row"><i class="fa-solid fa-wallet" style="color:var(--brand)"></i>
    <div style="flex:1"><div class="h3">Title</div><div class="t-sm">Subtitle</div></div>
    <i class="fa-solid fa-chevron-right chev"></i></div>
</div>
```

**Chips / filter pills (horizontal scroll):**
```html
<div class="chip-row"><span class="chip active">All</span><span class="chip">People</span></div>
```

**Avatar / badge:**
```html
<img class="ava" src="..." style="width:44px;height:44px">
<span class="badge badge-brand">Verified</span>  <!-- badge-ok / badge-warn / badge-gray -->
<i class="fa-solid fa-circle-check verified"></i> <!-- blue verified tick -->
```

**Section title + See all:**
```html
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
  <span class="section-title">Trending</span>
  <button onclick="App.go('scr-x')" style="background:none;border:none;color:var(--brand);font-weight:700;font-size:12px;cursor:pointer">See all</button>
</div>
```

**Post card (reusable, used in feeds):**
```html
<article class="post">
  <div style="display:flex;align-items:center;gap:11px;padding:13px 14px">
    <img class="ava" src="..." style="width:42px;height:42px">
    <div style="flex:1;min-width:0"><div style="font-weight:700;font-size:14px">Name <i class="fa-solid fa-circle-check verified" style="font-size:12px"></i></div><div class="t-sm">4 mins ago · <i class="fa-solid fa-earth-asia"></i></div></div>
    <button class="icon-btn" onclick="App.openSheet('sheet-post-options')"><i class="fa-solid fa-ellipsis"></i></button>
  </div>
  <p style="padding:0 14px 12px;font-size:14px;line-height:1.55">Body text…</p>
  <img src="..." style="width:100%;height:220px;object-fit:cover">
  <div style="padding:10px 14px;display:flex;justify-content:space-between" class="t-sm"><span><i class="fa-solid fa-heart" style="color:#EF4444"></i> 1.2k</span><span>36 comments</span></div>
  <div class="divider"></div>
  <div class="post-actions">
    <button onclick="likeBtn(this)"><i class="fa-regular fa-heart"></i> Like</button>
    <button onclick="App.go('scr-post-detail')"><i class="fa-regular fa-comment"></i> Comment</button>
    <button onclick="App.toast('Shared')"><i class="fa-solid fa-share"></i> Share</button>
  </div>
</article>
```

**Empty state:**
```html
<div class="empty"><i class="fa-regular fa-bell"></i><div class="h3" style="color:var(--ink-2)">No notifications yet</div><p class="t-sm">Start engaging to see activity here</p></div>
```

**Sub-page header pattern is automatic** via `data-topbar="back"`+`data-title`. For a custom header
(e.g. chat), use `data-topbar="none"` and build a header bar yourself:
```html
<div style="height:56px;display:flex;align-items:center;gap:10px;padding:0 12px;background:#fff;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:5">
  <button class="icon-btn" onclick="App.back()"><i class="fa-solid fa-arrow-left"></i></button>
  ... title / avatar / actions ...
</div>
```

## SHEETS (only the chrome agent builds these)
```html
<div class="sheet" id="sheet-NAME">
  <div class="sheet-grip"></div>
  <div class="pad"> ... </div>
</div>
```
Open with `App.openSheet('sheet-NAME')`.

## CANONICAL SCREEN IDs (link to these; they will all exist)
Auth (built): scr-splash scr-onboarding scr-login scr-register scr-otp scr-setup1 scr-setup2 scr-forgot
Home (built): scr-home
Home extra: scr-composer scr-poll-composer scr-post-detail scr-story scr-add-story scr-report-post
Discover: scr-discover scr-hashtag scr-online scr-contacts scr-profile-views
Notifications: scr-notifications
Profile: scr-profile scr-edit-profile scr-user-profile
Messages: scr-messages scr-chat scr-group-chat
Marketplace: scr-marketplace scr-product scr-cart scr-order-confirm scr-my-products scr-add-product
Wallet: scr-wallet scr-fund-wallet scr-cashout scr-userpoints
eGifts: scr-send-gift scr-gift-recipient scr-gift-sent scr-egifts
Ads: scr-my-ads scr-create-ad scr-ad-analytics scr-boost-post
Verification: scr-verify
Groups: scr-groups scr-create-group scr-group-page
Polls: scr-polls scr-poll-detail
Blogs: scr-blogs scr-add-blog scr-blog-reader
Videos: scr-videos scr-video-player scr-add-video
Events: scr-events scr-event-detail scr-add-event
Sheets: sheet-create sheet-post-options sheet-privacy

## QUALITY BAR (you are a 10-year product designer)
- Every screen scrolls cleanly inside 430×932. Comfortable padding, clear hierarchy, no walls of text.
- Use the amber brand sparingly for primary actions/accents; keep surfaces white on the `--bg` canvas.
- Realistic content, sensible empty/active states where the spec mentions them.
- Cross-link screens so the app feels connected (cards open detail screens, CTAs navigate, etc.).
- Validate: matched tags, valid Tailwind/CSS classes only, no `w-4.5`-style invalid utilities.
