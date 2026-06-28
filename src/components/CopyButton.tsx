'use client';

import React, { useState } from 'react';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, label = 'Copy', className = '' }) => {
  const [copied, setCopied] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCopy = async () => {
    try {
      if (!text) {
        throw new Error('No text to copy');
      }
      await navigator.clipboard.writeText(text);
      setCopied('success');
      setTimeout(() => setCopied('idle'), 2500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopied('error');
      setTimeout(() => setCopied('idle'), 5000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer ${
        copied === 'success'
          ? 'bg-brand-green text-brand-offwhite'
          : copied === 'error'
          ? 'bg-red-900/80 text-brand-offwhite border border-red-500/50'
          : 'bg-brand-navy-light text-brand-gold border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-navy-dark'
      } ${className}`}
    >
      {copied === 'success' ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>Copied to clipboard</span>
        </>
      ) : copied === 'error' ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Copy failed. Please select and copy the text manually.</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
