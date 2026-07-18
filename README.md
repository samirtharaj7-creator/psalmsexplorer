# Psalms Companion

This repository is deployed as a static GitHub Pages site. The browser loads the
checked-in `app.js` and `tailwind.css` artifacts; `app.jsx` and
`styles/tailwind.input.css` are their canonical sources.

## Build and validate

Use the pinned package manager and tool versions from `package.json` and
`pnpm-lock.yaml`:

```sh
pnpm install --frozen-lockfile
pnpm run check
```

`pnpm run check` rebuilds both production assets, validates all 150 Psalm data
states and their nine required study cards, verifies the two form controls keep
accessible names, rejects runtime Tailwind/Babel compilation, detects stale
generated assets, and runs JavaScript syntax checks.

Commit the regenerated `app.js` and `tailwind.css` whenever their sources change.
