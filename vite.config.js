import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // 👈 bắt buộc bind vào tất cả IP mạng nội bộ
    port: 5173,
    allowedHosts: 'all',
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
    allowedHosts: [
      'thermal-southeast-joyce-flour.trycloudflare.com'
    ]
  },
})

