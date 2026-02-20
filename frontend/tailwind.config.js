import React from "react";
import daisyui from 'daisyui'
import themes from 'daisyui/theme/object'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: true, // Enable all default themes
  },
}

