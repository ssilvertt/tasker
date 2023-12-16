const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
    theme: {
        extend: {
            fontFamily: {
                display: ["Oswald", "sans"],
                sign: ["Source Sans 3", "sans-serif"],
                montserrat: ['Montserrat', 'sans-serif']
            },
            colors: {
                "light-gray-bg": "#f7f7f7",
                "btn-login": "#fcd12a",
                "yellow-main": "#fabb18",
                "text-login-sign": "#4c4c4c",
                "near-placeholder": "#191919",
                "login-redirect": "#484f59",
                "login-redirect-hover": "#333333",
                "task-grey": "#f6f7f9",
            },
            padding: {
                custom: "39px",
            },
        },
    },
    plugins: [],
});
