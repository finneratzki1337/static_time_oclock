# Profane Time (Static Site)

A single-page, profane time poster that runs entirely in the browser using the user’s local machine time.

## Deploy (GitHub Pages)

1. Push this repo to GitHub.
2. In **Settings → Pages**, set the source to the `main` branch (root).
3. Save. Your site will publish at the GitHub Pages URL.

You can also open `index.html` locally and it will work with no build step.

## Customize phrases

Edit `script.js`:

- `intensifiers` — add/remove profanity and punchy phrases.
- `openers` — tweak opener variants before the time phrase.
- `oclockTemplates` / `exactTemplates` — change time templates.
- `pastToMap` — adjust minute-to-phrase mapping.

Accent colors live in `styles.css` as CSS variables:

```css
:root {
  --hour-accent: #63ff7b;
  --minute-accent: #6ecbff;
}
```
