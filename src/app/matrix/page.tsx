'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { YPSPillarId, MatrixEntry } from '@/types';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';

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
      desc: 'Addressing root causes of conflict and livelihood degradation.',
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
          do: 'Highlight how green livelihoods and solar systems establish alternative security anchors.',
          dont: 'Avoid treating poverty as a direct trigger for violence. Ground it in environmental stress.'
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
                    placeholder="E.g., Land degradation along river basin drives migratory friction..."
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

          {/* Live Card Preview */}
          <div className="glass-panel p-5 rounded-xl border border-brand-gold/30 bg-gradient-to-br from-brand-navy-light/60 to-brand-navy-dark/95 space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-brand-gold uppercase block">
              Suggested Draft Language Preview
            </span>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-brand-offwhite uppercase">
                  {pillars.find((p) => p.id === activePillar)?.name} Recommendation
                </h4>
                <p className="text-[11px] text-brand-gold font-medium mt-1 leading-relaxed italic">
                  {entry.diplomaticWording.trim() !== ''
                    ? `"${entry.diplomaticWording}"`
                    : 'Provide Diplomatic Wording in the form to see preview.'}
                </p>
              </div>

              <hr className="border-brand-grey-border/30" />

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <span className="text-brand-grey-text block">Practical Action</span>
                  <span className="text-brand-offwhite leading-normal truncate block">
                    {entry.suggestedAction || '—'}
                  </span>
                </div>
                <div>
                  <span className="text-brand-grey-text block">M&E Indicator</span>
                  <span className="text-brand-offwhite leading-normal truncate block">
                    {entry.indicator || '—'}
                  </span>
                </div>
              </div>

              {entry.redTeamWarning.trim() !== '' && (
                <div className="p-2.5 rounded bg-red-950/20 border border-red-500/20 text-[10px] text-red-400 leading-normal">
                  <span className="font-semibold block">⚠️ Red-Team Warning:</span>
                  {entry.redTeamWarning}
                </div>
              )}
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
                *Beyond Vulnerability Principle: Always phrase actions to portray youth as agents of stabilization, rather than passive risks or victims.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
