# rootsandacre.github.io

The Roots & Acre website. Plain static HTML/CSS/JS — no build step. GitHub Pages
serves `index.html` directly from the repo root.

## Structure

```
rootsandacre.github.io/
├── index.html          # Home page
├── 404.html            # Custom not-found page
├── css/styles.css      # Base styles (CSS variables at top)
├── js/main.js          # Site scripts
├── assets/
│   ├── images/         # Images, favicon, og-image
│   └── fonts/          # Self-hosted fonts (optional)
├── CNAME               # Custom domain: rootsandacre.com
├── .nojekyll           # Tells Pages to skip Jekyll processing
└── .gitignore
```

## Local preview

No tooling required. Either open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## First-time deploy

1. Create a GitHub repo named **`rootsandacre.github.io`** under the account/org
   that owns the site. The repo name must match this exactly for a Pages *user/org
   site* served from the root.
2. From this folder:

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin git@github.com:<ORG-OR-USER>/rootsandacre.github.io.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages** → Source = *Deploy from a branch*,
   Branch = `main` / `root`. Save.
4. The site publishes at `https://<user>.github.io/` and, once DNS is set, at
   `https://rootsandacre.com`.

## Custom domain (rootsandacre.com)

The `CNAME` file already sets the domain. At your DNS provider add:

- Four `A` records for the apex `rootsandacre.com` pointing to GitHub Pages IPs:
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- One `CNAME` record for `www` → `<user>.github.io`

Then in **Settings → Pages** confirm the custom domain and enable **Enforce HTTPS**.

## Deploying updates

```bash
git add .
git commit -m "Describe change"
git push
```

Pages redeploys automatically within a minute or two.

## Moving content in later

Drop existing pages as `*.html` at the root (or in subfolders for clean URLs,
e.g. `coffee/index.html` → `/coffee/`). Put shared styles in `css/`, scripts in
`js/`, and media in `assets/`. Since there's no build step, links are just plain
relative/absolute paths. If we later adopt a bundler (Vite, etc.), we'll add a
GitHub Actions workflow — a placeholder lives in `.github/workflows/`.
