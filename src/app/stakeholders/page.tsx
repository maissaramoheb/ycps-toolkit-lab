'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Stakeholder, ActorType, InfluenceType, PositionType, YouthInclusionQualityType } from '@/types';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { CopyButton } from '@/components/CopyButton';

export default function StakeholdersPage() {
  const {
    stakeholders,
    addStakeholder,
    updateStakeholder,
    deleteStakeholder,
    contextName
  } = useApp();

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [actorType, setActorType] = useState<ActorType>('youth_actor');
  const [interest, setInterest] = useState('');
  const [influence, setInfluence] = useState<InfluenceType>('Medium');
  const [position, setPosition] = useState<PositionType>('Neutral');
  const [youthInclusionQuality, setYouthInclusionQuality] = useState<YouthInclusionQualityType>('Medium');
  const [risks, setRisks] = useState('');
  const [diplomaticSensitivity, setDiplomaticSensitivity] = useState('');
  const [engagementStrategy, setEngagementStrategy] = useState('');

  // Filters State
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPosition, setFilterPosition] = useState<string>('all');

  // Actor Types Mapping
  const actorTypeOptions: { value: ActorType; label: string }[] = [
    { value: 'youth_actor', label: 'Youth Actor' },
    { value: 'government_institution', label: 'Government Institution' },
    { value: 'climate_actor', label: 'Climate Actor' },
    { value: 'peacebuilding_actor', label: 'Peacebuilding Actor' },
    { value: 'security_rol_actor', label: 'Security / Rule of Law Actor' },
    { value: 'women_led_organization', label: 'Women-Led Organization' },
    { value: 'traditional_leader', label: 'Traditional / Community Leader' },
    { value: 'donor', label: 'Donor / Funding Agency' },
    { value: 'regional_organization', label: 'Regional Organization (e.g. AU, LCBC, IGAD)' },
    { value: 'civil_society', label: 'Civil Society Organization' },
    { value: 'possible_spoiler', label: 'Possible Spoiler' },
    { value: 'other', label: 'Other' }
  ];

  const getActorTypeLabel = (val: ActorType) => {
    return actorTypeOptions.find((o) => o.value === val)?.label || val;
  };

  const compileCoordinationStrategy = () => {
    const supportive = stakeholders.filter((s) => s.position === 'Supportive' && s.influence !== 'Low').map(s => s.name);
    const spoilers = stakeholders.filter((s) => s.position === 'Opposed' || s.diplomaticSensitivity.trim() !== '').map(s => s.name);
    const careful = stakeholders.filter((s) => s.position === 'Neutral' || s.position === 'Undetermined').map(s => s.name);
    
    return `Operational YCPS Nexus Coordination Strategy:
- High-Influence Supportive Partners: ${supportive.join(', ') || 'None mapped'}
- Actors Needing Careful Engagement: ${careful.join(', ') || 'None mapped'}
- Possible Diplomatic Spoilers / Sensitive Actors: ${spoilers.join(', ') || 'None mapped'}
- Immediate Coordination Step: Convene local dialogue panels linking youth-led groups with traditional elders and Ministry officials.
- Youth Inclusion Quality Notes: Ensure youth representatives hold voting authority rather than advisory observer status.
- Feedback & Learning Loop: Establish monthly regional briefing rounds with regional organizations (AU, LCBC, or IGAD) to relay local data to high-level policy desks.
- Validation: Verify traditional elder approval in target borderland districts before convening joint panels.`;
  };

  const clearForm = () => {
    setEditingId(null);
    setName('');
    setActorType('youth_actor');
    setInterest('');
    setInfluence('Medium');
    setPosition('Neutral');
    setYouthInclusionQuality('Medium');
    setRisks('');
    setDiplomaticSensitivity('');
    setEngagementStrategy('');
  };

  const handleEdit = (s: Stakeholder) => {
    setEditingId(s.id);
    setName(s.name);
    setActorType(s.actorType);
    setInterest(s.interest);
    setInfluence(s.influence);
    setPosition(s.position);
    setYouthInclusionQuality(s.youthInclusionQuality);
    setRisks(s.risks);
    setDiplomaticSensitivity(s.diplomaticSensitivity);
    setEngagementStrategy(s.engagementStrategy);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !interest) {
      alert('Please fill out Stakeholder Name and Interest.');
      return;
    }

    const payload = {
      name,
      actorType,
      interest,
      influence,
      position,
      youthInclusionQuality,
      risks,
      diplomaticSensitivity,
      engagementStrategy
    };

    if (editingId) {
      updateStakeholder(editingId, payload);
    } else {
      addStakeholder(payload);
    }
    clearForm();
  };

  // Badge Styles
  const getInfluenceBadge = (level: InfluenceType) => {
    let style = 'bg-brand-navy-light text-brand-grey-text border-brand-grey-border';
    if (level === 'High') style = 'bg-red-500/10 text-red-400 border-red-500/20';
    if (level === 'Medium') style = 'bg-brand-gold/10 text-brand-gold border-brand-gold/20';
    if (level === 'Low') style = 'bg-brand-green/10 text-brand-green border-brand-green/20';

    return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${style}`}>{level}</span>;
  };

  const getPositionBadge = (pos: PositionType) => {
    let style = 'bg-brand-navy-light text-brand-grey-text border-brand-grey-border';
    if (pos === 'Supportive') style = 'bg-brand-green/10 text-brand-green border-brand-green/20';
    if (pos === 'Opposed') style = 'bg-red-500/10 text-red-400 border-red-500/20';
    if (pos === 'Neutral') style = 'bg-brand-navy-light text-brand-gold border-brand-gold/10';

    return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${style}`}>{pos}</span>;
  };

  const getInclusionBadge = (qual: YouthInclusionQualityType) => {
    let style = 'bg-brand-navy-light text-brand-grey-text border-brand-grey-border';
    if (qual === 'High') style = 'bg-brand-green/15 text-brand-green border-brand-green/30';
    if (qual === 'Medium') style = 'bg-brand-gold/10 text-brand-gold border-brand-gold/20';
    if (qual === 'Low') style = 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    if (qual === 'None') style = 'bg-red-500/10 text-red-400 border-red-500/20';

    return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${style}`}>{qual}</span>;
  };

  // Filter Logic
  const filteredStakeholders = stakeholders.filter((s) => {
    const matchType = filterType === 'all' || s.actorType === filterType;
    const matchPos = filterPosition === 'all' || s.position === filterPosition;
    return matchType && matchPos;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-grey-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-brand-offwhite">
            Stakeholder & Partnership Mapper
          </h1>
          <p className="text-xs text-brand-grey-text mt-1">
            Analyze key actors across interest, influence, and alignment. Identify diplomatic risks and formulate customized youth inclusion strategies.
          </p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-lg bg-brand-navy-light border border-brand-grey-border font-medium text-brand-gold self-start">
          Context: {contextName}
        </div>
      </div>

      {/* Partnership Guidance Note */}
      <div className="glass-panel p-4 rounded-xl border border-brand-gold/15 bg-brand-navy-light/25 text-xs text-brand-grey-text space-y-2">
        <span className="text-[10px] font-bold text-brand-gold tracking-widest uppercase block">
          Candidate Methodology: Partnership & Feedback Systems
        </span>
        <p className="leading-relaxed">
          Map connections between government institutions, local authorities, youth-led organizations, civil society, regional bodies, and international partners. Create collaborative loops that allow localized feedback and learning to reach high-level policy channels.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column: Register Form */}
        <div className="lg:col-span-1">
          <form
            onSubmit={handleSubmit}
            className="glass-panel p-6 rounded-xl border border-brand-grey-border/60 space-y-5"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-wider">
                  User Working Notes (Stakeholder Entry)
                </h3>
              </div>
              <p className="text-[11px] text-brand-grey-text mt-1.5">
                Record actor interests and potential security/spoiler positions.
              </p>
            </div>

            <hr className="border-brand-grey-border/40" />

            {/* Name */}
            <div className="space-y-1">
              <label htmlFor="stakeholder-name" className="block text-xs font-semibold text-brand-offwhite">
                Stakeholder Name / Organization
              </label>
              <input
                id="stakeholder-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g., Ministry of Water, IGAD, local Youth Union"
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-3 py-2 focus:outline-none transition-all"
                required
              />
            </div>

            {/* Actor Type */}
            <div className="space-y-1">
              <label htmlFor="actor-type-select" className="block text-xs font-semibold text-brand-offwhite">
                Actor Type
              </label>
              <select
                id="actor-type-select"
                value={actorType}
                onChange={(e) => setActorType(e.target.value as ActorType)}
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-3 py-2 focus:outline-none transition-all cursor-pointer"
              >
                {actorTypeOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Interest */}
            <div className="space-y-1">
              <label htmlFor="stakeholder-interest" className="block text-xs font-semibold text-brand-offwhite">
                Core Interest / Mandate
              </label>
              <textarea
                id="stakeholder-interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="E.g., Protecting upstream water extraction rights..."
                rows={2}
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2 focus:outline-none transition-all resize-none"
                required
              />
            </div>

            {/* Influence, Position, Inclusion Quality */}
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label htmlFor="influence-select" className="block text-[10px] font-semibold text-brand-offwhite">
                  Influence
                </label>
                <select
                  id="influence-select"
                  value={influence}
                  onChange={(e) => setInfluence(e.target.value as InfluenceType)}
                  className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-2 py-2 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="position-select" className="block text-[10px] font-semibold text-brand-offwhite">
                  Position
                </label>
                <select
                  id="position-select"
                  value={position}
                  onChange={(e) => setPosition(e.target.value as PositionType)}
                  className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-2 py-2 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="Supportive">Supportive</option>
                  <option value="Neutral">Neutral</option>
                  <option value="Opposed">Opposed</option>
                  <option value="Undetermined">Undetermined</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="inclusion-select" className="block text-[10px] font-semibold text-brand-offwhite">
                  Youth Incl.
                </label>
                <select
                  id="inclusion-select"
                  value={youthInclusionQuality}
                  onChange={(e) => setYouthInclusionQuality(e.target.value as YouthInclusionQualityType)}
                  className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg px-2 py-2 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                  <option value="None">None</option>
                </select>
              </div>
            </div>

            {/* Risks & Diplomatic Sensitivity */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="stakeholder-risks" className="block text-xs font-semibold text-brand-offwhite">
                  Associated Risks
                </label>
                <textarea
                  id="stakeholder-risks"
                  value={risks}
                  onChange={(e) => setRisks(e.target.value)}
                  placeholder="E.g., Co-optation of youth..."
                  rows={2}
                  className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2 focus:outline-none transition-all resize-none"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="diplomatic-sensitivity" className="block text-xs font-semibold text-brand-offwhite">
                  Diplomatic Sensitivity
                </label>
                <textarea
                  id="diplomatic-sensitivity"
                  value={diplomaticSensitivity}
                  onChange={(e) => setDiplomaticSensitivity(e.target.value)}
                  placeholder="E.g., Border crossing sensitivities..."
                  rows={2}
                  className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2 focus:outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Engagement Strategy */}
            <div className="space-y-1">
              <label htmlFor="engagement-strategy" className="block text-xs font-semibold text-brand-offwhite">
                Implementation Output: Coordination / Engagement Step
              </label>
              <textarea
                id="engagement-strategy"
                value={engagementStrategy}
                onChange={(e) => setEngagementStrategy(e.target.value)}
                placeholder="What coordination or engagement step follows from this stakeholder map? (E.g., Convene local youth-elder panels to establish joint resource rotas...)"
                rows={2}
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2 focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex gap-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-bold rounded-lg text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer"
              >
                {editingId ? 'Update Stakeholder' : 'Map Stakeholder'}
              </button>
              {(editingId || name || interest) && (
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
        </div>

        {/* Right Column: Stakeholder Table & Guidance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Source Integrity Panel (Rank 5: Beyond Vulnerability Agency) */}
          <SourceIntegrityPanel sourceId="beyond_vuln" />

          {/* Practical Output: Nexus Coordination Strategy */}
          <div className="glass-panel p-5 rounded-xl border border-brand-gold/45 bg-gradient-to-br from-brand-navy-light/65 to-brand-navy-dark/95 space-y-4">
            <div className="border-b border-brand-grey-border/30 pb-2 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-bold text-brand-gold uppercase tracking-widest block">
                  Practical Output
                </span>
                <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider mt-0.5">
                  Nexus Coordination Strategy
                </h3>
              </div>
              <CopyButton
                text={compileCoordinationStrategy()}
                label="Copy Coordination Strategy"
              />
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1 bg-brand-navy-dark/40 p-2.5 rounded border border-brand-grey-border/30">
                  <span className="text-[10px] font-bold text-brand-green uppercase block">✔️ Supportive Nexus Partners</span>
                  <p className="text-[11px] text-brand-grey-text mt-0.5 leading-relaxed">
                    {stakeholders.filter(s => s.position === 'Supportive' && s.influence !== 'Low').map(s => s.name).join(', ') || 'No supportive high/medium-influence actors mapped yet.'}
                  </p>
                </div>
                <div className="space-y-1 bg-brand-navy-dark/40 p-2.5 rounded border border-brand-grey-border/30">
                  <span className="text-[10px] font-bold text-red-400 uppercase block">⚠️ Spoilers & Sensitive Actors</span>
                  <p className="text-[11px] text-brand-grey-text mt-0.5 leading-relaxed">
                    {stakeholders.filter(s => s.position === 'Opposed' || s.diplomaticSensitivity.trim() !== '').map(s => s.name).join(', ') || 'No oppositional/sensitive actors mapped.'}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-brand-gold uppercase block">📌 Immediate Coordination Action Step</span>
                <p className="text-[11px] text-brand-offwhite leading-relaxed">
                  Convene a joint natural resource dialogue panel linking mapped youth organizations with local elders and district authorities.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-brand-gold uppercase block">📊 Youth Inclusion Quality Note</span>
                <p className="text-[11px] text-brand-grey-text leading-relaxed">
                  Validate that youth-led groups are mapped with at least &ldquo;Medium&rdquo; or &ldquo;High&rdquo; inclusion quality to avoid mere tokenistic representation.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-brand-gold uppercase block">🔄 Feedback & Learning Loop</span>
                <p className="text-[11px] text-brand-grey-text leading-relaxed">
                  Establish a monthly briefing schedule with regional bodies (AU, LCBC, or IGAD) to relay ground-level agropastoral monitoring data directly to national ministries.
                </p>
              </div>

              <div className="border-t border-brand-grey-border/30 pt-2.5 text-[9px] text-brand-gold/90 italic leading-relaxed">
                * Draft planning output. To be validated against official regional mandates and context-specific field evidence before deployment.
              </div>
            </div>
          </div>

          {/* Table Controls (Filters) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-grey-border/40 pb-3">
              <h3 className="text-sm font-semibold text-brand-offwhite">
                Mapped Stakeholders ({filteredStakeholders.length})
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {/* Actor Type Filter */}
                <select
                  aria-label="Filter by Actor Type"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-brand-navy-light text-brand-offwhite border border-brand-grey-border/60 rounded px-2 py-1 text-[10px] focus:outline-none focus:border-brand-gold cursor-pointer"
                >
                  <option value="all">All Actor Types</option>
                  {actorTypeOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>

                {/* Position Filter */}
                <select
                  aria-label="Filter by Position"
                  value={filterPosition}
                  onChange={(e) => setFilterPosition(e.target.value)}
                  className="bg-brand-navy-light text-brand-offwhite border border-brand-grey-border/60 rounded px-2 py-1 text-[10px] focus:outline-none focus:border-brand-gold cursor-pointer"
                >
                  <option value="all">All Positions</option>
                  <option value="Supportive">Supportive</option>
                  <option value="Neutral">Neutral</option>
                  <option value="Opposed">Opposed</option>
                  <option value="Undetermined">Undetermined</option>
                </select>
              </div>
            </div>

            {/* Table Container */}
            {filteredStakeholders.length === 0 ? (
              <div className="glass-panel p-8 text-center rounded-xl border border-brand-grey-border/45 space-y-3">
                <div className="text-brand-grey-text/40 flex justify-center">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-sm font-bold text-brand-offwhite">No Stakeholders Mapped</h4>
                <p className="text-xs text-brand-grey-text max-w-sm mx-auto">
                  {stakeholders.length === 0
                    ? 'Register a stakeholder using the registration form on the left, or seed a preset scenario from the dashboard overview to populate the workspace.'
                    : 'No stakeholders match your active filter settings. Try resetting the filters above.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredStakeholders.map((s) => (
                  <div
                    key={s.id}
                    className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 hover:border-brand-gold/25 transition-all duration-300 space-y-3 relative group"
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-brand-offwhite">{s.name}</h4>
                        <span className="text-[10px] font-semibold text-brand-gold bg-brand-navy-light px-2 py-0.5 rounded border border-brand-gold/10 inline-block mt-1">
                          {getActorTypeLabel(s.actorType)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(s)}
                          type="button"
                          className="p-1 rounded bg-brand-navy-light text-brand-grey-text hover:text-brand-gold cursor-pointer"
                          title="Edit Stakeholder"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteStakeholder(s.id)}
                          type="button"
                          className="p-1 rounded bg-brand-navy-light text-brand-grey-text hover:text-red-400 cursor-pointer"
                          title="Delete Stakeholder"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Badges strip */}
                    <div className="flex flex-wrap items-center gap-3 border-t border-b border-brand-grey-border/40 py-2">
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] text-brand-grey-text font-semibold uppercase">Influence:</span>
                        {getInfluenceBadge(s.influence)}
                      </div>
                      <div className="flex items-center gap-1 border-l border-brand-grey-border/40 pl-3">
                        <span className="text-[9px] text-brand-grey-text font-semibold uppercase">Position:</span>
                        {getPositionBadge(s.position)}
                      </div>
                      <div className="flex items-center gap-1 border-l border-brand-grey-border/40 pl-3">
                        <span className="text-[9px] text-brand-grey-text font-semibold uppercase">Youth Inclusion:</span>
                        {getInclusionBadge(s.youthInclusionQuality)}
                      </div>
                    </div>

                    {/* Core details */}
                    <div className="text-xs space-y-2 pt-1">
                      <div>
                        <span className="text-[10px] text-brand-grey-text font-semibold uppercase block">
                          Interest / Mandate:
                        </span>
                        <p className="text-brand-offwhite leading-relaxed">{s.interest}</p>
                      </div>

                      {s.engagementStrategy && (
                        <div>
                          <span className="text-[10px] text-brand-green font-semibold uppercase block">
                            Engagement Strategy:
                          </span>
                          <p className="text-brand-offwhite leading-relaxed">{s.engagementStrategy}</p>
                        </div>
                      )}

                      {/* Sensitivities */}
                      {(s.risks || s.diplomaticSensitivity) && (
                        <div className="grid sm:grid-cols-2 gap-3 bg-brand-navy-light/30 p-2.5 rounded border border-brand-grey-border/25">
                          {s.risks && (
                            <div className="text-[11px]">
                              <span className="text-red-400 font-semibold block">⚠️ Associated Risk:</span>
                              <span className="text-brand-grey-text leading-relaxed">{s.risks}</span>
                            </div>
                          )}
                          {s.diplomaticSensitivity && (
                            <div className="text-[11px]">
                              <span className="text-brand-gold font-semibold block">⚖️ Diplomatic Sensitivity:</span>
                              <span className="text-brand-grey-text leading-relaxed">{s.diplomaticSensitivity}</span>
                            </div>
                          )}
                        </div>
                      )}
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
