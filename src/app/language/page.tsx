import React from 'react';
import Link from 'next/link';

export default function LanguagePlaceholder() {
  return (
    <div className="max-w-xl mx-auto py-12 text-center space-y-6">
      <div className="text-brand-gold flex justify-center">
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-bold text-brand-offwhite">Diplomatic Language Compliance</h1>
        <p className="text-xs text-brand-gold uppercase tracking-widest font-semibold">Future Expansion Module</p>
      </div>

      <p className="text-xs text-brand-grey-text leading-relaxed">
        This expansion module will automatically analyze brief texts for compliance with strategic guidelines, flagging securitized wording or victimhood framing of youth and suggesting constructive, agency-oriented alternatives.
      </p>

      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy-light text-brand-gold hover:bg-brand-navy-dark border border-brand-gold/30 hover:border-brand-gold rounded-lg text-xs font-bold transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
