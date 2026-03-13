import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],resolve: {
    alias: {
    "@": path.resolve(__dirname, "./src"),
    "@features": path.resolve(__dirname, "./src/features"),
    "@shared": path.resolve(__dirname, "./src/shared"),
    "@pages": path.resolve(__dirname, "./src/pages"),
    "@api": path.resolve(__dirname, "./src/api"),
    "@types": path.resolve(__dirname, "./src/types"),
  },
    dedupe: ["react", "react-dom"],
  },
})
