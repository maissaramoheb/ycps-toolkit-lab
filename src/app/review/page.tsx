'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  APPROVED_VOCABULARY_RULES,
  checkTextCompliance,
  ComplianceWarning
} from '@/lib/sourceTruth';
import { CopyButton } from '@/components/CopyButton';
import { WorkflowStrip } from '@/components/WorkflowStrip';
import Link from 'next/link';

export default function RedTeamReviewPage() {
  const { matrixEntries, riskPathways, stakeholders, contextName, loadScenario } = useApp();

  const isWorkspaceEmpty = riskPathways.length === 0 && stakeholders.length === 0 && Object.values(matrixEntries).every(e => e.climateSecurityConsideration.trim() === '' && e.youthRoleAgency.trim() === '');

  // Run compliance audit across all loaded data
  const audits: { source: string; text: string; warnings: ComplianceWarning[] }[] = [];
  let totalAuditedFields = 0;

  // 1. Audit Matrix
  Object.entries(matrixEntries).forEach(([pillarId, entry]) => {
    const pillarName = pillarId.charAt(0).toUpperCase() + pillarId.slice(1).replace('_', ' ');
    const fieldsToCheck: { key: keyof typeof entry; label: string }[] = [
      { key: 'climateSecurityConsideration', label: 'Climate-Security Consideration' },
      { key: 'youthRoleAgency', label: 'Youth Role & Agency' },
      { key: 'protectionConcern', label: 'Protection Concern' },
      { key: 'practicalEntryPoint', label: 'Practical Entry Point' },
      { key: 'suggestedAction', label: 'Suggested Action' },
      { key: 'indicator', label: 'Indicator' },
      { key: 'diplomaticWording', label: 'Diplomatic Wording' },
      { key: 'redTeamWarning', label: 'Red-Team Warning' }
    ];

    fieldsToCheck.forEach((f) => {
      const val = entry[f.key] as string;
      if (val.trim() === '') return;
      totalAuditedFields += 1;
      const warnings = checkTextCompliance(`${pillarName} Matrix — ${f.label}`, val);
      if (warnings.length > 0) {
        audits.push({
          source: `YPS Matrix • ${pillarName} Pillar (${f.label})`,
          text: val,
          warnings
        });
      }
    });
  });

  // 2. Audit Risk Pathways
  riskPathways.forEach((p, idx) => {
    const fieldsToCheck: { val: string; label: string }[] = [
      { val: p.hazard, label: 'Hazard' },
      { val: p.exposure, label: 'Exposure' },
      { val: p.vulnerability, label: 'Vulnerability' },
      { val: p.capacityConstraint, label: 'Governance Constraint' },
      { val: p.youthImpact, label: 'Youth Impact' },
      { val: p.youthOpportunity, label: 'Youth Opportunity' },
      { val: p.intervention, label: 'Intervention' },
      { val: p.evidenceGaps, label: 'Evidence Gaps' }
    ];

    fieldsToCheck.forEach((f) => {
      if (f.val.trim() === '') return;
      totalAuditedFields += 1;
      const warnings = checkTextCompliance(`Pathway ${idx + 1} — ${f.label}`, f.val);
      if (warnings.length > 0) {
        audits.push({
          source: `Risk Pathway Builder • Pathway ${idx + 1} (${f.label})`,
          text: f.val,
          warnings
        });
      }
    });
  });

  // 3. Audit Stakeholders
  stakeholders.forEach((s) => {
    const fieldsToCheck: { val: string; label: string }[] = [
      { val: s.interest, label: 'Interest' },
      { val: s.risks, label: 'Risks' },
      { val: s.diplomaticSensitivity, label: 'Diplomatic Sensitivity' },
      { val: s.engagementStrategy, label: 'Engagement Strategy' }
    ];

    fieldsToCheck.forEach((f) => {
      if (f.val.trim() === '') return;
      totalAuditedFields += 1;
      const warnings = checkTextCompliance(`Stakeholder ${s.name} — ${f.label}`, f.val);
      if (warnings.length > 0) {
        audits.push({
          source: `Stakeholder Mapper • ${s.name} (${f.label})`,
          text: f.val,
          warnings
        });
      }
    });
  });

  // Calculations
  const infractionsCount = audits.reduce((sum, item) => sum + item.warnings.length, 0);
  const screeningScore = totalAuditedFields > 0
    ? Math.round(((totalAuditedFields - audits.length) / totalAuditedFields) * 100)
    : null;

  // Structural Checklist
  const activePillars = Object.values(matrixEntries).filter(
    (e) => e.climateSecurityConsideration.trim() !== '' || e.youthRoleAgency.trim() !== ''
  );


  const structuralChecks = [
    {
      label: 'Recognition → Implementation: clear implementation action output selected',
      passed: activePillars.some((e) => e.implementationOutput && e.implementationOutput !== '')
    },
    {
      label: 'Visibility of Youth Agency: active youth-led adaptation and leadership documented',
      passed: activePillars.some((e) => e.youthRoleAgency.trim().length > 10)
    },
    {
      label: 'Participation + Protection: entry points linked to legal/physical protection safeguards',
      passed: activePillars.some((e) => e.practicalEntryPoint.trim().length > 5 && e.protectionConcern.trim().length > 5)
    },
    {
      label: 'Prevention + Resilience: linking climate hazards to livelihood adaptation actions',
      passed: riskPathways.some((p) => p.intervention.trim().length > 10)
    },
    {
      label: 'Structured Partnerships Across the Nexus: mapping actor coordination steps',
      passed: stakeholders.length > 0 && stakeholders.some((s) => s.engagementStrategy.trim().length > 10)
    },
    {
      label: 'Cross-cutting Dimensions: integrating gender, displacement, and HDP nexus elements',
      passed: activePillars.some((e) => e.suggestedAction.toLowerCase().includes('gender') || e.suggestedAction.toLowerCase().includes('women') || e.suggestedAction.toLowerCase().includes('displace') || e.suggestedAction.toLowerCase().includes('resilience'))
    },
    {
      label: 'Non-securitized Framing: avoiding youth securitization or labeling as threat risks',
      passed: !audits.some((a) => a.warnings.some((w) => w.word.toLowerCase().includes('securit') || w.word.toLowerCase().includes('radical')))
    },
    {
      label: 'Validation and Follow-Up: identifying evidence gaps or verification needs',
      passed: riskPathways.length > 0 && riskPathways.some((p) => p.evidenceGaps.trim().length > 5)
    },
    {
      label: 'Mainstream YPS integration: at least one Matrix Pillar mapped',
      passed: activePillars.length > 0
    },
    {
      label: 'Construct risk pathways: at least one Risk Pathway built',
      passed: riskPathways.length > 0
    }
  ];

  const compileReviewActionPlan = () => {
    const failedChecks = structuralChecks.filter(c => !c.passed).map(c => c.label);
    const passedCount = structuralChecks.filter(c => c.passed).length;
    const totalCount = structuralChecks.length;
    const wordingViolationsCount = infractionsCount;
    
    return `YCPS Policy / Training Validation Action Plan:
--------------------------------------------------
- Wording Screening: ${wordingViolationsCount === 0 ? 'No configured wording flags detected' : `${wordingViolationsCount} strategic wording flags detected`}.
- Completeness Check: Passed ${passedCount} of ${totalCount} checks.
- Validation Reminder: Automated screening result only — human and institutional validation still required.

- Action Gaps & Missing Items:
${failedChecks.map((f, i) => `${i+1}. ${f}`).join('\n') || 'All checklist items completed.'}

- Verification Tasks:
* Review high-risk wording flags with national ministry technicians.
* Convene district-level elder consultations to confirm grazing corridors.`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Workflow Strip */}
      <WorkflowStrip currentStep="review" />

      {/* This step produces box */}
      <div className="glass-panel p-4 rounded-xl border border-brand-gold/25 bg-gradient-to-r from-brand-navy-light/40 to-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs no-print">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block">📋 This Step Produces:</span>
          <p className="text-brand-grey-text">
            <strong>Task:</strong> Run compliance audits on wording infractions and complete checklist reviews. <br />
            <strong>Deliverable:</strong> Review action plan and youth participation/protection safeguard notes.
          </p>
        </div>
        <Link
          href="/language"
          className="shrink-0 px-4 py-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-bold rounded-lg text-xs uppercase tracking-wider text-center transition-all cursor-pointer"
        >
          Next: Refine Wording →
        </Link>
      </div>

      {/* Empty State Banner */}
      {isWorkspaceEmpty && (
        <div className="glass-panel p-4 rounded-xl border border-brand-gold/30 bg-brand-gold/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs no-print">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block">⚠️ No Workspace Data Logged</span>
            <p className="text-brand-grey-text">
              No workspace input yet. Choose a case study or load the preferred regional policy dialogue demo preset.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/case-studies"
              className="px-3.5 py-1.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-bold rounded-lg text-[10px] tracking-wider uppercase text-center transition-all cursor-pointer"
            >
              Choose Case Study
            </Link>
            <button
              onClick={() => {
                if (window.confirm("This will load the Regional Policy Dialogue Scenario into your workspace. Continue?")) {
                  loadScenario('dialogue');
                }
              }}
              type="button"
              className="px-3.5 py-1.5 bg-brand-navy-light hover:bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border font-bold rounded-lg text-[10px] tracking-wider uppercase text-center transition-all cursor-pointer"
            >
              Load Dialogue Preset
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-grey-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-brand-offwhite">
            Red-Team & Conflict-Sensitivity Review
          </h1>
          <p className="text-xs text-brand-grey-text mt-1">
            Audit user-entered text against strategic diplomatic vocabulary rules, flag compliance issues, and check structural completion.
          </p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-lg bg-brand-navy-light border border-brand-grey-border font-medium text-brand-gold self-start">
          Context: {contextName}
        </div>
      </div>

      {/* Main Review Summary */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* Compliance Meter */}
        <div className="glass-panel p-6 rounded-xl border border-brand-grey-border/60 flex flex-col items-center justify-center text-center space-y-3">
          <span className="text-xs font-bold text-brand-grey-text uppercase tracking-widest">
            Prototype Wording Screen
          </span>
          <div className="relative flex items-center justify-center h-28 w-28">
            {/* Outer Circle Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-brand-navy-light" />
            <div className="text-3xl font-extrabold text-brand-offwhite">
              <span className={screeningScore === null ? 'text-brand-grey-text' : screeningScore > 80 ? 'text-brand-green' : screeningScore > 50 ? 'text-brand-gold' : 'text-red-400'}>
                {screeningScore === null ? '—' : `${screeningScore}%`}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-brand-grey-text">
            Screened {totalAuditedFields} non-empty planning fields against configured wording patterns.
          </p>
        </div>

        {/* Audit Stats */}
        <div className="glass-panel p-6 rounded-xl border border-brand-grey-border/60 space-y-4 col-span-2">
          <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-wider">
            Diplomatic Compliance Audit Results
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-brand-navy-light/45 rounded-lg border border-brand-grey-border/50">
              <span className="text-brand-grey-text block">Wording Infractions Found:</span>
              <span className={`text-2xl font-extrabold block mt-1 ${infractionsCount > 0 ? 'text-brand-gold' : 'text-brand-green'}`}>
                {infractionsCount}
              </span>
            </div>
            <div className="p-3.5 bg-brand-navy-light/45 rounded-lg border border-brand-grey-border/50">
              <span className="text-brand-grey-text block">Predefined Language Guidelines:</span>
              <span className="text-2xl font-extrabold text-brand-offwhite block mt-1">
                {APPROVED_VOCABULARY_RULES.length} Screening Rules
              </span>
            </div>
          </div>
          <p className="text-[10px] text-brand-grey-text leading-relaxed">
            This prototype screen flags selected wording patterns derived from the project&apos;s diplomatic language rules. Results are draft support and must be validated against the source hierarchy, national mandates, and context-specific evidence.
          </p>
        </div>
      </section>

      {/* Main Grid: Compliance Violations vs Structural Checks */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Columns: Infraction Audit Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-brand-grey-border/40 pb-2">
            <h3 className="text-sm font-semibold text-brand-offwhite">
              Strategic Vocabulary Violations ({infractionsCount})
            </h3>
            <span className="text-[10px] text-brand-grey-text">Scanned via sourceTruth.ts</span>
          </div>

          {infractionsCount === 0 ? (
            <div className="glass-panel p-8 text-center rounded-xl border border-brand-green/30 bg-brand-green/5 space-y-3">
              <div className="text-brand-green flex justify-center">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-brand-green">
                {totalAuditedFields === 0 ? 'No Content to Screen' : 'No Configured Wording Flags Detected'}
              </h4>
              <p className="text-xs text-brand-grey-text max-w-sm mx-auto">
                {totalAuditedFields === 0
                  ? 'Add working content before running the wording screen.'
                  : 'The screen found no matches in the non-empty fields reviewed. This is not institutional validation; review the draft against official mandates and context-specific evidence.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {audits.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 hover:border-brand-gold/20 transition-all space-y-3 relative overflow-hidden"
                >
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-brand-gold" />
                  
                  <div className="pl-1">
                    <span className="text-[9px] font-bold text-brand-gold uppercase tracking-wider block">
                      Compliance Alert in:
                    </span>
                    <h4 className="text-xs font-bold text-brand-offwhite mt-0.5">
                      {item.source}
                    </h4>
                  </div>

                  <div className="bg-brand-navy-dark/70 p-3 rounded border border-brand-grey-border/30 text-[11px] leading-relaxed pl-4 font-mono text-brand-grey-text">
                    &ldquo;<span className="text-red-400 font-semibold">{item.text}</span>&rdquo;
                  </div>

                  <div className="space-y-2 text-xs pl-1">
                    {item.warnings.map((w, wIdx) => (
                      <div key={wIdx} className="space-y-1.5 p-3 rounded bg-red-950/20 border border-red-500/10">
                        <div>
                          <span className="text-[10px] text-red-400 font-bold uppercase block">
                            Infraction: &ldquo;{w.word}&rdquo;
                          </span>
                          <span className="text-brand-grey-text block text-[10px] mt-0.5">
                            Reason: {w.reason}
                          </span>
                        </div>
                        <div className="bg-brand-green/10 p-2 rounded text-[10px] text-brand-green border border-brand-green/20">
                          <span className="font-semibold block">✔️ Suggested Wording replacement:</span>
                          &ldquo;{w.replacement}&rdquo;
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Structural Checklist */}
        <div className="space-y-4">
          <div className="border-b border-brand-grey-border/40 pb-2">
            <h3 className="text-sm font-semibold text-brand-offwhite">
              Operational Quality Checklist
            </h3>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 space-y-4">
            <span className="text-[10px] font-bold text-brand-gold tracking-widest uppercase block">
              Structural Completeness
            </span>

            <div className="space-y-3.5 text-xs">
              {structuralChecks.map((check, idx) => (
                <div key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <div className="shrink-0 mt-0.5">
                    {check.passed ? (
                      <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-brand-green/15 text-brand-green text-[10px] font-bold border border-brand-green/30">
                        ✓
                      </span>
                    ) : (
                      <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-brand-navy-light text-brand-grey-text/40 text-[10px] font-bold border border-brand-grey-border">
                        —
                      </span>
                    )}
                  </div>
                  <span className={check.passed ? 'text-brand-offwhite' : 'text-brand-grey-text'}>
                    {check.label}
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-brand-grey-border/30" />

            <div className="text-[10px] text-brand-grey-text/75 leading-relaxed bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/40">
              <span className="font-semibold text-brand-gold block mb-1">
                💡 Policy validation warning:
              </span>
              This checklist indicates structural completeness only. It does not validate the quality, accuracy, or institutional suitability of a draft for diplomat training or COP-related use.
            </div>
          </div>
        </div>

      </div>

      {/* Practical Output: Policy / Training Validation Action Plan */}
      <section className="glass-panel p-6 rounded-xl border border-brand-gold/45 bg-gradient-to-r from-brand-navy-light/65 to-brand-navy-dark/95 space-y-4">
        <div className="border-b border-brand-grey-border/30 pb-2 flex justify-between items-center">
          <div>
            <span className="text-[9px] font-bold text-brand-gold uppercase tracking-widest block">
              Practical Output
            </span>
            <h2 className="text-sm font-bold text-brand-offwhite uppercase tracking-wider mt-0.5">
              Policy / Training Validation Action Plan
            </h2>
          </div>
          <CopyButton
            text={compileReviewActionPlan()}
            label="Copy Validation Action Plan"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-xs leading-relaxed">
          {/* Column 1: Wording Screening */}
          <div className="bg-brand-navy-dark/45 p-4 rounded-lg border border-brand-grey-border/30 space-y-2">
            <span className="text-[10px] font-bold text-brand-gold uppercase block">📊 Wording Screening</span>
            <p className="text-[11px] text-brand-grey-text">
              Strategic vocabulary: {infractionsCount === 0 ? 'No configured wording flags detected.' : `${infractionsCount} wording infractions flagged.`}
            </p>
            <div className="pt-1">
              <span className="text-[10px] font-bold text-brand-offwhite block">Screening Status:</span>
              <span className={`font-semibold uppercase tracking-wider text-[10px] ${infractionsCount === 0 ? 'text-brand-green' : 'text-brand-gold'}`}>
                {infractionsCount === 0 ? '✅ No Wording Flags Detected' : '⚠️ Flags Detected'}
              </span>
            </div>
            <p className="text-[9px] text-brand-grey-text/75 mt-1 italic">
              Automated screening result only — human and institutional validation still required.
            </p>
          </div>

          {/* Column 2: Completeness Check */}
          <div className="bg-brand-navy-dark/45 p-4 rounded-lg border border-brand-grey-border/30 space-y-2">
            <span className="text-[10px] font-bold text-brand-gold uppercase block">❌ Completeness Check</span>
            <p className="text-[11px] text-brand-grey-text">
              Passed {structuralChecks.filter(c => c.passed).length} of {structuralChecks.length} checks.
            </p>
            {structuralChecks.some(c => !c.passed) ? (
              <ul className="list-disc pl-4 space-y-1 text-brand-grey-text text-[11px] mt-1">
                {structuralChecks.filter(c => !c.passed).slice(0, 2).map((c, i) => (
                  <li key={i}>{c.label.split(':')[0]}</li>
                ))}
                {structuralChecks.filter(c => !c.passed).length > 2 && (
                  <li>+ {structuralChecks.filter(c => !c.passed).length - 2} more gaps</li>
                )}
              </ul>
            ) : (
              <p className="text-[11px] text-brand-green font-medium">All structural checks passed!</p>
            )}
          </div>

          {/* Column 3: Validation Reminders */}
          <div className="bg-brand-navy-dark/45 p-4 rounded-lg border border-brand-grey-border/30 space-y-2">
            <span className="text-[10px] font-bold text-brand-gold uppercase block">🔍 Validation Reminders</span>
            <ul className="list-disc pl-4 space-y-1 text-brand-grey-text text-[11px]">
              <li>Liaise with ministry technical desks to review flagged terms manually.</li>
              <li>Validate low-evidence hazard corridors with local community leaders.</li>
              <li>Ensure youth-inclusion quality remains non-tokenistic.</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-grey-border/30 pt-2.5 text-[9px] text-brand-gold/90 italic leading-relaxed">
          * Checklist completion does not equal institutional validation. Use it to prepare for human review.
        </div>
      </section>
    </div>
  );
}
