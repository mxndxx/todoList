import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        '#F8FAFC': '#F8FAFC',
        '#CBD5E1': '#CBD5E1',
        '#E2E8F0': '#E2E8F0',
        '#94A3B8': '#94A3B8',
        '#64748B': '#64748B',
        '#92400E': '#92400E',
        '#F43F5E': '#F43F5E',
        '#BEF264': '#BEF264',
        '#0F172A80':'#0F172A80',
      },

      padding: {
        '20px': '20px',
        '100px': '100px',
        '200px': '200px',
        '250px': '250px',
      },
      margin: {
        '10px': '10px',
        '15px': '15px',
        '20px': '20px',
      },
      width: {
        '60px': '60px',
        '168px': '168px',
        '580px': '580px',
        '600px': '600px',
        '380px': '380px',
        '1000px': '1000px',
        '1200px': '1200px',
      },
      height: {
        '50px' :'50px',
        '56px' :'56px',
        '60px' :'60px',
        '300px' :'300px',
      },
      backgroundImage: {
        'detail-memo': "url('//img/memo.svg')",
      }
    }
  },
  plugins: [],
} satisfies Config;
