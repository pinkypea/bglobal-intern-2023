import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUpdated, onUnmounted } from "vue";
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import { useTranslation } from "i18next-vue";
import { AppConst } from "@/const/app.const";
import { useCommonStore } from "@/stores/common.store";
import { Vue } from "./vue.plugin";
import { EventBus } from "./bus.plugin";
import { SearchParams } from "./params.plugin";

export abstract class BaseComponent extends Vue {
  public readonly translation = useTranslation();
  public readonly i18next = this.translation.i18next;
  public readonly router = useRouter();
  public readonly route = useRoute();
  public readonly commonStore = useCommonStore();
  public readonly searchParams = new SearchParams();

  public readonly t = this.translation.t;
  public readonly onBeforeMount = onBeforeMount;
  public readonly onMounted = onMounted;
  public readonly onBeforeUpdate = onBeforeUpdate;
  public readonly onUpdated = onUpdated;
  public readonly onBeforeUnmount = onBeforeUnmount;
  public readonly onUnmounted = onUnmounted;
  public readonly onBeforeRouteLeave = onBeforeRouteLeave;
  public readonly onBeforeRouteUpdate = onBeforeRouteUpdate;
}

export function defineClassComponent<C extends BaseComponent>(component: new () => C): C {
  return new component();
}

export function onError(error: any) {
  console.error(error);
  EventBus.emit(AppConst.EVENTS.internalError, null);
}
