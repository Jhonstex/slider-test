# kito-shopify-theme
KITO Shopify theme recreated from Figma with responsive sections and configurable theme settings

## Automatic Shopify draft deployment

The workflow in `.github/workflows/deploy-shopify-theme.yml` pushes the theme to the Shopify draft theme whenever `main` is updated, and can also be started manually from GitHub Actions.

Create a GitHub environment named `shopify-draft`, then add these environment secrets:

- `SHOPIFY_STORE`: `beae-anna.myshopify.com`
- `SHOPIFY_THEME_ID`: `160807846101`
- `SHOPIFY_CLI_THEME_TOKEN`: a Theme Access password with permission to update themes

The workflow uses `--nodelete`, so files that are not present locally are not removed from the draft theme. It ignores `TASK-LOG.md` and the workflow directory.
