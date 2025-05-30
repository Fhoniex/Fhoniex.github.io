/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// 定义插件数组
function getPlugins() {
  return [react(), tsconfigPaths()];
}

// 正确导出配置（只有一个 export default）
export default defineConfig({
  base: '/kevin2html.github.io/', // GitHub 仓库名（注意路径尾部有 `/`）
  plugins: getPlugins(),
});
