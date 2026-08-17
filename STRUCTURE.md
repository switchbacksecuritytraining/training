# Switchback site structure

Built for a four-event year. The change from the previous structure is one new layer: **an event page per event.**

```
index.html                        Next events + a thin pointer at next year
events.html                       HUB. Every event, upcoming and past. Never retire this URL.
event-2026-11-14-bellevue.html    ← new layer
event-2026-11-21-bellevue.html
event-2027-01-23-bellevue.html
register.html                     Where you pay. Grouped by event, links out to RegFox.
trainers.html                     One card per trainer → links to their course pages.
about.html
404.html
ai_engineering.html               One page per COURSE. Event-agnostic, reusable.
aws_incident_response.html
hacking_cryptography.html
sdr_101.html
soc_101.html
assets/site.css
images/                           ⚠ NOT in this bundle
CNAME
```

## The two rules

1. **An event page owns dates, venue and registration. A course page owns content and price.**
2. **Neither duplicates the other.** The event page lists its courses; each course lists the events it runs at.

That's what makes a repeat trainer cheap. If Richard teaches January *and* May, you do **not** copy `sdr_101.html` — it stays one URL accumulating all its search traffic, and gains a second line in its **Upcoming dates** block. The link goes both ways and neither file has to know what the other owns.

## Naming

`event-YYYY-MM-DD-bellevue.html`, flat in the site root.

- Year-month-day first means files sort chronologically in your editor and on the server.
- Drop the `-DD` when only the month is known (`event-2027-01-bellevue.html`), and rename once dates are set — early, before anyone has linked to it.
- **Flat, not an `events/` subfolder**, because every page here uses relative paths (`assets/site.css`, `images/…`). Moving pages into a folder breaks all of them and invites trailing-slash bugs on GitHub Pages. A prettier URL isn't worth that.

## Adding an event

1. Copy the closest existing event page, rename it.
2. Change `<title>`, meta description, the `.detail__head` block, the `.facts` row, the `.track` cards, and the `#register` section.
3. On `events.html`, promote that month's `.plan` row to a full `.event` card pointing at the new page.
4. On each course page running there, add the event to its **Upcoming dates** list.
5. When registration opens, add a section to `register.html` and swap the CTAs from `#register` to the RegFox URL.

## Retiring an event

Move its `<article class="event">` into the Past section of `events.html` (the commented-out block is ready), change the status to `.event__status--past` reading "This event has finished", and drop the registration button.

**Never delete an event page.** The URL keeps its inbound links and search history, and it's the evidence the event happened — which matters to the next trainer and the next corporate buyer deciding whether you're real. Split into `events-2026.html` only once the Past list runs past eight or ten.

## Placeholders left in this bundle

- ~~January 2027 dates.~~ Set to **23–24 January 2027**, file renamed to `event-2027-01-23-bellevue.html`, RegFox live at `/switchback-security-training-january-2027`.
- **The five-day edition has no dates.** Its page says "to be announced" in the facts row, the register heading and the footer strap.
- **March, June, October 2027** are `.plan` rows on `events.html` with no pages yet, by design.

## A trainer with more than one course

Richard's card on `trainers.html` uses a `.tcard__links` wrapper to list both SDR editions. Reuse it whenever a trainer teaches more than one thing — the wrapper carries the `margin-top:auto` that pins links to the bottom of the card, so they stay a tight group rather than being spread by the card's 12px gap.

The two-day page deliberately carries no reference to the five-day edition, so the trainer card is currently the only route to `sdr_101_5day.html`.

## Missing files

Not in the upload, so not in this bundle. Still needed, and must not be deleted from the repo:

- `images/` — every image on the site, including `switchback-masthead.svg`, `bellevue_city_view.jpg`, `ac_bellevue_exterior_evening.jpg`, the favicon and the trainer photos.

Every other file the site links to is present, and every internal link resolves.

`site.css` was uploaded at the root but the pages all reference `assets/site.css`; it's placed in `assets/` here to match.
