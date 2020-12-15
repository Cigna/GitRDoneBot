import { GitLabApi, SuccessfulGetResponse } from "../../src/gitlab";
import {
  AuthorizationFailureBotAction,
  DiffSize,
  NetworkFailureBotAction,
  SuccessfulBotAction,
} from "../../src/bot_actions";
import { unauthorized_401, fetch_network_error } from "../helpers";
import { BotActionConfig } from "../../src/custom_config/bot_action_config";
import { DiffSizeDefaults } from "../../src/custom_config/action_config_defaults";

// TEST FIXTURES

const customConfig = BotActionConfig.from(DiffSizeDefaults, {});

const customConfigThresholdOne = BotActionConfig.from(
  {
    actionName: "diffAnalysis",
    thresholdName: "thresholdInLinesOfDiff",
    thresholdDefault: 1,
    thresholdMin: 0,
    thresholdMax: 500,
    constructiveFeedbackOnlyToggleDefault: false,
  },
  {},
);

const changes_between_zero_and_500 = new SuccessfulGetResponse(200, {
  changes: [
    {
      old_path: "README.md",
      new_path: "README.md",
      a_mode: "100644",
      b_mode: "100644",
      new_file: false,
      renamed_file: false,
      deleted_file: false,
      diff:
        "@@ -4,3 +4,4 @@ Leverage agile frameworks to provide a robust synopsis for high level overviews.\n Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. \n Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.\n \n+Testing for WIP stuff.\n\\ No newline at end of file\n",
    },
  ],
});

const changes_more_than_500 = new SuccessfulGetResponse(200, {
  changes: [
    {
      old_path: "README.md",
      new_path: "README.md",
      a_mode: "100644",
      b_mode: "100644",
      new_file: false,
      renamed_file: false,
      deleted_file: false,
      diff:
        '@@ -4,3 +4,586 @@ Leverage agile frameworks to provide a robust synopsis for high level overviews.\n Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. \n Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.\n \n+Bring to the table win-win survival strategies to ensure proactive domination. \n+At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. \n+User generated content in real-time will have multiple touchpoints for offshoring.\n+\n+Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. \n+Override the digital divide with additional clickthroughs from DevOps. \n+Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.\n+\n+Podcasting operational change management inside of workflows to establish a framework. \n+Taking seamless key performance indicators offline to maximise the long tail. \n+Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.\n+\n+Collaboratively administrate empowered markets via plug-and-play networks. \n+Dynamically procrastinate B2C users after installed base benefits. \n+Dramatically visualize customer directed convergence without revolutionary ROI.\n+\n+Efficiently unleash cross-media information without cross-media value. \n+Quickly maximize timely deliverables for real-time schemas. \n+Dramatically maintain clicks-and-mortar solutions without functional solutions.\n+\n+Completely synergize resource taxing relationships via premier niche markets. \n+Professionally cultivate one-to-one customer service with robust ideas. \n+Dynamically innovate resource-leveling customer service for state of the art customer service.\n+\n+Objectively innovate empowered manufactured products whereas parallel platforms. \n+Holisticly predominate extensible testing procedures for reliable supply chains. \n+Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.\n+\n+Proactively envisioned multimedia based expertise and cross-media growth strategies. \n+Seamlessly visualize quality intellectual capital without superior collaboration and idea-sharing. \n+Holistically pontificate installed base portals after maintainable products.\n+\n+Phosfluorescently engage worldwide methodologies with web-enabled technology. \n+Interactively coordinate proactive e-commerce via process-centric "outside the box" thinking. \n+Completely pursue scalable customer service through sustainable potentialities.\n+\n+Collaboratively administrate turnkey channels whereas virtual e-tailers. \n+Objectively seize scalable metrics whereas proactive e-services. \n+Seamlessly empower fully researched growth strategies and interoperable internal or "organic" sources.\n+\n+Credibly innovate granular internal or "organic" sources whereas high standards in web-readiness. \n+Energistically scale future-proof core competencies vis-a-vis impactful experiences. \n+Dramatically synthesize integrated schemas with optimal networks.\n+\n+Interactively procrastinate high-payoff content without backward-compatible data. \n+Quickly cultivate optimal processes and tactical architectures. \n+Completely iterate covalent strategic theme areas via accurate e-markets.\n+\n+Globally incubate standards compliant channels before scalable benefits. \n+Quickly disseminate superior deliverables whereas web-enabled applications. \n+Quickly drive clicks-and-mortar catalysts for change before vertical architectures.\n+\n+Credibly reintermediate backend ideas for cross-platform models. \n+Continually reintermediate integrated processes through technically sound intellectual capital. \n+Holistically foster superior methodologies without market-driven best practices.\n+\n+Distinctively exploit optimal alignments for intuitive bandwidth. \n+Quickly coordinate e-business applications through revolutionary catalysts for change. \n+Seamlessly underwhelm optimal testing procedures whereas bricks-and-clicks processes.\n+\n+Synergistically evolve 2.0 technologies rather than just in time initiatives. \n+Quickly deploy strategic networks with compelling e-business. \n+Credibly pontificate highly efficient manufactured products and enabled data.\n+\n+Dynamically target high-payoff intellectual capital for customized technologies. \n+Objectively integrate emerging core competencies before process-centric communities. Dramatically evisculate holistic innovation rather than client-centric data.\n+\n+Progressively maintain extensive infomediaries via extensible niches. \n+Dramatically disseminate standardized metrics after resource-leveling processes. Objectively pursue diverse catalysts for change for interoperable meta-services.\n+\n+Proactively fabricate one-to-one materials via effective e-business. \n+Completely synergize scalable e-commerce rather than high standards in e-services. Assertively iterate resource maximizing products after leading-edge intellectual capital.\n+\n+Distinctively re-engineer revolutionary meta-services and premium architectures. \n+Intrinsically incubate intuitive opportunities and real-time potentialities. \n+Appropriately communicate one-to-one technology after plug-and-play networks.\n+\n+Quickly aggregate B2B users and worldwide potentialities.\n+Progressively plagiarize resource-leveling e-commerce through resource-leveling core competencies. \n+Dramatically mesh low-risk high-yield alignments before transparent e-tailers.\n+\n+Appropriately empower dynamic leadership skills after business portals. \n+Globally myocardinate interactive supply chains with distinctive quality vectors. \n+Globally revolutionize global sources through interoperable services.\n+\n+Enthusiastically mesh long-term high-impact infrastructures vis-a-vis efficient customer service. \n+Professionally fashion wireless leadership rather than prospective experiences. \n+Energistically myocardinate clicks-and-mortar testing procedures whereas next-generation manufactured products.\n+\n+Dynamically reinvent market-driven opportunities and ubiquitous interfaces. \n+Energistically fabricate an expanded array of niche markets through robust products. \n+Appropriately implement visionary e-services vis-a-vis strategic web-readiness.\n+\n+Compellingly embrace empowered e-business after user friendly intellectual capital. \n+Interactively actualize front-end processes with effective convergence. \n+Synergistically deliver performance based methods of empowerment whereas distributed expertise.\n+\n+Efficiently enable enabled sources and cost effective products. \n+Completely synthesize principle-centered information after ethical communities. \n+Efficiently innovate open-source infrastructures via inexpensive materials.\n+\n+Objectively integrate enterprise-wide strategic theme areas with functionalized infrastructures. \n+Interactively productize premium technologies whereas interdependent quality vectors. \n+Rapaciously utilize enterprise experiences via 24/7 markets.\n+\n+Uniquely matrix economically sound value through cooperative technology. \n+Competently parallel task fully researched data and enterprise process improvements. \n+Collaboratively expedite quality manufactured products via client-focused results.\n+\n+Quickly communicate enabled technology and turnkey leadership skills. \n+Uniquely enable accurate supply chains rather than frictionless technology. \n+Globally network focused materials vis-a-vis cost effective manufactured products.\n+\n+Enthusiastically leverage existing premium quality vectors with enterprise-wide innovation. \n+Phosfluorescently leverage others enterprise-wide "outside the box" thinking with e-business collaboration and idea-sharing. \n+Proactively leverage other resource-leveling convergence rather than inter-mandated networks.\n+\n+Rapaciously seize adaptive infomediaries and user-centric intellectual capital. \n+Collaboratively unleash market-driven "outside the box" thinking for long-term high-impact solutions. \n+Enthusiastically engage fully tested process improvements before top-line platforms.\n+\n+Efficiently myocardinate market-driven innovation via open-source alignments. \n+Dramatically engage high-payoff infomediaries rather than client-centric imperatives. \n+Efficiently initiate world-class applications after client-centric infomediaries.\n+\n+Phosfluorescently expedite impactful supply chains via focused results. \n+Holistically generate open-source applications through bleeding-edge sources. \n+Compellingly supply just in time catalysts for change through top-line potentialities.\n+\n+Uniquely deploy cross-unit benefits with wireless testing procedures. \n+Collaboratively build backward-compatible relationships whereas tactical paradigms. \n+Compellingly reconceptualize compelling outsourcing whereas optimal customer service.\n+\n+Quickly incentivize impactful action items before tactical collaboration and idea-sharing. \n+Monotonically engage market-driven intellectual capital through wireless opportunities. \n+Progressively network performance based services for functionalized testing procedures.\n+\n+Globally harness multimedia based collaboration and idea-sharing with backend products. \n+Continually whiteboard superior opportunities via covalent scenarios.\n+\n+Leverage agile frameworks to provide a robust synopsis for high level overviews. \n+Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. \n+Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.\n+\n+Bring to the table win-win survival strategies to ensure proactive domination. \n+At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. \n+User generated content in real-time will have multiple touchpoints for offshoring.\n+\n+Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. \n+Override the digital divide with additional clickthroughs from DevOps. \n+Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.\n+\n+Podcasting operational change management inside of workflows to establish a framework. \n+Taking seamless key performance indicators offline to maximise the long tail. \n+Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.\n+\n+Collaboratively administrate empowered markets via plug-and-play networks. \n+Dynamically procrastinate B2C users after installed base benefits. \n+Dramatically visualize customer directed convergence without revolutionary ROI.\n+\n+Efficiently unleash cross-media information without cross-media value. \n+Quickly maximize timely deliverables for real-time schemas. \n+Dramatically maintain clicks-and-mortar solutions without functional solutions.\n+\n+Completely synergize resource taxing relationships via premier niche markets. \n+Professionally cultivate one-to-one customer service with robust ideas. \n+Dynamically innovate resource-leveling customer service for state of the art customer service.\n+\n+Objectively innovate empowered manufactured products whereas parallel platforms. \n+Holisticly predominate extensible testing procedures for reliable supply chains. \n+Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.\n+\n+Proactively envisioned multimedia based expertise and cross-media growth strategies. \n+Seamlessly visualize quality intellectual capital without superior collaboration and idea-sharing. \n+Holistically pontificate installed base portals after maintainable products.\n+\n+Phosfluorescently engage worldwide methodologies with web-enabled technology. \n+Interactively coordinate proactive e-commerce via process-centric "outside the box" thinking.\n+Completely pursue scalable customer service through sustainable potentialities.\n+\n+Collaboratively administrate turnkey channels whereas virtual e-tailers. \n+Objectively seize scalable metrics whereas proactive e-services. \n+Seamlessly empower fully researched growth strategies and interoperable internal or "organic" sources.\n+\n+Credibly innovate granular internal or "organic" sources whereas high standards in web-readiness. \n+Energistically scale future-proof core competencies vis-a-vis impactful experiences. \n+Dramatically synthesize integrated schemas with optimal networks.\n+\n+Interactively procrastinate high-payoff content without backward-compatible data. \n+Quickly cultivate optimal processes and tactical architectures. \n+Completely iterate covalent strategic theme areas via accurate e-markets.\n+\n+Leverage agile frameworks to provide a robust synopsis for high level overviews. \n+Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. \n+Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.\n+\n+Bring to the table win-win survival strategies to ensure proactive domination. \n+At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. \n+User generated content in real-time will have multiple touchpoints for offshoring.\n+\n+Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. \n+Override the digital divide with additional clickthroughs from DevOps. \n+Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.\n+\n+Podcasting operational change management inside of workflows to establish a framework. \n+Taking seamless key performance indicators offline to maximise the long tail. \n+Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.\n+\n+Collaboratively administrate empowered markets via plug-and-play networks. \n+Dynamically procrastinate B2C users after installed base benefits. \n+Dramatically visualize customer directed convergence without revolutionary ROI.\n+\n+Efficiently unleash cross-media information without cross-media value. \n+Quickly maximize timely deliverables for real-time schemas. \n+Dramatically maintain clicks-and-mortar solutions without functional solutions.\n+\n+Completely synergize resource taxing relationships via premier niche markets. \n+Professionally cultivate one-to-one customer service with robust ideas. \n+Dynamically innovate resource-leveling customer service for state of the art customer service.\n+\n+Objectively innovate empowered manufactured products whereas parallel platforms. \n+Holisticly predominate extensible testing procedures for reliable supply chains. \n+Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.\n+\n+Proactively envisioned multimedia based expertise and cross-media growth strategies. \n+Seamlessly visualize quality intellectual capital without superior collaboration and idea-sharing. \n+Holistically pontificate installed base portals after maintainable products.\n+\n+Phosfluorescently engage worldwide methodologies with web-enabled technology. \n+Interactively coordinate proactive e-commerce via process-centric "outside the box" thinking. \n+Completely pursue scalable customer service through sustainable potentialities.\n+\n+Collaboratively administrate turnkey channels whereas virtual e-tailers. \n+Objectively seize scalable metrics whereas proactive e-services. \n+Seamlessly empower fully researched growth strategies and interoperable internal or "organic" sources.\n+\n+Credibly innovate granular internal or "organic" sources whereas high standards in web-readiness. \n+Energistically scale future-proof core competencies vis-a-vis impactful experiences. \n+Dramatically synthesize integrated schemas with optimal networks.\n+\n+Interactively procrastinate high-payoff content without backward-compatible data. \n+Quickly cultivate optimal processes and tactical architectures. \n+Completely iterate covalent strategic theme areas via accurate e-markets.\n+\n+Globally incubate standards compliant channels before scalable benefits. \n+Quickly disseminate superior deliverables whereas web-enabled applications. \n+Quickly drive clicks-and-mortar catalysts for change before vertical architectures.\n+\n+Credibly reintermediate backend ideas for cross-platform models. \n+Continually reintermediate integrated processes through technically sound intellectual capital. \n+Holistically foster superior methodologies without market-driven best practices.\n+\n+Distinctively exploit optimal alignments for intuitive bandwidth. \n+Quickly coordinate e-business applications through revolutionary catalysts for change. \n+Seamlessly underwhelm optimal testing procedures whereas bricks-and-clicks processes.\n+\n+Synergistically evolve 2.0 technologies rather than just in time initiatives. \n+Quickly deploy strategic networks with compelling e-business. \n+Credibly pontificate highly efficient manufactured products and enabled data.\n+\n+Dynamically target high-payoff intellectual capital for customized technologies. \n+Objectively integrate emerging core competencies before process-centric communities. Dramatically evisculate holistic innovation rather than client-centric data.\n+\n+Progressively maintain extensive infomediaries via extensible niches. \n+Dramatically disseminate standardized metrics after resource-leveling processes. Objectively pursue diverse catalysts for change for interoperable meta-services.\n+\n+Proactively fabricate one-to-one materials via effective e-business. \n+Completely synergize scalable e-commerce rather than high standards in e-services. Assertively iterate resource maximizing products after leading-edge intellectual capital.\n+\n+Distinctively re-engineer revolutionary meta-services and premium architectures. \n+Intrinsically incubate intuitive opportunities and real-time potentialities. \n+Appropriately communicate one-to-one technology after plug-and-play networks.\n+\n+Quickly aggregate B2B users and worldwide potentialities.\n+Progressively plagiarize resource-leveling e-commerce through resource-leveling core competencies. \n+Dramatically mesh low-risk high-yield alignments before transparent e-tailers.\n+\n+Appropriately empower dynamic leadership skills after business portals. \n+Globally myocardinate interactive supply chains with distinctive quality vectors. \n+Globally revolutionize global sources through interoperable services.\n+\n+Enthusiastically mesh long-term high-impact infrastructures vis-a-vis efficient customer service. \n+Professionally fashion wireless leadership rather than prospective experiences. \n+Energistically myocardinate clicks-and-mortar testing procedures whereas next-generation manufactured products.\n+\n+Dynamically reinvent market-driven opportunities and ubiquitous interfaces. \n+Energistically fabricate an expanded array of niche markets through robust products. \n+Appropriately implement visionary e-services vis-a-vis strategic web-readiness.\n+\n+Compellingly embrace empowered e-business after user friendly intellectual capital. \n+Interactively actualize front-end processes with effective convergence. \n+Synergistically deliver performance based methods of empowerment whereas distributed expertise.\n+\n+Efficiently enable enabled sources and cost effective products. \n+Completely synthesize principle-centered information after ethical communities. \n+Efficiently innovate open-source infrastructures via inexpensive materials.\n+\n+Objectively integrate enterprise-wide strategic theme areas with functionalized infrastructures. \n+Interactively productize premium technologies whereas interdependent quality vectors. \n+Rapaciously utilize enterprise experiences via 24/7 markets.\n+\n+Uniquely matrix economically sound value through cooperative technology. \n+Competently parallel task fully researched data and enterprise process improvements. \n+Collaboratively expedite quality manufactured products via client-focused results.\n+\n+Quickly communicate enabled technology and turnkey leadership skills. \n+Uniquely enable accurate supply chains rather than frictionless technology. \n+Globally network focused materials vis-a-vis cost effective manufactured products.\n+\n+Enthusiastically leverage existing premium quality vectors with enterprise-wide innovation. \n+Phosfluorescently leverage others enterprise-wide "outside the box" thinking with e-business collaboration and idea-sharing. \n+Proactively leverage other resource-leveling convergence rather than inter-mandated networks.\n+\n+Rapaciously seize adaptive infomediaries and user-centric intellectual capital. \n+Collaboratively unleash market-driven "outside the box" thinking for long-term high-impact solutions. \n+Enthusiastically engage fully tested process improvements before top-line platforms.\n+\n+Efficiently myocardinate market-driven innovation via open-source alignments. \n+Dramatically engage high-payoff infomediaries rather than client-centric imperatives. \n+Efficiently initiate world-class applications after client-centric infomediaries.\n+\n+Phosfluorescently expedite impactful supply chains via focused results. \n+Holistically generate open-source applications through bleeding-edge sources. \n+Compellingly supply just in time catalysts for change through top-line potentialities.\n+\n+Uniquely deploy cross-unit benefits with wireless testing procedures. \n+Collaboratively build backward-compatible relationships whereas tactical paradigms. \n+Compellingly reconceptualize compelling outsourcing whereas optimal customer service.\n+\n+Quickly incentivize impactful action items before tactical collaboration and idea-sharing. \n+Monotonically engage market-driven intellectual capital through wireless opportunities. \n+Progressively network performance based services for functionalized testing procedures.\n+\n+Globally harness multimedia based collaboration and idea-sharing with backend products. \n+Continually whiteboard superior opportunities via covalent scenarios.\n+\n+Leverage agile frameworks to provide a robust synopsis for high level overviews. \n+Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. \n+Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.\n+\n+Bring to the table win-win survival strategies to ensure proactive domination. \n+At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. \n+User generated content in real-time will have multiple touchpoints for offshoring.\n+\n+Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. \n+Override the digital divide with additional clickthroughs from DevOps. \n+Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.\n+\n+Podcasting operational change management inside of workflows to establish a framework. \n+Taking seamless key performance indicators offline to maximise the long tail. \n+Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.\n+\n+Collaboratively administrate empowered markets via plug-and-play networks. \n+Dynamically procrastinate B2C users after installed base benefits. \n+Dramatically visualize customer directed convergence without revolutionary ROI.\n+\n+Efficiently unleash cross-media information without cross-media value. \n+Quickly maximize timely deliverables for real-time schemas. \n+Dramatically maintain clicks-and-mortar solutions without functional solutions.\n+\n+Completely synergize resource taxing relationships via premier niche markets. \n+Professionally cultivate one-to-one customer service with robust ideas. \n+Dynamically innovate resource-leveling customer service for state of the art customer service.\n+\n+Objectively innovate empowered manufactured products whereas parallel platforms. \n+Holisticly predominate extensible testing procedures for reliable supply chains. \n+Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.\n+\n+Proactively envisioned multimedia based expertise and cross-media growth strategies. \n+Seamlessly visualize quality intellectual capital without superior collaboration and idea-sharing. \n+Holistically pontificate installed base portals after maintainable products.\n+\n+Phosfluorescently engage worldwide methodologies with web-enabled technology. \n+Interactively coordinate proactive e-commerce via process-centric "outside the box" thinking.\n+Completely pursue scalable customer service through sustainable potentialities.\n+\n+Collaboratively administrate turnkey channels whereas virtual e-tailers. \n+Objectively seize scalable metrics whereas proactive e-services. \n+Seamlessly empower fully researched growth strategies and interoperable internal or "organic" sources.\n+\n+Credibly innovate granular internal or "organic" sources whereas high standards in web-readiness. \n+Energistically scale future-proof core competencies vis-a-vis impactful experiences. \n+Dramatically synthesize integrated schemas with optimal networks.\n+\n+Interactively procrastinate high-payoff content without backward-compatible data. \n+Quickly cultivate optimal processes and tactical architectures. \n+Completely iterate covalent strategic theme areas via accurate e-markets.\n+\n+Leverage agile frameworks to provide a robust synopsis for high level overviews. \n+Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. \n+Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.\n+\n+Bring to the table win-win survival strategies to ensure proactive domination. \n+At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. \n+User generated content in real-time will have multiple touchpoints for offshoring.\n+\n+Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. \n+Override the digital divide with additional clickthroughs from DevOps. \n+Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.\n+\n+Podcasting operational change management inside of workflows to establish a framework. \n+Taking seamless key performance indicators offline to maximise the long tail. \n+Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.\n+\n+Collaboratively administrate empowered markets via plug-and-play networks. \n+Dynamically procrastinate B2C users after installed base benefits. \n+Dramatically visualize customer directed convergence without revolutionary ROI.\n+\n+Efficiently unleash cross-media information without cross-media value. \n+Quickly maximize timely deliverables for real-time schemas. \n+Dramatically maintain clicks-and-mortar solutions without functional solutions.\n+\n+Completely synergize resource taxing relationships via premier niche markets. \n+Professionally cultivate one-to-one customer service with robust ideas. \n+Dynamically innovate resource-leveling customer service for state of the art customer service.\n+\n+Objectively innovate empowered manufactured products whereas parallel platforms. \n+Holisticly predominate extensible testing procedures for reliable supply chains. \n+Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.\n+\n+Proactively envisioned multimedia based expertise and cross-media growth strategies. \n+Seamlessly visualize quality intellectual capital without superior collaboration and idea-sharing. \n+Holistically pontificate installed base portals after maintainable products.\n+\n+Phosfluorescently engage worldwide methodologies with web-enabled technology. \n+Interactively coordinate proactive e-commerce via process-centric "outside the box" thinking. \n+Completely pursue scalable customer service through sustainable potentialities.\n+\n+Collaboratively administrate turnkey channels whereas virtual e-tailers. \n+Objectively seize scalable metrics whereas proactive e-services. \n+Seamlessly empower fully researched growth strategies and interoperable internal or "organic" sources.\n+\n+Credibly innovate granular internal or "organic" sources whereas high standards in web-readiness. \n+Energistically scale future-proof core competencies vis-a-vis impactful experiences. \n+Dramatically synthesize integrated schemas with optimal networks.\n+\n+Interactively procrastinate high-payoff content without backward-compatible data. \n+Quickly cultivate optimal processes and tactical architectures. \n+Completely iterate covalent strategic theme areas via accurate e-markets.\n+\n+Globally incubate standards compliant channels before scalable benefits. \n+Quickly disseminate superior deliverables whereas web-enabled applications. \n+Quickly drive clicks-and-mortar catalysts for change before vertical architectures.\n+\n+Credibly reintermediate backend ideas for cross-platform models. \n+Continually reintermediate integrated processes through technically sound intellectual capital. \n+Holistically foster superior methodologies without market-driven best practices.\n+\n+Distinctively exploit optimal alignments for intuitive bandwidth. \n+Quickly coordinate e-business applications through revolutionary catalysts for change. \n+Seamlessly underwhelm optimal testing procedures whereas bricks-and-clicks processes.\n+\n+Synergistically evolve 2.0 technologies rather than just in time initiatives. \n+Quickly deploy strategic networks with compelling e-business. \n+Credibly pontificate highly efficient manufactured products and enabled data.\n+\n+Dynamically target high-payoff intellectual capital for customized technologies. \n+Objectively integrate emerging core competencies before process-centric communities. Dramatically evisculate holistic innovation rather than client-centric data.\n+\n+Progressively maintain extensive infomediaries via extensible niches. \n+Dramatically disseminate standardized metrics after resource-leveling processes. Objectively pursue diverse catalysts for change for interoperable meta-services.\n+\n+Proactively fabricate one-to-one materials via effective e-business. \n+Completely synergize scalable e-commerce rather than high standards in e-services. Assertively iterate resource maximizing products after leading-edge intellectual capital.\n+\n+Distinctively re-engineer revolutionary meta-services and premium architectures. \n+Intrinsically incubate intuitive opportunities and real-time potentialities. \n+Appropriately communicate one-to-one technology after plug-and-play networks.\n+\n+Quickly aggregate B2B users and worldwide potentialities.\n+Progressively plagiarize resource-leveling e-commerce through resource-leveling core competencies. \n+Dramatically mesh low-risk high-yield alignments before transparent e-tailers.\n+\n+Appropriately empower dynamic leadership skills after business portals. \n+Globally myocardinate interactive supply chains with distinctive quality vectors. \n+Globally revolutionize global sources through interoperable services.\n+\n+Enthusiastically mesh long-term high-impact infrastructures vis-a-vis efficient customer service. \n+Professionally fashion wireless leadership rather than prospective experiences. \n+Energistically myocardinate clicks-and-mortar testing procedures whereas next-generation manufactured products.\n+\n+Dynamically reinvent market-driven opportunities and ubiquitous interfaces. \n+Energistically fabricate an expanded array of niche markets through robust products. \n+Appropriately implement visionary e-services vis-a-vis strategic web-readiness.\n+\n+Compellingly embrace empowered e-business after user friendly intellectual capital. \n+Interactively actualize front-end processes with effective convergence. \n+Synergistically deliver performance based methods of empowerment whereas distributed expertise.\n+\n+Efficiently enable enabled sources and cost effective products. \n+Completely synthesize principle-centered information after ethical communities. \n+Efficiently innovate open-source infrastructures via inexpensive materials.\n+\n+Objectively integrate enterprise-wide strategic theme areas with functionalized infrastructures. \n+Interactively productize premium technologies whereas interdependent quality vectors. \n+Rapaciously utilize enterprise experiences via 24/7 markets.\n+\n+Uniquely matrix economically sound value through cooperative technology. \n+Competently parallel task fully researched data and enterprise process improvements. \n+Collaboratively expedite quality manufactured products via client-focused results.\n+\n+Quickly communicate enabled technology and turnkey leadership skills. \n+Uniquely enable accurate supply chains rather than frictionless technology. \n+Globally network focused materials vis-a-vis cost effective manufactured products.\n+\n+Enthusiastically leverage existing premium quality vectors with enterprise-wide innovation. \n+Phosfluorescently leverage others enterprise-wide "outside the box" thinking with e-business collaboration and idea-sharing. \n+Proactively leverage other resource-leveling convergence rather than inter-mandated networks.\n+\n+Rapaciously seize adaptive infomediaries and user-centric intellectual capital. \n+Collaboratively unleash market-driven "outside the box" thinking for long-term high-impact solutions. \n+Enthusiastically engage fully tested process improvements before top-line platforms.\n+\n+Efficiently myocardinate market-driven innovation via open-source alignments. \n+Dramatically engage high-payoff infomediaries rather than client-centric imperatives. \n+Efficiently initiate world-class applications after client-centric infomediaries.\n+\n+Phosfluorescently expedite impactful supply chains via focused results. \n+Holistically generate open-source applications through bleeding-edge sources. \n+Compellingly supply just in time catalysts for change through top-line potentialities.\n+\n+Uniquely deploy cross-unit benefits with wireless testing procedures. \n+Collaboratively build backward-compatible relationships whereas tactical paradigms. \n+Compellingly reconceptualize compelling outsourcing whereas optimal customer service.\n+\n+Quickly incentivize impactful action items before tactical collaboration and idea-sharing. \n+Monotonically engage market-driven intellectual capital through wireless opportunities. \n+Progressively network performance based services for functionalized testing procedures.\n+\n+Globally harness multimedia based collaboration and idea-sharing with backend products. \n+Continually whiteboard superior opportunities via covalent scenarios.\n+\n+Leverage agile frameworks to provide a robust synopsis for high level overviews. \n+Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. \n+Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.\n+\n+Bring to the table win-win survival strategies to ensure proactive domination. \n+At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. \n+User generated content in real-time will have multiple touchpoints for offshoring.\n+\n+Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. \n+Override the digital divide with additional clickthroughs from DevOps. \n+Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.\n+\n+Podcasting operational change management inside of workflows to establish a framework. \n+Taking seamless key performance indicators offline to maximise the long tail. \n+Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.\n+\n+Collaboratively administrate empowered markets via plug-and-play networks. \n+Dynamically procrastinate B2C users after installed base benefits. \n+Dramatically visualize customer directed convergence without revolutionary ROI.\n+\n+Efficiently unleash cross-media information without cross-media value. \n+Quickly maximize timely deliverables for real-time schemas. \n+Dramatically maintain clicks-and-mortar solutions without functional solutions.\n+\n+Completely synergize resource taxing relationships via premier niche markets. \n+Professionally cultivate one-to-one customer service with robust ideas. \n+Dynamically innovate resource-leveling customer service for state of the art customer service.\n+\n+Objectively innovate empowered manufactured products whereas parallel platforms. \n+Holisticly predominate extensible testing procedures for reliable supply chains. \n+Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.\n+\n+Proactively envisioned multimedia based expertise and cross-media growth strategies. \n+Seamlessly visualize quality intellectual capital without superior collaboration and idea-sharing. \n+Holistically pontificate installed base portals after maintainable products.\n+\n+Phosfluorescently engage worldwide methodologies with web-enabled technology. \n+Interactively coordinate proactive e-commerce via process-centric "outside the box" thinking.\n+Completely pursue scalable customer service through sustainable potentialities.\n+\n+Collaboratively administrate turnkey channels whereas virtual e-tailers. \n+Objectively seize scalable metrics whereas proactive e-services. \n+Seamlessly empower fully researched growth strategies and interoperable internal or "organic" sources.\n+\n+Credibly innovate granular internal or "organic" sources whereas high standards in web-readiness. \n+Energistically scale future-proof core competencies vis-a-vis impactful experiences. \n+Dramatically synthesize integrated schemas with optimal networks.\n+\n+Interactively procrastinate high-payoff content without backward-compatible data. \n+Quickly cultivate optimal processes and tactical architectures. \n+Completely iterate covalent strategic theme areas via accurate e-markets.\n\\ No newline at end of file\n',
    },
  ],
});

const changes_equal_zero = new SuccessfulGetResponse(200, {
  changes: [],
});

// TESTS

jest.mock("../../src/gitlab/gitlab_api");

describe("Mock API Test: DiffSize Class", () => {
  const api = new GitLabApi("fake-token", 0, 1, "fake-uri");

  describe("(Any state) When the API request fails due to authorization failure", (state = "any") => {
    let diffSizeResponse;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getSingleMRChanges.mockResolvedValue(unauthorized_401);
      diffSizeResponse = await DiffSize.analyze(state, api, customConfig);
      done();
    });

    test("should return instance of AuthorizationFailureBotAction", async () => {
      expect(diffSizeResponse.action).toBeInstanceOf(
        AuthorizationFailureBotAction,
      );
    });
  });

  describe("(Any state) When the API request fails due to network failure", (state = "any") => {
    let diffSizeResponse;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getSingleMRChanges.mockResolvedValue(fetch_network_error);
      diffSizeResponse = await DiffSize.analyze(state, api, customConfig);
      done();
    });

    test("should return instance of NetworkFailureBotAction", async () => {
      expect(diffSizeResponse.action).toBeInstanceOf(NetworkFailureBotAction);
    });
  });

  describe("(Open state) When totalDiffs are greater than 0 and less than threshold", (state = "open") => {
    let diffSizeResponse;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getSingleMRChanges.mockResolvedValue(changes_between_zero_and_500);
      diffSizeResponse = await DiffSize.analyze(state, api, customConfig);
      done();
    });

    test("should return instance of SuccessfulBotAction", async () => {
      expect(diffSizeResponse.action).toBeInstanceOf(SuccessfulBotAction);
    });

    test("goodGitPractice is true", async () => {
      expect(
        (<SuccessfulBotAction>diffSizeResponse.action).goodGitPractice,
      ).toBe(true);
    });

    test("mrNote is good with hashtag", async () => {
      expect((<SuccessfulBotAction>diffSizeResponse.action).mrNote).toBe(
        `${DiffSize.goodNote} ${DiffSize.hashtag}`,
      );
    });

    test("totalDiffs value is between 0 and threshold", async () => {
      expect(diffSizeResponse.computedValues["totalDiffs"]).toBeLessThan(
        customConfig.threshold,
      );
      expect(diffSizeResponse.computedValues["totalDiffs"]).toBeGreaterThan(0);
    });
  });

  describe("(Open state) When totalDiffs are equal to the threshold", (state = "open") => {
    let diffSizeResponse;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getSingleMRChanges.mockResolvedValue(changes_between_zero_and_500);
      diffSizeResponse = await DiffSize.analyze(
        state,
        api,
        customConfigThresholdOne,
      );
      done();
    });

    test("should return instance of SuccessfulBotAction", async () => {
      expect(diffSizeResponse.action).toBeInstanceOf(SuccessfulBotAction);
    });

    test("goodGitPractice is true", async () => {
      expect(
        (<SuccessfulBotAction>diffSizeResponse.action).goodGitPractice,
      ).toBe(true);
    });

    test("mrNote is good with hashtag", async () => {
      expect((<SuccessfulBotAction>diffSizeResponse.action).mrNote).toBe(
        `${DiffSize.goodNote} ${DiffSize.hashtag}`,
      );
    });

    test("totalDiffs value is equal to the threshold", async () => {
      expect(diffSizeResponse.computedValues["totalDiffs"]).toEqual(
        customConfigThresholdOne.threshold,
      );
    });
  });

  describe("(Open state) When totalDiffs are greater than threshold", (state = "open") => {
    let diffSizeResponse;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getSingleMRChanges.mockResolvedValue(changes_more_than_500);
      diffSizeResponse = await DiffSize.analyze(state, api, customConfig);
      done();
    });
    test("should return instance of SuccessfulBotAction", async () => {
      expect(diffSizeResponse.action).toBeInstanceOf(SuccessfulBotAction);
    });

    test("goodGitPractice is false", async () => {
      expect(
        (<SuccessfulBotAction>diffSizeResponse.action).goodGitPractice,
      ).toBe(false);
    });

    test("mrNote is bad with hashtag", async () => {
      expect((<SuccessfulBotAction>diffSizeResponse.action).mrNote).toBe(
        `${DiffSize.badNote} ${DiffSize.hashtag}`,
      );
    });

    test("totalDiffs value is greater than threshold", async () => {
      expect(diffSizeResponse.computedValues["totalDiffs"]).toBeGreaterThan(
        customConfig.threshold,
      );
    });
  });

  describe("(Open state) When totalDiffs === 0", (state = "open") => {
    let diffSizeResponse;

    beforeAll(async (done) => {
      jest.clearAllMocks();
      // @ts-ignore
      api.getSingleMRChanges.mockResolvedValue(changes_equal_zero);
      diffSizeResponse = await DiffSize.analyze(state, api, customConfig);
      done();
    });

    test("should return instance of SuccessfulBotAction", async () => {
      expect(diffSizeResponse.action).toBeInstanceOf(SuccessfulBotAction);
    });

    test("goodGitPractice is true", async () => {
      expect(
        (<SuccessfulBotAction>diffSizeResponse.action).goodGitPractice,
      ).toBe(true);
    });

    test("mrNote is zeroline with hashtag", async () => {
      expect((<SuccessfulBotAction>diffSizeResponse.action).mrNote).toBe(
        `${DiffSize.zeroNote} ${DiffSize.hashtag}`,
      );
    });

    test("totalDiffs value is 0", async () => {
      expect(diffSizeResponse.computedValues["totalDiffs"]).toBe(0);
    });
  });
});
