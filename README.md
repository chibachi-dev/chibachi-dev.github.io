# Plutonium Pigeons

Source for [plutoniumpigeons.com](https://www.plutoniumpigeons.com), built with
[Jekyll](https://jekyllrb.com/) and published automatically by GitHub Pages on every push to `main`.

## Writing a devlog post

1. Copy `_drafts/devlog-template.md` into `_posts/` and rename it `YYYY-MM-DD-your-title.md`
   (for example `_posts/2026-11-03-boss-patterns.md`).
2. Fill in the front matter at the top (`title`, `description`, `author`, `tags`) and write the post in Markdown.
3. Put any images in `assets/devlog/<post-file-name>/` and link them as
   `![alt text](/assets/devlog/2026-11-03-boss-patterns/screenshot.png)`.
4. Commit and push. The post appears on the home page, at `/devlog/`, and in the RSS feed (`/devlog/feed.xml`)
   a minute or two later.

`author` must match an `id` in `_data/team.yml` (`chibachi` or `snifflypigeon`). If it's left out, it defaults to `chibachi`.
Posts with a date in the future aren't published until that date has passed **and** the site is rebuilt
(any push triggers a rebuild).

Extras you can use inside a post:

- `{: .pixelated}` on the line after an image keeps pixel art crisp when it's scaled.
- `{% include youtube.html id="VIDEO_ID" title="What the video shows" %}` embeds a YouTube video.

## Editing content

| What | Where |
| --- | --- |
| Game cards on the home page | `_data/games.yml` |
| Team members, bios and social links | `_data/team.yml` |
| Contact email, itch.io link, site description | `_config.yml` |
| About page text | `about.html` |
| Colors, fonts, layout | `assets/css/main.css` (color tokens are at the top) |
| Starfield and scroll animations | `assets/js/main.js` |

The pixel pigeon logo is inline SVG in `_includes/pigeon.html` (favicon copy in `assets/img/pigeon.svg`).
Its glowing neck color can be changed per use, e.g. `{% include pigeon.html neck="#ff5fd2" %}`.

## Previewing locally

With Docker Desktop running:

```bash
docker compose up
```

Then open <http://localhost:8080>. The first run takes a few minutes to install gems; after that, pages rebuild
when you save. To also preview files in `_drafts/`, add `--drafts` to the `jekyll serve` command in `docker-compose.yml`.

If you'd rather install Ruby directly: `bundle install`, then `bundle exec jekyll serve`.
