'use client';

import React from 'react';
import { useApp, SCENARIOS } from '../context/AppContext';

interface TopBarProps {
  onMenuToggle: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuToggle }) => {
  const { currentScenario, contextName, loadScenario, resetAll } = useApp();

  const handleScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    loadScenario(e.target.value);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 border-b border-brand-grey-border/60 bg-brand-navy-dark/95 backdrop-blur-md no-print">
      {/* Mobile Toggle & Active Section Name */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-1.5 -ml-1.5 rounded-lg text-brand-grey-text hover:text-brand-offwhite hover:bg-brand-navy-light md:hidden cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="hidden sm:block">
          <h2 className="text-xs font-semibold text-brand-grey-text tracking-wide uppercase">
            Active Planning Environment
          </h2>
          <p className="text-sm font-semibold text-brand-offwhite truncate max-w-xs md:max-w-md">
            {contextName}
          </p>
        </div>
      </div>

      {/* Scenario Presets & Quick Actions */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="preset-select" className="hidden lg:block text-xs font-medium text-brand-grey-text">
            Demo Presets:
          </label>
          <select
            id="preset-select"
            value={currentScenario}
            onChange={handleScenarioChange}
            className="bg-brand-navy-light text-brand-offwhite border border-brand-grey-border rounded-lg px-2.5 py-1.5 text-xs font-medium focus:border-brand-gold focus:outline-none transition-all cursor-pointer max-w-[150px] sm:max-w-none"
          >
            <option value="custom">Custom (Blank Slate)</option>
            {Object.entries(SCENARIOS).map(([id, s]) => (
              <option key={id} value={id}>
                Seed: {s.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={resetAll}
          type="button"
          className="px-2.5 py-1.5 border border-red-500/20 hover:border-red-500 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5"
          title="Reset all modules and clear local storage data"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </header>
  );
};
