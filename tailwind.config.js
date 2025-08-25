/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Light theme
                'background': '#f0f4f8',
                'foreground': '#0f172a',
                'card': '#ffffff',
                'card-foreground': '#0f172a',
                'primary': '#3b82f6',
                'primary-foreground': '#ffffff',
                'secondary': '#e2e8f0',
                'secondary-foreground': '#0f172a',
                'accent': '#10b981',
                'accent-foreground': '#ffffff',
                'destructive': '#ef4444',
                'destructive-foreground': '#ffffff',
                'muted': '#f1f5f9',
                'muted-foreground': '#64748b',
                'border': '#e2e8f0',

                // Dark theme
                'dark-background': '#0b1120',
                'dark-foreground': '#e2e8f0',
                'dark-card': '#1e293b',
                'dark-card-foreground': '#e2e8f0',
                'dark-primary': '#60a5fa',
                'dark-primary-foreground': '#0f172a',
                'dark-secondary': '#334155',
                'dark-secondary-foreground': '#e2e8f0',
                'dark-accent': '#34d399',
                'dark-accent-foreground': '#0f172a',
                'dark-destructive': '#f87171',
                'dark-destructive-foreground': '#0f172a',
                'dark-muted': '#1e293b',
                'dark-muted-foreground': '#94a3b8',
                'dark-border': '#334155',
            },
            keyframes: {
                fault: {
                    '0%, 100%': { transform: 'scale(1)', backgroundColor: 'var(--tw-prose-bold)' },
                    '50%': { transform: 'scale(1.1)', backgroundColor: 'var(--color-destructive)' },
                },
                hit: {
                    '0%, 100%': { transform: 'scale(1)', backgroundColor: 'var(--tw-prose-bold)' },
                    '50%': { transform: 'scale(1.1)', backgroundColor: 'var(--color-accent)' },
                },
            },
            animation: {
                fault: 'fault 0.5s ease-in-out',
                hit: 'hit 0.5s ease-in-out',
            },
        },
    },
    plugins: [],
}