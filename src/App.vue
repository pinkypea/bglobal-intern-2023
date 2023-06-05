<template>
  <InternalErrorView v-if="app.isError.value" />
  <RouterView v-else />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { AppConst } from "./const/app.const";
import { BaseComponent, defineClassComponent } from "./plugins/component.plugin";
import { EventBus } from "./plugins/bus.plugin";
import InternalErrorView from "@/views/errors/InternalErrorView.vue";

const app = defineClassComponent(
  class App extends BaseComponent {
    public isError = this.ref(false);

    public constructor() {
      super();

      this.watch(
        () => this.route.fullPath,
        () => {
          this.isError.value = false;
        },
      );

      EventBus.on(AppConst.EVENTS.internalError, () => {
        this.isError.value = true;
      });

      this.searchParams.onStateChange((params) => {
        console.log(params);
      });
    }
  },
);
</script>

<style lang="scss"></style>
