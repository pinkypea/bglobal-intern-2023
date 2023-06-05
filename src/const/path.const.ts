import type { RouteRecordRaw } from "vue-router";
import HomeViewVue from "@/views/home/HomeView.vue";

export class PathConst {
  public static home: Route = {
    path: "/",
    name: "home",
    component: HomeViewVue,
    meta: {
      title: "title.home",
    },
  };
}

export type Route = RouteRecordRaw;
