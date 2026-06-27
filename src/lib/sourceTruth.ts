export type SourceId =
  | 'tor'
  | 'proj_doc'
  | 'workplan'
  | 'cps_manual'
  | 'beyond_vuln'
  | 'peace_ops'
  | 'diplomatic_rules'
  | 'candidate_methodology';

export interface SourceMetadata {
  id: SourceId;
  name: string;
  priority: number;
  institutionalContext: string;
  focusArea: string;
  mandateReminder: string;
}

export const SOURCES_HIERARCHY: Record<SourceId, SourceMetadata> = {
  tor: {
    id: 'tor',
    name: 'Final ToR: DEDI Youth, Climate, Peace and Security Consultant',
    priority: 1,
    institutionalContext: 'Highest priority strategic mandate guiding the scope of YCPS analysis in Africa.',
    focusArea: 'Defines the five YPS pillars integration, African case studies, and training materials scope.',
    mandateReminder: 'Ensure outputs directly map climate-security factors to the 5 YPS pillars (Participation, Protection, Prevention, Partnerships, Reintegration).'
  },
  proj_doc: {
    id: 'proj_doc',
    name: 'DEDI Project Document 2024–2028',
    priority: 2,
    institutionalContext: 'Egypt–Denmark dialogue, partnership framework, and UNDP hosting agreement.',
    focusArea: 'Green transition, youth innovation, national ownership, and climate resilience.',
    mandateReminder: 'Align all recommendations with Egypt-Denmark bilateral priorities, green technology adoption, and sovereign national ownership.'
  },
  workplan: {
    id: 'workplan',
    name: 'CCCPA / DEDI Workplan and Timeline',
    priority: 3,
    institutionalContext: 'Component 3 operations guiding diplomat workshops and forums.',
    focusArea: 'Pre-COP events, Aswan Forum, and diplomat capacity building.',
    mandateReminder: 'Frame analysis to support diplomat training curricula, Aswan Forum sessions, or COP preparatory workshops.'
  },
  cps_manual: {
    id: 'cps_manual',
    name: 'CCCPA CPS Manual and Training Materials',
    priority: 4,
    institutionalContext: 'Institutional training methodology.',
    focusArea: 'Climate risk analysis, scenario-based learning, and CARANA simulation structures.',
    mandateReminder: 'Ensure pathways follow clear logical links: Climate Hazard → Exposure → Vulnerability → Capacity Constraint → Conflict Pathway.'
  },
  beyond_vuln: {
    id: 'beyond_vuln',
    name: 'UNDP-SIPRI-FBA "Beyond Vulnerability"',
    priority: 5,
    institutionalContext: 'Global youth agency and YCPS conceptual framework.',
    focusArea: 'Shifting from vulnerability narratives to youth-led resilience and peacebuilding agency.',
    mandateReminder: 'Always present young people as active agents of resilience, innovation, and mediation, rather than passive victims or risks.'
  },
  peace_ops: {
    id: 'peace_ops',
    name: 'CCCPA Guidebook on CPS Programming in UN Peace Operations in Africa',
    priority: 6,
    institutionalContext: 'Multilateral peace operations guidance.',
    focusArea: 'Rights-based programming and careful diplomatic language in conflict zones.',
    mandateReminder: 'Use highly careful diplomatic framing, avoiding over-securitization of environmental issues or local communities.'
  },
  diplomatic_rules: {
    id: 'diplomatic_rules',
    name: 'Strategic Diplomatic Language Rules & Safeguards',
    priority: 0,
    institutionalContext: 'YCPS Source-of-Truth Hierarchy (ToR, Project Document, Workplan, CPS Manual, Beyond Vulnerability, peace operations Guidebook).',
    focusArea: 'Enforcing cautious causality, national ownership, youth agency, and conflict-sensitivity.',
    mandateReminder: 'Always write policy recommendations and planning notes using constructive, rights-based, and prevention-oriented phrasing.'
  },
  candidate_methodology: {
    id: 'candidate_methodology',
    name: 'Candidate YCPS Methodology Layer',
    priority: 0.5,
    institutionalContext: 'Candidate methodology for translating high-level guidelines into concrete actions.',
    focusArea: 'Two-way framework, practical entry points, Africa-centered application guides, and validation loops.',
    mandateReminder: 'Move YCPS from policy recognition to local implementation, keeping youth agency visible and safeguarding local participation.'
  }
};

// Candidate methodology definitions
export interface CandidateSource {
  id: string;
  name: string;
  role: string;
  keyPrinciples: string[];
  crossCutting: string[];
}

export const candidateMethodologySources: CandidateSource[] = [
  {
    id: 'practice_note',
    name: 'Writing Sample – YCPS Practice Note',
    role: 'Defines the practical implementation logic for operationalizing YCPS in Africa.',
    keyPrinciples: [
      'Move from recognition to implementation: translate strategic frameworks into operational tools.',
      'Youth agency and capability: do not frame youth only as vulnerable or at-risk; highlight their resilience, innovation, and leadership.',
      'Complex climate-security feedback loops: climate stress interacts with governance capacity, livelihoods, displacement, and social trust.',
      'Structured operational methods: systematic mapping, analysis, and planning to embed youth across responses.'
    ],
    crossCutting: [
      'gender-responsiveness',
      'conflict sensitivity',
      'forced displacement',
      'humanitarian-development-peace (HDP) nexus',
      'context adaptation',
      'careful handling of prevention-oriented PVE-climate linkages without securitizing youth'
    ]
  },
  {
    id: 'technical_note',
    name: 'Technical Note',
    role: 'Defines the consultant’s proposed methodology for developing the YCPS toolkit.',
    keyPrinciples: [
      'Integrated framework: address the gap by merging YPS and CPS into a single, cohesive, action-oriented methodology.',
      'Africa-centered and user-friendly design: tailor tools for policy, programming, and capacity-building across the continent.',
      'Two-way YCPS framework: integrate CPS across YPS pillars AND strengthen climate-security responses through youth inclusion.',
      'Analytical credibility and local validation: ground analytical outputs in localized context evidence and national ownership.'
    ],
    crossCutting: [
      'gender-responsiveness',
      'conflict sensitivity',
      'humanitarian-development-peace (HDP) nexus',
      'forced displacement',
      'prevention-oriented PVE-climate linkages handled carefully'
    ]
  }
];

export const candidateMethodologyPrinciples = [
  'Move from recognition to implementation: translate policy statements into practical, community-led intervention plans.',
  'Youth as active agents: frame young people as leaders and key partners in adaptation and peace, not as threats or victims.',
  'Multidimensional hazard feedback: analyze how climate hazards compound existing governance, economic, and security vulnerabilities.',
  'Two-way integration: integrate climate-security factors across YPS pillars and youth leadership into climate adaptation.'
];

export const practicalEntryPoints = [
  {
    id: 'policy_planning',
    name: 'Embed youth in policy and planning processes',
    description: 'Ensure young people are actively represented in formal environmental, climate, and security decision-making bodies at local and national levels.'
  },
  {
    id: 'participation_protection',
    name: 'Link participation with protection',
    description: 'Provide safeguarding mechanisms, legal protection, and physical safety guarantees for youth peacebuilders and environmental advocates.'
  },
  {
    id: 'prevention_resilience',
    name: 'Integrate youth into prevention and resilience strategies',
    description: 'Support youth-led climate adaptation, early warning systems, ecosystem restoration, and sustainable livelihoods.'
  },
  {
    id: 'nexus_partnerships',
    name: 'Build partnerships across the nexus',
    description: 'Facilitate cooperation between youth-led organizations, state ministries, civil society, and international partners.'
  }
];

export const toolkitMethodologyPrinciples = [
  'Inception review and mapping analysis to anchor tools in African context realities.',
  'Two-way YCPS analytical matrix structure linking YPS pillars and climate risk dynamics.',
  'Combined packaging: conceptual framework, practical tools, audience-specific guidance, and African case studies.',
  'Alignment with DEDI Component 3 (youth-centered climate resilience, dialogues, and policy uptake).'
];

export const moduleMethodologyMap = {
  matrix: {
    description: 'Translates the two-way YCPS framework, integrating climate risk across the 5 YPS pillars while highlighting youth agency entry points.',
    grounding: 'Technical Note: Two-way YCPS framework'
  },
  pathways: {
    description: 'Models how climate hazards compound vulnerabilities, livelihoods, and institutional capacities, avoiding simplistic direct causality.',
    grounding: 'Practice Note: Multidimensional climate-security feedback loops'
  },
  stakeholders: {
    description: 'Identifies partnership models and coordination opportunities across ministries, youth organizations, and regional bodies.',
    grounding: 'Technical Note & Practice Note: Nexus partnerships and national ownership'
  },
  training: {
    description: 'Delivers structured, scenario-based trainer guidance, group activities, and printable simulation handouts tailored to different audiences.',
    grounding: 'Technical Note: Audience-specific guidance and Trainer’s Guide packaging'
  },
  review: {
    description: 'Conducts red-team audits to verify diplomatic language compliance, protection inclusion, and context sensitivity.',
    grounding: 'Practice Note: Safe handling of PVE-climate linkages and conflict sensitivity'
  }
};

export const METHOD_TAGS = [
  'Recognition → Implementation',
  'Participation + Protection',
  'Prevention + Resilience',
  'Partnerships Across the Nexus',
  'Two-Way CPS × YPS Framework',
  'Audience-Specific Guidance',
  'Validation and Follow-Up'
];

export interface WordingRule {
  prohibitedPattern: RegExp;
  prohibitedWord: string;
  approvedReplacement: string;
  reason: string;
  category: string;
  confidence: 'Direct replacement' | 'Context-sensitive suggestion' | 'To be validated';
}

export const APPROVED_VOCABULARY_RULES: readonly WordingRule[] = [
  {
    prohibitedPattern: /climate\s+(?:directly\s+)?causes?\s+(?:conflict|war)|climate[-\s]conflict\s+(?:is\s+)?direct|causes?\s+war/i,
    prohibitedWord: 'climate causes conflict',
    approvedReplacement: 'climate-related risks compound existing vulnerabilities and contribute to instability under specific conditions',
    reason: 'Avoid overstating causal links. Climate-related stressors do not directly cause war, but rather interact with socio-economic context factors.',
    category: 'Unsupported climate-conflict causality',
    confidence: 'Context-sensitive suggestion'
  },
  {
    prohibitedPattern: /failed\s+state|failed\s+governance|government\s+failed|failed\s+to\s+manage|government\s+failure|state\s+collapse/i,
    prohibitedWord: 'failed state / governance failure',
    approvedReplacement: 'governance and institutional capacity constraints',
    reason: 'Support sovereign national ownership and use constructive, non-inflammatory diplomatic phrasing instead of pointing blame.',
    category: 'Government-blaming language',
    confidence: 'Direct replacement'
  },
  {
    prohibitedPattern: /vulnerable\s+youth|youth\s+(?:are\s+)?vulnerable/i,
    prohibitedWord: 'vulnerable youth / youth are vulnerable',
    approvedReplacement: 'young people face differentiated risks while contributing as active agents of resilience, prevention, and peacebuilding',
    reason: 'Avoid framing young people primarily as passive victims. Highlight their active agency and local adaptation capacity.',
    category: 'Youth victim-only framing',
    confidence: 'Context-sensitive suggestion'
  },
  {
    prohibitedPattern: /radicalization\s+risk|radical\s+youth|youth\s+radicalization|radicalization\s+is\s+caused|driving\s+youth\s+radicalization/i,
    prohibitedWord: 'youth radicalization / radical youth',
    approvedReplacement: 'exposure to livelihood pressures and recruitment vulnerabilities',
    reason: 'Do not securitize youth or frame them primarily as security threats or recruitment risks. Use development-oriented framing.',
    category: 'Youth securitization',
    confidence: 'Context-sensitive suggestion'
  },
  {
    prohibitedPattern: /security\s+(?:response|solution|forces)|military\s+intervention|military\s+solution|armed\s+containment/i,
    prohibitedWord: 'security response / security solution / military intervention',
    approvedReplacement: 'conflict-sensitive, rights-based, and prevention-oriented response',
    reason: 'Avoid over-securitizing climate adaptation or local resource access disputes. Emphasize developmental and community-led solutions.',
    category: 'Over-securitization',
    confidence: 'Direct replacement'
  },
  {
    prohibitedPattern: /universal\s+solution|universal\s+model|standard\s+prescription/i,
    prohibitedWord: 'universal solution',
    approvedReplacement: 'context-specific, locally owned intervention',
    reason: 'Context specificity is vital for YCPS programming. Avoid applying generic frameworks without local adaptation.',
    category: 'Generic recommendation',
    confidence: 'Context-sensitive suggestion'
  },
  {
    prohibitedPattern: /radicalization\s+trigger|terrorist\s+recruits?|extremist\s+magnet/i,
    prohibitedWord: 'radicalization trigger / terrorist recruit',
    approvedReplacement: 'livelihood pressures and vulnerabilities to recruitment',
    reason: 'Maintain careful, analytical diplomatic language. Focus on structural economic and environmental drivers.',
    category: 'Over-securitization',
    confidence: 'Direct replacement'
  },
  {
    prohibitedPattern: /international\s+actors?\s+(?:should\s+)?impose\s+(?:a\s+)?solutions?/i,
    prohibitedWord: 'international actors should impose solutions',
    approvedReplacement: 'responses should be grounded in national ownership, local priorities, and context-specific evidence',
    reason: 'Preserve national ownership and avoid externally imposed prescriptions.',
    category: 'Weak national ownership',
    confidence: 'To be validated'
  },
  {
    prohibitedPattern: /ai[-\s]+powered\s+official\s+advice/i,
    prohibitedWord: 'AI-powered official advice',
    approvedReplacement: 'draft support from a prototype support tool, to be validated',
    reason: 'Do not imply that prototype-generated text constitutes official or institutionally endorsed advice.',
    category: 'Too much jargon',
    confidence: 'Direct replacement'
  }
];

export interface WorkplanActivity {
  id: string;
  name: string;
  description: string;
  outputs: string[];
}

export const WORKPLAN_ACTIVITIES: WorkplanActivity[] = [
  {
    id: 'diplomat_training',
    name: 'Diplomat Capacity Building on Climate, Peace & Security and YPS',
    description: 'Training courses for African diplomats to mainstream youth perspectives and climate-security factors in diplomacy.',
    outputs: ['Diplomatic Briefing Note', 'Policy Brief', 'Regional Action Indicators']
  },
  {
    id: 'workshop_post_conflict',
    name: 'Workshop on Youth-Centered CPS in Post-Conflict Reconstruction and Development',
    description: 'Practical workshops focusing on environmental peacebuilding and green reintegration of demobilized youth.',
    outputs: ['Reintegration Strategy', 'Local Water Sharing Code', 'Soil Rehabilitation Plan']
  },
  {
    id: 'pre_cop_youth',
    name: 'Pre-COP / COP Workshop on African Youth Priorities',
    description: 'Consultation forums preparing youth delegates to negotiate African climate-security priorities at COP.',
    outputs: ['Refugee Firewood Briquette Scheme', 'Youth Manifesto', 'Adaptation Fund Proposal']
  },
  {
    id: 'intergenerational_dialogue',
    name: 'Intergenerational Dialogue Workshops on Local Climate Security',
    description: 'Facilitating structured dispute-resolution dialogues between youth committees and traditional elders over water.',
    outputs: ['Pastoral Corridor Mediation Agreement', 'Water Management Rota', 'Joint Peace Council Mandate']
  },
  {
    id: 'aswan_forum',
    name: 'Aswan Forum Session on Youth, Climate, Peace and Security in Africa',
    description: 'High-level policy dialogue sessions bringing youth resilience innovations to heads of state and regional leaders.',
    outputs: ['Aswan Policy Recommendation Brief', 'Youth Green Incubation Strategy']
  },
  {
    id: 'national_capacity',
    name: 'Capacity Building for National Governance & Local Institutions',
    description: 'Technical seminars assisting ministries of environment, water, and youth in formulating joint YCPS action plans.',
    outputs: ['Integrated Ministerial Action Matrix', 'National Adaptation Plan (NAP) Youth Annex']
  }
];

export interface ComplianceWarning {
  field: string;
  word: string;
  replacement: string;
  reason: string;
}

export const checkTextCompliance = (fieldName: string, text: string): ComplianceWarning[] => {
  const warnings: ComplianceWarning[] = [];
  if (!text) return warnings;

  APPROVED_VOCABULARY_RULES.forEach((rule) => {
    if (rule.prohibitedPattern.test(text)) {
      warnings.push({
        field: fieldName,
        word: rule.prohibitedWord,
        replacement: rule.approvedReplacement,
        reason: rule.reason
      });
    }
  });

  return warnings;
};
