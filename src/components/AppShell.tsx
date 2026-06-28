'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { DisclaimerFooter } from './DisclaimerFooter';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-brand-navy-dark">
      {/* Navigation Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Page Area */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64 print:pl-0">
        {/* Top Header Bar */}
        <TopBar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Dynamic Content Page */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Global Footer Disclaimer */}
        <DisclaimerFooter />
      </div>
    </div>
  );
};
