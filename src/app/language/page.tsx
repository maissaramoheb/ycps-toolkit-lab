'use client';

import React, { useState } from 'react';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { APPROVED_VOCABULARY_RULES, WordingRule } from '@/lib/sourceTruth';
import { CopyButton } from '@/components/CopyButton';
import { WorkflowStrip } from '@/components/WorkflowStrip';
import Link from 'next/link';

interface AuditResult {
  rule: WordingRule;
  originalText: string;
}

export default function DiplomaticLanguagePage() {
  const [inputText, setInputText] = useState('');
  const [isReviewed, setIsReviewed] = useState(false);
  const [matchedResults, setMatchedResults] = useState<AuditResult[]>([]);
  const [rewrittenText, setRewrittenText] = useState('');

  const CHARACTER_LIMIT = 1000;

  // Example sentences to test
  const examples = [
    'Climate causes conflict.',
    'Youth are vulnerable.',
    'The state failed to manage the crisis.',
    'Security forces should solve the problem.',
    'International actors should impose solutions.',
    'Youth radicalization is caused by drought.',
    'Climate shocks are driving youth radicalization across the region.',
    'The government failed to protect communities from climate conflict.',
    'Youth should be mobilized to support security responses.'
  ];

  const handleExampleClick = (txt: string) => {
    setInputText(txt);
    setIsReviewed(false);
    setMatchedResults([]);
    setRewrittenText('');
  };

  const handleReview = () => {
    if (!inputText.trim()) {
      alert('Please enter or select some text to review.');
      return;
    }

    const foundResults: AuditResult[] = [];
    let processedText = inputText;

    // Scan for matches and perform sequential rewrites
    APPROVED_VOCABULARY_RULES.forEach((rule) => {
      // Find matches in the original text
      const regex = new RegExp(rule.prohibitedPattern.source, 'gi');
      const match = inputText.match(regex);
      if (match) {
        // Collect results
        foundResults.push({
          rule,
          originalText: Array.from(new Set(match)).join(', ')
        });

        // Replace prohibited pattern in rewritten output
        processedText = processedText.replace(regex, rule.approvedReplacement);
      }
    });

    setMatchedResults(foundResults);
    setRewrittenText(processedText);
    setIsReviewed(true);
  };

  // Compile review notes for export
  const compileReviewNotes = () => {
    if (matchedResults.length === 0) {
      return `DIPLOMATIC LANGUAGE AUDIT REPORT\nContext Environment: ${inputText}\nStatus: No high-risk wording detected.\nNotes: Please still validate the text against official mandates, national context, and available evidence.`;
    }

    let notes = `DIPLOMATIC LANGUAGE AUDIT REPORT\n\nOriginal Text:\n"${inputText}"\n\n`;
    notes += `Risky Wording Flags Found (${matchedResults.length}):\n`;
    matchedResults.forEach((res, idx) => {
      notes += `${idx + 1}. [Category: ${res.rule.category}] "${res.originalText}"\n`;
      notes += `   - Reason: ${res.rule.reason}\n`;
      notes += `   - Recommended Replacement: "${res.rule.approvedReplacement}"\n`;
      notes += `   - Rewrite Confidence: ${res.rule.confidence}\n\n`;
    });

    notes += `Suggested Rewrite Draft:\n"${rewrittenText}"\n\n`;
    notes += `Disclaimer: Prototype support tool. This output does not replace official, legal, or context-specific policy review.`;

    return notes;
  };

  const handlePrint = () => {
    window.print();
  };

  // Rewrite Confidence Badge style helper
  const getConfidenceBadgeColor = (conf: string) => {
    switch (conf) {
      case 'Direct replacement':
        return 'bg-brand-green/10 text-brand-green border-brand-green/30';
      case 'Context-sensitive suggestion':
        return 'bg-brand-gold/10 text-brand-gold border-brand-gold/30';
      case 'To be validated':
      default:
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    }
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
            <strong>Task:</strong> Paste text drafts here to scan them for strategic diplomatic wording compliance. <br />
            <strong>Deliverable:</strong> Revised diplomatic text and screening briefing notes.
          </p>
        </div>
        <Link
          href="/toolkit"
          className="shrink-0 px-4 py-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-bold rounded-lg text-xs uppercase tracking-wider text-center transition-all cursor-pointer"
        >
          Final: Export Package →
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-grey-border/60 pb-5 no-print">
        <div>
          <h1 className="text-2xl font-bold text-brand-offwhite">
            Diplomatic Language Assistant
          </h1>
          <p className="text-xs text-brand-grey-text mt-1">
            Convert sensitive, generic, over-securitized, or weak wording into constructive, context-sensitive YCPS policy planning language.
          </p>
        </div>
      </div>

      {/* Grid Layout: Input on left, Results on right */}
      <div className="grid lg:grid-cols-5 gap-6">
        
        {/* Left Side: Input & Rules */}
        <div className="lg:col-span-3 space-y-6">
          {/* Grounding Source Panel */}
          <SourceIntegrityPanel
            sourceId="diplomatic_rules"
            validationMessage="Primary grounding: diplomatic language rules and red-team safeguards derived from the YCPS source-of-truth hierarchy."
          />

          <div className="glass-panel p-6 rounded-xl border border-brand-grey-border/60 space-y-5 no-print">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                <h3 className="text-sm font-semibold text-brand-gold uppercase tracking-wider">
                  User Working Text
                </h3>
              </div>
              <span className="text-[10px] text-brand-grey-text">
                {inputText.length} / {CHARACTER_LIMIT} characters
              </span>
            </div>

            <textarea
              aria-label="User working text to analyze"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value.slice(0, CHARACTER_LIMIT));
                setIsReviewed(false);
              }}
              placeholder="Paste or type YCPS recommendation draft or workshop text here (e.g., 'Climate shocks are driving youth radicalization across the region and international actors should step in to enforce a direct security solution...')"
              rows={6}
              className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 focus:border-brand-gold rounded-lg p-3.5 focus:outline-none transition-all resize-y leading-relaxed"
            />

            {/* Quick Examples Selection */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-brand-grey-text uppercase tracking-widest block">
                Quick Test Templates (Click to load):
              </span>
              <div className="flex flex-wrap gap-2">
                {examples.map((ex, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleExampleClick(ex)}
                    className={`text-[10px] px-3 py-1.5 rounded-lg border text-left cursor-pointer transition-all duration-200 ${
                      inputText === ex
                        ? 'bg-brand-gold/15 text-brand-gold border-brand-gold'
                        : 'bg-brand-navy-light text-brand-grey-text border-brand-grey-border hover:text-brand-offwhite hover:border-brand-grey-border/80'
                    }`}
                  >
                    &ldquo;{ex}&rdquo;
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={handleReview}
                disabled={!inputText.trim()}
                className="flex-1 px-4 py-2.5 bg-brand-gold hover:bg-brand-gold-dark disabled:opacity-40 disabled:hover:bg-brand-gold text-brand-navy-dark font-bold rounded-lg text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md shadow-brand-gold/15"
              >
                Review Diplomatic Language
              </button>
              {inputText && (
                <button
                  type="button"
                  onClick={() => handleExampleClick('')}
                  className="px-4 py-2.5 border border-brand-grey-border hover:bg-brand-navy-light text-brand-grey-text hover:text-brand-offwhite rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer"
                >
                  Clear Text Editor
                </button>
              )}
            </div>
          </div>

          {/* Lightweight Guidance Box */}
          <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 space-y-2 no-print">
            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block">💡 Next Step</span>
            <p className="text-[11px] text-brand-grey-text leading-relaxed">
              After revising wording, review the Diplomatic Language Briefing Note. Copy the revised text or briefing note, then validate it against institutional language and context sensitivity. Ensure there is no overclaiming, youth securitization, government-blaming, or assumptions of direct climate-conflict causality.
            </p>
          </div>

          {/* Guidelines Rules Reference Accordion */}
          <div className="glass-panel p-6 rounded-xl border border-brand-grey-border/60 space-y-4 no-print">
            <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider">
              Strategic Diplomatic Language Guidelines
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-brand-navy-light/30 rounded border border-brand-grey-border/30 space-y-1">
                <span className="font-semibold text-brand-gold block">Causality Cautiousness</span>
                <p className="text-[11px] text-brand-grey-text leading-relaxed">
                  Avoid asserting that climate causes conflict. State that climate stressors compound environmental exposure and socio-economic vulnerabilities.
                </p>
              </div>
              <div className="p-3 bg-brand-navy-light/30 rounded border border-brand-grey-border/30 space-y-1">
                <span className="font-semibold text-brand-gold block">Youth Agency Framing</span>
                <p className="text-[11px] text-brand-grey-text leading-relaxed">
                  Highlight youth-led resilience, mediation, and green innovation. Do not refer to youth primarily as vulnerable risks or security targets.
                </p>
              </div>
              <div className="p-3 bg-brand-navy-light/30 rounded border border-brand-grey-border/30 space-y-1">
                <span className="font-semibold text-brand-gold block">Sovereign National Ownership</span>
                <p className="text-[11px] text-brand-grey-text leading-relaxed">
                  Ensure all recommendations support capacity building of local ministries and community councils rather than dictating external options.
                </p>
              </div>
              <div className="p-3 bg-brand-navy-light/30 rounded border border-brand-grey-border/30 space-y-1">
                <span className="font-semibold text-brand-gold block">Conflict Sensitivity</span>
                <p className="text-[11px] text-brand-grey-text leading-relaxed">
                  Avoid securitizing regional boundaries or local resources. Advocate for rights-based, gender-responsive, and developmental responses.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Analysis & Rewrite Panels */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Why this matters Card */}
          <div className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 bg-gradient-to-br from-brand-navy-light/60 to-slate-900 space-y-2 no-print">
            <h3 className="text-xs font-bold text-brand-gold uppercase tracking-wider">
              ⚖️ Why Language Matters
            </h3>
            <p className="text-[11px] text-brand-grey-text leading-relaxed">
              In Youth, Climate, Peace and Security programming, language determines political sensitivity, funding eligibility, and community uptake. Using non-inflammatory, rights-based, and youth-centered wording avoids over-securitization and ensures national ownership.
            </p>
          </div>

          {/* Results Panel */}
          {isReviewed && (
            <div className="space-y-6">
              
              {/* Audit Warnings */}
              <div className="space-y-4">
                <div className="border-b border-brand-grey-border/40 pb-2 flex justify-between items-center">
                  <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider">
                    Audit Review Notes ({matchedResults.length})
                  </h3>
                  <span className="text-[10px] text-brand-grey-text">Wording Analysis</span>
                </div>

                {matchedResults.length === 0 ? (
                  <div className="p-4 bg-brand-green/5 border border-brand-green/30 rounded-lg text-xs leading-normal space-y-2 text-brand-green">
                    <span className="font-bold block">✓ No high-risk wording detected.</span>
                    <p className="text-brand-grey-text text-[11px]">
                      Please still validate the text against official mandates, national context, and available evidence.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                    {matchedResults.map((res, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-brand-navy-light/35 border border-brand-grey-border/60 rounded-lg space-y-2 relative"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">
                            {res.rule.category}
                          </span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${getConfidenceBadgeColor(res.rule.confidence)}`}>
                            {res.rule.confidence}
                          </span>
                        </div>
                        <p className="text-[11px] text-brand-grey-text">
                          <span className="font-semibold text-red-400">Flagged:</span> &ldquo;{res.originalText}&rdquo;
                        </p>
                        <p className="text-[11px] leading-relaxed text-brand-offwhite">
                          <span className="font-semibold text-brand-gold">Guideline Context:</span> {res.rule.reason}
                        </p>
                        <p className="bg-brand-green/5 border border-brand-green/15 p-2 rounded text-[11px] text-brand-green leading-normal">
                          <span className="font-semibold block text-[10px] text-brand-offwhite">Approved wording:</span>
                          &ldquo;{res.rule.approvedReplacement}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Practical Output: Diplomatic Language Briefing Note */}
              <div className="glass-panel p-5 rounded-xl border border-brand-gold/45 bg-gradient-to-br from-brand-navy-light/65 to-brand-navy-dark/95 space-y-4">
                <div className="border-b border-brand-grey-border/30 pb-2 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-bold text-brand-gold uppercase tracking-widest block">
                      Practical Output
                    </span>
                    <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider mt-0.5">
                      Diplomatic Language Briefing Note
                    </h3>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-brand-offwhite block mb-1">Suggested Revised Wording (To Be Validated):</span>
                    <div className="bg-slate-900 border border-brand-grey-border/40 p-4 rounded-lg text-xs leading-relaxed text-brand-gold select-all font-medium whitespace-pre-line print:bg-white print:text-black">
                      {rewrittenText}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-[11px] leading-relaxed">
                    <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-1">
                      <span className="font-semibold text-brand-offwhite block">⚠️ Risks & Concerns Found:</span>
                      <p className="text-brand-grey-text">
                        {matchedResults.length > 0
                          ? `Flagged ${matchedResults.length} wording violations against regional guidelines.`
                          : 'No high-risk terminology detected.'}
                      </p>
                    </div>
                    <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-1">
                      <span className="font-semibold text-brand-offwhite block">⚖️ Why This Revision Matters:</span>
                      <p className="text-brand-grey-text">
                        Maintains sovereign ownership, highlights youth leadership roles, and prevents securitizing resource access.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-brand-navy-dark/65 rounded border border-brand-grey-border/45 text-[10px] text-brand-grey-text leading-relaxed">
                    <span className="font-semibold text-brand-gold block mb-0.5">🔍 Validation Reminder:</span>
                    Confirm that terminology matches official AU / LCBC stabilization frameworks, security mandates, and context-specific data.
                  </div>

                  {/* Export Action Controls */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 no-print">
                    <CopyButton text={compileReviewNotes()} label="Copy Diplomatic Briefing Note" />
                    <CopyButton text={rewrittenText} label="Copy Revised Text" />
                    <button
                      onClick={handlePrint}
                      type="button"
                      className="px-3 py-1.5 bg-brand-navy-light text-brand-gold border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-navy-dark rounded-md text-xs font-semibold cursor-pointer transition-all"
                    >
                      Print Briefing Note
                    </button>
                  </div>

                  <div className="border-t border-brand-grey-border/30 pt-2.5 text-[9px] text-brand-gold/90 italic leading-relaxed">
                    * Draft planning output. To be validated against official regional mandates and context-specific field evidence before deployment.
                  </div>
                </div>
              </div>

              {/* Tool Limitation Note */}
              <div className="p-3 bg-brand-navy-dark/40 border border-brand-grey-border/50 rounded-lg text-[10px] text-brand-grey-text leading-relaxed">
                <span className="font-semibold text-brand-gold block mb-0.5">⚠️ Assistant Limitation Note:</span>
                This tool detects wording risks based on predefined rules. It does not replace political, legal, or context-specific policy review.
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
