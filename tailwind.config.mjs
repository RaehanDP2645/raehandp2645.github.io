import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig ({
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [ 
    tailwindcss(),
  ],
})