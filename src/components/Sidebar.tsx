'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();

  const coreLinks = [
    {
      href: '/',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      )
    },
    {
      href: '/matrix',
      label: 'YPS × CPS Matrix',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      href: '/risk-pathways',
      label: 'Risk Pathway Builder',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      href: '/stakeholders',
      label: 'Stakeholder Mapper',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const complianceLinks = [
    {
      href: '/language',
      label: 'Language Compliance',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 0A18.015 18.015 0 0110 14.828M15 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2 3h4a2 2 0 012 2v2" />
        </svg>
      )
    },
    {
      href: '/review',
      label: 'Red-Team Review',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  const trainingLinks = [
    {
      href: '/case-studies',
      label: 'Case Study Lab',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      href: '/training',
      label: 'Training Support',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479L12 21l-6.825-4a12.083 12.083 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    }
  ];

  const outputLinks = [
    {
      href: '/toolkit',
      label: 'Activity Connector',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      href: '/brief',
      label: 'Brief Generator',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      href: '/export',
      label: 'Bulk Export (Planned)',
      icon: (
        <svg className="w-4 h-4 text-brand-grey-text/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
        </svg>
      )
    }
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden no-print"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col w-64 border-r border-brand-grey-border/60 bg-brand-navy-dark transition-transform duration-300 md:translate-x-0 no-print ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-brand-grey-border/60 bg-brand-navy-light/40">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-brand-gold text-brand-navy-dark font-bold text-sm">
              YC
            </div>
            <div>
              <span className="font-semibold text-sm tracking-wider text-brand-offwhite">YCPS Toolkit</span>
              <span className="block text-[9px] text-brand-gold font-bold uppercase tracking-widest">Lab • Africa</span>
            </div>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded text-brand-grey-text hover:text-brand-offwhite hover:bg-brand-navy-light md:hidden cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* Core Workspace */}
          <div>
            <span className="block px-3 text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-2">
              Core Workspace
            </span>
            <nav className="space-y-0.5">
              {coreLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                      active
                        ? 'bg-brand-navy-light text-brand-gold border-l-2 border-brand-gold shadow-md'
                        : 'text-brand-grey-text hover:text-brand-offwhite hover:bg-brand-navy-light/40'
                    }`}
                  >
                    <span className={active ? 'text-brand-gold' : 'text-brand-grey-text'}>
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Compliance & Review */}
          <div>
            <span className="block px-3 text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-2">
              Compliance & Review
            </span>
            <nav className="space-y-0.5">
              {complianceLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                      active
                        ? 'bg-brand-navy-light text-brand-gold border-l-2 border-brand-gold shadow-md'
                        : 'text-brand-grey-text hover:text-brand-offwhite hover:bg-brand-navy-light/40'
                    }`}
                  >
                    <span className={active ? 'text-brand-gold' : 'text-brand-grey-text'}>
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Training & Simulation */}
          <div>
            <span className="block px-3 text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-2">
              Training & Simulation
            </span>
            <nav className="space-y-0.5">
              {trainingLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                      active
                        ? 'bg-brand-navy-light text-brand-gold border-l-2 border-brand-gold shadow-md'
                        : 'text-brand-grey-text hover:text-brand-offwhite hover:bg-brand-navy-light/40'
                    }`}
                  >
                    <span className={active ? 'text-brand-gold' : 'text-brand-grey-text'}>
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Outputs & Actions */}
          <div>
            <span className="block px-3 text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-2">
              Outputs & Actions
            </span>
            <nav className="space-y-0.5">
              {outputLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                      active
                        ? 'bg-brand-navy-light text-brand-gold border-l-2 border-brand-gold shadow-md'
                        : 'text-brand-grey-text hover:text-brand-offwhite hover:bg-brand-navy-light/40'
                    }`}
                  >
                    <span className={active ? 'text-brand-gold' : 'text-brand-grey-text'}>
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Policy Rule Reminder Box */}
        <div className="p-4 m-4 rounded-lg bg-brand-navy-light/40 border border-brand-grey-border/40 text-[11px] text-brand-grey-text/80 leading-relaxed">
          <p className="font-semibold text-brand-gold mb-1 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Diplomatic Guidelines
          </p>
          <p>Avoid over-securitization. Present youth as active agents of prevention, peace, and resilience.</p>
        </div>
      </aside>
    </>
  );
};
