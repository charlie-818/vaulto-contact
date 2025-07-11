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
                <h2 className="section-title">
                  <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                  Asset Tokenization Platform
                </h2>
                <p className="section-text">
                  Transform your high-value assets into digital tokens on the blockchain. Enable fractional ownership, unlock liquidity, and access global capital markets with institutional-grade security.
                </p>
                
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9,22 9,12 15,12 15,22"/>
                      </svg>
                    </div>
                    <h3>Real Estate</h3>
                    <p>Tokenize properties for fractional ownership</p>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21,15 16,10 5,21"/>
                      </svg>
                    </div>
                    <h3>Fine Art</h3>
                    <p>Digitize artwork and collectibles</p>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                      </svg>
                    </div>
                    <h3>Commodities</h3>
                    <p>Digital exposure to precious metals</p>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                      </svg>
                    </div>
                    <h3>Business Assets</h3>
                    <p>Tokenize revenue streams and IP</p>
                  </div>
                </div>
              </section>

              <section className="modal-section">
                <h2 className="section-title">
                  <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                    <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                    <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
                  </svg>
                  Key Benefits
                </h2>
                
                <div className="feature-grid">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h3>Instant Liquidity</h3>
                    <p>Convert illiquid assets into tradeable digital tokens with 24/7 global market access.</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
                      </svg>
                    </div>
                    <h3>Fractional Ownership</h3>
                    <p>Enable multiple investors to own portions of high-value assets with lower entry barriers.</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    </div>
                    <h3>Regulatory Compliance</h3>
                    <p>SEC-compliant tokenization with built-in KYC/AML and investor verification.</p>
                  </div>
                </div>
              </section>

              <section className="modal-section">
                <h2 className="section-title">
                  <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                  How It Works
                </h2>
                
                <div className="process-steps">
                  <div className="process-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h3>Asset Evaluation</h3>
                      <p>Professional valuation and due diligence to determine tokenization viability</p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h3>Legal Structure</h3>
                      <p>Establish compliant legal framework with proper regulatory protections</p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h3>Token Creation</h3>
                      <p>Deploy secure smart contracts and mint ERC-1400 compliant security tokens</p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h3>Market Launch</h3>
                      <p>List on compliant exchanges with immediate access to global investor base</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="modal-section">
                <h2 className="section-title">
                  <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12,2 2,7 12,12 22,7 12,2"/>
                    <polyline points="2,17 12,22 22,17"/>
                    <polyline points="2,12 12,17 22,12"/>
                  </svg>
                  Platform Features
                </h2>
                
                <div className="tech-features">
                  <div className="tech-feature">
                    <h4>
                      <svg className="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <circle cx="12" cy="16" r="1"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      Enterprise Security
                    </h4>
                    <p>Multi-signature wallets, institutional-grade custody, and 256-bit encryption</p>
                  </div>
                  <div className="tech-feature">
                    <h4>
                      <svg className="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                      </svg>
                      Real-Time Analytics
                    </h4>
                    <p>Live market data, performance tracking, and comprehensive reporting dashboard</p>
                  </div>
                  <div className="tech-feature">
                    <h4>
                      <svg className="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                      Global Access
                    </h4>
                    <p>24/7 trading, cross-border transactions, and multi-currency support</p>
                  </div>
                </div>
                
                <div className="platform-stats">
                  <div className="stat-item">
                    <div className="stat-number">2.5%</div>
                    <div className="stat-label">Platform Fee</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">2s</div>
                    <div className="stat-label">Transaction Time</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">99.9%</div>
                    <div className="stat-label">Uptime SLA</div>
                  </div>
                </div>
              </section>

              <section className="modal-section final-section">
                <h2 className="section-title">
                  <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                  Ready to Get Started?
                </h2>
                <p className="section-text">
                  Transform your assets into digital tokens and unlock new opportunities in the global marketplace. Our platform provides everything you need for secure, compliant tokenization.
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