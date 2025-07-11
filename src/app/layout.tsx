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
  title: "Vaulto - Asset Tokenization Platform",
  description: "Transform your high-value assets into digital tokens. Unlock liquidity, enable fractional ownership, and access global capital markets with institutional-grade blockchain technology.",
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
        {/* Background Elements */}
        <div className="blockchain-bg">
          <div className="blockchain-grid"></div>
          <div className="floating-blocks">
            <div className="block"></div>
            <div className="block"></div>
            <div className="block"></div>
            <div className="block"></div>
            <div className="block"></div>
            <div className="block"></div>
          </div>
          <div className="connection-lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className="token-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
          <div className="code-matrix">
            <div className="code-stream">
              {'function tokenize(asset) {\n  return blockchain.mint(asset);\n}'}
            </div>
            <div className="code-stream">
              {'const value = asset.getValue();\nconst tokens = value / sharePrice;'}
            </div>
            <div className="code-stream">
              {'if (verified) {\n  transfer(tokens, investor);\n}'}
            </div>
            <div className="code-stream">
              {'contract.deploy({\n  asset: realEstate,\n  supply: 1000000\n});'}
            </div>
            <div className="code-stream">
              {'mapping(address => uint256) balances;\nevent Transfer(address, uint256);'}
            </div>
            <div className="code-stream">
              {'require(msg.value >= minInvestment);\nbalances[investor] += tokens;'}
            </div>
          </div>
        </div>
        
        {children}
      </body>
    </html>
  );
}
