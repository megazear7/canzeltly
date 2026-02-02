---
name: create-new-provider
description: How to create a new provider for context management and data loading
---

# Instructions for Creating a New Provider

Providers in the Canzeltly application manage context, data loading, and event handling for pages and components. They extend abstract base classes and use Lit's context API to provide data to child components.

# Creating a new provider

- Choose a descriptive name for the provider (e.g., "my-provider").
- Create a new file at `src/client/provider.<provider-name>.ts`.
- Decide whether to extend `CanzeltlyAbstractProvider` (minimal) or `CanzeltlyAppProvider` (includes app context).
- Define the context type in `src/client/context.ts` if not already present:

```ts
export const MyProviderContext = z.object({
  data: z.string().optional(),
  status: LoadingStatus,
});
export type MyProviderContext = z.infer<typeof MyProviderContext>;

export const myProviderContext = createContext<MyProviderContext>('myProviderContext');
```

- In the provider file, import necessary modules:

```ts
import { provide } from "@lit/context";
import { property } from "lit/decorators.js";
import { MyProviderContext, myProviderContext } from "./context.js";
import { LoadingStatus } from "../shared/type.loading.js";
import { CanzeltlyAbstractProvider } from "./provider.abstract.js"; // or CanzeltlyAppProvider
```

- Define the provider class:

```ts
export abstract class CanzeltlyMyProviderProvider extends CanzeltlyAbstractProvider {
  @provide({ context: myProviderContext })
  @property({ attribute: false })
  myProviderContext: MyProviderContext = {
    status: LoadingStatus.enum.idle,
  };

  override async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await this.load();
  }

  async load(): Promise<void> {
    this.myProviderContext.status = LoadingStatus.enum.loading;
    this.requestUpdate();
    try {
      // Load data here
      this.myProviderContext.data = await fetchMyData();
      this.myProviderContext.status = LoadingStatus.enum.success;
    } catch (error) {
      console.error("Failed to load data", error);
      this.myProviderContext.status = LoadingStatus.enum.error;
    }
    this.requestUpdate();
  }
}
```

- If handling events, add event listeners in `connectedCallback` and remove in `disconnectedCallback`:

```ts
override connectedCallback(): Promise<void> {
  super.connectedCallback();
  this.addEventListener(SomeEventName.value, this.handleEvent);
  return this.load();
}

override disconnectedCallback(): void {
  super.disconnectedCallback();
  this.removeEventListener(SomeEventName.value, this.handleEvent);
}

private handleEvent = (event: Event): void => {
  // Handle event
};
```

- Pages can extend the provider to inherit its context and behavior.

# Notes

- Providers should handle loading states and errors appropriately.
- Use Zod for type safety in contexts.
- Keep providers focused on data management; delegate UI to components.