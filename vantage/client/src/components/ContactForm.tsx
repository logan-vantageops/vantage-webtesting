/**
 * Contact Form Component - Vantage Operations
 *
 * Submits lead data directly to n8n webhook
 * Fields: Name, Company Name, Email, Phone Number (all required)
 */

import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const N8N_WEBHOOK_URL = 'https://logan-vantageoperations.app.n8n.cloud/webhook/landing-page-lead';

interface FormData {
  name: string;
  companyName: string;
  email: string;
  phoneNumber: string;
}

interface FormStatus {
  state: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    companyName: '',
    email: '',
    phoneNumber: '',
  });

  const [status, setStatus] = useState<FormStatus>({ state: 'idle' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setStatus({ state: 'loading' });

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Submission failed: ${response.status}`);
      }

      setStatus({
        state: 'success',
        message: "Thank you! We've received your information and will be in touch soon.",
      });
      setFormData({ name: '', companyName: '', email: '', phoneNumber: '' });
      setTimeout(() => setStatus({ state: 'idle' }), 5000);
    } catch {
      setStatus({
        state: 'error',
        message: 'Something went wrong. Please try again or contact us directly.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Success Message */}
      {status.state === 'success' && (
        <div style={{ backgroundColor: '#e8f5e9', border: '1px solid #81c784', borderRadius: '8px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <CheckCircle style={{ width: '20px', height: '20px', color: '#4caf50', flexShrink: 0, marginTop: '4px' }} />
          <div>
            <p style={{ color: '#2e7d32', fontWeight: 600, margin: 0 }}>Success!</p>
            <p style={{ color: '#558b2f', fontSize: '0.875rem', margin: '4px 0 0' }}>{status.message}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {status.state === 'error' && (
        <div style={{ backgroundColor: '#ffebee', border: '1px solid #ef5350', borderRadius: '8px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <AlertCircle style={{ width: '20px', height: '20px', color: '#d32f2f', flexShrink: 0, marginTop: '4px' }} />
          <div>
            <p style={{ color: '#c62828', fontWeight: 600, margin: 0 }}>Error</p>
            <p style={{ color: '#b71c1c', fontSize: '0.875rem', margin: '4px 0 0' }}>{status.message}</p>
          </div>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#333333', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
          Name <span style={{ color: '#005696' }}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '6px',
            border: `2px solid ${errors.name ? '#ef5350' : '#e0e0e0'}`,
            backgroundColor: errors.name ? '#ffebee' : '#ffffff',
            fontSize: '0.9rem',
            fontFamily: "'Poppins', sans-serif",
            outline: 'none',
            transition: 'border-color 0.2s',
            color: '#333333',
          }}
          onFocus={(e) => { if (!errors.name) e.currentTarget.style.borderColor = '#005696'; }}
          onBlur={(e) => { if (!errors.name) e.currentTarget.style.borderColor = '#e0e0e0'; }}
        />
        {errors.name && (
          <p style={{ color: '#d32f2f', fontSize: '0.75rem', marginTop: '4px', fontFamily: "'Poppins', sans-serif" }}>{errors.name}</p>
        )}
      </div>

      {/* Company Name Field */}
      <div>
        <label htmlFor="companyName" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#333333', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
          Company Name <span style={{ color: '#005696' }}>*</span>
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Your company name"
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '6px',
            border: `2px solid ${errors.companyName ? '#ef5350' : '#e0e0e0'}`,
            backgroundColor: errors.companyName ? '#ffebee' : '#ffffff',
            fontSize: '0.9rem',
            fontFamily: "'Poppins', sans-serif",
            outline: 'none',
            transition: 'border-color 0.2s',
            color: '#333333',
          }}
          onFocus={(e) => { if (!errors.companyName) e.currentTarget.style.borderColor = '#005696'; }}
          onBlur={(e) => { if (!errors.companyName) e.currentTarget.style.borderColor = '#e0e0e0'; }}
        />
        {errors.companyName && (
          <p style={{ color: '#d32f2f', fontSize: '0.75rem', marginTop: '4px', fontFamily: "'Poppins', sans-serif" }}>{errors.companyName}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#333333', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
          Email <span style={{ color: '#005696' }}>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '6px',
            border: `2px solid ${errors.email ? '#ef5350' : '#e0e0e0'}`,
            backgroundColor: errors.email ? '#ffebee' : '#ffffff',
            fontSize: '0.9rem',
            fontFamily: "'Poppins', sans-serif",
            outline: 'none',
            transition: 'border-color 0.2s',
            color: '#333333',
          }}
          onFocus={(e) => { if (!errors.email) e.currentTarget.style.borderColor = '#005696'; }}
          onBlur={(e) => { if (!errors.email) e.currentTarget.style.borderColor = '#e0e0e0'; }}
        />
        {errors.email && (
          <p style={{ color: '#d32f2f', fontSize: '0.75rem', marginTop: '4px', fontFamily: "'Poppins', sans-serif" }}>{errors.email}</p>
        )}
      </div>

      {/* Phone Number Field */}
      <div>
        <label htmlFor="phoneNumber" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#333333', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
          Phone Number <span style={{ color: '#005696' }}>*</span>
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '6px',
            border: `2px solid ${errors.phoneNumber ? '#ef5350' : '#e0e0e0'}`,
            backgroundColor: errors.phoneNumber ? '#ffebee' : '#ffffff',
            fontSize: '0.9rem',
            fontFamily: "'Poppins', sans-serif",
            outline: 'none',
            transition: 'border-color 0.2s',
            color: '#333333',
          }}
          onFocus={(e) => { if (!errors.phoneNumber) e.currentTarget.style.borderColor = '#005696'; }}
          onBlur={(e) => { if (!errors.phoneNumber) e.currentTarget.style.borderColor = '#e0e0e0'; }}
        />
        {errors.phoneNumber && (
          <p style={{ color: '#d32f2f', fontSize: '0.75rem', marginTop: '4px', fontFamily: "'Poppins', sans-serif" }}>{errors.phoneNumber}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '14px 32px',
          backgroundColor: isLoading ? 'rgba(212, 175, 55, 0.7)' : '#D4AF37',
          color: '#FFFFFF',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          fontSize: '0.95rem',
          letterSpacing: '0.04em',
          border: 'none',
          borderRadius: '6px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s, box-shadow 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          opacity: isLoading ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.backgroundColor = '#b8941e';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,175,55,0.35)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.currentTarget.style.backgroundColor = '#D4AF37';
            e.currentTarget.style.boxShadow = 'none';
          }
        }}
      >
        {isLoading ? (
          <>
            <div style={{ width: '16px', height: '16px', border: '2px solid #ffffff', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
            Submitting...
          </>
        ) : (
          'Send Message →'
        )}
      </button>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <p style={{ textAlign: 'center', color: '#999999', fontSize: '0.75rem', fontFamily: "'Poppins', sans-serif", margin: 0 }}>
        Your information is secure and will only be used to connect you with our team.
      </p>
    </form>
  );
}
