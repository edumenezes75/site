# Adding a project

One command turns a raw film into every web asset the site needs.

```bash
npm run add-project -- ~/path/to/film.mp4 my-new-film
```

(`my-new-film` is the slug — lowercase, kebab-case.)

It writes, all web-optimised:

- `public/videos/my-new-film.mp4` — full film (H.264 CRF 23, ≤1080p, AAC, faststart)
- `public/videos/previews/my-new-film.mp4` — ~8s muted highlight (most dynamic cut, 640px)
- `public/videos/posters/my-new-film.jpg` — poster pulled from the highlight

Then it prints a snippet to paste into `src/data/projects.ts` (with the detected
`duration`). Fill in the remaining fields (title, client, agency, year, overview,
brief, idea, result, credits, `featured` if it's a highlight) and deploy.

**Requires** ffmpeg on your PATH — `brew install ffmpeg`. Or point at a specific
binary: `FFMPEG=/path/to/ffmpeg npm run add-project -- film.mp4 slug`.

> Posters for the films sourced from vimeo.com/edumenezes use the curated Vimeo
> thumbnail instead of an auto-frame — swap the generated `.jpg` if you prefer that.
