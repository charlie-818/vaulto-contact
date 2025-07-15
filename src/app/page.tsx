"use client";

import IntentForm from "@/components/IntentForm";
import Image from "next/image";

export default function Home() {
  return (
    <div>


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
