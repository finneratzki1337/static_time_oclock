Requirements Sheet — “Profane Time” Static Site (GitHub Pages)
1) Goal

Build a static, single-page website that shows:

Current date (in words, uppercase, e.g., MONDAY 28th DECEMBER)

Current time (in words, with black humor / explicit language, e.g., IT’S FUCKING QUARTER PAST TEN or IT’S DAMN TEN FORTY-SIX)

Everything runs 100% in the browser, using the user’s local machine time.

2) Hosting & Constraints

Must be deployable via GitHub Pages with no backend.

Deliver as plain static files:

index.html

styles.css

script.js

README.md (short deploy instructions)

No build step required (no React/Node needed). Optional CDN font is allowed.

3) Layout & Visual Style (matches mock-up vibe)

Background: solid black.

Text: bold, modern, slightly italic (or “fake italic” via skew/transform if font doesn’t support italics well).

The page should feel “poster-like”: fills most of the viewport on mobile and desktop.

Date line:

Small-ish, top aligned, centered.

White, uppercase.

Main time block:

Large, centered both horizontally and vertically (with date above).

Multi-line composition like the mock-ups (big “IT’S …” + stacked time words).

4) Dynamic Sizing / Responsiveness

Use responsive typography so it scales cleanly:

Prefer CSS clamp() + viewport units.

Must look good on:

Mobile portrait (narrow width)

Desktop widescreen

Avoid overflow: long phrases must wrap gracefully, never off-screen.

5) Color Rules (hour vs minutes)

The hour and minute parts must be slightly different accent colors (as in the mock-up).

Define two CSS variables:

--hour-accent (e.g., green-ish)

--minute-accent (e.g., blue-ish)

Rendering requirement:

Hour tokens wrapped in <span class="t-hour">…</span>

Minute tokens wrapped in <span class="t-minute">…</span>

Everything else (like “IT’S”, “PAST”, “TO”) is neutral white (or could be minute-accent if you want the mock vibe—see templates below).

Mock-consistent interpretation

In TEN FORTY-SIX: TEN = hour-accent, FORTY-SIX = minute-accent.

In QUARTER PAST FIVE: FIVE = hour-accent, QUARTER PAST = minute-accent.

6) Date Formatting Requirements

Display format: DAYNAME Dth MONTHNAME in uppercase.

Example: MONDAY 28th DECEMBER

Day/month names in English.

Ordinal suffix rules:

1 = st, 2 = nd, 3 = rd

11/12/13 always th

Everything else th

7) Time “In Words” Requirements

Use the user’s local time (new Date()), then generate an English phrase.

7.1 Core time modes (frontend chooses one per minute)

The site must support at least these two display styles (randomly chosen):

Exact word time (mock 1 style)

IT’S {INTENSIFIER} {HOUR_WORD} {MINUTE_WORD}

Example: IT’S DAMN TEN FORTY-SIX

Spoken “past/to” time (mock 2 style)

IT’S {INTENSIFIER} {MINUTE_PHRASE} {PAST|TO} {HOUR_WORD}

Examples:

IT’S FUCKING QUARTER PAST FIVE

IT’S GODDAMN TEN TO SIX

IT’S BLOODY TWENTY PAST NINE

Correctness constraint

The displayed time must remain truthful to the current minute.

“Quarter/Half/Five past/to …” should only appear when the actual minute matches the phrase (or if you deliberately implement a clear rounding mode—see 7.4).

7.2 Number-to-word conversion (0–59)

Implement number word conversion for minutes (0–59) and hours (1–12).

Hours (12-hour clock):

0 → 12

13–23 → subtract 12

Special cases (optional but fun):

00:00 → allow MIDNIGHT

12:00 → allow NOON

Minute word formatting (examples):

00 → O’CLOCK (only in “o’clock mode”)

01–09 → OH ONE, OH TWO … (preferred for style), or just ONE..NINE if you want simpler

10–19 → TEN, ELEVEN, … NINETEEN

20–59 → hyphenate: TWENTY-ONE, FORTY-SIX, etc.

7.3 Line-breaking rules (to mimic mock)

The renderer must support intentional stacking:

For hyphenated minute words: split at hyphen for dramatic layout:

FORTY- on one line, SIX on the next (minute-accent both)

For “past/to” mode: stack like:

Line 1: QUARTER

Line 2: PAST FIVE

(Or Line 2: PAST and Line 3: FIVE — whichever fits best)

Implementation requirement

Phrase generation must output a structured representation, not a single flat string:

Example: array of lines → each line is array of tokens { text, role }

role ∈ {hour, minute, neutral}

7.4 Randomness (must feel alive, not flickery)

Randomness should influence:

Intensifier choice (FUCKING, DAMN, etc.)

Time mode choice (Exact vs Past/To vs O’clock)

Minor wording variants (see phrase libraries below)

Line-break variant (for some templates)

Stability constraint

Do not reshuffle the phrase every second (that becomes unreadable chaos).

Change the phrase only when the minute changes.

Optional: use deterministic seeding per minute (e.g., based on YYYY-MM-DD HH:MM) so refreshes within the same minute keep the same phrase.

8) Profanity & Humor Phrase Libraries (must be implemented in frontend)

All of this must be editable via JS arrays/objects (easy to extend).

8.1 Intensifiers (pick 1 each minute)

Use a pool like:

FUCKING

DAMN

GODDAMN

BLOODY

WHOLE-ASS

ABSOLUTE

UNHOLY

STUPID

RIDICULOUS

GLORIOUSLY STUPID

Rules:

No slurs, no hate-targeted language.

Keep it punchy (1–3 words) to preserve layout.

8.2 “IT’S …” openers (optional variant pool)

Either always IT’S, or randomly choose:

IT’S

RIGHT NOW IT’S

CONGRATS, IT’S

WELCOME TO

BEHOLD:

(If you use non-IT’S openers, ensure the grammar still works with time templates.)

8.3 Exact time templates (examples)

These must exist as selectable templates:

IT’S {INTENSIFIER} {HOUR} {MINUTE}

IT’S {INTENSIFIER} {HOUR} OH {MINUTE_1_TO_9} (only when minute 1–9)

IT’S {INTENSIFIER} {HOUR} {MINUTE} ON THE DOT (only when minute == 0, optional)

Examples the site should be able to produce:

IT’S DAMN TEN FORTY-SIX

IT’S FUCKING TWO OH FIVE

IT’S GODDAMN SEVEN THIRTY-ONE

8.4 Past/To templates (only when minute matches)

Support at least:

05 → FIVE PAST {HOUR}

10 → TEN PAST {HOUR}

15 → QUARTER PAST {HOUR}

20 → TWENTY PAST {HOUR}

25 → TWENTY-FIVE PAST {HOUR}

30 → HALF PAST {HOUR}

35 → TWENTY-FIVE TO {NEXT_HOUR}

40 → TWENTY TO {NEXT_HOUR}

45 → QUARTER TO {NEXT_HOUR}

50 → TEN TO {NEXT_HOUR}

55 → FIVE TO {NEXT_HOUR}

Examples:

IT’S FUCKING QUARTER PAST FIVE

IT’S DAMN TEN TO SIX

IT’S BLOODY HALF PAST NINE

8.5 O’clock mode (only when minute == 0)

Templates:

IT’S {INTENSIFIER} {HOUR} O’CLOCK

IT’S {INTENSIFIER} {HOUR} ON THE DOT

IT’S {INTENSIFIER} {HOUR} O’CLOCK, APPARENTLY

Examples:

IT’S GODDAMN THREE O’CLOCK

IT’S DAMN NOON

9) Update Cycle & Animation

JS checks time at least every second, but only re-renders when the minute changes (and also on initial load).

Optional: add a subtle transition:

Fade out → update text → fade in

Keep it quick (<300ms) to feel snappy.

10) Acceptance Criteria (definition of “done”)

Opening index.html locally shows correct date and time in words.

Hosting on GitHub Pages works without changes.

Time and date match the user’s machine time (including timezone).

Hour/minute coloring is correct and consistent.

Typography is bold/modern/slightly italic and scales to fill screens.

Phrasing changes only once per minute.

Random variants clearly exist and are actually used.

Edge cases render sensibly:

00:00 / 12:00

12:xx

23:59

11th/12th/13th suffix logic

11) Deliverables

index.html with minimal semantic structure:

container, date element, time element

styles.css implementing:

full-screen layout, responsive type, token coloring

script.js implementing:

date formatting

number-to-words

phrase selection + seeded randomness per minute

tokenized rendering + line-breaking

README.md with:

GitHub Pages setup steps

brief customization notes (how to add phrases)