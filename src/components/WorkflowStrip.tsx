'use client';

import React from 'react';
import Link from 'next/link';

export type WorkflowStepId = 'context' | 'matrix' | 'risk' | 'stakeholders' | 'draft' | 'review' | 'finalize';

interface StepItem {
  id: WorkflowStepId;
  label: string;
  href: string;
}

const STEPS: StepItem[] = [
  { id: 'context', label: 'Context', href: '/case-studies' },
  { id: 'matrix', label: 'Matrix', href: '/matrix' },
  { id: 'risk', label: 'Risk', href: '/risk-pathways' },
  { id: 'stakeholders', label: 'Stakeholders', href: '/stakeholders' },
  { id: 'draft', label: 'Draft', href: '/toolkit' },
  { id: 'review', label: 'Review', href: '/review' },
  { id: 'finalize', label: 'Finalize', href: '/toolkit?outputType=complete_package' }
];

interface WorkflowStripProps {
  currentStep: WorkflowStepId;
}

export function WorkflowStrip({ currentStep }: WorkflowStripProps) {
  return (
    <div className="w-full bg-brand-navy-dark/90 border border-brand-grey-border/40 rounded-xl p-2.5 no-print shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 max-w-4xl mx-auto text-[10px] uppercase tracking-wider font-semibold">
        <span className="text-brand-grey-text/50 font-bold text-[9px] mr-1">
          Workflow:
        </span>
        {STEPS.map((step, idx) => {
          const isActive = step.id === currentStep;
          
          return (
            <React.Fragment key={step.id}>
              <Link
                href={step.href}
                className={`transition-all py-1 px-2 rounded-md hover:bg-brand-navy-light/40 cursor-pointer ${
                  isActive
                    ? 'text-brand-gold bg-brand-navy-light/50 border border-brand-gold/20 font-bold'
                    : 'text-brand-grey-text hover:text-brand-offwhite'
                }`}
              >
                <span className="mr-1.5 opacity-60">0{idx + 1}</span>
                {step.label}
              </Link>
              {idx < STEPS.length - 1 && (
                <span className="text-brand-grey-text/30 select-none">→</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
