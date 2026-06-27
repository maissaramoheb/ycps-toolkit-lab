export type SourceId =
  | 'tor'
  | 'proj_doc'
  | 'workplan'
  | 'cps_manual'
  | 'beyond_vuln'
  | 'peace_ops';

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
    focusArea: 'Climate risk analysis, scenario-based learning, and Pokuland simulation structures.',
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
  }
};

export interface WordingRule {
  prohibitedPattern: RegExp;
  prohibitedWord: string;
  approvedReplacement: string;
  reason: string;
}

export const APPROVED_VOCABULARY_RULES: readonly WordingRule[] = [
  {
    prohibitedPattern: /climate\s+(?:directly\s+)?causes?\s+(?:conflict|war)|climate[-\s]conflict\s+(?:is\s+)?direct|causes?\s+war/i,
    prohibitedWord: 'climate causes conflict',
    approvedReplacement: 'climate-related risks compound existing vulnerabilities',
    reason: 'Avoid overstating causal links. Climate-related stressors may compound existing vulnerabilities under specific conditions.'
  },
  {
    prohibitedPattern: /failed\s+state|failed\s+governance|government\s+failure|state\s+collapse/i,
    prohibitedWord: 'failed state / governance failure',
    approvedReplacement: 'governance and institutional capacity constraints',
    reason: 'Support sovereign national ownership and use constructive, non-inflammatory diplomatic phrasing.'
  },
  {
    prohibitedPattern: /vulnerable\s+youth|youth\s+(?:are\s+)?vulnerable|youth\s+risk|radicalization\s+risk|radical\s+youth|youth\s+radicalization/i,
    prohibitedWord: 'vulnerable youth / youth are vulnerable / youth radicalization risk',
    approvedReplacement: 'young people face differentiated risks and contribute as active agents of resilience, prevention, and peacebuilding',
    reason: 'Avoid framing young people primarily as security threats, risks, or passive victims. Highlight agency and innovation.'
  },
  {
    prohibitedPattern: /security\s+(?:response|solution)|military\s+intervention|military\s+solution|armed\s+containment/i,
    prohibitedWord: 'security response / security solution / military intervention',
    approvedReplacement: 'conflict-sensitive, rights-based, and prevention-oriented response',
    reason: 'Avoid over-securitizing climate adaptation or youth activities. Emphasize developmental and community-led solutions.'
  },
  {
    prohibitedPattern: /universal\s+solution|universal\s+model|standard\s+prescription/i,
    prohibitedWord: 'universal solution',
    approvedReplacement: 'context-specific, locally owned intervention',
    reason: 'Context specificity is vital for YCPS programming. Avoid applying generic frameworks without local adaptation.'
  },
  {
    prohibitedPattern: /radicalization\s+trigger|terrorist\s+recruits?|extremist\s+magnet/i,
    prohibitedWord: 'radicalization trigger / terrorist recruit',
    approvedReplacement: 'exposure to livelihood pressures and recruitment vulnerabilities',
    reason: 'Maintain careful, analytical diplomatic language. Focus on structural economic and environmental drivers.'
  },
  {
    prohibitedPattern: /international\s+actors?\s+(?:should\s+)?impose\s+(?:a\s+)?solutions?/i,
    prohibitedWord: 'international actors should impose solutions',
    approvedReplacement: 'responses should be grounded in national ownership, local priorities, and context-specific evidence',
    reason: 'Preserve national ownership and avoid externally imposed prescriptions.'
  },
  {
    prohibitedPattern: /ai[-\s]+powered\s+official\s+advice/i,
    prohibitedWord: 'AI-powered official advice',
    approvedReplacement: 'draft support from a prototype support tool, to be validated',
    reason: 'Do not imply that prototype-generated text constitutes official or institutionally endorsed advice.'
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
