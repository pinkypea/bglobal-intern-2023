import { defineStore } from "pinia";
import { Vue } from "./vue.plugin";
import { createPinia } from "pinia";

export abstract class BaseStore extends Vue {
  public abstract name: string;
}

export function defineClassStore<S extends BaseStore>(store: new () => S) {
  const instance = new store();
  return defineStore(instance.name, () => instance);
}

export const pinia = createPinia();
