---
applyTo: "src/client/page.not-found.ts"
---

# Instructions for the Not Found Page

The not found page is a simple 404 error page that displays when users navigate to invalid routes. It provides a basic error message and uses global styles.

## Key Features
- Simple error message display
- Extends LitElement directly (no provider needed)
- Minimal styling with global styles
- Serves as fallback for unmatched routes

## Testing with Playwright MCP

### Page Load Test
- Navigate to a non-existent route
- Take a snapshot of the page
- Verify the error message "Not Found!" is displayed
- Check that the not found component is rendered

### Styling Test
- Navigate to an invalid route
- Verify that global styles are applied correctly
- Check heading styling and layout

### Multiple Invalid Routes Test
- Test multiple invalid routes
- Verify each shows the 404 page consistently
