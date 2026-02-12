---
name: create-new-event
description: How to create a new event
---

# Instructions for Creating a New Event

Events are used to communicate between components in the client-side application. They follow a standardized pattern using Zod for type safety.

# Creating a new event

- Choose a descriptive name for the event (e.g., "my-event").
- Create a new file at `src/client/event.<event-name>.ts`.
- Define the event name as a Zod literal:

```ts
import z from "zod";

export const MyEventName = z.literal("MyEvent");
export type MyEventName = z.infer<typeof MyEventName>;
```

- Define the event detail schema (can be an empty object if no data is needed):

```ts
export const MyEventDetail = z.object({
  someProperty: z.string(),
});
export type MyEventDetail = z.infer<typeof MyEventDetail>;
```

- Define the full event data schema:

```ts
export const MyEventData = z.object({
  name: MyEventName,
  detail: MyEventDetail,
});
export type MyEventData = z.infer<typeof MyEventData>;
```

- Export a function to create the event:

```ts
export const MyEvent = (detail: MyEventDetail): MyEventData => ({
  name: MyEventName.value,
  detail,
});
```

- Import the new event data type in `src/client/util.events.ts` and add it to the `CanzeltlyEvent` union:

```ts
import { MyEventData } from "./event.my-event.js";

// ...

export const CanzeltlyEvent = z.union([
  // ... existing events
  MyEventData,
]);
```

- To dispatch the event in a component, import the event and the dispatch utility:

```ts
import { dispatch } from "./util.events.js";
import { MyEvent } from "./event.my-event.js";

// In the component:
dispatch(this, MyEvent({ someProperty: "value" }));
```

# Notes

- Event names should be unique and descriptive.
- Use Zod to ensure type safety for event details.
- Events are dispatched with bubbling and composed set to true for cross-component communication.
