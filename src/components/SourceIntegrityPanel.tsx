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
            User-Marked Validated
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
            To Be Validated
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
      {sourceId === 'candidate_methodology' ? (
        <div className="space-y-3.5 text-[11px] leading-relaxed">
          <div className="bg-brand-navy-dark/45 p-2 rounded border border-brand-grey-border/30 text-[10px] text-brand-gold">
            <span className="font-semibold block mb-0.5">💡 Methodology Application Layer:</span>
            To be used alongside the primary DEDI / CCCPA / ToR source hierarchy to operationalize high-level directives.
          </div>

          <div className="grid sm:grid-cols-2 gap-3 border-t border-brand-grey-border/20 pt-2.5">
            <div>
              <span className="font-bold text-brand-offwhite block mb-1">📝 Practice Note Methodology</span>
              <p className="text-[10px] text-brand-grey-text">Operationalizes YCPS in Africa: moves from recognition to implementation, frames youth as resilient leaders, and maps feedback loops between climate stress and local capacity.</p>
            </div>
            <div>
              <span className="font-bold text-brand-offwhite block mb-1">🔧 Technical Note Methodology</span>
              <p className="text-[10px] text-brand-grey-text">Proposed toolkit structure: two-way framework (CPS into YPS & youth inclusion into climate adaptation), Africa-centered, and aligned with DEDI Component 3.</p>
            </div>
          </div>

          <div className="border-t border-brand-grey-border/20 pt-2.5 space-y-1">
            <span className="font-bold text-brand-offwhite block">4 Practical Entry Points:</span>
            <ul className="list-decimal pl-4 text-[10px] text-brand-grey-text space-y-0.5">
              <li>Embed youth in policy and planning processes.</li>
              <li>Link participation with protection.</li>
              <li>Integrate youth into prevention and resilience strategies.</li>
              <li>Build partnerships across the YCPS nexus.</li>
            </ul>
          </div>

          <div className="border-t border-brand-grey-border/20 pt-2.5">
            <span className="font-bold text-brand-offwhite block mb-0.5">Cross-cutting Dimensions:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {['gender-responsiveness', 'conflict sensitivity', 'HDP nexus', 'displacement', 'PVE-climate care'].map((item) => (
                <span key={item} className="px-1.5 py-0.5 text-[9px] font-mono bg-brand-navy-light text-brand-gold rounded border border-brand-grey-border/50">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
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
      )}

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
