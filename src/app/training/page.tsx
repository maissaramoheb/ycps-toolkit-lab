'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { SourceId } from '@/lib/sourceTruth';
import { CopyButton } from '@/components/CopyButton';
import { WorkflowStrip } from '@/components/WorkflowStrip';
import { getPrintContextLabel, printWithDocumentTitle } from '@/lib/printUtils';
import Link from 'next/link';

export default function TrainingPage() {
  const { riskPathways, stakeholders, contextName } = useApp();

  // Builder Form State
  const [sessionTitle, setSessionTitle] = useState('YCPS Regional Policy Dialogue');
  const [audienceType, setAudienceType] = useState('mixed_group');
  const [sessionPurpose, setSessionPurpose] = useState('integration');
  const [sessionLength, setSessionLength] = useState('90_minutes');
  const [caseStudy, setCaseStudy] = useState('egypt');
  const [trainingMode, setTrainingMode] = useState('intergenerational_dialogue');
  const [sensitivityLevel, setSensitivityLevel] = useState('Moderate');
  const [injectWorkspaceData, setInjectWorkspaceData] = useState(false);

  // Active grounding tab
  const [activeSourceTab, setActiveSourceTab] = useState<SourceId>('cps_manual');

  // Red-Team checklist interactive state
  const [checklist, setChecklist] = useState({
    meaningfulParticipation: false,
    safeguardingAddressed: false,
    genderConsidered: false,
    cautiousClaims: false,
    nationalOwnership: false,
    practicalOutputs: false,
    fragileContextSafety: false,
    evidenceValidation: false,
    noGovernmentBlame: false,
    noYouthSecuritization: false
  });

  const handleCheckboxChange = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrint = () => {
    const activeContextName = injectWorkspaceData ? contextName : getActiveCaseTemplate().context;
    printWithDocumentTitle(`YCPS Trainer Guide Pack - ${getPrintContextLabel(activeContextName)}`);
  };

  // Helper map for audience display names
  const audienceNames: Record<string, string> = {
    policymakers: 'Policymakers',
    gov_officials: 'Government Officials',
    youth_orgs: 'Youth Organizations',
    practitioners: 'Practitioners',
    mixed_group: 'Mixed Intergenerational Group',
    diplomatic_audience: 'Diplomatic / Regional Policy Audience'
  };

  // Case Study Details for templates (if workspace inject is disabled or empty)
  const caseTemplates: Record<string, {
    context: string;
    pathway: string;
    stakeholders: string[];
    action: string;
  }> = {
    sahel: {
      context: 'Sahel / Lake Chad Basin',
      pathway: 'Changes around Lake Chad may contribute to earlier seasonal mobility and compound local crop-access tensions where coordination is limited.',
      stakeholders: ['Lake Chad Basin pastoralist groups', 'Local Traditional Councils of Elders', 'LCBC Secretariats'],
      action: 'Set up peer-led local resource monitoring networks and pre-negotiate seasonal migration corridors.'
    },
    somalia: {
      context: 'Somalia pastoral conflicts',
      pathway: 'Severe drought may interact with unequal aquifer access and institutional constraints, increasing exclusion risks for some communities.',
      stakeholders: ['nomadic water trucking youth groups', 'Clan elders', 'Ministry of Water Resources'],
      action: 'Construct local sand dams managed by mixed-clan water management committees.'
    },
    south_sudan: {
      context: 'South Sudan local peace',
      pathway: 'Flooding may contribute to cattle-herder movement into agricultural highlands and increase the risk of localized resource-related incidents.',
      stakeholders: ['Gelweng youth leaders', 'Local farm committees', 'Peace Commission representatives'],
      action: 'Implement Green Reintegration work programs coupling returnee youth herders with local dyke building.'
    },
    horn_of_africa: {
      context: 'Horn of Africa displacement',
      pathway: 'Drought may contribute to displacement towards Dadaab and compound host-community pressures around firewood access.',
      stakeholders: ['displaced youth environmental networks', 'Garissa County officials', 'UNHCR coordinators'],
      action: 'Establish youth-led energy cooperatives converting prosopis weeds into charcoal briquettes.'
    },
    egypt: {
      context: 'North Africa / Egypt green transition and youth engagement',
      pathway: 'Sea-level rise may degrade Nile Delta soils, increase salinity, and contribute to mobility and livelihood pressures in coastal areas.',
      stakeholders: ['Delta farming youth herder cooperatives', 'University startups', 'National development banks'],
      action: 'Fund university-incubated soil restoration start-ups and small-scale solar irrigation cooperatives.'
    },
    carana: {
      context: 'CARANA fictional training scenario',
      pathway: 'Changes in the Carana River may contribute to cross-frontier mobility where local notification and coordination mechanisms are limited.',
      stakeholders: ['CARANA Border herder commissions', 'Carana River Youth Alliance', 'Frontier traditional chiefs'],
      action: 'Support borderland resource-sharing points using participatory mapping tools and locally validated communication channels.'
    }
  };

  const getActiveCaseTemplate = () => {
    return caseTemplates[caseStudy] || caseTemplates.sahel;
  };

  // Compile Dynamic Agenda timeblocks
  const getAgendaBlocks = () => {
    switch (sessionLength) {
      case '60_minutes':
        return [
          { time: '00:00 - 00:10', activity: 'Welcome & Session Grounding', details: 'Introductions, review YCPS Strategic groundings, set non-securitized framework, and read disclaimer.' },
          { time: '00:10 - 00:30', activity: 'Analytical Briefing: Climate Risk & Agency', details: `Analyze stressors for ${injectWorkspaceData ? contextName : getActiveCaseTemplate().context}. Discuss youth as agents of resilience.` },
          { time: '00:30 - 00:50', activity: 'Breakout Session: Risk Pathway Analysis', details: 'Small groups map climate hazard -> exposure -> vulnerability herder cascades using the CPS Manual guidelines.' },
          { time: '00:50 - 01:00', activity: 'Plenary Debrief & Evaluation', details: 'Formulate key policy messages, check wording guidelines, and complete training evaluation feedback.' }
        ];
      case 'half_day':
        return [
          { time: '09:00 - 09:45', activity: 'Introduction to YCPS & Diplomatic Rules', details: 'Framing local ownership, avoiding failed-state tropes, and reviewing the 6 Strategic Language guidelines.' },
          { time: '09:45 - 10:45', activity: 'Climate-Security Risk Pathway Mapping', details: `Examine herder vulnerability in ${injectWorkspaceData ? contextName : getActiveCaseTemplate().context}. Identify capacity constraints.` },
          { time: '10:45 - 11:00', activity: 'Break & Intergenerational Networking', details: 'Coffee break focusing on dialogue between youth participants and senior practitioners.' },
          { time: '11:00 - 12:15', activity: 'breakout simulation: CARANA borderland case', details: 'Interactive roleplay where participants negotiate a river resource sharing agreement using resource mapping templates.' },
          { time: '12:15 - 13:00', activity: 'Policy Brief consolidation & M&E Indicators', details: 'Group drafts Suggested Actions and M&E Indicators. Conduct red-team audit checks for language.' }
        ];
      case 'full_day':
        return [
          { time: '09:00 - 10:30', activity: 'High-Level Opening & Source grounding', details: 'Establish alignment with the Egypt-Denmark DEDI workplan and ToR consultant mandates.' },
          { time: '10:30 - 12:00', activity: 'Case Study Lab: Multi-hazard Analysis', details: `Map stressors (rainfall, salinization) for ${injectWorkspaceData ? contextName : getActiveCaseTemplate().context}. List stakeholder interests.` },
          { time: '12:00 - 13:00', activity: 'Lunch Break & Informal Consultations', details: 'Catered lunch respecting local dietary and gender-safe parameters.' },
          { time: '13:00 - 15:00', activity: 'Main breakout roleplay exercise', details: 'Run CARANA-style training simulation. herder councils draft water sharing agreements.' },
          { time: '15:00 - 16:00', activity: 'Diplomatic Language Clinic & Audits', details: 'Review group briefs against word compliance guidelines in review panel. Replace sensitive terms.' },
          { time: '16:00 - 17:00', activity: 'Validation workshop & Closing', details: 'Consolidate workshop session briefs. Final M&E review, safeguarding checks, and closing statements.' }
        ];
      case '90_minutes':
      default:
        return [
          { time: '00:00 - 00:15', activity: 'Welcome & YCPS Nexus Framing', details: 'Introductions, explaining the double agenda (YPS + CPS), and reviewing the diplomatic disclaimer.' },
          { time: '00:15 - 00:40', activity: 'Climate-Security Risk Pathway Analysis', details: `Reviewing climate stressors and herder context for ${injectWorkspaceData ? contextName : getActiveCaseTemplate().context}.` },
          { time: '00:40 - 01:15', activity: 'Interactive Group Breakout', details: 'Formulate joint herder mediation strategies and select stakeholder engagement protocols.' },
          { time: '01:15 - 01:30', activity: 'Debrief, Policy drafting & Cautions', details: 'Reviewing wording rules, compiling suggested action, and auditing conflict-sensitivity risks.' }
        ];
    }
  };

  // Compile Dynamic Outputs based on Purpose
  const getExpectedOutputs = () => {
    switch (sessionPurpose) {
      case 'pathway_analysis':
        return 'Completed climate-security risk pathway (hazard -> exposure -> vulnerability steps).';
      case 'stakeholder_mapping':
        return 'Detailed stakeholder map with engagement strategies and diplomatic risk checks.';
      case 'language_review':
        return 'Red-team revised language note with replacement words for policy briefs.';
      case 'policy_development':
        return 'Draft policy recommendation and monitoring indicators matching DEDI Workplan.';
      case 'case_study':
        return 'Case study brief outlining response opportunities and validation needs.';
      case 'ycps_intro':
      case 'integration':
      default:
        return 'Completed YCPS integration matrix, suggested action plans, and indicators.';
    }
  };

  // Compile Facilitator Note based on Sensitivity
  const getFacilitatorNotes = () => {
    switch (sensitivityLevel) {
      case 'High':
        return 'CRITICAL SENSITIVITY: Facilitators must operate strictly under safe space protocols. Ensure pastoralist groups and government representatives are seated neutrally to balance power dynamics. Do not publish participant names or record clan affiliations. Keep discussions strictly technical (agronomy, solar pumps, mediation) rather than political.';
      case 'Moderate':
        return 'MODERATE SENSITIVITY: Monitor group dynamics to prevent older community members from dominating pastoralist youth. Ensure gender representation is visible. Enforce the strategic language rules during policy briefs, replacing government-blaming comments with capacity-constraint references.';
      case 'Low':
      default:
        return 'STANDARD SENSITIVITY: Encourage active peer-to-peer discussion. Focus on scenario exercises, timing, and checking that indicators are measurable.';
    }
  };

  // Compile final markdown format for copy/export
  const compileMarkdownPlan = () => {
    let md = `# YCPS SESSION PLAN: ${sessionTitle.toUpperCase()}\n`;
    md += `**Target Audience:** ${audienceNames[audienceType] || audienceType} | **Mode:** ${trainingMode.replace('_', ' ')}\n`;
    md += `**Length:** ${sessionLength.replace('_', ' ')} | **Sensitivity:** ${sensitivityLevel}\n`;
    md += `**Grounded Environment:** ${injectWorkspaceData ? contextName : getActiveCaseTemplate().context}\n`;
    md += `*Prototype Facilitator Guide — Not an official UN, CCCPA, or DEDI platform*\n\n`;
    md += `---\n\n`;

    md += `## 1. Objectives & Outcomes\n`;
    md += `- **Session Purpose:** Build capacity on ${sessionPurpose.replace('_', ' ')} using the YCPS toolkit.\n`;
    md += `- **Target Output:** ${getExpectedOutputs()}\n\n`;

    md += `## 2. Dynamic Agenda\n`;
    getAgendaBlocks().forEach((block) => {
      md += `### ${block.time} • ${block.activity}\n`;
      md += `${block.details}\n\n`;
    });

    md += `## 3. Grounded Context\n`;
    if (injectWorkspaceData && riskPathways.length > 0) {
      const p = riskPathways[0];
      md += `- **Hazard:** ${p.hazard}\n`;
      md += `- **Exposure & Vulnerability:** ${p.exposure} | ${p.vulnerability}\n`;
      md += `- **Capacity Constraint:** ${p.capacityConstraint}\n`;
      md += `- **Youth Opportunity:** ${p.youthOpportunity}\n\n`;
    } else {
      const t = getActiveCaseTemplate();
      md += `- **Context:** ${t.context}\n`;
      md += `- **Risk Pathway Description:** ${t.pathway}\n`;
      md += `- **Key Stakeholders:** ${t.stakeholders.join(', ')}\n\n`;
    }

    md += `## 4. Facilitator Safeguards & Cautions\n`;
    md += `- **Wording caution:** Avoid overstating climate causality or framing youth as threats.\n`;
    md += `- **Context Sensitivity:** ${getFacilitatorNotes()}\n\n`;

    md += `## 5. Training Use Safeguard\n`;
    md += `This session plan is for training, dialogue, and policy-support purposes. It should not be used as an operational plan, field assessment, or official institutional position. Validate all outputs against localized context-specific evidence.\n`;

    return md;
  };

  const compileFacilitatorNotes = () => {
    let md = `## FACILITATOR GUIDE & HANDOUT NOTES\n`;
    md += `**Session:** ${sessionTitle}\n`;
    md += `**Audience adaptation protocol:**\n`;
    md += `- Focus on constructive, conflict-sensitive cooperation.\n`;
    md += `- Enforce strategic vocabulary rules (avoiding 'failed state', 'radicalized youth').\n\n`;
    md += `**Breakout instructions:**\n`;
    md += `Split participants into mixed stakeholder teams representing local pastoralists, water officials, and community elders. Instruct them to draft a joint water pan rota.\n\n`;
    md += `**Sensitive issues warning:**\n`;
    md += `${getFacilitatorNotes()}\n`;
    return md;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Workflow Strip */}
      <WorkflowStrip currentStep="draft" />

      {/* This step produces box */}
      <div className="glass-panel p-4 rounded-xl border border-brand-gold/25 bg-gradient-to-r from-brand-navy-light/40 to-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs no-print">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block">📋 This Step Produces:</span>
          <p className="text-brand-grey-text">
            <strong>Task:</strong> Configure workshop simulation designs and trainer guidelines. <br />
            <strong>Deliverable:</strong> Workshop session plan, activity cards, and facilitator guide notes.
          </p>
        </div>
        <Link
          href="/toolkit"
          className="shrink-0 px-4 py-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-bold rounded-lg text-xs uppercase tracking-wider text-center transition-all cursor-pointer"
        >
          Next: Open Toolkit Builder →
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-grey-border/60 pb-5 no-print">
        <div>
          <h1 className="text-2xl font-bold text-brand-offwhite">
            Training & Facilitation Lab
          </h1>
          <p className="text-xs text-brand-grey-text mt-1">
            Build youth-inclusive workshops, simulation guidelines, and trainer guides mapped directly to DEDI/CCCPA workplan activities.
          </p>
        </div>
      </div>

      {/* Grounding Panel Switcher */}
      <div className="space-y-3 no-print">
        <div className="flex flex-wrap items-center gap-1.5 border-b border-brand-grey-border/40 pb-2">
          <span className="text-[10px] font-bold text-brand-grey-text uppercase tracking-widest mr-2">
            Facilitation Standards:
          </span>
          <button
            onClick={() => setActiveSourceTab('cps_manual')}
            type="button"
            className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
              activeSourceTab === 'cps_manual'
                ? 'bg-brand-gold/15 text-brand-gold border-brand-gold'
                : 'bg-brand-navy-light text-brand-grey-text border-brand-grey-border/50 hover:text-brand-offwhite'
            }`}
          >
            Rank 4: CCCPA CPS Manual
          </button>
          <button
            onClick={() => setActiveSourceTab('tor')}
            type="button"
            className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
              activeSourceTab === 'tor'
                ? 'bg-brand-gold/15 text-brand-gold border-brand-gold'
                : 'bg-brand-navy-light text-brand-grey-text border-brand-grey-border/50 hover:text-brand-offwhite'
            }`}
          >
            Rank 1: ToR Trainer Guide
          </button>
          <button
            onClick={() => setActiveSourceTab('workplan')}
            type="button"
            className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
              activeSourceTab === 'workplan'
                ? 'bg-brand-gold/15 text-brand-gold border-brand-gold'
                : 'bg-brand-navy-light text-brand-grey-text border-brand-grey-border/50 hover:text-brand-offwhite'
            }`}
          >
            Rank 3: DEDI Workplan Target
          </button>
          <button
            onClick={() => setActiveSourceTab('beyond_vuln')}
            type="button"
            className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
              activeSourceTab === 'beyond_vuln'
                ? 'bg-brand-gold/15 text-brand-gold border-brand-gold'
                : 'bg-brand-navy-light text-brand-grey-text border-brand-grey-border/50 hover:text-brand-offwhite'
            }`}
          >
            Rank 5: Beyond Vulnerability
          </button>
        </div>

        <SourceIntegrityPanel sourceId={activeSourceTab} />
      </div>

      {/* Grid: Form on Left, Output on Right */}
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        
        {/* Left: Guided Builder Form */}
        <div className="lg:col-span-1 glass-panel p-5 rounded-xl border border-brand-grey-border/60 space-y-4 no-print">
          <div className="border-b border-brand-grey-border/40 pb-2">
            <h3 className="text-xs font-bold text-brand-gold uppercase tracking-wider">
              Training Session Builder
            </h3>
          </div>

          {/* Session Title */}
          <div className="space-y-1">
            <label htmlFor="session-title-input" className="block text-xs font-semibold text-brand-offwhite">
              Session Title
            </label>
            <input
              id="session-title-input"
              type="text"
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
              className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-3 py-2 focus:outline-none transition-all"
            />
          </div>

          {/* Audience Type */}
          <div className="space-y-1">
            <label htmlFor="audience-type-select" className="block text-xs font-semibold text-brand-offwhite">
              Target Audience
            </label>
            <select
              id="audience-type-select"
              value={audienceType}
              onChange={(e) => setAudienceType(e.target.value)}
              className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
            >
              <option value="policymakers">Policymakers</option>
              <option value="gov_officials">Government officials</option>
              <option value="youth_orgs">Youth organizations</option>
              <option value="practitioners">Practitioners</option>
              <option value="mixed_group">Mixed intergenerational group</option>
              <option value="diplomatic_audience">Diplomatic / regional policy audience</option>
            </select>
          </div>

          {/* Session Purpose */}
          <div className="space-y-1">
            <label htmlFor="session-purpose-select" className="block text-xs font-semibold text-brand-offwhite">
              Session Purpose
            </label>
            <select
              id="session-purpose-select"
              value={sessionPurpose}
              onChange={(e) => setSessionPurpose(e.target.value)}
              className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
            >
              <option value="ycps_intro">Introduction to YCPS</option>
              <option value="integration">CPS × YPS integration</option>
              <option value="pathway_analysis">Climate-security risk pathway analysis</option>
              <option value="stakeholder_mapping">Stakeholder mapping</option>
              <option value="case_study">Case study application</option>
              <option value="language_review">Diplomatic language and red-team review</option>
              <option value="policy_development">Workplan / policy recommendation development</option>
            </select>
          </div>

          {/* Session Length */}
          <div className="space-y-1">
            <label htmlFor="session-length-select" className="block text-xs font-semibold text-brand-offwhite">
              Session Length
            </label>
            <select
              id="session-length-select"
              value={sessionLength}
              onChange={(e) => setSessionLength(e.target.value)}
              className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
            >
              <option value="60_minutes">60 minutes</option>
              <option value="90_minutes">90 minutes</option>
              <option value="half_day">Half-day workshop (4 hours)</option>
              <option value="full_day">Full-day training (8 hours)</option>
            </select>
          </div>

          {/* Selected Case Study */}
          <div className="space-y-1">
            <label htmlFor="case-study-select" className="block text-xs font-semibold text-brand-offwhite">
              Selected Case Study
            </label>
            <select
              id="case-study-select"
              value={caseStudy}
              onChange={(e) => setCaseStudy(e.target.value)}
              className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
            >
              <option value="sahel">Sahel / Lake Chad Basin pastoralists</option>
              <option value="somalia">Somalia pastoral conflicts</option>
              <option value="south_sudan">South Sudan local peace</option>
              <option value="horn_of_africa">Horn of Africa displacement</option>
              <option value="egypt">North Africa / Egypt green transition</option>
              <option value="carana">CARANA fictional training scenario</option>
            </select>
          </div>

          {/* Training Mode */}
          <div className="space-y-1">
            <label htmlFor="training-mode-select" className="block text-xs font-semibold text-brand-offwhite">
              Training Mode
            </label>
            <select
              id="training-mode-select"
              value={trainingMode}
              onChange={(e) => setTrainingMode(e.target.value)}
              className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
            >
              <option value="policy_dialogue">Policy dialogue</option>
              <option value="technical_workshop">Technical workshop</option>
              <option value="youth_consultation">Youth consultation</option>
              <option value="scenario_exercise">Scenario-based exercise</option>
              <option value="intergenerational_dialogue">Intergenerational dialogue</option>
              <option value="tot">Training of trainers</option>
            </select>
          </div>

          {/* Sensitivity Level */}
          <div className="space-y-1">
            <label htmlFor="sensitivity-level-select" className="block text-xs font-semibold text-brand-offwhite">
              Facilitation Sensitivity
            </label>
            <select
              id="sensitivity-level-select"
              value={sensitivityLevel}
              onChange={(e) => setSensitivityLevel(e.target.value)}
              className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-2.5 py-2 focus:outline-none cursor-pointer"
            >
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High (Fragile Borderlands)</option>
            </select>
          </div>

          {/* Inject Workspace Data Checkbox */}
          <div className="pt-2 flex items-center gap-2">
            <input
              id="inject-data-checkbox"
              type="checkbox"
              checked={injectWorkspaceData}
              onChange={(e) => setInjectWorkspaceData(e.target.checked)}
              className="h-4 w-4 bg-brand-navy-dark border border-brand-grey-border focus:border-brand-gold cursor-pointer rounded"
            />
            <label htmlFor="inject-data-checkbox" className="text-xs text-brand-offwhite font-medium cursor-pointer select-none">
              Inject active workspace data (Matrix, Pathways, Stakeholders)
            </label>
          </div>

          <hr className="border-brand-grey-border/30 pt-1" />

          {/* Lightweight Guidance Box */}
          <div className="p-3 bg-brand-navy-dark/45 border border-brand-grey-border/40 rounded-lg text-[10.5px] text-brand-grey-text leading-relaxed">
            <span className="font-semibold text-brand-gold block mb-1">💡 Next Step:</span>
            After building the session, review the Trainer Guide Output on the right. Print or copy the guide, then confirm the conflict-sensitivity, safeguarding, and validation checklist before use.
          </div>
        </div>

        {/* Right: Dynamic Guide & Handouts */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-grey-border/40 pb-3 gap-2 no-print">
            <div>
              <h3 className="text-sm font-semibold text-brand-offwhite">
                Trainer Handouts & Guides
              </h3>
              <p className="text-[10px] text-brand-grey-text mt-0.5">
                For a clean PDF: choose Save as PDF and turn Headers and footers Off in the print dialog.
              </p>
              <p className="text-[9px] text-brand-grey-text/80 mt-0.5">Background graphics: On · Margins: Default or None, based on preview</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <CopyButton text={compileMarkdownPlan()} label="Copy Plan" />
              <CopyButton text={compileFacilitatorNotes()} label="Copy Facilitator Notes" />
              <button
                onClick={handlePrint}
                type="button"
                className="px-3 py-1.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark rounded-md text-xs font-semibold cursor-pointer shadow-md shadow-brand-gold/15 flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2zm5-17v2m-6 0h12" />
                </svg>
                <span>Print Trainer’s Guide Pack</span>
              </button>
            </div>
          </div>

          {/* Printable Trainer sheet */}
          <div className="bg-gradient-to-br from-brand-navy-light/65 to-brand-navy-dark/95 border border-brand-gold/45 rounded-xl p-6 md:p-8 shadow-xl text-xs text-brand-grey-text space-y-6 no-print">
            
            {/* Practical Output: Trainer Guide Output */}
            <div className="border-b border-brand-grey-border/30 pb-2 mb-2 no-print">
              <span className="text-[9px] font-bold text-brand-gold uppercase tracking-widest block">
                Practical Output
              </span>
              <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider mt-0.5">
                Trainer Guide Output
              </h3>
            </div>

            {/* Print Letterhead Header (visible only on print) */}
            <div className="hidden print:block border-b-2 border-black pb-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-extrabold uppercase tracking-tight text-black">YCPS TOOLKIT LAB • AFRICA</h1>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">DRAFT POLICY PROTOTYPE • POLICY CAPACITY SUPPORT TOOL</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold bg-black text-white px-2 py-0.5 rounded uppercase tracking-wider">
                    DRAFT FOR REVIEW
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-[10px] text-gray-700 mt-4">
                <div><strong>Output Type:</strong> Trainer’s Guide Pack</div>
                <div><strong>Target Context:</strong> {injectWorkspaceData ? contextName : getActiveCaseTemplate().context}</div>
                <div><strong>Date Generated:</strong> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                <div><strong>Status:</strong> Draft for Review and Contextual Validation</div>
                <div className="col-span-2"><strong>Grounding Basis:</strong> CCCPA CPS Manual & DEDI Project Document</div>
              </div>
              <p className="text-[9px] text-gray-500 italic mt-3">
                *Disclaimer: Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, country context, and institutional guidance before use.*
              </p>
            </div>

            {/* Header */}
            <div className="border-b-2 border-brand-gold pb-4 print:border-black">
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block no-print">
                YCPS Operational Workshop Session Plan
              </span>
              <h2 className="text-lg font-bold text-brand-offwhite mt-1 leading-snug print:text-black">
                {sessionTitle}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[9px] text-brand-grey-text/80 mt-2.5 print:text-gray-600">
                <div>Audience: <span className="font-semibold text-brand-offwhite print:text-black">{audienceNames[audienceType]}</span></div>
                <div>Length: <span className="font-semibold text-brand-offwhite print:text-black">{sessionLength.replace('_', ' ')}</span></div>
                <div>Mode: <span className="font-semibold text-brand-offwhite print:text-black">{trainingMode.replace('_', ' ')}</span></div>
                <div>Sensitivity: <span className="font-semibold text-brand-gold print:text-black">{sensitivityLevel}</span></div>
              </div>
            </div>

            {/* Section 1: Overview & Learning Objectives */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:pb-0.5">
                1. Overview & Learning Objectives
              </h3>
              <p className="leading-relaxed">
                This training plan equips YCPS policy planners and pastoralist community leaders with tools to mainstream climate adaptation and peacebuilding activities.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 bg-brand-navy-light/25 border border-brand-grey-border/30 p-3 rounded-lg print:bg-gray-100">
                <div>
                  <span className="font-semibold text-brand-gold print:text-black block mb-0.5">Methodology & Objectives:</span>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Deliver audience-specific guidance and structured facilitation.</li>
                    <li>Utilize practical tools and localized group exercises.</li>
                    <li>Ground scenarios in case studies with validation and follow-up.</li>
                  </ul>
                </div>
                <div>
                  <span className="font-semibold text-brand-gold print:text-black block mb-0.5">Implementation Output (What participants produce):</span>
                  <p className="font-medium text-brand-offwhite print:text-black">
                    {getExpectedOutputs()}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Dynamic Agenda */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:pb-0.5">
                2. Dynamic Agenda & Time Blocks
              </h3>
              <div className="space-y-2.5">
                {getAgendaBlocks().map((block, idx) => (
                  <div key={idx} className="border-l-2 border-brand-gold pl-3 py-0.5 print:border-black">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-offwhite print:text-black">{block.activity}</span>
                      <span className="text-[10px] text-brand-gold font-mono print:text-black">{block.time}</span>
                    </div>
                    <p className="text-[11px] text-brand-grey-text/90 leading-relaxed mt-0.5">{block.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Grounded Context (Case Study / Workspace) */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:pb-0.5">
                3. Grounded Context Analysis
              </h3>
              {injectWorkspaceData ? (
                <div className="bg-brand-navy-light/20 border border-brand-grey-border/30 p-3.5 rounded-lg space-y-2 print:bg-gray-100">
                  <p><span className="font-semibold text-brand-offwhite print:text-black">Active Workspace context:</span> {contextName}</p>
                  {riskPathways.length > 0 ? (
                    <p><span className="font-semibold text-brand-offwhite print:text-black">Primary Risk Pathway:</span> {riskPathways[0].hazard} → {riskPathways[0].pathwayType.toUpperCase().replace('_', ' ')} ({riskPathways[0].youthImpact})</p>
                  ) : (
                    <p className="italic text-brand-gold">No active risk pathways mapped in workspace. Prefilling case study defaults instead.</p>
                  )}
                  {stakeholders.length > 0 && (
                    <p><span className="font-semibold text-brand-offwhite print:text-black">Primary Stakeholders:</span> {stakeholders.map((s) => s.name).join(', ')}</p>
                  )}
                </div>
              ) : (
                <div className="bg-brand-navy-light/20 border border-brand-grey-border/30 p-3.5 rounded-lg space-y-2 print:bg-gray-100">
                  <p><span className="font-semibold text-brand-offwhite print:text-black">Selected Case context:</span> {getActiveCaseTemplate().context}</p>
                  <p><span className="font-semibold text-brand-offwhite print:text-black">Risk pathway description:</span> {getActiveCaseTemplate().pathway}</p>
                  <p><span className="font-semibold text-brand-offwhite print:text-black">Key Stakeholders:</span> {getActiveCaseTemplate().stakeholders.join(', ')}</p>
                </div>
              )}
            </div>

            {/* Section 4: Practical Activity Instructions */}
            <div className="border border-brand-gold/30 bg-brand-navy-light/10 p-5 rounded-xl space-y-3.5 print:border-black print:bg-transparent">
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block print:text-black">
                4. Practical Activity Instructions
              </span>
              <div className="space-y-1">
                <h4 className="font-bold text-brand-offwhite text-xs print:text-black">
                  Activity: Negotiating locally-owned water pan agreements
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-brand-grey-text/90 mt-1 print:text-gray-600">
                  <div><strong>Participants:</strong> Pastoralist herder youth, farming representatives, local resource traditional elders, and municipal policy observers.</div>
                  <div><strong>Materials Required:</strong> Resource mapping templates, contextual scenario descriptions, and draft indicator cards.</div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-[11px] leading-relaxed">
                <div>
                  <span className="font-semibold text-brand-offwhite print:text-black block mb-0.5">Instructions & Steps:</span>
                  <ul className="list-decimal pl-4 space-y-1.5">
                    <li>Form balanced working groups representing herding clans, settled farming communities, and local authorities.</li>
                    <li>Review mapped seasonal water access points and transhumance migratory corridors.</li>
                    <li>Draft proposed grazing timings and corridor access rules.</li>
                  </ul>
                </div>
                <div>
                  <span className="font-semibold text-brand-offwhite print:text-black block mb-0.5">Expected Participant Output:</span>
                  <p className="font-mono text-[9px] bg-brand-navy-dark border border-brand-grey-border/40 p-2 rounded text-brand-grey-text/95 print:bg-gray-100 print:text-black">
                    - Agreed seasonal corridors and watering schedules: [ ]<br />
                    - Inter-community youth-elder mediation panel names: [ ]<br />
                    - Local environmental protection rules checklist: [ ]
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5: Facilitator Notes */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:pb-0.5">
                5. Detailed Facilitator Guidance
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 text-[11px] leading-relaxed">
                <div className="p-3 bg-brand-navy-light/25 border border-brand-grey-border/30 rounded-lg print:bg-gray-100">
                  <span className="font-semibold text-brand-gold print:text-black block mb-1">How to introduce the activity:</span>
                  Frame the session around cooperative resource mapping. Highlight that national ownership is central and that community-level monitoring helps protect local livelihoods.
                </div>
                <div className="p-3 bg-brand-navy-light/25 border border-brand-grey-border/30 rounded-lg print:bg-gray-100">
                  <span className="font-semibold text-brand-gold print:text-black block mb-1">How to manage sensitive discussion:</span>
                  Step in if discussions frame youth as security risks or switch to political blame. Pivot dialogue back to agricultural coordination and shared environmental priorities.
                </div>
                <div className="p-3 bg-brand-navy-light/25 border border-brand-grey-border/30 rounded-lg print:bg-gray-100">
                  <span className="font-semibold text-brand-gold print:text-black block mb-1">How to keep youth agency visible:</span>
                  Ensure youth participants serve as co-facilitators, lead mapping presentations, and are nominated to joint water user management committees.
                </div>
                <div className="p-3 bg-brand-navy-light/25 border border-brand-grey-border/30 rounded-lg print:bg-gray-100">
                  <span className="font-semibold text-brand-gold print:text-black block mb-1">How to avoid automatic causality:</span>
                  Remind participants that environmental changes are risk multipliers that interact with existing livelihoods and service pressures, rather than direct drivers of local incidents.
                </div>
              </div>
            </div>

            {/* Section 6: Debrief Questions */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:pb-0.5">
                6. Facilitated Debrief Questions
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-[11px] leading-relaxed">
                <li>What youth agency and community leadership roles were visible during the resource sharing negotiations?</li>
                <li>What physical protection risks must be addressed for youth monitors operating in borderland pastoral zones?</li>
                <li>Which traditional elders and local validation actors must endorse the draft water pan agreement?</li>
                <li>What critical data or evidence gaps regarding seasonal water volumes remain to be verified?</li>
                <li>What follow-up mechanisms could help sustain the agreement during future droughts?</li>
              </ul>
            </div>

            {/* Section 7: Participation & Protection Safeguards */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:pb-0.5">
                7. Participation & Protection Safeguards
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 text-[11px] leading-relaxed">
                <div className="p-3 bg-brand-navy-light/25 border border-brand-grey-border/30 rounded-lg print:bg-gray-100">
                  <span className="font-semibold text-brand-gold print:text-black block">Voluntary Engagement & Do-No-Harm:</span>
                  Participation must be voluntary. Do not expose youth to retaliation by asking for politically sensitive border testimony without safety mechanisms.
                </div>
                <div className="p-3 bg-brand-navy-light/25 border border-brand-grey-border/30 rounded-lg print:bg-gray-100">
                  <span className="font-semibold text-brand-gold print:text-black block">Gender & Inclusion:</span>
                  Ensure young women herders have safe spaces to express resource concerns separate from dominant clan elder circles.
                </div>
                <div className="p-3 bg-brand-navy-light/25 border border-brand-grey-border/30 rounded-lg print:bg-gray-100">
                  <span className="font-semibold text-brand-gold print:text-black block">Safe Feedback Channels:</span>
                  Establish anonymous reporting systems for resource exclusion or safeguarding issues encountered during mapping.
                </div>
                <div className="p-3 bg-brand-navy-light/25 border border-brand-grey-border/30 rounded-lg print:bg-gray-100">
                  <span className="font-semibold text-brand-gold print:text-black block">Avoid Youth Securitization:</span>
                  Do not assign youth enforcement or surveillance roles. Keep the focus on participation, protection, resilience, and resource mediation.
                </div>
              </div>
            </div>

            {/* Section 8: Workshop Evaluation Questions */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:pb-0.5">
                8. Workshop Evaluation & Assessment
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-[11px] leading-relaxed">
                <li>Did participants successfully produce a practical resource sharing template or draft agreement?</li>
                <li>Were community protection safeguards and gender vulnerabilities clearly identified?</li>
                <li>Was a clear list of local validation actors assigned to review the draft outputs?</li>
              </ul>
            </div>

            {/* Section 9: Validation Disclaimer */}
            <div className="p-3.5 bg-red-950/20 border border-red-500/25 rounded text-[10px] leading-relaxed text-brand-grey-text print:border-black print:text-black print:bg-transparent">
              <span className="font-semibold text-red-400 block mb-0.5 print:text-black uppercase tracking-wider">⚠️ Final Validation Disclaimer</span>
              This session plan and its templates are draft policy-support prototypes. They do not constitute official CCCPA, DEDI, UN, or government advice. All operational plans must be validated against official sources, country context, sovereign mandates, and localized field evidence before deployment.
            </div>

            <div className="border-t border-brand-grey-border/30 pt-2.5 text-[9px] text-brand-gold/90 italic leading-relaxed no-print">
              * Draft planning output. To be validated against official regional mandates and context-specific field evidence before deployment.
            </div>

          </div>

          {/* Dedicated print-only Trainer's Guide Pack */}
          <article className="print-document print-only hidden training-print-pack">
            <header className="print-pack-header">
              <div className="print-pack-title-row">
                <div>
                  <p className="print-kicker">YCPS Toolkit Lab</p>
                  <h1>Trainer&apos;s Guide Pack</h1>
                </div>
                <p className="print-status">Draft for Review and Contextual Validation</p>
              </div>

              <div className="print-meta-grid">
                <div><strong>Output Type</strong><span>Trainer&apos;s Guide Pack</span></div>
                <div><strong>Scenario / Context</strong><span>{injectWorkspaceData ? contextName : getActiveCaseTemplate().context}</span></div>
                <div><strong>Status</strong><span>Draft for Review and Contextual Validation</span></div>
                <div><strong>Date Generated</strong><span>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
              </div>

              <div className="print-callout">
                <strong>Draft support note</strong>
                <p>This pack supports training preparation and contextual discussion. CARANA is a fictional training scenario. Adapt all content to the selected context and validate it before use.</p>
              </div>
            </header>

            <section className="print-section">
              <h2>1. Training Overview</h2>
              <div className="print-summary-grid">
                <div><strong>Training title</strong><span>{sessionTitle}</span></div>
                <div><strong>Audience</strong><span>{audienceNames[audienceType]}</span></div>
                <div><strong>Duration</strong><span>{sessionLength.replace(/_/g, ' ')}</span></div>
                <div><strong>Purpose</strong><span>Build practical capacity for {sessionPurpose.replace(/_/g, ' ')} using a conflict-sensitive YCPS approach.</span></div>
              </div>
              <div className="print-output-box">
                <strong>Learning objectives</strong>
                <ul>
                  <li>Apply Youth, Peace and Security and Climate, Peace and Security lenses to a context-specific scenario.</li>
                  <li>Identify youth agency, participation, protection, prevention, partnership, gender, and inclusion considerations.</li>
                  <li>Develop a practical output with named validation actors and a follow-up mechanism.</li>
                  <li>Use cautious language that does not assume automatic climate-conflict causality or frame youth primarily as risks.</li>
                </ul>
              </div>
            </section>

            <section className="print-section">
              <h2>2. Session Agenda</h2>
              <div className="print-agenda">
                {[
                  ['Opening', 'Confirm objectives, participation expectations, voluntary engagement, and the draft-support disclaimer.'],
                  ['Case framing', `Introduce ${injectWorkspaceData ? contextName : getActiveCaseTemplate().context} and distinguish climate-related stressors from the institutional, livelihood, mobility, and service pressures that shape risk.`],
                  ['Group work', 'Use participatory mapping and stakeholder roles to identify practical youth-led response options and protection safeguards.'],
                  ['Debrief', 'Compare group findings, test assumptions, and surface evidence gaps or differing perspectives.'],
                  ['Output capture', `Document the participant output: ${getExpectedOutputs()}`],
                  ['Validation / follow-up', `Assign review roles to ${injectWorkspaceData && stakeholders.length > 0 ? stakeholders.map((stakeholder) => stakeholder.name).join(', ') : getActiveCaseTemplate().stakeholders.join(', ')} and agree a follow-up mechanism.`]
                ].map(([stage, detail], index) => (
                  <div key={stage} className="print-agenda-row">
                    <span>{index + 1}</span>
                    <div><strong>{stage}</strong><p>{detail}</p></div>
                  </div>
                ))}
              </div>
            </section>

            <section className="print-section print-page-break">
              <h2>3. Practical Activity Instructions</h2>
              <div className="print-key-output">
                <strong>Activity title</strong>
                <p>Scenario-based YCPS coordination exercise - {injectWorkspaceData ? contextName : getActiveCaseTemplate().context}</p>
              </div>
              <div className="print-summary-grid">
                <div><strong>Participants</strong><span>Youth representatives, community actors, relevant public institutions, technical practitioners, and facilitators.</span></div>
                <div><strong>Materials</strong><span>Resource mapping templates, scenario cards, stakeholder notes, draft indicator cards, and validation checklist.</span></div>
              </div>
              <div className="print-output-box">
                <strong>Instructions</strong>
                <ol>
                  <li>Review the scenario and identify the climate-related stressor, exposure, vulnerability, capacity constraints, and available evidence.</li>
                  <li>Identify differentiated youth roles, including leadership, prevention, resilience, participation, and protection considerations.</li>
                  <li>Map the stakeholders who should support, review, or validate the proposed response.</li>
                  <li>Draft one practical action, one indicator, one safeguard, and one follow-up mechanism.</li>
                  <li>Screen the draft for deterministic causality, youth securitization, government-blaming language, and unsupported claims.</li>
                </ol>
              </div>
              <div className="print-key-output">
                <strong>Group task</strong>
                <p>{injectWorkspaceData && riskPathways.length > 0 ? riskPathways[0].youthOpportunity : getActiveCaseTemplate().action}</p>
                <strong>Expected participant output</strong>
                <p>{getExpectedOutputs()} The output should identify validation actors, evidence gaps, and a practical follow-up step.</p>
              </div>
            </section>

            <section className="print-section">
              <h2>4. Facilitator Notes</h2>
              <div className="print-note-grid">
                <div><strong>Introduce the activity</strong><p>Present it as a structured planning exercise. Clarify that the scenario is a starting point for analysis, not an established account of causation or institutional performance.</p></div>
                <div><strong>Manage sensitive discussion</strong><p>Redirect political blame or generalized claims towards specific capacity, coordination, livelihood, service, and evidence questions. Do not request politically exposed testimony.</p></div>
                <div><strong>Keep youth agency visible</strong><p>Invite young participants to lead analysis, present proposals, define safeguards, and shape follow-up arrangements rather than serving only as respondents.</p></div>
                <div><strong>Avoid automatic climate-conflict causality</strong><p>Use language such as may contribute, may compound, or may interact. Ask what contextual conditions and evidence connect each part of the pathway.</p></div>
                <div><strong>Manage participation and protection risks</strong><p>Check voluntary participation, power imbalances, gender and inclusion, confidentiality, safe travel or access, and channels for concerns or withdrawal.</p></div>
              </div>
            </section>

            <section className="print-section print-page-break">
              <h2>5. Debrief Questions</h2>
              <ul className="print-question-list">
                <li>What youth agency roles are visible?</li>
                <li>What protection risks must be addressed?</li>
                <li>What stakeholders must validate the output?</li>
                <li>What evidence is missing?</li>
                <li>What follow-up mechanism is needed?</li>
              </ul>
            </section>

            <section className="print-section">
              <h2>6. Participation and Protection Safeguards</h2>
              <ul className="print-checklist">
                <li>Voluntary participation and informed consent</li>
                <li>Do-no-harm and conflict-sensitive facilitation</li>
                <li>Gender-responsive and inclusive participation</li>
                <li>Safe and accessible feedback channels</li>
                <li>Avoid youth securitization</li>
                <li>No politically exposed testimony without appropriate safeguards</li>
              </ul>
            </section>

            <section className="print-section">
              <h2>7. Evaluation Questions</h2>
              <ul className="print-question-list">
                <li>What did participants produce?</li>
                <li>Was the output practical?</li>
                <li>Were safeguards identified?</li>
                <li>Was validation assigned?</li>
              </ul>
            </section>

            <section className="print-section print-validation-box">
              <h2>8. Validation Disclaimer</h2>
              <p>Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, mandate language, country context, and institutional guidance before use.</p>
            </section>
          </article>

          {/* Right: Interactive Red-Team Checklist */}
          <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 space-y-4 no-print">
            <div className="border-b border-brand-grey-border/40 pb-2">
              <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider">
                Conflict-Sensitivity Checklist
              </h3>
            </div>
            
            <span className="text-[10px] font-bold text-brand-gold tracking-widest uppercase block">
              Red-Team Training Checks
            </span>

            <div className="space-y-3">
              {[
                { key: 'meaningfulParticipation', label: 'Is youth participation meaningful or tokenistic?' },
                { key: 'safeguardingAddressed', label: 'Are protection and safeguarding addressed?' },
                { key: 'genderConsidered', label: 'Is gender representation considered?' },
                { key: 'cautiousClaims', label: 'Are climate-security risk relationships framed cautiously?' },
                { key: 'nationalOwnership', label: 'Is national ownership visible?' },
                { key: 'practicalOutputs', label: 'Are the expected outputs practical?' },
                { key: 'fragileContextSafety', label: 'Is the activity safe for fragile contexts?' },
                { key: 'evidenceValidation', label: 'Is evidence validation included?' },
                { key: 'noGovernmentBlame', label: 'Does the session avoid government-blaming?' },
                { key: 'noYouthSecuritization', label: 'Does the session avoid youth securitization?' }
              ].map((item) => (
                <div key={item.key} className="flex items-start gap-2.5 leading-relaxed text-xs">
                  <input
                    id={`checkbox-${item.key}`}
                    type="checkbox"
                    checked={checklist[item.key as keyof typeof checklist]}
                    onChange={() => handleCheckboxChange(item.key as keyof typeof checklist)}
                    className="mt-0.5 h-3.5 w-3.5 bg-brand-navy-dark border border-brand-grey-border focus:border-brand-gold rounded cursor-pointer"
                  />
                  <label htmlFor={`checkbox-${item.key}`} className={`cursor-pointer select-none ${checklist[item.key as keyof typeof checklist] ? 'text-brand-offwhite font-medium' : 'text-brand-grey-text'}`}>
                    {item.label}
                  </label>
                </div>
              ))}
            </div>

            <hr className="border-brand-grey-border/30" />

            <div className="text-[10px] text-brand-grey-text/75 leading-relaxed bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/40">
              <span className="font-semibold text-brand-gold block mb-1">
                💡 Facilitator Tip:
              </span>
              Complete all 10 checklist reviews before printing the Trainer&apos;s Guide Pack to support conflict-sensitivity and contextual review.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
