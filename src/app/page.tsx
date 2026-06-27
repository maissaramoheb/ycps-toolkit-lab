'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ModuleCard } from '@/components/ModuleCard';
import Link from 'next/link';

export default function Dashboard() {
  const {
    currentScenario,
    contextName,
    matrixEntries,
    riskPathways,
    stakeholders,
    loadScenario
  } = useApp();

  // Calculate completion statistics
  const pillarsFilled = Object.values(matrixEntries).filter(
    (entry) =>
      entry.climateSecurityConsideration.trim() !== '' ||
      entry.youthRoleAgency.trim() !== ''
  ).length;

  const pathwaysCount = riskPathways.length;
  const stakeholdersCount = stakeholders.length;

  const isBriefReady = pillarsFilled > 0 || pathwaysCount > 0 || stakeholdersCount > 0;

  // Workflow steps definition
  const workflowSteps = [
    {
      num: '01',
      name: 'Diagnose',
      desc: 'Risk Pathways',
      link: '/risk-pathways',
      active: pathwaysCount > 0,
      count: pathwaysCount,
      color: 'from-blue-500/20 to-blue-500/5'
    },
    {
      num: '02',
      name: 'Integrate',
      desc: 'YPS x CPS Matrix',
      link: '/matrix',
      active: pillarsFilled > 0,
      count: `${pillarsFilled}/5`,
      color: 'from-brand-gold/20 to-brand-gold/5'
    },
    {
      num: '03',
      name: 'Map',
      desc: 'Stakeholder Relations',
      link: '/stakeholders',
      active: stakeholdersCount > 0,
      count: stakeholdersCount,
      color: 'from-purple-500/20 to-purple-500/5'
    },
    {
      num: '04',
      name: 'Recommend',
      desc: 'Diplomatic Wording',
      link: '/matrix',
      active: pillarsFilled > 0,
      count: '',
      color: 'from-brand-green/20 to-brand-green/5'
    },
    {
      num: '05',
      name: 'Review',
      desc: 'Red-Team Warnings',
      link: '/review',
      active: false,
      count: '',
      color: 'from-red-500/10 to-red-500/5'
    },
    {
      num: '06',
      name: 'Export',
      desc: 'Policy Analysis Brief',
      link: '/brief',
      active: isBriefReady,
      count: '',
      color: 'from-teal-500/20 to-teal-500/5'
    }
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl glass-panel p-8 md:p-12 border border-brand-gold/15">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-green/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
            Strategic Planning Workspace
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-offwhite leading-tight">
            From policy language to <span className="text-brand-gold">practical YCPS action.</span>
          </h1>
          <p className="text-sm md:text-base text-brand-grey-text leading-relaxed">
            Translate the Youth, Climate, Peace and Security (YCPS) nexus from generic high-level policy into concrete, localized risk pathways, stakeholder maps, and action matrices for regional stabilization.
          </p>
          
          <div className="pt-4 flex flex-wrap gap-3">
            {currentScenario === 'custom' && (
              <button
                onClick={() => loadScenario('sahel')}
                type="button"
                className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-bold rounded-lg text-xs tracking-wider uppercase shadow-md transition-all duration-200 cursor-pointer"
              >
                Seed Sahel Preset Scenario
              </button>
            )}
            <Link
              href="/matrix"
              className="px-5 py-2.5 bg-brand-navy-light hover:bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200"
            >
              Start Empty Matrix
            </Link>
          </div>
        </div>
      </section>

      {/* Progress & Quick Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/50">
          <span className="text-xs font-semibold text-brand-grey-text">Active Scenario</span>
          <div className="text-base font-bold text-brand-gold mt-1 truncate">{contextName}</div>
        </div>
        <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/50">
          <span className="text-xs font-semibold text-brand-grey-text">YPS Matrix Pillars</span>
          <div className="text-2xl font-extrabold text-brand-offwhite mt-1 flex items-baseline gap-1">
            <span>{pillarsFilled}</span>
            <span className="text-xs text-brand-grey-text font-normal">/ 5 defined</span>
          </div>
        </div>
        <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/50">
          <span className="text-xs font-semibold text-brand-grey-text">Risk Pathways</span>
          <div className="text-2xl font-extrabold text-brand-offwhite mt-1 flex items-baseline gap-1">
            <span>{pathwaysCount}</span>
            <span className="text-xs text-brand-grey-text font-normal">mapped</span>
          </div>
        </div>
        <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/50">
          <span className="text-xs font-semibold text-brand-grey-text">Stakeholders Mapped</span>
          <div className="text-2xl font-extrabold text-brand-offwhite mt-1 flex items-baseline gap-1">
            <span>{stakeholdersCount}</span>
            <span className="text-xs text-brand-grey-text font-normal">analyzed</span>
          </div>
        </div>
      </section>

      {/* Workflow Visualizer */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-brand-offwhite">YCPS Operational Workflow</h2>
          <span className="text-xs text-brand-grey-text">Linear progression model</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {workflowSteps.map((step) => (
            <Link
              key={step.num}
              href={step.link}
              className={`glass-panel p-4 rounded-xl border flex flex-col justify-between h-32 transition-all duration-300 relative group cursor-pointer ${
                step.active
                  ? 'border-brand-gold/40 bg-gradient-to-br ' + step.color
                  : 'border-brand-grey-border/40 hover:border-brand-grey-border bg-brand-navy-light/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold ${step.active ? 'text-brand-gold' : 'text-brand-grey-text/40'}`}>
                  {step.num}
                </span>
                {step.count !== '' && step.active && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-brand-navy-dark text-brand-gold rounded border border-brand-gold/20">
                    {step.count}
                  </span>
                )}
              </div>
              <div>
                <h4 className="text-xs font-semibold text-brand-offwhite group-hover:text-brand-gold transition-colors">
                  {step.name}
                </h4>
                <p className="text-[10px] text-brand-grey-text/80 mt-0.5 leading-tight">
                  {step.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Module Grid */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-brand-offwhite border-b border-brand-grey-border/60 pb-2">
          Operational Workspace Modules
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModuleCard
            title="CPS × YPS Integration Matrix"
            description="Assess Climate, Peace & Security issues across the 5 YPS pillars (Participation, Protection, Prevention, Partnerships, Disengagement & Reintegration) using customized diplomatic wording and red-team checks."
            href="/matrix"
            statusText={pillarsFilled > 0 ? `${pillarsFilled}/5 Pillars` : 'Empty'}
            statusType={pillarsFilled === 5 ? 'completed' : pillarsFilled > 0 ? 'progress' : 'draft'}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            }
          />
          <ModuleCard
            title="Climate-Security Risk Pathways"
            description="Build climate-conflict causal pathways identifying hazards, vulnerabilities, capacity constraints, youth impacts, and youth-led response interventions with structural evidence scales."
            href="/risk-pathways"
            statusText={pathwaysCount > 0 ? `${pathwaysCount} Active` : 'Empty'}
            statusType={pathwaysCount > 0 ? 'completed' : 'draft'}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            }
          />
          <ModuleCard
            title="Stakeholder & Partnership Mapper"
            description="Map actors against interest, influence, alignment, and youth inclusion levels. Formulate engagement strategies and highlight diplomatic sensitivities."
            href="/stakeholders"
            statusText={stakeholdersCount > 0 ? `${stakeholdersCount} Mapped` : 'Empty'}
            statusType={stakeholdersCount > 0 ? 'completed' : 'draft'}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <ModuleCard
            title="YCPS Policy Brief Generator"
            description="Compile matrix entries, risk pathways, and stakeholder assessments into a comprehensive Word-ready or print-ready diplomatic briefing note."
            href="/brief"
            statusText={isBriefReady ? 'Ready' : 'Empty State'}
            statusType={isBriefReady ? 'completed' : 'draft'}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
          
          {/* Placeholder / Expansion Modules */}
          <ModuleCard
            title="Adaptation Action Toolkit"
            description="Review specific regional adaptation frameworks, funding opportunities, and community-led climate guides (Coming Soon)."
            href="/toolkit"
            statusText="Planned"
            statusType="placeholder"
            isFuture={true}
            icon={
              <svg className="w-6 h-6 text-brand-grey-text/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            }
          />
          <ModuleCard
            title="Diplomatic Language Compliance"
            description="Automate checking briefs against strategic language guidelines: preventing over-securitization and verifying youth agency framing (Coming Soon)."
            href="/language"
            statusText="Planned"
            statusType="placeholder"
            isFuture={true}
            icon={
              <svg className="w-6 h-6 text-brand-grey-text/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
        </div>
      </section>
    </div>
  );
}
