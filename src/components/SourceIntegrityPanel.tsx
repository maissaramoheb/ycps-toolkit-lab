'use client';

import React from 'react';
import { SOURCES_HIERARCHY, SourceId } from '@/lib/sourceTruth';

interface SourceIntegrityPanelProps {
  sourceId: SourceId;
  validationStatus?: 'complete' | 'pending' | 'warning';
  validationMessage?: string;
  className?: string;
}

export const SourceIntegrityPanel: React.FC<SourceIntegrityPanelProps> = ({
  sourceId,
  validationStatus = 'pending',
  validationMessage = 'Outputs must be cross-checked against national mandates and localized context-specific evidence.',
  className = ''
}) => {
  const source = SOURCES_HIERARCHY[sourceId];

  if (!source) return null;

  const getStatusDisplay = () => {
    switch (validationStatus) {
      case 'complete':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20">
            Validated Output
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
            To Be Validated
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
            Operational Draft
          </span>
        );
    }
  };

  return (
    <div className={`glass-panel p-4 rounded-xl border border-brand-gold/20 bg-brand-navy-light/40 space-y-3 no-print ${className}`}>
      {/* Panel Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-brand-gold/10 border border-brand-gold/30 text-brand-gold flex items-center justify-center text-xs font-bold font-mono">
            {source.priority}
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block">
              Source Integrity Guidance
            </span>
            <span className="text-[9px] text-brand-grey-text block mt-0.5">
              Rank {source.priority} in YCPS Hierarchy
            </span>
          </div>
        </div>
        {getStatusDisplay()}
      </div>

      <hr className="border-brand-grey-border/30" />

      {/* Source Details */}
      <div className="space-y-2 text-[11px] leading-relaxed">
        <div>
          <span className="font-semibold text-brand-offwhite block">Source Document:</span>
          <span className="text-brand-grey-text block text-xs font-medium mt-0.5">{source.name}</span>
        </div>
        <div>
          <span className="font-semibold text-brand-offwhite block">Focus Scope:</span>
          <span className="text-brand-grey-text">{source.focusArea}</span>
        </div>
        <div className="bg-brand-navy-dark/65 p-2 rounded border border-brand-grey-border/35 text-[10px] text-brand-gold">
          <span className="font-semibold block mb-0.5">💡 Strategic Mandate Reminder:</span>
          {source.mandateReminder}
        </div>
      </div>

      <hr className="border-brand-grey-border/20" />

      {/* Validation Note */}
      <div className="text-[10px] text-brand-grey-text/80 flex items-start gap-1.5 leading-normal">
        <svg className="w-3.5 h-3.5 text-brand-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>{validationMessage}</p>
      </div>
    </div>
  );
};
