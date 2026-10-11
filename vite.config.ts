import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub Pages serves the app under /<repo-name>/
const base = '/partyspiele/';

export default defineConfig({
  base,
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      pwaAssets: { config: true },
      manifest: {
        name: 'Partyspiele',
        short_name: 'Partyspiele',
        description: 'Partyspiele zum Herumreichen – offline auf einem Gerät.',
        lang: 'de',
        theme_color: '#1f8a4c',
        background_color: '#0f1a14',
        display: 'standalone',
        orientation: 'portrait',
        start_url: base,
        scope: base,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,json,webmanifest}'],
      },
    }),
  ],
});
