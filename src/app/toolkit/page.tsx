'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { WORKPLAN_ACTIVITIES } from '@/lib/sourceTruth';
import { CopyButton } from '@/components/CopyButton';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { YPSPillarId } from '@/types';

export default function WorkplanToolkitPage() {
  const { matrixEntries, riskPathways, stakeholders, contextName } = useApp();

  // Selected Options for Mapping
  const [selectedActivity, setSelectedActivity] = useState<string>(WORKPLAN_ACTIVITIES[0].id);
  const [selectedPillarId, setSelectedPillarId] = useState<YPSPillarId>('participation');
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>('');
  const [selectedStakeholderId, setSelectedStakeholderId] = useState<string>('');

  const activeActivity = WORKPLAN_ACTIVITIES.find((a) => a.id === selectedActivity) || WORKPLAN_ACTIVITIES[0];



  const selectedPillar = matrixEntries[selectedPillarId];
  const selectedPathway = riskPathways.find((p) => p.id === selectedPathwayId) || riskPathways[0];
  const selectedStakeholder = stakeholders.find((s) => s.id === selectedStakeholderId) || stakeholders[0];

  // Helper to compile a markdown plan for copying
  const compileSessionPlanMarkdown = () => {
    let md = `# DRAFT WORKSHOP SESSION PLAN: ${activeActivity.name.toUpperCase()}\n\n`;
    md += `**Context Environment:** ${contextName}\n`;
    md += `**Activity Scope:** ${activeActivity.description}\n`;
    md += `*Mapped via YCPS Toolkit Lab Activity Connector*\n\n`;
    md += `---\n\n`;

    md += `## 1. Session Objectives & Outputs\n`;
    md += `- **Objectives:** Design conflict-sensitive, youth-inclusive programming aligned with ${activeActivity.name}.\n`;
    md += `- **Target Outputs:**\n`;
    activeActivity.outputs.forEach((out) => {
      md += `  * ${out}\n`;
    });
    md += `\n`;

    md += `## 2. Selected Climate-Security Pathway (Causal Context)\n`;
    if (selectedPathway) {
      md += `Using causal dynamics from the **${selectedPathway.context}** case:\n`;
      md += `- **Stressor & Hazard:** ${selectedPathway.hazard}\n`;
      md += `- **Institutional capacity constraint:** ${selectedPathway.capacityConstraint || 'None detailed'}\n`;
      md += `- **Youth-led opportunity:** ${selectedPathway.youthOpportunity || 'Not specified'}\n`;
      md += `- **Evidence rating:** ${selectedPathway.evidenceStrength}\n\n`;
    } else {
      md += `*No causal pathways attached. Please select one from the dropdown.*\n\n`;
    }

    md += `## 3. Targeted Actor Integration\n`;
    if (selectedStakeholder) {
      md += `Engaging primary stakeholder **${selectedStakeholder.name}**:\n`;
      md += `- **Actor Type:** ${selectedStakeholder.actorType.replace('_', ' ')}\n`;
      md += `- **Recorded Interest / Mandate:** ${selectedStakeholder.interest}\n`;
      md += `- **Recorded Engagement Risks:** ${selectedStakeholder.risks || 'None recorded'}\n`;
      md += `- **Recommended Strategy:** ${selectedStakeholder.engagementStrategy || 'Not specified'}\n\n`;
    } else {
      md += `*No primary actors attached. Please select one from the dropdown.*\n\n`;
    }

    md += `## 4. Pillar Mappings & Suggested Action\n`;
    const pillarName = selectedPillarId.charAt(0).toUpperCase() + selectedPillarId.slice(1).replace('_', ' ');
    md += `### Pillar Focus: ${pillarName}\n`;
    md += `- **Climate-Security Aspect:** ${selectedPillar.climateSecurityConsideration || 'None entered'}\n`;
    md += `- **Youth Role & Agency:** ${selectedPillar.youthRoleAgency || 'None entered'}\n`;
    md += `- **Practical Action (Suggested Draft):** ${selectedPillar.suggestedAction || 'None detailed'}\n`;
    md += `- **Indicator:** ${selectedPillar.indicator || 'None detailed'}\n\n`;

    md += `## 5. Diplomatic Compliance & Red-Teaming\n`;
    md += `- **Suggested Draft Wording:** *"${selectedPillar.diplomaticWording || 'To be validated: no draft wording entered.'}"*\n`;
    if (selectedPillar.redTeamWarning) {
      md += `- **Red-Team Warning:** ⚠️ ${selectedPillar.redTeamWarning}\n\n`;
    }

    md += `## 6. Training Methodology (CCCPA CPS Manual)\n`;
    md += `- **Simulations:** Build a scenario-based exercise modeled after the Pokuland framework.\n`;
    md += `- **Facilitator Note:** Focus on intergenerational dialogue, pairing youth mediators with traditional elders to validate local water-sharing agreements.\n\n`;
    
    md += `---\n`;
    md += `*Disclaimer: Prototype support tool. Not official advice. Validate all session plans against official mandates and context-specific evidence.*`;

    return md;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-grey-border/60 pb-5 no-print">
        <div>
          <h1 className="text-2xl font-bold text-brand-offwhite">
            Activity & Workplan Connector
          </h1>
          <p className="text-xs text-brand-grey-text mt-1">
            Map matrix recommendations, causal risk pathways, and stakeholder mapping directly to the CCCPA/DEDI Component 3 Workplan activities.
          </p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-lg bg-brand-navy-light border border-brand-grey-border font-medium text-brand-gold self-start">
          Context: {contextName}
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
                  <option value="">No risk pathways mapped in workspace</option>
                ) : (
                  riskPathways.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.context} ({p.hazard.slice(0, 20)}...)
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
                  <option value="">No stakeholders mapped in workspace</option>
                ) : (
                  stakeholders.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.actorType.replace('_', ' ')})
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Right Columns: Workshop Session Plan Output */}
        <div className="lg:col-span-2 space-y-6">
          {/* Source Integrity Panel (Rank 3: CCCPA / DEDI Workplan Target) */}
          <SourceIntegrityPanel sourceId="workplan" />

          {/* Action Row */}
          <div className="flex items-center justify-between border-b border-brand-grey-border/40 pb-2 no-print">
            <h3 className="text-sm font-semibold text-brand-offwhite">
              Generated Workshop Session Plan
            </h3>
            <div className="flex items-center gap-2">
              <CopyButton text={compileSessionPlanMarkdown()} label="Copy Plan" />
              <button
                onClick={() => window.print()}
                type="button"
                className="px-3 py-1.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark rounded-md text-xs font-semibold cursor-pointer shadow-md shadow-brand-gold/15 flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2zm5-17v2m-6 0h12" />
                </svg>
                <span>Print Plan</span>
              </button>
            </div>
          </div>

          {/* Styled Session Paper Sheet */}
          <div className="bg-slate-900 border border-brand-grey-border rounded-xl p-8 shadow-xl text-xs text-brand-grey-text space-y-6 print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
            {/* Plan Header */}
            <div className="border-b border-brand-gold pb-4 print:border-black">
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block no-print">
                CCCPA Component 3 Operational Planner
              </span>
              <h2 className="text-base font-bold text-brand-offwhite leading-snug mt-1 print:text-black">
                DRAFT WORKSHOP SESSION PLAN: {activeActivity.name.toUpperCase()}
              </h2>
              <div className="grid grid-cols-2 gap-4 text-[10px] text-brand-grey-text/75 mt-2 print:text-gray-600">
                <div>Context: <span className="text-brand-offwhite print:text-black font-semibold">{contextName}</span></div>
                <div>Status: <span className="text-brand-gold font-semibold">Active Operational Draft</span></div>
              </div>
            </div>

            {/* Section 1: Objectives */}
            <div className="space-y-2">
              <h3 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">
                1. Session Objectives & Target Outputs
              </h3>
              <p>
                The objective of this session is to design conflict-sensitive, youth-inclusive programming. With reference to the Egypt–Denmark partnership framework, this draft targets the following deliverables:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                {activeActivity.outputs.map((out, idx) => (
                  <li key={idx}>
                    <span className="font-semibold text-brand-offwhite print:text-black">{out}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 2: Attached Risk Pathway */}
            <div className="space-y-2">
              <h3 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">
                2. Attached Climate-Security Pathway
              </h3>
              {selectedPathway ? (
                <div className="bg-brand-navy-light/25 border border-brand-grey-border/30 p-3.5 rounded-lg space-y-2 print:bg-gray-100 print:border-gray-300">
                  <p><span className="font-semibold text-brand-offwhite print:text-black">Causal context case:</span> {selectedPathway.context}</p>
                  <p><span className="font-semibold text-brand-offwhite print:text-black">Climate hazard/stressor:</span> {selectedPathway.hazard}</p>
                  {selectedPathway.capacityConstraint && <p><span className="font-semibold text-brand-offwhite print:text-black">Institutional capacity constraint:</span> {selectedPathway.capacityConstraint}</p>}
                  <p className="text-brand-green font-medium"><span className="font-semibold text-brand-offwhite print:text-black">Youth-led opportunity (Agency):</span> {selectedPathway.youthOpportunity}</p>
                </div>
              ) : (
                <p className="italic">No Risk Pathway case attached from workspace.</p>
              )}
            </div>

            {/* Section 3: Targeted Actors */}
            <div className="space-y-2">
              <h3 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">
                3. Targeted Actor Integration
              </h3>
              {selectedStakeholder ? (
                <div className="bg-brand-navy-light/25 border border-brand-grey-border/30 p-3.5 rounded-lg space-y-2 print:bg-gray-100 print:border-gray-300">
                  <p><span className="font-semibold text-brand-offwhite print:text-black">Primary stakeholder:</span> {selectedStakeholder.name} ({selectedStakeholder.actorType.replace('_', ' ')})</p>
                  <p><span className="font-semibold text-brand-offwhite print:text-black">Recorded interest / mandate:</span> {selectedStakeholder.interest}</p>
                  <p><span className="font-semibold text-brand-offwhite print:text-black">Recorded engagement risks:</span> {selectedStakeholder.risks || 'No risks recorded'}</p>
                  <p><span className="font-semibold text-brand-offwhite print:text-black">Engagement strategy:</span> {selectedStakeholder.engagementStrategy}</p>
                </div>
              ) : (
                <p className="italic">No Stakeholder profile attached from workspace.</p>
              )}
            </div>

            {/* Section 4: Pillar Integration */}
            <div className="space-y-2">
              <h3 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">
                4. Integration Actions & Indicators
              </h3>
              <div className="bg-brand-navy-light/25 border border-brand-grey-border/30 p-3.5 rounded-lg space-y-2 print:bg-gray-100 print:border-gray-300">
                <p><span className="font-semibold text-brand-offwhite print:text-black">Attached YPS Pillar:</span> {selectedPillarId.charAt(0).toUpperCase() + selectedPillarId.slice(1).replace('_', ' ')}</p>
                <p><span className="font-semibold text-brand-offwhite print:text-black">Practical entry point:</span> {selectedPillar.practicalEntryPoint || 'Not detailed'}</p>
                <p className="font-medium text-brand-gold print:text-black"><span className="font-semibold text-brand-offwhite print:text-black">Suggested Action (Suggested Draft):</span> {selectedPillar.suggestedAction || 'Not detailed'}</p>
                <p><span className="font-semibold text-brand-offwhite print:text-black">M&E Indicator:</span> {selectedPillar.indicator || 'Not detailed'}</p>
              </div>
            </div>

            {/* Section 5: Compliance and Warnings */}
            <div className="space-y-2">
              <h3 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">
                5. Diplomatic Compliance & Red-Teaming
              </h3>
              <div className="bg-brand-navy-light/25 border border-brand-grey-border/30 p-3.5 rounded-lg space-y-2 print:bg-gray-100 print:border-gray-300">
                <p><span className="font-semibold text-brand-offwhite print:text-black">Suggested draft wording:</span> &ldquo;<span className="text-brand-gold print:text-black italic">{selectedPillar.diplomaticWording || 'To be validated: no draft wording entered.'}</span>&rdquo;</p>
                {selectedPillar.redTeamWarning && (
                  <p className="text-red-400 print:text-red-800"><span className="font-semibold text-brand-offwhite print:text-black">Red-Team Warning:</span> ⚠️ {selectedPillar.redTeamWarning}</p>
                )}
              </div>
            </div>

            {/* Section 6: Training Methodology */}
            <div className="space-y-2">
              <h3 className="font-bold text-brand-offwhite uppercase tracking-wider print:text-black">
                6. Facilitator Notes (CCCPA CPS Manual methodology)
              </h3>
              <div className="p-3 bg-brand-navy-dark/65 border border-brand-grey-border/40 rounded text-[11px] leading-relaxed text-brand-gold print:bg-gray-100 print:text-black print:border-gray-300">
                <span className="font-semibold block mb-1">🎮 Scenario-Based Simulation Guideline:</span>
                Facilitators should run a Pokuland-style borderland dispute exercise. Split participants into representatives of agropastoral youth cooperatives and traditional elders. Tasks: Negotiate a mutual water pan sharing agreement and map a joint early-warning system. Avoid securitizing water access or depicting youth as combat risks.
              </div>
            </div>

            {/* Footer Disclaimer */}
            <div className="mt-8 pt-4 border-t border-brand-grey-border/40 text-[9px] text-brand-grey-text/80 print:text-gray-500">
              Prototype support tool. Not official advice. Prepared with reference to the DEDI Project Document 2024–2028; validate all outputs before field use.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
