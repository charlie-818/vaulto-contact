import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Vaulto - Unlock the Future of Your Assets",
  description: "Vaulto's AI platform transforms real-world assets into liquid digital tokens on the blockchain. Register your interest to see how tokenization can revolutionize your portfolio.",
  keywords: "tokenization, blockchain, assets, digital tokens, real estate, fine art, investment, AI",
  authors: [{ name: "Vaulto" }],
  creator: "Vaulto",
  publisher: "Vaulto",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Vaulto - Unlock the Future of Your Assets",
    description: "Transform real-world assets into liquid digital tokens on the blockchain.",
    url: "https://vaulto.com",
    siteName: "Vaulto",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaulto - Unlock the Future of Your Assets",
    description: "Transform real-world assets into liquid digital tokens on the blockchain.",
    creator: "@vaulto",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0a0a0b" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
