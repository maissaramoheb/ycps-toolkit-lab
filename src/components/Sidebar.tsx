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
    },
    {
      href: '/toolkit',
      label: 'Activity Connector',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  const placeholderLinks = [
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/training', label: 'Training Support' },
    { href: '/language', label: 'Language Compliance' },
    { href: '/review', label: 'Quality Review' },
    { href: '/export', label: 'Bulk Export' }
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
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
          {/* Core Modules */}
          <div>
            <span className="block px-3 text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-3">
              Core Modules
            </span>
            <nav className="space-y-1">
              {coreLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-brand-navy-light text-brand-gold border-l-2 border-brand-gold shadow-md shadow-black/10'
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

          {/* Future Expansion Placeholder Routes */}
          <div>
            <div className="flex items-center gap-1.5 px-3 mb-3">
              <span className="text-[10px] font-bold text-brand-grey-text/60 uppercase tracking-widest">
                Future Modules
              </span>
              <span className="bg-brand-gold/10 text-brand-gold text-[8px] font-semibold px-1.5 py-0.5 rounded border border-brand-gold/20">
                PLAN
              </span>
            </div>
            <nav className="space-y-1">
              {placeholderLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                      active
                        ? 'bg-brand-navy-light/80 text-brand-gold'
                        : 'text-brand-grey-text/70 hover:text-brand-offwhite hover:bg-brand-navy-light/30'
                    }`}
                  >
                    <span>{link.label}</span>
                    <svg className="w-3 h-3 text-brand-grey-text/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
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
