/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            colors: {
                primary: "#4f46e5",
                "primary-dark": "#4338ca",
                secondary: "#14b8a6",
                "secondary-dark": "#0d9488",
            },
        },
    },
    plugins: [],
};
