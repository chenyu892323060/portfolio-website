import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        panel: '#11131a',
        muted: '#a1a6b5',
      },
      boxShadow: {
        soft: '0 10px 40px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
