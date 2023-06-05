import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import UnitTestComponentVue from "@/components/UnitTestComponent.vue";

describe("UnitTestComponent", () => {
  it("Render and check props", () => {
    const msg = "Test";
    const wrapper = shallowMount(UnitTestComponentVue, {
      props: {
        msg,
      },
    });
    expect(wrapper.text()).toContain("Unit " + msg);
  });
});
