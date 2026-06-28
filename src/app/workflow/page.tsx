'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

export default function GuidedWorkflowPage() {
  const {
    currentScenario,
    matrixEntries,
    riskPathways,
    stakeholders
  } = useApp();

  // Completion counts to determine status dynamically
  const pillarsFilled = Object.values(matrixEntries).filter(
    (entry) =>
      entry.climateSecurityConsideration.trim() !== '' ||
      entry.youthRoleAgency.trim() !== ''
  ).length;

  const pathwaysCount = riskPathways.length;
  const stakeholdersCount = stakeholders.length;

  const getStep1Status = () => {
    return currentScenario !== 'custom' ? 'Ready for review' : 'In progress';
  };

  const getStep2Status = () => {
    if (pillarsFilled === 5) return 'Ready for review';
    if (pillarsFilled > 0) return 'In progress';
    return 'Not started';
  };

  const getStep3Status = () => {
    return pathwaysCount > 0 ? 'Ready for review' : 'Not started';
  };

  const getStep4Status = () => {
    return stakeholdersCount > 0 ? 'Ready for review' : 'Not started';
  };

  const getStep5Status = () => {
    return (pillarsFilled > 0 || pathwaysCount > 0) ? 'Ready for review' : 'Not started';
  };

  const getStep6Status = () => {
    return pillarsFilled > 0 ? 'Ready for review' : 'Not started';
  };

  const getStep7Status = () => {
    return (pillarsFilled > 0 || pathwaysCount > 0) ? 'Ready for review' : 'Not started';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready for review':
        return 'text-brand-green bg-brand-green/10 border-brand-green/30';
      case 'In progress':
        return 'text-brand-gold bg-brand-gold/10 border-brand-gold/30';
      case 'Not started':
      default:
        return 'text-brand-grey-text/60 bg-brand-navy-light/40 border-brand-grey-border/30';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="border-b border-brand-grey-border/60 pb-5">
        <h1 className="text-2xl font-bold text-brand-offwhite">
          Guided YCPS Toolkit Workflow
        </h1>
        <p className="text-xs text-brand-grey-text mt-1">
          A practical step-by-step path from YCPS analysis to validated toolkit-ready outputs.
        </p>
      </div>

      {/* Stepper Grid */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-brand-gold uppercase tracking-wider">
          7-Step Guided Workflow Path
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          
          {/* Step 1 */}
          <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Step 01</span>
                <span className={`text-[9px] px-2 py-0.5 rounded border font-semibold ${getStatusColor(getStep1Status())}`}>
                  {getStep1Status()}
                </span>
              </div>
              <h3 className="text-sm font-bold text-brand-offwhite">Context</h3>
              <p className="text-xs text-brand-grey-text leading-relaxed">
                <strong>Task:</strong> Choose a region-specific case study or load presets to seed your workspace.
              </p>
              <p className="text-[11px] text-brand-grey-text/80 leading-normal">
                <strong>Why it matters:</strong> Grounds all downstream planning in context-specific climate evidence.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <div className="text-[10px] text-brand-grey-text">
                <span className="font-semibold block text-brand-gold">Tools:</span> Case Study Lab, Scenario Presets
              </div>
              <div className="text-[10px] text-brand-grey-text">
                <span className="font-semibold block text-brand-gold">Output:</span> Context summary & baseline mapping
              </div>
              <Link
                href="/case-studies"
                className="block text-center text-xs py-2 bg-brand-navy-light hover:bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border rounded-lg font-bold transition-all"
              >
                Load Context
              </Link>
            </div>
          </div>

          {/* Step 2 */}
          <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Step 02</span>
                <span className={`text-[9px] px-2 py-0.5 rounded border font-semibold ${getStatusColor(getStep2Status())}`}>
                  {getStep2Status()}
                </span>
              </div>
              <h3 className="text-sm font-bold text-brand-offwhite">Matrix</h3>
              <p className="text-xs text-brand-grey-text leading-relaxed">
                <strong>Task:</strong> Integrate climate security factors across five Youth, Peace & Security pillars.
              </p>
              <p className="text-[11px] text-brand-grey-text/80 leading-normal">
                <strong>Why it matters:</strong> Connects climate risks to youth-inclusive stabilization opportunities.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <div className="text-[10px] text-brand-grey-text">
                <span className="font-semibold block text-brand-gold">Tools:</span> YCPS Integration Matrix
              </div>
              <div className="text-[10px] text-brand-grey-text">
                <span className="font-semibold block text-brand-gold">Output:</span> Pillar recommendations & indicators
              </div>
              <Link
                href="/matrix"
                className="block text-center text-xs py-2 bg-brand-navy-light hover:bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border rounded-lg font-bold transition-all"
              >
                Open Matrix
              </Link>
            </div>
          </div>

          {/* Step 3 */}
          <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Step 03</span>
                <span className={`text-[9px] px-2 py-0.5 rounded border font-semibold ${getStatusColor(getStep3Status())}`}>
                  {getStep3Status()}
                </span>
              </div>
              <h3 className="text-sm font-bold text-brand-offwhite">Risk</h3>
              <p className="text-xs text-brand-grey-text leading-relaxed">
                <strong>Task:</strong> Map climate-security conflict risk pathways and detail youth opportunities.
              </p>
              <p className="text-[11px] text-brand-grey-text/80 leading-normal">
                <strong>Why it matters:</strong> Charts context-specific instability factors.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <div className="text-[10px] text-brand-grey-text">
                <span className="font-semibold block text-brand-gold">Tools:</span> Risk Pathway Builder
              </div>
              <div className="text-[10px] text-brand-grey-text">
                <span className="font-semibold block text-brand-gold">Output:</span> Climate risk pathway notes
              </div>
              <Link
                href="/risk-pathways"
                className="block text-center text-xs py-2 bg-brand-navy-light hover:bg-navy-dark text-brand-offwhite border border-brand-grey-border rounded-lg font-bold transition-all"
              >
                Open Pathway Builder
              </Link>
            </div>
          </div>

          {/* Step 4 */}
          <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Step 04</span>
                <span className={`text-[9px] px-2 py-0.5 rounded border font-semibold ${getStatusColor(getStep4Status())}`}>
                  {getStep4Status()}
                </span>
              </div>
              <h3 className="text-sm font-bold text-brand-offwhite">Stakeholders</h3>
              <p className="text-xs text-brand-grey-text leading-relaxed">
                <strong>Task:</strong> Map actor interest, influence, and youth coordination dynamics.
              </p>
              <p className="text-[11px] text-brand-grey-text/80 leading-normal">
                <strong>Why it matters:</strong> Prevents fragmented actions and tracks coordination.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <div className="text-[10px] text-brand-grey-text">
                <span className="font-semibold block text-brand-gold">Tools:</span> Stakeholder Map
              </div>
              <div className="text-[10px] text-brand-grey-text">
                <span className="font-semibold block text-brand-gold">Output:</span> Coordination logs & strategies
              </div>
              <Link
                href="/stakeholders"
                className="block text-center text-xs py-2 bg-brand-navy-light hover:bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border rounded-lg font-bold transition-all"
              >
                Open Stakeholder Map
              </Link>
            </div>
          </div>

          {/* Step 5 */}
          <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Step 05</span>
                <span className={`text-[9px] px-2 py-0.5 rounded border font-semibold ${getStatusColor(getStep5Status())}`}>
                  {getStep5Status()}
                </span>
              </div>
              <h3 className="text-sm font-bold text-brand-offwhite">Draft</h3>
              <p className="text-xs text-brand-grey-text leading-relaxed">
                <strong>Task:</strong> Compile workspace parameters into training guides, policy drafts, and activity sheets.
              </p>
              <p className="text-[11px] text-brand-grey-text/80 leading-normal">
                <strong>Why it matters:</strong> Converts conceptual mappings into immediate trainer/policy deliverables.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <div className="text-[10px] text-brand-grey-text">
                <span className="font-semibold block text-brand-gold">Tools:</span> Toolkit Builder Workspace
              </div>
              <div className="text-[10px] text-brand-grey-text">
                <span className="font-semibold block text-brand-gold">Output:</span> Section draft & Practical activity sheet
              </div>
              <Link
                href="/toolkit"
                className="block text-center text-xs py-2 bg-brand-navy-light hover:bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border rounded-lg font-bold transition-all"
              >
                Open Toolkit Builder
              </Link>
            </div>
          </div>

          {/* Step 6 */}
          <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Step 06</span>
                <span className={`text-[9px] px-2 py-0.5 rounded border font-semibold ${getStatusColor(getStep6Status())}`}>
                  {getStep6Status()}
                </span>
              </div>
              <h3 className="text-sm font-bold text-brand-offwhite">Review</h3>
              <p className="text-xs text-brand-grey-text leading-relaxed">
                <strong>Task:</strong> Run compliance reviews, wording screen, and safeguards check.
              </p>
              <p className="text-[11px] text-brand-grey-text/80 leading-normal">
                <strong>Why it matters:</strong> Ensures youth protection and sovereign-friendly language.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <div className="text-[10px] text-brand-grey-text">
                <span className="font-semibold block text-brand-gold">Tools:</span> Red-Team Review, Wording Assistant
              </div>
              <div className="text-[10px] text-brand-grey-text">
                <span className="font-semibold block text-brand-gold">Output:</span> Compliance logs & Wording reviews
              </div>
              <Link
                href="/review"
                className="block text-center text-xs py-2 bg-brand-navy-light hover:bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border rounded-lg font-bold transition-all"
              >
                Run Red-Team Review
              </Link>
            </div>
          </div>

          {/* Step 7 */}
          <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 flex flex-col justify-between space-y-4 lg:col-span-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Step 07</span>
                <span className={`text-[9px] px-2 py-0.5 rounded border font-semibold ${getStatusColor(getStep7Status())}`}>
                  {getStep7Status()}
                </span>
              </div>
              <h3 className="text-sm font-bold text-brand-offwhite">Finalize</h3>
              <p className="text-xs text-brand-grey-text leading-relaxed">
                <strong>Task:</strong> Export the compiled complete toolkit package or print it using custom overrides.
              </p>
              <p className="text-[11px] text-brand-grey-text/80 leading-normal">
                <strong>Why it matters:</strong> Yields a unified dossier ready for training simulations and policy dialogues.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <div className="text-[10px] text-brand-grey-text">
                <span className="font-semibold block text-brand-gold">Tools:</span> Toolkit Builder Export / Print Desks
              </div>
              <div className="text-[10px] text-brand-grey-text">
                <span className="font-semibold block text-brand-gold">Output:</span> Consolidated YCPS Planning Dossier
              </div>
              <Link
                href="/toolkit?outputType=complete_package"
                className="block text-center text-xs py-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark rounded-lg font-bold transition-all"
              >
                Finalize: Complete Package
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Tool Cluster Architecture */}
      <section className="space-y-6">
        <h2 className="text-base font-bold text-brand-offwhite border-b border-brand-grey-border/40 pb-2">
          YCPS Operational Tool Clusters
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Cluster 1: Analysis Tools */}
          <div className="glass-panel p-6 rounded-xl border border-brand-grey-border/50 space-y-4">
            <div>
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block">Cluster 1</span>
              <h3 className="text-sm font-bold text-brand-offwhite mt-0.5">Analysis Tools</h3>
              <p className="text-[11px] text-brand-grey-text mt-1">
                Understand the YCPS issue and avoid siloed or simplistic analysis.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-offwhite text-[11px]">YCPS Integration Matrix</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20">Available</span>
                </div>
                <p className="text-[10px] text-brand-grey-text leading-normal">
                  Connects climate security compound risks to YPS pillars to prevent fragmented, securitized policy recommendations.
                </p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="text-brand-gold">Output: Recommendations & M&E Indicators</span>
                  <Link href="/matrix" className="text-brand-gold hover:underline font-bold">Open Matrix →</Link>
                </div>
              </div>

              <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-offwhite text-[11px]">Risk Pathway Builder</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20">Available</span>
                </div>
                <p className="text-[10px] text-brand-grey-text leading-normal">
                  Maps climate hazards, vulnerability contexts, and capacity constraints to avoid conflict causality overclaiming.
                </p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="text-brand-gold">Output: Programming Note</span>
                  <Link href="/risk-pathways" className="text-brand-gold hover:underline font-bold">Map Pathways →</Link>
                </div>
              </div>

              <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-offwhite text-[11px]">Youth Agency Mapping Tool</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-brand-gold/10 text-brand-gold border border-brand-gold/20">Partially Available</span>
                </div>
                <p className="text-[10px] text-brand-grey-text leading-normal">
                  Mainstreams youth as active mediators, innovators, early-warning connectors, and resilient forest/river monitoring agents.
                </p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="text-brand-gold">Output: Youth Agency Map Prompts</span>
                  <Link href="/matrix" className="text-brand-gold hover:underline font-bold">View Matrix Prompts →</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Cluster 2: Planning Tools */}
          <div className="glass-panel p-6 rounded-xl border border-brand-grey-border/50 space-y-4">
            <div>
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block">Cluster 2</span>
              <h3 className="text-sm font-bold text-brand-offwhite mt-0.5">Planning Tools</h3>
              <p className="text-[11px] text-brand-grey-text mt-1">
                Turn analysis into planning choices, coordination logic, and policy entry points.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-offwhite text-[11px]">Youth-Inclusive Planning Matrix</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-brand-gold/10 text-brand-gold border border-brand-gold/20">Partially Available</span>
                </div>
                <p className="text-[10px] text-brand-grey-text leading-normal">
                  Links specific youth inclusion indices to project decisions, budget rows, and institutional verification checks.
                </p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="text-brand-gold">Output: Policy Planning Briefs</span>
                  <Link href="/toolkit" className="text-brand-gold hover:underline font-bold">Open Matrix Planner →</Link>
                </div>
              </div>

              <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-offwhite text-[11px]">Stakeholder & Partnership Mapper</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20">Available</span>
                </div>
                <p className="text-[10px] text-brand-grey-text leading-normal">
                  Identifies governmental agencies, local water bureaus, herder cooperatives, and municipal leaders to align action.
                </p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="text-brand-gold">Output: Stakeholder Coordination Strategy</span>
                  <Link href="/stakeholders" className="text-brand-gold hover:underline font-bold">Map Stakeholders →</Link>
                </div>
              </div>

              <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-2 opacity-75">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-offwhite/85 text-[11px]">NDC/NAP YCPS Entry-Point Map</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Future Enhancement</span>
                </div>
                <p className="text-[10px] text-brand-grey-text leading-normal">
                  Aligns national adaptation plans (NAPs) and nationally determined contributions (NDCs) with local YCPS stabilization matrices.
                </p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="text-brand-grey-text/60">Output: NDC Integration Prompts</span>
                  <span className="text-brand-grey-text/50 italic">Locked</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cluster 3: Protection & Validation */}
          <div className="glass-panel p-6 rounded-xl border border-brand-grey-border/50 space-y-4">
            <div>
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block">Cluster 3</span>
              <h3 className="text-sm font-bold text-brand-offwhite mt-0.5">Protection & Validation</h3>
              <p className="text-[11px] text-brand-grey-text mt-1">
                Make participation safe, evidence-aware, and diplomatically reviewable.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-offwhite text-[11px]">Participation-to-Protection Risk Screen</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20">Available</span>
                </div>
                <p className="text-[10px] text-brand-grey-text leading-normal">
                  Identifies retaliation, elder backlashes, travel security hazards, and political vulnerabilities of youth delegates.
                </p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="text-brand-gold">Output: Safeguards Framework</span>
                  <Link href="/review" className="text-brand-gold hover:underline font-bold">Run Review →</Link>
                </div>
              </div>

              <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-offwhite text-[11px]">Case Study Validation Desk</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-brand-gold/10 text-brand-gold border border-brand-gold/20">Partially Available</span>
                </div>
                <p className="text-[10px] text-brand-grey-text leading-normal">
                  Checks cases for context-specific evidence and policy compliance to prevent one-size-fits-all programming mistakes.
                </p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="text-brand-gold">Output: Case Calibration Report</span>
                  <Link href="/case-studies" className="text-brand-gold hover:underline font-bold">Review Case Study →</Link>
                </div>
              </div>

              <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-offwhite text-[11px]">Red-Team Review Desk</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20">Available</span>
                </div>
                <p className="text-[10px] text-brand-grey-text leading-normal">
                  Audits logic models for youth victimhood tropes, national ownership compliance, and conflict sensitivity guidelines.
                </p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="text-brand-gold">Output: Quality Compliance Logs</span>
                  <Link href="/review" className="text-brand-gold hover:underline font-bold">Run Red-Team →</Link>
                </div>
              </div>

              <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-offwhite text-[11px]">Diplomatic Language Assistant</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20">Available</span>
                </div>
                <p className="text-[10px] text-brand-grey-text leading-normal">
                  Identifies and rewrites failed-state references, over-causality formulations, and securitized youth phrases.
                </p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="text-brand-gold">Output: Revised Sovereign Wording Note</span>
                  <Link href="/language" className="text-brand-gold hover:underline font-bold">Refine Language →</Link>
                </div>
              </div>
              <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-offwhite text-[11px]">Climate-Sensitive Reintegration Checklist</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Future Enhancement</span>
                </div>
                <p className="text-[10px] text-brand-grey-text leading-normal">
                  Checks demobilized youth reintegration pathways against environmental capacity constraints and green-economy cooperatives.
                </p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="text-brand-grey-text/60">Output: Reintegration Guidelines</span>
                  <span className="text-brand-grey-text/50 italic">Locked</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cluster 4: Training & Output Tools */}
          <div className="glass-panel p-6 rounded-xl border border-brand-grey-border/50 space-y-4">
            <div>
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block">Cluster 4</span>
              <h3 className="text-sm font-bold text-brand-offwhite mt-0.5">Training & Output Tools</h3>
              <p className="text-[11px] text-brand-grey-text mt-1">
                Convert analysis into toolkit, training, and facilitation materials.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-offwhite text-[11px]">Trainer Session Guide Builder</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20">Available</span>
                </div>
                <p className="text-[10px] text-brand-grey-text leading-normal">
                  Converts workspace context data into structured lesson designs, trainer guides, activities, and facilitation briefs.
                </p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="text-brand-gold">Output: Session Design Card</span>
                  <Link href="/training" className="text-brand-gold hover:underline font-bold">Build Session →</Link>
                </div>
              </div>

              <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-offwhite text-[11px]">Toolkit Builder</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20">Available</span>
                </div>
                <p className="text-[10px] text-brand-grey-text leading-normal">
                  Assembles workspace mappings into formatted, print-ready document packages for policy validation workshops.
                </p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="text-brand-gold">Output: Section Draft & Activity Sheet</span>
                  <Link href="/toolkit" className="text-brand-gold hover:underline font-bold">Build Package →</Link>
                </div>
              </div>

              <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-offwhite text-[11px]">Practical Activity Sheet Desk</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20">Available</span>
                </div>
                <p className="text-[10px] text-brand-grey-text leading-normal">
                  Compiles dialog instructions and participant worksheets from the active pathway and matrix integrations.
                </p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="text-brand-gold">Output: Dialogue Worksheet</span>
                  <Link href="/toolkit" className="text-brand-gold hover:underline font-bold">Create Activity Sheet →</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Final Output Package Panel */}
      <section className="glass-panel p-6 rounded-xl border border-brand-gold/30 bg-gradient-to-r from-slate-900 to-brand-navy-light/40 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-sm font-bold text-brand-gold uppercase tracking-wider">
              📦 Consolidated Final Toolkit Package
            </h3>
            <p className="text-xs text-brand-grey-text leading-relaxed">
              Each step in the workflow feeds into a draft toolkit package that can be compiled, copied, printed, and validated for policy and capacity development use.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] text-brand-grey-text pt-2 list-disc pl-3">
              <div>• Context summary</div>
              <div>• YCPS matrix option</div>
              <div>• Climate pathway note</div>
              <div>• Youth agency map</div>
              <div>• Protection review note</div>
              <div>• Stakeholder strategy</div>
              <div>• Toolkit section draft</div>
              <div>• Practical activity sheet</div>
              <div>• Facilitator guide note</div>
              <div>• Policy Brief note</div>
              <div>• Consultation guidelines</div>
              <div>• Validation checklist</div>
              <div>• Diplomatic wording brief</div>
              <div>• Red-team readiness plan</div>
            </div>
          </div>
          <div className="shrink-0">
            <Link
              href="/toolkit"
              className="px-6 py-3 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-extrabold rounded-lg text-xs uppercase tracking-wider shadow-lg shadow-brand-gold/15 block text-center transition-all cursor-pointer"
            >
              Generate Final Package →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
