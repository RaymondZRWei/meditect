/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            colors: {
                primary: "#2563eb",
                "primary-dark": "#1d4ed8",
                secondary: "#14b8a6",
                "secondary-dark": "#0d9488",
            },
        },
    },
    plugins: [],
};
