'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { YPSPillarId, MatrixEntry } from '@/types';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { CopyButton } from '@/components/CopyButton';

export default function MatrixPage() {
  const { matrixEntries, updateMatrixEntry, contextName } = useApp();
  const [activePillar, setActivePillar] = useState<YPSPillarId>('participation');

  const pillars: { id: YPSPillarId; name: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'participation',
      name: 'Participation',
      desc: 'Active inclusion of youth in governance and resource decisions.',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: 'protection',
      name: 'Protection',
      desc: 'Ensuring physical safety, GBV reduction, and human rights.',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 'prevention',
      name: 'Prevention',
      desc: 'Addressing context-specific risk factors, prevention priorities, and livelihood pressures.',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      id: 'partnerships',
      name: 'Partnerships',
      desc: 'Collaborations with national agencies, regional bodies, and CSOs.',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
    {
      id: 'disengagement_reintegration',
      name: 'Disengagement & Reintegration',
      desc: 'Supporting demobilization and green economic return options.',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      )
    }
  ];

  const entry = matrixEntries[activePillar];

  const handleFieldChange = (fieldName: keyof MatrixEntry, val: string) => {
    updateMatrixEntry(activePillar, { [fieldName]: val });
  };

  const getPillarHelperText = (pillarId: YPSPillarId) => {
    switch (pillarId) {
      case 'participation':
        return {
          do: 'Emphasize formal, legal and community-based inclusion in planning committees.',
          dont: 'Do not treat youth participation as a checklist or tokenistic focus group.'
        };
      case 'protection':
        return {
          do: 'Highlight structural dangers like distance to water points, heat, and physical harassment.',
          dont: 'Avoid describing youth solely as helpless victims without protection capabilities.'
        };
      case 'prevention':
        return {
          do: 'Highlight how green livelihoods and locally appropriate technologies can strengthen resilience and prevention.',
          dont: 'Avoid treating poverty or environmental stress as a direct trigger for violence. Describe the context-specific conditions and evidence.'
        };
      case 'partnerships':
        return {
          do: 'Frame partnerships around regional bodies (LCBC, IGAD) and national ownership structures.',
          dont: 'Do not imply international organizations bypass local sovereign government channels.'
        };
      case 'disengagement_reintegration':
        return {
          do: 'Focus on green community work where returnees co-rehabilitate soils alongside locals.',
          dont: 'Avoid giving returnees special payouts or privileges that cause local jealousy.'
        };
    }
  };

  const helperText = getPillarHelperText(activePillar);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-grey-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-brand-offwhite">
            CPS × YPS Integration Matrix
          </h1>
          <p className="text-xs text-brand-grey-text mt-1">
            Analyze and map Climate, Peace and Security (CPS) considerations across the five pillars of Youth, Peace and Security (YPS).
          </p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-lg bg-brand-navy-light border border-brand-grey-border font-medium text-brand-gold self-start">
          Context: {contextName}
        </div>
      </div>

      {/* Two-Way Framework Guidance Note */}
      <div className="glass-panel p-4 rounded-xl border border-brand-gold/15 bg-brand-navy-light/25 text-xs text-brand-grey-text space-y-2">
        <span className="text-[10px] font-bold text-brand-gold tracking-widest uppercase block">
          Candidate Methodology: Two-Way YCPS Integration Framework
        </span>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <span className="font-semibold text-brand-offwhite block mb-0.5">1. CPS considerations across YPS pillars:</span>
            Map how climate degradation, pasture drying, and salinity compound local protection and livelihood pressures inside YPS pillars.
          </div>
          <div>
            <span className="font-semibold text-brand-offwhite block mb-0.5">2. Youth agency strengthening climate responses:</span>
            Highlight how youth participation, innovation, and leadership can build climate-resilient mediation and peace infrastructure.
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column: Pillar Tabs & Form Inputs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Pillar Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {pillars.map((p) => {
              const active = p.id === activePillar;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePillar(p.id)}
                  type="button"
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    active
                      ? 'bg-brand-navy-light text-brand-gold border border-brand-gold/30 shadow-md'
                      : 'bg-brand-navy-light/35 text-brand-grey-text border border-brand-grey-border/30 hover:text-brand-offwhite hover:border-brand-grey-border'
                  }`}
                >
                  {p.icon}
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>

          {/* Form Container */}
          <div className="glass-panel p-6 rounded-xl border border-brand-grey-border/60 space-y-6">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="text-sm font-semibold text-brand-gold uppercase tracking-wider flex items-center gap-1.5">
                  Pillar Analysis: {pillars.find((p) => p.id === activePillar)?.name}
                </h2>
                <p className="text-xs text-brand-grey-text mt-1">
                  {pillars.find((p) => p.id === activePillar)?.desc}
                </p>
              </div>
            </div>

            <hr className="border-brand-grey-border/40" />

            {/* SECTION: User Working Notes */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider">
                  User Working Notes (Context Mappings)
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-5">
                {/* Climate-Security Consideration */}
                <div className="space-y-1.5">
                  <label htmlFor="climate-sec-textarea" className="block text-xs font-semibold text-brand-offwhite">
                    Climate-Security Consideration
                  </label>
                  <textarea
                    id="climate-sec-textarea"
                    value={entry.climateSecurityConsideration}
                    onChange={(e) => handleFieldChange('climateSecurityConsideration', e.target.value)}
                    placeholder="E.g., Land degradation may compound livelihood pressures and contribute to mobility-related tensions under specific conditions..."
                    rows={3}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2.5 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Youth Role / Agency */}
                <div className="space-y-1.5">
                  <label htmlFor="youth-agency-textarea" className="block text-xs font-semibold text-brand-offwhite">
                    Youth Role / Agency
                  </label>
                  <textarea
                    id="youth-agency-textarea"
                    value={entry.youthRoleAgency}
                    onChange={(e) => handleFieldChange('youthRoleAgency', e.target.value)}
                    placeholder="E.g., Youth establish community early warning water panels..."
                    rows={3}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2.5 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Protection Concern */}
                <div className="space-y-1.5">
                  <label htmlFor="protection-concern-textarea" className="block text-xs font-semibold text-brand-offwhite">
                    Protection Concern
                  </label>
                  <textarea
                    id="protection-concern-textarea"
                    value={entry.protectionConcern}
                    onChange={(e) => handleFieldChange('protectionConcern', e.target.value)}
                    placeholder="E.g., Backlash from traditional elders or threat of militia attack..."
                    rows={3}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2.5 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Practical Entry Point */}
                <div className="space-y-1.5">
                  <label htmlFor="practical-entry-textarea" className="block text-xs font-semibold text-brand-offwhite">
                    Practical Entry Point
                  </label>
                  <textarea
                    id="practical-entry-textarea"
                    value={entry.practicalEntryPoint}
                    onChange={(e) => handleFieldChange('practicalEntryPoint', e.target.value)}
                    placeholder="E.g., Embed youth representatives on municipal water boards..."
                    rows={3}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2.5 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Suggested Action */}
                <div className="space-y-1.5">
                  <label htmlFor="suggested-action-textarea" className="block text-xs font-semibold text-brand-offwhite">
                    Suggested Action
                  </label>
                  <textarea
                    id="suggested-action-textarea"
                    value={entry.suggestedAction}
                    onChange={(e) => handleFieldChange('suggestedAction', e.target.value)}
                    placeholder="E.g., Supply solar water pumps and train 40 youth in mediation..."
                    rows={3}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2.5 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Indicator */}
                <div className="space-y-1.5">
                  <label htmlFor="indicator-textarea" className="block text-xs font-semibold text-brand-offwhite">
                    Indicator
                  </label>
                  <textarea
                    id="indicator-textarea"
                    value={entry.indicator}
                    onChange={(e) => handleFieldChange('indicator', e.target.value)}
                    placeholder="E.g., Number of local agreements co-signed by youth delegates..."
                    rows={3}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2.5 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Implementation Output Selector */}
                <div className="space-y-1.5">
                  <label htmlFor="implementation-output-select" className="block text-xs font-semibold text-brand-offwhite">
                    Implementation Output (Action Type)
                  </label>
                  <select
                    id="implementation-output-select"
                    value={entry.implementationOutput || ''}
                    onChange={(e) => handleFieldChange('implementationOutput', e.target.value)}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-2.5 py-2.5 focus:outline-none cursor-pointer"
                  >
                    <option value="">-- Select Practical Output Type --</option>
                    <option value="policy_entry_point">Policy Entry Point (Embedding youth in formal committees)</option>
                    <option value="youth_participation">Youth Participation Mechanism (Mediation/monitoring panels)</option>
                    <option value="protection_safeguard">Protection Safeguard (Access routes and physical security plans)</option>
                    <option value="prevention_resilience">Prevention/Resilience Action (Solar pumps, soil rehabilitation)</option>
                    <option value="partnership_model">Partnership Model (Ministry coordination logs)</option>
                    <option value="reintegration_pathway">Reintegration/Livelihood Pathway (Demobilized youth cooperatives)</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-brand-grey-border/40" />

            {/* SECTION: Suggested Draft Language */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-gold" />
                <h3 className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Suggested Draft Language & Red-Teaming
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Diplomatic Wording */}
                <div className="space-y-1.5">
                  <label htmlFor="diplomatic-wording-textarea" className="block text-xs font-semibold text-brand-offwhite">
                    Diplomatic Wording (Strategic Recommendation)
                  </label>
                  <textarea
                    id="diplomatic-wording-textarea"
                    value={entry.diplomaticWording}
                    onChange={(e) => handleFieldChange('diplomaticWording', e.target.value)}
                    placeholder="E.g., Enhancing community-led resource resilience by strengthening youth leadership..."
                    rows={3}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2.5 focus:outline-none transition-all resize-none font-medium"
                  />
                </div>

                {/* Red-Team Warning */}
                <div className="space-y-1.5">
                  <label htmlFor="red-team-textarea" className="block text-xs font-semibold text-red-400">
                    Red-Team Warning / Conflict Sensitivity
                  </label>
                  <textarea
                    id="red-team-textarea"
                    value={entry.redTeamWarning}
                    onChange={(e) => handleFieldChange('redTeamWarning', e.target.value)}
                    placeholder="E.g., Bypassing elders risks alienation. Ensure elder mentorship role..."
                    rows={3}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-red-500/30 focus:border-red-500 rounded-lg p-2.5 focus:outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Guidance & Live Card */}
        <div className="space-y-6">
          {/* Source Integrity Panel (Rank 1: ToR Consultant Scope) */}
          <SourceIntegrityPanel sourceId="tor" />
          {/* Practical Output: Practical Action Card */}
          <div className="glass-panel p-5 rounded-xl border border-brand-gold/45 bg-gradient-to-br from-brand-navy-light/65 to-brand-navy-dark/95 space-y-4">
            <div className="border-b border-brand-grey-border/30 pb-2">
              <span className="text-[9px] font-bold text-brand-gold uppercase tracking-widest block">
                Practical Output
              </span>
              <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider mt-0.5">
                Practical Action Card
              </h3>
            </div>
            
            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-brand-gold uppercase block">📌 What to do next?</span>
                <p className="text-[11px] text-brand-grey-text leading-relaxed">
                  Mainstream the generated strategic recommendations and localized indicators into municipal plans or regional climate-stabilization briefings.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-brand-gold uppercase block">👥 Who to involve?</span>
                <p className="text-[11px] text-brand-grey-text leading-relaxed">
                  Agropastoral youth representatives, traditional elder mediators, Ministry technicians, and regional peace operations focal points.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-brand-gold uppercase block">🔍 What to validate?</span>
                <p className="text-[11px] text-brand-grey-text leading-relaxed">
                  Verify local seasonal corridor availability, elder-mentor roles, and potential transhumance security hazards in border zones.
                </p>
              </div>

              <hr className="border-brand-grey-border/30" />

              <div className="space-y-2">
                <div>
                  <span className="text-[10px] font-bold text-brand-offwhite block mb-0.5">Draft Action Recommendation:</span>
                  <p className="text-[11px] text-brand-gold font-medium leading-relaxed italic bg-brand-navy-dark/60 p-2.5 rounded border border-brand-grey-border/30">
                    {entry.diplomaticWording || entry.suggestedAction
                      ? `For YPS ${pillars.find((p) => p.id === activePillar)?.name} (output: ${entry.implementationOutput || 'action'}): ${entry.diplomaticWording || entry.suggestedAction}. ${entry.redTeamWarning ? `[Safeguard: ${entry.redTeamWarning}]` : ''}`
                      : 'Complete inputs on the left to compile.'}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-brand-offwhite block mb-0.5">M&E Indicator:</span>
                  <p className="text-[11px] text-brand-grey-text font-mono bg-brand-navy-dark/45 p-2 rounded border border-brand-grey-border/20">
                    {entry.indicator || 'Not specified'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 no-print">
                <CopyButton
                  text={entry.diplomaticWording || entry.suggestedAction
                    ? `For YPS ${pillars.find((p) => p.id === activePillar)?.name} (output: ${entry.implementationOutput || 'action'}): ${entry.diplomaticWording || entry.suggestedAction}. ${entry.redTeamWarning ? `[Safeguard: ${entry.redTeamWarning}]` : ''}`
                    : ''}
                  label="Copy Matrix Recommendation"
                  className="w-full justify-center"
                />
                <CopyButton
                  text={entry.indicator || ''}
                  label="Copy M&E Indicator"
                  className="w-full justify-center"
                />
              </div>
            </div>
          </div>

          {/* Strategic Guidance Box */}
          <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 space-y-3.5">
            <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Source-Based Guidance (YPS vs CPS rules)
            </h3>
            
            <div className="text-[11px] space-y-3 leading-relaxed">
              <div className="p-2.5 rounded bg-brand-green/10 border border-brand-green/20 text-brand-offwhite">
                <span className="font-bold text-brand-green block mb-0.5">✔️ Recommended (Do):</span>
                {helperText?.do}
              </div>
              <div className="p-2.5 rounded bg-red-950/15 border border-red-500/10 text-brand-grey-text">
                <span className="font-bold text-red-400 block mb-0.5">❌ Avoid (Don&apos;t):</span>
                {helperText?.dont}
              </div>
              <p className="text-[10px] text-brand-grey-text/75 italic">
                *Beyond Vulnerability Principle: Frame young people as agents of resilience, innovation, prevention, and peacebuilding, while recognizing differentiated risks.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
