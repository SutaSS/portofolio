import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://andikasaktih.com"),
  title: {
    default: "Andika Saktidana Hernadi — Fullstack Software Engineer & UI/UX Designer",
    template: "%s | Andika Saktidana Hernadi",
  },
  description: "Portfolio of Andika Saktidana Hernadi, a Software Engineer and UI/UX Designer crafting clean architecture applications. Passionate about endurance sports, discipline, and constant growth.",
  keywords: ["Andika Saktidana Hernadi", "Software Engineer", "Fullstack Developer", "UI/UX Designer", "Next.js", "React", "Mobile Development", "GSAP", "Endurance Sports"],
  authors: [{ name: "Andika Saktidana Hernadi" }],
  creator: "Andika Saktidana Hernadi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://andikasaktih.com",
    title: "Andika Saktidana Hernadi — Fullstack Software Engineer & UI/UX Designer",
    description: "Portfolio of Andika Saktidana Hernadi, a Software Engineer and UI/UX Designer crafting clean architecture applications.",
    siteName: "Andika Saktidana Hernadi Portfolio",
    images: [
      {
        url: "/assets/Hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "Andika Saktidana Hernadi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andika Saktidana Hernadi — Fullstack Software Engineer & UI/UX Designer",
    description: "Portfolio of Andika Saktidana Hernadi, a Software Engineer and UI/UX Designer crafting clean architecture applications.",
    images: ["/assets/Hero-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/assets/favicon/favicon.ico' },
      { url: '/assets/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/favicon/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${orbitron.variable} ${inter.variable} font-inter antialiased bg-canvas text-ink selection:bg-focus-blue selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
