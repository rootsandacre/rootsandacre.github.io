# Workflows

Empty for now — the site is plain static HTML and needs no build step, so GitHub
Pages "Deploy from a branch" handles everything.

If we later add a bundler (Vite, etc.), drop a `deploy.yml` here that builds and
publishes to Pages. A starting point:

```yaml
name: Deploy site
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

If you switch to Actions-based deploy, also change **Settings → Pages → Source**
to *GitHub Actions*.
