import type { Metadata, Viewport } from "next";
import "./globals.css";
import { birthdayConfig } from "@/config/birthdayConfig";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FF7F00",
};

export const metadata: Metadata = {
  title: `${birthdayConfig.hero.heading} | Naruto Shippuden Birthday Experience`,
  description: birthdayConfig.hero.subheading,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-shinobi-black text-orange-50 min-h-screen antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
