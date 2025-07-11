"use client";

import { useState, FormEvent } from 'react';
import Image from 'next/image';

type Goal = 'tokenize' | 'invest' | '';

interface FormData {
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  assetType?: string;
  assetValue?: string;
  investment?: string;
}

export default function IntentForm() {
  const [goal, setGoal] = useState<Goal>('');
  const [formData, setFormData] = useState<FormData>({ fullName: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const submissionData = {
      goal,
      ...formData,
    };

    try {
      const response = await fetch('/api/submit-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <div className="success-icon">
          <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="success-title">Thank You for Your Interest</h3>
        <p className="success-description">
          Your consultation request has been submitted successfully. Our tokenization specialists will contact you within 24 hours to discuss your specific requirements.
        </p>
        <div className="success-steps">
          <h4>Next Steps:</h4>
          <ul>
            <li>Initial consultation call</li>
            <li>Asset evaluation and feasibility study</li>
            <li>Custom tokenization proposal</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Learn More Button */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="learn-more-button"
        >
          Learn More About Tokenization
        </button>
      </div>

      {/* Goal Selection */}
      <div className="radio-group">
        <label className={`radio-option ${goal === 'tokenize' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="goal"
            value="tokenize"
            checked={goal === 'tokenize'}
            onChange={(e) => {
              setGoal(e.target.value as Goal);
              setFormData({ fullName: '', email: '' });
            }}
          />
          <div className="radio-title">Tokenize</div>
        </label>

        <label className={`radio-option ${goal === 'invest' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="goal"
            value="invest"
            checked={goal === 'invest'}
            onChange={(e) => {
              setGoal(e.target.value as Goal);
              setFormData({ fullName: '', email: '' });
            }}
          />
          <div className="radio-title">Invest</div>
        </label>
      </div>

      {/* Form Fields */}
      {goal && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
          {/* Contact Information */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="company" className="form-label">
              Company/Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company || ''}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Company name (optional)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Phone number (optional)"
            />
          </div>

          {/* Asset-specific fields */}
          {goal === 'tokenize' && (
            <>
              <div className="form-group">
                <label htmlFor="assetType" className="form-label">
                  Asset Type *
                </label>
                <select
                  id="assetType"
                  name="assetType"
                  value={formData.assetType || ''}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select asset type</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Fine Art">Fine Art & Collectibles</option>
                  <option value="Private Equity">Private Equity</option>
                  <option value="Intellectual Property">Intellectual Property</option>
                  <option value="Commodities">Commodities</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="assetValue" className="form-label">
                  Estimated Asset Value (USD) *
                </label>
                <select
                  id="assetValue"
                  name="assetValue"
                  value={formData.assetValue || ''}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select value range</option>
                  <option value="$10K - $25K">$10K - $25K</option>
                  <option value="$25K - $50K">$25K - $50K</option>
                  <option value="$50K - $100K">$50K - $100K</option>
                  <option value="$100K - $250K">$100K - $250K</option>
                  <option value="$250K - $500K">$250K - $500K</option>
                  <option value="$500K - $1M">$500K - $1M</option>
                  <option value="$1M - $5M">$1M - $5M</option>
                  <option value="$5M - $10M">$5M - $10M</option>
                  <option value="$10M+">$10M+</option>
                </select>
              </div>
            </>
          )}

          {/* Investment-specific fields */}
          {goal === 'invest' && (
            <div className="form-group">
              <label htmlFor="investment" className="form-label">
                Investment Range (USD) *
              </label>
              <select
                id="investment"
                name="investment"
                value={formData.investment || ''}
                onChange={handleInputChange}
                className="form-select"
                required
              >
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
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Processing...
              </>
            ) : (
              'Submit'
            )}
          </button>

          {error && (
            <div style={{ 
              marginTop: '16px', 
              padding: '12px', 
              backgroundColor: '#7f1d1d', 
              border: '1px solid #dc2626', 
              borderRadius: '8px', 
              color: '#fca5a5',
              textAlign: 'center'
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}
          </form>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="modal-header">
              <div className="modal-logo">
                <Image src="/logo-comp.png" alt="Vaulto" className="modal-logo-img" width={200} height={80} />
              </div>
              <h1 className="modal-title">The Vaulto Revolution</h1>
              <p className="modal-subtitle">Unlocking Value in the Digital Economy</p>
            </div>

            <div className="modal-body">
              <section className="modal-section">
                <h2 className="section-title">The Future of Asset Ownership</h2>
                <p className="section-text">
                  In our rapidly evolving, computer-powered world, traditional asset ownership is being revolutionized. 
                  Tokenization represents the next frontier in financial innovation, converting real-world assets into 
                  digital tokens that can be traded, divided, and accessed globally through blockchain technology.
                </p>
              </section>

              <section className="modal-section">
                <h2 className="section-title">Why Tokenization Matters Now</h2>
                <p className="section-text">
                  Transform illiquid assets into tradeable digital tokens, access DeFi protocols for lending and yield generation, 
                  and enable fractional ownership for broader investment opportunities.
                </p>
              </section>

              <section className="modal-section">
                <h2 className="section-title">The Vaulto Process</h2>
                <p className="section-text">
                  Professional asset evaluation and legal compliance → Custom smart contract development → 
                  Token issuance with full legal backing → DeFi integration and global trading access.
                </p>
              </section>

              <section className="modal-section">
                <h2 className="section-title">Essential Crypto Exposure</h2>
                <p className="section-text">
                  As AI and blockchain reshape global finance, crypto asset exposure is essential for portfolio growth 
                  and protection. Tokenized assets bridge traditional investments and the digital economy, offering 
                  unprecedented wealth creation opportunities in our computer-powered world.
                </p>
              </section>

              <section className="modal-section final-section">
                <h2 className="section-title">Ready to Transform Your Assets?</h2>
                <p className="section-text">
                  Join the digital asset revolution. Whether you&apos;re looking to tokenize valuable assets or invest in 
                  tokenized opportunities, Vaulto provides the expertise and technology to navigate this new frontier safely and profitably.
                </p>
                <button className="modal-cta" onClick={() => setShowModal(false)}>
                  Start Your Tokenization Journey
                </button>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 