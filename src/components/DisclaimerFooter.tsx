import React from 'react';

export const DisclaimerFooter: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-brand-grey-border/60 bg-brand-navy-dark/80 py-4 px-6 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-start gap-3 max-w-3xl">
          <div className="text-brand-gold mt-0.5 shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-xs text-brand-grey-text leading-relaxed">
            <span className="font-semibold text-brand-gold">Disclaimer:</span> Prototype support tool. Not an official UN, CCCPA, DEDI, or government platform. Users should validate all outputs against official mandates, policies, and context-specific evidence.
          </p>
        </div>
        <div className="text-[10px] text-brand-grey-text/60 font-mono self-end">
          YCPS Toolkit Lab v1.0.0
        </div>
      </div>
    </footer>
  );
};
