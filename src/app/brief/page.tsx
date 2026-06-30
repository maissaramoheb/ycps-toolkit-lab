'use client';

import React, { useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { CopyButton } from '@/components/CopyButton';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { getPrintContextLabel, printWithDocumentTitle } from '@/lib/printUtils';

export default function BriefGeneratorPage() {
  const { matrixEntries, riskPathways, stakeholders, contextName } = useApp();
  const printAreaRef = useRef<HTMLDivElement>(null);

  // Compile Brief Sections
  const activePillars = Object.values(matrixEntries).filter(
    (e) => e.climateSecurityConsideration.trim() !== '' || e.youthRoleAgency.trim() !== ''
  );

  // Executive Summary
  const getExecutiveSummary = () => {
    if (activePillars.length === 0 && riskPathways.length === 0) {
      return 'No active analytical entries found. Please load a demo scenario or enter data in the Matrix and Risk Pathway modules to compile this briefing.';
    }
    
    return `This brief outlines strategic programming recommendations for ${contextName}. By integrating the Youth, Peace and Security (YPS) and Climate, Peace and Security (CPS) agendas, this analysis identifies ${riskPathways.length} draft climate-security risk pathways and maps ${stakeholders.length} key stakeholders. The working analysis suggests that youth are not merely vulnerable demographics or security risks, but primary agents of local adaptation, early warning, and community mediation. A proposed approach for review is embedding youth representatives into formal natural resource management committees while mitigating specific protection risks and intergenerational tensions.`;
  };

  // Compile full markdown version for clipboard copying
  const compileMarkdown = () => {
    let md = `# YCPS POLICY BRIEF: STRATEGIC RECOMMENDATIONS FOR ${contextName.toUpperCase()}\n\n`;
    md += `**Generated via YCPS Toolkit Lab**\n`;
    md += `*Prototype Support Tool — Not an official UN, CCCPA, DEDI, or Government Platform*\n\n`;
    md += `---\n\n`;

    md += `## 1. Executive Summary (Suggested Draft Language)\n${getExecutiveSummary()}\n\n`;

    md += `## 2. Context Analysis (User Working Notes)\nThis briefing analyzes the context-specific climate-security risk relationships specifically affecting the ${contextName} region, mapping resource-scarcity pressure points to youth-inclusive resilience options.\n\n`;

    md += `## 3. Climate-Security Risk Pathways (To Be Validated where evidence is Low/Unclear)\n`;
    if (riskPathways.length === 0) {
      md += `*No risk pathways mapped.*\n\n`;
    } else {
      riskPathways.forEach((p, idx) => {
        const isToValidate = p.evidenceStrength === 'Low' || p.evidenceStrength === 'Unclear';
        md += `### Pathway ${idx + 1}: ${p.hazard} - risk relationship: ${p.pathwayType.replace('_', ' ')} ${isToValidate ? '[TO BE VALIDATED]' : ''}\n`;
        md += `- **Context/Location:** ${p.context}\n`;
        md += `- **Exposure & Vulnerability:** ${p.exposure || 'Not specified'} | ${p.vulnerability || 'Not specified'}\n`;
        md += `- **Governance Constraint (User Notes):** ${p.capacityConstraint || 'None'}\n`;
        md += `- **Youth-Specific Impact:** ${p.youthImpact || 'Not specified'}\n`;
        md += `- **Youth-Led Opportunity (Agency):** ${p.youthOpportunity || 'Not specified'}\n`;
        md += `- **Prevention/Resilience Intervention (Suggested Draft):** ${p.intervention || 'Not specified'}\n`;
        md += `- **Evidence Strength:** ${p.evidenceStrength} (Gap: ${p.evidenceGaps || 'None'})\n\n`;
      });
    }

    md += `## 4. CPS × YPS Integration Findings (Suggested Draft Language)\n`;
    if (activePillars.length === 0) {
      md += `*No integration findings entered in the matrix.*\n\n`;
    } else {
      activePillars.forEach((e) => {
        const pillarName = e.pillarId.charAt(0).toUpperCase() + e.pillarId.slice(1).replace('_', ' ');
        md += `### Pillar: ${pillarName}\n`;
        md += `- **Climate-Security Aspect (User Notes):** ${e.climateSecurityConsideration}\n`;
        md += `- **Youth Role & Agency:** ${e.youthRoleAgency}\n`;
        md += `- **Protection Concerns:** ${e.protectionConcern || 'None identified'}\n`;
        md += `- **Practical Entry Point:** ${e.practicalEntryPoint || 'Not specified'}\n`;
        md += `- **Suggested Action (Suggested Draft):** ${e.suggestedAction}\n\n`;
      });
    }

    md += `## 5. Stakeholder and Partnership Considerations (User Working Notes)\n`;
    if (stakeholders.length === 0) {
      md += `*No stakeholders mapped.*\n\n`;
    } else {
      md += `### Primary Actor Matrix\n`;
      stakeholders.forEach((s) => {
        md += `- **${s.name}** (${s.actorType.replace('_', ' ')}): Interest: ${s.interest} | Influence: ${s.influence} | Alignment: ${s.position} | Youth Inclusion: ${s.youthInclusionQuality}\n`;
        md += `  * *Strategy:* ${s.engagementStrategy || 'Not specified'}\n`;
        if (s.risks || s.diplomaticSensitivity) {
          md += `  * *Diplomatic Note:* ${s.risks || ''} ${s.diplomaticSensitivity ? '| ' + s.diplomaticSensitivity : ''}\n`;
        }
      });
      md += `\n\n`;
    }

    md += `## 6. Priority Recommendations (Suggested Draft Language)\n`;
    const recs = activePillars.map((e) => e.suggestedAction).filter(Boolean);
    const pathRecs = riskPathways.map((p) => p.intervention).filter(Boolean);
    const allRecs = [...recs, ...pathRecs];
    if (allRecs.length === 0) {
      md += `*No priority recommendations compiled.*\n\n`;
    } else {
      allRecs.forEach((r, idx) => {
        md += `${idx + 1}. ${r}\n`;
      });
      md += `\n`;
    }

    md += `## 7. M&E Indicators (Suggested Draft Language)\n`;
    const inds = activePillars.map((e) => e.indicator).filter(Boolean);
    if (inds.length === 0) {
      md += `*No indicators defined.*\n\n`;
    } else {
      inds.forEach((i, idx) => {
        md += `- Indicator ${idx + 1}: ${i}\n`;
      });
      md += `\n`;
    }

    md += `## 8. Diplomatic Language Notes (Source-Based Guidance)\n`;
    const diplos = activePillars.map((e) => e.diplomaticWording).filter(Boolean);
    if (diplos.length === 0) {
      md += `*No strategic diplomatic phrases formulated. Please follow national ownership and agency rules in the matrix module.*\n\n`;
    } else {
      md += `Use carefully formulated, non-securitizing language in project documentation:\n`;
      diplos.forEach((d) => {
        md += `- *"${d}"*\n`;
      });
      md += `\n`;
    }

    md += `## 9. Evidence Gaps (User Working Notes)\n`;
    const gaps = riskPathways.map((p) => p.evidenceGaps).filter(Boolean);
    if (gaps.length === 0) {
      md += `*No evidence gaps identified.*\n\n`;
    } else {
      gaps.forEach((g) => {
        md += `- ${g}\n`;
      });
      md += `\n`;
    }

    md += `## 10. Red-Team Warnings & Risks (User Working Notes)\n`;
    const warnings = activePillars.map((e) => e.redTeamWarning).filter(Boolean);
    const stakeRisks = stakeholders.map((s) => s.risks).filter(Boolean);
    const allWarns = [...warnings, ...stakeRisks];
    if (allWarns.length === 0) {
      md += `*No conflict-sensitivity red-team warnings logged.*\n\n`;
    } else {
      allWarns.forEach((w) => {
        md += `- ⚠️ ${w}\n`;
      });
      md += `\n`;
    }

    md += `---\n\n`;
    md += `**Disclaimer:** Prototype support tool. Not an official UN, CCCPA, DEDI, or government platform. Users should validate all outputs against official mandates, policies, and context-specific evidence.\n`;

    return md;
  };

  // Download Word HTML
  const downloadWordDoc = () => {
    const rawContent = printAreaRef.current?.innerHTML || '';
    const wordHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <title>YCPS Brief - ${contextName}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.5; color: #333333; }
          h1 { color: #0b1329; border-bottom: 2px solid #c5a880; padding-bottom: 5px; font-size: 18pt; margin-top: 20px; }
          h2 { color: #1c2541; font-size: 14pt; margin-top: 15px; border-bottom: 1px solid #c5a880; }
          h3 { color: #0b1329; font-size: 12pt; margin-top: 10px; }
          ul, ol { margin-left: 20px; }
          .tovalidate { font-weight: bold; color: #d97706; }
          .disclaimer { font-size: 8pt; color: #666666; border-top: 1px solid #cccccc; margin-top: 30px; padding-top: 10px; }
        </style>
      </head>
      <body>
        ${rawContent}
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + wordHtml], {
      type: 'application/msword;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `YCPS_Brief_${contextName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    printWithDocumentTitle(`YCPS Policy Brief - ${getPrintContextLabel(contextName)}`);
  };

  const isBriefActive = activePillars.length > 0 || riskPathways.length > 0 || stakeholders.length > 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-grey-border/60 pb-5 no-print">
        <div>
          <h1 className="text-2xl font-bold text-brand-offwhite">
            YCPS Brief Generator
          </h1>
          <p className="text-xs text-brand-grey-text mt-1">
            Compile all data entered in the matrix, risk pathways, and stakeholder maps into a structured briefing note.
          </p>
        </div>
        
        {/* Action Controls */}
        <div className="flex flex-col items-start sm:items-end gap-1.5 self-start sm:self-center">
          {isBriefActive && (
            <><div className="flex flex-wrap items-center gap-2">
              <CopyButton text={compileMarkdown()} label="Copy Markdown" />
              <button
                onClick={downloadWordDoc}
                type="button"
                className="px-3 py-1.5 bg-brand-navy-light text-brand-gold border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-navy-dark rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export Word</span>
              </button>
              <button
                onClick={handlePrint}
                type="button"
                className="px-3 py-1.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-brand-gold/15"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2zm5-17v2m-6 0h12" />
                </svg>
                <span>Print Brief</span>
              </button>
            </div>
            <p className="text-[9px] text-brand-grey-text max-w-sm sm:text-right">For a clean PDF: choose Save as PDF, turn Headers and footers Off, keep Background graphics On, and use Default or None margins based on preview.</p></>
          )}
        </div>
      </div>

      {/* Brief Document Container */}
      {!isBriefActive ? (
        <div className="glass-panel p-12 text-center rounded-xl border border-brand-grey-border/45 space-y-4 no-print">
          <div className="text-brand-grey-text/40 flex justify-center">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h4 className="text-base font-bold text-brand-offwhite">Analysis Workspace is Empty</h4>
          <p className="text-xs text-brand-grey-text max-w-md mx-auto">
            You haven&apos;t entered any data yet. Switch to one of the presets (like the Sahel, Somalia, or South Sudan models) using the dropdown at the top right of the page to auto-fill this document immediately.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 gap-6 items-start">
          {/* Main Brief Content (Styled Sheet) */}
          <div
            ref={printAreaRef}
            className="lg:col-span-3 bg-gradient-to-br from-brand-navy-light/65 to-brand-navy-dark/95 border border-brand-gold/45 rounded-xl p-8 md:p-12 shadow-2xl print:bg-white print:text-black print:border-none print:shadow-none print:p-0 print-document brief-print-document"
          >
            <style dangerouslySetInnerHTML={{ __html: `
              @media print {
                .brief-print-document {
                  font-size: 11px !important;
                  line-height: 1.45 !important;
                  color: #1f2937 !important;
                  background: #ffffff !important;
                  font-family: system-ui, -apple-system, sans-serif !important;
                }
                .brief-print-document h2 {
                  font-size: 13px !important;
                  font-weight: bold !important;
                  color: #111827 !important;
                  border-bottom: 1.5px solid #d97706 !important;
                  padding-bottom: 2px !important;
                  margin-top: 14px !important;
                  margin-bottom: 6px !important;
                  page-break-after: avoid !important;
                  break-after: avoid !important;
                  text-transform: uppercase !important;
                  letter-spacing: 0.05em !important;
                }
                .brief-print-document h3 {
                  font-size: 11.5px !important;
                  font-weight: bold !important;
                  color: #1f2937 !important;
                  margin-top: 8px !important;
                  margin-bottom: 4px !important;
                }
                .brief-print-document section {
                  margin-bottom: 14px !important;
                  page-break-inside: avoid !important;
                  break-inside: avoid !important;
                }
                .brief-print-document .metadata-grid {
                  border: 1px solid #e5e7eb !important;
                  background: #f9fafb !important;
                  padding: 8px 12px !important;
                  margin-bottom: 12px !important;
                }
                .brief-print-document .key-messages {
                  border: 1px solid #f59e0b !important;
                  border-left-width: 4px !important;
                  background: #fffbeb !important;
                  padding: 10px 12px !important;
                  margin-bottom: 12px !important;
                }
                .brief-print-document .source-basis {
                  border: 1px solid #e5e7eb !important;
                  background: #f9fafb !important;
                  padding: 10px 12px !important;
                  margin-bottom: 12px !important;
                }
                .brief-print-document .validation-checklist {
                  border: 1px solid #e5e7eb !important;
                  background: #fafafa !important;
                  padding: 10px 12px !important;
                  margin-bottom: 12px !important;
                }
                .brief-print-document .disclaimer-block {
                  border-top: 1.5px solid #d97706 !important;
                  margin-top: 18px !important;
                  padding-top: 8px !important;
                  font-size: 9px !important;
                  color: #4b5563 !important;
                  page-break-inside: avoid !important;
                  break-inside: avoid !important;
                }
              }
            ` }} />

            {/* Brief Header */}
            <div className="border-b-2 border-brand-gold pb-5 space-y-2.5 mb-6 print:border-black flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <span className="text-[10px] font-bold text-brand-gold tracking-widest uppercase block print:text-black">
                  Youth, Climate, Peace and Security (YCPS) Regional Policy Dialogue
                </span>
                <h1 className="text-xl md:text-2xl font-extrabold text-brand-offwhite leading-tight mt-0.5 print:text-black uppercase">
                  YCPS Policy Brief: Strategic Recommendations
                </h1>
                <p className="text-xs text-brand-grey-text print:text-gray-600">
                  Target Context / Focus: <span className="text-brand-offwhite font-bold print:text-black">{contextName}</span>
                </p>
              </div>
              <div className="text-left md:text-right text-[10px] text-brand-grey-text/80 print:text-gray-600 space-y-0.5 self-start md:self-end">
                <div>Document Ref: <span className="font-semibold text-brand-gold print:text-black">YCPS-PB-{contextName.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5) || 'TEMP'}</span></div>
                <div>Date Generated: <span className="font-semibold">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-brand-navy-light/40 border border-brand-grey-border/30 mb-6 text-[11px] metadata-grid print:text-black">
              <div>
                <span className="block text-[9px] font-bold text-brand-gold uppercase tracking-wider print:text-gray-500">Document Status</span>
                <span className="font-semibold text-brand-offwhite print:text-black">Draft for Review</span>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-brand-gold uppercase tracking-wider print:text-gray-500">Verification Stage</span>
                <span className="font-semibold text-brand-offwhite print:text-black">Capacity-Building Demonstration</span>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-brand-gold uppercase tracking-wider print:text-gray-500">Regional Alignment</span>
                <span className="font-semibold text-brand-offwhite print:text-black">YPS & CPS Frameworks</span>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-brand-gold uppercase tracking-wider print:text-gray-500">Support Context</span>
                <span className="font-semibold text-brand-offwhite print:text-black">Draft for Review & Validation</span>
              </div>
            </div>

            {/* Key Messages Box */}
            <div className="p-4 rounded-lg bg-brand-gold/5 border-l-4 border-brand-gold text-brand-grey-text mb-6 space-y-1.5 key-messages print:text-gray-800">
              <h3 className="font-bold text-brand-gold print:text-black text-xs uppercase tracking-wider">
                📢 Strategic Summary & Core Precepts
              </h3>
              <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed">
                <li>
                  <strong className="text-brand-offwhite print:text-black">Climate-Security Risk Relationships:</strong> Climate stressors amplify existing vulnerabilities, water constraints, and livelihood challenges under specific governance conditions, rather than acting as direct causes of conflict.
                </li>
                <li>
                  <strong className="text-brand-offwhite print:text-black">Youth Leadership Agency:</strong> Young people contribute actively as environmental entrepreneurs, local mediators, and dialogue partners, rather than being securitized or treated solely as vulnerable.
                </li>
                <li>
                  <strong className="text-brand-offwhite print:text-black">National Ownership:</strong> All proposed interventions are structured to align with national development priorities, local capacities, and community-led dialogue.
                </li>
              </ul>
            </div>

            {/* Source Basis Box */}
            <div className="p-4 rounded-lg bg-brand-green/5 border border-brand-green/20 text-brand-grey-text mb-6 space-y-1.5 source-basis print:text-gray-800">
              <h3 className="font-bold text-brand-green print:text-black text-xs uppercase tracking-wider">
                📚 Grounding & Source Framing References
              </h3>
              <p className="text-[11px] leading-relaxed">
                This drafting support tool package is framed around and traces to: (1) Consultant ToR guidelines on YCPS; (2) DEDI Project Document (2024–2028); (3) CCCPA / DEDI timeline workplans; (4) CCCPA training manuals on CPS; and (5) Guidebook on YCPS Programming in UN Peace Operations.
              </p>
            </div>

            {/* Document body - 11 sections */}
            <div className="space-y-8 text-xs text-brand-grey-text leading-relaxed print:text-gray-800 print:text-[11pt]">
              
              {/* 1. Executive Summary */}
              <section className="space-y-2">
                <h2 className="text-sm font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:border-gray-300 print:pb-1">
                  1. Executive Summary (Suggested Draft Language)
                </h2>
                <p className="text-brand-offwhite print:text-black font-medium leading-relaxed bg-brand-navy-light/25 print:bg-transparent p-4 rounded border border-brand-grey-border/30 print:border-none print:p-0">
                  {getExecutiveSummary()}
                </p>
              </section>

              {/* 2. Context */}
              <section className="space-y-2">
                <h2 className="text-sm font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:border-gray-300 print:pb-1">
                  2. Context Analysis (User Working Notes)
                </h2>
                <p>
                  This briefing document maps the complex feedback loops between climate variability and local peace and security within the <span className="font-semibold text-brand-offwhite print:text-black">{contextName}</span>. In line with regional programming priorities and UN guidelines, this document translates strategic declarations into granular interventions, positioning youth as central to resilience.
                </p>
              </section>

              {/* 3. Climate-Security Risk Pathway */}
              <section className="space-y-3">
                <h2 className="text-sm font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:border-gray-300 print:pb-1">
                  3. Climate-Security Risk Pathways (To Be Validated where evidence is Low/Unclear)
                </h2>
                {riskPathways.length === 0 ? (
                  <p className="italic">No risk pathways mapped.</p>
                ) : (
                  <div className="space-y-4">
                    {riskPathways.map((p, idx) => {
                      const isToValidate = p.evidenceStrength === 'Low' || p.evidenceStrength === 'Unclear';
                      return (
                        <div key={p.id} className="border border-brand-grey-border/40 p-4 rounded-lg space-y-2 print:border-gray-300">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="font-bold text-brand-gold print:text-black">
                              Pathway {idx + 1}: {p.hazard} → {p.pathwayType.toUpperCase().replace('_', ' ')}
                            </h3>
                            {isToValidate && (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 print:text-orange-600 print:border-orange-600 uppercase tracking-widest">
                                To Be Validated
                              </span>
                            )}
                          </div>
                          <p><span className="font-semibold text-brand-offwhite print:text-black">Location/Context:</span> {p.context}</p>
                          <p><span className="font-semibold text-brand-offwhite print:text-black">Exposure & Vulnerability:</span> {p.exposure || 'None detailed'} | {p.vulnerability || 'None detailed'}</p>
                          {p.capacityConstraint && <p><span className="font-semibold text-brand-offwhite print:text-black">Governance Constraint (User Notes):</span> {p.capacityConstraint}</p>}
                          <p><span className="font-semibold text-brand-offwhite print:text-black">Youth-Specific Impact:</span> {p.youthImpact}</p>
                          <p className="text-brand-green font-medium"><span className="font-semibold text-brand-offwhite print:text-black">Youth-Led Response Opportunity (Agency):</span> {p.youthOpportunity}</p>
                          <p className="bg-brand-navy-light/35 p-2 rounded print:bg-gray-100"><span className="font-semibold text-brand-gold print:text-black">Prevention/Resilience Intervention (Suggested Draft):</span> {p.intervention}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* 4. CPS × YPS Integration Findings */}
              <section className="space-y-3">
                <h2 className="text-sm font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:border-gray-300 print:pb-1">
                  4. CPS × YPS Integration Findings (Suggested Draft Language)
                </h2>
                {activePillars.length === 0 ? (
                  <p className="italic">No matrix mappings created.</p>
                ) : (
                  <div className="space-y-4">
                    {activePillars.map((e) => {
                      const name = e.pillarId.charAt(0).toUpperCase() + e.pillarId.slice(1).replace('_', ' ');
                      return (
                        <div key={e.pillarId} className="border border-brand-grey-border/40 p-4 rounded-lg space-y-2 print:border-gray-300">
                          <h3 className="font-bold text-brand-gold print:text-black">Pillar: {name}</h3>
                          <p><span className="font-semibold text-brand-offwhite print:text-black">Climate-Security Aspect (User Notes):</span> {e.climateSecurityConsideration}</p>
                          <p><span className="font-semibold text-brand-offwhite print:text-black">Youth Agency role:</span> {e.youthRoleAgency}</p>
                          {e.protectionConcern && <p><span className="font-semibold text-brand-offwhite print:text-black">Protection Concern:</span> {e.protectionConcern}</p>}
                          {e.practicalEntryPoint && <p><span className="font-semibold text-brand-offwhite print:text-black">Practical Entry Point:</span> {e.practicalEntryPoint}</p>}
                          <p className="bg-brand-navy-light/35 p-2 rounded print:bg-gray-100"><span className="font-semibold text-brand-gold print:text-black">Suggested Action (Suggested Draft):</span> {e.suggestedAction}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* 5. Stakeholder and Partnership Considerations */}
              <section className="space-y-3">
                <h2 className="text-sm font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:border-gray-300 print:pb-1">
                  5. Stakeholder and Partnership Considerations (User Working Notes)
                </h2>
                {stakeholders.length === 0 ? (
                  <p className="italic">No stakeholders mapped.</p>
                ) : (
                  <div className="space-y-3">
                    {stakeholders.map((s) => (
                      <div key={s.id} className="border-l-2 border-brand-gold pl-3 space-y-1 py-1 print:border-black">
                        <p className="font-semibold text-brand-offwhite print:text-black">
                          {s.name} <span className="text-[10px] text-brand-grey-text font-normal">({s.actorType.replace('_', ' ')})</span>
                        </p>
                        <p className="text-[11px]"><span className="font-semibold text-brand-offwhite print:text-black">Interest & Strategy:</span> {s.interest} / {s.engagementStrategy || 'No custom strategy'}</p>
                        <p className="text-[10px] text-brand-grey-text/80">
                          Influence: <span className="text-brand-offwhite print:text-black font-semibold">{s.influence}</span> | Position: <span className="text-brand-offwhite print:text-black font-semibold">{s.position}</span> | Youth Inclusion: <span className="text-brand-offwhite print:text-black font-semibold">{s.youthInclusionQuality}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* 6. Priority Recommendations */}
              <section className="space-y-2">
                <h2 className="text-sm font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:border-gray-300 print:pb-1">
                  6. Priority Recommendations (Suggested Draft Language)
                </h2>
                {activePillars.map((e) => e.suggestedAction).filter(Boolean).length === 0 &&
                riskPathways.map((p) => p.intervention).filter(Boolean).length === 0 ? (
                  <p className="italic">No recommendations compiled.</p>
                ) : (
                  <ol className="list-decimal pl-5 space-y-1.5">
                    {[
                      ...activePillars.map((e) => e.suggestedAction).filter(Boolean),
                      ...riskPathways.map((p) => p.intervention).filter(Boolean)
                    ].map((rec, idx) => (
                      <li key={idx} className="pl-1">
                        {rec}
                      </li>
                    ))}
                  </ol>
                )}
              </section>

              {/* 7. M&E Indicators */}
              <section className="space-y-2">
                <h2 className="text-sm font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:border-gray-300 print:pb-1">
                  7. M&E Indicators (Suggested Draft Language)
                </h2>
                {activePillars.map((e) => e.indicator).filter(Boolean).length === 0 ? (
                  <p className="italic">No monitoring indicators defined.</p>
                ) : (
                  <ul className="list-disc pl-5 space-y-1">
                    {activePillars
                      .map((e) => e.indicator)
                      .filter(Boolean)
                      .map((ind, idx) => (
                        <li key={idx} className="pl-1">
                          {ind}
                        </li>
                      ))}
                  </ul>
                )}
              </section>

              {/* 8. Diplomatic Language Notes */}
              <section className="space-y-2">
                <h2 className="text-sm font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:border-gray-300 print:pb-1">
                  8. Diplomatic Language Notes (Source-Based Guidance)
                </h2>
                {activePillars.map((e) => e.diplomaticWording).filter(Boolean).length === 0 ? (
                  <p className="italic">No diplomatic phrasing entered.</p>
                ) : (
                  <ul className="list-disc pl-5 space-y-2">
                    {activePillars
                      .map((e) => e.diplomaticWording)
                      .filter(Boolean)
                      .map((d, idx) => (
                        <li key={idx} className="pl-1 font-medium italic text-brand-gold print:text-black">
                          &ldquo;{d}&rdquo;
                        </li>
                      ))}
                  </ul>
                )}
              </section>

              {/* 9. Evidence Gaps */}
              <section className="space-y-2">
                <h2 className="text-sm font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:border-gray-300 print:pb-1">
                  9. Evidence Gaps (User Working Notes)
                </h2>
                {riskPathways.map((p) => p.evidenceGaps).filter(Boolean).length === 0 ? (
                  <p className="italic">No evidence gaps identified.</p>
                ) : (
                  <ul className="list-disc pl-5 space-y-1">
                    {riskPathways
                      .map((p) => p.evidenceGaps)
                      .filter(Boolean)
                      .map((gap, idx) => (
                        <li key={idx} className="pl-1">
                          {gap}
                        </li>
                      ))}
                  </ul>
                )}
              </section>

              {/* 10. Conflict Sensitivity & Review Safeguards */}
              <section className="space-y-2 print:avoid-break">
                <h2 className="text-sm font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:border-gray-300 print:pb-1">
                  10. Conflict Sensitivity, Safeguards & Review Flags
                </h2>
                {activePillars.map((e) => e.redTeamWarning).filter(Boolean).length === 0 &&
                stakeholders.map((s) => s.risks).filter(Boolean).length === 0 ? (
                  <p className="italic">No conflict-sensitivity risks flagged.</p>
                ) : (
                  <ul className="list-disc pl-5 space-y-1.5">
                    {[
                      ...activePillars.map((e) => e.redTeamWarning).filter(Boolean),
                      ...stakeholders.map((s) => s.risks).filter(Boolean)
                    ].map((w, idx) => (
                      <li key={idx} className="pl-1 text-brand-grey-text print:text-gray-700">
                        <span className="font-semibold text-brand-gold print:text-black mr-1 uppercase text-[9.5px] tracking-wider">
                          [Safeguard Flag]
                        </span>{' '}
                        {w}
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              {/* 11. Pre-Validation Dialogue Checklist */}
              <section className="space-y-2 print:avoid-break">
                <h2 className="text-sm font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:border-gray-300 print:pb-1">
                  11. Pre-Validation Dialogue Checklist
                </h2>
                <p className="text-[11px] text-brand-grey-text mb-2 print:text-gray-700">
                  Prior to incorporating this draft briefing into official policy dialogue frameworks, confirm local context assumptions:
                </p>
                <div className="grid sm:grid-cols-2 gap-2.5 text-[11px] bg-brand-navy-light/10 p-3.5 rounded border border-brand-grey-border/20 validation-checklist print:bg-transparent print:border-none print:p-0 print:text-black">
                  <div className="flex items-start gap-2">
                    <span className="text-brand-gold print:text-black font-bold">□</span>
                    <span>Assess alignment of terminology with national sovereignty mandates.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brand-gold print:text-black font-bold">□</span>
                    <span>Verify regional water allocation and grazing corridor availability.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brand-gold print:text-black font-bold">□</span>
                    <span>Conduct intergenerational leadership audits to prevent elder exclusion.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brand-gold print:text-black font-bold">□</span>
                    <span>Confirm safety pathways and localized risk warning protocols with local administration.</span>
                  </div>
                </div>
              </section>

            </div>

            {/* Brief Footer Disclaimer */}
            <div className="mt-10 pt-5 border-t border-brand-grey-border/50 text-[10px] text-brand-grey-text leading-relaxed disclaimer-block print:text-gray-500 print:border-gray-400">
              <span className="font-semibold text-brand-gold print:text-black">Disclaimer:</span> Prototype support tool for regional policy dialogue training. Not an official UN, CCCPA, DEDI, AU, or government platform. Users should validate all draft outputs against official mandates, policies, and context-specific evidence.
            </div>

            <div className="border-t border-brand-grey-border/30 pt-2 text-[9px] text-brand-gold/90 italic leading-relaxed no-print">
              * Draft planning output. To be validated against official regional mandates and context-specific field evidence before deployment.
            </div>
          </div>

          {/* Right Column: Brief Navigation/Checks */}
          <div className="space-y-6 no-print">
            {/* Source Integrity Panel (Rank 6: CCCPA UN peace operations Guidebook) */}
            <SourceIntegrityPanel sourceId="peace_ops" />

            <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 space-y-4">
              <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider">
                Document Statistics
              </h3>
              
              <div className="space-y-2.5 text-xs text-brand-grey-text">
                <div className="flex justify-between">
                  <span>Pillars Integrated:</span>
                  <span className="font-semibold text-brand-offwhite">{activePillars.length} / 5</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Pathways:</span>
                  <span className="font-semibold text-brand-offwhite">{riskPathways.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stakeholders Mapped:</span>
                  <span className="font-semibold text-brand-offwhite">{stakeholders.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conflict Warnings:</span>
                  <span className="font-semibold text-red-400">
                    {activePillars.map((e) => e.redTeamWarning).filter(Boolean).length +
                      stakeholders.map((s) => s.risks).filter(Boolean).length}
                  </span>
                </div>
              </div>

              <hr className="border-brand-grey-border/40" />

              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">
                  Compliance Checklist
                </h4>
                <ul className="space-y-1.5 text-[10px] text-brand-grey-text">
                  <li className="flex items-start gap-1.5">
                    <span className="text-brand-green">✓</span>
                    <span>Non-securitizing youth agency</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-brand-green">✓</span>
                    <span>National ownership phrasing</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-brand-green">✓</span>
                    <span>Gender-responsive actions</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-brand-green">✓</span>
                    <span>Red-team sensitivity check</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
