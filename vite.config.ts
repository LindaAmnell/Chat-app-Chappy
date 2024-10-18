import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:1989/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Om din backend inte har /api i sin struktur
      },
    },
  },
});
