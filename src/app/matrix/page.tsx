'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { YPSPillarId, MatrixEntry } from '@/types';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { CopyButton } from '@/components/CopyButton';
import Link from 'next/link';
import { WorkflowStrip } from '@/components/WorkflowStrip';

// YCPS Matrix 2.0 type definitions
export type YCPSMatrixRowId =
  | 'participation'
  | 'protection'
  | 'prevention'
  | 'partnerships'
  | 'disengagement_reintegration'
  | 'youth_agency_leadership';

export type YCPSMatrixColumnId =
  | 'climate_stressor'
  | 'peace_pathway'
  | 'youth_entry'
  | 'protection_safeguard'
  | 'stakeholder_coordination'
  | 'indicator_validation';

export type YCPSCellStatus = 'draft' | 'needs_evidence' | 'needs_protection' | 'ready';

export interface CellData {
  rowId: YCPSMatrixRowId;
  colId: YCPSMatrixColumnId;
  status: YCPSCellStatus;
  whyMatters: string;
  draftAction: string;
  youthRole: string;
  safeguard: string;
  stakeholders: string;
  indicator: string;
  evidenceGap: string;
  validationNote: string;
  priority: number;         // 1-5
  protectionRisk: number;   // 1-5
  feasibility: number;      // 1-5
  evidenceConfidence: number; // 1-5
}

// Default Content Generator mapping context and scenario matrix data to 36 cells
const getInitialCellsData = (matrixEntries: Record<YPSPillarId, MatrixEntry>, contextName: string): Record<string, CellData> => {
  const rows: YCPSMatrixRowId[] = [
    'participation',
    'protection',
    'prevention',
    'partnerships',
    'disengagement_reintegration',
    'youth_agency_leadership'
  ];
  const cols: YCPSMatrixColumnId[] = [
    'climate_stressor',
    'peace_pathway',
    'youth_entry',
    'protection_safeguard',
    'stakeholder_coordination',
    'indicator_validation'
  ];
  
  const data: Record<string, CellData> = {};
  
  rows.forEach(r => {
    const entryKey = r === 'youth_agency_leadership' ? 'participation' : (r as YPSPillarId);
    const entry = matrixEntries[entryKey] || {
      climateSecurityConsideration: '',
      youthRoleAgency: '',
      protectionConcern: '',
      practicalEntryPoint: '',
      suggestedAction: '',
      indicator: '',
      diplomaticWording: '',
      redTeamWarning: ''
    };
    
    cols.forEach(c => {
      const cellKey = `${r}_${c}`;
      let status: YCPSCellStatus = 'draft';
      let whyMatters = '';
      let draftAction = '';
      let youthRole = '';
      let safeguard = '';
      let stakeholders = '';
      let indicator = '';
      let evidenceGap = '';
      let validationNote = '';
      const priority = 3;
      const protectionRisk = 2;
      const feasibility = 3;
      const evidenceConfidence = 3;
      
      const isOfficial = r !== 'youth_agency_leadership';
      const labelRow = isOfficial ? r.charAt(0).toUpperCase() + r.slice(1).replace('_', ' ') : 'Youth Agency Lens';
      
      if (c === 'climate_stressor') {
        whyMatters = `Analyze how climate stressors interact with livelihood and vulnerability factors in ${contextName} under YPS ${labelRow}.`;
        draftAction = entry.climateSecurityConsideration || 'Identify specific climate stressors (e.g. erratic rainfall, crop failure) affecting this pillar.';
        youthRole = 'Youth act as environmental observers and document local climate impacts.';
        safeguard = 'Do not assume environmental stress automatically causes conflict.';
        stakeholders = 'Local weather services, youth cooperatives, farmers.';
        indicator = 'Climate stressor parameters documented in local planning.';
        evidenceGap = 'Localized meteorological data resolution.';
        validationNote = 'Validate climate hazard severity with local agrometeorological reports.';
        status = entry.climateSecurityConsideration ? 'ready' : 'needs_evidence';
      } else if (c === 'peace_pathway') {
        whyMatters = `Map the risk pathway and entry points linking climate shocks to peace and security concerns under YPS ${labelRow}.`;
        draftAction = entry.practicalEntryPoint || 'Establish localized entry points to mitigate risk escalation.';
        youthRole = 'Youth lead community early warning networks and reporting.';
        safeguard = 'Avoid securitizing youth; do not employ them as armed monitors.';
        stakeholders = 'Traditional mediators, local administrative officers, youth leaders.';
        indicator = 'Number of local dialogue sessions conducted.';
        evidenceGap = 'Influence of transhumance seasonal shifts on stability.';
        validationNote = 'Ensure pathway descriptions avoid direct conflict causality and focus on risk compounding.';
        status = entry.practicalEntryPoint ? 'ready' : 'needs_evidence';
      } else if (c === 'youth_entry') {
        whyMatters = `Define opportunities for strengthening youth agency and leadership within YPS ${labelRow}.`;
        draftAction = entry.suggestedAction || 'Strengthen peer-led training and capacity building.';
        youthRole = entry.youthRoleAgency || 'Youth serve as mediators, trainers, and green enterprise leaders.';
        safeguard = 'Ensure youth are supported by elder mentors to avoid intergenerational backlash.';
        stakeholders = 'Ministry technicians, traditional councils, youth groups.';
        indicator = entry.indicator || 'Youth-led initiatives implemented in the target zone.';
        evidenceGap = 'Long-term funding sustainability for youth-led organizations.';
        validationNote = 'Confirm youth-led initiatives align with national youth policies.';
        status = entry.suggestedAction ? 'ready' : 'draft';
      } else if (c === 'protection_safeguard') {
        whyMatters = `Address physical security, protection risks, and gender-responsive safeguards for young participants under YPS ${labelRow}.`;
        draftAction = 'Implement safety measures during youth-led community activities.';
        youthRole = 'Youth design peer-to-peer security briefings and protection maps.';
        safeguard = entry.redTeamWarning || 'Avoid placing youth in high-risk zones without institutional protection.';
        stakeholders = 'Human rights CSOs, protection working groups, youth delegates.';
        indicator = 'Safety protocols adopted for all local consultations.';
        evidenceGap = entry.protectionConcern || 'Gender-differentiated safety risks in transit zones.';
        validationNote = 'Review safeguards with local protection focal points before implementation.';
        status = entry.redTeamWarning ? 'ready' : 'needs_protection';
      } else if (c === 'stakeholder_coordination') {
        whyMatters = `Outline stakeholder coordination structures to ensure national ownership and local buy-in under ${labelRow}.`;
        draftAction = 'Establish joint coordination mechanisms with municipal and traditional authorities.';
        youthRole = 'Youth serve as liaison officers on resource committees.';
        safeguard = 'Respect traditional hierarchies while advocating for youth representation.';
        stakeholders = 'Local administrators, traditional chiefs, youth leaders.';
        indicator = 'Frequency of joint coordination meetings.';
        evidenceGap = 'Alignment of traditional mediation with statutory judicial processes.';
        validationNote = 'Validate coordination protocols with government ministry reps.';
        status = 'draft';
      } else if (c === 'indicator_validation') {
        whyMatters = `Formulate measurable indicators and validation steps to track YCPS implementation in ${labelRow}.`;
        draftAction = 'Track local agreements and youth representation in planning structures.';
        youthRole = 'Youth participate in tracking and monitoring resource distribution.';
        safeguard = 'Do not treat quantitative targets as substitute for qualitative inclusion.';
        stakeholders = 'M&E technicians, youth monitors, traditional council elders.';
        indicator = entry.indicator || 'Percentage of youth reporting meaningful inclusion in resource decisions.';
        evidenceGap = 'Baselines for youth participation rates in formal panels.';
        validationNote = 'Review indicators to ensure they reflect youth, climate, peace and security dimensions.';
        status = entry.indicator ? 'ready' : 'draft';
      }
      
      data[cellKey] = {
        rowId: r,
        colId: c,
        status,
        whyMatters,
        draftAction,
        youthRole,
        safeguard,
        stakeholders,
        indicator,
        evidenceGap,
        validationNote,
        priority,
        protectionRisk,
        feasibility,
        evidenceConfidence
      };
    });
  });
  
  return data;
};

// Automatic Status Logic
const getCellStatus = (cell: CellData, isSaved: boolean): YCPSCellStatus => {
  if (cell.protectionRisk >= 4 || !cell.safeguard?.trim()) {
    return 'needs_protection';
  }
  if (cell.evidenceConfidence <= 2 || !cell.evidenceGap?.trim()) {
    return 'needs_evidence';
  }
  if (isSaved && cell.draftAction?.trim() && cell.indicator?.trim()) {
    return 'ready';
  }
  return 'draft';
};

// Planning Interpretation
const getPlanningInterpretation = (
  priority: number,
  protectionRisk: number,
  feasibility: number,
  evidenceConfidence: number
): string[] => {
  const notes: string[] = [];
  if (priority >= 4 && protectionRisk >= 4) {
    notes.push("⚠️ High priority + high protection risk: Review participation/protection safeguards before implementation.");
  }
  if (priority >= 4 && evidenceConfidence <= 2) {
    notes.push("🔍 High priority + low evidence confidence: Collect or validate evidence before external presentation.");
  }
  if (priority >= 4 && feasibility >= 4) {
    notes.push("✨ High priority + high feasibility: Candidate for Toolkit Package.");
  }
  if (priority >= 4 && feasibility <= 2) {
    notes.push("📌 High priority + low feasibility: Flag for phased planning or partner support.");
  }
  if (notes.length === 0) {
    notes.push("💡 Continue refinement and contextual validation.");
  }
  return notes;
};

export default function MatrixPage() {
  const { matrixEntries, updateMatrixEntry, contextName } = useApp();
  
  const [cells, setCells] = useState<Record<string, CellData>>({});
  const [savedCells, setSavedCells] = useState<Record<string, boolean>>({});
  const [activeRow, setActiveRow] = useState<YCPSMatrixRowId>('participation');
  const [activeCol, setActiveCol] = useState<YCPSMatrixColumnId>('climate_stressor');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string>('');

  // Synchronize scenario switches
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ycps_matrix_2_cells');
      const storedSaved = localStorage.getItem('ycps_matrix_2_saved');
      const storedContext = localStorage.getItem('ycps_matrix_2_context');
      
      let initialCells: Record<string, CellData> = {};
      let initialSaved: Record<string, boolean> = {};
      
      if (stored && storedContext === contextName) {
        try {
          initialCells = JSON.parse(stored);
          initialSaved = storedSaved ? JSON.parse(storedSaved) : {};
        } catch (e) {
          console.error(e);
        }
      }
      
      if (Object.keys(initialCells).length === 0) {
        initialCells = getInitialCellsData(matrixEntries, contextName);
        initialSaved = {};
        localStorage.setItem('ycps_matrix_2_cells', JSON.stringify(initialCells));
        localStorage.setItem('ycps_matrix_2_saved', JSON.stringify(initialSaved));
        localStorage.setItem('ycps_matrix_2_context', contextName);
      }
      
      setTimeout(() => {
        setCells(initialCells);
        setSavedCells(initialSaved);
        setIsLoaded(true);
      }, 0);
    }
  }, [contextName, matrixEntries]);

  // Save specific cell details immediately in component state and localStorage
  const handleCellFieldChange = (field: keyof CellData, value: string | number) => {
    const cellKey = `${activeRow}_${activeCol}`;
    setCells((prev) => {
      const updated = {
        ...prev,
        [cellKey]: {
          ...prev[cellKey],
          [field]: value
        }
      };
      localStorage.setItem('ycps_matrix_2_cells', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCellClick = (rowId: YCPSMatrixRowId, colId: YCPSMatrixColumnId) => {
    setActiveRow(rowId);
    setActiveCol(colId);
  };

  const handleSaveCell = () => {
    const cellKey = `${activeRow}_${activeCol}`;
    const cell = cells[cellKey];
    if (!cell) return;
    
    // 1. Mark as saved
    const updatedSaved = {
      ...savedCells,
      [cellKey]: true
    };
    setSavedCells(updatedSaved);
    localStorage.setItem('ycps_matrix_2_saved', JSON.stringify(updatedSaved));
    
    // Save cells list
    localStorage.setItem('ycps_matrix_2_cells', JSON.stringify(cells));
    
    // 2. Synchronize compatible legacy fields if row is an official YPS pillar
    const isOfficial = activeRow !== 'youth_agency_leadership';
    if (isOfficial) {
      updateMatrixEntry(activeRow as YPSPillarId, {
        climateSecurityConsideration: cell.whyMatters,
        suggestedAction: cell.draftAction,
        youthRoleAgency: cell.youthRole,
        protectionConcern: cell.safeguard,
        indicator: cell.indicator
      });
    }
    
    setCopyFeedback('Cell saved and synchronized to global workspace!');
    setTimeout(() => setCopyFeedback(''), 3000);
  };

  const handleCopyCellNote = () => {
    const cellKey = `${activeRow}_${activeCol}`;
    const cell = cells[cellKey];
    if (!cell) return;
    
    const rowName = rows.find(r => r.id === activeRow)?.name || activeRow;
    const colName = cols.find(c => c.id === activeCol)?.name || activeCol;
    const isSaved = !!savedCells[cellKey];
    const statusText = getCellStatus(cell, isSaved).replace(/_/g, ' ').toUpperCase();
    
    const scoresText = `Priority: ${cell.priority}/5 | Protection Risk: ${cell.protectionRisk}/5 | Feasibility: ${cell.feasibility}/5 | Evidence Confidence: ${cell.evidenceConfidence}/5`;
    const interpretation = getPlanningInterpretation(cell.priority, cell.protectionRisk, cell.feasibility, cell.evidenceConfidence).join(" ");
    
    const note = `=== YCPS MATRIX 2.0 CELL ANALYSIS ===
Context: ${contextName}
Intersection: ${rowName} x ${colName}
Status: ${statusText}

1. Why this intersection matters:
${cell.whyMatters}

2. Draft practical action:
${cell.draftAction}

3. Youth agency role:
${cell.youthRole}

4. Participation/protection safeguard:
${cell.safeguard}

5. Stakeholders to involve:
${cell.stakeholders}

6. Draft M&E indicator:
${cell.indicator}

7. Evidence gap:
${cell.evidenceGap}

8. Validation note:
${cell.validationNote}

Scores:
${scoresText}

Planning Interpretation:
${interpretation}

---
*Disclaimer: Draft support only. Not an official CCCPA, DEDI, UN, or government output. Validate against official sources, country context, and institutional guidance before use.*`;

    navigator.clipboard.writeText(note);
    setCopyFeedback('Cell note copied to clipboard!');
    setTimeout(() => setCopyFeedback(''), 3000);
  };

  const handleCopyForToolkit = () => {
    const cellKey = `${activeRow}_${activeCol}`;
    const cell = cells[cellKey];
    if (!cell) return;
    
    const rowName = rows.find(r => r.id === activeRow)?.name || activeRow;
    const colName = cols.find(c => c.id === activeCol)?.name || activeCol;
    
    const note = `=== TOOLKIT PACKAGE ENTRY: ${rowName.toUpperCase()} x ${colName.toUpperCase()} ===
Context: ${contextName}
Action: ${cell.draftAction}
Youth Role: ${cell.youthRole}
Safeguard: ${cell.safeguard}
Indicator: ${cell.indicator}
Validation: ${cell.validationNote}`;

    navigator.clipboard.writeText(note);
    setCopyFeedback('Copied for Toolkit Package!');
    setTimeout(() => setCopyFeedback(''), 3000);
  };

  const renderPlanningInterpretation = (cellItem: CellData) => {
    const notes = getPlanningInterpretation(
      cellItem.priority,
      cellItem.protectionRisk,
      cellItem.feasibility,
      cellItem.evidenceConfidence
    );
    return (
      <div className="p-3.5 rounded-lg bg-brand-navy-dark border border-brand-grey-border/30 space-y-2">
        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block">Planning interpretation</span>
        <div className="space-y-1.5 text-xs leading-normal">
          {notes.map((note, idx) => (
            <p key={idx} className="text-brand-offwhite">{note}</p>
          ))}
        </div>
      </div>
    );
  };

  // Structural rows definition
  const rows = [
    { id: 'participation', name: 'Participation', desc: 'Active inclusion of youth in governance and resource decisions.', isOfficial: true },
    { id: 'protection', name: 'Protection', desc: 'Ensuring physical safety, GBV reduction, and human rights.', isOfficial: true },
    { id: 'prevention', name: 'Prevention', desc: 'Addressing context-specific risk factors and livelihood pressures.', isOfficial: true },
    { id: 'partnerships', name: 'Partnerships', desc: 'Collaborations with national agencies, regional bodies, and CSOs.', isOfficial: true },
    { id: 'disengagement_reintegration', name: 'Disengagement & Reintegration', desc: 'Supporting demobilization and green economic return options.', isOfficial: true },
    { id: 'youth_agency_leadership', name: 'Youth Agency / Leadership', desc: 'Strengthening youth leadership, innovation, and mediation capacity.', isOfficial: false }
  ];

  // Structural columns definition
  const cols = [
    { id: 'climate_stressor', name: 'Climate-Related Stressor', label: 'Climate Stressor' },
    { id: 'peace_pathway', name: 'Peace and Security Pathway', label: 'Peace Pathway' },
    { id: 'youth_entry', name: 'Youth Agency Entry Point', label: 'Youth Entry' },
    { id: 'protection_safeguard', name: 'Participation/Protection Safeguard', label: 'Safeguard' },
    { id: 'stakeholder_coordination', name: 'Stakeholder Coordination', label: 'Coordination' },
    { id: 'indicator_validation', name: 'Indicator / Validation Need', label: 'Indicator' }
  ];

  // Starter recommended cells mapping
  const starterCells = [
    { rowId: 'participation', colId: 'protection_safeguard', label: 'Participation × Safeguard' },
    { rowId: 'youth_agency_leadership', colId: 'youth_entry', label: 'Youth Agency Lens × Youth Entry' },
    { rowId: 'protection', colId: 'protection_safeguard', label: 'Protection × Safeguard' },
    { rowId: 'partnerships', colId: 'stakeholder_coordination', label: 'Partnerships × Coordination' },
    { rowId: 'prevention', colId: 'indicator_validation', label: 'Prevention × Indicator' }
  ] as const;

  const activePillarId = activeRow === 'youth_agency_leadership' ? 'participation' : (activeRow as YPSPillarId);
  
  // Existing Practical card entries mapping
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

  const helperText = getPillarHelperText(activePillarId);
  const activeCellKey = `${activeRow}_${activeCol}`;
  const cell = cells[activeCellKey];

  return (
    <div className="space-y-6">
      {/* Workflow Strip */}
      <WorkflowStrip currentStep="matrix" />

      {/* This step produces box */}
      <div className="glass-panel p-4 rounded-xl border border-brand-gold/25 bg-gradient-to-r from-brand-navy-light/40 to-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs no-print">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block">📋 This Step Produces:</span>
          <p className="text-brand-grey-text">
            <strong>Task:</strong> Analyze climate security dimensions and youth agency parameters across YPS matrix intersections. <br />
            <strong>Deliverable:</strong> Contextualized cell actions, safeguards, M&E indicators, and validation checklists.
          </p>
        </div>
        <Link
          href="/risk-pathways"
          className="shrink-0 px-4 py-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-bold rounded-lg text-xs uppercase tracking-wider text-center transition-all cursor-pointer"
        >
          Next: Map Risk Pathway →
        </Link>
      </div>

      {/* How to Use Box & Starters Panel */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2 glass-panel p-4 rounded-xl border border-brand-gold/15 bg-brand-navy-light/20 text-xs text-brand-grey-text space-y-2">
          <h3 className="font-bold text-brand-gold uppercase tracking-wider text-[11px]">How to use this matrix</h3>
          <p className="leading-relaxed">
            Click an intersection between a YPS pillar and a CPS planning dimension. Use the workspace below to turn that intersection into a draft action, youth agency role, participation/protection safeguard, indicator, evidence gap, and validation note.
          </p>
          <p className="text-brand-offwhite font-medium text-[11px] italic">
            💡 You do not need to complete all 36 cells. Start with the most relevant intersections for your context. Selected cells can feed the Toolkit Builder and final package.
          </p>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-brand-grey-border/30 bg-slate-900/40 text-xs space-y-2">
          <h3 className="font-bold text-brand-offwhite uppercase tracking-wider text-[11px]">Recommended starter cells</h3>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {starterCells.map((starter, idx) => {
              const active = activeRow === starter.rowId && activeCol === starter.colId;
              return (
                <button
                  key={idx}
                  onClick={() => handleCellClick(starter.rowId, starter.colId)}
                  className={`text-[9px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all text-left cursor-pointer ${
                    active
                      ? 'bg-brand-gold text-brand-navy-dark border-brand-gold font-bold'
                      : 'bg-brand-navy-light/40 text-brand-grey-text border-brand-grey-border/20 hover:text-brand-offwhite hover:border-brand-grey-border/40'
                  }`}
                >
                  {starter.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-grey-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-brand-offwhite">
            YCPS Integration Matrix 2.0
          </h1>
          <p className="text-xs text-brand-grey-text mt-1">
            Map climate-security pathways and design youth-inclusive safeguards across pillars.
          </p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-lg bg-brand-navy-light border border-brand-grey-border font-medium text-brand-gold self-start">
          Context: {contextName}
        </div>
      </div>

      {/* Interactive Matrix Workspace Grid */}
      <div className="grid xl:grid-cols-3 gap-6">
        
        {/* Visual 6x6 Grid & Selected-Cell Workspace */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Main Visual Matrix Container */}
          <div className="overflow-x-auto border border-brand-grey-border/30 rounded-xl bg-slate-900/40 p-1 no-print">
            <table className="min-w-[900px] w-full text-xs text-brand-offwhite border-collapse">
              <thead>
                <tr className="border-b border-brand-grey-border/30 bg-brand-navy-dark/60">
                  <th className="p-3 text-left font-semibold text-brand-gold w-[16%]">YPS Pillar / Lens</th>
                  {cols.map((col) => (
                    <th key={col.id} className="p-3 text-left font-semibold text-brand-grey-text tracking-wide text-[10px] w-[14%]">
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-grey-border/20">
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`${
                      !row.isOfficial
                        ? 'bg-brand-navy-light/10 border-t border-brand-gold/20'
                        : 'bg-transparent'
                    }`}
                  >
                    {/* Row Header */}
                    <td className="p-3 align-middle font-medium border-r border-brand-grey-border/25">
                      <div className="space-y-1">
                        <span className="font-bold text-brand-offwhite block leading-tight">{row.name}</span>
                        {!row.isOfficial ? (
                          <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-brand-gold/10 text-brand-gold border border-brand-gold/20 uppercase tracking-widest block w-max">
                            Cross-cutting Lens
                          </span>
                        ) : (
                          <span className="text-[8px] font-semibold text-brand-grey-text/75 uppercase tracking-wider block">
                            YPS Pillar
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Intersection Cells */}
                    {cols.map((col) => {
                      const cellKey = `${row.id}_${col.id}`;
                      const cellItem = cells[cellKey];
                      if (!cellItem) {
                        return <td key={cellKey} className="p-3 border border-brand-grey-border/20 bg-brand-navy-dark/10"></td>;
                      }
                      
                      const isSelected = activeRow === row.id && activeCol === col.id;
                      const isSaved = !!savedCells[cellKey];
                      const status = getCellStatus(cellItem, isSaved);
                      
                      let statusText = "Draft";
                      let statusDotColor = "bg-brand-grey-text";
                      let statusBg = "bg-brand-navy-dark/20";
                      let statusBorder = "border-brand-grey-border/20";
                      
                      if (status === 'needs_protection') {
                        statusText = "Protection Review";
                        statusDotColor = "bg-red-400";
                        statusBg = "bg-red-950/15";
                        statusBorder = "border-red-900/30";
                      } else if (status === 'needs_evidence') {
                        statusText = "Needs Evidence";
                        statusDotColor = "bg-brand-gold";
                        statusBg = "bg-brand-gold/5";
                        statusBorder = "border-brand-gold/20";
                      } else if (status === 'ready') {
                        statusText = "Ready for Review";
                        statusDotColor = "bg-brand-green";
                        statusBg = "bg-brand-green/5";
                        statusBorder = "border-brand-green/20";
                      }

                      return (
                        <td
                          key={cellKey}
                          onClick={() => handleCellClick(row.id as YCPSMatrixRowId, col.id as YCPSMatrixColumnId)}
                          className={`p-3 border border-brand-grey-border/20 transition-all cursor-pointer text-left align-top select-none ${statusBg} ${
                            isSelected
                              ? 'ring-2 ring-brand-gold bg-brand-navy-light/65 border-transparent shadow-lg shadow-brand-gold/10 z-10'
                              : 'hover:bg-brand-navy-light/25'
                          }`}
                        >
                          <div className="flex flex-col justify-between h-full min-h-[55px] gap-2">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[8px] text-brand-grey-text font-bold uppercase">
                                {row.id.slice(0, 4)}×{col.id.slice(0, 4)}
                              </span>
                              <span className={`flex items-center gap-1 text-[8px] font-bold px-1 py-0.2 rounded border ${statusBorder} ${statusDotColor.replace('bg-', 'text-')}`}>
                                <span className={`h-1 w-1 rounded-full ${statusDotColor}`} />
                                {statusText}
                              </span>
                            </div>
                            <p className="text-[10px] text-brand-offwhite leading-relaxed line-clamp-1">
                              {cellItem.draftAction || '(No action drafted)'}
                            </p>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Selected Cell Detail Workspace */}
          {isLoaded && cell ? (
            <div className="glass-panel p-6 rounded-xl border border-brand-grey-border/60 space-y-6">
              
              {/* Workspace Workspace Header */}
              <div className="flex justify-between items-start border-b border-brand-grey-border/30 pb-3.5 gap-4">
                <div>
                  <h2 className="text-sm font-bold text-brand-gold uppercase tracking-wider flex items-center gap-2">
                    Selected Cell Workspace
                  </h2>
                  <p className="text-xs text-brand-grey-text mt-1">
                    Editing: <span className="text-brand-offwhite font-bold">{rows.find(r => r.id === activeRow)?.name}</span> × <span className="text-brand-offwhite font-bold">{cols.find(c => c.id === activeCol)?.name}</span>
                  </p>
                </div>
                
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                  getCellStatus(cell, !!savedCells[activeCellKey]) === 'needs_protection'
                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                    : getCellStatus(cell, !!savedCells[activeCellKey]) === 'needs_evidence'
                    ? 'bg-brand-gold/10 text-brand-gold border-brand-gold/20'
                    : getCellStatus(cell, !!savedCells[activeCellKey]) === 'ready'
                    ? 'bg-brand-green/20 text-brand-green border-brand-green/30'
                    : 'bg-brand-navy-light text-brand-grey-text border-brand-grey-border/20'
                }`}>
                  Status: {getCellStatus(cell, !!savedCells[activeCellKey]).replace(/_/g, ' ').toUpperCase()}
                </span>
              </div>

              {/* Editable Text Fields */}
              <div className="grid md:grid-cols-2 gap-5 text-xs">
                
                {/* Matters */}
                <div className="space-y-1">
                  <label htmlFor="cell-matters" className="block font-semibold text-brand-offwhite">
                    1. Why this intersection matters
                  </label>
                  <textarea
                    id="cell-matters"
                    value={cell.whyMatters}
                    onChange={(e) => handleCellFieldChange('whyMatters', e.target.value)}
                    rows={2}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2.5 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* Practical Action */}
                <div className="space-y-1">
                  <label htmlFor="cell-action" className="block font-semibold text-brand-offwhite">
                    2. Draft practical action
                  </label>
                  <textarea
                    id="cell-action"
                    value={cell.draftAction}
                    onChange={(e) => handleCellFieldChange('draftAction', e.target.value)}
                    rows={2}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2.5 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* Youth Role */}
                <div className="space-y-1">
                  <label htmlFor="cell-youth-role" className="block font-semibold text-brand-offwhite">
                    3. Youth agency role
                  </label>
                  <textarea
                    id="cell-youth-role"
                    value={cell.youthRole}
                    onChange={(e) => handleCellFieldChange('youthRole', e.target.value)}
                    rows={2}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2.5 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* Safeguard */}
                <div className="space-y-1">
                  <label htmlFor="cell-safeguard" className="block font-semibold text-brand-offwhite">
                    4. Participation/protection safeguard
                  </label>
                  <textarea
                    id="cell-safeguard"
                    value={cell.safeguard}
                    onChange={(e) => handleCellFieldChange('safeguard', e.target.value)}
                    rows={2}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2.5 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* Stakeholders */}
                <div className="space-y-1">
                  <label htmlFor="cell-stakeholders" className="block font-semibold text-brand-offwhite">
                    5. Stakeholders to involve
                  </label>
                  <textarea
                    id="cell-stakeholders"
                    value={cell.stakeholders}
                    onChange={(e) => handleCellFieldChange('stakeholders', e.target.value)}
                    rows={2}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2.5 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* Indicator */}
                <div className="space-y-1">
                  <label htmlFor="cell-indicator" className="block font-semibold text-brand-offwhite">
                    6. Draft M&E indicator
                  </label>
                  <textarea
                    id="cell-indicator"
                    value={cell.indicator}
                    onChange={(e) => handleCellFieldChange('indicator', e.target.value)}
                    rows={2}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2.5 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* Evidence Gap */}
                <div className="space-y-1">
                  <label htmlFor="cell-evidence-gap" className="block font-semibold text-brand-offwhite">
                    7. Evidence gap (Assumptions / Data lack)
                  </label>
                  <textarea
                    id="cell-evidence-gap"
                    value={cell.evidenceGap}
                    onChange={(e) => handleCellFieldChange('evidenceGap', e.target.value)}
                    rows={2}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2.5 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* Validation Note */}
                <div className="space-y-1">
                  <label htmlFor="cell-validation-note" className="block font-semibold text-brand-offwhite">
                    8. Validation note
                  </label>
                  <textarea
                    id="cell-validation-note"
                    value={cell.validationNote}
                    onChange={(e) => handleCellFieldChange('validationNote', e.target.value)}
                    rows={2}
                    className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2.5 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

              </div>

              {/* Advanced Section for Official Pillars */}
              {activeRow !== 'youth_agency_leadership' && (
                <details className="border border-brand-grey-border/30 rounded-lg p-3 bg-brand-navy-dark/30 select-none text-xs">
                  <summary className="font-bold text-brand-gold cursor-pointer outline-none uppercase tracking-wider text-[10px]">
                    Advanced Legacy Integration Fields (Optional)
                  </summary>
                  <div className="grid md:grid-cols-2 gap-4 mt-3 text-xs">
                    <div className="space-y-1">
                      <span className="block font-semibold text-brand-offwhite">Practical Entry Point</span>
                      <textarea
                        value={matrixEntries[activeRow as YPSPillarId]?.practicalEntryPoint || ''}
                        onChange={(e) => updateMatrixEntry(activeRow as YPSPillarId, { practicalEntryPoint: e.target.value })}
                        rows={2}
                        className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2 focus:outline-none resize-none leading-normal"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="block font-semibold text-brand-offwhite">Diplomatic Wording</span>
                      <textarea
                        value={matrixEntries[activeRow as YPSPillarId]?.diplomaticWording || ''}
                        onChange={(e) => updateMatrixEntry(activeRow as YPSPillarId, { diplomaticWording: e.target.value })}
                        rows={2}
                        className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2 focus:outline-none resize-none leading-normal"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="block font-semibold text-brand-offwhite">Red-Team Warning</span>
                      <textarea
                        value={matrixEntries[activeRow as YPSPillarId]?.redTeamWarning || ''}
                        onChange={(e) => updateMatrixEntry(activeRow as YPSPillarId, { redTeamWarning: e.target.value })}
                        rows={2}
                        className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2 focus:outline-none resize-none leading-normal"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="block font-semibold text-brand-offwhite">Implementation Output</span>
                      <select
                        value={matrixEntries[activeRow as YPSPillarId]?.implementationOutput || ''}
                        onChange={(e) => updateMatrixEntry(activeRow as YPSPillarId, { implementationOutput: e.target.value })}
                        className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-2 focus:outline-none cursor-pointer"
                      >
                        <option value="">-- Select Practical Output Type --</option>
                        <option value="policy_entry_point">Policy Entry Point</option>
                        <option value="youth_participation">Youth Participation Mechanism</option>
                        <option value="protection_safeguard">Protection Safeguard</option>
                        <option value="prevention_resilience">Prevention/Resilience Action</option>
                        <option value="partnership_model">Partnership Model</option>
                        <option value="reintegration_pathway">Reintegration/Livelihood Pathway</option>
                      </select>
                    </div>
                  </div>
                </details>
              )}

              <hr className="border-brand-grey-border/40" />

              {/* Scoring & Computing Sliders */}
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                {/* 1. Priority */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-brand-offwhite">Priority</span>
                    <span className="font-bold text-brand-gold text-sm">{cell.priority} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={cell.priority}
                    onChange={(e) => handleCellFieldChange('priority', parseInt(e.target.value))}
                    className="w-full h-1 bg-brand-navy-dark rounded-lg appearance-none cursor-pointer accent-brand-gold"
                  />
                  <div className="flex justify-between text-[9px] text-brand-grey-text/70 uppercase">
                    <span>Low Relevance</span>
                    <span>Critical</span>
                  </div>
                </div>

                {/* 2. Protection Risk */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-brand-offwhite">Protection Risk</span>
                    <span className="font-bold text-brand-gold text-sm">{cell.protectionRisk} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={cell.protectionRisk}
                    onChange={(e) => handleCellFieldChange('protectionRisk', parseInt(e.target.value))}
                    className="w-full h-1 bg-brand-navy-dark rounded-lg appearance-none cursor-pointer accent-brand-gold"
                  />
                  <div className="flex justify-between text-[9px] text-brand-grey-text/70 uppercase">
                    <span>Low Risk</span>
                    <span>High Risk</span>
                  </div>
                </div>

                {/* 3. Feasibility */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-brand-offwhite">Feasibility</span>
                    <span className="font-bold text-brand-gold text-sm">{cell.feasibility} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={cell.feasibility}
                    onChange={(e) => handleCellFieldChange('feasibility', parseInt(e.target.value))}
                    className="w-full h-1 bg-brand-navy-dark rounded-lg appearance-none cursor-pointer accent-brand-gold"
                  />
                  <div className="flex justify-between text-[9px] text-brand-grey-text/70 uppercase">
                    <span>Difficult</span>
                    <span>Feasible</span>
                  </div>
                </div>

                {/* 4. Evidence Confidence */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-brand-offwhite">Evidence Confidence</span>
                    <span className="font-bold text-brand-gold text-sm">{cell.evidenceConfidence} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={cell.evidenceConfidence}
                    onChange={(e) => handleCellFieldChange('evidenceConfidence', parseInt(e.target.value))}
                    className="w-full h-1 bg-brand-navy-dark rounded-lg appearance-none cursor-pointer accent-brand-gold"
                  />
                  <div className="flex justify-between text-[9px] text-brand-grey-text/70 uppercase">
                    <span>Assumption</span>
                    <span>Evidence-based</span>
                  </div>
                </div>
              </div>

              {/* Planning Interpretation Output */}
              {renderPlanningInterpretation(cell)}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSaveCell}
                  className="flex-1 px-4 py-2.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-bold rounded-lg text-xs uppercase tracking-wider text-center transition-all cursor-pointer shadow-md shadow-brand-gold/10"
                >
                  Save cell to workspace
                </button>
                <button
                  type="button"
                  onClick={handleCopyCellNote}
                  className="flex-1 px-4 py-2.5 bg-brand-navy-light hover:bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border rounded-lg text-xs font-bold tracking-wider uppercase text-center transition-all cursor-pointer"
                >
                  Copy selected cell note
                </button>
                <button
                  type="button"
                  onClick={handleCopyForToolkit}
                  className="flex-1 px-4 py-2.5 border border-brand-grey-border hover:bg-brand-navy-light text-brand-grey-text hover:text-brand-offwhite rounded-lg text-xs font-bold tracking-wider uppercase text-center transition-all cursor-pointer"
                >
                  Copy for Toolkit Package
                </button>
                <Link
                  href="/risk-pathways"
                  className="flex-grow px-4 py-2.5 bg-brand-navy-light border border-brand-gold/20 hover:border-brand-gold text-brand-gold rounded-lg text-xs font-bold tracking-wider uppercase text-center transition-all"
                >
                  Next: Map Risk Pathway
                </Link>
              </div>

              {/* Temporary copy/save indicator */}
              {copyFeedback && (
                <div className="text-[10px] text-brand-gold text-center italic mt-2 animate-pulse">
                  {copyFeedback}
                </div>
              )}

            </div>
          ) : (
            <div className="glass-panel p-6 rounded-xl border border-brand-grey-border/60 text-xs text-brand-grey-text text-center italic">
              Loading YCPS Matrix 2.0 workspace cells...
            </div>
          )}

        </div>

        {/* Legacy right-hand panel (Source Guidance, Live card, and integrity panel) */}
        <div className="space-y-6">
          {/* Source Integrity Panel */}
          <SourceIntegrityPanel sourceId="tor" />

          {/* Practical Output Card */}
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
                  Mainstream the generated strategic recommendations and localized indicators into municipal plans or regional climate, peace and security programming briefings.
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
                    {matrixEntries[activePillarId]?.diplomaticWording || matrixEntries[activePillarId]?.suggestedAction
                      ? `For YPS ${rows.find((r) => r.id === activePillarId)?.name} (output: ${matrixEntries[activePillarId]?.implementationOutput || 'action'}): ${matrixEntries[activePillarId]?.diplomaticWording || matrixEntries[activePillarId]?.suggestedAction}. ${matrixEntries[activePillarId]?.redTeamWarning ? `[Safeguard: ${matrixEntries[activePillarId]?.redTeamWarning}]` : ''}`
                      : 'Complete inputs on the left to compile.'}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-brand-offwhite block mb-0.5">M&E Indicator:</span>
                  <p className="text-[11px] text-brand-grey-text font-mono bg-brand-navy-dark/45 p-2 rounded border border-brand-grey-border/20">
                    {matrixEntries[activePillarId]?.indicator || 'Not specified'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 no-print">
                <CopyButton
                  text={matrixEntries[activePillarId]?.diplomaticWording || matrixEntries[activePillarId]?.suggestedAction
                    ? `For YPS ${rows.find((r) => r.id === activePillarId)?.name} (output: ${matrixEntries[activePillarId]?.implementationOutput || 'action'}): ${matrixEntries[activePillarId]?.diplomaticWording || matrixEntries[activePillarId]?.suggestedAction}. ${matrixEntries[activePillarId]?.redTeamWarning ? `[Safeguard: ${matrixEntries[activePillarId]?.redTeamWarning}]` : ''}`
                    : ''}
                  label="Copy Matrix Recommendation"
                  className="w-full justify-center"
                />
                <CopyButton
                  text={matrixEntries[activePillarId]?.indicator || ''}
                  label="Copy M&E Indicator"
                  className="w-full justify-center"
                />
              </div>

              <div className="border-t border-brand-grey-border/30 pt-2.5 text-[9px] text-brand-gold/90 italic leading-relaxed">
                * Draft planning output. To be validated against official regional mandates and context-specific field evidence before deployment.
              </div>
            </div>
          </div>

          {/* Next Steps Guidance */}
          <div className="glass-panel p-5 rounded-xl border border-brand-gold/25 bg-gradient-to-br from-brand-navy-light/45 to-slate-900 space-y-3 no-print">
            <div className="flex items-center gap-1.5 border-b border-brand-grey-border/30 pb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
              <h4 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider">
                Next-Step Action Guidance
              </h4>
            </div>

            <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-brand-grey-text/60 font-semibold px-1 py-0.5 bg-brand-navy-dark/45 border border-brand-grey-border/20 rounded-md">
              <span className="text-brand-gold">1. Input</span>
              <span>→</span>
              <span className="text-brand-gold">2. Output</span>
              <span>→</span>
              <span className="text-brand-offwhite font-bold">3. Review</span>
              <span>→</span>
              <span>4. Export</span>
            </div>

            <p className="text-[11px] text-brand-grey-text leading-relaxed">
              After editing a YPS pillar entry, review the Practical Output card. It turns your input into a draft recommendation, M&E indicator, and validation note. Then copy the output, review it, or connect it to the toolkit/workplan.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <Link
                href="/review"
                className="flex-1 px-3 py-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-bold rounded-md text-[10px] tracking-wider uppercase text-center transition-all cursor-pointer"
              >
                Run Red-Team Review
              </Link>
              <Link
                href="/toolkit"
                className="flex-1 px-3 py-2 bg-brand-navy-light hover:bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border rounded-md text-[10px] font-bold tracking-wider uppercase text-center transition-all cursor-pointer"
              >
                Open Toolkit Builder
              </Link>
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
