import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// The kit's own tests under test/hooks/ use node:test and run from the
// `test` script separately; Vitest only sees the site's tests.
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname) } },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["{app,components,content,lib}/**/*.test.{ts,tsx}"],
    css: false,
  },
});
