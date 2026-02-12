---
applyTo: "src/client/page.*.ts"
---

# Instructions for Creating a New Page Component

When implementing a complete page component follow these steps:

 - Use types defined in `src/shared/type.<type-name>.ts` for all data structures.
 - Use modals, events, and existing components as needed to implement the page.
 - Defer details of the page behavior to components as much as possible, and keep the page component focused on layout and composition of components.
 - Use existing CSS variables for all styling as defined in `static/app.css`

Refer to the [Create Page](./skills/create-page/SKILL.md) skill for details on how to implement pages.
