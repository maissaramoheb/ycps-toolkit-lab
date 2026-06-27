'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { SourceId } from '@/lib/sourceTruth';
import { CopyButton } from '@/components/CopyButton';

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
      pathway: 'Shrinkage of Lake Chad driving herder migration earlier and further, resulting in crop clashes.',
      stakeholders: ['Lake Chad Basin herder herding groups', 'Local Traditional Councils of Elders', 'LCBC Secretariats'],
      action: 'Set up peer-led local resource monitoring networks and pre-negotiate seasonal migration corridors.'
    },
    somalia: {
      context: 'Somalia pastoral conflicts',
      pathway: 'Severe droughts leading to elite capture of deep aquifers by dominant clans, leaving minor lineages water-excluded.',
      stakeholders: ['nomadic water trucking youth herder groups', 'Clan elders', 'Ministry of Water Resources'],
      action: 'Construct local sand dams managed by mixed-clan water management committees.'
    },
    south_sudan: {
      context: 'South Sudan local peace',
      pathway: 'Flooding of Nile basins displacing cattle herders into agricultural highlands, prompting Gelweng camp youth raids.',
      stakeholders: ['Gelweng youth leaders', 'Local farm committees', 'Peace Commission representatives'],
      action: 'Implement Green Reintegration work programs coupling returnee youth herders with local dyke building.'
    },
    horn_of_africa: {
      context: 'Horn of Africa displacement',
      pathway: 'Drought driving rural herder youth into Dadaab camps, triggering host community friction over firewood collection.',
      stakeholders: ['displaced youth environmental networks', 'Garissa County officials', 'UNHCR coordinators'],
      action: 'Establish youth-led energy cooperatives converting prosopis weeds into charcoal briquettes.'
    },
    egypt: {
      context: 'North Africa / Egypt green transition and youth engagement',
      pathway: 'Sea-level rise in Nile Delta destroying soils, salinizing water, and driving demographic movement to coastal Alexandria.',
      stakeholders: ['Delta farming youth herder cooperatives', 'University startups', 'National development banks'],
      action: 'Fund university-incubated soil restoration start-ups and small-scale solar irrigation cooperatives.'
    },
    pokuland: {
      context: 'Pokuland fictional training scenario',
      pathway: 'Drying of the Poku River forcing border herders to cross frontiers without local municipal notice.',
      stakeholders: ['Pokuland Border herder commissions', 'Poku River Youth Alliance', 'Frontier traditional chiefs'],
      action: 'Deploy borderland resource sharing kiosks equipped with GPS early-warning trackers.'
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
          { time: '00:30 - 00:50', activity: 'Breakout Session: Causal Analysis', details: 'Small groups map climate hazard -> exposure -> vulnerability herder cascades using the CPS Manual guidelines.' },
          { time: '00:50 - 01:00', activity: 'Plenary Debrief & Evaluation', details: 'Formulate key policy messages, check wording guidelines, and complete training evaluation feedback.' }
        ];
      case 'half_day':
        return [
          { time: '09:00 - 09:45', activity: 'Introduction to YCPS & Diplomatic Rules', details: 'Framing local ownership, avoiding failed-state tropes, and reviewing the 6 Strategic Language guidelines.' },
          { time: '09:45 - 10:45', activity: 'Causal Risk Pathway Mapping', details: `Examine herder vulnerability in ${injectWorkspaceData ? contextName : getActiveCaseTemplate().context}. Identify capacity constraints.` },
          { time: '10:45 - 11:00', activity: 'Break & Intergenerational Networking', details: 'Coffee break focusing on dialogue between youth participants and senior practitioners.' },
          { time: '11:00 - 12:15', activity: 'breakout simulation: Pokuland borderland case', details: 'Interactive roleplay where participants negotiate a river resource sharing agreement using GPS coordinates.' },
          { time: '12:15 - 13:00', activity: 'Policy Brief consolidation & M&E Indicators', details: 'Group drafts Suggested Actions and M&E Indicators. Conduct red-team audit checks for language.' }
        ];
      case 'full_day':
        return [
          { time: '09:00 - 10:30', activity: 'High-Level Opening & Source grounding', details: 'Establish alignment with the Egypt-Denmark DEDI workplan and ToR consultant mandates.' },
          { time: '10:30 - 12:00', activity: 'Case Study Lab: Multi-hazard Analysis', details: `Map stressors (rainfall, salinization) for ${injectWorkspaceData ? contextName : getActiveCaseTemplate().context}. List stakeholder interests.` },
          { time: '12:00 - 13:00', activity: 'Lunch Break & Informal Consultations', details: 'Catered lunch respecting local dietary and gender-safe parameters.' },
          { time: '13:00 - 15:00', activity: 'Main breakout roleplay exercise', details: 'Run Pokuland-style training simulation. herder councils draft water sharing agreements.' },
          { time: '15:00 - 16:00', activity: 'Diplomatic Language Clinic & Audits', details: 'Review group briefs against word compliance guidelines in review panel. Replace sensitive terms.' },
          { time: '16:00 - 17:00', activity: 'Validation workshop & Closing', details: 'Consolidate workshop session briefs. Final M&E review, safeguarding checks, and closing statements.' }
        ];
      case '90_minutes':
      default:
        return [
          { time: '00:00 - 00:15', activity: 'Welcome & YCPS Nexus Framing', details: 'Introductions, explaining the double agenda (YPS + CPS), and reviewing the diplomatic disclaimer.' },
          { time: '00:15 - 00:40', activity: 'Causal Risk Pathway Analysis', details: `Reviewing climate stressors and herder context for ${injectWorkspaceData ? contextName : getActiveCaseTemplate().context}.` },
          { time: '00:40 - 01:15', activity: 'Interactive Group Breakout', details: 'Formulate joint herder mediation strategies and select stakeholder engagement protocols.' },
          { time: '01:15 - 01:30', activity: 'Debrief, Policy drafting & Cautions', details: 'Reviewing wording rules, compiling suggested action, and auditing conflict-sensitivity risks.' }
        ];
    }
  };

  // Compile Dynamic Outputs based on Purpose
  const getExpectedOutputs = () => {
    switch (sessionPurpose) {
      case 'pathway_analysis':
        return 'Completed climate-security risk pathway (hazard -> exposure -> vulnerability herder herding steps).';
      case 'stakeholder_mapping':
        return 'Detailed stakeholder herder map with engagement strategies and diplomatic risk checks.';
      case 'language_review':
        return 'Red-team revised language note with replacement words for policy briefs.';
      case 'policy_development':
        return 'Draft policy recommendation and monitoring indicators matching DEDI Workplan.';
      case 'case_study':
        return 'Case study brief outlining herding opportunities and validation needs.';
      case 'ycps_intro':
      case 'integration':
      default:
        return 'Completed YCPS integration matrix, suggested herder herding actions, and indicators.';
    }
  };

  // Compile Facilitator Note based on Sensitivity
  const getFacilitatorNotes = () => {
    switch (sensitivityLevel) {
      case 'High':
        return 'CRITICAL SENSITIVITY: Facilitators must operate strictly under safe space protocols. Ensure herder herding groups and government representatives are seated neutrally to balance power dynamics. Do not publish herder participant names or record clan affiliations. Keep discussions strictly technical (agronomy, solar pumps, mediation) rather than political.';
      case 'Moderate':
        return 'MODERATE SENSITIVITY: Monitor group dynamics to prevent older herding herders from dominated herder herding youth. Ensure gender representation is visible. Enforce the strategic language rules during policy briefs, replacing government-blaming comments with capacity-constraint references.';
      case 'Low':
      default:
        return 'STANDARD SENSITIVITY: Encourage active peer-to-peer herder discussion. Focus on scenario exercises, timing, and checking that herder herding indicators are measurable.';
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

    md += `## 3. Grounded Causal Context\n`;
    if (injectWorkspaceData && riskPathways.length > 0) {
      const p = riskPathways[0];
      md += `- **Hazard:** ${p.hazard}\n`;
      md += `- **Exposure & Vulnerability:** ${p.exposure} | ${p.vulnerability}\n`;
      md += `- **Capacity Constraint:** ${p.capacityConstraint}\n`;
      md += `- **Youth Opportunity:** ${p.youthOpportunity}\n\n`;
    } else {
      const t = getActiveCaseTemplate();
      md += `- **Context:** ${t.context}\n`;
      md += `- **Causal Pathway:** ${t.pathway}\n`;
      md += `- **Key Stakeholders:** ${t.stakeholders.join(', ')}\n\n`;
    }

    md += `## 4. Facilitator Safeguards & Cautions\n`;
    md += `- **Wording caution:** Avoid overstating climate causality or framing youth as threats.\n`;
    md += `- **Context Sensitivity:** ${getFacilitatorNotes()}\n\n`;

    md += `## 5. Training Use Safeguard\n`;
    md += `This session plan is for training, dialogue, and policy-support purposes. It should not be used as an operational security plan, intelligence assessment, or official institutional position. Validate all outputs against localized context-specific evidence.\n`;

    return md;
  };

  const compileFacilitatorNotes = () => {
    let md = `## FACILITATOR GUIDE & HANDOUT NOTES\n`;
    md += `**Session:** ${sessionTitle}\n`;
    md += `**Audience adaptation protocol:**\n`;
    md += `- Focus on constructive, conflict-sensitive cooperation.\n`;
    md += `- Enforce strategic vocabulary rules (avoiding 'failed state', 'radical herder herding youth').\n\n`;
    md += `**Breakout instructions:**\n`;
    md += `Split herders into mixed stakeholder teams representing local herder herders, water officials, and community elders. Instruct them to draft a joint water pan rota.\n\n`;
    md += `**Sensitive triggers warning:**\n`;
    md += `${getFacilitatorNotes()}\n`;
    return md;
  };

  return (
    <div className="space-y-6 animate-fade-in">
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
              <option value="sahel">Sahel / Lake Chad Basin herder herding</option>
              <option value="somalia">Somalia pastoral conflicts</option>
              <option value="south_sudan">South Sudan local peace</option>
              <option value="horn_of_africa">Horn of Africa displacement</option>
              <option value="egypt">North Africa / Egypt green startup</option>
              <option value="pokuland">Pokuland fictional simulation</option>
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
        </div>

        {/* Right: Dynamic Guide & Handouts */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Action Row */}
          <div className="flex items-center justify-between border-b border-brand-grey-border/40 pb-2 no-print">
            <h3 className="text-sm font-semibold text-brand-offwhite">
              Trainer Handouts & Guides
            </h3>
            <div className="flex items-center gap-2">
              <CopyButton text={compileMarkdownPlan()} label="Copy Plan" />
              <CopyButton text={compileFacilitatorNotes()} label="Copy Facilitator Notes" />
              <button
                onClick={() => window.print()}
                type="button"
                className="px-3 py-1.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark rounded-md text-xs font-semibold cursor-pointer shadow-md shadow-brand-gold/15 flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2zm5-17v2m-6 0h12" />
                </svg>
                <span>Print Trainer Guide</span>
              </button>
            </div>
          </div>

          {/* Printable Trainer sheet */}
          <div className="bg-slate-900 border border-brand-grey-border rounded-xl p-6 md:p-8 shadow-xl text-xs text-brand-grey-text space-y-6 print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
            
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
                This training plan equips YCPS policy planners and herder herding leaders with tools to mainstream climate adaptation and peacebuilding activities.
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
                3. Grounded Causal Context (Case Analysis)
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
                  <p><span className="font-semibold text-brand-offwhite print:text-black">Causal conflict pathway:</span> {getActiveCaseTemplate().pathway}</p>
                  <p><span className="font-semibold text-brand-offwhite print:text-black">Key Stakeholders:</span> {getActiveCaseTemplate().stakeholders.join(', ')}</p>
                </div>
              )}
            </div>

            {/* Section 4: Dynamic Activity Card */}
            <div className="border border-brand-gold/30 bg-brand-navy-light/10 p-5 rounded-xl space-y-3.5 print:border-black print:bg-transparent">
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block print:text-black">
                🎮 Dynamic Activity Handout Card
              </span>
              <div className="space-y-1">
                <h4 className="font-bold text-brand-offwhite text-xs print:text-black">
                  Activity: Negotiating locally-owned water pan agreements
                </h4>
                <p className="text-[11px] text-brand-grey-text/90">
                  <span className="font-semibold text-brand-gold print:text-black">Purpose:</span> Build collaborative herder negotiation capacity under environmental duress.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-[11px] leading-relaxed">
                <div>
                  <span className="font-semibold text-brand-offwhite print:text-black block mb-0.5">Instructions:</span>
                  <p>1. Form teams representing herder cooperatives and local agricultural leaders.<br />2. Review mapped stakeholder interests.<br />3. Draft water sharing timings and corridors.</p>
                </div>
                <div>
                  <span className="font-semibold text-brand-offwhite print:text-black block mb-0.5">Output Template:</span>
                  <p className="font-mono text-[9px] bg-brand-navy-dark border border-brand-grey-border/40 p-2 rounded text-brand-grey-text/95 print:bg-gray-100 print:text-black">
                    - Objective herder corridor coordinates: [ ]<br />
                    - Local water-sharing rota timings: [ ]<br />
                    - Joint elder-youth mediation panel: [ ]
                  </p>
                </div>
              </div>

              <div className="p-3 bg-red-950/20 border border-red-500/25 rounded text-[10px] leading-relaxed text-brand-grey-text print:border-black print:text-black">
                <span className="font-semibold text-red-400 block mb-0.5 print:text-black">⚠️ Facilitator warnings:</span>
                Never refer to herding herder youth as &ldquo;combat herders&rdquo; or &ldquo;security risks.&rdquo; Frame discussions around livelihood adaptation.
              </div>
            </div>

            {/* Section 5: Audience Adaptation Guidance */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:pb-0.5">
                4. Audience Adaptation Guidance
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 text-[11px] leading-relaxed">
                <div className="p-3 bg-brand-navy-light/25 border border-brand-grey-border/30 rounded-lg print:bg-gray-100">
                  <span className="font-semibold text-brand-gold print:text-black block">Policymakers & Officials:</span>
                  Focus on national ownership priorities, institutional ministerial mapping, and formalizing youth advisors inside municipal planning.
                </div>
                <div className="p-3 bg-brand-navy-light/25 border border-brand-grey-border/30 rounded-lg print:bg-gray-100">
                  <span className="font-semibold text-brand-gold print:text-black block">Youth Organizations:</span>
                  Emphasize local adaptation agency, ecological herder enterprise hubs, early warning reporting, and peer mediation skills.
                </div>
                <div className="p-3 bg-brand-navy-light/25 border border-brand-grey-border/30 rounded-lg print:bg-gray-100">
                  <span className="font-semibold text-brand-gold print:text-black block">Diplomatic & Mixed Audiences:</span>
                  Maintain strict compliance wording rules. Frame transboundary basins cooperative (e.g. Aswan Forum dialogue protocols).
                </div>
                <div className="p-3 bg-brand-navy-light/25 border border-brand-grey-border/30 rounded-lg print:bg-gray-100">
                  <span className="font-semibold text-brand-gold print:text-black block">Practitioners:</span>
                  Focus on programmatic metrics, local baseline indicators, conflict sensitivity checklist, and M&E framework.
                </div>
              </div>
            </div>

            {/* Section 6: Safeguard warnings */}
            <div className="bg-red-950/20 border border-red-500/30 p-4 rounded-xl space-y-2 print:border-black print:bg-transparent">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block print:text-black">
                ⚠️ Operational Safeguard Caution
              </span>
              <p className="text-[10px] text-brand-grey-text leading-relaxed print:text-black">
                This session plan is for training, dialogue, and policy-support purposes. It should not be used as an operational security plan, intelligence assessment, or official institutional position. Users must validate all outputs against sovereign mandates and local context-specific evidence.
              </p>
            </div>

          </div>

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
                { key: 'cautiousClaims', label: 'Are causal climate-security claims cautious?' },
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
              Complete all 10 checklist reviews before printing the Trainer Guide to ensure compliance with CCCPA YCPS policy criteria.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
