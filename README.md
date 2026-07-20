# Shubham Blog

Personal blog for Shubham Kumar, built with Astro from the Bookworm Light Astro theme.

## Development

```sh
bun install
bun run dev
```

## Checks

```sh
bun run check
bun run build
```

`bun run build` runs `astro build` and then compresses raster images in `dist` with Sharp. Source images in `public/images` are not modified; only production build output is recompressed, and files are replaced only when the compressed version is smaller.

## Content

- Site config: `src/config/config.json`
- Navigation: `src/config/menu.json`
- Theme tokens: `src/config/theme.json`
- Posts: `src/content/posts`
- Contact page: `src/content/contact/-index.md`

The original demo posts are kept as drafts for reference. New public posts should use `authors: ["Shubham Kumar"]`.

## Decap CMS

This repo has a Decap CMS admin route at `/admin`.

- Admin page: `src/pages/admin.astro`
- CMS config: `public/admin/config.yml`
- Uploaded media: `public/images/uploads`

For local editing, run the Astro dev server and the Decap local backend in separate terminals:

```sh
bun run dev
bunx decap-server
```

Then open:

```txt
http://localhost:4321/admin
```

`bunx decap-server` should report that the proxy is listening on port `8081`. The CMS uses `local_backend: true` in `public/admin/config.yml`, so local saves write directly to this local Git checkout.

### CMS Images

The post `image` field is the featured image. It appears near the top of the CMS preview through the custom preview template in `src/pages/admin.astro`, and on the published post through the Astro post layout. Featured images fill the available width and are cropped to a fixed height: `512px` on desktop blog pages and `320px` on smaller screens. Homepage cards also fill their card width and crop vertically.

Images inserted in the Markdown body with Decap's default image button are normal Markdown images:

```md
![Omelette step](/images/uploads/example.jpg)
```

By default, body images render at the normal content width. To control size or alignment, add a Markdown image title containing one size token and one alignment token:

```md
![Omelette step](/images/uploads/example.jpg "medium center")
```

Supported sizes:

- `small`
- `medium`
- `large`

Supported alignment values:

- `left`
- `center`
- `right`

Examples:

```md
![Small left image](/images/uploads/example.jpg "small left")
![Medium centered image](/images/uploads/example.jpg "medium center")
![Large centered image](/images/uploads/example.jpg "large center")
![Medium right image](/images/uploads/example.jpg "medium right")
```

In Decap CMS:

1. Insert the image using the normal image button.
2. Switch to the raw Markdown view if needed.
3. Add the title text after the image path, for example `"medium center"`.
4. Check the CMS preview pane.

This uses Markdown's standard image title field as a lightweight styling hook. The CMS preview styles are registered in `src/pages/admin.astro`; the published blog styles are in `src/styles/components.css`.

### Firebase Production

Firebase Hosting can serve the Decap admin UI because Astro builds `/admin` into `dist/admin/index.html`, and `firebase.json` serves the `dist` folder.

Production deploy:

```sh
bun run build
firebase deploy --only hosting
```

For production login on Firebase, Decap needs a GitHub OAuth proxy. Firebase Hosting is static, so it cannot store the GitHub OAuth client secret by itself.

The `backend` block in `public/admin/config.yml` should point to the deployed OAuth proxy:

```yaml
backend:
  name: github
  repo: UnresolvedCold/blog.shubham.codes
  branch: main
  base_url: https://your-oauth-proxy.example.com
```

Create a GitHub OAuth App with:

```txt
Homepage URL: https://blog.shubham.codes
Authorization callback URL: https://your-oauth-proxy.example.com/callback
```

The OAuth proxy needs `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`, and must expose:

```txt
/auth
/callback
```

Users who log in through Decap must have write access to the GitHub repository. If the repository is private, add this to the Decap backend config:

```yaml
auth_scope: repo
```

Decap commits Markdown changes to `main`. Firebase will only reflect those changes after the site is rebuilt and deployed, either manually or through CI.

### VM Option

If the site is deployed on a VM later, the VM can host both the static Astro build and the OAuth proxy behind one domain.

Example layout:

```txt
Nginx
  /               -> Astro static files from dist/
  /admin          -> Astro-generated admin page
  /admin/config.yml -> Decap config
  /oauth/auth     -> OAuth proxy auth route
  /oauth/callback -> OAuth proxy callback route
```

Then the Decap backend can use:

```yaml
backend:
  name: github
  repo: UnresolvedCold/blog.shubham.codes
  branch: main
  base_url: https://blog.shubham.codes/oauth
  auth_endpoint: auth
```

GitHub OAuth App values for this setup:

```txt
Homepage URL: https://blog.shubham.codes
Authorization callback URL: https://blog.shubham.codes/oauth/callback
```

A VM still needs the GitHub OAuth proxy. The main advantage is that the proxy can run under the same domain as the site. For deploying content changes, prefer GitHub Actions SSH deploy to the VM over exposing a custom deploy webhook.
