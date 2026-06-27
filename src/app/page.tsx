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

  const isPlanReady = pillarsFilled > 0 || pathwaysCount > 0 || stakeholdersCount > 0;

  // Workflow steps: Diagnose → Integrate → Map → Apply → Train → Review → Export
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
      name: 'Apply',
      desc: 'Case Study Lab',
      link: '/case-studies',
      active: currentScenario !== 'custom',
      count: '',
      color: 'from-brand-green/20 to-brand-green/5'
    },
    {
      num: '05',
      name: 'Train',
      desc: 'Facilitation Guide',
      link: '/training',
      active: isPlanReady,
      count: '',
      color: 'from-teal-500/20 to-teal-500/5'
    },
    {
      num: '06',
      name: 'Review',
      desc: 'Compliance Review',
      link: '/review',
      active: false,
      count: '',
      color: 'from-red-500/10 to-red-500/5'
    },
    {
      num: '07',
      name: 'Export',
      desc: 'Compiled Policy Brief',
      link: '/brief',
      active: isPlanReady,
      count: '',
      color: 'from-indigo-500/20 to-indigo-500/5'
    }
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl glass-panel p-8 md:p-12 border border-brand-gold/15">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-green/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
            DEDI / CCCPA Joint Planning Workspace
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-offwhite leading-tight">
            Youth, Climate, Peace and <span className="text-brand-gold">Security Toolkit Lab</span>
          </h1>
          <p className="text-sm md:text-base text-brand-grey-text leading-relaxed">
            A practical planning and training companion for YCPS in Africa. Translate regional stabilization agendas into context-specific risk pathways, herder stakeholder maps, and action matrices for conflict-sensitive response.
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
              Start Empty Workspace Matrix
            </Link>
          </div>
        </div>
      </section>

      {/* About the Lab Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-xl border border-brand-grey-border/50 space-y-2">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">📋 Product Scope</span>
          <p className="text-xs text-brand-grey-text leading-relaxed">
            The Toolkit Lab is a draft support tool designed to translate strategic YCPS policy frameworks into practical training curricula, stakeholder engagement logs, and draft briefs for practitioners.
          </p>
        </div>
        <div className="glass-panel p-6 rounded-xl border border-brand-grey-border/50 space-y-2">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">🎓 Training Audiance</span>
          <p className="text-xs text-brand-grey-text leading-relaxed">
            Structured for policymakers, herding herder youth organizations, regional organizations (LCBC, IGAD, AU), and diplomatic institutions focused on environmental peacebuilding and resilience in Africa.
          </p>
        </div>
        <div className="glass-panel p-6 rounded-xl border border-brand-grey-border/50 space-y-2">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">⚖️ Diplomatic Compliance</span>
          <p className="text-xs text-brand-grey-text leading-relaxed">
            Enforces strict wording protocols: avoiding failed-state language, over-securitization of natural resource access, and youth victimhood tropes, emphasizing local capacities instead.
          </p>
        </div>
      </section>

      {/* Progress & Quick Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/50">
          <span className="text-xs font-semibold text-brand-grey-text">Workspace Context</span>
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
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
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

      {/* How to use panel */}
      <section className="glass-panel p-6 rounded-xl border border-brand-grey-border/60 bg-brand-navy-light/25 space-y-4">
        <h3 className="text-sm font-bold text-brand-gold uppercase tracking-wider">
          💡 How to use this app
        </h3>
        <div className="grid sm:grid-cols-3 gap-6 text-xs text-brand-grey-text leading-relaxed">
          <div className="space-y-1">
            <span className="font-semibold text-brand-offwhite block">1. Seed or Define Context</span>
            <p>Select a case study from the dropdown at the top right of the page or in the Case Study Lab to prefill your workspace, or enter custom herder data from scratch.</p>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-brand-grey-border/30 pt-3 sm:pt-0 sm:pl-6">
            <span className="font-semibold text-brand-offwhite block">2. Map Pathways & Matrix</span>
            <p>Deconstruct resource conflicts in the Risk Pathway Builder. Integrate findings across the 5 YPS pillars in the Matrix. Assess stakeholders and strategies.</p>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-brand-grey-border/30 pt-3 sm:pt-0 sm:pl-6">
            <span className="font-semibold text-brand-offwhite block">3. Review, Connect & Export</span>
            <p>Run wording scans in the Red-Team review module. Connect entries to workplan timelines in Training Mode, and export Word-ready policy briefs for validation.</p>
          </div>
        </div>
      </section>

      {/* Module Grid */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-brand-offwhite border-b border-brand-grey-border/60 pb-2">
          Operational Workspace Modules
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModuleCard
            title="YPS × CPS Matrix"
            description="Assess Climate, Peace & Security issues across the 5 YPS pillars (Participation, Protection, Prevention, Partnerships, Reintegration) using customized diplomatic wording and red-team checks."
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
            description="Map context-specific pathways through which climate-related risks may compound existing vulnerabilities, including capacity constraints, herding impacts, youth agency, and evidence gaps."
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
            title="Case Study Lab"
            description="Apply the YCPS framework to 6 starting African training cases. Review lessons on herder-farmer mediation, Nile salinity, and Horn displacement, and load datasets directly."
            href="/case-studies"
            statusText="6 Cases Active"
            statusType="completed"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
          <ModuleCard
            title="Training & Facilitation Mode"
            description="Build youth-inclusive workshops, simulation guidelines, and trainer guides mapped directly to DEDI/CCCPA workplan activities."
            href="/training"
            statusText="Active Mode"
            statusType="completed"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479L12 21l-6.825-4a12.083 12.083 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            }
          />
          <ModuleCard
            title="Diplomatic Wording Assistant"
            description="Scan and rewrite sensitive, generic, or over-securitized YCPS text drafts. Enforce cautious causality, national ownership, and youth agency."
            href="/language"
            statusText="Compliance Desk"
            statusType="completed"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 0A18.015 18.015 0 0110 14.828M15 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2 3h4a2 2 0 012 2v2" />
              </svg>
            }
          />
          <ModuleCard
            title="Red-Team Quality Review"
            description="Audit all workspace entries against predefined strategic diplomatic rules, flag violations, and check operational completeness."
            href="/review"
            statusText="Audit Panel"
            statusType="completed"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
          />
          <ModuleCard
            title="Policy Brief Generator"
            description="Generate structural YCPS briefs combining herder cascades, matrix mappings, stakeholders, and red-team notes for Word exports."
            href="/brief"
            statusText={isPlanReady ? 'Brief Ready' : 'Empty'}
            statusType={isPlanReady ? 'completed' : 'draft'}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
          <ModuleCard
            title="Activity & Workplan Connector"
            description="Connect matrix entries, risk pathways, and stakeholder assessments to a CCCPA/DEDI workplan activity and compile a draft workshop session plan."
            href="/toolkit"
            statusText={isPlanReady ? 'Ready' : 'Empty State'}
            statusType={isPlanReady ? 'completed' : 'draft'}
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          />
        </div>
      </section>
    </div>
  );
}
