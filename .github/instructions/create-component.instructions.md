---
applyTo: "src/client/component.*.ts"
---

# Instructions for Creating a New Component

When implementing a complete component follow these steps:

 - Use types defined in `src/shared/type.<type-name>.ts` for all data structures.
 - Use events and existing components as needed to implement the component.
 - Keep logic minimal; delegate complex behavior to utilities or events.
 - Use existing CSS variables for all styling as defined in `static/app.css`
 - Include global styles from `src/client/styles.global.ts`

Refer to the [Create New Component](./skills/create-new-component/SKILL.md) skill for details on how to implement components.