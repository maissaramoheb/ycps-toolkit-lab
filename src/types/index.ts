export type YPSPillarId =
  | 'participation'
  | 'protection'
  | 'prevention'
  | 'partnerships'
  | 'disengagement_reintegration';

export interface YPSPillar {
  id: YPSPillarId;
  name: string;
  description: string;
}

export interface MatrixEntry {
  pillarId: YPSPillarId;
  climateSecurityConsideration: string;
  youthRoleAgency: string;
  protectionConcern: string;
  practicalEntryPoint: string;
  suggestedAction: string;
  indicator: string;
  diplomaticWording: string;
  redTeamWarning: string;
}

export type PeaceSecurityPathwayType =
  | 'livelihood_loss'
  | 'forced_displacement'
  | 'resource_competition'
  | 'armed_group_exploitation'
  | 'elite_capture'
  | 'gbv_protection'
  | 'intergenerational_exclusion'
  | 'weak_institutional_capacity'
  | 'other';

export type EvidenceStrengthType = 'High' | 'Medium' | 'Low' | 'Unclear';

export interface RiskPathway {
  id: string;
  context: string; // Country / Region / Area
  hazard: string; // Climate hazard / stressor
  exposure: string;
  vulnerability: string;
  capacityConstraint: string; // Governance or institutional capacity constraint
  pathwayType: PeaceSecurityPathwayType;
  youthImpact: string;
  youthOpportunity: string;
  intervention: string;
  evidenceStrength: EvidenceStrengthType;
  evidenceGaps: string;
}

export type ActorType =
  | 'youth_actor'
  | 'government_institution'
  | 'climate_actor'
  | 'peacebuilding_actor'
  | 'security_rol_actor'
  | 'women_led_organization'
  | 'traditional_leader'
  | 'donor'
  | 'regional_organization'
  | 'civil_society'
  | 'possible_spoiler'
  | 'other';

export type InfluenceType = 'High' | 'Medium' | 'Low';
export type PositionType = 'Supportive' | 'Neutral' | 'Opposed' | 'Undetermined';
export type YouthInclusionQualityType = 'High' | 'Medium' | 'Low' | 'None';

export interface Stakeholder {
  id: string;
  name: string;
  actorType: ActorType;
  interest: string;
  influence: InfluenceType;
  position: PositionType;
  youthInclusionQuality: YouthInclusionQualityType;
  risks: string;
  diplomaticSensitivity: string;
  engagementStrategy: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  region: string;
  summary: string;
  riskPathways: string[];
  lessonsLearned: string[];
}

export interface TrainingSession {
  id: string;
  title: string;
  moduleName: string;
  duration: string;
  objectives: string[];
}

export interface QualityCheckItem {
  id: string;
  category: string;
  question: string;
  checked: boolean;
}

export interface ToolkitOutput {
  id: string;
  title: string;
  type: string;
  dateGenerated: string;
}
