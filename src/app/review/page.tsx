'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { checkTextCompliance, ComplianceWarning } from '@/lib/sourceTruth';

export default function RedTeamReviewPage() {
  const { matrixEntries, riskPathways, stakeholders, contextName } = useApp();

  // Run compliance audit across all loaded data
  const audits: { source: string; text: string; warnings: ComplianceWarning[] }[] = [];

  // 1. Audit Matrix
  Object.entries(matrixEntries).forEach(([pillarId, entry]) => {
    const pillarName = pillarId.charAt(0).toUpperCase() + pillarId.slice(1).replace('_', ' ');
    const fieldsToCheck: { key: keyof typeof entry; label: string }[] = [
      { key: 'climateSecurityConsideration', label: 'Climate-Security Consideration' },
      { key: 'youthRoleAgency', label: 'Youth Role & Agency' },
      { key: 'protectionConcern', label: 'Protection Concern' },
      { key: 'practicalEntryPoint', label: 'Practical Entry Point' },
      { key: 'suggestedAction', label: 'Suggested Action' },
      { key: 'diplomaticWording', label: 'Diplomatic Wording' },
      { key: 'redTeamWarning', label: 'Red-Team Warning' }
    ];

    fieldsToCheck.forEach((f) => {
      const val = entry[f.key] as string;
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
  const totalAuditedFields = 5 * 7 + riskPathways.length * 8 + stakeholders.length * 4;
  const infractionsCount = audits.reduce((sum, item) => sum + item.warnings.length, 0);
  
  // Compliance Score calculation (starts at 100%, drops by 10% per warning, floor at 10%)
  const complianceScore = Math.max(10, 100 - infractionsCount * 10);

  // Structural Checklist
  const activePillars = Object.values(matrixEntries).filter(
    (e) => e.climateSecurityConsideration.trim() !== '' || e.youthRoleAgency.trim() !== ''
  );


  const structuralChecks = [
    {
      label: 'Mainstream YPS integration: at least one Matrix Pillar mapped',
      passed: activePillars.length > 0
    },
    {
      label: 'Mainstream YPS integration: all 5 Matrix Pillars completed',
      passed: activePillars.length === 5
    },
    {
      label: 'Construct causal pathways: at least one Risk Pathway built',
      passed: riskPathways.length > 0
    },
    {
      label: 'Identify evidence gaps: evidence quality and gaps specified',
      passed: riskPathways.length > 0 && riskPathways.every((p) => p.evidenceStrength !== 'Unclear')
    },
    {
      label: 'Check conflict-sensitivity: at least one Red-Team Warning logged',
      passed: activePillars.some((e) => e.redTeamWarning.trim() !== '') || stakeholders.some((s) => s.risks.trim() !== '')
    },
    {
      label: 'Stakeholder mapping: at least one Youth Actor registered',
      passed: stakeholders.some((s) => s.actorType === 'youth_actor')
    },
    {
      label: 'Strategic engagement: engagement strategies formulated for all actors',
      passed: stakeholders.length > 0 && stakeholders.every((s) => s.engagementStrategy.trim() !== '')
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
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
            Diplomatic Compliance Score
          </span>
          <div className="relative flex items-center justify-center h-28 w-28">
            {/* Outer Circle Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-brand-navy-light" />
            <div className="text-3xl font-extrabold text-brand-offwhite">
              <span className={complianceScore > 80 ? 'text-brand-green' : complianceScore > 50 ? 'text-brand-gold' : 'text-red-400'}>
                {complianceScore}%
              </span>
            </div>
          </div>
          <p className="text-[10px] text-brand-grey-text">
            Audited {totalAuditedFields} planning data fields inside workspace.
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
              <span className="text-2xl font-extrabold text-brand-offwhite block mt-1">6 Strict Rules</span>
            </div>
          </div>
          <p className="text-[10px] text-brand-grey-text leading-relaxed">
            The YCPS Toolkit Lab enforces UNDP, DEDI, and CCCPA strategic language protocols, ensuring outputs do not over-securitize climate issues, map youth as risks, or bypass sovereign national ownership.
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
              <h4 className="text-sm font-bold text-brand-green">100% Diplomatic Compliance Cleared</h4>
              <p className="text-xs text-brand-grey-text max-w-sm mx-auto">
                No non-compliant terms detected. Your analytical entries fully conform to CCCPA, DEDI, and UNDP diplomatic language rules.
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
              This red-team checklist audits the structural density of YCPS briefs. Full completion ensures robust analysis fit for diplomat training and COP side events.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
