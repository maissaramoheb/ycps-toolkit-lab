import React from 'react';
import Link from 'next/link';

export default function CaseStudiesPlaceholder() {
  return (
    <div className="max-w-xl mx-auto py-12 text-center space-y-6">
      <div className="text-brand-gold flex justify-center">
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-bold text-brand-offwhite">Case Studies Database</h1>
        <p className="text-xs text-brand-gold uppercase tracking-widest font-semibold">Future Expansion Module</p>
      </div>

      <p className="text-xs text-brand-grey-text leading-relaxed">
        This expansion module will host a library of detailed evaluations of youth-led climate adaptation and conflict mediation campaigns across Africa (e.g. Sahel flood defenses, pastoral mediation in Kenya, urban farming in Egypt).
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
