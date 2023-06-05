import type { Ref } from "vue";
import { BaseStore, defineClassStore } from "@/plugins/store.plugin";

export const useCommonStore = defineClassStore(
  class Store extends BaseStore {
    public name: string = "common";

    public isLoading: Ref<boolean> = this.ref(false);

    public setIsloading = (bool: boolean) => {
      this.isLoading.value = bool;
    };
  },
);
