# Switchback Security Training

Static HTML/CSS. No build step, no dependencies, no JavaScript. Drop it in a repo
and GitHub Pages will serve it as-is.

---

## Deploy

1. Create a repo and push these files to the **root** of the `main` branch.

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin git@github.com:YOU/YOUR-REPO.git
   git push -u origin main
   ```

2. Repo → **Settings** → **Pages** → Source: *Deploy from a branch* →
   Branch: `main`, folder: `/ (root)` → **Save**.

3. Live at `https://YOU.github.io/YOUR-REPO/` in about a minute.

### Custom domain

`CNAME` at the root already contains `switchbacksecuritytraining.com`. Despite the
filename, an **apex domain does not use a CNAME DNS record** — that's only for
subdomains. At your registrar, create four A records:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Optionally add AAAA records on `@` for IPv6: `2606:50c0:8000::153`,
`2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

Then add one CNAME record — `www` → `YOU.github.io` — so the www version redirects
to the apex instead of failing.

Delete any parking/default A record your registrar created, or GitHub will serve
the registrar's holding page instead of the site.

In the repo: Settings → Pages → Custom domain → `switchbacksecuritytraining.com` →
Save. Tick **Enforce HTTPS** once the certificate provisions — the box stays greyed
out until DNS resolves, which can take an hour, occasionally 24.

Verify:

```bash
dig switchbacksecuritytraining.com +noall +answer -t A
curl -I https://switchbacksecuritytraining.com
```

Before you point DNS, verify the domain under GitHub → Settings → Pages → *Verify
domain*. It adds a TXT record and prevents anyone else claiming the domain on
Pages if you ever delete the repo.

`.nojekyll` is included so GitHub serves the files directly instead of running
them through Jekyll.

---

## Files

| Path | What it is |
|---|---|
| `index.html` | Homepage. Hero spec block + the catalog table. |
| `courses/course-template.html` | **Copy this once per course.** The full detail page. |
| `register.html` | Sends people to your registration platform. Handles no money. |
| `about.html` | Credibility page. Write this one yourself. |
| `404.html` | Not-found page. |
| `assets/site.css` | All styling. Design tokens are the `:root` block at the top. |
| `CNAME` | The custom domain. One line, no protocol. |

---

## Before you go live

Search the whole repo for `TODO` — every placeholder is marked.

```bash
grep -rn "TODO" --include="*.html" .
```

Then, in rough order of importance:

- [x] ~~**Name.**~~ Done — the masthead reads `SWITCH`/`BACK`, with `BACK` taking the
      accent colour. Full name sits in the footer and the homepage `<title>`.
- [ ] **Courses.** Duplicate `course-template.html` per course, then update the rows
      in the `.catalog` block on `index.html` to point at them.
- [ ] **Registration URLs.** Two buttons on `register.html`, plus every `Book a seat`
      link. Point them at Stripe / RegFox / Ti.to.
- [ ] **Contact address.** A real inbox, in the footer, on `about.html`, and on
      `register.html`.
- [ ] **Instructor bios and photos.** 1:1 crops, ~600×600.
- [ ] Delete the yellow `.todo` boxes and the `.todo` rule in `site.css`.
- [ ] Add an OG image and `<meta property="og:image">` if you want link previews.

---

## Design notes

The direction is **"datasheet"** rather than the hacker-noir that Ringzer0 and
Black Hat both run. The reasoning: your credibility in this market comes from the
course outline, the prerequisites, and the hardware requirements — so the site is
built to look like a document that contains those, not a movie poster. It also
means you don't look like everyone else.

- **Palette** — cool ash ground (`--ash`), ink (`--ink`), one accent, ink blue
  (`--blue`). One accent only. Adding a second will cost you more than it buys.
- **Type** — IBM Plex, which was commissioned for technical documentation.
  Condensed for display, Serif for prose, Mono for anything that behaves like data
  (dates, fields, labels, nav).
- **The catalog is a table, not cards.** Courses share the same fields, so a buyer
  can compare them down a column. Cards make that harder and cost more per row.
- **The hero is a spec block.** What a seat *requires* is a more honest opening
  than what it promises.
- **The `Book a seat` rail repeats three times** down each course page. That is
  deliberate — it anchors the action at every scroll depth. Don't tidy it away.

### Swapping to a dark theme

If you'd rather match the rest of the field, edit only the `:root` block in
`site.css`:

```css
--ash:   #101215;
--ash-2: #262a30;
--paper: #16191d;
--ink:   #e8e9e4;
--ink-2: #9aa0a6;
--ink-3: #6e7378;
```

Nothing else needs to change. Check contrast on `--blue` if you do — you'll
probably want to lighten it to around `#5b82f0`.
