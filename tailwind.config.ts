import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        shinobi: {
          orange: "#FF7F00",
          brightOrange: "#FF9900",
          deepOrange: "#E65100",
          black: "#0D0B12",
          darkNavy: "#090A14",
          midnight: "#0C061A",
          chakraBlue: "#00BFFF",
          rasengan: "#38BDF8",
          sharingan: "#E11D48",
          sharinganDeep: "#9F1239",
          leafGreen: "#10B981",
          gold: "#FBBF24",
          sakuraPink: "#F472B6",
          sakuraSoft: "#FBCFE8",
        },
        magical: {
          pink: "#FF69B4",
          softPink: "#FFB6C1",
          deepPink: "#FF1493",
          blush: "#FFF0F5",
          roseGold: "#B76E79",
          lavender: "#E6E6FA",
          lilac: "#D8BFD8",
          purple: "#9370DB",
          deepPurple: "#4B0082",
          midnight: "#080312",
          midnightLight: "#140726",
          gold: "#FFD700",
          starGold: "#FFE57F",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        handwriting: ["var(--font-dancing)", "cursive"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "float-fast": "float 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "chakra-pulse": "chakraPulse 2s ease-in-out infinite",
        "sharingan-spin": "sharinganSpin 12s linear infinite",
        "rasengan-spin": "rasenganSpin 1.2s linear infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "flutter-left": "flutterLeft 0.8s ease-in-out infinite alternate",
        "flutter-right": "flutterRight 0.8s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(3deg)" },
        },
        chakraPulse: {
          "0%, 100%": {
            boxShadow: "0 0 25px rgba(255, 127, 0, 0.4), 0 0 50px rgba(0, 191, 255, 0.25)",
          },
          "50%": {
            boxShadow: "0 0 45px rgba(255, 127, 0, 0.8), 0 0 70px rgba(0, 191, 255, 0.5)",
          },
        },
        sharinganSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        rasenganSpin: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.08)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(255, 105, 180, 0.4), 0 0 40px rgba(147, 112, 219, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 35px rgba(255, 105, 180, 0.7), 0 0 60px rgba(147, 112, 219, 0.5)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "shinobi-gradient": "linear-gradient(135deg, #090314 0%, #150624 35%, #2a0b16 70%, #180512 100%)",
        "chakra-radial": "radial-gradient(circle at 50% 25%, rgba(255, 127, 0, 0.3), rgba(0, 191, 255, 0.15), transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
