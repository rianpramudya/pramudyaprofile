import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://rianpramudya.github.io',
  base: '/pramudyaprofile',
  trailingSlash: 'always',
  integrations: [react(), tailwind()],
  vite: {
    ssr: {
      noExternal: ['lucide-react']
    }
  },
  build: {
    assets: 'assets'
  }
});