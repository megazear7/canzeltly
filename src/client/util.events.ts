import z from "zod";
import { ModelSubmitEventData } from "./event.modal-submit.js";
import { NavigationEventData } from "./event.navigation.js";
import { ScrollToEventData } from "./event.scroll-to.js";
import { WarningEventData } from "./event.warning.js";
import { SuccessEventData } from "./event.success.js";
import { SaveEventData } from "./event.save.js";
import { ModelClosingEventData } from "./event.modal-closing.js";
import { ModelOpeningEventData } from "./event.modal-opening.js";
import { DeleteGamesEventData } from "./event.delete-games.js";
import { RenameGameEventData } from "./event.rename-game.js";

export const CanzeltlyEvent = z.union([
  ModelSubmitEventData,
  ModelOpeningEventData,
  ModelClosingEventData,
  NavigationEventData,
  ScrollToEventData,
  WarningEventData,
  SuccessEventData,
  SaveEventData,
  DeleteGamesEventData,
  RenameGameEventData,
]);
export type CanzeltlyEvent = z.infer<typeof CanzeltlyEvent>;

export const stopProp = (event: Event): void => {
  event.stopPropagation();
};

export const dispatch = (element: HTMLElement, event: CanzeltlyEvent): void => {
  element.dispatchEvent(
    new CustomEvent(event.name, {
      detail: event.detail,
      bubbles: true,
      composed: true,
    }),
  );
};
