import React from 'react';
import Link from 'next/link';

export default function TrainingPlaceholder() {
  return (
    <div className="max-w-xl mx-auto py-12 text-center space-y-6">
      <div className="text-brand-gold flex justify-center">
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479L12 21l-6.825-4a12.083 12.083 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-bold text-brand-offwhite">Training & Simulation Support</h1>
        <p className="text-xs text-brand-gold uppercase tracking-widest font-semibold">Future Expansion Module</p>
      </div>

      <p className="text-xs text-brand-grey-text leading-relaxed">
        This expansion module will support YCPS training facilitators by generating roleplay scenarios, interactive simulations, and quiz sheets based on user-configured regional data.
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
