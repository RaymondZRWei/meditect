/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            colors: {
                primary: "#ff0000",
                secondary: "#00ff00",
            },
        },
    },
    plugins: [],
};
