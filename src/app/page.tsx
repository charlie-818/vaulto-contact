"use client";

import IntentForm from "@/components/IntentForm";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Hidden form for Netlify detection - required for Next.js */}
      <form
        name="intent-form"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        style={{ display: 'none' }}
      >
        <input type="hidden" name="form-name" value="intent-form" />
        <p style={{ display: 'none' }}>
          <label>
            Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
          </label>
        </p>
        <input type="hidden" name="goal" />
        <input type="text" name="fullName" required />
        <input type="email" name="email" required />
        <input type="text" name="company" />
        <input type="tel" name="phone" />
        <select name="assetType">
          <option value="">Select asset type</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Art & Collectibles">Art & Collectibles</option>
          <option value="Intellectual Property">Intellectual Property</option>
          <option value="Commodities">Commodities</option>
          <option value="Private Equity">Private Equity</option>
          <option value="Bonds & Securities">Bonds & Securities</option>
          <option value="Other">Other</option>
        </select>
        <select name="assetValue">
          <option value="">Select value range</option>
          <option value="$50K - $100K">$50K - $100K</option>
          <option value="$100K - $500K">$100K - $500K</option>
          <option value="$500K - $1M">$500K - $1M</option>
          <option value="$1M - $5M">$1M - $5M</option>
          <option value="$5M - $10M">$5M - $10M</option>
          <option value="$10M+">$10M+</option>
        </select>
        <select name="investment">
          <option value="">Select investment range</option>
          <option value="$1K - $5K">$1K - $5K</option>
          <option value="$5K - $10K">$5K - $10K</option>
          <option value="$10K - $25K">$10K - $25K</option>
          <option value="$25K - $50K">$25K - $50K</option>
          <option value="$50K - $100K">$50K - $100K</option>
          <option value="$100K - $500K">$100K - $500K</option>
          <option value="$500K - $1M">$500K - $1M</option>
          <option value="$1M+">$1M+</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      {/* Blockchain Background Animations */}
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
          <div className="code-stream">0xA1b2C3d4
{`{gas:21000}`}
transfer()

0x742d35Cc</div>
          <div className="code-stream">pragma solidity

{`{value:0.1}`}
require()

0x4E5F6a7B</div>
          <div className="code-stream">0x123456789a

function withdraw

{`{timestamp}`}
0x789aBcDeF</div>
          <div className="code-stream">bytes32 hash

{`{gwei:50}`}
keccak256()

0xDEAD4321</div>
          <div className="code-stream">0x987654321f

{`{origin:tx}`}
delegatecall()

0xF0E1D2C3</div>
          <div className="code-stream">uint256 amount

{`{status:1}`}
call.value()

0x8C9D0e1F</div>
        </div>
      </div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div style={{ marginBottom: '32px' }}>
            <Image
              src="/logo-comp.png"
              alt="Company Logo"
              width={300}
              height={300}
              style={{ 
                margin: '0 auto', 
                display: 'block',
                width: 'auto',
                height: 'auto',
                maxWidth: '300px',
                maxHeight: '120px'
              }}
            />
          </div>
          <h1 className="hero-title">
            Vault your Assets
          </h1>
          <p className="hero-subtitle" style={{ marginBottom: '0' }}>
            Transform your high-value assets into digital tokens. Unlock liquidity, 
            enable fractional ownership, and access global capital markets with 
            institutional-grade blockchain technology.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section" style={{ paddingTop: '0' }}>
        <div className="container">
          <IntentForm />
        </div>
      </section>
    </div>
  );
}
