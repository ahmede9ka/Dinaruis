module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
    ],
    theme: {
      extend: {
        colors: {
         // Replace blue-900 with your custom green
        },
      },
    },
    plugins: [
        require('flowbite/plugin')
      ],
  }
  