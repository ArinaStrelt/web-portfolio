# Arina Portfolio — corrected deployment package

All the optimized WebP pictures are INCLUDED. You do not need download_assets.py.

## Publish on a website

**Important:** Upload the CONTENTS of this folder, not an outer `aristrela` folder, to the web root / public directory.

Required site structure:

    public_html/ (or site root)
      index.html
      assets.js
      script.js
      styles.css
      assets/
        portrait-1287w.webp
        cardGame-640w.webp
        ... other .webp files

In other words, an image at `assets/portrait-1287w.webp` must resolve relative to `index.html`.
If your host extracts an archive into a new nested folder, open that folder and move ALL its contents to the public website root. If deploying to GitHub Pages at /repo-name/, upload all these files within that repository and enable Pages from its root.

Do not upload `index.html` by itself: it needs CSS, JavaScript, `assets.js`, AND the whole `assets/` directory.

## Test after publishing

1. Open your home page with a hard refresh (Ctrl+Shift+R or Cmd+Shift+R).
2. Open the image URL by adding `/assets/portrait-1287w.webp` to the site address (for subfolder hosting, use the current folder path before `assets/`).
3. If it displays **404**, the asset files were uploaded in the wrong folder or not uploaded.
4. If it displays an image but not on the site, check the browser DevTools Network and Console for blocked scripts or an old cached `assets.js`.
5. Confirm all four sections and images appear by using the site navigation.

## View without hosting

Extract the ZIP; open `index.html` with a normal browser. If the browser applies unusual restrictions to local files, run `python3 -m http.server 8000` inside this directory and visit http://localhost:8000.

There is also a separate **single HTML preview** with all artwork embedded. It is for easy previewing / sharing only. The ZIP is the optimized version for online hosting; its images can be cached individually and use responsive source sizes.

## Updated links

Instagram: https://www.instagram.com/aristrela.art/
Itch.io contact: https://aristrela.itch.io/
PLAAAY game: https://twafla.itch.io/oh-my-glurp
WALKTHROUGH video: https://youtu.be/tzF9FmW5yhQ
