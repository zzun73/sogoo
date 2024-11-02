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
        main: "#6F4F3A", // 메인 색상(Deep Mocha)
        sub: "#D9BCA5", // 서브 색생(Warm Beidge)
        point: "#B33D3D", // 포인트 색상(Traditional Red)
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
