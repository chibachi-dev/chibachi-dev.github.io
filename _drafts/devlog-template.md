---
# Copy this file into _posts/ and rename it to YYYY-MM-DD-your-title.md
# (e.g. _posts/2026-11-03-boss-patterns.md). Files in _drafts/ are never published.

title: Your post title
description: One sentence shown on the devlog cards and in link previews.
author: chibachi            # or snifflypigeon (must match an id in _data/team.yml)
tags: [devlog]
# image: /assets/devlog/2026-11-03-boss-patterns/cover.png   # optional cover image
# image_alt: Describe the cover image
---

The first paragraph is used as the summary if you don't set a `description`.

## A section heading

Regular text, **bold**, *italic*, and [links](https://chibachi.itch.io/).

Put images for a post in their own folder, e.g. `assets/devlog/2026-11-03-boss-patterns/`:

![Alt text describing the screenshot](/assets/devlog/2026-11-03-boss-patterns/screenshot.png)

Add `{: .pixelated}` on the line after an image to keep pixel art crisp when it's scaled up:

![A tiny sprite](/assets/devlog/2026-11-03-boss-patterns/sprite.png)
{: .pixelated}

> A quote or callout.

```gdscript
# Code blocks get syntax highlighting. Change the language after the backticks.
func spawn_ring(count: int, speed: float) -> void:
    for i in count:
        var angle := TAU * i / count
        spawn_bullet(Vector2.RIGHT.rotated(angle) * speed)
```

Embed a YouTube video with:

{% include youtube.html id="VIDEO_ID" title="Short description of the video" %}
