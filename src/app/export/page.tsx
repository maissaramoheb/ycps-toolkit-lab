import React from 'react';
import Link from 'next/link';

export default function ExportPlaceholder() {
  return (
    <div className="max-w-xl mx-auto py-12 text-center space-y-6">
      <div className="text-brand-gold flex justify-center">
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
        </svg>
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-bold text-brand-offwhite">Bulk Output Export</h1>
        <p className="text-xs text-brand-gold uppercase tracking-widest font-semibold">Future Expansion Module</p>
      </div>

      <p className="text-xs text-brand-grey-text leading-relaxed">
        This expansion module will support generating ZIP packages of all outputs (Briefs, Matrix sheets, Stakeholder datasets) in multiple formats, including PDF, Markdown, CSV, and XLSX.
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
