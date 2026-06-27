import React from 'react';
import Link from 'next/link';

interface ModuleCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  statusText?: string;
  statusType?: 'completed' | 'progress' | 'draft' | 'placeholder';
  isFuture?: boolean;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  href,
  icon,
  statusText,
  statusType = 'draft',
  isFuture = false
}) => {
  const getStatusBadge = () => {
    if (!statusText) return null;
    
    let colorClass = 'bg-brand-navy-light/60 text-brand-grey-text border-brand-grey-border';
    if (statusType === 'completed') {
      colorClass = 'bg-brand-green/10 text-brand-green border-brand-green/30';
    } else if (statusType === 'progress') {
      colorClass = 'bg-brand-gold/10 text-brand-gold border-brand-gold/30';
    } else if (statusType === 'placeholder') {
      colorClass = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }

    return (
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${colorClass}`}>
        {statusText}
      </span>
    );
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-xl p-6 flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Decorative Brand Accent (Top border highlight) */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent group-hover:via-brand-gold/50 transition-all duration-300" />

      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="p-2.5 rounded-lg bg-brand-navy-light text-brand-gold border border-brand-gold/10 group-hover:border-brand-gold/30 transition-all duration-300">
            {icon}
          </div>
          {getStatusBadge()}
        </div>

        <h3 className="text-base font-semibold text-brand-offwhite group-hover:text-brand-gold transition-colors duration-200 mb-2">
          {title}
        </h3>
        
        <p className="text-xs text-brand-grey-text leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div>
        {isFuture ? (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-grey-text/60">
            <span>Expansion Planning</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        ) : (
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold hover:text-brand-offwhite transition-colors duration-200"
          >
            <span>Launch Module</span>
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};
