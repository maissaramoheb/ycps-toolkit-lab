'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { SourceId } from '@/lib/sourceTruth';
import { CopyButton } from '@/components/CopyButton';
import { WorkflowStrip } from '@/components/WorkflowStrip';
import Link from 'next/link';

interface CaseStudy {
  id: string; // matches scenarioId exactly
  title: string;
  region: 'North Africa' | 'East & Horn of Africa' | 'West & Central Africa' | 'Fictional';
  pathway: 'Resource herding/competition' | 'Armed herder group exploitation' | 'Livelihood loss' | 'Forced displacement' | 'Elite capture';
  ypsPillar: 'Participation' | 'Prevention' | 'Protection' | 'Reintegration' | 'Partnerships';
  summary: string;
  trainingUse: string;
  policyUse: string;
  evidenceStrength: 'High' | 'Medium' | 'Low' | 'Unclear';
  
  // Detailed fields
  context: string;
  stressors: string;
  risksAndVulnerabilities: string;
  securityDynamics: string;
  youthDimensions: string;
  integrationOpportunities: string;
  stakeholderGroups: string[];
  pathwayPrompts: string;
  interventions: string;
  cautions: string[];
  questions: string[];
}

export default function CaseStudiesPage() {
  const { loadScenario } = useApp();
  
  // Active states
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [activeSourceTab, setActiveSourceTab] = useState<SourceId>('tor');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filters State
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [filterPathway, setFilterPathway] = useState<string>('all');
  const [filterPillar, setFilterPillar] = useState<string>('all');
  const [filterTraining, setFilterTraining] = useState<string>('all');
  const [filterPolicy, setFilterPolicy] = useState<string>('all');

  const compileParticipantHandout = (cs: CaseStudy) => {
    return `YCPS Participant Handout - Case Study: ${cs.title}
--------------------------------------------------
1. Scenario Context:
${cs.context}

2. Environmental Stressors:
${cs.stressors}

3. Youth Agency & Opportunities:
${cs.youthDimensions}
Entry Point: ${cs.integrationOpportunities}

4. Discussion & Action Prompts:
${cs.questions.map((q, i) => `${i+1}. ${q}`).join('\n')}

*Disclaimer: Draft training material to be validated against localized conditions.`;
  };

  const compileFacilitatorNotes = (cs: CaseStudy) => {
    return `YCPS Facilitator Guidance Notes: ${cs.title}
--------------------------------------------------
- Main YPS Pillar: ${cs.ypsPillar}
- Primary Conflict Pathway: ${cs.pathway}
- Participation/Protection Safeguard Link: Formalize youth seats on resource councils while actively mitigating elder retaliation and border conflict vulnerabilities.
- Prevention/Resilience Link: Transition drying pasture risks into climate-resilient agropastoral youth cooperative programs.
- Facilitator Cautions & Safeguards:
${cs.cautions.map((c) => `- ${c}`).join('\n')}
- Validation Guidelines: Ensure evidence quality (${cs.evidenceStrength}) is highlighted. Address gaps: traditional elder alignment and border security coordinates.`;
  };

  const cases: CaseStudy[] = [
    {
      id: 'sahel',
      title: 'Sahel / Lake Chad Basin herder-farmer mediation',
      region: 'West & Central Africa',
      pathway: 'Resource herding/competition',
      ypsPillar: 'Participation',
      summary: 'Drying of Lake Chad shifts herder routes, driving localized resource clashes where community councils lack herder youth representation.',
      trainingUse: 'Regional Security Seminars',
      policyUse: 'Cross-border Stabilization Plans',
      evidenceStrength: 'High',
      context: 'The Lake Chad Basin (spanning Niger, Nigeria, Chad, and Cameroon) has experienced severe environmental variability, changing grazing patterns and herder transhumance corridors.',
      stressors: 'Siltation, drying of floodplains, expanding desert margins, and highly unpredictable rainfall cycles.',
      risksAndVulnerabilities: 'Agropastoral communities depend entirely on rain-fed crops and natural pastures. The lack of clean surface water compounds historical vulnerabilities.',
      securityDynamics: 'Shifts in transhumance timing cause herders to enter farming zones before crops are harvested, leading to crop destruction, herder retaliation, and localized skirmishes that are sometimes exploited by armed groups.',
      youthDimensions: 'Young herders handle migration decisions under severe stress, while young farmers bear the brunt of crop losses. Youth are active in forming local herder-farmer mediation committees.',
      integrationOpportunities: 'Formalizing herder-farmer youth committees inside traditional local governance structures to pre-negotiate seasonal water pan sharing.',
      stakeholderGroups: [
        'Lake Chad Basin Commission herder desks',
        'Association of herder herders (local youth group)',
        'Traditional local council of elders'
      ],
      pathwayPrompts: 'Stressor: rainfall shifts -> Exposure: agropastoral herding herders -> Vulnerability: loss of pasture -> Capacity Constraint: lack of municipal herder corridors -> Conflict Pathway: herder clashes.',
      interventions: 'Demarcating regional grazing corridors using GPS herding apps managed by mixed herder herding youth committees.',
      cautions: [
        'Do not overstate climate-conflict links. Environmental factors act as threat multipliers, not direct triggers.',
        'Avoid securitizing pastoral herder youth; frame them as technical herder resource managers.',
        'Preserve national ownership by partnering with local borderland administrations.'
      ],
      questions: [
        'How can herder youth herding committees verify water availability along corridors prior to migration?',
        'In what ways can traditional elders be integrated into herder youth monitoring councils without blocking youth leadership?'
      ]
    },
    {
      id: 'somalia',
      title: 'Somalia pastoral conflicts',
      region: 'East & Horn of Africa',
      pathway: 'Elite capture',
      ypsPillar: 'Prevention',
      summary: 'Severe droughts trigger water point capture by dominant clans, excluding minority herding youth and heightening resource access constraints.',
      trainingUse: 'Diplomatic Briefings',
      policyUse: 'National Adaptation Plans',
      evidenceStrength: 'Medium',
      context: 'Semi-arid pastoral zones in central and southern Somalia where clan systems govern access to deep wells and shallow boreholes.',
      stressors: 'Frequent multi-season droughts, vegetation loss, and flash floods that destroy infrastructure.',
      risksAndVulnerabilities: 'Absolute dependence of nomadic pastoralists on deep aquifers. Clannish control of water points leaves minor lineages marginalized.',
      securityDynamics: 'Water points are captured by dominant herder clan militias during droughts, forcing minority herding groups to pay high fees, which can compound historical clan grievances.',
      youthDimensions: 'Excluded herding youth face absolute loss of livestock, exposing them to heightened recruitment risks under resource constraints. Youth networks lead local water trucking operations.',
      integrationOpportunities: 'Establishing multi-clan youth environmental protection committees to manage common sand dams and open herding ranges.',
      stakeholderGroups: [
        'Somali Ministry of Energy and Water Resources',
        'Somali Youth for Climate Action (SYCA)',
        'Clan elders and local water user boards'
      ],
      pathwayPrompts: 'Stressor: severe drought -> Exposure: nomadic pastoral herders -> Vulnerability: clan water exclusion -> Capacity Constraint: weak state utility networks -> Conflict Pathway: water herding disputes.',
      interventions: 'Constructing community sand dams with rain-harvesting channels, co-managed by youth herder user groups.',
      cautions: [
        'Do not blame clan hierarchies directly in policy documents; describe them as traditional resource user networks.',
        'Ensure all interventions follow clan-neutral conflict sensitivity protocols.',
        'Validate evidence against UN and IGAD monitoring reports.'
      ],
      questions: [
        'How can resource intervention avoid feeding into local clan competition for water infrastructure?',
        'What protection frameworks prevent youth herders from being targeted when reporting water user violations?'
      ]
    },
    {
      id: 'south_sudan',
      title: 'South Sudan local peace',
      region: 'East & Horn of Africa',
      pathway: 'Armed herder group exploitation',
      ypsPillar: 'Reintegration',
      summary: 'White Nile floods displace cattle herders into agricultural highlands, causing clashes that militarized cattle camp youth herders navigate.',
      trainingUse: 'Local Mediation Workshops',
      policyUse: 'Peace Operations Design',
      evidenceStrength: 'Medium',
      context: 'Jonglei and Lakes Governorates, which have faced unprecedented, multi-year flooding of the Sudd wetlands.',
      stressors: 'Unprecedented rainfall, rising river basins, and massive environmental displacement.',
      risksAndVulnerabilities: 'High reliance on livestock (cattle camps). Floods destroy agricultural land and grazing fields, forcing herders to relocate to highland agricultural zones.',
      securityDynamics: 'Cattle herder movement into crop zones leads to clashes. Cattle camp youth (' + 'Gelweng' + ') act as local defense forces, increasing local arms carrying.',
      youthDimensions: 'Young cattle herders coordinate camp defense but are receptive to local peace dialogs; ex-combatant youth herders participate in shared flood defense works.',
      integrationOpportunities: 'Green Reintegration programs where demobilized herding youth and local communities work together on flood embankment dykes.',
      stakeholderGroups: [
        'National Peace Commission (South Sudan)',
        'Gelweng Youth Leaders (Jonglei cattle camps)',
        'Local municipal agricultural committees'
      ],
      pathwayPrompts: 'Stressor: extreme Sudd wetland flooding -> Exposure: herder cattle camps -> Vulnerability: pasture loss -> Capacity Constraint: low local police presence -> Conflict Pathway: cattle raiding.',
      interventions: 'Joint returnee-community green work programs focusing on clay dyke building and soil restoration.',
      cautions: [
        'Avoid pointing blame at state security services. Frame challenges around institutional capacity constraints.',
        'Avoid depicting cattle camp youth primarily as violent militias; emphasize their community preservation role.',
        'Integrate gender-responsive safety nets for young women in camp zones.'
      ],
      questions: [
        'How can agricultural herder cooperation build trust between displaced pastoralists and host farmers?',
        'What incentives keep demobilized camp herders engaged in green dyke construction long-term?'
      ]
    },
    {
      id: 'horn_of_africa',
      title: 'Horn of Africa displacement',
      region: 'East & Horn of Africa',
      pathway: 'Forced displacement',
      ypsPillar: 'Protection',
      summary: 'Drought forcing rural herder youth into informal peri-urban camps, triggering friction over firewood and local resources.',
      trainingUse: 'Regional Displacement Forums',
      policyUse: 'Cross-border Humanitarian Action',
      evidenceStrength: 'Low',
      context: 'Displacement camps and host communities in Garissa County, Kenya, hosting herding herders fleeing droughts in Somalia and borderlands.',
      stressors: 'Consecutive season rainfall failure, water scarcity, and agricultural collapse.',
      risksAndVulnerabilities: 'Displaced nomadic herders enter informal camps with zero assets, facing high food insecurity and limited water.',
      securityDynamics: 'Competition for scarce firewood and pasture between displaced herders and host community herders leads to local environmental protection clashes.',
      youthDimensions: 'Displaced youth organize volunteer brigades to clear invasive prosopis weeds, though they face strict legal work and movement barriers.',
      integrationOpportunities: 'Establishing youth-led green cooperatives that convert invasive weeds into charcoal briquettes for host-camps trade.',
      stakeholderGroups: [
        'IGAD Secretariat on Displacement',
        'Garissa Youth Environmental Network (Kenya)',
        'UNHCR camp environmental desks'
      ],
      pathwayPrompts: 'Stressor: consecutive droughts -> Exposure: displaced rural herders -> Vulnerability: lack of livelihood -> Capacity Constraint: camp regulatory limits -> Conflict Pathway: resource gathering clashes.',
      interventions: 'Funding youth-led cooperative green energy ventures (prosopis weed processing hubs) in host communities.',
      cautions: [
        'Flag this case study as "To Be Validated" due to limited empirical tracking of host-refugee resource conflicts.',
        'Avoid over-securitizing refugees; keep solutions economic and humanitarian.',
        'Ensure projects respect host country laws on refugee employment.'
      ],
      questions: [
        'How does green enterprise integration reduce herder-host resource friction?',
        'What protection measures ensure equal revenue share for young herder herding women in green fuel processing?'
      ]
    },
    {
      id: 'egypt',
      title: 'North Africa / Egypt green transition and youth engagement',
      region: 'North Africa',
      pathway: 'Livelihood loss',
      ypsPillar: 'Partnerships',
      summary: 'Nile Delta soil salinization drives rural youth to coastal cities. Academic green start-ups provide adaptation tools.',
      trainingUse: 'COP Consultations',
      policyUse: 'Green Transition Strategy',
      evidenceStrength: 'High',
      context: 'The Nile Delta and coastal cities of Egypt, facing agricultural degradation due to rising seas.',
      stressors: 'Sea-level rise, coastal erosion, salinization of arable soil, and extreme heat.',
      risksAndVulnerabilities: 'High youth density in the delta with heavy economic dependence on agriculture and fisheries. Soil salinity ruins farm yields.',
      securityDynamics: 'Degradation of delta farmland drives youth migration to Alexandria and Cairo, increasing competition for water, space, and jobs.',
      youthDimensions: 'University youth lead scientific innovation, delta soil monitoring, and green entrepreneurship.',
      integrationOpportunities: 'Pairing delta agricultural youth cooperatives with technical university green startups for salinity-resistant farming.',
      stakeholderGroups: [
        'Ministry of Environment (Egypt)',
        'Nile Delta Green Youth Coalition (NGO)',
        'Egyptian National Development Banks'
      ],
      pathwayPrompts: 'Stressor: sea-level rise -> Exposure: Delta farming youth herders -> Vulnerability: soil salinization -> Capacity Constraint: centralized green finance -> Conflict Pathway: urban resource competition.',
      interventions: 'Supporting delta soil restoration startups and youth energy cooperatives through micro-finance grants.',
      cautions: [
        'Keep Nile water discussions focused strictly on local efficiency, adaptation, and green jobs. Avoid transboundary politics.',
        'Ensure start-up projects align with national economic green priorities.',
        'Do not describe urban delta migration as a security threat; describe it as demographic adaptation.'
      ],
      questions: [
        'How can national development banks expand micro-finance options for rural delta youth cooperatives?',
        'In what ways can university science labs adapt delta research to match small-scale youth herder farms?'
      ]
    },
    {
      id: 'carana',
      title: 'CARANA fictional training scenario',
      region: 'Fictional',
      pathway: 'Resource herding/competition',
      ypsPillar: 'Participation',
      summary: 'Fictional border dispute over the Sudd-fed Carana River herding zones, designed for diplomat training simulations.',
      trainingUse: 'Scenario-based simulation',
      policyUse: 'Stabilization training',
      evidenceStrength: 'Unclear',
      context: 'Fictional border region between Upper and Lower CARANA, containing changing agropastoral corridors and the Carana River basin.',
      stressors: 'Shifting river corridors, sudden regional droughts, and unmapped herding corridors.',
      risksAndVulnerabilities: 'High borderland dependency on shared water basins. Frontier communities lack formal communication channels.',
      securityDynamics: 'Migrating herders cross frontiers without local permit notice, causing local herder defense mobilizations and border security skirmishes.',
      youthDimensions: 'Borderland youth herders coordinate river access timings but face specific protection risks and border transhumance arrest threats.',
      integrationOpportunities: 'Establishing a joint youth-led CARANA Borderland Water Pan Commission to manage shared ranges.',
      stakeholderGroups: [
        'CARANA Water Commission (Joint board)',
        'Carana River Youth Alliance (CRYA)',
        'Borderland local traditional councils'
      ],
      pathwayPrompts: 'Stressor: Carana River shifting -> Exposure: borderland herder herders -> Vulnerability: lack of border checkpoints -> Capacity Constraint: uncoordinated border policies -> Conflict Pathway: borderland resource clashes.',
      interventions: 'Setting up joint youth-elder border resource monitoring kiosks equipped with mobile GPS herder trackers.',
      cautions: [
        'This is a fictional training model. Use to test extreme scenarios without political sensitivities.',
        'Ensure neither Upper nor Lower CARANA is framed as a "failed state."',
        'Focus herders on corridor coordination and mediation rather than military containment.'
      ],
      questions: [
        'How does joint border resource management reduce the need for military intervention during extreme dry seasons?',
        'What indicators measure the quality of youth herder inclusion in joint border resource commissions?'
      ]
    }
  ];

  // Load Scenario with Confirmation
  const handleLoadScenario = (caseId: string, caseTitle: string) => {
    const confirmLoad = window.confirm(
      `This will replace your current working notes in the Matrix, Risk Pathways, and Stakeholder Mapper with research data for "${caseTitle}".\n\nContinue?`
    );
    
    if (confirmLoad) {
      loadScenario(caseId);
      setSuccessMessage(`Successfully loaded "${caseTitle}" data into your workspace!`);
      setTimeout(() => setSuccessMessage(null), 4000);
    }
  };

  // Compile case Markdown brief for clipboard
  const getMarkdownBrief = (cs: CaseStudy) => {
    let md = `# YCPS CASE STUDY BRIEF: ${cs.title.toUpperCase()}\n`;
    md += `**Region:** ${cs.region} | **Main Pathway:** ${cs.pathway} | **YPS Pillar:** ${cs.ypsPillar}\n`;
    md += `**Evidence Strength:** ${cs.evidenceStrength} ${cs.evidenceStrength === 'Low' || cs.evidenceStrength === 'Unclear' ? '(TO BE VALIDATED)' : ''}\n`;
    md += `*Prototype Support Tool Case Study Lab — Not an official UN, CCCPA, or DEDI platform*\n\n`;
    md += `---\n\n`;
    
    md += `## 1. Context & Environmental Stressors\n`;
    md += `${cs.context}\n\n`;
    md += `**Climate Stressors:** ${cs.stressors}\n\n`;
    
    md += `## 2. Peace and Security Dynamics\n`;
    md += `${cs.securityDynamics}\n\n`;
    md += `**Interacting Vulnerabilities:** ${cs.risksAndVulnerabilities}\n\n`;
    
    md += `## 3. Youth Dimensions and Agency\n`;
    md += `${cs.youthDimensions}\n\n`;
    md += `**YPS × YCPS Entry Point:** ${cs.integrationOpportunities}\n\n`;
    
    md += `## 4. Suggested Stakeholder Groups\n`;
    cs.stakeholderGroups.forEach((st) => {
      md += `- ${st}\n`;
    });
    md += `\n`;
    
    md += `## 5. Risk Pathway Prompt\n`;
    md += `${cs.pathwayPrompts}\n\n`;
    
    md += `## 6. Recommended Interventions\n`;
    md += `${cs.interventions}\n\n`;
    
    md += `## 7. Red-Team & Diplomatic Wording Cautions\n`;
    cs.cautions.forEach((c) => {
      md += `- ⚠️ ${c}\n`;
    });
    md += `\n`;
    
    md += `## 8. Workshop Discussion Questions\n`;
    cs.questions.forEach((q) => {
      md += `- ${q}\n`;
    });
    md += `\n`;
    
    md += `---\n`;
    md += `*Disclaimer: Validate all case briefs against official policies and localized context-specific evidence before deployment.*`;
    
    return md;
  };

  const activeCase = cases.find((c) => c.id === selectedCaseId);

  // Filters logic
  const filteredCases = cases.filter((c) => {
    const matchReg = filterRegion === 'all' || c.region === filterRegion;
    const matchPath = filterPathway === 'all' || c.pathway === filterPathway;
    const matchPill = filterPillar === 'all' || c.ypsPillar === filterPillar;
    const matchTrain = filterTraining === 'all' || c.trainingUse === filterTraining;
    const matchPol = filterPolicy === 'all' || c.policyUse === filterPolicy;
    return matchReg && matchPath && matchPill && matchTrain && matchPol;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Workflow Strip */}
      <WorkflowStrip currentStep="context" />

      {/* This step produces box */}
      <div className="glass-panel p-4 rounded-xl border border-brand-gold/25 bg-gradient-to-r from-brand-navy-light/40 to-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs no-print">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block">📋 This Step Produces:</span>
          <p className="text-brand-grey-text">
            <strong>Task:</strong> Select and load a training case study context or configure a custom context. <br />
            <strong>Deliverable:</strong> Context summary and case-based exercise baseline.
          </p>
        </div>
        <Link
          href="/matrix"
          className="shrink-0 px-4 py-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-bold rounded-lg text-xs uppercase tracking-wider text-center transition-all cursor-pointer"
        >
          Next: Build YCPS Matrix →
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-grey-border/60 pb-5 no-print">
        <div>
          <h1 className="text-2xl font-bold text-brand-offwhite">
            African Case Study Lab
          </h1>
          <p className="text-xs text-brand-grey-text mt-1">
            Apply the YCPS framework to real and simulation training scenarios. Prefill your active workspace coordinates directly from case studies.
          </p>
        </div>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="p-4 bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-semibold rounded-lg shadow-md animate-pulse no-print">
          ✓ {successMessage}
        </div>
      )}

      {/* Top Source Grounding Panel and Tabs */}
      <div className="space-y-3 no-print">
        <div className="flex flex-wrap items-center gap-1.5 border-b border-brand-grey-border/40 pb-2">
          <span className="text-[10px] font-bold text-brand-grey-text uppercase tracking-widest mr-2">
            Grounding Guidelines:
          </span>
          <button
            onClick={() => setActiveSourceTab('tor')}
            type="button"
            className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
              activeSourceTab === 'tor'
                ? 'bg-brand-gold/15 text-brand-gold border-brand-gold'
                : 'bg-brand-navy-light text-brand-grey-text border-brand-grey-border/50 hover:text-brand-offwhite'
            }`}
          >
            Rank 1: ToR Case Requirements
          </button>
          <button
            onClick={() => setActiveSourceTab('cps_manual')}
            type="button"
            className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
              activeSourceTab === 'cps_manual'
                ? 'bg-brand-gold/15 text-brand-gold border-brand-gold'
                : 'bg-brand-navy-light text-brand-grey-text border-brand-grey-border/50 hover:text-brand-offwhite'
            }`}
          >
            Rank 4: CCCPA CPS Manual
          </button>
          <button
            onClick={() => setActiveSourceTab('workplan')}
            type="button"
            className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
              activeSourceTab === 'workplan'
                ? 'bg-brand-gold/15 text-brand-gold border-brand-gold'
                : 'bg-brand-navy-light text-brand-grey-text border-brand-grey-border/50 hover:text-brand-offwhite'
            }`}
          >
            Rank 3: DEDI Workplan
          </button>
          <button
            onClick={() => setActiveSourceTab('beyond_vuln')}
            type="button"
            className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
              activeSourceTab === 'beyond_vuln'
                ? 'bg-brand-gold/15 text-brand-gold border-brand-gold'
                : 'bg-brand-navy-light text-brand-grey-text border-brand-grey-border/50 hover:text-brand-offwhite'
            }`}
          >
            Rank 5: Beyond Vulnerability
          </button>
        </div>

        <SourceIntegrityPanel sourceId={activeSourceTab} />
      </div>

      {/* Main Content Layout */}
      {!selectedCaseId ? (
        // Grid View with filters
        <div className="grid lg:grid-cols-4 gap-6 items-start no-print">
          
          {/* Filters Column */}
          <div className="lg:col-span-1 glass-panel p-5 rounded-xl border border-brand-grey-border/60 space-y-4">
            <div className="border-b border-brand-grey-border/40 pb-2">
              <h3 className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                Case Study Filters
              </h3>
            </div>

            {/* Region Filter */}
            <div className="space-y-1">
              <label htmlFor="filter-region-select" className="block text-[10px] font-bold text-brand-offwhite uppercase tracking-widest">
                Region
              </label>
              <select
                id="filter-region-select"
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 rounded px-2.5 py-1.5 focus:outline-none focus:border-brand-gold cursor-pointer"
              >
                <option value="all">All Regions</option>
                <option value="North Africa">North Africa</option>
                <option value="East & Horn of Africa">East & Horn of Africa</option>
                <option value="West & Central Africa">West & Central Africa</option>
                <option value="Fictional">Fictional scenarios</option>
              </select>
            </div>

            {/* Pathway Filter */}
            <div className="space-y-1">
              <label htmlFor="filter-pathway-select" className="block text-[10px] font-bold text-brand-offwhite uppercase tracking-widest">
                Conflict Pathway
              </label>
              <select
                id="filter-pathway-select"
                value={filterPathway}
                onChange={(e) => setFilterPathway(e.target.value)}
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 rounded px-2.5 py-1.5 focus:outline-none focus:border-brand-gold cursor-pointer"
              >
                <option value="all">All Pathways</option>
                <option value="Resource herding/competition">Resource herding/competition</option>
                <option value="Armed herder group exploitation">Armed actor exploitation</option>
                <option value="Livelihood loss">Livelihood loss</option>
                <option value="Forced displacement">Forced displacement</option>
                <option value="Elite capture">Elite capture / resource capture</option>
              </select>
            </div>

            {/* YPS Pillar Filter */}
            <div className="space-y-1">
              <label htmlFor="filter-pillar-select" className="block text-[10px] font-bold text-brand-offwhite uppercase tracking-widest">
                Main YPS Pillar
              </label>
              <select
                id="filter-pillar-select"
                value={filterPillar}
                onChange={(e) => setFilterPillar(e.target.value)}
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 rounded px-2.5 py-1.5 focus:outline-none focus:border-brand-gold cursor-pointer"
              >
                <option value="all">All Pillars</option>
                <option value="Participation">Participation</option>
                <option value="Prevention">Prevention</option>
                <option value="Protection">Protection</option>
                <option value="Reintegration">Disengagement & Reintegration</option>
                <option value="Partnerships">Partnerships</option>
              </select>
            </div>

            {/* Training Use Filter */}
            <div className="space-y-1">
              <label htmlFor="filter-training-select" className="block text-[10px] font-bold text-brand-offwhite uppercase tracking-widest">
                Training target
              </label>
              <select
                id="filter-training-select"
                value={filterTraining}
                onChange={(e) => setFilterTraining(e.target.value)}
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 rounded px-2.5 py-1.5 focus:outline-none focus:border-brand-gold cursor-pointer"
              >
                <option value="all">All Training target</option>
                <option value="Regional Security Seminars">Regional Security Seminars</option>
                <option value="Diplomatic Briefings">Diplomatic Briefings</option>
                <option value="Local Mediation Workshops">Local Mediation Workshops</option>
                <option value="Regional Displacement Forums">Regional Displacement Forums</option>
                <option value="COP Consultations">COP Consultations</option>
                <option value="Scenario-based simulation">Scenario-based simulation</option>
              </select>
            </div>
            
            {/* Policy Use Filter */}
            <div className="space-y-1">
              <label htmlFor="filter-policy-select" className="block text-[10px] font-bold text-brand-offwhite uppercase tracking-widest">
                Policy target
              </label>
              <select
                id="filter-policy-select"
                value={filterPolicy}
                onChange={(e) => setFilterPolicy(e.target.value)}
                className="w-full text-xs bg-brand-navy-dark text-brand-offwhite border border-brand-grey-border/80 rounded px-2.5 py-1.5 focus:outline-none focus:border-brand-gold cursor-pointer"
              >
                <option value="all">All Policy Targets</option>
                <option value="Cross-border Stabilization Plans">Cross-border Stabilization Plans</option>
                <option value="National Adaptation Plans">National Adaptation Plans</option>
                <option value="Peace Operations Design">Peace Operations Design</option>
                <option value="Cross-border Humanitarian Action">Cross-border Humanitarian Action</option>
                <option value="Green Transition Strategy">Green Transition Strategy</option>
                <option value="Stabilization training">Stabilization training</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-grey-border/40 pb-2">
              <h3 className="text-sm font-semibold text-brand-offwhite">
                Starting Case Study Library ({filteredCases.length})
              </h3>
              <span className="text-[10px] text-brand-grey-text">Empirical & simulated contexts</span>
            </div>

            {filteredCases.length === 0 ? (
              <div className="glass-panel p-12 text-center rounded-xl border border-brand-grey-border/45 space-y-3">
                <div className="text-brand-grey-text/40 flex justify-center">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="text-sm font-bold text-brand-offwhite">No Case Studies Match</h4>
                <p className="text-xs text-brand-grey-text max-w-sm mx-auto">
                  Adjust your regional, YPS pillar, or pathway filter inputs to view starting case studies.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredCases.map((cs) => (
                  <div
                    key={cs.id}
                    className="glass-panel p-5 rounded-xl border border-brand-grey-border/60 hover:border-brand-gold/30 transition-all duration-300 flex flex-col justify-between space-y-4 relative group overflow-hidden"
                  >
                    {/* Top border color indicator based on evidence */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${
                      cs.evidenceStrength === 'High'
                        ? 'bg-brand-green'
                        : cs.evidenceStrength === 'Medium'
                        ? 'bg-brand-gold'
                        : 'bg-orange-400'
                    }`} />

                    <div className="space-y-2.5">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-navy-light text-brand-gold border border-brand-gold/10 uppercase">
                          {cs.region}
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-navy-light text-brand-grey-text border border-brand-grey-border/40 uppercase">
                          {cs.ypsPillar}
                        </span>
                        { (cs.evidenceStrength === 'Low' || cs.evidenceStrength === 'Unclear') && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-950/30 text-orange-400 border border-orange-500/20 uppercase tracking-widest">
                            To Be Validated
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-brand-offwhite group-hover:text-brand-gold transition-colors leading-snug">
                        {cs.title}
                      </h4>
                      <p className="text-xs text-brand-grey-text leading-relaxed">
                        {cs.summary}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-brand-grey-border/45">
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-brand-grey-text">
                        <div>
                          <span className="font-semibold text-brand-offwhite block">Training target:</span>
                          {cs.trainingUse}
                        </div>
                        <div>
                          <span className="font-semibold text-brand-offwhite block">Policy target:</span>
                          {cs.policyUse}
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedCaseId(cs.id)}
                        type="button"
                        className="w-full text-center px-3 py-2 bg-brand-navy-light hover:bg-brand-navy-dark text-brand-gold hover:text-brand-offwhite border border-brand-gold/25 hover:border-brand-gold rounded-lg text-xs font-bold transition-all cursor-pointer"
                      >
                        View Details & Apply to Workspace
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      ) : (
        // Split Screen Detail View
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Panel: Scrollable Case selector list */}
          <div className="lg:col-span-1 space-y-3 max-h-[700px] overflow-y-auto pr-1 no-print">
            <div className="border-b border-brand-grey-border/40 pb-2 flex justify-between items-center">
              <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider">
                Case Study Modules
              </h3>
              <button
                onClick={() => setSelectedCaseId(null)}
                type="button"
                className="text-[10px] font-bold text-brand-gold hover:underline cursor-pointer"
              >
                Back to Grid
              </button>
            </div>

            {cases.map((cs) => (
              <button
                key={cs.id}
                onClick={() => setSelectedCaseId(cs.id)}
                type="button"
                className={`w-full text-left p-4 rounded-xl border text-xs transition-all duration-200 cursor-pointer space-y-2 relative overflow-hidden ${
                  selectedCaseId === cs.id
                    ? 'bg-brand-navy-light/65 border-brand-gold text-brand-offwhite shadow-md'
                    : 'bg-brand-navy-dark/45 border-brand-grey-border/50 text-brand-grey-text hover:text-brand-offwhite hover:border-brand-grey-border/80'
                }`}
              >
                {/* Left accent block */}
                <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                  cs.evidenceStrength === 'High'
                    ? 'bg-brand-green'
                    : cs.evidenceStrength === 'Medium'
                    ? 'bg-brand-gold'
                    : 'bg-orange-400'
                }`} />

                <div className="pl-1 space-y-1">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[9px] font-bold text-brand-gold uppercase tracking-widest block">
                      {cs.region}
                    </span>
                    {(cs.evidenceStrength === 'Low' || cs.evidenceStrength === 'Unclear') && (
                      <span className="text-[8px] font-bold px-1 rounded bg-orange-950/30 text-orange-400 border border-orange-500/20 uppercase tracking-widest scale-90">
                        To Be Validated
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold leading-snug">{cs.title}</h4>
                </div>
              </button>
            ))}
          </div>

          {/* Right Panel: Styled detail Case sheet */}
          <div className="lg:col-span-2 space-y-6">
            
            {activeCase && (
              <div className="bg-slate-900 border border-brand-grey-border rounded-xl p-6 md:p-8 shadow-2xl relative overflow-hidden print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
                
                {/* Left Border Status Indicator based on evidence strength */}
                <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                  activeCase.evidenceStrength === 'High'
                    ? 'bg-brand-green'
                    : activeCase.evidenceStrength === 'Medium'
                    ? 'bg-brand-gold'
                    : 'bg-orange-400'
                }`} />

                {/* Case Sheet Header */}
                <div className="border-b-2 border-brand-gold pb-5 space-y-2 mb-6 print:border-black pl-1">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[10px] font-bold text-brand-gold tracking-widest uppercase block print:text-black">
                      YCPS Empirical Case Briefing Sheet
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-brand-navy-light text-brand-offwhite border border-brand-grey-border uppercase print:text-black">
                        Evidence Strength: {activeCase.evidenceStrength}
                      </span>
                      {(activeCase.evidenceStrength === 'Low' || activeCase.evidenceStrength === 'Unclear') && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-orange-950/40 text-orange-400 border border-orange-500/20 uppercase tracking-widest print:text-orange-700">
                          To Be Validated
                        </span>
                      )}
                    </div>
                  </div>

                  <h2 className="text-xl md:text-2xl font-extrabold text-brand-offwhite leading-snug print:text-black mt-1">
                    {activeCase.title}
                  </h2>

                  <div className="flex flex-wrap gap-2 text-[10px] text-brand-grey-text print:text-gray-600 pt-1">
                    <span className="bg-brand-navy-light/45 px-2 py-0.5 rounded border border-brand-grey-border/30">Region: <span className="font-semibold text-brand-offwhite print:text-black">{activeCase.region}</span></span>
                    <span className="bg-brand-navy-light/45 px-2 py-0.5 rounded border border-brand-grey-border/30">Pathway: <span className="font-semibold text-brand-offwhite print:text-black">{activeCase.pathway}</span></span>
                    <span className="bg-brand-navy-light/45 px-2 py-0.5 rounded border border-brand-grey-border/30">Pillar: <span className="font-semibold text-brand-offwhite print:text-black">{activeCase.ypsPillar}</span></span>
                  </div>
                </div>

                {/* Detail Action Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-brand-navy-light/30 border border-brand-grey-border/40 p-3 rounded-lg mb-6 no-print">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLoadScenario(activeCase.id, activeCase.title)}
                      type="button"
                      className="px-3.5 py-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark font-bold rounded-lg text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md shadow-brand-gold/10"
                    >
                      Load this case into workspace
                    </button>
                    <CopyButton text={getMarkdownBrief(activeCase)} label="Export Case Brief" />
                  </div>
                  <button
                    onClick={() => setSelectedCaseId(null)}
                    type="button"
                    className="text-xs text-brand-grey-text hover:text-brand-offwhite font-semibold transition-all cursor-pointer"
                  >
                    ← Back to Grid
                  </button>
                </div>

                {/* Practical Output: Training Handout & Facilitator Card */}
                <div className="glass-panel p-5 rounded-xl border border-brand-gold/45 bg-gradient-to-br from-brand-navy-light/65 to-brand-navy-dark/95 space-y-4 mb-6 no-print">
                  <div className="border-b border-brand-grey-border/30 pb-2">
                    <span className="text-[9px] font-bold text-brand-gold uppercase tracking-widest block">
                      Practical Output
                    </span>
                    <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider mt-0.5">
                      Training Handout & Facilitator Card
                    </h3>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div className="grid sm:grid-cols-2 gap-3 text-[11px] leading-relaxed">
                      <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-1.5">
                        <span className="text-[10px] font-bold text-brand-gold uppercase block">📌 Participant Handout Brief</span>
                        <p className="text-brand-grey-text">
                          Includes the context, stressors, youth dimensions, and localized questions. Ready to be copied and printed for group exercises.
                        </p>
                        <div className="pt-1">
                          <CopyButton
                            text={compileParticipantHandout(activeCase)}
                            label="Copy Participant Handout"
                            className="w-full justify-center text-[10px]"
                          />
                        </div>
                      </div>
                      <div className="bg-brand-navy-dark/45 p-3 rounded border border-brand-grey-border/30 space-y-1.5">
                        <span className="text-[10px] font-bold text-brand-gold uppercase block">🔑 Facilitator Guide Notes</span>
                        <p className="text-brand-grey-text">
                          Includes primary conflict pathways, YPS/YCPS nexus links, protection safeguards, and validation checkpoints.
                        </p>
                        <div className="pt-1">
                          <CopyButton
                            text={compileFacilitatorNotes(activeCase)}
                            label="Copy Facilitator Notes"
                            className="w-full justify-center text-[10px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-brand-navy-dark/65 rounded border border-brand-grey-border/40 space-y-2">
                      <div className="text-[10px] font-semibold text-brand-offwhite uppercase tracking-wide">Nexus Link Summary:</div>
                      <div className="grid sm:grid-cols-2 gap-3 text-[10px] text-brand-grey-text leading-relaxed">
                        <div>
                          <span className="font-semibold text-brand-gold block">Participation & Protection Link:</span>
                          Formalize youth seats on committees (Participation) alongside safe border transhumance pathways (Protection).
                        </div>
                        <div>
                          <span className="font-semibold text-brand-gold block">Prevention & Resilience Link:</span>
                          Mainstream climate-adaptation training (Resilience) to prevent militia co-optation (Prevention).
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-brand-grey-border/30 pt-2.5 text-[9px] text-brand-gold/90 italic leading-relaxed">
                      * Draft planning output. To be validated against official regional mandates and context-specific field evidence before deployment.
                    </div>
                  </div>
                </div>

                {/* Case Analytical content */}
                <div className="space-y-6 text-xs text-brand-grey-text leading-relaxed print:text-gray-800 print:text-[11pt] pl-1">
                  
                  {/* Section 1: Context & Stressors */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:pb-0.5">
                      1. Context and Environmental Stressors
                    </h3>
                    <p className="print:text-black">
                      {activeCase.context}
                    </p>
                    <p className="bg-brand-navy-light/35 p-3 rounded border border-brand-grey-border/20 print:bg-gray-100">
                      <span className="font-semibold text-brand-gold print:text-black block">Climate Stressors:</span>
                      {activeCase.stressors}
                    </p>
                  </div>

                  {/* Section 2: Interacting Risks */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:pb-0.5">
                      2. Interacting Vulnerabilities and Risks
                    </h3>
                    <p className="print:text-black">
                      {activeCase.risksAndVulnerabilities}
                    </p>
                  </div>

                  {/* Section 3: Security Dynamics */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:pb-0.5">
                      3. Peace and Security Dynamics
                    </h3>
                    <p className="print:text-black">
                      {activeCase.securityDynamics}
                    </p>
                  </div>

                  {/* Section 4: Youth Dimensions */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:pb-0.5">
                      4. Youth Dimensions and Agency
                    </h3>
                    <p className="print:text-black">
                      {activeCase.youthDimensions}
                    </p>
                    <p className="bg-brand-navy-light/35 p-3 rounded border border-brand-green/20 text-brand-offwhite print:bg-gray-100 print:text-black">
                      <span className="font-semibold text-brand-green print:text-black block">YPS × YCPS Entry Point:</span>
                      {activeCase.integrationOpportunities}
                    </p>
                  </div>

                  {/* Section 5: Stakeholders & Pathway Prompts */}
                  <div className="grid md:grid-cols-2 gap-4 border-t border-b border-brand-grey-border/40 py-4 my-2 print:border-gray-300">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block">
                        Suggested Stakeholder Groups
                      </span>
                      <ul className="list-disc pl-5 space-y-1">
                        {activeCase.stakeholderGroups.map((st, idx) => (
                          <li key={idx} className="print:text-black">{st}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 border-t md:border-t-0 md:border-l border-brand-grey-border/30 pt-2 md:pt-0 md:pl-4 print:border-gray-300">
                      <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block">
                        Risk Pathway Prompt
                      </span>
                      <p className="font-mono text-[10px] leading-normal text-brand-grey-text/90 print:text-black">
                        {activeCase.pathwayPrompts}
                      </p>
                    </div>
                  </div>

                  {/* Section 6: Possible Interventions */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider print:text-black print:border-b print:pb-0.5">
                      5. Recommended stabilization Interventions
                    </h3>
                    <p className="p-3 bg-brand-navy-light/35 border border-brand-grey-border/40 rounded print:bg-gray-100 print:text-black">
                      {activeCase.interventions}
                    </p>
                  </div>

                  {/* Candidate YCPS Methodology Mapping */}
                  <div className="glass-panel p-5 rounded-lg border border-brand-gold/25 bg-brand-navy-light/25 space-y-3.5 print:border-gray-400 print:bg-transparent">
                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block">
                      Candidate YCPS Methodology Mapping (Recognition → Implementation)
                    </span>
                    <div className="grid sm:grid-cols-2 gap-4 text-[11px] leading-relaxed font-normal">
                      <div>
                        <span className="font-semibold text-brand-offwhite block mb-0.5">Practical Entry Point:</span>
                        {activeCase.integrationOpportunities}
                      </div>
                      <div>
                        <span className="font-semibold text-brand-offwhite block mb-0.5">Youth Agency Focus:</span>
                        Highlighting youth as resource managers, early warning reporting hubs, and peer mediators.
                      </div>
                      <div>
                        <span className="font-semibold text-brand-offwhite block mb-0.5">Participation & Protection Link:</span>
                        Formalize youth seats on water/land boards (Participation) coupled with legal/physical protection protocols (Protection).
                      </div>
                      <div>
                        <span className="font-semibold text-brand-offwhite block mb-0.5">Prevention & Resilience Link:</span>
                        Translate hazards (salinity, droughts) into climate-resilient livelihoods (solar pumps, water trucking cooperatives).
                      </div>
                      <div>
                        <span className="font-semibold text-brand-offwhite block mb-0.5">Partnership Model:</span>
                        Coordinated feedback loops between local committees, national ministries, and regional bodies ({activeCase.region === 'West & Central Africa' ? 'LCBC' : 'IGAD/AU'}).
                      </div>
                      <div>
                        <span className="font-semibold text-brand-offwhite block mb-0.5">Implementation Output:</span>
                        {activeCase.interventions}
                      </div>
                    </div>
                    <div className="border-t border-brand-grey-border/30 pt-2.5 text-[10px] text-brand-gold italic">
                      * Grounded in candidate YCPS Practice Note & Technical Note guidelines alongside DEDI official mandates.
                    </div>
                  </div>

                  {/* Section 7: Red-Team & Diplomatic Cautions */}
                  <div className="space-y-3 bg-red-950/15 border border-red-500/20 p-4 rounded-lg print:border-gray-400 print:bg-transparent">
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block print:text-black">
                      ⚠️ Red-Team & Diplomatic Cautions
                    </span>
                    <ul className="list-disc pl-5 space-y-1.5 text-brand-grey-text print:text-black">
                      {activeCase.cautions.map((caution, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {caution}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Section 8: Discussion & Training Questions */}
                  <div className="space-y-2 border-t border-brand-grey-border/40 pt-4 print:border-gray-300">
                    <h3 className="text-xs font-bold text-brand-offwhite uppercase tracking-wider print:text-black">
                      6. Discussion & Training Questions
                    </h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      {activeCase.questions.map((q, idx) => (
                        <li key={idx} className="pl-1 print:text-black">
                          {q}
                        </li>
                      ))}
                    </ol>
                  </div>

                </div>

                {/* Case Brief Footer Disclaimer */}
                <div className="mt-8 pt-4 border-t border-brand-grey-border/45 text-[9px] text-brand-grey-text leading-relaxed print:text-gray-500">
                  <span className="font-semibold text-brand-gold print:text-black">Disclaimer:</span> Prototype support tool. Mapped under the DEDI 2024-2028 Project Document guidelines. Validate all case briefs against official policies and localized context-specific evidence before deployment.
                </div>

              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}
