'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { RiskPathway, PeaceSecurityPathwayType, EvidenceStrengthType } from '@/types';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { CopyButton } from '@/components/CopyButton';
import { WorkflowStrip } from '@/components/WorkflowStrip';
import Link from 'next/link';

export default function RiskPathwaysPage() {
  const {
    riskPathways,
    addRiskPathway,
    updateRiskPathway,
    deleteRiskPathway,
    contextName,
    loadScenario
  } = useApp();

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [context, setContext] = useState('');
  const [hazard, setHazard] = useState('');
  const [exposure, setExposure] = useState('');
  const [vulnerability, setVulnerability] = useState('');
  const [capacityConstraint, setCapacityConstraint] = useState('');
  const [pathwayType, setPathwayType] = useState<PeaceSecurityPathwayType>('resource_competition');
  const [youthImpact, setYouthImpact] = useState('');
  const [youthOpportunity, setYouthOpportunity] = useState('');
  const [intervention, setIntervention] = useState('');
  const [evidenceStrength, setEvidenceStrength] = useState<EvidenceStrengthType>('Medium');
  const [evidenceGaps, setEvidenceGaps] = useState('');

  // Dropdown options
  const pathwayOptions: { value: PeaceSecurityPathwayType; label: string }[] = [
    { value: 'livelihood_loss', label: 'Livelihood Loss' },
    { value: 'forced_displacement', label: 'Forced Displacement' },
    { value: 'resource_competition', label: 'Resource Competition' },
    { value: 'armed_group_exploitation', label: 'Armed Group Exploitation' },
    { value: 'elite_capture', label: 'Elite Capture / Resource Mismanagement' },
    { value: 'gbv_protection', label: 'GBV & Protection Risks' },
    { value: 'intergenerational_exclusion', label: 'Intergenerational Exclusion' },
    { value: 'weak_institutional_capacity', label: 'Weak Institutional Capacity' },
    { value: 'other', label: 'Other Conflict Pathway' }
  ];

  const evidenceOptions: EvidenceStrengthType[] = ['High', 'Medium', 'Low', 'Unclear'];

  const clearForm = () => {
    setEditingId(null);
    setContext('');
    setHazard('');
    setExposure('');
    setVulnerability('');
    setCapacityConstraint('');
    setPathwayType('resource_competition');
    setYouthImpact('');
    setYouthOpportunity('');
    setIntervention('');
    setEvidenceStrength('Medium');
    setEvidenceGaps('');
  };

  const handleEdit = (p: RiskPathway) => {
    setEditingId(p.id);
    setContext(p.context);
    setHazard(p.hazard);
    setExposure(p.exposure);
    setVulnerability(p.vulnerability);
    setCapacityConstraint(p.capacityConstraint);
    setPathwayType(p.pathwayType);
    setYouthImpact(p.youthImpact);
    setYouthOpportunity(p.youthOpportunity);
    setIntervention(p.intervention);
    setEvidenceStrength(p.evidenceStrength);
    setEvidenceGaps(p.evidenceGaps);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!context || !hazard || !pathwayType) {
      alert('Please fill out at least Context, Hazard, and Pathway type.');
      return;
    }

    const payload = {
      context,
      hazard,
      exposure,
      vulnerability,
      capacityConstraint,
      pathwayType,
      youthImpact,
      youthOpportunity,
      intervention,
      evidenceStrength,
      evidenceGaps
    };

    if (editingId) {
      updateRiskPathway(editingId, payload);
    } else {
      addRiskPathway(payload);
    }
    clearForm();
  };

  const getEvidenceBadge = (level: EvidenceStrengthType) => {
    let colorClass = 'bg-brand-grey-border/50 text-brand-grey-text border-brand-grey-border';
    if (level === 'High') {
      colorClass = 'bg-brand-green/10 text-brand-green border-brand-green/30';
    } else if (level === 'Medium') {
      colorClass = 'bg-brand-gold/10 text-brand-gold border-brand-gold/30';
    } else if (level === 'Low') {
      colorClass = 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    } else if (level === 'Unclear') {
      colorClass = 'bg-red-500/10 text-red-400 border-red-500/20';
    }

    return (
      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${colorClass}`}>
        Evidence: {level}
      </span>
    );
  };

  const getPathwayLabel = (val: PeaceSecurityPathwayType) => {
    return pathwayOptions.find((o) => o.value === val)?.label || val;
  };

  const compilePathwayNote = (p: RiskPathway) => {
    return `Operational YCPS Risk Pathway & Action Note:
- Pathway Type: ${getPathwayLabel(p.pathwayType)}
- Climate Stressor (Hazard): ${p.hazard}
- Exposure & Vulnerability: ${p.exposure || 'Not specified'}, ${p.vulnerability || 'Not specified'}
- Capacity Constraint: ${p.capacityConstraint || 'Not specified'}
- Youth Impact & Opportunity (Agency): ${p.youthImpact || 'Not specified'} (Opportunity: ${p.youthOpportunity || 'Not specified'})
- Proposed Prevention/Resilience Action: ${p.intervention || 'Not specified'}
- Verification Needs: Validate evidence gaps (${p.evidenceGaps || 'none registered'}) against local field reports.
- Target Actors to Involve: Local borderland administrators, youth-led adaptation networks, and local traditional elder councils.
- Conflict Sensitivity Warning: Environmental factors do not directly cause conflict; they interact with governance bottlenecks and livelihoods. Design response in cooperation with local authorities.`;
  };

  return (
    <div className="space-y-6">
      {/* Workflow Strip */}
      <WorkflowStrip currentStep="risk" />

      {/* This step produces box */}
      <div className="glass-panel p-4 rounded-xl border border-brand-gold/25 bg-gradient-to-r from-brand-navy-light/40 to-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs no-print">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block">📋 This Step Produces:</span>
          <p className="text-brand-grey-text">
            <strong>Task:</strong> Map compound climate stressors, capacity constraints, youth impacts, and opportunities. <br />
            <strong>Deliverable:</strong> Context-specific climate-security programming notes and entry points.
          </p>
        </div>
        <Link
          href="/stakeholders"
          className="shrink-0 px-4 py-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-bold rounded-lg text-xs uppercase tracking-wider text-center transition-all cursor-pointer"
        >
          Next: Map Stakeholders →
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-grey-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-brand-offwhite">
            Climate-Security Risk Pathway Builder
          </h1>
          <p className="text-xs text-brand-grey-text mt-1">
            Map context-specific pathways through which climate-related stressors may compound vulnerabilities and contribute to instability, and detail youth impact and response opportunities.
          </p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-lg bg-brand-navy-light border border-brand-grey-border font-medium text-brand-gold self-start">
          Context: {contextName}
        </div>
      </div>

      {/* Causal Claim Safeguard Guidance Note */}
      <div className="glass-panel p-4 rounded-xl border border-brand-gold/15 bg-brand-navy-light/25 text-xs text-brand-grey-text space-y-2">
        <span className="text-[10px] font-bold text-brand-gold tracking-widest uppercase block">
          Candidate Methodology: Climate-Security Causality Guidance
        </span>
        <p className="leading-relaxed">
          Climate hazards do not automatically cause conflict. Instead, they interact with and compound existing vulnerability dynamics, resource exclusion, governance bottlenecks, coping capacities, and social trust. Highlight these institutional capacity constraints in your mapping.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid lg:grid-cols-5 gap-6">
        
        {/* Left Form: Add/Edit Pathway */}
        <div className="lg:col-span-2 space-y-4">
          
          <form
            onSubmit={handleSubmit}
            className="glass-panel p-6 rounded-xl border border-brand-grey-border/60 space-y-5"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-wider">
                  User Working Notes (Pathway Analysis)
                </h3>
              </div>
              <p className="text-[11px] text-brand-grey-text mt-1.5">
                Construct a structured climate-security conflict cascade based on the CCCPA methodology.
              </p>
            </div>

            <hr className="border-brand-grey-border/40" />

            {/* Context */}
            <div className="space-y-1">
              <label htmlFor="context-input" className="block text-xs font-semibold text-brand-offwhite">
                Context / Region / Country
              </label>
              <input
                id="context-input"
                type="text"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="E.g., Sahelian borderlands / Far North Cameroon"
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-3 py-2 focus:outline-none transition-all"
                required
              />
            </div>

            {/* Climate Hazard */}
            <div className="space-y-1">
              <label htmlFor="hazard-input" className="block text-xs font-semibold text-brand-offwhite">
                Climate Hazard or Stressor
              </label>
              <input
                id="hazard-input"
                type="text"
                value={hazard}
                onChange={(e) => setHazard(e.target.value)}
                placeholder="E.g., Decreasing seasonal rainfall, desertification"
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-3 py-2 focus:outline-none transition-all"
                required
              />
            </div>

            {/* Exposure & Vulnerability */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="exposure-input" className="block text-xs font-semibold text-brand-offwhite">
                  Exposure
                </label>
                <textarea
                  id="exposure-input"
                  value={exposure}
                  onChange={(e) => setExposure(e.target.value)}
                  placeholder="Who/what is in harm's way?"
                  rows={2}
                  className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2 focus:outline-none transition-all resize-none"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="vulnerability-input" className="block text-xs font-semibold text-brand-offwhite">
                  Vulnerability
                </label>
                <textarea
                  id="vulnerability-input"
                  value={vulnerability}
                  onChange={(e) => setVulnerability(e.target.value)}
                  placeholder="Livelihood dependence, poverty?"
                  rows={2}
                  className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2 focus:outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Governance Constraint */}
            <div className="space-y-1">
              <label htmlFor="capacity-input" className="block text-xs font-semibold text-brand-offwhite">
                Governance / Capacity Constraint
              </label>
              <input
                id="capacity-input"
                type="text"
                value={capacityConstraint}
                onChange={(e) => setCapacityConstraint(e.target.value)}
                placeholder="E.g., Weak enforcement of land sharing codes"
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-3 py-2 focus:outline-none transition-all"
              />
            </div>

            {/* Peace & Security Pathway */}
            <div className="space-y-1">
              <label htmlFor="pathway-select" className="block text-xs font-semibold text-brand-offwhite">
                Conflict Pathway Model
              </label>
              <select
                id="pathway-select"
                value={pathwayType}
                onChange={(e) => setPathwayType(e.target.value as PeaceSecurityPathwayType)}
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-3 py-2 focus:outline-none transition-all cursor-pointer"
              >
                {pathwayOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Youth Specifics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="youth-impact-input" className="block text-xs font-semibold text-brand-offwhite">
                  Youth-Specific Impact
                </label>
                <textarea
                  id="youth-impact-input"
                  value={youthImpact}
                  onChange={(e) => setYouthImpact(e.target.value)}
                  placeholder="Recruitment vulnerability?"
                  rows={2}
                  className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2 focus:outline-none transition-all resize-none"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="youth-opp-input" className="block text-xs font-semibold text-brand-offwhite">
                  Youth-Led Opportunity (Agency)
                </label>
                <textarea
                  id="youth-opp-input"
                  value={youthOpportunity}
                  onChange={(e) => setYouthOpportunity(e.target.value)}
                  placeholder="Local monitoring or mediation?"
                  rows={2}
                  className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2 focus:outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Intervention */}
            <div className="space-y-1">
              <label htmlFor="intervention-input" className="block text-xs font-semibold text-brand-offwhite">
                Implementation Output: Prevention, Resilience, or Programming Action
              </label>
              <textarea
                id="intervention-input"
                value={intervention}
                onChange={(e) => setIntervention(e.target.value)}
                placeholder="What prevention, resilience, or programming action follows from this pathway? (E.g., Supply solar water pumps for youth cooperatives...)"
                rows={2}
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2.5 focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Evidence Strength & Gaps */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1 space-y-1">
                <label htmlFor="evidence-select" className="block text-xs font-semibold text-brand-offwhite">
                  Evidence
                </label>
                <select
                  id="evidence-select"
                  value={evidenceStrength}
                  onChange={(e) => setEvidenceStrength(e.target.value as EvidenceStrengthType)}
                  className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-2 py-2 focus:outline-none transition-all cursor-pointer"
                >
                  {evidenceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 space-y-1">
                <label htmlFor="gaps-input" className="block text-xs font-semibold text-brand-offwhite">
                  Evidence Gaps
                </label>
                <input
                  id="gaps-input"
                  type="text"
                  value={evidenceGaps}
                  onChange={(e) => setEvidenceGaps(e.target.value)}
                  placeholder="E.g., Lack of climate data..."
                  className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-3 py-2 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Trigger Warnings for low evidence */}
            {(evidenceStrength === 'Low' || evidenceStrength === 'Unclear') && (
              <div className="p-3 bg-orange-950/20 border border-orange-500/20 text-[10px] text-orange-400 rounded-lg flex items-start gap-2">
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <span className="font-semibold block">⚠️ TO BE VALIDATED:</span>
                  This causal pathway relies on low or unclear evidence strength. Validate against official reports and context evidence before exporting.
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="pt-3 flex gap-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-bold rounded-lg text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer"
              >
                {editingId ? 'Update Pathway' : 'Add Pathway'}
              </button>
              {(editingId || context || hazard) && (
                <button
                  type="button"
                  onClick={clearForm}
                  className="px-3 py-2 border border-brand-grey-border hover:bg-brand-navy-light text-brand-grey-text hover:text-brand-offwhite rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Lightweight Guidance Box */}
          <div className="mt-4 p-3.5 bg-brand-navy-dark/45 border border-brand-grey-border/40 rounded-xl text-[11px] text-brand-grey-text leading-relaxed no-print">
            <span className="font-semibold text-brand-gold block mb-1">💡 Next Step:</span>
            After mapping the pathway, review the Pathway Programming Card. Copy the programming note or validate evidence gaps against local realities before using the output. Always verify that causal claims are backed by local evidence without assuming automatic climate-conflict dynamics.
          </div>
        </div>

        {/* Right Column: Existing Pathways List & Guidance */}
        <div className="lg:col-span-3 space-y-6">
          {/* Source Integrity Panel (Rank 4: CCCPA CPS Manual) */}
          <SourceIntegrityPanel sourceId="cps_manual" />

          {/* Mapped Pathways List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-brand-grey-border/40 pb-2">
              <h3 className="text-sm font-semibold text-brand-offwhite">
                Mapped Pathways ({riskPathways.length})
              </h3>
              <span className="text-[10px] text-brand-grey-text">Causal relationships</span>
            </div>

            {riskPathways.length === 0 ? (
              <div className="glass-panel p-8 text-center rounded-xl border border-brand-grey-border/45 space-y-4">
                <div className="text-brand-grey-text/40 flex justify-center">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h4 className="text-sm font-bold text-brand-offwhite">No Risk Pathways Mapped</h4>
                <p className="text-xs text-brand-grey-text max-w-sm mx-auto">
                  No workspace input yet. Start with a case study or continue with the CARANA fictional training scenario template.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <Link
                    href="/case-studies"
                    className="px-4 py-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark text-xs font-bold rounded-lg uppercase tracking-wider transition-all text-center"
                  >
                    Choose Case Study
                  </Link>
                  <button
                    onClick={() => {
                      if (window.confirm("This will load the CARANA Fictional Scenario into your workspace. Continue?")) {
                        loadScenario('carana');
                      }
                    }}
                    type="button"
                    className="px-4 py-2 bg-brand-navy-light hover:bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border text-xs font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer text-center"
                  >
                    Continue with CARANA Template
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {riskPathways.map((path) => (
                  <div
                    key={path.id}
                    className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 hover:border-brand-gold/30 transition-all duration-300 space-y-3.5 relative overflow-hidden group"
                  >
                    {/* Left Border Status color based on evidence */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                      path.evidenceStrength === 'High'
                        ? 'bg-brand-green'
                        : path.evidenceStrength === 'Medium'
                        ? 'bg-brand-gold'
                        : 'bg-orange-400'
                    }`} />
                    
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-4 pl-1">
                      <div>
                        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">
                          {getPathwayLabel(path.pathwayType)}
                        </span>
                        <h4 className="text-xs font-semibold text-brand-offwhite leading-relaxed mt-0.5">
                          {path.context}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        {getEvidenceBadge(path.evidenceStrength)}
                        {(path.evidenceStrength === 'Low' || path.evidenceStrength === 'Unclear') && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-950/30 text-orange-400 border border-orange-500/20 uppercase tracking-widest">
                            To Be Validated
                          </span>
                        )}
                        <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(path)}
                            type="button"
                            className="p-1 rounded bg-brand-navy-light text-brand-grey-text hover:text-brand-gold cursor-pointer"
                            title="Edit Pathway"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteRiskPathway(path.id)}
                            type="button"
                            className="p-1 rounded bg-brand-navy-light text-brand-grey-text hover:text-red-400 cursor-pointer"
                            title="Delete Pathway"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Causal Chain Display */}
                    <div className="grid md:grid-cols-3 gap-3 bg-brand-navy-light/45 p-3 rounded-lg border border-brand-grey-border/30 text-[11px] pl-4">
                      <div className="space-y-1">
                        <span className="text-[10px] text-brand-grey-text font-semibold uppercase block">
                          Stressor & Exposure
                        </span>
                        <p className="text-brand-offwhite leading-relaxed">
                          <span className="font-semibold text-brand-gold">Hazard:</span> {path.hazard}
                          {path.exposure && <span className="block mt-0.5 text-brand-grey-text/90"><span className="font-semibold text-brand-offwhite">Exp:</span> {path.exposure}</span>}
                        </p>
                      </div>

                      <div className="space-y-1 border-t md:border-t-0 md:border-l border-brand-grey-border/35 pt-2 md:pt-0 md:pl-3">
                        <span className="text-[10px] text-brand-grey-text font-semibold uppercase block">
                          Institutional Context
                        </span>
                        <p className="text-brand-offwhite leading-relaxed">
                          <span className="font-semibold text-brand-gold">Constraint:</span> {path.capacityConstraint || '—'}
                          {path.vulnerability && <span className="block mt-0.5 text-brand-grey-text/90"><span className="font-semibold text-brand-offwhite">Vuln:</span> {path.vulnerability}</span>}
                        </p>
                      </div>

                      <div className="space-y-1 border-t md:border-t-0 md:border-l border-brand-grey-border/35 pt-2 md:pt-0 md:pl-3">
                        <span className="text-[10px] text-brand-grey-text font-semibold uppercase block">
                          Youth Impact & Opportunity
                        </span>
                        <p className="text-brand-offwhite leading-relaxed">
                          <span className="font-semibold text-brand-gold">Impact:</span> {path.youthImpact || '—'}
                          {path.youthOpportunity && <span className="block mt-0.5 text-brand-green font-medium"><span className="font-semibold text-brand-offwhite">Agency:</span> {path.youthOpportunity}</span>}
                        </p>
                      </div>
                    </div>

                    {/* Causal Intervention */}
                    {path.intervention && (
                      <div className="bg-brand-green/5 border border-brand-green/20 p-2.5 rounded-lg text-xs leading-normal pl-4 text-brand-offwhite flex gap-2">
                        <div className="text-brand-green shrink-0 mt-0.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-semibold text-brand-green">Stabilization Intervention:</span> {path.intervention}
                        </div>
                      </div>
                    )}

                    {/* Evidence Gaps */}
                    {path.evidenceGaps && (
                      <div className="text-[10px] text-brand-grey-text pl-1 leading-normal">
                        <span className="font-semibold text-brand-gold">Evidence Gaps:</span> {path.evidenceGaps}
                      </div>
                    )}

                    {/* Practical Output: Pathway Programming Card */}
                    <div className="mt-4 p-4 rounded-lg border border-brand-gold/45 bg-gradient-to-br from-brand-navy-light/65 to-brand-navy-dark/95 space-y-3">
                      <div className="flex items-center justify-between border-b border-brand-grey-border/30 pb-2">
                        <div>
                          <span className="text-[9px] font-bold text-brand-gold uppercase tracking-widest block">
                            Practical Output
                          </span>
                          <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider mt-0.5">
                            Pathway Programming Card
                          </h3>
                        </div>
                        <CopyButton
                          text={compilePathwayNote(path)}
                          label="Copy Pathway Programming Note"
                          className="scale-90"
                        />
                      </div>
                      <div className="text-[11px] leading-relaxed text-brand-grey-text space-y-2">
                        <div>
                          <span className="font-semibold text-brand-offwhite block mb-0.5">Causal Chain & Programming Action:</span>
                          Under {path.hazard}, young people face {path.youthImpact || 'risks'} due to {path.capacityConstraint || 'capacity constraints'}. Youth agency focuses on {path.youthOpportunity || 'resilience actions'}. Prevention response targets: <span className="text-brand-gold font-medium">{path.intervention || 'Not specified'}</span>.
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] border-t border-brand-grey-border/20 pt-1.5">
                          <div>
                            <span className="font-semibold text-brand-offwhite block">Validate Gaps:</span>
                            {path.evidenceGaps || 'None registered'}
                          </div>
                          <div>
                            <span className="font-semibold text-brand-offwhite block">Who to Involve:</span>
                            Local authorities, youth mediators, and Ministry representatives.
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-brand-grey-border/30 pt-2 text-[9px] text-brand-gold/90 italic leading-relaxed">
                        * Draft planning output. To be validated against official regional mandates and context-specific field evidence before deployment.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
