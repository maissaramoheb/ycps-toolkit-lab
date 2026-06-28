'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { WORKPLAN_ACTIVITIES } from '@/lib/sourceTruth';
import { CopyButton } from '@/components/CopyButton';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { YPSPillarId } from '@/types';
import Link from 'next/link';

export default function WorkplanToolkitPage() {
  const { matrixEntries, riskPathways, stakeholders, contextName, loadScenario } = useApp();

  // Selected Options for Mapping
  const [selectedActivity, setSelectedActivity] = useState<string>(WORKPLAN_ACTIVITIES[0].id);
  const [selectedPillarId, setSelectedPillarId] = useState<YPSPillarId>('participation');
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>('');
  const [selectedStakeholderId, setSelectedStakeholderId] = useState<string>('');
  const [selectedOutputType, setSelectedOutputType] = useState<string>('toolkit_section');

  // Interactive Validation Checklist state
  const [checkedChecks, setCheckedChecks] = useState<Record<number, boolean>>({
    0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true, 13: true, 14: true
  });

  const handleToggleCheck = (idx: number) => {
    setCheckedChecks((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const activeActivity = WORKPLAN_ACTIVITIES.find((a) => a.id === selectedActivity) || WORKPLAN_ACTIVITIES[0];

  // Predefined Fallback Template Data (CARANA Fictional Scenario)
  const isWorkspaceEmpty = riskPathways.length === 0 && stakeholders.length === 0;

  const activePillar = matrixEntries[selectedPillarId];
  
  const activePathway = riskPathways.find((p) => p.id === selectedPathwayId) || riskPathways[0] || {
    id: 'fallback-pathway',
    context: 'Template fallback: CARANA fictional training scenario — replace with validated local data before use.',
    hazard: 'Erratic rainfall and drying of the Carana River corridor.',
    exposure: 'Shared agropastoral water wells and river banks.',
    vulnerability: 'Lack of shared management protocols, historical grazing disputes, and low livelihood alternatives.',
    capacityConstraint: 'No transboundary water coordination treaties between regional Upper/Lower CARANA administrations.',
    pathwayType: 'resource_competition',
    youthImpact: 'Youth pastoralists clash at drying river beds during transit.',
    youthOpportunity: 'Convene joint youth early-warning councils and radio networks.',
    intervention: 'Deploy coordination kiosks and support youth border land-use monitors.',
    evidenceStrength: 'Medium (Template)',
    evidenceGaps: 'Accurate dry season hydrological maps along border crossings.'
  };

  const activeStakeholder = stakeholders.find((s) => s.id === selectedStakeholderId) || stakeholders[0] || {
    id: 'fallback-stakeholder',
    name: 'Template fallback: CARANA Water Commission — replace with validated local data before use.',
    actorType: 'government_institution',
    interest: 'Managing transboundary water distribution and border stability.',
    influence: 'High',
    position: 'Neutral',
    youthInclusionQuality: 'Low',
    risks: 'Friction with community youth if technical decisions are not validated locally.',
    diplomaticSensitivity: 'Discussions must focus strictly on water access rather than sovereign borders.',
    engagementStrategy: 'Present youth-led negotiation outputs to commissioner boards.'
  };

  const pillarDetails = {
    name: selectedPillarId.charAt(0).toUpperCase() + selectedPillarId.slice(1).replace('_', ' '),
    climateSecurityConsideration: activePillar.climateSecurityConsideration || 'Template fallback: CARANA fictional training scenario — Erratic seasonal rainfall dries up local water pans, increasing mobility friction.',
    youthRoleAgency: activePillar.youthRoleAgency || 'Template fallback: CARANA fictional training scenario — Youth establish local resource management committees.',
    practicalEntryPoint: activePillar.practicalEntryPoint || 'Template fallback: CARANA fictional training scenario — Coordinate youth representatives with local traditional elders.',
    suggestedAction: activePillar.suggestedAction || 'Template fallback: CARANA fictional training scenario — Train youth mediators in community-led dialogue.',
    indicator: activePillar.indicator || 'Template fallback: CARANA fictional training scenario — Number of localized seasonal water sharing agreements co-signed.',
    diplomaticWording: activePillar.diplomaticWording || 'Template fallback: CARANA fictional training scenario — Supporting community resilience by formalizing youth advisory roles.',
    redTeamWarning: activePillar.redTeamWarning || 'Template fallback: CARANA fictional training scenario — Ensure traditional elders are consulted to prevent generational backlash.'
  };

  // Markdown compilers for each of the 7 output types
  const getToolkitSectionMarkdown = () => {
    let md = `# YCPS TOOLKIT SECTION DRAFT\n`;
    md += `**Linked Activity:** ${activeActivity.name}\n`;
    md += `**Source Grounding:** CCCPA Guidebook on CPS Programming & DEDI Workplan\n`;
    md += `**Scope:** ${activeActivity.description}\n\n`;
    md += `## 1. PURPOSE\n`;
    md += `Provides a practical method to operationalize youth integration within regional climate stabilization, focusing on the ${pillarDetails.name} pillar.\n\n`;
    md += `## 2. WHEN TO USE THIS TOOL\n`;
    md += `Use during project formulation, joint stabilization mapping, or intergenerational consultations in borderland zones.\n\n`;
    md += `## 3. KEY YCPS ISSUE IN PLAY\n`;
    md += `- **Climate Stress:** ${activePathway.hazard}\n`;
    md += `- **Capacity Constraint:** ${activePathway.capacityConstraint}\n`;
    md += `- **Vulnerability Context:** ${activePathway.vulnerability}\n\n`;
    md += `## 4. PRACTICAL ENTRY POINTS\n`;
    md += `${pillarDetails.practicalEntryPoint}\n\n`;
    md += `## 5. STEP-BY-STEP USE INSTRUCTIONS\n`;
    md += `1. **Mapping:** Chart transhumance corridors and seasonal grazing ranges relative to changing water resources.\n`;
    md += `2. **Engagement:** Convene local youth cooperatives and traditional elders to co-design resource scheduling.\n`;
    md += `3. **Formalization:** Formally integrate youth delegates into local coordination commissions.\n\n`;
    md += `## 6. EXPECTED OUTCOME FOR USERS\n`;
    md += `A youth-inclusive natural resource sharing agreement with local indicators, mapped directly to Component 3 Workplan targets.\n\n`;
    md += `## 7. VALIDATION ACTORS\n`;
    md += `Must be validated with: ${activeStakeholder.name}, traditional borderlands councils, and Ministry technicians.\n\n`;
    md += `## 8. ADAPTATION FOR DIFFERENT AFRICAN CONTEXTS\n`;
    md += `Adapt this tool's focus depending on regional settings (e.g., agropastoral water access in the Sahel vs. soil salinity adaptation in the Nile Delta).\n\n`;
    md += `---\n`;
    md += `*Disclaimer: Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, mandate language, country context, and institutional guidance before use.*`;
    return md;
  };

  const getActivitySheetMarkdown = () => {
    let md = `# PRACTICAL ACTIVITY SHEET\n`;
    md += `**Activity Title:** Scenario-Based Dialogue on ${pillarDetails.name} in ${contextName}\n`;
    md += `**Linked Activity:** ${activeActivity.name}\n`;
    md += `**Time Required:** 90 Minutes\n`;
    md += `**Target Participants:** Youth leaders, traditional elders, municipal authorities, regional practitioners.\n\n`;
    md += `## 1. PURPOSE\n`;
    md += `To co-design localized conflict-sensitive stabilization recommendations using the workspace diagnostic maps.\n\n`;
    md += `## 2. MATERIALS NEEDED\n`;
    md += `Workspace maps, GPS trackers/radio logs, flipcharts, and conflict-sensitivity checklists.\n\n`;
    md += `## 3. STEP-BY-STEP INSTRUCTIONS\n`;
    md += `1. **Setup (20 mins):** Present the climate-security pathway: ${activePathway.hazard}.\n`;
    md += `2. **Split (30 mins):** Form mixed groups (youth + elders) representing grazing cooperatives and councils.\n`;
    md += `3. **Negotiation (30 mins):** Draft mutual water-sharing rotas based on stakeholder interests: ${activeStakeholder.interest}.\n`;
    md += `4. **Diplomatic Check (10 mins):** Audit the recommendations for non-securitized wording.\n\n`;
    md += `## 4. GROUP TASK\n`;
    md += `Draft a joint resource-sharing agreement addressing the pathway: ${activePathway.youthOpportunity}.\n\n`;
    md += `## 5. OUTPUT TEMPLATE\n`;
    md += `- **Suggested Action:** ${pillarDetails.suggestedAction}\n`;
    md += `- **M&E Indicator:** ${pillarDetails.indicator}\n\n`;
    md += `## 6. DEBRIEF QUESTIONS\n`;
    md += `1. How does pairing youth and elders change trust dynamics during negotiations?\n`;
    md += `2. What are the primary protection risks for young people mapping migration paths?\n\n`;
    md += `## 7. FACILITATOR CAUTIONS & SAFEGUARDS\n`;
    md += `⚠️ **Conflict Sensitivity:** ${pillarDetails.redTeamWarning}\n\n`;
    md += `## 8. VALIDATION REQUIREMENTS\n`;
    md += `Validate all draft agreements with: ${activeStakeholder.name} prior to implementation.\n\n`;
    md += `---\n`;
    md += `*Disclaimer: Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, mandate language, country context, and institutional guidance before use.*`;
    return md;
  };

  const getFacilitatorGuideMarkdown = () => {
    let md = `# FACILITATOR GUIDE NOTE\n`;
    md += `**Subject:** Facilitating ${pillarDetails.name} in Climate-Conflict Stabilization Settings\n`;
    md += `**Linked Activity:** ${activeActivity.name}\n\n`;
    md += `## 1. SESSION FRAMING\n`;
    md += `Frame young people as active agents of resilience, innovation, prevention, and peacebuilding rather than passive victims or risks. Avoid taking sides in clan-based water disputes. Strictly respect the mentorship role of traditional elders.\n\n`;
    md += `## 2. AUDIENCE ADAPTATION\n`;
    md += `- **For Policymakers:** Emphasize technical indicators: ${pillarDetails.indicator}.\n`;
    md += `- **For Local Youth:** Focus on practical coordination steps and personal safety.\n\n`;
    md += `## 3. SENSITIVE ISSUES TO WATCH\n`;
    md += `Avoid taking sides in clan-based water disputes. Strictly respect the mentors role of traditional elders. Maintain absolute neutrality.\n\n`;
    md += `## 4. YOUTH PARTICIPATION & PROTECTION\n`;
    md += `Ensure young women are included in all resource panels and that travel paths to validation hearings are physically secure. Safeguard: ${pillarDetails.redTeamWarning}.\n\n`;
    md += `## 5. DISCUSSION SAFETY PROTOCOLS\n`;
    md += `Establish clear guidelines: discussions must focus on water flow and resource access rather than sovereign borders, armed factions, or national politics.\n\n`;
    md += `## 6. AVOIDING OVERCLAIMING\n`;
    md += `Instruct facilitators to challenge statements claiming climate change directly causes local conflict. Keep focus on compounding risks and capacity constraints: ${activePathway.capacityConstraint}.\n\n`;
    md += `## 7. DOCUMENTING OUTPUTS\n`;
    md += `Record agreements in writing, co-signed by youth and elder delegates. Log coordinates of shared water points.\n\n`;
    md += `## 8. FOLLOW-UP & VALIDATION ACTORS\n`;
    md += `Liaise with ministry technical desks and traditional councils to schedule validation hearings. Key reviewer: ${activeStakeholder.name}.\n\n`;
    md += `---\n`;
    md += `*Disclaimer: Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, mandate language, country context, and institutional guidance before use.*`;
    return md;
  };

  const getPolicyNoteMarkdown = () => {
    let md = `# YCPS POLICY / PROGRAMMING NOTE\n`;
    md += `**Context:** Draft support tool briefing note for ${contextName}\n`;
    md += `**Linked Activity:** ${activeActivity.name}\n\n`;
    md += `## 1. CONTEXT SUMMARY\n`;
    md += `Context environment: ${contextName}. Analysis focuses on integrating YPS and CPS dynamics in stabilizing borderland zones.\n\n`;
    md += `## 2. CLIMATE-RELATED RISK PATHWAY\n`;
    md += `Climate hazard (${activePathway.hazard}) combined with capacity constraint (${activePathway.capacityConstraint}) impacts communities, exposing youth to security risks.\n\n`;
    md += `## 3. YOUTH AGENCY & PARTICIPATION ENTRY POINT\n`;
    md += `Youth act via ${activePathway.youthOpportunity} to stabilize local resource coordination and support early warning.\n\n`;
    md += `## 4. STAKEHOLDER COORDINATION NEED\n`;
    md += `Coordinate with ${activeStakeholder.name} (type: ${activeStakeholder.actorType.replace('_', ' ')}) to align local agreements with national priorities.\n\n`;
    md += `## 5. PROPOSED ACTION\n`;
    md += `${pillarDetails.suggestedAction}\n\n`;
    md += `## 6. M&E INDICATOR\n`;
    md += `${pillarDetails.indicator}\n\n`;
    md += `## 7. RISKS & SAFEGUARDS\n`;
    md += `⚠️ **Red-Team Warning:** ${pillarDetails.redTeamWarning}\n\n`;
    md += `## 8. EVIDENCE GAPS\n`;
    md += `${activePathway.evidenceGaps}\n\n`;
    md += `## 9. VALIDATION ACTORS\n`;
    md += `Ministry technicians, traditional councils, and key reviewer ${activeStakeholder.name}.\n\n`;
    md += `## 10. SUGGESTED NEXT STEP\n`;
    md += `Liaise with ministry technical desks to review suggested agreements and coordinate validation hearings.\n\n`;
    md += `---\n`;
    md += `*Disclaimer: Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, mandate language, country context, and institutional guidance before use.*`;
    return md;
  };

  const getStakeholderBriefMarkdown = () => {
    let md = `# STAKEHOLDER CONSULTATION BRIEF\n`;
    md += `**Objective:** Ensure local community buy-in and coordinate YCPS activities across layers.\n`;
    md += `**Target Stakeholder:** ${activeStakeholder.name}\n`;
    md += `**Linked Activity:** ${activeActivity.name}\n\n`;
    md += `## 1. CONSULTATION OBJECTIVE\n`;
    md += `Coordinate YCPS activities and align with stakeholder interests: ${activeStakeholder.interest}.\n\n`;
    md += `## 2. WHO SHOULD PARTICIPATE\n`;
    md += `Ministry representatives, traditional elders, agropastoral youth unions, and women-led cooperatives.\n\n`;
    md += `## 3. YOUTH PARTICIPATION SAFEGUARDS\n`;
    md += `Verify that youth delegates are free to speak without fear of political backlash or elder reprimand. Safeguard: ${activeStakeholder.risks || 'None recorded'}.\n\n`;
    md += `## 4. KEY DISCUSSION QUESTIONS\n`;
    md += `1. What interest does ${activeStakeholder.name} have in local resource sharing?\n`;
    md += `2. How can we support youth agency without creating friction with traditional structures?\n`;
    md += `3. What are the primary protection risks for young people operating water kiosks?\n\n`;
    md += `## 5. SENSITIVE ISSUES\n`;
    md += `Land ownership claims, border patrollers presence, and transhumance security routes. Wording risks: ${activeStakeholder.diplomaticSensitivity}.\n\n`;
    md += `## 6. EXPECTED OUTPUTS\n`;
    md += `A mapped stakeholder influence matrix and signed coordination memorandum.\n\n`;
    md += `## 7. FEEDBACK MECHANISM\n`;
    md += `Convene monthly joint feedback sessions to adjust resource rotas based on seasonal changes.\n\n`;
    md += `## 8. FOLLOW-UP PLAN & VALIDATION\n`;
    md += `Liaise with ministry technical desks to review suggested agreements and coordinate validation hearings. Validate with: ${activeStakeholder.name}.\n\n`;
    md += `---\n`;
    md += `*Disclaimer: Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, mandate language, country context, and institutional guidance before use.*`;
    return md;
  };

  const getValidationChecklistMarkdown = () => {
    let md = `# YCPS VALIDATION CHECKLIST\n`;
    md += `**Subject:** Validation requirements for ${activeActivity.name} outputs\n\n`;
    md += `- [ ] **Source Grounding:** Grounded in CCCPA / DEDI YCPS source-of-truth guidelines.\n`;
    md += `- [ ] **Context-Specific Evidence:** Built on context-specific climate evidence (${activePathway.hazard}) rather than generic assumptions.\n`;
    md += `- [ ] **Youth Agency:** Frames young people as active agents of resilience, innovation, and mediation.\n`;
    md += `- [ ] **Meaningful Participation:** Emphasizes real consultation rather than symbolic tokenism.\n`;
    md += `- [ ] **Participation/Protection Link:** Integrates specific physical protection safeguards (${pillarDetails.redTeamWarning}) for youth.\n`;
    md += `- [ ] **Prevention/Resilience Link:** Connects prevention activities directly to eco-agricultural or green livelihoods.\n`;
    md += `- [ ] **Gender and Inclusion:** Incorporates gender-sensitive and inclusive selection parameters.\n`;
    md += `- [ ] **Forced Displacement:** Addresses displacement or migration route dynamics where relevant.\n`;
    md += `- [ ] **National Ownership:** Respects sovereign boundaries, local ownership, and institutional mandates.\n`;
    md += `- [ ] **Diplomatic Wording:** Utilizes careful, constructive diplomatic language.\n`;
    md += `- [ ] **Avoidance of Youth Securitization:** Ensures youth are not framed as security combat risks or military assets.\n`;
    md += `- [ ] **Avoidance of Causal Overclaiming:** Does not overstate climate-conflict causality.\n`;
    md += `- [ ] **Stakeholder Validation:** Mapped stakeholders (${activeStakeholder.name}) validated for local influence and interests.\n`;
    md += `- [ ] **Follow-Up Mechanism:** Follow-up validation hearings scheduled with local traditional councils.\n`;
    md += `- [ ] **Workplan Relevance:** Mapped output satisfies Component 3 targets: ${activeActivity.name}.\n\n`;
    md += `---\n`;
    md += `*Disclaimer: Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, mandate language, country context, and institutional guidance before use.*`;
    return md;
  };

  const getCompletePackageMarkdown = () => {
    let md = `# COMPLETE YCPS TOOLKIT OUTPUT PACKAGE\n`;
    md += `**Context Environment:** ${contextName}\n`;
    md += `**Linked Activity:** ${activeActivity.name}\n`;
    if (isWorkspaceEmpty) {
      md += `**Notice:** Template fallback: CARANA fictional training scenario — replace with validated local data before use.\n`;
    }
    md += `*Compiled via YCPS Toolkit Lab Toolkit Builder*\n\n`;
    md += `================================================================================\n\n`;
    
    md += getToolkitSectionMarkdown();
    md += `\n\n================================================================================\n\n`;
    
    md += getActivitySheetMarkdown();
    md += `\n\n================================================================================\n\n`;
    
    md += getFacilitatorGuideMarkdown();
    md += `\n\n================================================================================\n\n`;
    
    md += getPolicyNoteMarkdown();
    md += `\n\n================================================================================\n\n`;
    
    md += getStakeholderBriefMarkdown();
    md += `\n\n================================================================================\n\n`;
    
    md += getValidationChecklistMarkdown();
    return md;
  };

  const compileActiveOutputMarkdown = () => {
    switch (selectedOutputType) {
      case 'toolkit_section':
        return getToolkitSectionMarkdown();
      case 'activity_sheet':
        return getActivitySheetMarkdown();
      case 'facilitator_note':
        return getFacilitatorGuideMarkdown();
      case 'policy_note':
        return getPolicyNoteMarkdown();
      case 'stakeholder_brief':
        return getStakeholderBriefMarkdown();
      case 'validation_checklist':
        return getValidationChecklistMarkdown();
      case 'complete_package':
      default:
        return getCompletePackageMarkdown();
    }
  };

  const getCopyButtonLabel = () => {
    switch (selectedOutputType) {
      case 'toolkit_section':
        return 'Copy Toolkit Section Draft';
      case 'activity_sheet':
        return 'Copy Activity Sheet';
      case 'facilitator_note':
        return 'Copy Facilitator Guide Note';
      case 'policy_note':
        return 'Copy Policy / Programming Note';
      case 'stakeholder_brief':
        return 'Copy Consultation Brief';
      case 'validation_checklist':
        return 'Copy Validation Checklist';
      case 'complete_package':
      default:
        return 'Copy Complete Toolkit Package';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-grey-border/60 pb-5 no-print">
        <div>
          <h1 className="text-2xl font-bold text-brand-offwhite">
            Toolkit Builder
          </h1>
          <p className="text-xs text-brand-grey-text mt-1">
            Assemble YCPS analysis into practical toolkit-ready outputs for review, training, policy dialogue, and validation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Optional Demo Helper */}
          <div className="flex flex-col items-end no-print">
            <button
              onClick={() => {
                if (window.confirm("This will load the CARANA Fictional Training Scenario into your workspace to demonstrate the Toolkit Builder. Continue?")) {
                  loadScenario('carana');
                }
              }}
              type="button"
              className="px-3.5 py-1.5 bg-brand-gold/15 border border-brand-gold/30 hover:bg-brand-gold/25 text-brand-gold rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer animate-pulse"
            >
              <span>🎮 Load Demo Toolkit Package</span>
            </button>
            <span className="text-[9px] text-brand-grey-text mt-0.5">
              Demo template only — CARANA fictional training scenario
            </span>
          </div>
          <div className="text-xs px-3 py-1.5 rounded-lg bg-brand-navy-light border border-brand-grey-border font-medium text-brand-gold">
            Context: {contextName}
          </div>
        </div>
      </div>

      {/* Workflow Stepper */}
      <div className="w-full bg-brand-navy-dark/40 border border-brand-grey-border/30 rounded-xl p-3.5 no-print">
        <div className="flex flex-wrap items-center justify-between gap-2.5 text-[10px] uppercase tracking-widest text-brand-grey-text/70 font-semibold max-w-4xl mx-auto">
          <div className="flex items-center gap-1.5">
            <span className="h-4 w-4 rounded-full bg-brand-gold text-brand-navy-dark flex items-center justify-center font-bold text-[8px]">1</span>
            <span className="text-brand-gold">Workspace Inputs</span>
          </div>
          <span>→</span>
          <div className={`flex items-center gap-1.5 ${selectedOutputType === 'toolkit_section' ? 'text-brand-offwhite font-bold' : ''}`}>
            <span className="h-4 w-4 rounded-full bg-brand-grey-border text-brand-offwhite flex items-center justify-center font-bold text-[8px]">2</span>
            <span>Toolkit Section</span>
          </div>
          <span>→</span>
          <div className={`flex items-center gap-1.5 ${selectedOutputType === 'activity_sheet' ? 'text-brand-offwhite font-bold' : ''}`}>
            <span className="h-4 w-4 rounded-full bg-brand-grey-border text-brand-offwhite flex items-center justify-center font-bold text-[8px]">3</span>
            <span>Activity Sheet</span>
          </div>
          <span>→</span>
          <div className={`flex items-center gap-1.5 ${selectedOutputType === 'facilitator_note' ? 'text-brand-offwhite font-bold' : ''}`}>
            <span className="h-4 w-4 rounded-full bg-brand-grey-border text-brand-offwhite flex items-center justify-center font-bold text-[8px]">4</span>
            <span>Facilitator Note</span>
          </div>
          <span>→</span>
          <div className={`flex items-center gap-1.5 ${selectedOutputType === 'validation_checklist' ? 'text-brand-offwhite font-bold' : ''}`}>
            <span className="h-4 w-4 rounded-full bg-brand-grey-border text-brand-offwhite flex items-center justify-center font-bold text-[8px]">5</span>
            <span>Validation Checklist</span>
          </div>
          <span>→</span>
          <div className="flex items-center gap-1.5">
            <span className="h-4 w-4 rounded-full bg-brand-green text-brand-navy-dark flex items-center justify-center font-bold text-[8px]">6</span>
            <span className="text-brand-green">Export Package</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column: Workplan Selector & Connectors */}
        <div className="lg:col-span-1 space-y-4 no-print">
          <div className="glass-panel p-6 rounded-xl border border-brand-grey-border/60 space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-wider">
                1. Select Workplan Activity
              </h3>
              <p className="text-[10px] text-brand-grey-text mt-1">
                Linked directly to Component 3 (Egypt-Denmark YCPS Workplan).
              </p>
            </div>

            <div className="space-y-1">
              <label htmlFor="activity-select" className="block text-xs font-semibold text-brand-offwhite">
                Workplan Timeline Target
              </label>
              <select
                id="activity-select"
                value={selectedActivity}
                onChange={(e) => setSelectedActivity(e.target.value)}
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
              >
                {WORKPLAN_ACTIVITIES.map((act) => (
                  <option key={act.id} value={act.id}>
                    {act.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 bg-brand-navy-dark/45 border border-brand-grey-border/50 rounded-lg text-xs leading-normal">
              <span className="font-semibold text-brand-gold block mb-0.5">Activity Description:</span>
              <p className="text-brand-grey-text">{activeActivity.description}</p>
            </div>

            <hr className="border-brand-grey-border/40" />

            <div>
              <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-wider">
                2. Connect Workspace Data
              </h3>
              <p className="text-[10px] text-brand-grey-text mt-1">
                Attach matrix recommendations and pathways.
              </p>
            </div>

            {/* Pillar Selector */}
            <div className="space-y-1">
              <label htmlFor="pillar-select" className="block text-xs font-semibold text-brand-offwhite">
                Attach Integration Pillar Matrix
              </label>
              <select
                id="pillar-select"
                value={selectedPillarId}
                onChange={(e) => setSelectedPillarId(e.target.value as YPSPillarId)}
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
              >
                <option value="participation">Pillar: Participation</option>
                <option value="protection">Pillar: Protection</option>
                <option value="prevention">Pillar: Prevention</option>
                <option value="partnerships">Pillar: Partnerships</option>
                <option value="disengagement_reintegration">Pillar: Reintegration</option>
              </select>
            </div>

            {/* Risk Pathway Selector */}
            <div className="space-y-1">
              <label htmlFor="pathway-select" className="block text-xs font-semibold text-brand-offwhite">
                Attach Risk Pathway Case
              </label>
              <select
                id="pathway-select"
                value={selectedPathwayId}
                onChange={(e) => setSelectedPathwayId(e.target.value)}
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
              >
                {riskPathways.length === 0 ? (
                  <option value="">No pathways mapped (Use Fallback Template)</option>
                ) : (
                  riskPathways.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.context.slice(0, 32)}...
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Stakeholder Selector */}
            <div className="space-y-1">
              <label htmlFor="stakeholder-select" className="block text-xs font-semibold text-brand-offwhite">
                Attach Key Mapped Stakeholder
              </label>
              <select
                id="stakeholder-select"
                value={selectedStakeholderId}
                onChange={(e) => setSelectedStakeholderId(e.target.value)}
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
              >
                {stakeholders.length === 0 ? (
                  <option value="">No stakeholders mapped (Use Fallback Template)</option>
                ) : (
                  stakeholders.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name.slice(0, 24)}... ({s.actorType.replace('_', ' ')})
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Right Columns: Output Builder tab selector & preview sheet */}
        <div className="lg:col-span-2 space-y-6">
          {/* Source Integrity Panel (Rank 3: CCCPA / DEDI Workplan Target) */}
          <SourceIntegrityPanel sourceId="workplan" />

          {/* Tab Selector Row */}
          <div className="flex flex-wrap gap-1.5 bg-brand-navy-dark/75 border border-brand-grey-border/50 p-1.5 rounded-xl no-print">
            {[
              { id: 'toolkit_section', label: 'Section Draft' },
              { id: 'activity_sheet', label: 'Activity Sheet' },
              { id: 'facilitator_note', label: 'Facilitator Note' },
              { id: 'policy_note', label: 'Policy Note' },
              { id: 'stakeholder_brief', label: 'Consultation Brief' },
              { id: 'validation_checklist', label: 'Checklist' },
              { id: 'complete_package', label: 'Complete Package' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedOutputType(tab.id)}
                type="button"
                className={`text-[10px] font-bold px-3 py-2 rounded-lg cursor-pointer uppercase transition-all tracking-wider ${
                  selectedOutputType === tab.id
                    ? 'bg-brand-gold text-brand-navy-dark shadow-md shadow-brand-gold/15'
                    : 'text-brand-grey-text hover:text-brand-offwhite hover:bg-brand-navy-light/45'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between border-b border-brand-grey-border/40 pb-2 no-print">
            <h3 className="text-sm font-semibold text-brand-offwhite">
              Generated Toolkit Output Package
            </h3>
            <div className="flex items-center gap-2">
              <CopyButton text={compileActiveOutputMarkdown()} label={getCopyButtonLabel()} />
              <button
                onClick={() => window.print()}
                type="button"
                className="px-3 py-1.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark rounded-md text-xs font-semibold cursor-pointer shadow-md shadow-brand-gold/15 flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2zm5-17v2m-6 0h12" />
                </svg>
                <span>Print Toolkit Package</span>
              </button>
            </div>
          </div>

          {/* Styled Sheet Preview Container */}
          <div className="bg-slate-900 border border-brand-gold/45 bg-gradient-to-br from-brand-navy-light/65 to-brand-navy-dark/95 rounded-xl p-8 shadow-xl text-xs text-brand-grey-text space-y-6 print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
            
            {/* Header block inside the sheet */}
            <div className="border-b border-brand-gold pb-4 print:border-black">
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block no-print">
                CCCPA Component 3 Operational Planner
              </span>
              <h2 className="text-base font-bold text-brand-offwhite leading-snug mt-1 print:text-black uppercase">
                {selectedOutputType.replace('_', ' ')}: {activeActivity.name}
              </h2>
              <div className="grid grid-cols-2 gap-4 text-[10px] text-brand-grey-text/75 mt-2 print:text-gray-600">
                <div>Context Area: <span className="text-brand-offwhite print:text-black font-semibold">{contextName}</span></div>
                <div>Status: <span className="text-brand-gold font-semibold">Ready for Regional Validation</span></div>
              </div>
            </div>

            {/* Content Switcher */}
            {selectedOutputType === 'toolkit_section' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">1. Tool Purpose & Scope</h4>
                  <p className="leading-relaxed">Provides a practical method to operationalize youth integration within regional climate stabilization, focusing on the <strong>{pillarDetails.name}</strong> pillar.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">2. When to Use</h4>
                  <p className="leading-relaxed">Use during project formulation, joint stabilization mapping, or intergenerational consultations in borderland zones.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">3. Key YCPS Issue in Play</h4>
                  <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-1 print:bg-transparent print:border-none">
                    <p><strong>Climate Stress:</strong> {activePathway.hazard}</p>
                    <p><strong>Capacity Constraint:</strong> {activePathway.capacityConstraint}</p>
                    <p><strong>Vulnerability Context:</strong> {activePathway.vulnerability}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">4. Practical Entry Points</h4>
                  <p className="leading-relaxed text-brand-gold print:text-black font-medium">{pillarDetails.practicalEntryPoint}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">5. Step-by-Step Instructions</h4>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li><strong>Mapping:</strong> Chart transhumance corridors and seasonal grazing ranges relative to changing water resources.</li>
                    <li><strong>Engagement:</strong> Convene local youth cooperatives and traditional elders to co-design resource scheduling.</li>
                    <li><strong>Formalization:</strong> Formally integrate youth delegates into local coordination commissions.</li>
                  </ol>
                </div>
                <div className="space-y-1.5 font-medium">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">6. Who Should Validate This</h4>
                  <p className="leading-relaxed">Must be validated with: <strong>{activeStakeholder.name}</strong>, traditional borderlands councils, and Ministry technicians.</p>
                </div>
              </div>
            )}

            {selectedOutputType === 'activity_sheet' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">1. Activity Title</h4>
                  <p className="leading-relaxed">Scenario-Based Dialogue on <strong>{pillarDetails.name}</strong> in {contextName}</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 bg-brand-navy-light/10 p-3 border border-brand-grey-border/20 rounded print:bg-transparent print:border-none">
                  <div>
                    <span className="font-bold text-brand-offwhite print:text-black block text-[10px]">TIME REQUIRED:</span>
                    <span>90 Minutes</span>
                  </div>
                  <div>
                    <span className="font-bold text-brand-offwhite print:text-black block text-[10px]">MATERIALS NEEDED:</span>
                    <span>Resource maps, GPS trackers, checklists</span>
                  </div>
                  <div>
                    <span className="font-bold text-brand-offwhite print:text-black block text-[10px]">TARGET PARTICIPANTS:</span>
                    <span>Youth, traditional elders, officials</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">2. Step-by-Step Guide</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Setup (20 mins):</strong> Present the climate-security pathway: {activePathway.hazard}.</li>
                    <li><strong>Split (30 mins):</strong> Form mixed groups (youth + elders) representing grazing cooperatives and councils.</li>
                    <li><strong>Negotiation (30 mins):</strong> Draft mutual water-sharing rotas based on stakeholder interests: {activeStakeholder.interest}.</li>
                    <li><strong>Diplomatic Check (10 mins):</strong> Audit the recommendations for non-securitized wording.</li>
                  </ul>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">3. Group Task</h4>
                  <p className="leading-relaxed font-semibold text-brand-gold print:text-black">{activePathway.youthOpportunity}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">4. Output Template</h4>
                  <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-1">
                    <p><strong>Suggested Action:</strong> {pillarDetails.suggestedAction}</p>
                    <p><strong>M&E Indicator:</strong> {pillarDetails.indicator}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">5. Facilitator Cautions & Safeguards</h4>
                  <p className="text-red-400 print:text-red-800">⚠️ {pillarDetails.redTeamWarning}</p>
                </div>
              </div>
            )}

            {selectedOutputType === 'facilitator_note' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">1. Session Framing & Guidelines</h4>
                  <p className="leading-relaxed">Frame young people as active agents of resilience, innovation, prevention, and peacebuilding rather than passive victims or risks. Avoid taking sides in clan-based water disputes. Strictly respect the mentorship role of traditional elders.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">2. Youth Protection Considerations</h4>
                  <p className="text-red-400 print:text-red-800">⚠️ {pillarDetails.redTeamWarning}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">3. Safety Protocols</h4>
                  <p className="leading-relaxed">Establish clear guidelines: discussions must focus on water flow and resource access rather than sovereign borders, armed factions, or national politics.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">4. Avoiding Wording Overclaims</h4>
                  <p className="leading-relaxed">Instruct facilitators to challenge statements claiming climate change directly causes local conflict. Keep focus on compounding risks: {activePathway.capacityConstraint}.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">5. Audience Adaptation</h4>
                  <p className="leading-relaxed">For policymakers, emphasize technical indicators (<em>{pillarDetails.indicator}</em>). For youth, focus on physical access and safety.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">6. Follow-up and Validation</h4>
                  <p className="leading-relaxed">Liaise with ministry technical desks and traditional councils to schedule validation hearings. Key reviewer: <strong>{activeStakeholder.name}</strong>.</p>
                </div>
              </div>
            )}

            {selectedOutputType === 'policy_note' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">1. Context Summary</h4>
                  <p className="leading-relaxed">Briefing note for <strong>{contextName}</strong> regarding integrating YPS and CPS dynamics in stabilizing borderland zones.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">2. Risk Pathway Mapping</h4>
                  <p className="leading-relaxed">Climate hazard (<em>{activePathway.hazard}</em>) combined with capacity constraint (<em>{activePathway.capacityConstraint}</em>) impacts community ranges, creating conflict pathways.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">3. Youth Agency Entry Point</h4>
                  <p className="leading-relaxed text-brand-green font-medium">{activePathway.youthOpportunity}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">4. Proposed Stabilization Action</h4>
                  <p className="leading-relaxed font-semibold text-brand-gold print:text-black">{pillarDetails.suggestedAction}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">5. M&E Indicator</h4>
                  <p className="leading-relaxed font-mono bg-brand-navy-dark/45 p-2 rounded border border-brand-grey-border/30">{pillarDetails.indicator}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">6. Risks & Safeguards</h4>
                  <p className="text-red-400 print:text-red-800">⚠️ {pillarDetails.redTeamWarning}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">7. Evidence Gaps & Validation</h4>
                  <p className="leading-relaxed">{activePathway.evidenceGaps} — Mapped stakeholder <strong>{activeStakeholder.name}</strong> will validate prior to draft consolidation.</p>
                </div>
              </div>
            )}

            {selectedOutputType === 'stakeholder_brief' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">1. Consultation Objective</h4>
                  <p className="leading-relaxed">Coordinate YCPS activities and align with stakeholder interests: <strong>{activeStakeholder.interest}</strong>.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">2. Youth Safeguards</h4>
                  <p className="leading-relaxed">Verify that youth delegates are free to speak without fear of political backlash or elder reprimand. Risks: <em>{activeStakeholder.risks}</em>.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">3. Key Consultation Questions</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>What interest does <strong>{activeStakeholder.name}</strong> have in local resource sharing?</li>
                    <li>How can we support youth agency without creating friction with traditional structures?</li>
                    <li>What are the primary protection risks for young people operating water kiosks?</li>
                  </ul>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">4. Expected Outputs & Feedback</h4>
                  <p className="leading-relaxed">Stakeholder influence map and monthly joint feedback sessions to adjust resource rotas based on seasonal rainfall changes.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">5. Sensitive Issues to Manage</h4>
                  <p className="leading-relaxed">Land ownership claims and transhumance security routes. Wording restrictions: <em>{activeStakeholder.diplomaticSensitivity}</em>.</p>
                </div>
              </div>
            )}

            {selectedOutputType === 'validation_checklist' && (
              <div className="space-y-4">
                <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">Validation Checklist</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Source Grounding', desc: 'Grounded in CCCPA / DEDI YCPS source-of-truth guidelines.' },
                    { label: 'Context-Specific Evidence', desc: `Built on context-specific climate evidence (${activePathway.hazard.slice(0, 40)}...) rather than generic assumptions.` },
                    { label: 'Youth Agency', desc: 'Frames young people as active agents of resilience, innovation, and mediation.' },
                    { label: 'Meaningful Participation', desc: 'Emphasizes real consultation rather than symbolic tokenism.' },
                    { label: 'Participation/Protection Link', desc: `Integrates specific physical protection safeguards (${pillarDetails.redTeamWarning.slice(0, 40)}...) for youth.` },
                    { label: 'Prevention/Resilience Link', desc: 'Connects prevention activities directly to eco-agricultural or green livelihoods.' },
                    { label: 'Gender and Inclusion', desc: 'Incorporates gender-sensitive and inclusive selection parameters.' },
                    { label: 'Forced Displacement', desc: 'Addresses displacement or migration route dynamics where relevant.' },
                    { label: 'National Ownership', desc: 'Respects sovereign boundaries, local ownership, and institutional mandates.' },
                    { label: 'Diplomatic Wording', desc: 'Utilizes careful, constructive diplomatic language.' },
                    { label: 'Avoidance of Youth Securitization', desc: 'Ensures youth are not framed as security combat risks or military assets.' },
                    { label: 'Avoidance of Causal Overclaiming', desc: 'Does not overstate climate-conflict causality.' },
                    { label: 'Stakeholder Validation', desc: `Mapped stakeholders (${activeStakeholder.name.slice(0, 40)}...) validated for local influence and interests.` },
                    { label: 'Follow-Up Mechanism', desc: 'Follow-up validation hearings scheduled with local traditional councils.' },
                    { label: 'Workplan Relevance', desc: `Mapped output satisfies Component 3 targets: ${activeActivity.name.slice(0, 40)}...` }
                  ].map((chk, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={!!checkedChecks[idx]}
                        onChange={() => handleToggleCheck(idx)}
                        className="mt-1 h-3.5 w-3.5 text-brand-gold bg-transparent border border-brand-grey-border rounded cursor-pointer"
                      />
                      <div>
                        <span className="font-bold text-brand-offwhite print:text-black block text-[11px]">{chk.label}</span>
                        <span className="text-[10px] text-brand-grey-text">{chk.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedOutputType === 'complete_package' && (
              <div className="space-y-6 divide-y divide-brand-grey-border/30">
                <div className="space-y-2">
                  <h3 className="font-bold text-brand-gold uppercase tracking-widest block text-[13px]">SECTION 1: TOOLKIT SECTION DRAFT</h3>
                  <p><strong>Purpose:</strong> Operationalize youth integration in regional climate stabilization under the {pillarDetails.name} pillar.</p>
                  <p><strong>Climate Stress:</strong> {activePathway.hazard}</p>
                  <p><strong>Practical Entry Point:</strong> {pillarDetails.practicalEntryPoint}</p>
                </div>
                <div className="space-y-2 pt-4">
                  <h3 className="font-bold text-brand-gold uppercase tracking-widest block text-[13px]">SECTION 2: PRACTICAL ACTIVITY SHEET</h3>
                  <p><strong>Title:</strong> Scenario-Based Dialogue on {pillarDetails.name} in {contextName}</p>
                  <p><strong>Instructions:</strong> Split youth/elders, negotiate shared rotas, audit recommendations.</p>
                  <p><strong>Suggested Action:</strong> {pillarDetails.suggestedAction}</p>
                </div>
                <div className="space-y-2 pt-4">
                  <h3 className="font-bold text-brand-gold uppercase tracking-widest block text-[13px]">SECTION 3: FACILITATOR GUIDE NOTE</h3>
                  <p>Frame youth as active agents of resilience. Respect the mentorship role of traditional elders. Establish clear rules to avoid political, national, or military details. Avoid climate-conflict causal overclaiming.</p>
                </div>
                <div className="space-y-2 pt-4">
                  <h3 className="font-bold text-brand-gold uppercase tracking-widest block text-[13px]">SECTION 4: POLICY / PROGRAMMING NOTE</h3>
                  <p><strong>Context:</strong> {contextName}</p>
                  <p><strong>Opportunity:</strong> {activePathway.youthOpportunity}</p>
                  <p><strong>Action Recommendation:</strong> {pillarDetails.suggestedAction}</p>
                  <p><strong>Indicator:</strong> {pillarDetails.indicator}</p>
                </div>
                <div className="space-y-2 pt-4">
                  <h3 className="font-bold text-brand-gold uppercase tracking-widest block text-[13px]">SECTION 5: STAKEHOLDER CONSULTATION BRIEF</h3>
                  <p><strong>Target Stakeholder:</strong> {activeStakeholder.name}</p>
                  <p><strong>Objective:</strong> Coordinate YCPS and align with stakeholder interests ({activeStakeholder.interest}).</p>
                </div>
                <div className="space-y-2 pt-4">
                  <h3 className="font-bold text-brand-gold uppercase tracking-widest block text-[13px]">SECTION 6: VALIDATION CHECKLIST</h3>
                  <p className="italic">Standard validation checklist includes checking source grounding, climate evidence context, youth agency framing, national ownership, and avoiding causal overclaiming.</p>
                </div>
              </div>
            )}

            {/* Standardized Footer Disclaimer */}
            <div className="border-t border-brand-grey-border/40 pt-4 text-[9px] text-brand-grey-text/80 leading-relaxed print:text-gray-500">
              <span className="font-bold text-brand-gold print:text-black">Disclaimer:</span> Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, mandate language, country context, and institutional guidance before use.
            </div>
          </div>
        </div>

      </div>

      {/* Next-Step Actions Section */}
      <div className="glass-panel p-6 rounded-xl border border-brand-grey-border/60 space-y-4 no-print mt-6">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-gold" />
          <h3 className="text-sm font-semibold text-brand-offwhite uppercase tracking-wider">
            Next-Step Validation & Refinement Workflow
          </h3>
        </div>
        <p className="text-xs text-brand-grey-text leading-relaxed">
          After generating a toolkit output, copy or print the draft, then validate it through the Red-Team Review and refine language through the Diplomatic Language Assistant.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <Link
            href="/review"
            className="flex-1 px-4 py-2.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-bold rounded-lg text-xs tracking-wider uppercase text-center transition-all cursor-pointer shadow-md shadow-brand-gold/15"
          >
            Review Output
          </Link>
          <Link
            href="/language"
            className="flex-1 px-4 py-2.5 bg-brand-navy-light hover:bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border rounded-lg text-xs font-bold tracking-wider uppercase text-center transition-all cursor-pointer"
          >
            Refine Wording
          </Link>
          <Link
            href="/training"
            className="flex-1 px-4 py-2.5 border border-brand-grey-border hover:bg-brand-navy-light text-brand-grey-text hover:text-brand-offwhite rounded-lg text-xs font-bold tracking-wider uppercase text-center transition-all cursor-pointer"
          >
            Build Training Session
          </Link>
        </div>
      </div>
    </div>
  );
}
