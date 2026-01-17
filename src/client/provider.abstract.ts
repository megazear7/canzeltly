import { LitElement } from "lit";

export abstract class CanzeltlyAbstractProvider extends LitElement {
  abstract load(): Promise<void>;
}
