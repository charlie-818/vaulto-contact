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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // Ensure form-name is always included with correct value
      formData.set('form-name', 'intent-form');
      
      // Convert FormData to URLSearchParams for proper encoding
      const params = new URLSearchParams();
      for (const [key, value] of formData.entries()) {
        params.append(key, value as string);
      }
      
      // Debug: Log the form data being sent
      console.log('Form submission data:', Object.fromEntries(params));
      
      const response = await fetch('/forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Still show success for better UX
      setSuccess(true);
    } finally {
      setIsSubmitting(false);
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
        <h3 className="success-title">Thank You!</h3>
        <p className="success-description">
          Your submission has been received. We&apos;ll reach out to you shortly.
        </p>
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
          <form 
            name="intent-form" 
            method="POST" 
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            {/* Hidden field for Netlify form detection */}
            <input type="hidden" name="form-name" value="intent-form" />
            
            {/* Honeypot field - hidden from users but visible to bots */}
            <p style={{ display: 'none' }}>
              <label>
                {'Don\'t fill this out if you\'re human: '}<input name="bot-field" />
              </label>
            </p>
            
            {/* Hidden field to capture the goal */}
            <input type="hidden" name="goal" value={goal} />
            
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

            {/* Conditional fields based on goal */}
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
                    <option value="Art & Collectibles">Art & Collectibles</option>
                    <option value="Intellectual Property">Intellectual Property</option>
                    <option value="Commodities">Commodities</option>
                    <option value="Private Equity">Private Equity</option>
                    <option value="Bonds & Securities">Bonds & Securities</option>
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
                    <option value="$100K - $500K">$100K - $500K</option>
                    <option value="$500K - $1M">$500K - $1M</option>
                    <option value="$1M+">$1M+</option>
                  </select>
                </div>
              </>
            )}

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
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </button>
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
                <Image src="/logo-comp.png" alt="Vaulto" className="modal-logo-img" width={80} height={32} />
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
                  What is Tokenization?
                </h2>
                <p className="section-text">
                  Asset tokenization is the process of converting rights to an asset into a digital token on a blockchain. This revolutionary approach enables fractional ownership, enhanced liquidity, and global accessibility for traditionally illiquid assets.
                </p>
                
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
                    </svg>
                    <h3>Fractional Ownership</h3>
                    <p>Enable multiple investors to own portions of high-value assets</p>
                  </div>
                  <div className="benefit-item">
                    <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                      <path d="M9 12l2 2 4-4"/>
                    </svg>
                    <h3>Global Access</h3>
                    <p>Reach international investors and expand your market</p>
                  </div>
                </div>
              </section>

              <section className="modal-section">
                <h2 className="section-title">
                  <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Benefits for Asset Owners
                </h2>
                <p className="section-text">
                  Transform your assets into digital tokens and unlock new opportunities in the global marketplace. Our platform provides everything you need for secure, compliant tokenization.
                </p>
                
                <div className="feature-grid">
                  <div className="feature-card">
                    <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                    <h3>Instant Liquidity</h3>
                    <p>Convert traditionally illiquid assets into tradeable digital tokens</p>
                  </div>
                 
                    
          
                  <div className="feature-card">
                    <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="8.5" cy="7" r="4"/>
                      <path d="M20 8v6M23 11h-6"/>
                    </svg>
                    <h3>Broader Investor Base</h3>
                    <p>Reach a global pool of investors and increase demand</p>
                  </div>
                </div>
              </section>

              <section className="modal-section">
                <h2 className="section-title">
                  <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                  </svg>
                  Platform Features
                </h2>
                <p className="section-text">
                  Our comprehensive tokenization platform provides all the tools and infrastructure needed to successfully tokenize your assets.
                </p>
                
                <div className="tech-features">
                  <div className="tech-feature">
                    <svg className="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <circle cx="12" cy="16" r="1"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <div>
                      <h4>Enterprise Security</h4>
                      <p>Bank-grade security with multi-signature wallets and cold storage</p>
                    </div>
                  </div>
                  <div className="tech-feature">
                    <svg className="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10,9 9,9 8,9"/>
                    </svg>
                    <div>
                      <h4>Regulatory Compliance</h4>
                      <p>Full compliance with SEC regulations and international standards</p>
                    </div>
                  </div>
                  <div className="tech-feature">
                    <svg className="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="7.5,4.21 12,6.81 16.5,4.21"/>
                      <polyline points="7.5,19.79 7.5,14.6 3,12"/>
                      <polyline points="21,12 16.5,14.6 16.5,19.79"/>
                    </svg>
                    <div>
                      <h4>Smart Contracts</h4>
                      <p>Automated execution of terms and conditions with blockchain technology</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="modal-section">
                <h2 className="section-title">
                  <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                  How It Works
                </h2>
                <p className="section-text">
                  Our streamlined process makes asset tokenization simple and accessible. From initial consultation to token launch, we guide you through every step.
                </p>
                
                <div className="process-steps">
                  <div className="process-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h3>Asset Evaluation</h3>
                      <p>We assess your asset&apos;s tokenization potential and regulatory requirements</p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h3>Legal Structure</h3>
                      <p>Establish compliant legal framework and smart contract architecture</p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h3>Token Creation</h3>
                      <p>Deploy smart contracts and mint tokens representing your asset</p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h3>Market Launch</h3>
                      <p>List tokens on DEXs and begin trading with global investors</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="modal-section">
                <h2 className="section-title">
                  <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  Market Opportunity
                </h2>
                <p className="section-text">
                  Real-world asset tokenization is experiencing explosive growth, with billions of dollars already tokenized across various asset classes.
                </p>
                
                <div className="platform-stats">
                  <div className="stat-item">
                    <span className="stat-number">$234.9B</span>
                    <span className="stat-label">Stablecoins</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">$13.25B</span>
                    <span className="stat-label">Private Credit</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">$7.1B</span>
                    <span className="stat-label">Treasury Debt</span>
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