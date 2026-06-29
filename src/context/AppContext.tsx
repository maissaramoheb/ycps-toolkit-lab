'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  YPSPillarId,
  MatrixEntry,
  RiskPathway,
  Stakeholder
} from '../types';

interface AppState {
  currentScenario: string;
  contextName: string;
  matrixEntries: Record<YPSPillarId, MatrixEntry>;
  riskPathways: RiskPathway[];
  stakeholders: Stakeholder[];
}

interface AppContextType {
  currentScenario: string;
  contextName: string;
  setContextName: (name: string) => void;
  matrixEntries: Record<YPSPillarId, MatrixEntry>;
  riskPathways: RiskPathway[];
  stakeholders: Stakeholder[];
  loadScenario: (scenarioId: string) => void;
  updateMatrixEntry: (pillarId: YPSPillarId, fields: Partial<MatrixEntry>) => void;
  addRiskPathway: (pathway: Omit<RiskPathway, 'id'>) => void;
  updateRiskPathway: (id: string, fields: Partial<RiskPathway>) => void;
  deleteRiskPathway: (id: string) => void;
  addStakeholder: (stakeholder: Omit<Stakeholder, 'id'>) => void;
  updateStakeholder: (id: string, fields: Partial<Stakeholder>) => void;
  deleteStakeholder: (id: string) => void;
  resetAll: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const emptyMatrix = (pillarId: YPSPillarId): MatrixEntry => ({
  pillarId,
  climateSecurityConsideration: '',
  youthRoleAgency: '',
  protectionConcern: '',
  practicalEntryPoint: '',
  suggestedAction: '',
  indicator: '',
  diplomaticWording: '',
  redTeamWarning: '',
  implementationOutput: ''
});

const defaultMatrixEntries = (): Record<YPSPillarId, MatrixEntry> => ({
  participation: emptyMatrix('participation'),
  protection: emptyMatrix('protection'),
  prevention: emptyMatrix('prevention'),
  partnerships: emptyMatrix('partnerships'),
  disengagement_reintegration: emptyMatrix('disengagement_reintegration')
});

// Predefined Scenario Presets
export const SCENARIOS: Record<
  string,
  {
    name: string;
    context: string;
    matrix: Record<YPSPillarId, MatrixEntry>;
    riskPathways: RiskPathway[];
    stakeholders: Stakeholder[];
  }
> = {
  sahel: {
    name: 'Sahel / Lake Chad Basin',
    context: 'Sahel & Lake Chad Basin Region (Niger, Nigeria, Chad, Cameroon)',
    matrix: {
      participation: {
        pillarId: 'participation',
        climateSecurityConsideration: 'Shrinkage of Lake Chad and pasture degradation may intensify mobility pressures and contribute to tensions with farming communities where resource governance is limited. Traditional resource management structures may exclude young pastoralists and farmers.',
        youthRoleAgency: 'Young herders and farmers form localized joint natural resource committees to negotiate seasonal migration corridors, establish water-sharing rotas, and defuse immediate conflicts.',
        protectionConcern: 'Young mediators face physical safety risks from transhumance raiders and marginalization or reprimand by traditional community elders who view youth agency as a challenge to their authority.',
        practicalEntryPoint: 'Integrate youth committee representatives into municipal land-use boards and traditional mediation panels, backed by regional framework agreements.',
        suggestedAction: 'Fund and deliver peer-led conflict mediation and sustainable transhumance management training for 120 youth committee representatives.',
        indicator: 'Number of localized land-use and water-sharing agreements co-signed and monitored by youth committee members.',
        diplomaticWording: 'Supporting local community resilience by formalizing youth-led resource sharing initiatives within traditional and municipal governance structures.',
        redTeamWarning: 'Establishing youth committees without involving traditional elders may contribute to intergenerational tensions. Consult elders and respect appropriate mentorship roles.'
      },
      protection: {
        pillarId: 'protection',
        climateSecurityConsideration: 'Unpredictable seasonal rainfall may lengthen or alter migration routes. Young herders can face extreme heat, water scarcity, and protection risks along poorly mapped routes.',
        youthRoleAgency: 'Youth-led emergency notification networks use SMS and local radio to disseminate information on safe corridors, climate hazards, and access to water.',
        protectionConcern: 'Young women fetching water from increasingly distant wells face heightened risks of gender-based violence (GBV) along unmonitored routes.',
        practicalEntryPoint: 'Collaborate with local youth networks to identify high-risk routes and install solar-lighted, protected water points.',
        suggestedAction: 'Construct 5 secure, solar-lighted water stations near settlements, managed by mixed-gender local youth committees.',
        indicator: 'Reduction in reported security incidents along transhumance corridors and water collection points.',
        diplomaticWording: 'Enhancing human security and protection along transit routes through community-led infrastructure and communication networks.',
        redTeamWarning: 'Creating local informal monitoring structures run by youth can inadvertently feed into communal security tensions. Keep youth roles strictly focused on early warning, reporting, and logistics.'
      },
      prevention: {
        pillarId: 'prevention',
        climateSecurityConsideration: 'Widespread crop failures and livestock losses may reduce household income. In some settings, armed groups may exploit these pressures by offering economic incentives to young people facing constrained livelihood options.',
        youthRoleAgency: 'Youth agricultural cooperatives develop solar-powered drip irrigation and resilient crops, establishing alternative livelihoods that keep peers economically engaged and anchored.',
        protectionConcern: 'Youth cooperatives are targeted for extortion by armed groups or viewed with suspicion by national security services.',
        practicalEntryPoint: 'Provide seed funding, technical agronomy training, and basic security coordination for youth-led eco-agricultural cooperatives.',
        suggestedAction: 'Equip 10 youth-led agricultural cooperatives with solar water pumps, climate-resilient seed packets, and business management training.',
        indicator: 'Number of young people engaged in viable green cooperative livelihoods who express increased community connection.',
        diplomaticWording: 'Strengthening economic resilience and prevention frameworks by expanding opportunities in climate-smart value chains for youth.',
        redTeamWarning: 'Livelihood programs targeted through security-based labels can contribute to local resentment. Ensure selection criteria are transparent and benefits extend to the wider community.'
      },
      partnerships: {
        pillarId: 'partnerships',
        climateSecurityConsideration: 'National adaptation plans, youth development programs, and peacebuilding projects operate in silos, wasting resources and failing to address local realities.',
        youthRoleAgency: 'A coalition of youth-led organizations initiates a joint advocacy campaign linking climate action and conflict prevention, presenting unified recommendations to the Lake Chad Basin Commission.',
        protectionConcern: 'Political actors instrumentalize youth organizations for public relations without transferring real decision-making power or funding.',
        practicalEntryPoint: 'Establish a formal Youth Advisory Council within regional governance bodies to review climate-adaptation and peacebuilding strategies.',
        suggestedAction: 'Create and fund a permanent Youth Consultation Secretariat under the regional authority, with a dedicated budget for youth-led research.',
        indicator: 'Number of youth-authored policy recommendations officially adopted into regional climate-security plans.',
        diplomaticWording: 'Promoting inclusive regional partnership models that incorporate youth expertise and leadership in multi-hazard planning.',
        redTeamWarning: 'Consultation fatigue is high among youth leaders. Avoid holding meetings that lack clear pathways to influence policy or funding allocations.'
      },
      disengagement_reintegration: {
        pillarId: 'disengagement_reintegration',
        climateSecurityConsideration: 'Desertification and soil degradation may limit arable land availability and complicate the economic reintegration of former combatants.',
        youthRoleAgency: 'Demobilized youth work alongside local community members in collaborative land restoration and afforestation programs, rebuilding social trust through shared physical labor.',
        protectionConcern: 'Former combatants face stigmatization, social ostracization, and potential reprisal attacks from affected community members.',
        practicalEntryPoint: 'Implement community-based \'Green Reintegration\' projects that couple land reclamation with facilitated social reconciliation dialogs.',
        suggestedAction: 'Reclaim 50 hectares of degraded farmland through joint community-returnee soil rehabilitation and tree planting projects.',
        indicator: 'Hectares of community land successfully rehabilitated and percentage of returnees retaining local employment after 12 months.',
        diplomaticWording: 'Facilitating community-centered social cohesion and environmental recovery through collaborative green work programs.',
        redTeamWarning: 'Providing returnees with land ownership or equipment that law-abiding community members lack can spark intense local friction. Ensure benefits are shared.'
      }
    },
    riskPathways: [
      {
        id: 'sahel-path-1',
        context: 'Lake Chad Basin / Far North Cameroon',
        hazard: 'Unstable seasonal rainfall and drying water basins',
        exposure: 'High concentration of agropastoral communities dependent on seasonal floodplains',
        vulnerability: 'Poverty, low adaptive capacity, and absolute dependence on natural pasture and surface water',
        capacityConstraint: 'Weak local enforcement of historical transhumance agreements and lack of state mediation presence',
        pathwayType: 'resource_competition',
        youthImpact: 'Young herders must migrate earlier and further into farming territory, raising the risk of clash. Young farmers face crop destruction and loss of livelihood.',
        youthOpportunity: 'Establishing youth-led cooperative resource councils to pre-negotiate grazing corridors and water sharing timings.',
        intervention: 'Equip youth committees with Participatory resource mapping tools and support community-led corridor demarcation and mediation training.',
        evidenceStrength: 'High',
        evidenceGaps: 'Lack of real-time spatial data on transhumance movements relative to changing vegetation densities.'
      },
      {
        id: 'sahel-path-2',
        context: 'Sahelian borderlands (Mali-Niger border)',
        hazard: 'Prolonged droughts and desertification',
        exposure: 'Rain-fed farming communities with limited alternative income channels',
        vulnerability: 'Youth unemployment, food insecurity, and breakdown of traditional social safety nets',
        capacityConstraint: 'Limited public-service coverage, low trust between communities and public institutions, and constrained cross-border coordination',
        pathwayType: 'armed_group_exploitation',
        youthImpact: 'Loss of agricultural income may increase exposure to recruitment incentives offered by armed groups, while young people also contribute to local prevention and resilience efforts.',
        youthOpportunity: 'Engage youth in solar-powered value-addition (milling, cooling) cooperatives that provide stable economic anchors.',
        intervention: 'Establish climate-resilient youth enterprise hubs offering micro-grants and mentorship in green livelihoods.',
        evidenceStrength: 'Medium',
        evidenceGaps: 'Nuanced data on the exact ratio of economic recruitment vs. ideological motivation for joining armed groups.'
      }
    ],
    stakeholders: [
      {
        id: 'sahel-stake-1',
        name: 'Lake Chad Basin Commission (LCBC)',
        actorType: 'regional_organization',
        interest: 'Regional cooperation, water resource management, and implementation of conflict-sensitive programming priorities.',
        influence: 'High',
        position: 'Supportive',
        youthInclusionQuality: 'Medium',
        risks: 'Bureaucratic delays and slow translation of regional policy into local village-level actions.',
        diplomaticSensitivity: 'Requires careful navigation of national sovereignties of member states.',
        engagementStrategy: 'Advocate for the formalization of the Youth Advisory Board within the LCBC structure.'
      },
      {
        id: 'sahel-stake-2',
        name: 'Association of Young Agropastoralists (Local NGO)',
        actorType: 'youth_actor',
        interest: 'Securing migration corridors, preventing youth arrests, and accessing livestock markets.',
        influence: 'Medium',
        position: 'Supportive',
        youthInclusionQuality: 'High',
        risks: 'Limited funding and potential exclusion of younger female voices in pastoralist groups.',
        diplomaticSensitivity: 'Frequently viewed with suspicion by central government actors who associate mobile youth with security threats.',
        engagementStrategy: 'Provide capacity building grants and pair them with established international development partners.'
      },
      {
        id: 'sahel-stake-3',
        name: 'Local Traditional Councils (Elders)',
        actorType: 'traditional_leader',
        interest: 'Preserving traditional land allocation powers, maintaining social order, and resolving disputes.',
        influence: 'High',
        position: 'Neutral',
        youthInclusionQuality: 'Low',
        risks: 'May block youth-led initiatives that bypass their traditional authority.',
        diplomaticSensitivity: 'Critically important to address with extreme respect; direct confrontation will collapse local projects.',
        engagementStrategy: 'Engage them as patrons and mentors in youth mediation committees, ensuring they co-sign all agreements.'
      }
    ]
  },
  egypt: {
    name: 'North Africa / Egypt',
    context: 'North Africa / Egypt (Nile Delta and Mediterranean Coast)',
    matrix: {
      participation: {
        pillarId: 'participation',
        climateSecurityConsideration: 'Sea-level rise and soil salinization may degrade agricultural land in the Nile Delta and contribute to urban mobility pressures. Climate policy-making remains centralized in Cairo, with limited local youth inputs.',
        youthRoleAgency: 'University-based youth coalitions design localized environmental monitoring systems and lead community adaptation campaigns in coastal cities.',
        protectionConcern: 'Strict regulation on civil society organizations and public gatherings limits the operational space for youth-led climate advocacy.',
        practicalEntryPoint: 'Establish institutionalized green innovation hubs within public universities in collaboration with the Ministry of Environment.',
        suggestedAction: 'Support 10 university-incubated green start-ups focusing on delta soil rehabilitation and urban farming.',
        indicator: 'Number of youth-led green enterprises officially registered and operating in the Nile Delta.',
        diplomaticWording: 'Promoting national ownership and sustainable development by fostering youth-led technical innovation and research partnerships.',
        redTeamWarning: 'Avoid alignment with sensitive political themes. Focus strictly on technical climate adaptation, green job creation, and scientific collaboration.'
      },
      protection: {
        pillarId: 'protection',
        climateSecurityConsideration: 'Water scarcity may increase domestic burdens. Reduced water availability can compound agricultural pressures and influence mobility decisions under specific local conditions.',
        youthRoleAgency: 'Youth groups create local water conservation awareness campaigns and implement simple greywater recycling systems in public facilities.',
        protectionConcern: 'Displaced rural youth entering urban informal settlements face poor living conditions and lack legal protections.',
        practicalEntryPoint: 'Strengthen local vocational training centers to equip migrating youth with technical skills for water-efficient industries.',
        suggestedAction: 'Train 200 youths in greywater system installation and maintenance in partnership with municipal water authorities.',
        indicator: 'Employment rate of vocationally trained youth in municipal water sectors.',
        diplomaticWording: 'Addressing urban migration vulnerabilities through targeted vocational skills development and resource conservation.',
        redTeamWarning: 'Do not frame the Nile water scarcity issue in a way that suggests regional transboundary water conflict. Emphasize domestic adaptation efficiency.'
      },
      prevention: {
        pillarId: 'prevention',
        climateSecurityConsideration: 'Rising summer temperatures and energy demands strain the electrical grid. Livelihood losses in fisheries and farming create economic desperation.',
        youthRoleAgency: 'Young engineers champion solar energy cooperatives and energy efficiency audits for small businesses in coastal governorates.',
        protectionConcern: 'Bureaucratic barriers for grid connection of small-scale solar cooperatives.',
        practicalEntryPoint: 'Streamline regulatory approvals for youth-led small-scale renewable energy installations.',
        suggestedAction: 'Pilot 3 solar-powered desalination and irrigation systems operated by youth cooperatives in Alexandria Governorate.',
        indicator: 'Megawatt hours of renewable energy generated by youth-led systems.',
        diplomaticWording: 'Supporting national green transition agendas by empowering young entrepreneurs in renewable energy projects.',
        redTeamWarning: 'Ensure all renewable energy installations strictly comply with national utility regulations to prevent legal blockages.'
      },
      partnerships: {
        pillarId: 'partnerships',
        climateSecurityConsideration: 'Green transition funding is heavily concentrated in large state-led projects, leaving youth startups without access to finance.',
        youthRoleAgency: 'Youth business networks advocate for dedicated green microfinance portfolios in national and regional development banks.',
        protectionConcern: 'Small youth organizations lack the financial compliance capacity to access international green funds directly.',
        practicalEntryPoint: 'Create a green incubator consortium linking national banks, international donors, and youth-led technical enterprises.',
        suggestedAction: 'Establish a dedicated Egyptian Youth Green Fund providing micro-grants for delta climate adaptation projects.',
        indicator: 'Total capital allocated to youth-led green startups from national bank portfolios.',
        diplomaticWording: 'Building multi-stakeholder green finance partnerships to support youth entrepreneurship and localized adaptation.',
        redTeamWarning: 'Financial monitoring must be robust to ensure funds are used strictly for designated green projects, preventing audits from stalling progress.'
      },
      disengagement_reintegration: {
        pillarId: 'disengagement_reintegration',
        climateSecurityConsideration: 'Economic stagnation in coastal communities may contribute to irregular maritime migration decisions among some young people, alongside other social and economic factors.',
        youthRoleAgency: 'Returned migrants lead peer-mentorship networks, guiding local youth into green jobs and inland sustainable agricultural projects.',
        protectionConcern: 'Returned irregular migrants face social stigma, legal checks, and high risk of re-migration due to lack of local alternatives.',
        practicalEntryPoint: 'Integrate returned youth into national land reclamation projects (e.g., the Toshka or New Delta projects) with clear ownership stakes.',
        suggestedAction: 'Allocate 100 feddans of reclaimed land to youth cooperatives comprised of returned migrants and local job-seekers.',
        indicator: 'Retention rate of returned youth in localized agricultural and green jobs.',
        diplomaticWording: 'Supporting community stability and offering viable local alternatives through green integration and land reclamation initiatives.',
        redTeamWarning: 'Avoid language implying state failure to control borders. Focus on positive economic incentives and sustainable rural development.'
      }
    },
    riskPathways: [
      {
        id: 'egypt-path-1',
        context: 'Nile Delta Coastal Governorates',
        hazard: 'Sea-level rise, coastal erosion, and saltwater intrusion',
        exposure: 'Low-lying delta agricultural lands and coastal aquaculture farms',
        vulnerability: 'High dependency on traditional farming methods, soil degradation, and low access to green finance',
        capacityConstraint: 'Centralized decision-making that slows down local adaptation responses in rural districts',
        pathwayType: 'livelihood_loss',
        youthImpact: 'Loss of family agricultural land may compound youth unemployment and contribute to distress migration decisions toward Cairo and Alexandria.',
        youthOpportunity: 'Engage youth in technical jobs like hydroponics, soil salinization testing, and solar-powered coastal farming.',
        intervention: 'Launch a Delta Green Jobs Initiative offering training and seed grants for climate-resilient agribusinesses.',
        evidenceStrength: 'High',
        evidenceGaps: 'Precise regional models mapping the speed of saltwater intrusion against soil recovery rates under different crop rotations.'
      }
    ],
    stakeholders: [
      {
        id: 'egypt-stake-1',
        name: 'Ministry of Environment (Egypt)',
        actorType: 'government_institution',
        interest: 'Implementing the National Climate Change Strategy 2050, hosting international climate forums, and building national green capacity.',
        influence: 'High',
        position: 'Supportive',
        youthInclusionQuality: 'Medium',
        risks: 'Centralized bureaucracy can slow local youth initiatives.',
        diplomaticSensitivity: 'All activities must align with official state development goals and respect governmental oversight.',
        engagementStrategy: 'Establish joint technical panels showing how youth-led initiatives directly contribute to the National Strategy.'
      },
      {
        id: 'egypt-stake-2',
        name: 'Nile Delta Green Youth Coalition (NGO)',
        actorType: 'youth_actor',
        interest: 'Local environmental protection, raising community awareness, and securing funding for local delta projects.',
        influence: 'Medium',
        position: 'Supportive',
        youthInclusionQuality: 'High',
        risks: 'Operational constraints due to association registration rules.',
        diplomaticSensitivity: 'Must maintain a technical, non-political posture to ensure smooth operations.',
        engagementStrategy: 'Provide technical assistance and mentorship to help them register and operate within national frameworks.'
      }
    ]
  },
  somalia: {
    name: 'Somalia pastoral conflicts',
    context: 'Somalia (Central and Southern Regions)',
    matrix: {
      participation: {
        pillarId: 'participation',
        climateSecurityConsideration: 'Recurrent droughts may reduce livestock holdings and contribute to movement towards urban displacement sites. Clan-based resource allocation can limit meaningful youth participation.',
        youthRoleAgency: 'Young pastoralists establish community water monitoring groups and run mobile clinics to support migrating herds.',
        protectionConcern: 'Youth are targeted for recruitment by Al-Shabaab, which exploits resource grievances.',
        practicalEntryPoint: 'Form local agropastoral peace committees with mandatory youth quotas to manage borehole sharing.',
        suggestedAction: 'Train 80 young mediators in clan-inclusive water sharing negotiation.',
        indicator: 'Number of clan peace councils containing active youth representatives.',
        diplomaticWording: 'Supporting local governance structures and youth inclusion to manage resource sharing.',
        redTeamWarning: 'Ensure multi-clan representation in all youth committees to avoid exacerbating inter-clan dynamics.'
      },
      protection: {
        pillarId: 'protection',
        climateSecurityConsideration: 'Extreme drought may contribute to displacement toward camps around Mogadishu and Baidoa, where service and protection capacities can be constrained.',
        youthRoleAgency: 'Youth networks volunteer as safety coordinators in IDP camps, monitoring water points and lighting.',
        protectionConcern: 'High levels of gender-based violence against women and children seeking fuel and water.',
        practicalEntryPoint: 'Install community-managed solar streetlights at water points and communal spaces.',
        suggestedAction: 'Provide 30 solar lighting installations managed by local youth volunteer groups.',
        indicator: 'Reduction in nighttime safety incidents near camp water facilities.',
        diplomaticWording: 'Strengthening community protection measures in displacement sites through volunteer networks.',
        redTeamWarning: 'Volunteers must not take on armed security duties. Coordinate closely with local authorities.'
      },
      prevention: {
        pillarId: 'prevention',
        climateSecurityConsideration: 'Livelihood losses may increase exposure to illicit charcoal markets for some young pastoralists, while charcoal production can further degrade local ecosystems.',
        youthRoleAgency: 'Youth groups lead reforestation efforts, distributing fuel-efficient cookstoves and planting native trees.',
        protectionConcern: 'Charcoal networks are linked to local power brokers who resist alternative energy initiatives.',
        practicalEntryPoint: 'Promote alternative livelihoods in solar energy distribution and cookstove assembly.',
        suggestedAction: 'Establish a youth cooperative manufacturing fuel-efficient clay cookstove.',
        indicator: 'Number of cookstoves distributed and youth employed in the cooperative.',
        diplomaticWording: 'Promoting environmental restoration and resilient livelihoods to offset drivers of deforestation.',
        redTeamWarning: 'Ensure alternative energy products are affordable to ensure local adoption without subsidization dependency.'
      },
      partnerships: {
        pillarId: 'partnerships',
        climateSecurityConsideration: 'International aid projects that overlook local clan dynamics may be disproportionately influenced by dominant groups.',
        youthRoleAgency: 'Cross-clan youth alliances act as neutral project monitoring teams for development programs.',
        protectionConcern: 'Dominant clans threaten youth who highlight unequal aid distribution.',
        practicalEntryPoint: 'Incorporate youth-led multi-clan monitoring boards into all local climate adaptation contracts.',
        suggestedAction: 'Develop an independent youth-led app for reporting water point functionality across clans.',
        indicator: 'Percentage of water points monitored with cross-clan data sharing.',
        diplomaticWording: 'Improving aid transparency and effectiveness through community-led cross-clan partnerships.',
        redTeamWarning: 'Do not publicize clan names in monitoring data. Focus on geographic access and infrastructure functionality.'
      },
      disengagement_reintegration: {
        pillarId: 'disengagement_reintegration',
        climateSecurityConsideration: 'Deforested and drought-prone land limits return options for former militia members.',
        youthRoleAgency: 'Disengaged youth participate in restoring soil and building sand dams to capture rainwater.',
        protectionConcern: 'Local community members reject former combatants returning to resource-scarce villages.',
        practicalEntryPoint: 'Launch cash-for-work sand dam construction projects that employ both returnees and community members.',
        suggestedAction: 'Construct 3 sand dams employing 60 returnees and 60 local residents.',
        indicator: 'Water volume captured by sand dams and social cohesion index scores in target villages.',
        diplomaticWording: 'Rebuilding community infrastructure and social cohesion through collaborative environmental restoration.',
        redTeamWarning: 'Reintegration programs must not offer higher wages than local average income to avoid resentment.'
      }
    },
    riskPathways: [
      {
        id: 'somalia-path-1',
        context: 'Galguduud Region',
        hazard: 'Unprecedented delays in seasonal Gu rains',
        exposure: 'Mobile nomadic pastoralists relying on temporary water pans',
        vulnerability: 'Dwindling livestock assets, lack of access to veterinary services, and high clan tensions',
        capacityConstraint: 'Inability of local administrations to manage transhumance disputes over permanent water boreholes',
        pathwayType: 'resource_competition',
        youthImpact: 'Young pastoralists and settled farmers may face localized incidents around permanent-well access, with a risk of wider inter-community tensions.',
        youthOpportunity: 'Developing youth early-warning systems to alert pastoralists of borehole capacity and grazing availability.',
        intervention: 'Equip local youth networks with basic satellite communication tools and training in pasture assessment.',
        evidenceStrength: 'High',
        evidenceGaps: 'Limited reliable census data mapping current nomadic routes under changing drought patterns.'
      }
    ],
    stakeholders: [
      {
        id: 'somalia-stake-1',
        name: 'Ministry of Energy and Water Resources (Somalia)',
        actorType: 'government_institution',
        interest: 'Regulating water rights, expanding national water grid, and coordinating international aid.',
        influence: 'High',
        position: 'Supportive',
        youthInclusionQuality: 'Low',
        risks: 'Limited enforcement capacity outside major cities.',
        diplomaticSensitivity: 'Requires engagement with state-level ministries to ensure political alignment.',
        engagementStrategy: 'Provide technical briefs showcasing how youth-led early warning systems align with national water plans.'
      },
      {
        id: 'somalia-stake-2',
        name: 'Somali Youth for Climate Action (SYCA)',
        actorType: 'youth_actor',
        interest: 'Promoting youth voice in national policies, reforestation projects, and securing green jobs.',
        influence: 'Medium',
        position: 'Supportive',
        youthInclusionQuality: 'High',
        risks: 'Funding volatility and security risks during field assessments.',
        diplomaticSensitivity: 'Ensure representative composition across clans to maintain security.',
        engagementStrategy: 'Channel international training and flexible funding to scale their local adaptation projects.'
      }
    ]
  },
  south_sudan: {
    name: 'South Sudan local peace',
    context: 'South Sudan (Greater Upper Nile and Jonglei States)',
    matrix: {
      participation: {
        pillarId: 'participation',
        climateSecurityConsideration: 'Severe flooding in Jonglei may submerge grazing land, contribute to pastoralist movement towards Equatoria, and compound existing land-related pressures.',
        youthRoleAgency: 'Young cattle keepers act as liaisons to negotiate temporary grazing rights with host communities before cattle arrive.',
        protectionConcern: 'Youth are heavily armed and easily mobilized by politicians for cattle raiding.',
        practicalEntryPoint: 'Form Youth Cattle Joint Councils between migrating pastoralists and host farmers.',
        suggestedAction: 'Facilitate 3 pre-migration dialogue sessions involving 40 youth cattle leaders and 40 host community representatives.',
        indicator: 'Number of peaceful grazing agreements negotiated and signed by youth leaders.',
        diplomaticWording: 'Supporting local conflict mitigation through pre-migration dialogues led by youth cattle managers.',
        redTeamWarning: 'Dialogues must occur before migration begins. Once cattle enter farming lands, tensions are too high for initial negotiations.'
      },
      protection: {
        pillarId: 'protection',
        climateSecurityConsideration: 'Flooding destroys local health centers and crops, leaving remote areas isolated.',
        youthRoleAgency: 'Youth groups organize canoe transport networks to deliver medical supplies and food to flooded villages.',
        protectionConcern: 'Canoe operations are targeted by armed youth bands along rivers.',
        practicalEntryPoint: 'Coordinate with local community defense groups to establish safe river corridors.',
        suggestedAction: 'Equip 10 youth canoe rescue groups with safety gear and communication devices.',
        indicator: 'Tons of food/medical supplies safely transported to flooded communities.',
        diplomaticWording: 'Strengthening community-based logistics and emergency response in flood-affected regions.',
        redTeamWarning: 'Ensure canoe groups are registered with local chiefs and maintain a strictly humanitarian status.'
      },
      prevention: {
        pillarId: 'prevention',
        climateSecurityConsideration: 'Total crop failure in flooded areas leaves families dependent on cattle raiding for survival.',
        youthRoleAgency: 'Youth cooperatives start floating vegetable gardens and fish farms to establish local food sources.',
        protectionConcern: 'Lack of local markets to sell surplus fish and vegetables due to flooded roads.',
        practicalEntryPoint: 'Provide training and materials for climate-adapted aquaculture and floating agriculture.',
        suggestedAction: 'Train 50 youth in floating garden construction and supply basic fishing kits.',
        indicator: 'Number of floating gardens operating and tonnage of fish harvested.',
        diplomaticWording: 'Diversifying food production and introducing climate-adapted farming methods in flooded zones.',
        redTeamWarning: 'Floating gardens require daily maintenance. Ensure training focuses on long-term management and preservation.'
      },
      partnerships: {
        pillarId: 'partnerships',
        climateSecurityConsideration: 'Peace agreements focus on political elite sharing, ignoring the climate drivers of local cattle-raiding violence.',
        youthRoleAgency: 'Youth leaders document local climate impacts on cattle migration and present findings to national peace mediators.',
        protectionConcern: 'National politicians disregard local youth inputs, preferring top-down political deals.',
        practicalEntryPoint: 'Create a direct reporting link between local youth cattle councils and the National Peace Commission.',
        suggestedAction: 'Facilitate youth testimony at national peace dialogue forums on climate-security links.',
        indicator: 'References to climate adaptation and cattle migration in local peace agreements.',
        diplomaticWording: 'Integrating localized climate-security dynamics into national peace and conflict-sensitive programming processes.',
        redTeamWarning: 'Ensure youth presenters are balanced geographically to represent both migrating and host communities.'
      },
      disengagement_reintegration: {
        pillarId: 'disengagement_reintegration',
        climateSecurityConsideration: 'Dismantled military structures leave young ex-combatants without skills in a flooded, unproductive economy.',
        youthRoleAgency: 'Ex-combatants join community work teams to repair dykes and protect towns from rising floodwaters.',
        protectionConcern: 'Returnees face suspicion of acting as spies for active rebel factions.',
        practicalEntryPoint: 'Engage demobilized youth in dyke construction under joint community-military civil works programs.',
        suggestedAction: 'Construct 5 kilometers of protective dykes employing 150 local youths, including demobilized personnel.',
        indicator: 'Kilometers of dykes built and percentage of demobilized youth reporting positive community relations.',
        diplomaticWording: 'Supporting community flood resilience and conflict-sensitive local programming through inclusive public work programs.',
        redTeamWarning: 'Ensure dyke construction is engineered properly; poorly constructed dykes can burst, causing catastrophic damage.'
      }
    },
    riskPathways: [
      {
        id: 'ssudan-path-1',
        context: 'Jonglei and Lakes States',
        hazard: 'Extreme persistent multi-year flooding',
        exposure: 'Low-lying agropastoral communities with cattle-dependent economies',
        vulnerability: 'Destruction of agricultural crops, flooding of grazing pastures, and high availability of small arms',
        capacityConstraint: 'Inability of national government to provide alternative grazing or enforce borders',
        pathwayType: 'forced_displacement',
        youthImpact: 'Some armed cattle-keeping groups move herds south toward agricultural areas in Equatoria, where weak coordination and unresolved grievances may contribute to clashes with farmers; young people also participate in local mediation and early warning.',
        youthOpportunity: 'Organizing pre-migration committees to negotiate routes and resource sharing under local authority agreements.',
        intervention: 'Facilitate inter-communal dialogues and build cattle watering points in intermediate non-agricultural zones.',
        evidenceStrength: 'High',
        evidenceGaps: 'Real-time tracking of cattle herd locations and water levels along the migration route.'
      }
    ],
    stakeholders: [
      {
        id: 'ssudan-stake-1',
        name: 'National Peace Commission (South Sudan)',
        actorType: 'government_institution',
        interest: 'Resolving sub-national conflicts, managing cattle migration disputes, and implementing peace agreements.',
        influence: 'High',
        position: 'Supportive',
        youthInclusionQuality: 'Low',
        risks: 'Limited budget and staff to monitor local agreements.',
        diplomaticSensitivity: 'Highly sensitive local clan disputes require alignment with national peace agendas.',
        engagementStrategy: 'Demonstrate how local youth Cattle Councils reduce security enforcement costs for the government.'
      },
      {
        id: 'ssudan-stake-2',
        name: 'Gelweng Youth Leaders (Jonglei)',
        actorType: 'youth_actor',
        interest: 'Protecting community cattle, finding pasture, and defending against rival clans.',
        influence: 'High',
        position: 'Neutral',
        youthInclusionQuality: 'Low',
        risks: 'Easily mobilized for armed violence if pastures are denied.',
        diplomaticSensitivity: 'Extremely sensitive; must be approached through trusted local chiefs and church leaders.',
        engagementStrategy: 'Engage through non-military, livelihood-focused dialogs, emphasizing cattle health and pasture access.'
      }
    ]
  },
  horn_of_africa: {
    name: 'Horn of Africa displacement',
    context: 'Horn of Africa (Kenya-Somalia-Ethiopia Borderlands)',
    matrix: {
      participation: {
        pillarId: 'participation',
        climateSecurityConsideration: 'Chronic drought may contribute to cross-border displacement. In contexts with limited services and resource governance, crowded settlements may experience tensions over firewood and water.',
        youthRoleAgency: 'Displaced and host youth establish joint natural resource monitoring networks, resolving firewood collection disputes.',
        protectionConcern: 'Displaced youth face harassment, lack of legal status, and exclusion from local employment markets.',
        practicalEntryPoint: 'Form cross-border youth networks under IGAD to coordinate resource conservation near refugee settlements.',
        suggestedAction: 'Establish 4 community nurseries operated by refugee and host-community youth to supply firewood trees.',
        indicator: 'Number of seedlings planted and youth engaged in cross-community nurseries.',
        diplomaticWording: 'Fostering social cohesion and environmental protection through collaborative refugee-host community youth initiatives.',
        redTeamWarning: 'Ensure host community youth receive equal benefits to prevent resentment over aid focused exclusively on refugees.'
      },
      protection: {
        pillarId: 'protection',
        climateSecurityConsideration: 'Severe drought may contribute to rapid rural-to-urban displacement. Young women can face differentiated protection risks, including trafficking, where safe services and livelihood options are limited.',
        youthRoleAgency: 'Youth organizations establish safe houses and monitoring desks at bus terminals to protect arriving migrants.',
        protectionConcern: 'Lack of coordination between local police, child welfare, and youth organizations.',
        practicalEntryPoint: 'Create emergency shelter protocols linking municipal transport services and youth NGOs.',
        suggestedAction: 'Train 40 transport operators and youth volunteers in trafficking detection and reporting.',
        indicator: 'Number of young people facing differentiated protection risks who access safe housing and appropriate referral services.',
        diplomaticWording: 'Mitigating trafficking risks and human security vulnerabilities among displaced populations through capacity building.',
        redTeamWarning: 'Ensure youth volunteers do not engage in law enforcement operations. Keep roles strictly to identification and referral.'
      },
      prevention: {
        pillarId: 'prevention',
        climateSecurityConsideration: 'Droughts wipe out livestock assets, leaving borderland youth without economic alternatives, raising smuggling appeal.',
        youthRoleAgency: 'Youth cooperatives establish cross-border trade networks for veterinary supplies and green energy products.',
        protectionConcern: 'High custom fees and border controls hinder small-scale youth-led cross-border trade.',
        practicalEntryPoint: 'Advocate for cross-border trade permits for registered youth micro-enterprises under regional agreements.',
        suggestedAction: 'Register 10 cross-border youth cooperatives and supply veterinary solar-refrigeration units.',
        indicator: 'Value of cross-border veterinary supplies traded by youth cooperatives.',
        diplomaticWording: 'Supporting cross-border economic resilience and conflict-sensitive borderland programming through trade facilitation for youth.',
        redTeamWarning: 'SMART monitoring is required to ensure cooperatives do not import prohibited goods, which would lead to border closures.'
      },
      partnerships: {
        pillarId: 'partnerships',
        climateSecurityConsideration: 'Cross-border initiatives are managed at capital city levels, with little communication between borderland youth groups.',
        youthRoleAgency: 'Borderland youth establish a digital forum to coordinate pasture condition alerts across national borders.',
        protectionConcern: 'Poor internet connectivity and high data costs restrict access to digital platforms.',
        practicalEntryPoint: 'Fund local community radio networks run by youth to broadcast weather and pasture updates across borders.',
        suggestedAction: 'Equip 3 community radio stations with solar power and training in cross-border climate reporting.',
        indicator: 'Broadcast reach of cross-border climate-adaptation and peace programs.',
        diplomaticWording: 'Enhancing regional early warning and information exchange by supporting borderland community media.',
        redTeamWarning: 'Radio broadcasts must remain neutral and avoid sensitive political or ethnic commentary.'
      },
      disengagement_reintegration: {
        pillarId: 'disengagement_reintegration',
        climateSecurityConsideration: 'Displaced youth returning to areas of origin find infrastructure destroyed by drought and local conflict.',
        youthRoleAgency: 'Returned youth form reconstruction brigades to rebuild wells, school classrooms, and clinics.',
        protectionConcern: 'Returned youth face high levels of suspicion from communities that stayed behind.',
        practicalEntryPoint: 'Integrate returning youth into national public works programs focusing on rural community rehabilitation.',
        suggestedAction: 'Rebuild 3 community wells and 2 schools using returnee-staffed reconstruction brigades.',
        indicator: 'Number of community infrastructures rebuilt and returnee retention rate.',
        diplomaticWording: 'Rehabilitating rural infrastructure and supporting conflict-sensitive programming through youth-led reconstruction initiatives.',
        redTeamWarning: 'Reconstruction must focus on projects selected by local communities to ensure appreciation and local buy-in.'
      }
    },
    riskPathways: [
      {
        id: 'horn-path-1',
        context: 'Kenya-Somalia Borderlands (Dadaab/Garissa)',
        hazard: 'Successive failed rainy seasons and extreme vegetation loss',
        exposure: 'High concentration of displaced families in camp settings collecting firewood',
        vulnerability: 'Rapid depletion of local forest cover that may compound resource pressures with host communities',
        capacityConstraint: 'Inability of local administrations to provide alternative cooking fuel sources',
        pathwayType: 'forced_displacement',
        youthImpact: 'Displaced youth must travel deep into host community lands for firewood, exposing them to arrest and violence.',
        youthOpportunity: 'Engage youth in manufacturing alternative briquettes from agricultural waste and dry weeds.',
        intervention: 'Equip youth cooperatives with briquette press machines and train them in business logistics.',
        evidenceStrength: 'Medium',
        evidenceGaps: 'Data on regional supply chains of agricultural waste suitable for fuel briquette production.'
      }
    ],
    stakeholders: [
      {
        id: 'horn-stake-1',
        name: 'Intergovernmental Authority on Development (IGAD)',
        actorType: 'regional_organization',
        interest: 'Regional integration, transboundary resource management, and implementing the youth policy framework.',
        influence: 'High',
        position: 'Supportive',
        youthInclusionQuality: 'Medium',
        risks: 'Complex decision-making structures that delay local funding.',
        diplomaticSensitivity: 'Requires careful navigation of transboundary politics between member states.',
        engagementStrategy: 'Provide technical inputs to the IGAD Youth Desk demonstrating the success of local cross-border projects.'
      },
      {
        id: 'horn-stake-2',
        name: 'Garissa Youth Environmental Network (Kenya)',
        actorType: 'youth_actor',
        interest: 'Reforestation, combating climate change locally, and securing municipal funding for green jobs.',
        influence: 'Medium',
        position: 'Supportive',
        youthInclusionQuality: 'High',
        risks: 'Limited technical capacity to manage large international grants.',
        diplomaticSensitivity: 'Must cooperate with county government authorities to align with local development plans.',
        engagementStrategy: 'Provide capacity building support in project design and financial accounting.'
      }
    ]
  },
  carana: {
    name: 'CARANA (Fictional Borderland)',
    context: 'CARANA Borderland (Fictional East-West River Corridor)',
    matrix: {
      participation: {
        pillarId: 'participation',
        climateSecurityConsideration: 'Upstream damming and erratic rainfall dry up the Carana River, which may contribute to resource-related tensions between downstream farmers and nomadic herders.',
        youthRoleAgency: 'Downstream and nomadic youth create a joint water-sharing committee called \'Carana River Youth Alliance\' to coordinate water allocation.',
        protectionConcern: 'Local political factions try to manipulate youth leaders to support aggressive water-right claims.',
        practicalEntryPoint: 'Establish a formal consultative seat for the Youth Alliance on the CARANA Water Commission.',
        suggestedAction: 'Train 50 members of the Carana River Youth Alliance in water flow mapping and shared negotiation.',
        indicator: 'Number of cooperative water allocation agreements co-signed by downstream and nomadic youth.',
        diplomaticWording: 'Supporting local coordination and water management by formalizing youth advisory roles in borderland water commissions.',
        redTeamWarning: 'Ensure balanced representation of both downstream farming youth and nomadic herding youth to prevent ethnic polarization.'
      },
      protection: {
        pillarId: 'protection',
        climateSecurityConsideration: 'Water scarcity may alter migration routes and increase exposure to mine-contaminated or otherwise unsafe areas.',
        youthRoleAgency: 'Youth groups map secure water paths and put up simple warning markers near suspected danger areas.',
        protectionConcern: 'Youth face risks of environmental hazards or encounter mobility constraints at crossing points.',
        practicalEntryPoint: 'Coordinate with international demining organizations to train youth in mine risk education.',
        suggestedAction: 'Train 30 youth leaders as Mine Risk Educators to conduct sessions along migration corridors.',
        indicator: 'Number of mine risk education sessions conducted and community members reached.',
        diplomaticWording: 'Reducing human security risks along transit corridors through community education and risk mapping.',
        redTeamWarning: 'Youth must not attempt to handle or clear explosive materials themselves. Keep activities strictly educational.'
      },
      prevention: {
        pillarId: 'prevention',
        climateSecurityConsideration: 'Loss of fertile soil may constrain livelihood options and increase exposure to illicit smuggling and timber markets for some young people in border forests.',
        youthRoleAgency: 'Youth cooperatives establish agroforestry projects, planting fast-growing fruit trees to generate alternative incomes.',
        protectionConcern: 'Smuggling cartels threaten youth cooperative members who refuse to cooperate or who report illegal activities.',
        practicalEntryPoint: 'Collaborate with local environmental authorities to secure community land leases for youth agroforestry.',
        suggestedAction: 'Establish 2 solar-irrigated agroforestry nurseries managed by youth cooperatives.',
        indicator: 'Hectares of border forest under community agroforestry management by youth.',
        diplomaticWording: 'Promoting community forest conservation and sustainable agricultural livelihoods through conflict-sensitive borderland programming.',
        redTeamWarning: 'Ensure land tenure agreements are legally binding to protect youth investments from seizure by local elites.'
      },
      partnerships: {
        pillarId: 'partnerships',
        climateSecurityConsideration: 'Cross-border initiatives are delayed by national security disputes, stalling local adaptation programs.',
        youthRoleAgency: 'Youth organizations use mobile messaging platforms to coordinate disaster response across the border.',
        protectionConcern: 'Governments occasionally suspend cross-border communications during security alerts, disrupting coordinating networks.',
        practicalEntryPoint: 'Establish a secure offline communication protocol for youth-led disaster response groups.',
        suggestedAction: 'Equip youth disaster response nodes with local radio transceivers and coordinate safe frequencies with local officials.',
        indicator: 'Time taken to coordinate disaster relief efforts across the border using backup radio systems.',
        diplomaticWording: 'Building local resilience and coordination capacity to ensure continuity in disaster response.',
        redTeamWarning: 'Radio networks must strictly avoid transmission of military or political information to prevent confiscation.'
      },
      disengagement_reintegration: {
        pillarId: 'disengagement_reintegration',
        climateSecurityConsideration: 'Degraded agricultural land may constrain reintegration livelihoods and, under specific conditions, increase exposure to renewed recruitment by armed groups.',
        youthRoleAgency: 'Ex-militants collaborate with host communities to build check-dams and restore groundwater tables.',
        protectionConcern: 'Host communities resist the return of former militants, fear of active combat return.',
        practicalEntryPoint: 'Implement community-based water conservation works that employ both returnees and community youth.',
        suggestedAction: 'Construct 12 stone check-dams employing 80 returnees and 80 local residents.',
        indicator: 'Increase in local water table levels and community trust index scores.',
        diplomaticWording: 'Enhancing local water security and facilitating social reconciliation through public conservation works.',
        redTeamWarning: 'Work allocations and payments must be equal for both returnees and community members to prevent jealousy.'
      }
    },
    riskPathways: [
      {
        id: 'carana-path-1',
        context: 'Downstream Carana River Valley',
        hazard: 'Upstream water diversion combined with seasonal drought',
        exposure: 'Irrigated agricultural valleys and nomadic watering holes',
        vulnerability: 'High clan polarization, complete dependence on the river, and low alternative livelihood options',
        capacityConstraint: 'Lack of bilateral transboundary river management treaties between East and West administrations',
        pathwayType: 'resource_competition',
        youthImpact: 'Farming youth block upstream nomadic herders from watering their cattle, which may increase the risk of localized incidents at river banks.',
        youthOpportunity: 'Facilitating a youth-led borderland dialogue to establish shared water scheduling.',
        intervention: 'Fund independent flow monitors and facilitate joint youth cattle-watering agreements.',
        evidenceStrength: 'Medium',
        evidenceGaps: 'Accurate downstream flow measurements during dry seasons due to damaged monitoring stations.'
      }
    ],
    stakeholders: [
      {
        id: 'carana-stake-1',
        name: 'CARANA Water Commission',
        actorType: 'government_institution',
        interest: 'Regulating water flow, maintaining infrastructure, and preventing cross-border resource conflicts.',
        influence: 'High',
        position: 'Neutral',
        youthInclusionQuality: 'Low',
        risks: 'Highly politicized decision-making and low budget for local community outreach.',
        diplomaticSensitivity: 'Commissioners represent rival national political groups; discussions must be framed technically.',
        engagementStrategy: 'Present hydrological data testing whether youth-supported arrangements can improve coordination and overall water use efficiency.'
      },
      {
        id: 'carana-stake-2',
        name: 'Carana River Youth Alliance (CRYA)',
        actorType: 'youth_actor',
        interest: 'Fair water allocation, prevention of localized incidents, and inclusion in local water committees.',
        influence: 'Medium',
        position: 'Supportive',
        youthInclusionQuality: 'High',
        risks: 'Targeting by political spoilers who benefit from conflict.',
        diplomaticSensitivity: 'Must maintain neutrality and refuse alignment with national political parties.',
        engagementStrategy: 'Provide mediation training, financial transparency skills, and connect with regional networks.'
      }
    ]
  }
};

const STORAGE_KEY = 'ycps_workspace_v1';
const STORAGE_VERSION = 1;

interface StoredWorkspace {
  version: typeof STORAGE_VERSION;
  state: AppState;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const parseStoredValue = (value: string | null): unknown => {
  if (value === null) return undefined;

  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
};

type MatrixTextField = Exclude<keyof MatrixEntry, 'pillarId'>;

const MATRIX_TEXT_FIELDS: readonly MatrixTextField[] = [
  'climateSecurityConsideration',
  'youthRoleAgency',
  'protectionConcern',
  'practicalEntryPoint',
  'suggestedAction',
  'indicator',
  'diplomaticWording',
  'redTeamWarning',
  'implementationOutput'
];

const normalizeMatrixEntries = (value: unknown): Record<YPSPillarId, MatrixEntry> => {
  const defaults = defaultMatrixEntries();
  if (!isRecord(value)) return defaults;

  return Object.fromEntries(
    (Object.keys(defaults) as YPSPillarId[]).map((pillarId) => {
      const candidate = value[pillarId];
      if (!isRecord(candidate) || candidate.pillarId !== pillarId) {
        return [pillarId, defaults[pillarId]];
      }

      const normalized = { ...defaults[pillarId] };
      for (const field of MATRIX_TEXT_FIELDS) {
        if (typeof candidate[field] === 'string') {
          normalized[field] = candidate[field];
        }
      }
      return [pillarId, normalized];
    })
  ) as Record<YPSPillarId, MatrixEntry>;
};

const hasStringFields = (value: unknown, fields: readonly string[]): value is Record<string, string> =>
  isRecord(value) && fields.every((field) => typeof value[field] === 'string');

const isRiskPathway = (value: unknown): value is RiskPathway =>
  hasStringFields(value, [
    'id', 'context', 'hazard', 'exposure', 'vulnerability', 'capacityConstraint',
    'pathwayType', 'youthImpact', 'youthOpportunity', 'intervention',
    'evidenceStrength', 'evidenceGaps'
  ]);

const isStakeholder = (value: unknown): value is Stakeholder =>
  hasStringFields(value, [
    'id', 'name', 'actorType', 'interest', 'influence', 'position',
    'youthInclusionQuality', 'risks', 'diplomaticSensitivity', 'engagementStrategy'
  ]);

const normalizeState = (value: unknown): AppState => {
  const candidate = isRecord(value) ? value : {};
  const pathways = Array.isArray(candidate.riskPathways)
    ? candidate.riskPathways.filter(isRiskPathway)
    : [];
  const stakeholders = Array.isArray(candidate.stakeholders)
    ? candidate.stakeholders.filter(isStakeholder)
    : [];

  return {
    currentScenario: typeof candidate.currentScenario === 'string' ? candidate.currentScenario : 'custom',
    contextName: typeof candidate.contextName === 'string' ? candidate.contextName : 'Custom Context',
    matrixEntries: normalizeMatrixEntries(candidate.matrixEntries),
    riskPathways: pathways,
    stakeholders
  };
};

const loadStoredState = (): AppState => {
  const storedWorkspace = parseStoredValue(localStorage.getItem(STORAGE_KEY));
  if (
    isRecord(storedWorkspace) &&
    storedWorkspace.version === STORAGE_VERSION &&
    'state' in storedWorkspace
  ) {
    return normalizeState(storedWorkspace.state);
  }

  return normalizeState({
    currentScenario: localStorage.getItem('ycps_current_scenario'),
    contextName: localStorage.getItem('ycps_context_name'),
    matrixEntries: parseStoredValue(localStorage.getItem('ycps_matrix')),
    riskPathways: parseStoredValue(localStorage.getItem('ycps_pathways')),
    stakeholders: parseStoredValue(localStorage.getItem('ycps_stakeholders'))
  });
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    currentScenario: 'custom',
    contextName: 'Custom Context',
    matrixEntries: defaultMatrixEntries(),
    riskPathways: [],
    stakeholders: []
  });

  // Load from localStorage on mount (safe for Next.js SSR)
  useEffect(() => {
    try {
      const storedState = loadStoredState();

      // Update state in an asynchronous timeout block to satisfy ESLint
      // which checks for synchronous cascading setState inside effect body
      const timeoutId = window.setTimeout(() => setState(storedState), 0);
      return () => window.clearTimeout(timeoutId);
    } catch (e) {
      console.error('Failed to load YCPS state from localStorage', e);
    }
  }, []);

  // Save changes to localStorage helper
  const saveState = (
    scenario: string,
    context: string,
    matrix: Record<YPSPillarId, MatrixEntry>,
    pathways: RiskPathway[],
    stk: Stakeholder[]
  ) => {
    try {
      const workspace: StoredWorkspace = {
        version: STORAGE_VERSION,
        state: {
          currentScenario: scenario,
          contextName: context,
          matrixEntries: matrix,
          riskPathways: pathways,
          stakeholders: stk
        }
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
    } catch (e) {
      console.error('Failed to save YCPS state to localStorage', e);
    }
  };

  const loadScenario = (scenarioId: string) => {
    if (SCENARIOS[scenarioId]) {
      const selected = SCENARIOS[scenarioId];
      setState({
        currentScenario: scenarioId,
        contextName: selected.context,
        matrixEntries: selected.matrix,
        riskPathways: selected.riskPathways,
        stakeholders: selected.stakeholders
      });
      saveState(scenarioId, selected.context, selected.matrix, selected.riskPathways, selected.stakeholders);
    } else if (scenarioId === 'custom') {
      const emptyMat = defaultMatrixEntries();
      setState({
        currentScenario: 'custom',
        contextName: 'Custom Context',
        matrixEntries: emptyMat,
        riskPathways: [],
        stakeholders: []
      });
      saveState('custom', 'Custom Context', emptyMat, [], []);
    }
  };

  const updateMatrixEntry = (pillarId: YPSPillarId, fields: Partial<MatrixEntry>) => {
    setState((prev) => {
      const updatedMatrix = {
        ...prev.matrixEntries,
        [pillarId]: {
          ...prev.matrixEntries[pillarId],
          ...fields
        }
      };
      saveState(prev.currentScenario, prev.contextName, updatedMatrix, prev.riskPathways, prev.stakeholders);
      return {
        ...prev,
        matrixEntries: updatedMatrix
      };
    });
  };

  const addRiskPathway = (pathway: Omit<RiskPathway, 'id'>) => {
    setState((prev) => {
      const newPathway: RiskPathway = {
        ...pathway,
        id: `pathway-${Date.now()}`
      };
      const updatedPathways = [...prev.riskPathways, newPathway];
      saveState(prev.currentScenario, prev.contextName, prev.matrixEntries, updatedPathways, prev.stakeholders);
      return {
        ...prev,
        riskPathways: updatedPathways
      };
    });
  };

  const updateRiskPathway = (id: string, fields: Partial<RiskPathway>) => {
    setState((prev) => {
      const updatedPathways = prev.riskPathways.map((p) => (p.id === id ? { ...p, ...fields } : p));
      saveState(prev.currentScenario, prev.contextName, prev.matrixEntries, updatedPathways, prev.stakeholders);
      return {
        ...prev,
        riskPathways: updatedPathways
      };
    });
  };

  const deleteRiskPathway = (id: string) => {
    setState((prev) => {
      const updatedPathways = prev.riskPathways.filter((p) => p.id !== id);
      saveState(prev.currentScenario, prev.contextName, prev.matrixEntries, updatedPathways, prev.stakeholders);
      return {
        ...prev,
        riskPathways: updatedPathways
      };
    });
  };

  const addStakeholder = (stakeholder: Omit<Stakeholder, 'id'>) => {
    setState((prev) => {
      const newStakeholder: Stakeholder = {
        ...stakeholder,
        id: `stakeholder-${Date.now()}`
      };
      const updatedStakeholders = [...prev.stakeholders, newStakeholder];
      saveState(prev.currentScenario, prev.contextName, prev.matrixEntries, prev.riskPathways, updatedStakeholders);
      return {
        ...prev,
        stakeholders: updatedStakeholders
      };
    });
  };

  const updateStakeholder = (id: string, fields: Partial<Stakeholder>) => {
    setState((prev) => {
      const updatedStakeholders = prev.stakeholders.map((s) => (s.id === id ? { ...s, ...fields } : s));
      saveState(prev.currentScenario, prev.contextName, prev.matrixEntries, prev.riskPathways, updatedStakeholders);
      return {
        ...prev,
        stakeholders: updatedStakeholders
      };
    });
  };

  const deleteStakeholder = (id: string) => {
    setState((prev) => {
      const updatedStakeholders = prev.stakeholders.filter((s) => s.id !== id);
      saveState(prev.currentScenario, prev.contextName, prev.matrixEntries, prev.riskPathways, updatedStakeholders);
      return {
        ...prev,
        stakeholders: updatedStakeholders
      };
    });
  };

  const resetAll = () => {
    loadScenario('custom');
  };

  return (
    <AppContext.Provider
      value={{
        currentScenario: state.currentScenario,
        contextName: state.contextName,
        setContextName: (name) => {
          setState((prev) => {
            saveState(prev.currentScenario, name, prev.matrixEntries, prev.riskPathways, prev.stakeholders);
            return { ...prev, contextName: name };
          });
        },
        matrixEntries: state.matrixEntries,
        riskPathways: state.riskPathways,
        stakeholders: state.stakeholders,
        loadScenario,
        updateMatrixEntry,
        addRiskPathway,
        updateRiskPathway,
        deleteRiskPathway,
        addStakeholder,
        updateStakeholder,
        deleteStakeholder,
        resetAll
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
