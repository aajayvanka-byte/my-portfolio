# Vanka Ajay — Portfolio

A single-page portfolio built with plain HTML, CSS, and JavaScript (no build step, no frameworks).

## Files

```
index.html      → all page content
style.css       → design system + layout
script.js       → nav behavior, scroll reveal, hero animation
assets/
  Vanka_Ajay_Resume.pdf  → downloadable résumé (linked from the hero "Download résumé" button)
```

## Run it locally

Just open `index.html` in a browser — there's no build step. Or, for a local server:

```bash
python3 -m http.server 8080
```

then visit `http://localhost:8080`.

## Deploy with GitHub Pages (free hosting)

1. **Create a new repository** on GitHub — e.g. `portfolio` (or `your-username.github.io` if you want it at the root of your GitHub domain).
2. **Upload these files** to the repo. Easiest way, from this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/aajayvanka-byte/portfolio.git
   git push -u origin main
   ```
   (Replace the URL with your actual repo URL.)
3. **Turn on Pages**: on GitHub, go to your repo → **Settings** → **Pages** (left sidebar).
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
6. Wait ~1 minute, then refresh — GitHub shows the live URL at the top of that Pages settings screen. It'll look like:
   - `https://aajayvanka-byte.github.io/portfolio/` (repo named anything else), or
   - `https://aajayvanka-byte.github.io/` (if the repo is named exactly `aajayvanka-byte.github.io`)

Any time you push new commits to `main`, the live site updates automatically within a minute or two.

## Customizing

- **Colors / fonts**: edit the `:root` variables at the top of `style.css`.
- **Content**: all text lives directly in `index.html` — search for the section you want (`id="about"`, `id="skills"`, etc.).
- **New projects**: duplicate the `.project-card` block in `index.html` and edit it.
- **Resume file**: replace `assets/Vanka_Ajay_Resume.pdf` with an updated version, keeping the same filename (or update the `href` in the hero's download button).
