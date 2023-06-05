<template>
  <div>
    <h1>404</h1>
    <p>{{ app.t("title.notFound") }}</p>
  </div>
</template>

<script setup lang="ts">
import { BaseComponent, defineClassComponent } from "@/plugins/component.plugin";

const app = defineClassComponent(class View extends BaseComponent {});
</script>

<style scoped lang="scss"></style>
