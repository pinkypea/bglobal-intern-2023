<template>
  <p>Unit {{ props.msg }}</p>
</template>

<script setup lang="ts">
import type { Props } from "./UnitTestComponent";

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
@import "@/assets/scss/modules";
</style>
