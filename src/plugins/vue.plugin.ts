import { computed, reactive, ref, watch, watchEffect } from "vue";

export abstract class Vue {
  public readonly reactive = reactive;
  public readonly ref = ref;
  public readonly computed = computed;
  public readonly watch = watch;
  public readonly watchEffect = watchEffect;
}
