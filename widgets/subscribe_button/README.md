# Subscribe Button Widget

A toggle button that subscribes or unsubscribes the current user from a community category using the Gainsight Community Web SDK (`ChWebSdk`).

## How it works

1. On load, reads the `categoryId` query parameter from the page URL.
2. Calls `ChWebSdk.Subscription.getCategorySubscriptionStatus(categoryId)` to determine the user's current subscription state.
3. Renders a **Subscribe** button (primary style) or **Unsubscribe** button (secondary style) accordingly.
4. On click, calls `subscribeToCategory` or `unsubscribeFromCategory` and toggles the button state.

## Requirements

- **`?categoryId=<id>` must be present in the URL.** The widget reads this at runtime — without it, the button is disabled and an error is shown.
- The page must have `ChWebSdk` available on `window` (standard on all Gainsight Community pages).
- The user must be authenticated for subscription actions to succeed.

## Usage

Add the widget to any custom page and navigate to it with the category ID as a query parameter:

```
https://your-community.com/page?categoryId=12345
```

## Styles

All styles use platform design tokens (`--color-primary`, `--spacing-sm`, etc.) with hardcoded fallbacks, so the button automatically inherits the community theme.
