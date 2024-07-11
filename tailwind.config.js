/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            colors: {
                primary: "#3b82f6",
                "primary-dark": "#2563eb",
                secondary: "#14b8a6",
                "secondary-dark": "#0d9488",
            },
        },
    },
    plugins: [],
};
