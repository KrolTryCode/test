// vite.config.ts
import { fileURLToPath, URL } from "url";
import { TanStackRouterVite } from "file:///C:/Users/amals/ui/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import react from "file:///C:/Users/amals/ui/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/amals/ui/node_modules/vite/dist/node/index.js";
import svgrPlugin from "file:///C:/Users/amals/ui/node_modules/vite-plugin-svgr/dist/index.js";
import viteTsconfigPaths from "file:///C:/Users/amals/ui/node_modules/vite-tsconfig-paths/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/amals/ui/vite.config.ts";
var vite_config_default = defineConfig(() => ({
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/pages",
      generatedRouteTree: "./src/routing/routeTree.gen.ts",
      quoteStyle: "single",
      semicolons: true,
      autoCodeSplitting: true,
      routeFileIgnorePattern: "test.tsx?"
    }),
    react({ include: "**/*.tsx" }),
    viteTsconfigPaths(),
    svgrPlugin()
  ],
  resolve: {
    alias: [
      { find: "~", replacement: fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)) },
      { find: "tests", replacement: fileURLToPath(new URL("./tests", __vite_injected_original_import_meta_url)) }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler"
      }
    }
  },
  server: {
    open: false,
    host: true,
    port: 3e3,
    strictPort: true,
    hmr: {
      port: 3e3
    }
  },
  build: {
    outDir: "build",
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWFsc1xcXFx1aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW1hbHNcXFxcdWlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FtYWxzL3VpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAndXJsJztcblxuaW1wb3J0IHsgVGFuU3RhY2tSb3V0ZXJWaXRlIH0gZnJvbSAnQHRhbnN0YWNrL3JvdXRlci1wbHVnaW4vdml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgc3ZnclBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcbmltcG9ydCB2aXRlVHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoKSA9PiAoe1xuICBwbHVnaW5zOiBbXG4gICAgVGFuU3RhY2tSb3V0ZXJWaXRlKHtcbiAgICAgIHJvdXRlc0RpcmVjdG9yeTogJy4vc3JjL3BhZ2VzJyxcbiAgICAgIGdlbmVyYXRlZFJvdXRlVHJlZTogJy4vc3JjL3JvdXRpbmcvcm91dGVUcmVlLmdlbi50cycsXG4gICAgICBxdW90ZVN0eWxlOiAnc2luZ2xlJyxcbiAgICAgIHNlbWljb2xvbnM6IHRydWUsXG4gICAgICBhdXRvQ29kZVNwbGl0dGluZzogdHJ1ZSxcbiAgICAgIHJvdXRlRmlsZUlnbm9yZVBhdHRlcm46ICd0ZXN0LnRzeD8nLFxuICAgIH0pLFxuICAgIHJlYWN0KHsgaW5jbHVkZTogJyoqLyoudHN4JyB9KSxcbiAgICB2aXRlVHNjb25maWdQYXRocygpLFxuICAgIHN2Z3JQbHVnaW4oKSxcbiAgXSxcblxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFtcbiAgICAgIHsgZmluZDogJ34nLCByZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpIH0sXG4gICAgICB7IGZpbmQ6ICd0ZXN0cycsIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vdGVzdHMnLCBpbXBvcnQubWV0YS51cmwpKSB9LFxuICAgIF0sXG4gIH0sXG5cbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICBhcGk6ICdtb2Rlcm4tY29tcGlsZXInLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuXG4gIHNlcnZlcjoge1xuICAgIG9wZW46IGZhbHNlLFxuICAgIGhvc3Q6IHRydWUsXG4gICAgcG9ydDogMzAwMCxcbiAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgIGhtcjoge1xuICAgICAgcG9ydDogMzAwMCxcbiAgICB9LFxuICB9LFxuXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnYnVpbGQnLFxuICAgIG1vZHVsZVByZWxvYWQ6IGZhbHNlLFxuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgbWluaWZ5OiBmYWxzZSxcbiAgICBjc3NDb2RlU3BsaXQ6IGZhbHNlLFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2TyxTQUFTLGVBQWUsV0FBVztBQUVoUixTQUFTLDBCQUEwQjtBQUNuQyxPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyx1QkFBdUI7QUFObUgsSUFBTSwyQ0FBMkM7QUFTbE0sSUFBTyxzQkFBUSxhQUFhLE9BQU87QUFBQSxFQUNqQyxTQUFTO0FBQUEsSUFDUCxtQkFBbUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixvQkFBb0I7QUFBQSxNQUNwQixZQUFZO0FBQUEsTUFDWixZQUFZO0FBQUEsTUFDWixtQkFBbUI7QUFBQSxNQUNuQix3QkFBd0I7QUFBQSxJQUMxQixDQUFDO0FBQUEsSUFDRCxNQUFNLEVBQUUsU0FBUyxXQUFXLENBQUM7QUFBQSxJQUM3QixrQkFBa0I7QUFBQSxJQUNsQixXQUFXO0FBQUEsRUFDYjtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsRUFBRSxNQUFNLEtBQUssYUFBYSxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUMsRUFBRTtBQUFBLE1BQzNFLEVBQUUsTUFBTSxTQUFTLGFBQWEsY0FBYyxJQUFJLElBQUksV0FBVyx3Q0FBZSxDQUFDLEVBQUU7QUFBQSxJQUNuRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLEtBQUs7QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLEtBQUs7QUFBQSxNQUNILE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBRUEsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLElBQ2YsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLEVBQ2hCO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
