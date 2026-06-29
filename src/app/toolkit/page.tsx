'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { WORKPLAN_ACTIVITIES } from '@/lib/sourceTruth';
import { CopyButton } from '@/components/CopyButton';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { YPSPillarId } from '@/types';
import Link from 'next/link';
import { WorkflowStrip } from '@/components/WorkflowStrip';
import { getPrintContextLabel, printWithDocumentTitle } from '@/lib/printUtils';

const VALIDATION_CHECKLIST_ITEMS = [
  'Source grounding checked',
  'Context-specific evidence reviewed',
  'Climate-security pathway avoids automatic causality',
  'Youth agency is visible',
  'Meaningful participation is defined',
  'Participation/protection risks assessed',
  'Gender and inclusion considered',
  'National ownership language reviewed',
  'Diplomatic wording screened',
  'Youth securitization avoided',
  'Stakeholder validation actors identified',
  'Follow-up mechanism included'
] as const;

export default function WorkplanToolkitPage() {
  const { matrixEntries, riskPathways, stakeholders, contextName, loadScenario } = useApp();

  // Selected Options for Mapping
  const [selectedActivity, setSelectedActivity] = useState<string>(WORKPLAN_ACTIVITIES[0].id);
  const [selectedPillarId, setSelectedPillarId] = useState<YPSPillarId>('participation');
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>('');
  const [selectedStakeholderId, setSelectedStakeholderId] = useState<string>('');
  const [selectedOutputType, setSelectedOutputType] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('tab') || params.get('outputType') || 'toolkit_section';
    }
    return 'toolkit_section';
  });

  // Interactive Validation Checklist state
  const [checkedChecks, setCheckedChecks] = useState<Record<number, boolean>>({});

  const handleToggleCheck = (idx: number) => {
    setCheckedChecks((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handlePrint = () => {
    let titlePrefix = "YCPS Toolkit Output";
    switch (selectedOutputType) {
      case 'toolkit_section':
        titlePrefix = "YCPS Toolkit Tool Sheet";
        break;
      case 'activity_sheet':
        titlePrefix = "YCPS Activity Sheet";
        break;
      case 'facilitator_note':
        titlePrefix = "YCPS Facilitator Guide";
        break;
      case 'policy_note':
        titlePrefix = "YCPS Policy Note";
        break;
      case 'stakeholder_brief':
        titlePrefix = "YCPS Consultation Brief";
        break;
      case 'validation_checklist':
        titlePrefix = "YCPS Validation Checklist";
        break;
      case 'complete_package':
        titlePrefix = "YCPS Complete Toolkit Package";
        break;
    }
    printWithDocumentTitle(`${titlePrefix} - ${getPrintContextLabel(contextName)}`);
  };

  const activeActivity = WORKPLAN_ACTIVITIES.find((a) => a.id === selectedActivity) || WORKPLAN_ACTIVITIES[0];

  // Predefined Fallback Template Data (CARANA Fictional Scenario)
  const activePillar = matrixEntries[selectedPillarId];
  
  const activePathway = riskPathways.find((p) => p.id === selectedPathwayId) || riskPathways[0] || {
    id: 'fallback-pathway',
    context: 'Template fallback: CARANA fictional training scenario — replace with validated local data before use.',
    hazard: 'Erratic rainfall and drying of the Carana River corridor.',
    exposure: 'Shared agropastoral water wells and river banks.',
    vulnerability: 'Lack of shared management protocols, historical grazing disputes, and low livelihood alternatives.',
    capacityConstraint: 'No transboundary water coordination treaties between regional Upper/Lower CARANA administrations.',
    pathwayType: 'resource_competition',
    youthImpact: 'Youth pastoralists may face increased risks of localized incidents at drying river beds during transit.',
    youthOpportunity: 'Convene joint youth early-warning councils and radio networks.',
    intervention: 'Support coordination points and youth participation in locally validated land-use dialogue.',
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
    let md = `# YCPS TOOLKIT SECTION DRAFT (TOOL SHEET)\n`;
    md += `**Linked Activity:** ${activeActivity.name}\n`;
    md += `**Source Grounding:** CCCPA Guidebook on CPS Programming & DEDI Workplan\n`;
    md += `**Context Scenario:** ${contextName}\n`;
    md += `**Status:** Draft for Review and Contextual Validation\n\n`;
    md += `## 1. PURPOSE\n`;
    md += `Provides a practical method to operationalize youth integration in climate, peace and security programming, focusing on the ${pillarDetails.name} pillar.\n\n`;
    md += `## 2. WHEN TO USE\n`;
    md += `Use during project formulation, joint local planning, or intergenerational consultations in borderland zones.\n\n`;
    md += `## 3. WHO SHOULD USE IT\n`;
    md += `Policy planners, local administrators, peacebuilding practitioners, and youth community organizers.\n\n`;
    md += `## 4. KEY YCPS ISSUE IN PLAY\n`;
    md += `- **Climate Stress:** ${activePathway.hazard}\n`;
    md += `- **Capacity Constraint:** ${activePathway.capacityConstraint}\n`;
    md += `- **Vulnerability Context:** ${activePathway.vulnerability}\n\n`;
    md += `## 5. PRACTICAL ENTRY POINTS\n`;
    md += `${pillarDetails.practicalEntryPoint}\n\n`;
    md += `## 6. STEP-BY-STEP USE INSTRUCTIONS\n`;
    md += `1. **Mapping:** Chart transhumance corridors, local grazing areas, and water points relative to seasonal trends.\n`;
    md += `2. **Engagement:** Convene local youth cooperatives, pastoralist leaders, and traditional elders to co-design resource-sharing schedules.\n`;
    md += `3. **Formalization:** Formally integrate youth representatives into local coordination committees and planning tables.\n\n`;
    md += `## 7. EXPECTED USER OUTPUT\n`;
    md += `A youth-inclusive natural resource sharing draft, localized indicators, and a community validation timeline.\n\n`;
    md += `## 8. PARTICIPATION & PROTECTION SAFEGUARDS\n`;
    md += `Ensure young participants have a safe environment to express priorities without fear of elder or political backlash. Avoid framing youth primarily as risks or potential threats. Protection warning: ${pillarDetails.redTeamWarning}\n\n`;
    md += `## 9. VALIDATION ACTORS\n`;
    md += `Must be validated with: ${activeStakeholder.name}, traditional borderlands councils, local administrators, and Ministry technical desks.\n\n`;
    md += `## 10. MINI REVIEW CHECKLIST\n`;
    md += `- [ ] Grounded in CCCPA / DEDI YCPS source-of-truth guidelines.\n`;
    md += `- [ ] Built on context-specific climate evidence rather than generic assumptions.\n`;
    md += `- [ ] Frames young people as active agents of resilience and peace.\n`;
    md += `- [ ] Avoids deterministic climate-conflict causality claims.\n\n`;
    md += `---\n`;
    md += `*Disclaimer: Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, country context, and institutional guidance before use.*`;
    return md;
  };

  const getActivitySheetMarkdown = () => {
    let md = `# PRACTICAL YCPS ACTIVITY SHEET\n`;
    md += `**Activity Title:** Scenario-Based Dialogue on ${pillarDetails.name} in ${contextName}\n`;
    md += `**Linked Activity:** ${activeActivity.name}\n`;
    md += `**Status:** Draft for Review and Contextual Validation\n\n`;
    md += `## 1. PURPOSE & LEARNING OBJECTIVE\n`;
    md += `To operationalize local youth engagement inside climate, peace and security programming. Participants learn to analyze climate-security pathways and co-design resource coordination plans.\n\n`;
    md += `## 2. TIME, PARTICIPANTS & MATERIALS\n`;
    md += `- **Time Required:** 90 Minutes\n`;
    md += `- **Target Participants:** Youth representatives, traditional elders, local planners\n`;
    md += `- **Materials Needed:** Resource mapping templates, scenario cards, and wording review cards\n\n`;
    md += `## 3. STEP-BY-STEP INSTRUCTIONS\n`;
    md += `1. **Setup (20 mins):** Present the climate-security pathway: ${activePathway.hazard}.\n`;
    md += `2. **Split (30 mins):** Form mixed teams of youth and elders representing grazing cooperatives and councils.\n`;
    md += `3. **Negotiation (30 mins):** Draft mutual resource-sharing schedules based on stakeholder interests: ${activeStakeholder.interest}.\n`;
    md += `4. **Diplomatic Check (10 mins):** Audit the recommendations for constructive, non-securitized wording.\n\n`;
    md += `## 4. GROUP TASK\n`;
    md += `Draft a joint resource-sharing agreement addressing the pathway: ${activePathway.youthOpportunity}.\n\n`;
    md += `## 5. EXPECTED PARTICIPANT OUTPUT\n`;
    md += `- **Suggested Action Plan:** ${pillarDetails.suggestedAction}\n`;
    md += `- **M&E Indicator:** ${pillarDetails.indicator}\n\n`;
    md += `## 6. DEBRIEF QUESTIONS\n`;
    md += `1. How does the suggested action plan address the capacity constraint of local institutions?\n`;
    md += `2. What measures will support meaningful, non-tokenistic youth participation in resource sharing?\n\n`;
    md += `## 7. FACILITATOR CAUTIONS & SAFEGUARDS\n`;
    md += `⚠️ **Safeguard Warning:** ${pillarDetails.redTeamWarning}\n\n`;
    md += `## 8. VALIDATION NOTE\n`;
    md += `This activity plan is a training draft. Validate outputs with ${activeStakeholder.name} and traditional councils prior to consolidation.\n\n`;
    md += `---\n`;
    md += `*Disclaimer: Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, mandate language, country context, and institutional guidance before use.*`;
    return md;
  };

  const getFacilitatorGuideMarkdown = () => {
    let md = `# YCPS FACILITATOR GUIDE NOTE\n`;
    md += `**Subject:** Facilitating ${pillarDetails.name} in climate, peace and security programming contexts\n`;
    md += `**Linked Activity:** ${activeActivity.name}\n`;
    md += `**Status:** Draft for Review and Contextual Validation\n\n`;
    md += `## 1. SESSION FRAMING\n`;
    md += `Frame young people as active agents of resilience, innovation, prevention, and peacebuilding rather than passive victims or risks. Avoid taking sides in clan-based water disputes. Strictly respect the mentorship role of traditional elders.\n\n`;
    md += `## 2. AUDIENCE ADAPTATION\n`;
    md += `- **For Policymakers:** Emphasize technical indicators: ${pillarDetails.indicator}.\n`;
    md += `- **For Local Youth:** Focus on practical coordination steps and personal safety.\n\n`;
    md += `## 3. SENSITIVE ISSUES TO WATCH\n`;
    md += `Avoid taking sides in clan-based resource access disputes. Maintain an impartial, conflict-sensitive facilitation approach.\n\n`;
    md += `## 4. YOUTH PARTICIPATION & PROTECTION\n`;
    md += `Ensure young women are included in all panels and that travel paths to validation hearings are physically secure. Safeguard: ${pillarDetails.redTeamWarning}.\n\n`;
    md += `## 5. DISCUSSION SAFETY PROTOCOLS\n`;
    md += `Establish clear guidelines: discussions should focus on resource access, institutional coordination, and validated local evidence rather than politically exposed or operational details.\n\n`;
    md += `## 6. AVOIDING OVERCLAIMING\n`;
    md += `Instruct facilitators to challenge statements claiming climate change directly causes local conflict. Keep focus on compounding risks and capacity constraints: ${activePathway.capacityConstraint}.\n\n`;
    md += `## 7. DOCUMENTING OUTPUTS\n`;
    md += `Record draft agreements in writing with youth and community delegates. Document shared resource points using participatory mapping templates.\n\n`;
    md += `## 8. FOLLOW-UP & VALIDATION ACTORS\n`;
    md += `Liaise with ministry technical desks and traditional councils to schedule validation hearings. Key reviewer: ${activeStakeholder.name}.\n\n`;
    md += `---\n`;
    md += `*Disclaimer: Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, country context, and institutional guidance before use.*`;
    return md;
  };

  const getPolicyNoteMarkdown = () => {
    let md = `# YCPS POLICY / PROGRAMMING NOTE\n`;
    md += `**Context:** Draft support tool briefing note for ${contextName}\n`;
    md += `**Linked Activity:** ${activeActivity.name}\n`;
    md += `**Status:** Draft for Review and Contextual Validation\n\n`;
    md += `## 1. CONTEXT SUMMARY\n`;
    md += `Context environment: ${contextName}. Analysis focuses on integrating YPS and CPS priorities through conflict-sensitive programming.\n\n`;
    md += `## 2. PROBLEM STATEMENT\n`;
    md += `Climate-related changes may compound agropastoral resource pressures where institutional, livelihood, mobility, and service constraints are present, with differentiated implications for young people.\n\n`;
    md += `## 3. CLIMATE-RELATED RISK PATHWAY\n`;
    md += `The climate-related stressor (${activePathway.hazard}) may interact with the capacity constraint (${activePathway.capacityConstraint}) and contribute to context-specific risks that require validation.\n\n`;
    md += `## 4. YOUTH AGENCY & PARTICIPATION ENTRY POINT\n`;
    md += `Youth act via: ${activePathway.youthOpportunity}.\n\n`;
    md += `## 5. STAKEHOLDER COORDINATION NEED\n`;
    md += `Requires close coordination with: ${activeStakeholder.name} to leverage their influence and prevent duplicative efforts.\n\n`;
    md += `## 6. PROPOSED ACTION\n`;
    md += `${pillarDetails.suggestedAction}\n\n`;
    md += `## 7. M&E INDICATOR\n`;
    md += `${pillarDetails.indicator}\n\n`;
    md += `## 8. EVIDENCE GAPS\n`;
    md += `${activePathway.evidenceGaps}\n\n`;
    md += `## 9. SAFEGUARDS\n`;
    md += `⚠️ **Safeguard Warning:** ${pillarDetails.redTeamWarning}\n\n`;
    md += `## 10. VALIDATION ACTORS\n`;
    md += `Validate recommendations with traditional authorities, youth leagues, and technical desks prior to drafting final policy briefs.\n\n`;
    md += `## 11. NEXT STEP\n`;
    md += `Translate this policy note into localized consultation sessions and coordinate with Ministry desks.\n\n`;
    md += `---\n`;
    md += `*Disclaimer: Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, mandate language, country context, and institutional guidance before use.*`;
    return md;
  };

  const getStakeholderBriefMarkdown = () => {
    let md = `# STAKEHOLDER CONSULTATION BRIEF\n`;
    md += `**Objective:** Ensure local buy-in and coordinate YCPS activities across layers.\n`;
    md += `**Target Stakeholder:** ${activeStakeholder.name}\n`;
    md += `**Linked Activity:** ${activeActivity.name}\n`;
    md += `**Status:** Draft for Review and Contextual Validation\n\n`;
    md += `## 1. CONSULTATION OBJECTIVE\n`;
    md += `Coordinate YCPS activities and align with stakeholder interests: ${activeStakeholder.interest}.\n\n`;
    md += `## 2. WHO SHOULD PARTICIPATE\n`;
    md += `Ministry representatives, traditional elders, agropastoral youth unions, and agropastoral cooperatives.\n\n`;
    md += `## 3. YOUTH PARTICIPATION SAFEGUARDS\n`;
    md += `Verify that youth delegates are free to express priorities without fear of political backlash or elder reprimand. Safeguard: ${activeStakeholder.risks || 'None recorded'}.\n\n`;
    md += `## 4. KEY DISCUSSION QUESTIONS\n`;
    md += `1. What interest does ${activeStakeholder.name} have in local resource sharing?\n`;
    md += `2. How can we support youth agency without creating friction with traditional structures?\n`;
    md += `3. What are the primary protection risks for young people participating in local resource coordination activities?\n\n`;
    md += `## 5. SENSITIVE ISSUES\n`;
    md += `Land ownership claims and mobility and access patterns. Wording restrictions: ${activeStakeholder.diplomaticSensitivity}.\n\n`;
    md += `## 6. EXPECTED OUTPUTS\n`;
    md += `A mapped stakeholder influence matrix and signed coordination memorandum.\n\n`;
    md += `## 7. FEEDBACK MECHANISM\n`;
    md += `Convene monthly joint feedback sessions to adjust resource rotas based on seasonal changes.\n\n`;
    md += `## 8. FOLLOW-UP PLAN & VALIDATION\n`;
    md += `Liaise with ministry technical desks to review suggested agreements and coordinate validation hearings. Validate with: ${activeStakeholder.name}.\n\n`;
    md += `---\n`;
    md += `*Disclaimer: Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, country context, and institutional guidance before use.*`;
    return md;
  };

  const getValidationChecklistMarkdown = () => {
    let md = `# YCPS VALIDATION CHECKLIST\n`;
    md += `**Subject:** Validation checklist for ${activeActivity.name}\n`;
    md += `**Status:** Draft for Review and Contextual Validation\n\n`;
    
    VALIDATION_CHECKLIST_ITEMS.forEach((item) => {
      md += `☐ ${item}\n`;
    });

    md += `\n**Validation Note:** Checklist completion supports review preparation only. It does not equal institutional validation.\n\n`;
    md += `---\n`;
    md += `*Disclaimer: Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, country context, and institutional guidance before use.*`;
    return md;
  };

  const getCompletePackageMarkdown = () => {
    let md = `# 1. COVER / SUMMARY BLOCK\n`;
    md += `**Output:** Complete YCPS Toolkit Output Package\n`;
    md += `**Context:** ${contextName}\n`;
    md += `**Linked Activity:** ${activeActivity.name}\n`;
    md += `**YCPS Pillar:** ${pillarDetails.name}\n`;
    md += `**Status:** Draft for Review and Contextual Validation\n`;
    md += `**Date Generated:** ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}\n`;
    if (/carana/i.test(contextName)) md += `**Scenario Note:** CARANA is a fictional training scenario.\n`;

    md += `\n## 2. EXECUTIVE SUMMARY\n`;
    md += `This package links the ${pillarDetails.name} pillar with a context-specific risk pathway, stakeholder coordination, practical programming options, and review safeguards. Climate-related stressors are treated as interacting with institutional, livelihood, mobility, and service pressures rather than as automatic causes of conflict.\n`;

    md += `\n## 3. CONTEXT SUMMARY\n`;
    md += `- Climate-related stressor: ${activePathway.hazard}\n`;
    md += `- Exposure: ${activePathway.exposure}\n`;
    md += `- Vulnerability factors: ${activePathway.vulnerability}\n`;
    md += `- National ownership: Align any adapted action with relevant national frameworks, local priorities, and institutional mandates.\n`;

    md += `\n## 4. YCPS MATRIX RECOMMENDATION\n`;
    md += `- Youth agency: ${pillarDetails.youthRoleAgency || 'Under review'}\n`;
    md += `- Practical entry point: ${pillarDetails.practicalEntryPoint || 'Under review'}\n`;
    md += `- Suggested action: ${pillarDetails.suggestedAction || 'Under review'}\n`;
    md += `- Indicator: ${pillarDetails.indicator || 'Under review'}\n`;

    md += `\n## 5. CLIMATE-SECURITY RISK PATHWAY NOTE\n`;
    md += `- Risk relationship: ${activePathway.hazard} may interact with ${activePathway.capacityConstraint}.\n`;
    md += `- Youth implications: ${activePathway.youthImpact}\n`;
    md += `- Youth-led opportunity: ${activePathway.youthOpportunity}\n`;
    md += `- Evidence gap: ${activePathway.evidenceGaps}\n`;

    md += `\n## 6. STAKEHOLDER COORDINATION STRATEGY\n`;
    md += `- Stakeholder: ${activeStakeholder.name}\n`;
    md += `- Interest: ${activeStakeholder.interest}\n`;
    md += `- Engagement approach: ${activeStakeholder.engagementStrategy}\n`;
    md += `- Safeguard: ${activeStakeholder.risks || 'Support safe, inclusive, and meaningful participation.'}\n`;

    md += `\n## 7. TOOLKIT TOOL SHEET\n`;
    md += `Review evidence; identify youth agency and protection considerations; co-design an action; assign an indicator, validation actors, and follow-up.\n`;

    md += `\n## 8. PRACTICAL ACTIVITY SHEET\n`;
    md += `- Activity: Scenario-Based Dialogue on ${pillarDetails.name} in ${contextName}\n`;
    md += `- Materials: Resource mapping templates, scenario cards, and wording review cards\n`;
    md += `- Group task: ${activePathway.youthOpportunity}\n`;

    md += `\n## 9. TRAINER'S GUIDE NOTE\n`;
    md += `Keep participation voluntary, youth agency visible, feedback channels safe, evidence gaps explicit, and climate-conflict language cautious.\n`;

    md += `\n## 10. POLICY / PROGRAMMING NOTE\n`;
    md += `- Proposed action: ${pillarDetails.suggestedAction}\n`;
    md += `- Indicator: ${pillarDetails.indicator}\n`;
    md += `- Evidence to validate: ${activePathway.evidenceGaps}\n`;

    md += `\n## 11. STAKEHOLDER CONSULTATION BRIEF\n`;
    md += `Review the proposed action with ${activeStakeholder.name} against local priorities, protection considerations, and institutional mandates. Record comments, assigned actions, and a follow-up date.\n`;

    md += `\n## 12. VALIDATION CHECKLIST\n`;
    VALIDATION_CHECKLIST_ITEMS.forEach((item) => { md += `☐ ${item}\n`; });
    md += `\nChecklist completion supports review preparation only. It does not equal institutional validation.\n`;

    md += `\n## 13. RED-TEAM SCREENING SUMMARY\n`;
    md += `Automated structural and wording screening supports review preparation; it is not a readiness certification. Human review remains required.\n`;

    md += `\n## 14. DIPLOMATIC LANGUAGE SCREENING NOTE\n`;
    md += `Review wording for unsupported climate-conflict causality, youth securitization, government-blaming claims, external-imposition language, and overstatement.\n`;

    md += `\n## 15. FINAL VALIDATION DISCLAIMER\n`;
    md += `Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, mandate language, country context, and institutional guidance before use.\n`;
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
        return 'Copy Toolkit Tool Sheet';
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

  const getPrintButtonLabel = () => {
    switch (selectedOutputType) {
      case 'toolkit_section':
        return 'Print Toolkit Tool Sheet';
      case 'activity_sheet':
        return 'Print Activity Sheet';
      case 'facilitator_note':
        return 'Print Facilitator Guide';
      case 'policy_note':
        return 'Print Policy Note';
      case 'stakeholder_brief':
        return 'Print Consultation Brief';
      case 'validation_checklist':
        return 'Print Validation Checklist';
      case 'complete_package':
      default:
        return 'Print Complete Package';
    }
  };

  const isFinalizeTab = selectedOutputType === 'complete_package';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Workflow Strip */}
      <WorkflowStrip currentStep={isFinalizeTab ? 'finalize' : 'draft'} />

      {/* This step produces box */}
      <div className="glass-panel p-4 rounded-xl border border-brand-gold/25 bg-gradient-to-r from-brand-navy-light/40 to-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs no-print">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block">📋 This Step Produces:</span>
          {isFinalizeTab ? (
            <p className="text-brand-grey-text">
              <strong>Task:</strong> Compile, print, and export the consolidated YCPS toolkit package. <br />
              <strong>Deliverable:</strong> Consolidated print-ready YCPS guidance package including red-team and language logs.
            </p>
          ) : (
            <p className="text-brand-grey-text">
              <strong>Task:</strong> Assemble workspace mappings into formatted training guidelines, policy notes, and briefs. <br />
              <strong>Deliverable:</strong> Toolkit section drafts, activity sheets, policy notes, consultation briefs, and validation checklists.
            </p>
          )}
        </div>
        {isFinalizeTab ? (
          <Link
            href="/workflow"
            className="shrink-0 px-4 py-2 bg-brand-navy-light hover:bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border rounded-lg text-xs font-bold uppercase tracking-wider text-center transition-all cursor-pointer"
          >
            ← View Workflow Dashboard
          </Link>
        ) : (
          <Link
            href="/review"
            className="shrink-0 px-4 py-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-bold rounded-lg text-xs uppercase tracking-wider text-center transition-all cursor-pointer"
          >
            Next: Run Red-Team Review →
          </Link>
        )}
      </div>

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
              { id: 'complete_package', label: '📦 Complete Package' }
            ].map((tab) => {
              const isCompletePkg = tab.id === 'complete_package';
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedOutputType(tab.id)}
                  type="button"
                  className={`text-[10px] font-bold px-3 py-2 rounded-lg cursor-pointer uppercase transition-all tracking-wider ${
                    selectedOutputType === tab.id
                      ? isCompletePkg
                        ? 'bg-gradient-to-r from-brand-gold to-yellow-500 text-brand-navy-dark shadow-md shadow-brand-gold/30 scale-105 border border-brand-gold'
                        : 'bg-brand-gold text-brand-navy-dark shadow-md shadow-brand-gold/15'
                      : isCompletePkg
                      ? 'text-brand-gold border border-brand-gold/40 hover:bg-brand-navy-light/45 hover:border-brand-gold'
                      : 'text-brand-grey-text hover:text-brand-offwhite hover:bg-brand-navy-light/45'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-grey-border/40 pb-2 gap-2 no-print">
            <div>
              <h3 className="text-sm font-semibold text-brand-offwhite">
                Generated Toolkit Output Package
              </h3>
              <p className="text-[10px] text-brand-grey-text mt-0.5">
                For a clean PDF: choose <strong>Save as PDF</strong> and turn <strong>Headers and footers Off</strong> in the print dialog.
              </p>
              <p className="text-[9px] text-brand-grey-text/80 mt-0.5">Background graphics: On · Margins: Default or None, based on preview</p>
            </div>
            <div className="flex items-center gap-2">
              <CopyButton text={compileActiveOutputMarkdown()} label={getCopyButtonLabel()} />
              <button
                onClick={handlePrint}
                type="button"
                className="px-3 py-1.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark rounded-md text-xs font-semibold cursor-pointer shadow-md shadow-brand-gold/15 flex items-center gap-1 shrink-0"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2zm5-17v2m-6 0h12" />
                </svg>
                <span>{getPrintButtonLabel()}</span>
              </button>
            </div>
          </div>

          {/* Styled Sheet Preview Container */}
          <div className="bg-slate-900 border border-brand-gold/45 bg-gradient-to-br from-brand-navy-light/65 to-brand-navy-dark/95 rounded-xl p-8 shadow-xl text-xs text-brand-grey-text space-y-6 print:bg-white print:text-black print:border-none print:shadow-none print:p-0 print-document">
            
            {/* Print Header (Visible only on print) */}
            <div className="hidden print:block border-b-2 border-black pb-4 mb-6 text-black">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-lg font-bold tracking-tight">YCPS TOOLKIT LAB</h1>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                    Draft Support Annex • Africa
                  </p>
                </div>
                <div className="text-right text-[9px] text-gray-500">
                  <div>Generated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  <div>ID: YCPS-ANNEX-{activeActivity.id.toUpperCase()}</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                <div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase block">Output Type</span>
                  <span className="font-bold text-black uppercase">{selectedOutputType.replace(/_/g, ' ')}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase block">Linked Activity</span>
                  <span className="font-semibold text-black">{activeActivity.name}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase block">Scenario / Context</span>
                  <span className="font-semibold text-black">{contextName}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase block">Status</span>
                  <span className="font-bold text-gray-800">Draft for Review and Contextual Validation</span>
                </div>
              </div>
              {/carana/i.test(contextName) && (
                <p className="mt-3 text-[9px] font-semibold text-gray-700">CARANA is a fictional training scenario. Replace scenario assumptions with validated local evidence before use.</p>
              )}
            </div>

            {/* Screen Header block inside the sheet (Hidden on print) */}
            <div className="border-b border-brand-gold pb-4 print:hidden">
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block">
                Prototype planner aligned with Component 3
              </span>
              <h2 className="text-base font-bold text-brand-offwhite leading-snug mt-1 uppercase">
                {selectedOutputType.replace('_', ' ')}: {activeActivity.name}
              </h2>
              <div className="grid grid-cols-2 gap-4 text-[10px] text-brand-grey-text/75 mt-2">
                <div>Context Area: <span className="text-brand-offwhite font-semibold">{contextName}</span></div>
                <div>Status: <span className="text-brand-gold font-semibold">Draft for Review and Contextual Validation</span></div>
              </div>
            </div>

            {/* Content Switcher */}
            {selectedOutputType === 'toolkit_section' && (
              <div className="space-y-4 text-brand-grey-text print:text-black">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">1. Purpose</h4>
                  <p className="leading-relaxed">Provides a practical method to operationalize youth integration in climate, peace and security programming, focusing on the <strong>{pillarDetails.name}</strong> pillar.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">2. When to Use</h4>
                  <p className="leading-relaxed">Use during project formulation, joint local planning, or intergenerational consultations in borderland zones.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">3. Who Should Use This</h4>
                  <p className="leading-relaxed">Policy planners, local administrators, peacebuilding practitioners, and youth community organizers.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">4. Key YCPS Issue</h4>
                  <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-1 print:bg-transparent print:border-none print:p-0">
                    <p><strong>Climate Stressor:</strong> {activePathway.hazard}</p>
                    <p><strong>Institutional / Capacity Constraint:</strong> {activePathway.capacityConstraint}</p>
                    <p><strong>Vulnerability Context:</strong> {activePathway.vulnerability}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">5. Practical Entry Points</h4>
                  <p className="leading-relaxed text-brand-gold print:text-black font-semibold">{pillarDetails.practicalEntryPoint}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">6. Step-by-Step Instructions</h4>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li><strong>Mapping:</strong> Chart transhumance corridors, local grazing areas, and water points relative to seasonal trends.</li>
                    <li><strong>Engagement:</strong> Convene local youth cooperatives, pastoralist leaders, and traditional elders to co-design resource-sharing schedules.</li>
                    <li><strong>Formalization:</strong> Formally integrate youth representatives into local coordination committees and planning tables.</li>
                  </ol>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">7. Expected User Output</h4>
                  <p className="leading-relaxed">A youth-inclusive natural resource sharing draft, localized indicators, and a community validation timeline.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">8. Participation and Protection Safeguards</h4>
                  <p className="text-red-400 print:text-red-800 font-semibold">⚠️ {pillarDetails.redTeamWarning}</p>
                  <p className="text-[11px] leading-relaxed mt-1">Support a safe environment where young participants can express priorities without fear of elder or political backlash. Avoid framing youth primarily as risks or potential threats.</p>
                </div>
                <div className="space-y-1.5 font-medium">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">9. Validation Actors</h4>
                  <p className="leading-relaxed">Must be validated with: <strong>{activeStakeholder.name}</strong>, traditional borderlands councils, local administrators, and Ministry technical desks.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">10. Mini Review Checklist</h4>
                  <ul className="list-disc pl-5 space-y-1 text-[11px]">
                    <li>Grounded in CCCPA / DEDI YCPS source-of-truth guidelines.</li>
                    <li>Built on context-specific climate evidence rather than generic assumptions.</li>
                    <li>Frames young people as active agents of resilience and peace.</li>
                    <li>Avoids deterministic climate-conflict causality claims.</li>
                  </ul>
                </div>
              </div>
            )}

            {selectedOutputType === 'activity_sheet' && (
              <div className="space-y-4 text-brand-grey-text print:text-black">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">1. Activity Title</h4>
                  <p className="leading-relaxed">Scenario-Based Dialogue on <strong>{pillarDetails.name}</strong> in {contextName}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">2. Purpose & Learning Objective</h4>
                  <p className="leading-relaxed">To operationalize local youth engagement inside climate, peace and security programming. Participants learn to analyze climate-security pathways and co-design resource coordination plans.</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 bg-brand-navy-light/10 p-3 border border-brand-grey-border/20 rounded print:bg-transparent print:border-none print:p-0">
                  <div>
                    <span className="font-bold text-brand-offwhite print:text-black block text-[10px]">TIME REQUIRED:</span>
                    <span>90 Minutes</span>
                  </div>
                  <div>
                    <span className="font-bold text-brand-offwhite print:text-black block text-[10px]">MATERIALS NEEDED:</span>
                    <span>Resource mapping templates, scenario cards, and wording review cards</span>
                  </div>
                  <div>
                    <span className="font-bold text-brand-offwhite print:text-black block text-[10px]">TARGET PARTICIPANTS:</span>
                    <span>Youth representatives, traditional elders, local planners</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">3. Step-by-Step Instructions</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Setup (20 mins):</strong> Present the climate-security pathway: {activePathway.hazard}.</li>
                    <li><strong>Split (30 mins):</strong> Form mixed teams of youth and elders representing grazing cooperatives and councils.</li>
                    <li><strong>Negotiation (30 mins):</strong> Draft mutual resource-sharing schedules based on stakeholder interests: {activeStakeholder.interest}.</li>
                    <li><strong>Diplomatic Check (10 mins):</strong> Audit the recommendations for constructive, non-securitized wording.</li>
                  </ul>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">4. Group Task</h4>
                  <p className="leading-relaxed font-semibold text-brand-gold print:text-black">{activePathway.youthOpportunity}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">5. Expected Participant Output</h4>
                  <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-1 print:bg-transparent print:border-none print:p-0">
                    <p><strong>Suggested Action Plan:</strong> {pillarDetails.suggestedAction}</p>
                    <p><strong>M&E Indicator:</strong> {pillarDetails.indicator}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">6. Debrief Questions</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>How does the suggested action plan address the capacity constraint of local institutions?</li>
                    <li>What measures will support meaningful, non-tokenistic youth participation in resource sharing?</li>
                  </ul>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">7. Facilitator Cautions & Safeguards</h4>
                  <p className="text-red-400 print:text-red-800">⚠️ {pillarDetails.redTeamWarning}</p>
                </div>
                <div className="space-y-1.5 font-medium">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">8. Validation Note</h4>
                  <p className="leading-relaxed">This activity plan is a training draft. Validate outputs with <strong>{activeStakeholder.name}</strong> and traditional councils prior to consolidation.</p>
                </div>
              </div>
            )}

            {selectedOutputType === 'facilitator_note' && (
              <div className="space-y-4 text-brand-grey-text print:text-black">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">1. Session Framing & Guidelines</h4>
                  <p className="leading-relaxed">Frame young people as active agents of resilience, innovation, prevention, and peacebuilding rather than passive victims or risks. Avoid taking sides in clan-based water disputes. Strictly respect the mentorship role of traditional elders.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">2. Audience Adaptation</h4>
                  <p className="leading-relaxed">For policymakers, emphasize technical indicators (<em>{pillarDetails.indicator}</em>). For youth, focus on physical access and safety.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">3. Sensitive Issues to Manage</h4>
                  <p className="leading-relaxed">Land ownership claims and mobility and access patterns. Wording restrictions: <em>{activeStakeholder.diplomaticSensitivity}</em>.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">4. Participation & Protection Safeguards</h4>
                  <p className="text-red-400 print:text-red-800">⚠️ {pillarDetails.redTeamWarning}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">5. How to Manage Discussion Safely</h4>
                  <p className="leading-relaxed">Establish clear guidelines: discussions should focus on resource access, institutional coordination, and validated local evidence rather than politically exposed or operational details.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">6. How to Avoid Climate-Conflict Simplification</h4>
                  <p className="leading-relaxed">Instruct facilitators to challenge statements claiming climate change directly causes local conflict. Keep focus on compounding risks: {activePathway.capacityConstraint}.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">7. Documentation of Outputs</h4>
                  <p className="leading-relaxed">Compile suggested action: <em>{pillarDetails.suggestedAction}</em> and track indicators in the community dashboard.</p>
                </div>
                <div className="space-y-1.5 font-medium">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">8. Follow-up and Validation</h4>
                  <p className="leading-relaxed">Liaise with ministry technical desks and traditional councils to schedule validation hearings. Key reviewer: <strong>{activeStakeholder.name}</strong>.</p>
                </div>
              </div>
            )}

            {selectedOutputType === 'policy_note' && (
              <div className="space-y-4 text-brand-grey-text print:text-black">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">1. Context Summary</h4>
                  <p className="leading-relaxed">Briefing note for <strong>{contextName}</strong> on integrating YPS and CPS priorities through conflict-sensitive programming.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">2. Problem Statement</h4>
                  <p className="leading-relaxed">Climate-related changes may compound agropastoral resource pressures where institutional, livelihood, mobility, and service constraints are present, with differentiated implications for young people.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">3. Climate-Related Risk Pathway</h4>
                  <p className="leading-relaxed">The climate-related stressor (<em>{activePathway.hazard}</em>) may interact with the capacity constraint (<em>{activePathway.capacityConstraint}</em>) and contribute to context-specific risks that require validation.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">4. Youth Agency & Participation Entry Point</h4>
                  <p className="leading-relaxed text-brand-green font-medium">{activePathway.youthOpportunity}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">5. Stakeholder Coordination Need</h4>
                  <p className="leading-relaxed">Requires close coordination with: <strong>{activeStakeholder.name}</strong> to leverage their influence and prevent duplicative efforts.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">6. Proposed Action</h4>
                  <p className="leading-relaxed font-semibold text-brand-gold print:text-black">{pillarDetails.suggestedAction}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">7. M&E Indicator</h4>
                  <p className="leading-relaxed font-mono bg-brand-navy-dark/45 p-2 rounded border border-brand-grey-border/30 print:bg-transparent print:border-none print:p-0">{pillarDetails.indicator}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">8. Evidence Gaps</h4>
                  <p className="leading-relaxed">{activePathway.evidenceGaps}</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">9. Safeguards</h4>
                  <p className="text-red-400 print:text-red-800">⚠️ {pillarDetails.redTeamWarning}</p>
                </div>
                <div className="space-y-1.5 font-medium">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">10. Validation Actors</h4>
                  <p className="leading-relaxed">Validate recommendations with traditional authorities, youth leagues, and technical desks prior to drafting final policy briefs.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">11. Next Step</h4>
                  <p className="leading-relaxed">Translate this policy note into localized consultation sessions and coordinate with Ministry desks.</p>
                </div>
              </div>
            )}

            {selectedOutputType === 'stakeholder_brief' && (
              <div className="space-y-4 text-brand-grey-text print:text-black">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">1. Consultation Objective</h4>
                  <p className="leading-relaxed">Coordinate YCPS activities and align with stakeholder interests: <strong>{activeStakeholder.interest}</strong>.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">2. Who Should Participate</h4>
                  <p className="leading-relaxed">Ministry representatives, traditional elders, agropastoral youth unions, and agropastoral cooperatives.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">3. Youth Participation Safeguards</h4>
                  <p className="leading-relaxed">Verify that youth delegates are free to express priorities without fear of political backlash or elder reprimand. Safeguard warning: <em>{activeStakeholder.risks || 'None recorded'}</em>.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">4. Key Discussion Questions</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>What interest does <strong>{activeStakeholder.name}</strong> have in local resource sharing?</li>
                    <li>How can we support youth agency without creating friction with traditional structures?</li>
                    <li>What are the primary protection risks for young people participating in local resource coordination activities?</li>
                  </ul>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">5. Sensitive Issues</h4>
                  <p className="leading-relaxed">Land ownership claims and mobility and access patterns. Wording restrictions: <em>{activeStakeholder.diplomaticSensitivity}</em>.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">6. Expected Outputs</h4>
                  <p className="leading-relaxed">A mapped stakeholder influence matrix and signed coordination memorandum.</p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">7. Feedback Mechanism</h4>
                  <p className="leading-relaxed">Convene monthly joint feedback sessions to adjust resource rotas based on seasonal changes.</p>
                </div>
                <div className="space-y-1.5 font-medium">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">8. Follow-up Plan</h4>
                  <p className="leading-relaxed">Liaise with ministry technical desks to review suggested agreements and coordinate validation hearings. Validate with: <strong>{activeStakeholder.name}</strong>.</p>
                </div>
              </div>
            )}

            {selectedOutputType === 'validation_checklist' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-brand-grey-border/30 pb-2">
                  <h4 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">Validation Checklist</h4>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-brand-navy-light text-brand-gold border border-brand-gold/30 no-print">
                    Checked {Object.values(checkedChecks).filter(Boolean).length} / 12
                  </span>
                </div>
                <div className="space-y-3 pt-1">
                  {VALIDATION_CHECKLIST_ITEMS.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-brand-grey-text print:text-black">
                      <input
                        type="checkbox"
                        checked={!!checkedChecks[idx]}
                        onChange={() => handleToggleCheck(idx)}
                        className="mt-1 h-3.5 w-3.5 text-brand-gold bg-transparent border border-brand-grey-border rounded cursor-pointer accent-brand-gold focus:ring-0 focus:outline-none no-print"
                      />
                      <span className="hidden print:inline-block shrink-0 mt-0.5 text-xs font-mono mr-1">☐</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-brand-offwhite print:text-black text-[11px]">{item}</span>
                          <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded print:hidden ${!!checkedChecks[idx] ? 'bg-brand-green/20 text-brand-green border border-brand-green/30' : 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'}`}>
                            {!!checkedChecks[idx] ? 'Checked for review' : 'Not yet checked'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-brand-grey-border/30 pt-3 text-[10px] text-brand-gold italic leading-relaxed">
                  * Validation Note: Checklist completion supports review preparation only. It does not equal institutional validation.
                </div>
              </div>
            )}

            {selectedOutputType === 'complete_package' && (
              <div className="complete-package-dossier space-y-6 print:text-black">
                <section className="dossier-cover">
                  <p className="dossier-kicker">1. Cover / Summary Block</p>
                  <h1>Complete YCPS Toolkit Output Package</h1>
                  <p className="dossier-lead">A consolidated draft-support dossier connecting context analysis, youth agency, practical programming options, facilitation materials, and review safeguards.</p>
                  <div className="dossier-meta">
                    <div><strong>Context</strong><span>{contextName}</span></div>
                    <div><strong>Linked activity</strong><span>{activeActivity.name}</span></div>
                    <div><strong>YCPS pillar</strong><span>{pillarDetails.name}</span></div>
                    <div><strong>Status</strong><span>Draft for Review and Contextual Validation</span></div>
                    <div><strong>Date generated</strong><span>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
                    <div><strong>Scenario status</strong><span>{/carana/i.test(contextName) ? 'CARANA - fictional training scenario' : 'Context evidence to be validated'}</span></div>
                  </div>
                  <div className="dossier-box">
                    <h2>2. Executive Summary</h2>
                    <p>The package supports conflict-sensitive climate, peace and security programming by linking the <strong>{pillarDetails.name}</strong> pillar with a context-specific risk pathway, stakeholder coordination, a practical activity, and review safeguards. Climate-related stressors are treated as interacting with institutional, livelihood, mobility, and service pressures rather than as automatic causes of conflict.</p>
                  </div>
                  <div className="dossier-key-output">
                    <strong>Key output</strong>
                    <p>{pillarDetails.suggestedAction || 'Suggested action remains under review.'}</p>
                  </div>
                  <div className="dossier-validation">
                    <strong>Validation required</strong>
                    <p>Review source grounding, local evidence, national ownership, protection, gender and inclusion, stakeholder roles, and diplomatic wording before use.</p>
                  </div>
                </section>

                <div className="dossier-page print-page-break">
                  <section className="dossier-section">
                    <h2>3. Context Summary</h2>
                    <ul>
                      <li><strong>Working context:</strong> {contextName}</li>
                      <li><strong>Climate-related stressor:</strong> {activePathway.hazard}</li>
                      <li><strong>Exposure:</strong> {activePathway.exposure}</li>
                      <li><strong>Vulnerability factors:</strong> {activePathway.vulnerability}</li>
                      <li><strong>National ownership:</strong> Align any adapted action with relevant national frameworks, local priorities, and institutional mandates.</li>
                    </ul>
                  </section>

                  <section className="dossier-section">
                    <h2>4. YCPS Matrix Recommendation</h2>
                    <ul>
                      <li><strong>Climate-security consideration:</strong> {pillarDetails.climateSecurityConsideration || 'Under review'}</li>
                      <li><strong>Youth agency:</strong> {pillarDetails.youthRoleAgency || 'Under review'}</li>
                      <li><strong>Practical entry point:</strong> {pillarDetails.practicalEntryPoint || 'Under review'}</li>
                      <li><strong>Suggested action:</strong> {pillarDetails.suggestedAction || 'Under review'}</li>
                      <li><strong>Indicator:</strong> {pillarDetails.indicator || 'Under review'}</li>
                    </ul>
                  </section>

                  <section className="dossier-section">
                    <h2>5. Climate-Security Risk Pathway Note</h2>
                    <ul>
                      <li><strong>Risk relationship:</strong> {activePathway.hazard} may interact with {activePathway.capacityConstraint}.</li>
                      <li><strong>Youth implications:</strong> {activePathway.youthImpact}</li>
                      <li><strong>Youth-led opportunity:</strong> {activePathway.youthOpportunity}</li>
                      <li><strong>Evidence strength:</strong> {activePathway.evidenceStrength}</li>
                      <li><strong>Evidence gap:</strong> {activePathway.evidenceGaps}</li>
                    </ul>
                  </section>

                  <section className="dossier-section">
                    <h2>6. Stakeholder Coordination Strategy</h2>
                    <ul>
                      <li><strong>Stakeholder:</strong> {activeStakeholder.name}</li>
                      <li><strong>Interest:</strong> {activeStakeholder.interest}</li>
                      <li><strong>Influence:</strong> {activeStakeholder.influence}</li>
                      <li><strong>Engagement approach:</strong> {activeStakeholder.engagementStrategy}</li>
                      <li><strong>Safeguard:</strong> {activeStakeholder.risks || 'Support safe, inclusive, and meaningful participation.'}</li>
                    </ul>
                  </section>
                </div>

                <div className="dossier-page print-page-break">
                  <section className="dossier-section">
                    <h2>7. Toolkit Tool Sheet</h2>
                    <p><strong>Purpose:</strong> Apply the {pillarDetails.name} pillar to a context-specific programming question.</p>
                    <ol>
                      <li>Review the context and available evidence.</li>
                      <li>Identify youth agency, participation, and protection considerations.</li>
                      <li>Co-design a practical action with relevant local and national actors.</li>
                      <li>Assign an indicator, validation actors, and a follow-up mechanism.</li>
                    </ol>
                    <p><strong>Expected output:</strong> A youth-inclusive draft action, indicator, safeguard, and validation plan.</p>
                  </section>

                  <section className="dossier-section">
                    <h2>8. Practical Activity Sheet</h2>
                    <ul>
                      <li><strong>Title:</strong> Scenario-Based Dialogue on {pillarDetails.name} in {contextName}</li>
                      <li><strong>Duration:</strong> 90 minutes</li>
                      <li><strong>Materials:</strong> Resource mapping templates, scenario cards, and wording review cards</li>
                      <li><strong>Group task:</strong> {activePathway.youthOpportunity}</li>
                      <li><strong>Participant output:</strong> {pillarDetails.suggestedAction}</li>
                    </ul>
                  </section>

                  <section className="dossier-section">
                    <h2>9. Trainer&apos;s Guide Note</h2>
                    <ul>
                      <li>Frame young people as agents of resilience, innovation, prevention, and peacebuilding.</li>
                      <li>Keep participation voluntary and establish safe feedback channels.</li>
                      <li>Use validated local data and avoid politically exposed testimony without safeguards.</li>
                      <li>Challenge automatic climate-conflict claims and document evidence gaps.</li>
                    </ul>
                  </section>

                  <section className="dossier-section">
                    <h2>10. Policy / Programming Note</h2>
                    <ul>
                      <li><strong>Programming opportunity:</strong> {activePathway.youthOpportunity}</li>
                      <li><strong>Proposed action:</strong> {pillarDetails.suggestedAction}</li>
                      <li><strong>Indicator:</strong> {pillarDetails.indicator}</li>
                      <li><strong>Evidence to validate:</strong> {activePathway.evidenceGaps}</li>
                    </ul>
                  </section>

                  <section className="dossier-section">
                    <h2>11. Stakeholder Consultation Brief</h2>
                    <ul>
                      <li><strong>Primary consultation actor:</strong> {activeStakeholder.name}</li>
                      <li><strong>Objective:</strong> Review the proposed action against stakeholder interests, local priorities, protection considerations, and institutional mandates.</li>
                      <li><strong>Feedback mechanism:</strong> Document comments, unresolved evidence gaps, assigned actions, and a follow-up date.</li>
                    </ul>
                  </section>
                </div>

                <div className="dossier-closing print-page-break">
                  <section className="dossier-section">
                    <h2>12. Validation Checklist</h2>
                    <ul className="dossier-checklist">
                      {VALIDATION_CHECKLIST_ITEMS.map((item) => <li key={item}>☐ {item}</li>)}
                    </ul>
                    <p className="dossier-note">Checklist completion supports review preparation only. It does not equal institutional validation.</p>
                  </section>

                  <section className="dossier-section">
                    <h2>13. Red-Team Screening Summary</h2>
                    <ul>
                      <li>Automated structural and wording screening supports review preparation; it is not a readiness certification.</li>
                      <li>Youth agency, participation and protection, national ownership, evidence gaps, and non-securitized framing require human confirmation.</li>
                      <li>Outstanding concerns should be recorded as actions with named reviewers and dates.</li>
                    </ul>
                  </section>

                  <section className="dossier-section">
                    <h2>14. Diplomatic Language Screening Note</h2>
                    <p>Review wording for unsupported climate-conflict causality, youth securitization, government-blaming claims, external-imposition language, and overstatement. Suggested wording remains draft language and should be checked against the relevant national and institutional context.</p>
                  </section>

                  <section className="dossier-final-disclaimer">
                    <h2>15. Final Validation Disclaimer</h2>
                    <p>Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, mandate language, country context, and institutional guidance before use.</p>
                    {/carana/i.test(contextName) && <p><strong>Scenario note:</strong> CARANA is fictional and is intended only for training and prototype testing.</p>}
                  </section>
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
