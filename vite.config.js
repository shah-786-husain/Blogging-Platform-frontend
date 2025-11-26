// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Allow importing environment variables from .env files
  define: {
    "process.env": {},
  },

  //  Optional: if your frontend (Vite) runs on port 3000
  // and backend (Express) runs on port 5000, setup proxy
  server: {
    port: 3000,
    proxy: {
      "/services": {
        target: "https://blogging-platform-backend-app.onrender.com", // Your backend server
        changeOrigin: true,
        secure: false,
      },
      "/images": {
        target: "https://blogging-platform-backend-app.onrender.com/images", // Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },

  //  Build settings (optional)
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
