import { fileURLToPath } from "node:url";
import { mergeConfig } from "vite";
import { configDefaults, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "test/e2e/*"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      coverage: {
        provider: "istanbul",
        reportsDirectory: "./test/unit-coverage",
        reporter: ["html", "json", "text"],
      },
    },
  }),
);
