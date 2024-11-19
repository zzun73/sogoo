/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "paper-pattern": "url('/src/assets/paper1.jpg')",
        "black-paper": "url('/src/assets/black-paper.jpg')",
      },
      colors: {
        // 메인 색상(Deep Mocha)
        main: {
          50: "#f9f6f4",
          100: "#f0ebe7",
          200: "#e2d6cd",
          300: "#cdb7a8",
          400: "#b39683",
          500: "#957a65",
          600: "#6F4F3A", // 기본 Deep Mocha
          700: "#5d4231",
          800: "#4d372a",
          900: "#422f24",
          950: "#251a15",
        },
        // 서브 색상(Warm Beidge)
        sub: {
          50: "#fbf8f6",
          100: "#f5efe9",
          200: "#ecdfd5",
          300: "#e2cebb",
          400: "#D9BCA5", // 기본 Warm Beige
          500: "#c6a185",
          600: "#b38a6b",
          700: "#967155",
          800: "#7c5e48",
          900: "#664e3d",
          950: "#362821",
        },
        // 포인트 색상(Traditional Red)
        point: {
          50: "#fdf3f3",
          100: "#fbe5e5",
          200: "#f9cfcf",
          300: "#f3aeae",
          400: "#e77e7e",
          500: "#d65555",
          600: "#B33D3D", // 기본 Traditional Red
          700: "#952f2f",
          800: "#7c2929",
          900: "#672727",
          950: "#381111",
        },
      },
      fontFamily: {
        shilla: ["Shilla_CultureB-Bold"],
        dimibang: ["dimibang_new"],
        chosun: ["ChosunCentennial"],
      },
    },
  },
  plugins: [],
};
