"use client";

import IntentForm from "@/components/IntentForm";
import Image from "next/image";

export default function Home() {
  return (
    <div>
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
