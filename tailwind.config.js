/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        void: '#020205',
        ember: '#FF3D00',
        plasma: '#FF6B35',
        ice: '#00D4FF',
        ghost: '#F0EDE8',
        mist: 'rgba(240,237,232,0.06)',
        'mist-12': 'rgba(240,237,232,0.12)',
        'mist-30': 'rgba(240,237,232,0.30)',
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.5em',
      },
    },
  },
  plugins: [],
}
