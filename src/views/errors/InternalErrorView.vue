<template>
  <div>
    <h1>500</h1>
    <p>{{ app.t("title.internalError") }}</p>
  </div>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";

const app = defineClassComponent(
  class View extends BaseComponent {
    public constructor() {
      super();
      document.title = this.t("title.internalError");
    }
  },
);
</script>

<style scoped lang="scss"></style>
