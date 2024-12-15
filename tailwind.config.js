/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        ilight: ['Inter_300Light', 'sans-serif'],
        iregular: ['Inter_400Regular', 'sans-serif'],
        imedium: ['Inter_500Medium', 'sans-serif'],
        isemibold: ['Inter_600SemiBold', 'sans-serif'],
        ibold: ['Inter_700Bold', 'sans-serif'],
        iblack: ['Inter_900Black', 'sans-serif']
      }
    },
  },
  plugins: [],
}