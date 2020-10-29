import { DiffSize } from "../../../src/bot_actions";

const changes_between_zero_and_500 = [
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
];

const changes_more_than_500 = [
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
];

const changes_equal_zero = [];

const multiple_files_changes_equal_1476 = [
  {
    old_path: ".eslintrc.js",
    new_path: ".eslintrc.js",
    a_mode: "100644",
    b_mode: "100644",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -17,7 +17,9 @@ module.exports = {\n       { properties: "never", ignoreImports: true },\n     ],\n     "@typescript-eslint/ban-ts-ignore": 1,\n-    complexity: 1,\n+    // first argument is the level of warning, 2 = error\n+    // second argument is level of cyclomatic complexity that will trigger error\n+    complexity: [2, 10],\n   },\n   extends: [\n     "plugin:@typescript-eslint/recommended",\n',
  },
  {
    old_path: ".gitignore",
    new_path: ".gitignore",
    a_mode: "100644",
    b_mode: "100644",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      "@@ -1,5 +1,6 @@\n node_modules\n dist\n+public\n coverage\n .DS_Store\n .env\n",
  },
  {
    old_path: ".gitlab-ci.yml",
    new_path: ".gitlab-ci.yml",
    a_mode: "100644",
    b_mode: "100644",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      "@@ -1,6 +1,7 @@\n stages:\n   - style\n   - compile\n+  - publish\n   - unit-test\n   - mock-api-test\n   - live-api-test\n@@ -64,6 +65,21 @@ style:\n     - openshift\n     - kubernetes\n \n+pages: # the job must be named pages\n+  image: fake.image.com:node\n+  stage: publish\n+  script:\n+    - npm install\n+    - npm run publish\n+  artifacts:\n+    paths:\n+      - public # artifact path must be /public for GitLab Pages to pick it up\n+  only:\n+    - develop\n+  tags:\n+    - kubernetes\n+    - openshift\n+\n unit-test:\n   image: fake.image.com:node\n   stage: unit-test\n",
  },
  {
    old_path: ".vscode/launch.json",
    new_path: ".vscode/launch.json",
    a_mode: "100644",
    b_mode: "100644",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -15,7 +15,7 @@\n                 "${workspaceRoot}/node_modules/.bin/jest", \n                 "--runInBand",\n                 "--verbose",\n-                "__tests__/component_builder_tests_with_mocks/handler.test.ts"\n+                "__tests__/component_builder_tests_with_mocks/commit_message.test.ts"\n             ],\n             "console": "integratedTerminal",\n             "internalConsoleOptions": "neverOpen",\n',
  },
  {
    old_path: "README.md",
    new_path: "README.md",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,52 +1,95 @@\n-# Readme\n+# GitRDoneBot for GitLab\n \n-See [GitRDoneBot Chronicles](http://fake.url.com) for information on development setup, architectural decision making history, and a wealth of other info.\n-See the [GitRDoneBot product page on Cigna Techmakers](http://fake.url.com) for a general overview of features, metrics, and how to add GRDBot to a project.\n+![GitRDoneBot Comment](media/logo.png)\n \n-## How do I contribute?\n+As an engineer learns by trial and error, does feedback always cement good habits? Can we guarantee feedback at key moments and ensure it is actionable, timely, and beneficial? It turns out, reinforcement learning is not just for machines. GitRDoneBot helps proliferate good git practice by providing real-time feedback via automated merge request comments using principles derived from publications.\n \n-The Tech Guides team would like to encourage anyone interested to contribute to this product! If there is some feature you would like to add, or a bug you find that you\'d like to fix, please fork the project and open a Merge Request when your code is ready. If you have any questions about contributing, or any other aspect of GitRDoneBot, please reach out to the team on the public [GitRDoneBot Mattermost channel](http://fake.url.com).\n+# Why GitRDoneBot?\n \n-## How do I use GRDBot in my projects?\n+Our story started with the question: What has been proven to improve code quality? Although many of us can draw from our own experiences, we turned to academia and the open-source community for tried and tested answers.\n \n-[Follow the steps to get started.](http://fake.url.com)\n+We were surprised to find that in the realm of Empirical Software Engineering there are not many knowns. [Hillel Wayne](https://www.hillelwayne.com/talks/what-we-know-we-dont-know/) puts it best when he says,\n \n-## What is a Bot Action?\n+> “Almost everything in software is a belief. It is something we have experience on. But is it not something where we have hard data. In most cases we just don’t know.”\n \n-A **Bot Action** is a logical unit of service that analyzes one specific Merge Request behavior. Unique Bot Action functions are grouped together as modules in `src/bot_actions`. Each Bot Action returns a self-contained response that includes information about API calls made, whether Good Git Practice is followed according to the rules set in that Action, and the comment that will be posted as a note on the MR.\n+While arguments for smaller functions and unit test coverage leave us with [mixed results](https://www.duo.uio.no/bitstream/handle/10852/51127/master.pdf), one thing that we know improves code is **code review**.\n+In [Best Kept Secrets of Peer Code Review](https://static1.smartbear.co/smartbear/media/pdfs/best-kept-secrets-of-peer-code-review_redirected.pdf), one study determined that code review would have saved half the cost of fixing the bugs - \\$152K - for a project, plus they would have found 162 additional bugs!\n+Improvements in code quality can also include:\n \n-The **Merge Request handler** (`merge_request_handler.ts`) invokes all of the Bot Actions and composes them into a single response which is logged in CloudWatch for observation & metrics gathering purposes. The Merge Request handler also uses the information contained in Bot Action responses to post a comment and emoji on the Merge Request.\n+1. Clearer communication about code content\n+2. Education of junior programmers\n+3. Shorter development cycles\n+4. Reduced impact on technical support\n+5. More maintainable code\n \n-The Merge Request handler is invoked in the main lambda handler (`handler.ts` in the root of the project) when the incoming event is a GitLab Merge Request event in `open`, `merge` or `update` states.\n+Increased **coverage, participation, and expertise** shared during a review are [significantly linked with improved software quality](https://link.springer.com/article/10.1007/s10664-015-9381-9#:~:text=Prior%20work%20has%20shown%20that,the%20quality%20of%20delivered%20software.&text=Hence%2C%20our%20results%20empirically%20confirm,systems%20using%20modern%20reviewing%20tools.). GitRDoneBot influences these 3 human factors of meaningful code review via real-time relevant comments like the one below. In doing so, GitRDoneBot helps software engineers of all experience levels understand, develop, and hone habits that will lead them to success.\n \n-This approach was adopted in an effort to keep the logic as loosely coupled as possible in order to make it easier to add new Bot Actions and improve testability of functional units.\n+![GitRDoneBot Comment](media/new_grdbot_comment.png "GitRDoneBot Automated Comment Example")\n+\n+# What meaningful code review habits does GitRDoneBot reinforce?\n+\n+### 1. Merge Requests Contain a Manageable Number of Changes: _1 - 500 Lines of Diff_\n+\n+This not only aids in keeping coverage high, but also the human brain can only process [500 lines of code (LOC) at one time](https://static1.smartbear.co/smartbear/media/pdfs/best-kept-secrets-of-peer-code-review_redirected.pdf) and most MRs for open source projects are [less than 20 lines long](www.gousios.gr/pub/exploration-pullreqs.pdf).\n+\n+### 2. Merge Requests Contain Short-Lived Branches: _1 - 14 days_\n+\n+The combination of trunk-based development with short-lived feature branches [accelerates code development, especially for asynchronous and large teams](trunkbaseddevelopment.com/short-lived-feature-branches).\n+\n+### 3. Merge Requests are Reviewed by Another Person: _Not self-assigned or self-merged_\n+\n+Not only would this negate code review in general, but the open-source community benefits from many eyes on code. Code should not be introduced to the main working branch without being [vetted by at least one other person](https://www.pitt.edu/~ckemerer/PSP_Data.pdf).\n+\n+### 4. Merge Requests are Distributed Across the Team: _1 - 10 Requests assigned to a single person_\n \n-## Bot Action Definitions\n+To remove bottlenecks, low quality reviews, increased context switching, and single-person dependencies, check to make sure that MR assignees don’t have too many other MRs on their plate.\n \n-### Diff Analysis\n+# Hosting Your Own Bot: How do I use GitRDoneBot for my team/organization?\n+\n+## Hosting Requirements\n+\n+As a serverless function written in TypeScript all GitRDoneBot needs to run is a serverless environment and a bot access token for the GitLab environment. To keep infrastructure options flexible, GitRDoneBot leverages the [Serverless Framework](https://www.npmjs.com/package/serverless) and provides a very basic `serverless.yml` file to get you started.\n+\n+That means you need:\n+\n+1. A Serverless, or FaaS (Function-as-a-Service), provider (e.g. AWS Lambda).\n+1. Ability to create a service account for GitLab and make an API access token.\n+1. Make the environment variables shown in the `.env` file below available to the serverless function at runtime.\n+1. A desire to improve code review practices!\n+\n+`.env`\n+\n+```\n+AWS_ENV="dev"\n+GITLAB_TOKEN="${service-account-api-token}"\n+GITLAB_TESTING_NAMESPACE="grdbot-functional-tests"\n+BASE_URI="${gitlab-api-uri}"\n+```\n \n-The **Diff Analysis** Bot Action analyzes the lines of diff contained in a single MR. The default threshold is 500 lines of diff, which is based on research showing the human brain can\'t really absorb more than 500 lines of text in great detail. This threshold is **configurable** If a MR exceeds this threshold, GRDBot will suggest that the developer who opened the MR should bring in a second set of eyes for code review, and try to keep MRs smaller in the future. If the MR does not exceed the threshold, GRDBot will thank the developer for following good practices.\n+### Supported GitLab Version\n \n-**Note:** At this time, Diff Analysis does not discriminate between types of files included in the absolute value of the diff. This means that things like test fixtures can inflate the diff significantly. We have no workaround for this at present, but the ability for teams to exclude things like test fixtures from Diff Analysis is something we would like to address in the future, if possible. There is an open issue for this problem [here](http://fake.url.com).\n+GitRDoneBot currently supports GitLab API Version 4. The latest GitLab version it is confirmed to work with is 11.9.12.\n \n-### Self-Merge Analysis\n+## GitRDoneBot Flow & Architecture Diagram\n \n-The **Self-Merge Analysis** Bot Action checks to see if a MR was self-assigned or self-approved. When a new MR is opened, Self-Merge Analysis checks to see if the MR author assigned the MR to themselves. When a MR is approved, this Action checks to see if the MR author approved their own MR.\n+GitRDoneBot is stateless. Instead of keeping a copy of data owned by GitLab it leverages the GitLab API when needed. For example, to determine if we need to leave a new comment or update one.\n \n-### Branch Age Analysis\n+![GitRDoneBot Comment](media/posterified-diagram.png "GitRDoneBot Flow and Architecture Diagram")\n \n-The **Branch Age Analysis** Bot Action analyzes the age of the oldest commit in a MR. The current default age threshold is 7 days, but this value is **configurable**. This Action checks to see if any commits in a MR are older than 7 days, and will provide positive feedback if the commits are below this threshold, while providing encouragement to merge more frequently if the oldest commit in a MR exceeds this threshold.\n+## End User Setup\n \n-### Too Many Merge Analysis\n+Once you have the serverless function deployed, individual project teams can opt into using the bot by following these 3 steps in the GitLab GUI:\n \n-The **Too Many Merge Analysis** Bot Action analyzes the id of the person the merge request is assigned to. It will check to see the total number of merge requests that person is assigned to across the project\'s namespace, and will comment on the Merge Request if that number exceeds the **configurable** threshold, which is set to a default of 3.\n+1. Add the GitRDoneBot GitLab user to the repo or group with Reporter access. **If your repo is public, you do not need to do this step**.\n+1. Under Settings -> Integrations, add a new webhook which points to the serverless function triggered on "Merge request events" from the Trigger list.\n+1. If desired, users can customize some bot behaviors by dropping a `.grdb.json` file in the root of the repository.\n \n-## Configuration File for custom GitRDoneBot Thresholds\n+### Want to customize GitRDoneBot\'s thresholds for your repo?\n \n-Want to customize GitRDoneBot\'s threshold for your repo? Simply follow these setps.\n+Simply follow these steps:\n \n-1. First, add a new file to the root of your repository on the master branch, named .grdb.json\n-2. Copy and paste the following json object into the .grdb.json file:\n+1. Add a new file to the root of your repository on the master branch named `.grdb.json`\n+2. Copy and paste the following JSON object into the `.grdb.json` file:\n \n ```\n {\n@@ -71,14 +114,56 @@ Want to customize GitRDoneBot\'s threshold for your repo? Simply follow these set\n    - Branch Age Analysis value must be between 1 and 14. **Default**: `7`\n    - Too Many Merge Requests Analysis value must be between 1 and 10. **Default**: `3`\n 4. `updateMergeRequestComment` **Default**: `true`\n-   - `true` allows GRDBot to update comments while a Merge Request is actively being worked on\n-   - `false` means GRDBot will only leave immutable comments when Merge Requests are first opened and finally merged.\n+   - `true` allows GitRDoneBot to update comments while a Merge Request is actively being worked on\n+   - `false` means GitRDoneBot will only leave immutable comments when Merge Requests are first opened and finally merged.\n 5. `constructiveFeedbackOnlyToggle` **Default**: `false`\n    - `true` will only leave constructive comments when values fall outside thresholds\n    - `false` will also leave congratulatory comments when criteria fall within threshold range.\n    - TL;DR: `true` reduces chattiness and the number of notifications developers will receive.\n-6. Non-existent or misspelled property names will be ignored and defaults will be used instead.\n-7. Custom thresholds outside of accepted ranges will be ignored and defaults will be used instead.\n-8. Once you have a valid .grdb.json file added to the master branch of your repository, GitRDoneBot will start using the thresholds you have set.\n \n-**FUTURE SCOPE:** GRDBot will notify you if your project\'s configuration file is invalid in some way.\n+> Note:\n+>\n+> - Non-existent or misspelled property names will be ignored and defaults will be used instead.\n+> - Custom thresholds outside of accepted ranges will be ignored and defaults will be used instead.\n+> - Once you have a valid `.grdb.json` file added to the master branch of your repository, GitRDoneBot will start using the thresholds you have set.\n+\n+# Contributing\n+\n+The bot creators would love to encourage anyone interested to contribute to this product! Issues and feature requests are appreciated. If there is some feature you would like to add, or a bug you find that you\'d like to fix, please fork the project and open a Pull Request when your code is ready. If you have any questions about contributing, or any other aspect of GitRDoneBot, please reach out to the team!\n+\n+## Code Overview\n+\n+**Please see our [code documentation](http://fake.url.com) for all the details.**\n+\n+The main components of the Bot are called **Bot Actions**. A Bot Action is a logical unit of service that analyzes one specific Merge Request behavior. Unique Bot Action functions are grouped together as modules in `src/bot_actions`. Each Bot Action returns a self-contained response that includes:\n+\n+1. Information about API calls made\n+1. If good git practice is followed according to the rules set in that Action\n+1. The comment that will be posted as a note on the Merge Request.\n+\n+The **Bot Actions Response** invokes all of the Bot Actions and composes them into a single response. This is what posts the comment and emoji on the Merge Request.\n+\n+The Bot Actions Response is built in the main lambda handler (`handler.ts` in the root of the project) when the incoming event is a GitLab Merge Request event in `open`, `merge` or `update` states. This handler is very specific to AWS lambda and will need to be changed to accommodate other serverless providers.\n+\n+This approach was adopted in an effort to keep the logic as loosely coupled as possible in order to make it easier to add new Bot Actions and improve testability of functional units.\n+\n+## Tests\n+GitRDoneBot leverages the [Jest Framework](https://jestjs.io/) for delightful TypeScript testing. It uses tests at multiple levels with different grandularity and dependencies to ensure quality:\n+1. `__tests__/unit_tests` for every component\n+2. `__tests__/component_builder_tests_with_mocks` to test at the bot action level, with no dependencies on GitLab\'s API\n+3. `__tests__/live_gitlab_api_tests` to test integration with the GitLab API and environment. These tests require projects and merge requests to exit in the specific GitLab instance and automation is built in to import everything necessary.\n+\n+Run tests:\n+- Using the commands `npm run test:unit`, `npm run test:mock`, `npm run test:live`, or `npm run test:full` from the `package.json` file\n+- Using VS Code Run and the `.vscode/launch.json` provided\n+- In your CI/CD pipeline using the templatized `.gitlab-ci.yml` provided\n+\n+## Static Code Analysis\n+\n+- [Prettier](https://prettier.io/) and a `.prettierrc` configuration file keep things...pretty! \n+- [ESLint](https://eslint.org/) performs static security analysis, prevents risky coding practices, and checks cyclomatic complexity.\n+\n+## Documentation\n+\n+- [TSDoc](https://github.com/microsoft/tsdoc) is the standard we use for doc comments in the TypeScript source files.\n+- [TypeDoc](https://typedoc.org/) generates documentation from the comments in the source code.\n\\ No newline at end of file\n',
  },
  {
    old_path: "__tests__/component_builder_tests_with_mocks/branch_age.test.ts",
    new_path: "__tests__/component_builder_tests_with_mocks/branch_age.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -7,14 +7,10 @@ import {\n   get_response_not_found_404,\n } from "../helpers";\n import { winlog } from "../../src/util";\n-import {\n-  BranchAge,\n-  BranchAgeNote,\n-  CommitWithTransformedDate,\n-  BotActionNote,\n-} from "../../src/bot_actions";\n+import { BranchAge, BotActionNote } from "../../src/bot_actions";\n import { BotActionConfig } from "../../src/custom_config/bot_action_config";\n import { BranchAgeDefaults } from "../../src/custom_config/action_config_defaults";\n+import { BranchAgeNote } from "../../src/bot_actions/branch_age/branch_age_note";\n \n // TEST FIXTURES\n const customConfig = BotActionConfig.from(BranchAgeDefaults, {});\n@@ -71,8 +67,7 @@ describe("Mock API Test: BranchAge Class", () => {\n       });\n \n       test("oldestCommit title is \'Oldest Commit\'", () => {\n-        const oldestCommit: CommitWithTransformedDate = branchAgeResponse.oldestCommit as CommitWithTransformedDate;\n-        expect(oldestCommit.title).toBe("Oldest commit");\n+        expect(branchAgeResponse.oldestCommit.title).toBe("Oldest commit");\n       });\n     });\n \n@@ -101,8 +96,7 @@ describe("Mock API Test: BranchAge Class", () => {\n       });\n \n       test("oldestCommit title is \'Oldest Commit\'", () => {\n-        const oldestCommit: CommitWithTransformedDate = branchAgeResponse.oldestCommit as CommitWithTransformedDate;\n-        expect(oldestCommit.title).toBe("Oldest commit");\n+        expect(branchAgeResponse.oldestCommit.title).toBe("Oldest commit");\n       });\n \n       test("goodGitPractice is true", () => {\n@@ -142,8 +136,8 @@ describe("Mock API Test: BranchAge Class", () => {\n         });\n       });\n \n-      test("oldestCommit is {}", () => {\n-        expect(branchAgeResponse.oldestCommit).toEqual({});\n+      test("oldestCommit is undefined", () => {\n+        expect(branchAgeResponse.oldestCommit).toEqual(undefined);\n       });\n \n       test("goodGitPractice is true", () => {\n',
  },
  {
    old_path:
      "__tests__/component_builder_tests_with_mocks/commit_message.test.ts",
    new_path:
      "__tests__/component_builder_tests_with_mocks/commit_message.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -2,7 +2,8 @@ import * as HttpStatus from "http-status-codes";\n import { GitLabGetResponse, MergeRequestApi } from "../../src/gitlab";\n import { mockGitLabCommit, createNGitLabCommits } from "../helpers";\n import { winlog } from "../../src/util";\n-import { CommitMessage, CommitMessageNote } from "../../src/bot_actions";\n+import { CommitMessages } from "../../src/bot_actions";\n+import { CommitMessagesNote } from "../../src/bot_actions/commit_messages/commit_message_note";\n \n // TEST FIXTURES\n const DYNAMIC_TOTAL_COMMITS = 20;\n@@ -12,7 +13,7 @@ const DYNAMIC_CALCULATED_THRESHOLD = Math.floor(DYNAMIC_TOTAL_COMMITS * 0.2);\n const DEFAULT_THRESHOLD = 2;\n \n const single_commit = GitLabGetResponse.from(HttpStatus.OK, [\n-  mockGitLabCommit("sample", Date.now().toString()),\n+  mockGitLabCommit("Sample", Date.now().toString()),\n ]);\n \n const less_than_dynamic_threshold_commits = GitLabGetResponse.from(\n@@ -30,19 +31,29 @@ const more_than_dynamic_threshold_commits = GitLabGetResponse.from(\n   createNGitLabCommits(DYNAMIC_TOTAL_COMMITS),\n );\n \n+const api_request_failure = GitLabGetResponse.from(\n+  HttpStatus.INTERNAL_SERVER_ERROR,\n+  undefined,\n+);\n+\n+const zero_commits = GitLabGetResponse.from(\n+  HttpStatus.OK,\n+  createNGitLabCommits(0),\n+);\n+\n jest.mock("../../src/gitlab/merge_request_api");\n \n-describe("Mock API Test: CommitMessage Class", () => {\n+describe("Mock API Test: CommitMessages Class", () => {\n   const api = new MergeRequestApi("fake-token", 0, 1, "fake-uri", winlog);\n \n   describe("open state", (state = "open") => {\n     describe("when there is a single commit", (constructiveFeedbackOnlyToggle = false) => {\n-      let commitMessageResponse: CommitMessage;\n+      let commitMessageResponse: CommitMessages;\n       beforeAll(async () => {\n         jest.clearAllMocks();\n         // @ts-ignore\n         api.getSingleMRCommits.mockResolvedValueOnce(single_commit);\n-        commitMessageResponse = await CommitMessage.from(\n+        commitMessageResponse = await CommitMessages.from(\n           state,\n           api,\n           constructiveFeedbackOnlyToggle,\n@@ -70,20 +81,20 @@ describe("Mock API Test: CommitMessage Class", () => {\n \n       test("mrNote is good with hashtag", () => {\n         expect(commitMessageResponse.mrNote).toBe(\n-          `${CommitMessageNote.good} ${CommitMessageNote.hashtag}`,\n+          `${CommitMessagesNote.good} ${CommitMessagesNote.hashtag}`,\n         );\n       });\n     });\n \n     describe("when total number of commits falls below dynamic calculation threshold", (constructiveFeedbackOnlyToggle = false) => {\n-      let commitMessageResponse: CommitMessage;\n+      let commitMessageResponse: CommitMessages;\n       beforeAll(async () => {\n         jest.clearAllMocks();\n         // @ts-ignore\n         api.getSingleMRCommits.mockResolvedValueOnce(\n           less_than_dynamic_threshold_commits,\n         );\n-        commitMessageResponse = await CommitMessage.from(\n+        commitMessageResponse = await CommitMessages.from(\n           state,\n           api,\n           constructiveFeedbackOnlyToggle,\n@@ -113,20 +124,20 @@ describe("Mock API Test: CommitMessage Class", () => {\n       // not checking full message here because of the complexity of this Bot Action\'s message\n       test("mrNote is bad with hashtag", async () => {\n         expect(commitMessageResponse.mrNote).toContain(\n-          `${CommitMessageNote.bad}`,\n+          `${CommitMessagesNote.bad}`,\n         );\n       });\n     });\n \n     describe("when total number of commits triggers dynamic calculation", (constructiveFeedbackOnlyToggle = false) => {\n-      let commitMessageResponse: CommitMessage;\n+      let commitMessageResponse: CommitMessages;\n       beforeAll(async () => {\n         jest.clearAllMocks();\n         // @ts-ignore\n         api.getSingleMRCommits.mockResolvedValueOnce(\n           more_than_dynamic_threshold_commits,\n         );\n-        commitMessageResponse = await CommitMessage.from(\n+        commitMessageResponse = await CommitMessages.from(\n           state,\n           api,\n           constructiveFeedbackOnlyToggle,\n@@ -156,7 +167,87 @@ describe("Mock API Test: CommitMessage Class", () => {\n       // not checking full message here because of the complexity of this Bot Action\'s message\n       test("mrNote is bad with hashtag", async () => {\n         expect(commitMessageResponse.mrNote).toContain(\n-          `${CommitMessageNote.bad}`,\n+          `${CommitMessagesNote.bad}`,\n+        );\n+      });\n+    });\n+\n+    describe("When the API request fails", (constructiveFeedbackOnlyToggle = false) => {\n+      let commitMessageResponse: CommitMessages;\n+      beforeAll(async () => {\n+        jest.clearAllMocks();\n+        // @ts-ignore\n+        api.getSingleMRCommits.mockResolvedValueOnce(api_request_failure);\n+        commitMessageResponse = await CommitMessages.from(\n+          state,\n+          api,\n+          constructiveFeedbackOnlyToggle,\n+          winlog,\n+        );\n+      });\n+\n+      test("apiRequest values reflect failed API call", () => {\n+        expect(commitMessageResponse.apiRequest.success).toBe(false);\n+        expect(commitMessageResponse.apiRequest.status).toEqual({\n+          code: HttpStatus.INTERNAL_SERVER_ERROR,\n+          message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),\n+        });\n+      });\n+\n+      test("calculated threshold is correctly left to be the default threshold", () => {\n+        expect(commitMessageResponse.calculatedThreshold).toBe(\n+          DEFAULT_THRESHOLD,\n+        );\n+      });\n+\n+      test("goodGitPractice is false", () => {\n+        expect(commitMessageResponse.goodGitPractice).toBe(undefined);\n+      });\n+\n+      // not checking full message here because of the complexity of this Bot Action\'s message\n+      test("mrNote is the check permissions message", async () => {\n+        expect(commitMessageResponse.mrNote).toEqual(\n+          CommitMessagesNote.checkPermissionsMessage,\n+        );\n+      });\n+    });\n+\n+    describe("When there are no commits", (constructiveFeedbackOnlyToggle = false) => {\n+      let commitMessageResponse: CommitMessages;\n+      beforeAll(async () => {\n+        jest.clearAllMocks();\n+        // @ts-ignore\n+        api.getSingleMRCommits.mockResolvedValueOnce(zero_commits);\n+        commitMessageResponse = await CommitMessages.from(\n+          state,\n+          api,\n+          constructiveFeedbackOnlyToggle,\n+          winlog,\n+        );\n+      });\n+\n+      test("apiRequest values reflect a successful API call", () => {\n+        expect(commitMessageResponse.apiRequest.success).toBe(true);\n+        expect(commitMessageResponse.apiRequest.status).toEqual({\n+          code: HttpStatus.OK,\n+          message: HttpStatus.getStatusText(HttpStatus.OK),\n+        });\n+      });\n+\n+      test("calculated threshold is correctly left to be the default threshold", () => {\n+        expect(commitMessageResponse.calculatedThreshold).toBe(\n+          DEFAULT_THRESHOLD,\n+        );\n+      });\n+\n+      test("goodGitPractice is undefined", () => {\n+        expect(commitMessageResponse.goodGitPractice).toBe(undefined);\n+      });\n+\n+      // not checking full message here because of the complexity of this Bot Action\'s message\n+      test("mrNote is good message", async () => {\n+        expect(commitMessageResponse.mrNote).toEqual(\n+          CommitMessagesNote.noActionMessage,\n         );\n       });\n     });\n',
  },
  {
    old_path: "__tests__/component_builder_tests_with_mocks/diff_size.test.ts",
    new_path: "__tests__/component_builder_tests_with_mocks/diff_size.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,13 +1,14 @@\n import * as HttpStatus from "http-status-codes";\n import { GitLabGetResponse, MergeRequestApi } from "../../src/gitlab";\n import { winlog } from "../../src/util";\n-import { DiffSize, BotActionNote, DiffSizeNote } from "../../src/bot_actions";\n+import { DiffSize, BotActionNote } from "../../src/bot_actions";\n import {\n   get_response_not_found_404,\n   get_response_fetch_network_error,\n } from "../helpers";\n import { BotActionConfig } from "../../src/custom_config/bot_action_config";\n import { DiffSizeDefaults } from "../../src/custom_config/action_config_defaults";\n+import { DiffSizeNote } from "../../src/bot_actions/diff_size/diff_size_note";\n \n // TEST FIXTURES\n \n',
  },
  {
    old_path:
      "__tests__/component_builder_tests_with_mocks/git_outta_here.test.ts",
    new_path:
      "__tests__/component_builder_tests_with_mocks/git_outta_here.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -4,12 +4,12 @@ import { winlog } from "../../src/util";\n import {\n   GitOuttaHere,\n   BotActionNote,\n-  GitOuttaHereNote,\n } from "../../src/bot_actions";\n import {\n   get_response_not_found_404,\n   get_response_fetch_network_error,\n } from "../helpers";\n+import { GitOuttaHereNote } from "../../src/bot_actions/git_outta_here/git_outta_here_note";\n \n // TEST FIXTURES\n const log_files_exist = GitLabGetResponse.from(HttpStatus.OK, {\n',
  },
  {
    old_path:
      "__tests__/component_builder_tests_with_mocks/one_word_commit.test.ts",
    new_path:
      "__tests__/component_builder_tests_with_mocks/one_word_commit.test.ts",
    a_mode: "100644",
    b_mode: "100644",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -6,13 +6,10 @@ import {\n   get_response_fetch_network_error,\n } from "../helpers";\n import { winlog } from "../../src/util";\n-import {\n-  OneWordCommit,\n-  BotActionNote,\n-  OneWordCommitNote,\n-} from "../../src/bot_actions";\n+import { OneWordCommit, BotActionNote } from "../../src/bot_actions";\n import { BotActionConfig } from "../../src/custom_config/bot_action_config";\n import { OneWordCommitDefaults } from "../../src/custom_config/action_config_defaults";\n+import { OneWordCommitNote } from "../../src/bot_actions/one_word_commits/one_word_commit_note";\n \n // TEST FIXTURES\n \n',
  },
  {
    old_path: "__tests__/component_builder_tests_with_mocks/self_merge.test.ts",
    new_path: "__tests__/component_builder_tests_with_mocks/self_merge.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -6,7 +6,8 @@ import {\n   get_response_fetch_network_error,\n } from "../helpers";\n import { winlog } from "../../src/util";\n-import { SelfMerge, SelfMergeNote, BotActionNote } from "../../src/bot_actions";\n+import { SelfMerge, BotActionNote } from "../../src/bot_actions";\n+import { SelfMergeNote } from "../../src/bot_actions/self_merge/self_merge_note";\n \n // TEST FIXTURES\n \n',
  },
  {
    old_path:
      "__tests__/component_builder_tests_with_mocks/too_many_assigned.test.ts",
    new_path:
      "__tests__/component_builder_tests_with_mocks/too_many_assigned.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -6,13 +6,10 @@ import {\n   get_response_fetch_network_error,\n } from "../helpers";\n import { winlog } from "../../src/util";\n-import {\n-  TooManyAssigned,\n-  BotActionNote,\n-  TooManyAssignedNote,\n-} from "../../src/bot_actions";\n+import { TooManyAssigned, BotActionNote } from "../../src/bot_actions";\n import { BotActionConfig } from "../../src/custom_config/bot_action_config";\n import { TooManyAssignedDefaults } from "../../src/custom_config/action_config_defaults";\n+import { TooManyAssignedNote } from "../../src/bot_actions/too_many_assigned/too_many_assigned_note";\n \n // TEST FIXTURES\n const customConfig = BotActionConfig.from(TooManyAssignedDefaults, {});\n',
  },
  {
    old_path: "__tests__/unit_tests/branch_age/branch_age_helpers.test.ts",
    new_path: "__tests__/unit_tests/branch_age/branch_age.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: true,
    deleted_file: false,
    diff:
      '@@ -1,28 +1,20 @@\n-import {\n-  CommitWithTransformedDate,\n-  getOldestCommit,\n-  isBranchYoungerThanThreshold,\n-} from "../../../src/bot_actions";\n import { BotActionConfig } from "../../../src/custom_config/bot_action_config";\n import { BranchAgeDefaults } from "../../../src/custom_config/action_config_defaults";\n+import { BranchAge } from "../../../src/bot_actions";\n+import { GitLabCommit } from "../../../src/interfaces";\n+import { mockGitLabCommit } from "../../helpers";\n \n const defaultConfig = BotActionConfig.from(BranchAgeDefaults, {});\n \n-const old_commits: Array<CommitWithTransformedDate> = [\n-  new CommitWithTransformedDate(\n-    "2nd Oldest commit",\n-    new Date("2012-09-20T11:50:22+03:00"),\n-  ),\n-  new CommitWithTransformedDate(\n-    "Oldest commit",\n-    new Date("2011-09-20T11:50:22+03:00"),\n-  ),\n-  new CommitWithTransformedDate("3rd Oldest commit", new Date()),\n+const old_commits: Array<GitLabCommit> = [\n+  mockGitLabCommit("2nd Oldest commit", "2012-09-20T11:50:22+03:00"),\n+  mockGitLabCommit("Oldest commit", "2011-09-20T11:50:22+03:00"),\n+  mockGitLabCommit("3rd Oldest commit", new Date().toString()),\n ];\n \n describe("getOldestCommit function", () => {\n   test("should return the oldest commit", () => {\n-    const oldestCommit: CommitWithTransformedDate = getOldestCommit(\n+    const oldestCommit: GitLabCommit = BranchAge["getOldestCommit"](\n       old_commits,\n     );\n     expect(oldestCommit.title).toBe("Oldest commit");\n@@ -32,8 +24,8 @@ describe("getOldestCommit function", () => {\n describe("isBranchYoungerThanThreshold function", () => {\n   test("should return true if commit is younger than threshold", () => {\n     expect(\n-      isBranchYoungerThanThreshold(\n-        new CommitWithTransformedDate("3rd Oldest commit", new Date()),\n+      BranchAge["isBranchYoungerThanThreshold"](\n+        { title: "3rd Oldest commit", created_at: new Date().toString() },\n         defaultConfig.threshold,\n       ),\n     ).toBe(true);\n@@ -41,11 +33,11 @@ describe("isBranchYoungerThanThreshold function", () => {\n \n   test("should return false if commit is older than threshold", () => {\n     expect(\n-      isBranchYoungerThanThreshold(\n-        new CommitWithTransformedDate(\n-          "Oldest commit",\n-          new Date("2011-09-20T11:50:22+03:00"),\n-        ),\n+      BranchAge["isBranchYoungerThanThreshold"](\n+        {\n+          title: "Oldest commit",\n+          created_at: "2011-09-20T11:50:22+03:00",\n+        },\n         defaultConfig.threshold,\n       ),\n     ).toBe(false);\n',
  },
  {
    old_path: "__tests__/unit_tests/branch_age/branch_age_note.test.ts",
    new_path: "__tests__/unit_tests/branch_age/branch_age_note.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,7 +1,7 @@\n-import { BranchAgeNote } from "../../../src/bot_actions";\n import { winlog } from "../../../src/util";\n import { BotActionConfig } from "../../../src/custom_config/bot_action_config";\n import { BranchAgeDefaults } from "../../../src/custom_config/action_config_defaults";\n+import { BranchAgeNote } from "../../../src/bot_actions/branch_age/branch_age_note";\n \n // default value for customConfig.constructiveFeedbackOnlyToggle is false\n const falseCustomConfig = BotActionConfig.from(BranchAgeDefaults, {});\n',
  },
  {
    old_path:
      "__tests__/unit_tests/commit_message/commit_message_helpers.test.ts",
    new_path:
      "__tests__/unit_tests/commit_message/commit_message_helpers.test.ts",
    a_mode: "100755",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      '@@ -1,147 +0,0 @@\n-import { GitLabCommit, ReducedCommitAnalysis } from "../../../src/interfaces";\n-import { mockGitLabCommit } from "../../helpers";\n-import { GitLabGetResponse } from "../../../src/gitlab";\n-import {\n-  testThreshold,\n-  allValuesTrue,\n-  analyzeCommits,\n-  calculateThreshold,\n-  assignCommitsBody,\n-  getNumberOfTotalCommits,\n-} from "../../../src/bot_actions";\n-\n-const analyzed_commits_response: GitLabCommit[] = [\n-  // This commit fails only semantic\n-  mockGitLabCommit("Add World", Date.now().toString()),\n-\n-  // This commit has an issue with length (and semantic)\n-  mockGitLabCommit(\n-    "Add World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World",\n-    Date.now().toString(),\n-  ),\n-\n-  // This commit has an issue with capitalization only\n-  mockGitLabCommit("fix: hello world", Date.now().toString()),\n-\n-  // This commit has an issue with punctuation only\n-  mockGitLabCommit("Fix: hello world?", Date.now().toString()),\n-\n-  // This commit has an issue with tense and semantic\n-  mockGitLabCommit("Fixed hello world", Date.now().toString()),\n-];\n-\n-const api_response_with_commits = GitLabGetResponse.from(200, [\n-  mockGitLabCommit("meow", Date.now().toString()),\n-  mockGitLabCommit("roar", Date.now().toString()),\n-  mockGitLabCommit("quack", Date.now().toString()),\n-]);\n-\n-const api_response_with_one_commit = GitLabGetResponse.from(200, [\n-  mockGitLabCommit("meow", Date.now().toString()),\n-]);\n-\n-const api_response_result_undefined = GitLabGetResponse.from(200, undefined);\n-\n-describe("testThreshold(grammarParam, threshold)", () => {\n-  test("should return true if number of false values in array is less than threshold", () => {\n-    expect(testThreshold([true, true, false], 2)).toBe(true);\n-  });\n-  test("should return false if number of false values in array exceeds threshold", () => {\n-    expect(testThreshold([true, true, false], 1)).toBe(false);\n-  });\n-});\n-\n-describe("allValuesTrue(boolArray)", () => {\n-  test("should return true when all values are true", () => {\n-    expect(allValuesTrue([true, true, true])).toBe(true);\n-  });\n-  test("should return false when at least one value is false", () => {\n-    expect(allValuesTrue([true, true, false])).toBe(false);\n-  });\n-});\n-\n-describe("analyzeCommits(commits)", () => {\n-  test("should return an object of type ReducedCommitAnalysis", () => {\n-    const analyzedCommitMessages: ReducedCommitAnalysis = analyzeCommits(\n-      analyzed_commits_response,\n-    );\n-\n-    expect(JSON.stringify(analyzedCommitMessages)).toMatch(\n-      JSON.stringify({\n-        length: [true, false, true, true, true],\n-        semantic: [false, false, true, true, false],\n-        capitalization: [true, true, false, true, true],\n-        punctuation: [true, true, true, false, true],\n-        tense: [true, true, true, true, false],\n-      }),\n-    );\n-  });\n-});\n-\n-describe("calculateThreshold(totalCommits)", () => {\n-  describe("totalCommits === 5", (totalCommits = 5) => {\n-    test("RETURNS NUMBER: 2", () => {\n-      expect(calculateThreshold(totalCommits)).toBe(2);\n-    });\n-  });\n-\n-  describe("totalCommits === 10", (totalCommits = 10) => {\n-    test("RETURNS NUMBER: 2", () => {\n-      expect(calculateThreshold(totalCommits)).toBe(2);\n-    });\n-  });\n-\n-  describe("totalCommits === 15", (totalCommits = 15) => {\n-    test("RETURNS NUMBER: 3", () => {\n-      expect(calculateThreshold(totalCommits)).toBe(3);\n-    });\n-  });\n-\n-  describe("totalCommits === 20", (totalCommits = 20) => {\n-    test("RETURNS NUMBER: 4", () => {\n-      expect(calculateThreshold(totalCommits)).toBe(4);\n-    });\n-  });\n-});\n-\n-describe("assignCommitsBody(totalCommits, apiResponse)", (apiResponse = api_response_with_commits) => {\n-  describe("totalCommits > 0", (totalCommits = 1) => {\n-    test("RETURNS ARRAY: apiResponse.result", () => {\n-      expect(assignCommitsBody(totalCommits, apiResponse)).toEqual(\n-        expect.arrayContaining(apiResponse.result),\n-      );\n-    });\n-  });\n-\n-  describe("totalCommits === 0", (totalCommits = 0) => {\n-    test("RETURNS ARRAY: empty", () => {\n-      expect(assignCommitsBody(totalCommits, apiResponse)).toEqual([]);\n-    });\n-  });\n-});\n-\n-describe("getNumberOfTotalCommits(apiResponse)", () => {\n-  describe("apiResponse === undefined", (apiResponse = undefined) => {\n-    test("RETURNS NUMBER: -1", () => {\n-      expect(getNumberOfTotalCommits(apiResponse)).toBe(-1);\n-    });\n-  });\n-\n-  describe("apiResponse.result === undefined", (apiResponse = api_response_result_undefined) => {\n-    test("RETURNS NUMBER: -1", () => {\n-      expect(getNumberOfTotalCommits(apiResponse)).toBe(-1);\n-    });\n-  });\n-\n-  describe("apiResponse.result contains 1 object", (apiResponse = api_response_with_one_commit) => {\n-    test("RETURNS NUMBER: 1", () => {\n-      expect(getNumberOfTotalCommits(apiResponse)).toBe(1);\n-    });\n-  });\n-\n-  describe("apiResponse.result contains 3 objects", (apiResponse = api_response_with_commits) => {\n-    test("RETURNS NUMBER: 3", () => {\n-      expect(getNumberOfTotalCommits(apiResponse)).toBe(3);\n-    });\n-  });\n-});\n',
  },
  {
    old_path: "__tests__/unit_tests/commit_message/commit_message_note.test.ts",
    new_path:
      "__tests__/unit_tests/commit_messages/commit_message_note.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: true,
    deleted_file: false,
    diff: "",
  },
  {
    old_path: "__tests__/unit_tests/commit_messages/commit_messages.test.ts",
    new_path: "__tests__/unit_tests/commit_messages/commit_messages.test.ts",
    a_mode: "0",
    b_mode: "100644",
    new_file: true,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -0,0 +1,74 @@\n+import { CommitMessages } from "../../../src/bot_actions/commit_messages/commit_messages";\n+\n+function XsOfLength(num: number): string {\n+  let str = "";\n+  for (let i = 0; i < num; i++) {\n+    str += "X";\n+  }\n+  return str;\n+}\n+\n+describe("CommitMessages.lengthValid function", () => {\n+  test("returns false when string length is less than 4 characters", () => {\n+    expect(CommitMessages["lengthValid"]("a aa")).toBe(false);\n+  });\n+  test("returns true when string length equals 4 characters", () => {\n+    expect(CommitMessages["lengthValid"]("a123")).toBe(true);\n+  });\n+  describe("when string length is greater than 4 and less than 50 characters", () => {\n+    test("returns true for 5 characters", () => {\n+      expect(CommitMessages["lengthValid"]("a1234")).toBe(true);\n+    });\n+    test("returns true for 49 characters", () => {\n+      expect(CommitMessages["lengthValid"](XsOfLength(49))).toBe(true);\n+    });\n+  });\n+\n+  test("returns true when string length is equal to 50 characters", () => {\n+    expect(CommitMessages["lengthValid"](XsOfLength(50))).toBe(true);\n+  });\n+\n+  test("returns false when string length is greater than 50 characters", () => {\n+    expect(CommitMessages["lengthValid"](XsOfLength(51))).toBe(false);\n+  });\n+});\n+\n+describe("CommitMessages.testThreshold function", () => {\n+  test("should return true if number of false values in array is less than threshold", () => {\n+    expect(CommitMessages["testThreshold"]([true, true, false], 2)).toBe(true);\n+  });\n+  test("should return false if number of false values in array equals threshold", () => {\n+    expect(CommitMessages["testThreshold"]([true, true, false], 1)).toBe(false);\n+  });\n+  test("should return false if number of false values in array exceeds threshold", () => {\n+    expect(CommitMessages["testThreshold"]([true, false, false], 1)).toBe(\n+      false,\n+    );\n+  });\n+});\n+\n+describe("CommitMessages.calculateThreshold", () => {\n+  describe("totalCommits === 5", (totalCommits = 5) => {\n+    test("RETURNS NUMBER: 2", () => {\n+      expect(CommitMessages["calculateThreshold"](totalCommits)).toBe(2);\n+    });\n+  });\n+\n+  describe("totalCommits === 10", (totalCommits = 10) => {\n+    test("RETURNS NUMBER: 2", () => {\n+      expect(CommitMessages["calculateThreshold"](totalCommits)).toBe(2);\n+    });\n+  });\n+\n+  describe("totalCommits === 15", (totalCommits = 15) => {\n+    test("RETURNS NUMBER: 3", () => {\n+      expect(CommitMessages["calculateThreshold"](totalCommits)).toBe(3);\n+    });\n+  });\n+\n+  describe("totalCommits === 20", (totalCommits = 20) => {\n+    test("RETURNS NUMBER: 4", () => {\n+      expect(CommitMessages["calculateThreshold"](totalCommits)).toBe(4);\n+    });\n+  });\n+});\n',
  },
  {
    old_path: "__tests__/unit_tests/diff_size/diff_size_helpers.test.ts",
    new_path: "__tests__/unit_tests/diff_size/diff_size.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: true,
    deleted_file: false,
    diff:
      '@@ -1,4 +1,4 @@\n-import { calculateDiffs } from "../../../src/bot_actions";\n+import { DiffSize } from "../../../src/bot_actions";\n \n const changes_between_zero_and_500 = [\n   {\n@@ -32,14 +32,18 @@ const changes_equal_zero = [];\n \n describe("calculateDiffs function", () => {\n   test("should return a total diffs value of less than 500", () => {\n-    expect(calculateDiffs(changes_between_zero_and_500)).toBeLessThan(500);\n+    expect(\n+      DiffSize["calculateDiffs"](changes_between_zero_and_500),\n+    ).toBeLessThan(500);\n   });\n \n   test("should return a total diffs value of greater than 500", () => {\n-    expect(calculateDiffs(changes_more_than_500)).toBeGreaterThan(500);\n+    expect(DiffSize["calculateDiffs"](changes_more_than_500)).toBeGreaterThan(\n+      500,\n+    );\n   });\n \n   test("should return a total diffs value of exactly 0", () => {\n-    expect(calculateDiffs(changes_equal_zero)).toEqual(0);\n+    expect(DiffSize["calculateDiffs"](changes_equal_zero)).toEqual(0);\n   });\n });\n',
  },
  {
    old_path: "__tests__/unit_tests/diff_size/diff_size_note.test.ts",
    new_path: "__tests__/unit_tests/diff_size/diff_size_note.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,7 +1,7 @@\n-import { DiffSizeNote } from "../../../src/bot_actions";\n import { winlog } from "../../../src/util";\n import { BotActionConfig } from "../../../src/custom_config/bot_action_config";\n import { DiffSizeDefaults } from "../../../src/custom_config/action_config_defaults";\n+import { DiffSizeNote } from "../../../src/bot_actions/diff_size/diff_size_note";\n \n // default value for customConfig.constructiveFeedbackOnlyToggle is false\n const falseCustomConfig = BotActionConfig.from(DiffSizeDefaults, {});\n',
  },
  {
    old_path:
      "__tests__/unit_tests/git_outta_here/git_outta_here_helpers.test.ts",
    new_path: "__tests__/unit_tests/git_outta_here/git_outta_here.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: true,
    deleted_file: false,
    diff:
      '@@ -1,4 +1,4 @@\n-import { noLogFiles } from "../../../src/bot_actions";\n+import { GitOuttaHere } from "../../../src/bot_actions";\n \n const deleted_log_files = [\n   {\n@@ -57,15 +57,15 @@ const changes_equal_zero = [];\n \n describe("noLogFiles function", () => {\n   test("should return false when log files EXIST", () => {\n-    expect(noLogFiles(log_files_exist)).toBe(false);\n+    expect(GitOuttaHere["noLogFiles"](log_files_exist)).toBe(false);\n   });\n   test("should return true when log files DO NOT exist", () => {\n-    expect(noLogFiles(no_log_files)).toBe(true);\n+    expect(GitOuttaHere["noLogFiles"](no_log_files)).toBe(true);\n   });\n   test("should return true when log files have been DELETED", () => {\n-    expect(noLogFiles(deleted_log_files)).toBe(true);\n+    expect(GitOuttaHere["noLogFiles"](deleted_log_files)).toBe(true);\n   });\n   test("should return true when there are 0 changes", () => {\n-    expect(noLogFiles(changes_equal_zero)).toBe(true);\n+    expect(GitOuttaHere["noLogFiles"](changes_equal_zero)).toBe(true);\n   });\n });\n',
  },
  {
    old_path: "__tests__/unit_tests/git_outta_here/git_outta_here_note.test.ts",
    new_path: "__tests__/unit_tests/git_outta_here/git_outta_here_note.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,5 +1,5 @@\n-import { GitOuttaHereNote } from "../../../src/bot_actions";\n import { winlog } from "../../../src/util";\n+import { GitOuttaHereNote } from "../../../src/bot_actions/git_outta_here/git_outta_here_note";\n \n describe("GitOuttaHereNote.caseForBadMessage(goodGitPractice)", () => {\n   describe("goodGitPractice === true", (goodGitPractice = true) => {\n',
  },
  {
    old_path: "__tests__/unit_tests/new_git_who_dis/new_git_who_dis.test.ts",
    new_path: "__tests__/unit_tests/new_git_who_dis/new_git_who_dis.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,9 +1,6 @@\n-import {\n-  NewGitWhoDis,\n-  BotActionNote,\n-  NewGitWhoDisNote,\n-} from "../../../src/bot_actions";\n+import { NewGitWhoDis, BotActionNote } from "../../../src/bot_actions";\n import { winlog } from "../../../src/util";\n+import { NewGitWhoDisNote } from "../../../src/bot_actions/new_git_who_dis/new_git_who_dis_note";\n \n describe("New Git Who Dis Action: (Any state) authorName !== LAN ID", () => {\n   const authorName: string = "Eleanor Shellstrop";\n@@ -37,3 +34,21 @@ describe("New Git Who Dis Action: (Any state) authorName === LAN ID", () => {\n     );\n   });\n });\n+\n+describe("authorNameIsNotLanId function", () => {\n+  test("Should return true when authorName is not LAN ID", () => {\n+    expect(NewGitWhoDis["authorNameIsNotLanId"]("Test Author")).toEqual(true);\n+  });\n+  test("Should return true when authorName is not LAN ID & contains special chars", () => {\n+    expect(NewGitWhoDis["authorNameIsNotLanId"]("Martin 42!")).toEqual(true);\n+  });\n+  test("Should return true when authorName is blank", () => {\n+    expect(NewGitWhoDis["authorNameIsNotLanId"](" ")).toEqual(true);\n+  });\n+  test("Should return false when authorName is LAN ID", () => {\n+    expect(NewGitWhoDis["authorNameIsNotLanId"]("c12345")).toEqual(false);\n+  });\n+  test("Should return false when authorName is LAN ID", () => {\n+    expect(NewGitWhoDis["authorNameIsNotLanId"]("C12345")).toEqual(false);\n+  });\n+});\n',
  },
  {
    old_path:
      "__tests__/unit_tests/new_git_who_dis/new_git_who_dis_helpers.test.ts",
    new_path:
      "__tests__/unit_tests/new_git_who_dis/new_git_who_dis_helpers.test.ts",
    a_mode: "100755",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      '@@ -1,19 +0,0 @@\n-import { authorNameIsNotLanId } from "../../../src/bot_actions";\n-\n-describe("authorNameIsNotLanId function", () => {\n-  test("Should return true when authorName is not LAN ID", () => {\n-    expect(authorNameIsNotLanId("Test Author")).toEqual(true);\n-  });\n-  test("Should return true when authorName is not LAN ID & contains special chars", () => {\n-    expect(authorNameIsNotLanId("Martin 42!")).toEqual(true);\n-  });\n-  test("Should return true when authorName is blank", () => {\n-    expect(authorNameIsNotLanId(" ")).toEqual(true);\n-  });\n-  test("Should return false when authorName is LAN ID", () => {\n-    expect(authorNameIsNotLanId("c12345")).toEqual(false);\n-  });\n-  test("Should return false when authorName is LAN ID", () => {\n-    expect(authorNameIsNotLanId("C12345")).toEqual(false);\n-  });\n-});\n',
  },
  {
    old_path:
      "__tests__/unit_tests/new_git_who_dis/new_git_who_dis_note.test.ts",
    new_path:
      "__tests__/unit_tests/new_git_who_dis/new_git_who_dis_note.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,5 +1,5 @@\n-import { NewGitWhoDisNote } from "../../../src/bot_actions";\n import { winlog } from "../../../src/util";\n+import { NewGitWhoDisNote } from "../../../src/bot_actions/new_git_who_dis/new_git_who_dis_note";\n \n describe("NewGitWhoDisNote.caseForBadMessage(goodGitPractice)", () => {\n   describe("goodGitPractice === true", (goodGitPractice = true) => {\n',
  },
  {
    old_path:
      "__tests__/unit_tests/one_word_commit/one_word_commit_helpers.test.ts",
    new_path: "__tests__/unit_tests/one_word_commit/one_word_commit.test.ts",
    a_mode: "100644",
    b_mode: "100644",
    new_file: false,
    renamed_file: true,
    deleted_file: false,
    diff:
      '@@ -1,6 +1,6 @@\n import { GitLabCommit } from "../../../src/interfaces";\n import { mockGitLabCommit } from "../../helpers";\n-import { countOneWordCommits, isOneWord } from "../../../src/bot_actions";\n+import { OneWordCommit } from "../../../src/bot_actions";\n \n const three_one_word_commits: Array<GitLabCommit> = [\n   mockGitLabCommit("add", Date.now().toString()),\n@@ -26,62 +26,33 @@ const zero_one_word_commits: Array<GitLabCommit> = [\n \n describe("#countOneWordCommits", () => {\n   test("countOneWordCommits: Several OWCs", () => {\n-    expect(countOneWordCommits(three_one_word_commits)).toBe(3);\n+    expect(OneWordCommit["countOneWordCommits"](three_one_word_commits)).toBe(3);\n   });\n   test("countOneWordCommits: Zero OWCs", () => {\n-    expect(countOneWordCommits(zero_one_word_commits)).toBe(0);\n+    expect(OneWordCommit["countOneWordCommits"](zero_one_word_commits)).toBe(0);\n   });\n   test("countOneWordCommits: No Commits to begin with", () => {\n-    expect(countOneWordCommits([])).toBe(0);\n+    expect(OneWordCommit["countOneWordCommits"]([])).toBe(0);\n   });\n });\n \n describe("#isOneWord", () => {\n   test("default case", () => {\n-    expect(isOneWord("one")).toBe(true);\n-    expect(isOneWord("one two")).toBe(false);\n+    expect(OneWordCommit["isOneWord"]("one")).toBe(true);\n+    expect(OneWordCommit["isOneWord"]("hello ")).toBe(true);\n+    expect(OneWordCommit["isOneWord"]("one two")).toBe(false);\n+    expect(OneWordCommit["isOneWord"]("1 two 3")).toBe(false);\n   });\n   test("non-standard spacing/punctuation", () => {\n-    expect(isOneWord("  one  ")).toBe(true);\n-    expect(isOneWord("one-two")).toBe(true);\n-    expect(isOneWord(" one-      2")).toBe(false);\n-  });\n-  test("empty spaces", () => {\n-    expect(isOneWord("::")).toBe(true);\n-    expect(isOneWord(": :")).toBe(true);\n-    expect(isOneWord(": : a")).toBe(false);\n-    expect(isOneWord(": : ")).toBe(false);\n-    expect(isOneWord("a: : ")).toBe(false);\n-    expect(isOneWord("a(): : ")).toBe(false);\n-  });\n-  describe("semantic commit style", () => {\n-    test("normal case", () => {\n-      expect(isOneWord("add: something")).toBe(true);\n-      expect(isOneWord("add: something somewhere")).toBe(false);\n-    });\n-    test("non-standard spacing/punctuation", () => {\n-      expect(isOneWord(" add : something ")).toBe(true);\n-      expect(isOneWord(" add : something-somewhere ")).toBe(true);\n-      expect(isOneWord(" add : something somewhere ")).toBe(false);\n-    });\n-    test("missing a word to the left", () => {\n-      expect(isOneWord(": something")).toBe(true);\n-      expect(isOneWord(": something somewhere")).toBe(false);\n-    });\n-    test("many words to the left", () => {\n-      expect(isOneWord("add feat bug: something")).toBe(true);\n-      expect(isOneWord("add bug new feature: something somewhere")).toBe(false);\n-    });\n-    test("multiple colons means this is not semantic", () => {\n-      expect(isOneWord("add: npm:script")).toBe(true);\n-      expect(isOneWord("add: npm: script")).toBe(false);\n-      expect(isOneWord("adding 4 & 5: feat: bug fix: 1 2 3")).toBe(false);\n-      expect(isOneWord("adding 4 & 5: 1 2: bug fix: 1 2 3")).toBe(false);\n-    });\n-    test("scope has no impact", () => {\n-      expect(isOneWord("add feat bug (something): something")).toBe(true);\n-      expect(isOneWord(" add (why?): something ")).toBe(true);\n-      expect(isOneWord(" add (why?): something somewhere")).toBe(false);\n-    });\n+    expect(OneWordCommit["isOneWord"]("  one  ")).toBe(true);\n+    expect(OneWordCommit["isOneWord"]("one-two")).toBe(true);\n+    expect(OneWordCommit["isOneWord"](" one-      2")).toBe(false);\n+\n+    expect(OneWordCommit["isOneWord"]("::")).toBe(true);\n+    expect(OneWordCommit["isOneWord"](": :")).toBe(false);\n+    expect(OneWordCommit["isOneWord"](": : a")).toBe(false);\n+    expect(OneWordCommit["isOneWord"](": : ")).toBe(false);\n+    expect(OneWordCommit["isOneWord"]("a: : ")).toBe(false);\n+    expect(OneWordCommit["isOneWord"]("a(): : ")).toBe(false);\n   });\n });\n',
  },
  {
    old_path:
      "__tests__/unit_tests/one_word_commit/one_word_commit_note.test.ts",
    new_path:
      "__tests__/unit_tests/one_word_commit/one_word_commit_note.test.ts",
    a_mode: "100644",
    b_mode: "100644",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,5 +1,5 @@\n-import { OneWordCommitNote } from "../../../src/bot_actions";\n import { winlog } from "../../../src/util";\n+import { OneWordCommitNote } from "../../../src/bot_actions/one_word_commits/one_word_commit_note";\n \n describe("OneWordCommitNote.caseForBadMessage(goodGitPractice)", () => {\n   describe("goodGitPractice === true", (goodGitPractice = true) => {\n',
  },
  {
    old_path: "__tests__/unit_tests/self_merge/self_merge_helpers.test.ts",
    new_path: "__tests__/unit_tests/self_merge/self_merge.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: true,
    deleted_file: false,
    diff:
      '@@ -1,8 +1,5 @@\n import { mockUser } from "../../helpers";\n-import {\n-  mrIsNotSelfAssignedOrMerged,\n-  mrIsNotSelfApproved,\n-} from "../../../src/bot_actions";\n+import { SelfMerge } from "../../../src/bot_actions";\n \n const AUTHOR_ID = 1;\n const ASSIGNEE_ID = 2;\n@@ -16,26 +13,39 @@ const approved_by_multiple_approvers = [\n \n describe("mrIsNotSelfAssignedOrMerged function", () => {\n   test("Should return true when MR is not self-assigned or self-merged", () => {\n-    expect(mrIsNotSelfAssignedOrMerged(ASSIGNEE_ID, AUTHOR_ID)).toEqual(true);\n+    expect(\n+      SelfMerge["mrIsNotSelfAssignedOrMerged"](ASSIGNEE_ID, AUTHOR_ID),\n+    ).toEqual(true);\n   });\n   test("Should return true when assigneeId or mergedBy is null", () => {\n-    expect(mrIsNotSelfAssignedOrMerged(null, AUTHOR_ID)).toEqual(true);\n+    expect(SelfMerge["mrIsNotSelfAssignedOrMerged"](null, AUTHOR_ID)).toEqual(\n+      true,\n+    );\n   });\n   test("Should return false when MR is self-assigned or self-merged", () => {\n-    expect(mrIsNotSelfAssignedOrMerged(AUTHOR_ID, AUTHOR_ID)).toEqual(false);\n+    expect(\n+      SelfMerge["mrIsNotSelfAssignedOrMerged"](AUTHOR_ID, AUTHOR_ID),\n+    ).toEqual(false);\n   });\n });\n \n describe("mrIsNotSelfApproved function", () => {\n   test("Should return true when MR is not self-approved", () => {\n-    expect(mrIsNotSelfApproved(approved_by_assignee, AUTHOR_ID)).toEqual(true);\n+    expect(\n+      SelfMerge["mrIsNotSelfApproved"](approved_by_assignee, AUTHOR_ID),\n+    ).toEqual(true);\n   });\n   test("Should return true when there are more than 1 approvers and MR author is one of them", () => {\n     expect(\n-      mrIsNotSelfApproved(approved_by_multiple_approvers, AUTHOR_ID),\n+      SelfMerge["mrIsNotSelfApproved"](\n+        approved_by_multiple_approvers,\n+        AUTHOR_ID,\n+      ),\n     ).toEqual(true);\n   });\n   test("Should return false when MR has only one approver and it is MR author", () => {\n-    expect(mrIsNotSelfApproved(approved_by_author, AUTHOR_ID)).toEqual(false);\n+    expect(\n+      SelfMerge["mrIsNotSelfApproved"](approved_by_author, AUTHOR_ID),\n+    ).toEqual(false);\n   });\n });\n',
  },
  {
    old_path: "__tests__/unit_tests/self_merge/self_merge_note.test.ts",
    new_path: "__tests__/unit_tests/self_merge/self_merge_note.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,5 +1,5 @@\n-import { SelfMergeNote } from "../../../src/bot_actions";\n import { winlog } from "../../../src/util";\n+import { SelfMergeNote } from "../../../src/bot_actions/self_merge/self_merge_note";\n \n describe("SelfMergeNote.caseForGoodMessage(state, goodGitPractice)", () => {\n   describe("\'open\' state", (state = "open") => {\n',
  },
  {
    old_path:
      "__tests__/unit_tests/too_many_assigned/too_many_assigned_note.test.ts",
    new_path:
      "__tests__/unit_tests/too_many_assigned/too_many_assigned_note.test.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,5 +1,5 @@\n-import { TooManyAssignedNote } from "../../../src/bot_actions";\n import { winlog } from "../../../src/util";\n+import { TooManyAssignedNote } from "../../../src/bot_actions/too_many_assigned/too_many_assigned_note";\n \n describe("TooManyAssignedNote.fromMessage(message)", () => {\n   describe("any message string", (message = "Helpful reminder from your friendly neighborhood GitRDoneBot.") => {\n',
  },
  {
    old_path: "media/logo.png",
    new_path: "media/logo.png",
    a_mode: "0",
    b_mode: "100644",
    new_file: true,
    renamed_file: false,
    deleted_file: false,
    diff: "Binary files /dev/null and b/media/logo.png differ\n",
  },
  {
    old_path: "media/new_grdbot_comment.png",
    new_path: "media/new_grdbot_comment.png",
    a_mode: "0",
    b_mode: "100644",
    new_file: true,
    renamed_file: false,
    deleted_file: false,
    diff: "Binary files /dev/null and b/media/new_grdbot_comment.png differ\n",
  },
  {
    old_path: "media/posterified-diagram.png",
    new_path: "media/posterified-diagram.png",
    a_mode: "0",
    b_mode: "100644",
    new_file: true,
    renamed_file: false,
    deleted_file: false,
    diff: "Binary files /dev/null and b/media/posterified-diagram.png differ\n",
  },
  {
    old_path: "package.json",
    new_path: "package.json",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -13,6 +13,7 @@\n     "lambda": "AWS_ENV=dev serverless offline start",\n     "prettier": "npx prettier --list-different \\"**/*.ts\\"",\n     "prettier:fix": "npx prettier --list-different \\"**/*.ts\\" --write",\n+    "publish": "typedoc --mode file --name GitRDoneBot --out public src --media media",\n     "artifactory:setup": "npm set strict-ssl false && npm config set @cigna:registry https://http://fake.url.com/ && echo \'Registry set below: \' && npm get registry"\n   },\n   "keywords": [\n@@ -41,6 +42,7 @@\n     "serverless-plugin-typescript": "^1.1.9",\n     "supertest": "^4.0.2",\n     "ts-jest": "^25.3.0",\n+    "typedoc": "^0.17.7",\n     "typescript": "^3.7.3"\n   },\n   "dependencies": {\n',
  },
  {
    old_path: "src/bot_actions/branch_age/branch_age.ts",
    new_path: "src/bot_actions/branch_age/branch_age.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,31 +1,26 @@\n import { BotAction } from "../bot_action";\n import * as winston from "winston";\n-import {\n-  commitTransformer,\n-  CommitWithTransformedDate,\n-  getOldestCommit,\n-  isBranchYoungerThanThreshold,\n-} from "./branch_age_helpers";\n import {\n   GitLabAPIRequest,\n   MergeRequestApi,\n   GitLabGetResponse,\n } from "../../gitlab";\n-import { BranchAgeNote } from ".";\n import { BotActionConfig } from "../../custom_config/bot_action_config";\n+import { BranchAgeNote } from "./branch_age_note";\n+import { GitLabCommit } from "../../interfaces";\n \n /**\n  * This class extends the `BotAction` class by analyzing the age of the commits contained in the GitLab Merge Request.\n  * In addition to the standard `BotAction` properties, each instance\n  * of this class also contains the property:\n- * 1. `oldestCommit`: `CommitWithTransformedDate` commit with the oldest createdAtDate contained in the Merge Request\n+ * 1. `oldestCommit`: `GitLabCommit` with the oldest created_at date contained in the Merge Request\n  */\n export class BranchAge extends BotAction {\n   private constructor(\n     apiRequest: GitLabAPIRequest,\n     goodGitPractice: boolean,\n     mrNote: string,\n-    readonly oldestCommit: CommitWithTransformedDate | {},\n+    readonly oldestCommit: GitLabCommit,\n   ) {\n     super(apiRequest, goodGitPractice, mrNote);\n   }\n@@ -49,28 +44,20 @@ export class BranchAge extends BotAction {\n     logger: winston.Logger,\n   ): Promise<BranchAge> {\n     let goodGitPractice!: boolean;\n-    let oldestCommit!: CommitWithTransformedDate | {};\n+    let oldestCommit!: GitLabCommit;\n \n     const apiResponse: GitLabGetResponse = await api.getSingleMRCommits();\n \n     if (apiResponse.apiRequest.success) {\n-      oldestCommit = {};\n       if (apiResponse.result.length === 0) {\n         // When result array is empty, we are assuming there are no commits on this branch (ie, opened from an Issue).\n         goodGitPractice = true;\n       } else {\n-        const transformedCommits: Array<CommitWithTransformedDate> = commitTransformer(\n-          apiResponse.result,\n+        oldestCommit = this.getOldestCommit(apiResponse.result);\n+        goodGitPractice = this.isBranchYoungerThanThreshold(\n+          oldestCommit,\n+          customConfig.threshold,\n         );\n-        if (transformedCommits.length) {\n-          oldestCommit = getOldestCommit(transformedCommits);\n-          if (oldestCommit instanceof CommitWithTransformedDate) {\n-            goodGitPractice = isBranchYoungerThanThreshold(\n-              oldestCommit,\n-              customConfig.threshold,\n-            );\n-          }\n-        }\n       }\n     }\n \n@@ -87,4 +74,27 @@ export class BranchAge extends BotAction {\n       oldestCommit,\n     );\n   }\n+\n+  private static getOldestCommit(commits: Array<GitLabCommit>): GitLabCommit {\n+    const oldestCommit: GitLabCommit = commits.reduce(\n+      (prevCommit, currCommit) => {\n+        return new Date(prevCommit.created_at).getTime() <\n+          new Date(currCommit.created_at).getTime()\n+          ? prevCommit\n+          : currCommit;\n+      },\n+    );\n+    return oldestCommit;\n+  }\n+\n+  private static isBranchYoungerThanThreshold(\n+    oldestCommit: GitLabCommit,\n+    threshold: number,\n+  ): boolean {\n+    // this gives us the number of milliseconds between the oldest commit and current time\n+    const oldestCommitAge =\n+      Date.now() - new Date(oldestCommit.created_at).getTime();\n+    // multiply threshold by milliseconds/day because of how Date class calculates\n+    return oldestCommitAge < threshold * 8.64e7;\n+  }\n }\n',
  },
  {
    old_path: "src/bot_actions/branch_age/branch_age_helpers.ts",
    new_path: "src/bot_actions/branch_age/branch_age_helpers.ts",
    a_mode: "100755",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      '@@ -1,70 +0,0 @@\n-import { GitLabCommit } from "../../interfaces";\n-import { winlog } from "../../util";\n-\n-/**\n- * Each instance of this class is a GitLab Commit object where the `created_at` property has been transformed into a `Date` type.\n- */\n-export class CommitWithTransformedDate {\n-  constructor(readonly title: string, readonly createdAtDate: Date) {}\n-\n-  static fromDateString(\n-    title: string,\n-    createdAtString: string,\n-  ): CommitWithTransformedDate | {} {\n-    let commit: CommitWithTransformedDate | {};\n-    try {\n-      commit = new CommitWithTransformedDate(title, new Date(createdAtString));\n-    } catch (err) {\n-      winlog.error(`${err}`);\n-      commit = {};\n-    }\n-    return commit;\n-  }\n-}\n-\n-/**\n- * @param gitlabCommits array of Commit objects where `created_at` property is a `string`\n- * @returns array of Commit objects where `created_at` property is a `Date`\n- * */\n-export function commitTransformer(\n-  gitlabCommits: Array<GitLabCommit>,\n-): Array<CommitWithTransformedDate> {\n-  const transformedCommits: Array<CommitWithTransformedDate> = [];\n-  gitlabCommits.forEach((gitlabCommit) => {\n-    const transformedCommit:\n-      | CommitWithTransformedDate\n-      | {} = CommitWithTransformedDate.fromDateString(\n-      gitlabCommit.title,\n-      gitlabCommit.created_at,\n-    );\n-    if (transformedCommit !== {}) {\n-      transformedCommits.push(transformedCommit as CommitWithTransformedDate);\n-    }\n-  });\n-  return transformedCommits;\n-}\n-\n-export function getOldestCommit(\n-  commits: Array<CommitWithTransformedDate>,\n-): CommitWithTransformedDate {\n-  const oldestCommit: CommitWithTransformedDate = commits.reduce(\n-    (prevCommit, currCommit) => {\n-      return prevCommit.createdAtDate.getTime() <\n-        currCommit.createdAtDate.getTime()\n-        ? prevCommit\n-        : currCommit;\n-    },\n-  );\n-  return oldestCommit;\n-}\n-\n-export function isBranchYoungerThanThreshold(\n-  oldestCommit: CommitWithTransformedDate,\n-  threshold: number,\n-): boolean {\n-  // this gives us the number of milliseconds between the oldest commit and current time\n-  const oldestCommitAge =\n-    Date.now() - new Date(oldestCommit.createdAtDate).getTime();\n-  // multiply threshold by milliseconds/day because of how Date class calculates\n-  return oldestCommitAge < threshold * 8.64e7;\n-}\n',
  },
  {
    old_path: "src/bot_actions/branch_age/index.ts",
    new_path: "src/bot_actions/branch_age/index.ts",
    a_mode: "100755",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      '@@ -1,3 +0,0 @@\n-export * from "./branch_age_note";\n-export * from "./branch_age_helpers";\n-export * from "./branch_age";\n',
  },
  {
    old_path: "src/bot_actions/commit_messages/commit_message_helpers.ts",
    new_path: "src/bot_actions/commit_messages/commit_message_helpers.ts",
    a_mode: "100755",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      '@@ -1,118 +0,0 @@\n-import {\n-  ReducedCommitAnalysis,\n-  CommitAnalysisResult,\n-  GitLabCommit,\n-} from "../../interfaces";\n-import {\n-  commit_message_analysis,\n-  ICommitMessageAnalysisResponse,\n-} from "@cigna/grdb-commit-message";\n-import { GitLabGetResponse } from "../../gitlab";\n-\n-export function getNumberOfTotalCommits(\n-  apiResponse: GitLabGetResponse,\n-): number {\n-  return apiResponse !== undefined && apiResponse.result !== undefined\n-    ? apiResponse.result.length\n-    : -1;\n-}\n-\n-export function assignCommitsBody(\n-  totalCommits: number,\n-  apiResponse: GitLabGetResponse,\n-): Array<GitLabCommit> {\n-  return totalCommits > 0 ? apiResponse.result : [];\n-}\n-\n-export function calculateThreshold(totalCommits: number): number {\n-  const MIN_NUM = 2;\n-  const PERCENT = 0.2;\n-  const THRESHOLD_FOR_PERCENT = MIN_NUM / PERCENT;\n-\n-  return totalCommits >= THRESHOLD_FOR_PERCENT\n-    ? Math.floor(totalCommits * PERCENT)\n-    : MIN_NUM;\n-}\n-\n-export function testThreshold(\n-  grammarParam: Array<boolean>,\n-  threshold: number,\n-): boolean {\n-  return grammarParam.filter((bool) => bool === false).length < threshold;\n-}\n-\n-/**\n- * Constructs a `ReducedCommitAnalysis` by evaluating the title of each commit for capitalization, length, punctuation, and tense.\n- * @param commits array of GitLab Commit objects\n- * @returns ReducedCommitAnalysis constructed from the analysis of each element of `commits` for each good practice criteria.\n- * */\n-export function analyzeCommits(\n-  commits: Array<GitLabCommit>,\n-): ReducedCommitAnalysis {\n-  const analyzedCommitMessages: ReducedCommitAnalysis = {\n-    length: [],\n-    semantic: [],\n-    capitalization: [],\n-    punctuation: [],\n-    tense: [],\n-  };\n-\n-  commits\n-    .map((commit: GitLabCommit) => commit_message_analysis(commit.title))\n-    .forEach((message: ICommitMessageAnalysisResponse) => {\n-      analyzedCommitMessages.length.push(message.length);\n-      analyzedCommitMessages.semantic.push(message.semantic);\n-      analyzedCommitMessages.capitalization.push(message.capitalization);\n-      analyzedCommitMessages.punctuation.push(message.punctuation);\n-      analyzedCommitMessages.tense.push(message.tense);\n-    });\n-\n-  return analyzedCommitMessages;\n-}\n-\n-/**\n- * Constructs `CommitAnalysisResult` by testing the number of commit titles failing each criteria (capitalization, length, punctuation, and tense) against the threshold.\n- * @param commits array of GitLab Commit objects\n- * @param threshold number of failing commit titles that result in overall bad practice per criteria\n- * @returns CommitAnalysisResult constructed from the overall analysis of `commits` for each good practice criteria.\n- * */\n-export function testAllNudges(\n-  commits: Array<GitLabCommit>,\n-  threshold: number,\n-): CommitAnalysisResult {\n-  const analyzedCommitMessages: ReducedCommitAnalysis = analyzeCommits(commits);\n-\n-  const capitalization: boolean = testThreshold(\n-    analyzedCommitMessages.capitalization,\n-    threshold,\n-  );\n-\n-  const length: boolean = testThreshold(\n-    analyzedCommitMessages.length,\n-    threshold,\n-  );\n-\n-  const punctuation: boolean = testThreshold(\n-    analyzedCommitMessages.punctuation,\n-    threshold,\n-  );\n-\n-  const semantic: boolean = testThreshold(\n-    analyzedCommitMessages.semantic,\n-    Number.MAX_SAFE_INTEGER,\n-  );\n-\n-  const tense: boolean = testThreshold(analyzedCommitMessages.tense, threshold);\n-\n-  return {\n-    length: length,\n-    semantic: semantic,\n-    capitalization: capitalization,\n-    punctuation: punctuation,\n-    tense: tense,\n-  };\n-}\n-\n-export function allValuesTrue(boolArray: Array<boolean>): boolean {\n-  return boolArray.every((bool) => bool === true);\n-}\n',
  },
  {
    old_path: "src/bot_actions/commit_messages/commit_message_note.ts",
    new_path: "src/bot_actions/commit_messages/commit_message_note.ts",
    a_mode: "100755",
    b_mode: "100644",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,36 +1,21 @@\n import * as winston from "winston";\n-import { BotActionNote } from "../bot_action_note";\n-import { CommitAnalysisResult } from "../../interfaces";\n+import { BotActionNote } from "..";\n \n /**\n- * This class extends the `BotActionNote` class by analyzing different state combinations unique to the Commit Message action.\n+ * This class extends the `BotActionNote` class by analyzing different state combinations unique to the Commit Messages Action.\n  * Each instance of this class contains a message string that provides feedback to the end-user about the titles of the commits contained in the GitLab Merge Request.\n  */\n-export class CommitMessageNote extends BotActionNote {\n+export class CommitMessagesNote extends BotActionNote {\n   static readonly good = `:star: Nice work following your team\'s commit message style conventions!`;\n-  static readonly bad =\n-    ":loudspeaker: Some of your commit messages didn\'t follow your team\'s conventions:";\n-  static readonly nudgeMessages: { [index: string]: string } = {\n-    length:\n-      "&emsp;&emsp;&emsp;✗ Keep commits descriptive and concise - between  3 and 50 characters",\n-    capitalization:\n-      "&emsp;&emsp;&emsp;✗ Capitalize the first letter of the message",\n-    punctuation: "&emsp;&emsp;&emsp;✗ Avoid unnecessary trailing punctuation",\n-    semantic:\n-      "&emsp;&emsp;&emsp;✗ Follow [semantic commit conventions](https://seesparkbox.com/foundry/semantic_commit_messages)",\n-    tense: `&emsp;&emsp;&emsp;✗ Begin with a present tense "action verb" like "Add new file"`,\n-  };\n-  static readonly hashtag = `[#CommitMessageAnalysis](http://http://fake.url.com)`;\n+  static readonly hashtag = `[#CommitMessage](http://http://fake.url.com)`;\n+  static readonly bad = `:loudspeaker: Keep commits descriptive and concise - between  3 and 50 characters`;\n \n   private constructor(message: string) {\n     super(message);\n   }\n \n-  static caseForBadMessage(\n-    goodGitPractice: boolean | undefined,\n-    thresholdTestedNudges: CommitAnalysisResult | undefined,\n-  ): boolean {\n-    return goodGitPractice === false && thresholdTestedNudges !== undefined;\n+  static caseForBadMessage(goodGitPractice: boolean | undefined): boolean {\n+    return goodGitPractice === false;\n   }\n \n   static caseForGoodMessage(\n@@ -58,43 +43,27 @@ export class CommitMessageNote extends BotActionNote {\n     );\n   }\n \n-  // safe to ignore eslint "Generic Object Injection Sink" warning:\n-  // no end-user-defined input involved in this function\n-  static badGitPracticesNote(\n-    thresholdTestedNudges: CommitAnalysisResult,\n-  ): string {\n-    const detailedFeedback: Array<string> = [];\n-    Object.keys(this.nudgeMessages).forEach((key) => {\n-      if (!thresholdTestedNudges[key]) {\n-        detailedFeedback.push(this.nudgeMessages[key]);\n-      }\n-    });\n-\n-    return this.bad.concat("<br />", detailedFeedback.join("<br />"));\n-  }\n-\n-  static fromMessage(message: string): CommitMessageNote {\n-    return new CommitMessageNote(\n+  static fromMessage(message: string): CommitMessagesNote {\n+    return new CommitMessagesNote(\n       this.conditionallyAddHashtag(message, this.hashtag),\n     );\n   }\n \n   /**\n-   * Constructs a `CommitMessageNote` object by identifying one of five cases: standard case for permissions check,\n+   * Constructs a `CommitMessagesNote` object by identifying one of five cases: standard case for permissions check,\n    * case for no actions, case for bad message, case for good message, or case for unknown state.\n    *\n-   * @returns `message` of the `CommitMessageNote` object\n+   * @returns `message` of the `CommitMessagesNote` object\n    * */\n   static buildMessage(\n     gitLabRequestSuccess: boolean | undefined,\n     state: string,\n     goodGitPractice: boolean | undefined,\n-    thresholdTestedNudges: CommitAnalysisResult | undefined,\n     constructiveFeedbackOnlyToggle: boolean,\n     totalCommits: number,\n     logger: winston.Logger,\n   ): string {\n-    let note: CommitMessageNote;\n+    let note: CommitMessagesNote;\n \n     switch (true) {\n       case this.standardCaseForCheckPermissionsMessage(gitLabRequestSuccess): {\n@@ -111,13 +80,8 @@ export class CommitMessageNote extends BotActionNote {\n         note = this.fromMessage(this.noActionMessage);\n         break;\n       }\n-      case this.caseForBadMessage(goodGitPractice, thresholdTestedNudges): {\n-        note = this.fromMessage(\n-          // safe to ignore compiler and eslint warning here:\n-          // thresholdTestedNudges will never be undefined if caseForBadMessage returns true\n-          // @ts-ignore\n-          this.badGitPracticesNote(thresholdTestedNudges),\n-        );\n+      case this.caseForBadMessage(goodGitPractice): {\n+        note = this.fromMessage(this.bad);\n         break;\n       }\n       case this.caseForGoodMessage(\n@@ -130,7 +94,7 @@ export class CommitMessageNote extends BotActionNote {\n       }\n       default: {\n         note = this.fromMessage(this.unknownState);\n-        logger.error(`${note.message} CommitMessageAnalysis`);\n+        logger.error(`${note.message} CommitMessages`);\n       }\n     }\n     return note.message;\n',
  },
  {
    old_path: "src/bot_actions/commit_messages/commit_message.ts",
    new_path: "src/bot_actions/commit_messages/commit_messages.ts",
    a_mode: "100755",
    b_mode: "100644",
    new_file: false,
    renamed_file: true,
    deleted_file: false,
    diff:
      '@@ -1,19 +1,12 @@\n-import { BotAction } from "../bot_action";\n+import { BotAction } from "..";\n import {\n+  MergeRequestApi,\n   GitLabAPIRequest,\n   GitLabGetResponse,\n-  MergeRequestApi,\n } from "../../gitlab";\n-import {\n-  allValuesTrue,\n-  assignCommitsBody,\n-  calculateThreshold,\n-  CommitMessageNote,\n-  getNumberOfTotalCommits,\n-  testAllNudges,\n-} from "../commit_messages";\n+import { GitLabCommit } from "../../interfaces";\n import * as winston from "winston";\n-import { CommitAnalysisResult, GitLabCommit } from "../../interfaces";\n+import { CommitMessagesNote } from "./commit_message_note";\n \n /**\n  * This class extends the `BotAction` class by analyzing the titles of the commits contained in the GitLab Merge Request.\n@@ -21,7 +14,7 @@ import { CommitAnalysisResult, GitLabCommit } from "../../interfaces";\n  * of this class also contains the property:\n  * 1. `calculatedThreshold`: `number` the number of failing commit titles that will result in bad practice for an individual commit message criteria\n  */\n-export class CommitMessage extends BotAction {\n+export class CommitMessages extends BotAction {\n   private constructor(\n     apiRequest: GitLabAPIRequest,\n     goodGitPractice: boolean,\n@@ -49,44 +42,78 @@ export class CommitMessage extends BotAction {\n     api: MergeRequestApi,\n     constructiveFeedbackOnlyToggle: boolean,\n     logger: winston.Logger,\n-  ): Promise<CommitMessage> {\n+  ): Promise<CommitMessages> {\n     let goodGitPractice!: boolean;\n-    let thresholdTestedNudges!: CommitAnalysisResult;\n \n     const apiResponse: GitLabGetResponse = await api.getSingleMRCommits();\n \n-    const totalCommits: number = getNumberOfTotalCommits(apiResponse);\n-    const commits: Array<GitLabCommit> = assignCommitsBody(\n-      totalCommits,\n-      apiResponse,\n+    const threshold: number = this.calculateThreshold(\n+      apiResponse.result.length,\n     );\n-    const threshold: number = calculateThreshold(totalCommits);\n \n-    if (apiResponse.apiRequest.success && totalCommits > 0) {\n-      thresholdTestedNudges = testAllNudges(commits, threshold);\n-\n-      goodGitPractice = allValuesTrue([\n-        thresholdTestedNudges.capitalization,\n-        thresholdTestedNudges.length,\n-        thresholdTestedNudges.punctuation,\n-        thresholdTestedNudges.semantic,\n-        thresholdTestedNudges.tense,\n-      ]);\n+    if (apiResponse.apiRequest.success && apiResponse.result.length > 0) {\n+      const validityOfCommits: Array<boolean> = apiResponse.result.map(\n+        (commit: GitLabCommit) => this.lengthValid(commit.title),\n+      );\n+      goodGitPractice = this.testThreshold(validityOfCommits, threshold);\n     }\n \n-    return new CommitMessage(\n+    return new CommitMessages(\n       apiResponse.apiRequest,\n       goodGitPractice,\n-      CommitMessageNote.buildMessage(\n+      CommitMessagesNote.buildMessage(\n         apiResponse.apiRequest.success,\n         state,\n         goodGitPractice,\n-        thresholdTestedNudges,\n         constructiveFeedbackOnlyToggle,\n-        totalCommits,\n+        apiResponse.result.length,\n         logger,\n       ),\n       threshold,\n     );\n   }\n+\n+  /**\n+   *\n+   * Computes the threshold (number of offenses required to give a "nudge")\n+   * Since MRs can be of many different sizes, it makes sense to evaluate\n+   * the user based on the percentage of correct commits.\n+   *\n+   * If we do this, though, we run into strange behavior when there are\n+   * very few commits.\n+   *\n+   * So, we define both a universal minimum threshold and a percentage of\n+   * commits. The "threshold" is the higher of these two numbers.\n+   *\n+   * @param totalCommits Number of commits used in this merge request\n+   */\n+  private static calculateThreshold(totalCommits: number): number {\n+    const MIN_NUM = 2;\n+    const PERCENT = 0.2;\n+    const THRESHOLD_FOR_PERCENT = MIN_NUM / PERCENT;\n+\n+    return totalCommits >= THRESHOLD_FOR_PERCENT\n+      ? Math.floor(totalCommits * PERCENT)\n+      : MIN_NUM;\n+  }\n+\n+  /**\n+   *\n+   * @param grammarParam Ordered array indicating whether each commit followed (true) or violated (false) this convention\n+   * @param threshold Obtained by the `calculateThreshold` function\n+   */\n+  private static testThreshold(\n+    grammarParam: Array<boolean>,\n+    threshold: number,\n+  ): boolean {\n+    return grammarParam.filter((bool) => bool === false).length < threshold;\n+  }\n+\n+  /**\n+   * Returns whether a string follows the length convention\n+   * @returns True if the string has at least 4 alphanumeric characters and at most 50 of any type of character.\n+   */\n+  private static lengthValid(message: string): boolean {\n+    return message.replace(/[\\W_]+/g, "").length >= 4 && message.length <= 50;\n+  }\n }\n',
  },
  {
    old_path: "src/bot_actions/commit_messages/index.ts",
    new_path: "src/bot_actions/commit_messages/index.ts",
    a_mode: "100755",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      '@@ -1,3 +0,0 @@\n-export * from "./commit_message_helpers";\n-export * from "./commit_message_note";\n-export * from "./commit_message";\n',
  },
  {
    old_path: "src/bot_actions/diff_size/diff_size.ts",
    new_path: "src/bot_actions/diff_size/diff_size.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -5,10 +5,11 @@ import {\n   MergeRequestApi,\n } from "../../gitlab";\n import * as winston from "winston";\n-import { calculateDiffs, DiffSizeNote } from "../diff_size";\n import { BotActionConfig } from "../../custom_config/bot_action_config";\n+import { DiffSizeNote } from "./diff_size_note";\n+import { Change } from "../../interfaces";\n+import * as parse from "parse-diff";\n \n-// TODO: figure out how to link to the BotAction class documentation using tsdoc syntax\n /**\n  * This class extends the `BotAction` class by analyzing how many lines of diff are contained in the GitLab Merge Request.\n  * In addition to the standard `BotAction` properties, each instance\n@@ -55,7 +56,7 @@ export class DiffSize extends BotAction {\n       apiResponse.apiRequest.success &&\n       apiResponse.result.hasOwnProperty("changes")\n     ) {\n-      totalDiffs = calculateDiffs(apiResponse.result.changes);\n+      totalDiffs = this.calculateDiffs(apiResponse.result.changes);\n       goodGitPractice = totalDiffs < customConfig.threshold;\n     } else {\n       totalDiffs = -1;\n@@ -75,4 +76,38 @@ export class DiffSize extends BotAction {\n       totalDiffs,\n     );\n   }\n+\n+  /**\n+   * Calculates the total lines of diff as the sum of additions and deletions across all of the Change objects.\n+   * @param changes array of GitLab Change objects\n+   * @returns total lines of diff across all of the `changes`\n+   * */\n+  private static calculateDiffs(changes: Array<Change>): number {\n+    let totalDiffs = 0;\n+\n+    if (changes.length !== 0) {\n+      const diffs: number[] = changes.map((change: Change) => {\n+        if (change.hasOwnProperty("diff")) {\n+          const gitDiff = change.diff;\n+          // workaround for GitLab API 11.2.3 change that broke the schema expected by parse-diff module\n+          const hackedDiff = "--- a/README.md\\n+++ b/README.md\\n" + gitDiff;\n+          const files = parse(hackedDiff);\n+          const total = files.map((file) => {\n+            return Math.abs(file.deletions) + Math.abs(file.additions);\n+          });\n+          return total.reduce(\n+            (accumulator, currentVal) => accumulator + currentVal,\n+          );\n+        } else {\n+          return 0;\n+        }\n+      });\n+\n+      totalDiffs = diffs.reduce(\n+        (accumulator, currentVal) => accumulator + currentVal,\n+      );\n+    }\n+\n+    return totalDiffs;\n+  }\n }\n',
  },
  {
    old_path: "src/bot_actions/diff_size/diff_size_helpers.ts",
    new_path: "src/bot_actions/diff_size/diff_size_helpers.ts",
    a_mode: "100755",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      '@@ -1,36 +0,0 @@\n-import * as parse from "parse-diff";\n-import { Change } from "../../interfaces";\n-\n-/**\n- * Calculates the total lines of diff as the sum of additions and deletions across all of the Change objects.\n- * @param changes array of GitLab Change objects\n- * @returns total lines of diff across all of the `changes`\n- * */\n-export function calculateDiffs(changes: Array<Change>): number {\n-  let totalDiffs = 0;\n-\n-  if (changes.length !== 0) {\n-    const diffs: number[] = changes.map((change: Change) => {\n-      if (change.hasOwnProperty("diff")) {\n-        const gitDiff = change.diff;\n-        // workaround for GitLab API 11.2.3 change that broke the schema expected by parse-diff module\n-        const hackedDiff = "--- a/README.md\\n+++ b/README.md\\n" + gitDiff;\n-        const files = parse(hackedDiff);\n-        const total = files.map((file) => {\n-          return Math.abs(file.deletions) + Math.abs(file.additions);\n-        });\n-        return total.reduce(\n-          (accumulator, currentVal) => accumulator + currentVal,\n-        );\n-      } else {\n-        return 0;\n-      }\n-    });\n-\n-    totalDiffs = diffs.reduce(\n-      (accumulator, currentVal) => accumulator + currentVal,\n-    );\n-  }\n-\n-  return totalDiffs;\n-}\n',
  },
  {
    old_path: "src/bot_actions/diff_size/index.ts",
    new_path: "src/bot_actions/diff_size/index.ts",
    a_mode: "100755",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      '@@ -1,3 +0,0 @@\n-export * from "./diff_size_helpers";\n-export * from "./diff_size_note";\n-export * from "./diff_size";\n',
  },
  {
    old_path: "src/bot_actions/git_outta_here/git_outta_here.ts",
    new_path: "src/bot_actions/git_outta_here/git_outta_here.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -4,8 +4,8 @@ import {\n   MergeRequestApi,\n } from "../../gitlab";\n import * as winston from "winston";\n-import { GitOuttaHereNote, noLogFiles } from "../git_outta_here";\n import { BotAction } from "../bot_action";\n+import { GitOuttaHereNote } from "./git_outta_here_note";\n \n /**\n  * This class extends the `BotAction` class by checking for log files in the changes contained in the GitLab Merge Request.\n@@ -42,7 +42,7 @@ export class GitOuttaHere extends BotAction {\n       apiResponse.apiRequest.success &&\n       apiResponse.result.hasOwnProperty("changes")\n     ) {\n-      goodGitPractice = noLogFiles(apiResponse.result.changes);\n+      goodGitPractice = this.noLogFiles(apiResponse.result.changes);\n     }\n \n     return new BotAction(\n@@ -55,4 +55,23 @@ export class GitOuttaHere extends BotAction {\n       ),\n     );\n   }\n+\n+  /**\n+   * @param changes array of GitLab Change objects\n+   * @returns true if none of the `changes` reflect an update to or creation of a log file\n+   * */\n+  private static noLogFiles(changes: any[]): boolean {\n+    let thereAreNoLogs = true;\n+    if (changes.length !== 0) {\n+      const regex = new RegExp(/\\.log$/);\n+      for (const change of changes) {\n+        const fileIsALog: boolean = regex.test(change.new_path);\n+        if (fileIsALog === true && change.deleted_file === false) {\n+          thereAreNoLogs = false;\n+          break;\n+        }\n+      }\n+    }\n+    return thereAreNoLogs;\n+  }\n }\n',
  },
  {
    old_path: "src/bot_actions/git_outta_here/git_outta_here_helpers.ts",
    new_path: "src/bot_actions/git_outta_here/git_outta_here_helpers.ts",
    a_mode: "100755",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      "@@ -1,18 +0,0 @@\n-/**\n- * @param changes array of GitLab Change objects\n- * @returns true if none of the `changes` reflect an update to or creation of a log file\n- * */\n-export function noLogFiles(changes: any[]): boolean {\n-  let thereAreNoLogs = true;\n-  if (changes.length !== 0) {\n-    const regex = new RegExp(/\\.log$/);\n-    for (const change of changes) {\n-      const fileIsALog: boolean = regex.test(change.new_path);\n-      if (fileIsALog === true && change.deleted_file === false) {\n-        thereAreNoLogs = false;\n-        break;\n-      }\n-    }\n-  }\n-  return thereAreNoLogs;\n-}\n",
  },
  {
    old_path: "src/bot_actions/git_outta_here/index.ts",
    new_path: "src/bot_actions/git_outta_here/index.ts",
    a_mode: "100755",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      '@@ -1,3 +0,0 @@\n-export * from "./git_outta_here_helpers";\n-export * from "./git_outta_here_note";\n-export * from "./git_outta_here";\n',
  },
  {
    old_path: "src/bot_actions/index.ts",
    new_path: "src/bot_actions/index.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,10 +1,10 @@\n export * from "./bot_action_note";\n export * from "./bot_action";\n-export * from "./branch_age";\n-export * from "./commit_messages";\n-export * from "./diff_size";\n-export * from "./git_outta_here";\n-export * from "./new_git_who_dis";\n-export * from "./one_word_commits";\n-export * from "./self_merge";\n-export * from "./too_many_assigned";\n+export * from "./branch_age/branch_age";\n+export * from "./commit_messages/commit_messages";\n+export * from "./diff_size/diff_size";\n+export * from "./git_outta_here/git_outta_here";\n+export * from "./new_git_who_dis/new_git_who_dis";\n+export * from "./one_word_commits/one_word_commit";\n+export * from "./self_merge/self_merge";\n+export * from "./too_many_assigned/too_many_assigned";\n',
  },
  {
    old_path: "src/bot_actions/new_git_who_dis/index.ts",
    new_path: "src/bot_actions/new_git_who_dis/index.ts",
    a_mode: "100755",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      '@@ -1,3 +0,0 @@\n-export * from "./new_git_who_dis_helpers";\n-export * from "./new_git_who_dis_note";\n-export * from "./new_git_who_dis";\n',
  },
  {
    old_path: "src/bot_actions/new_git_who_dis/new_git_who_dis.ts",
    new_path: "src/bot_actions/new_git_who_dis/new_git_who_dis.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,7 +1,7 @@\n-import { NewGitWhoDisNote, authorNameIsNotLanId } from ".";\n import * as winston from "winston";\n import { BotAction } from "../bot_action";\n import { GitLabGetResponse, GitLabAPIRequest } from "../../gitlab";\n+import { NewGitWhoDisNote } from "./new_git_who_dis_note";\n \n /**\n  * This class extends the `BotAction` class by analyzing the name of the author of the GitLab Merge Request.\n@@ -26,7 +26,7 @@ export class NewGitWhoDis extends BotAction {\n     logger: winston.Logger,\n     authorName: string,\n   ): Promise<BotAction> {\n-    const goodGitPractice: boolean = authorNameIsNotLanId(authorName);\n+    const goodGitPractice: boolean = this.authorNameIsNotLanId(authorName);\n     const apiResponse: GitLabGetResponse = GitLabGetResponse.noRequestNeeded();\n \n     return new BotAction(\n@@ -35,4 +35,10 @@ export class NewGitWhoDis extends BotAction {\n       NewGitWhoDisNote.buildMessage(authorName, goodGitPractice, logger),\n     );\n   }\n+\n+  private static authorNameIsNotLanId(authorName: string): boolean {\n+    const regex = new RegExp(/^[a-zA-Z]\\d{5}$/);\n+    const authorNameIsLanId: boolean = regex.test(authorName);\n+    return !authorNameIsLanId;\n+  }\n }\n',
  },
  {
    old_path: "src/bot_actions/new_git_who_dis/new_git_who_dis_helpers.ts",
    new_path: "src/bot_actions/new_git_who_dis/new_git_who_dis_helpers.ts",
    a_mode: "100755",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      "@@ -1,5 +0,0 @@\n-export function authorNameIsNotLanId(authorName: string): boolean {\n-  const regex = new RegExp(/^[a-zA-Z]\\d{5}$/);\n-  const authorNameIsLanId: boolean = regex.test(authorName);\n-  return !authorNameIsLanId;\n-}\n",
  },
  {
    old_path: "src/bot_actions/one_word_commits/index.ts",
    new_path: "src/bot_actions/one_word_commits/index.ts",
    a_mode: "100644",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      '@@ -1,3 +0,0 @@\n-export * from "./one_word_commits_helpers";\n-export * from "./one_word_commit_note";\n-export * from "./one_word_commit";\n',
  },
  {
    old_path: "src/bot_actions/one_word_commits/one_word_commit.ts",
    new_path: "src/bot_actions/one_word_commits/one_word_commit.ts",
    a_mode: "100644",
    b_mode: "100644",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,5 +1,4 @@\n import { BotAction } from "../bot_action";\n-import { countOneWordCommits, OneWordCommitNote } from "../one_word_commits";\n import {\n   GitLabAPIRequest,\n   GitLabGetResponse,\n@@ -7,6 +6,8 @@ import {\n } from "../../gitlab";\n import { BotActionConfig } from "../../custom_config/bot_action_config";\n import * as winston from "winston";\n+import { OneWordCommitNote } from "./one_word_commit_note";\n+import { GitLabCommit } from "../../interfaces";\n \n /**\n  * This class extends the `BotAction` class by analyzing the number of one word commits contained in the GitLab Merge Request.\n@@ -47,7 +48,7 @@ export class OneWordCommit extends BotAction {\n     const apiResponse: GitLabGetResponse = await api.getSingleMRCommits();\n \n     if (apiResponse.apiRequest.success) {\n-      totalOneWordCommits = countOneWordCommits(apiResponse.result);\n+      totalOneWordCommits = this.countOneWordCommits(apiResponse.result);\n       goodGitPractice = totalOneWordCommits < customConfig.threshold;\n     }\n \n@@ -62,4 +63,12 @@ export class OneWordCommit extends BotAction {\n       totalOneWordCommits,\n     );\n   }\n+\n+  private static isOneWord(title: string): boolean {\n+    return title.trim().split(" ").length === 1;\n+  }\n+\n+  private static countOneWordCommits(commits: Array<GitLabCommit>): number {\n+    return commits.filter((commit) => this.isOneWord(commit.title)).length;\n+  }\n }\n',
  },
  {
    old_path: "src/bot_actions/one_word_commits/one_word_commits_helpers.ts",
    new_path: "src/bot_actions/one_word_commits/one_word_commits_helpers.ts",
    a_mode: "100644",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      '@@ -1,13 +0,0 @@\n-import { GitLabCommit } from "../../interfaces";\n-\n-export function isOneWord(title: string): boolean {\n-  if (title.includes(": ") && title.split(": ").length == 2) {\n-    return title.trim().split(": ")[1].trim().split(" ").length === 1;\n-  } else {\n-    return title.trim().split(" ").length === 1;\n-  }\n-}\n-\n-export function countOneWordCommits(commits: Array<GitLabCommit>): number {\n-  return commits.filter((commit) => isOneWord(commit.title)).length;\n-}\n',
  },
  {
    old_path: "src/bot_actions/self_merge/index.ts",
    new_path: "src/bot_actions/self_merge/index.ts",
    a_mode: "100755",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      '@@ -1,3 +0,0 @@\n-export * from "./self_merge_helpers";\n-export * from "./self_merge_note";\n-export * from "./self_merge";\n',
  },
  {
    old_path: "src/bot_actions/self_merge/self_merge.ts",
    new_path: "src/bot_actions/self_merge/self_merge.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -6,11 +6,8 @@ import {\n   MergeRequestApi,\n   GitLabGetResponse,\n } from "../../gitlab";\n-import {\n-  mrIsNotSelfAssignedOrMerged,\n-  mrIsNotSelfApproved,\n-  SelfMergeNote,\n-} from ".";\n+import { SelfMergeNote } from "./self_merge_note";\n+import { User } from "../../interfaces/gitlab_api_types";\n \n /**\n  * This class extends the `BotAction` class by analyzing the assignee or the approvers and the user who merged the GitLab Merge Request.\n@@ -54,7 +51,7 @@ export class SelfMerge extends BotAction {\n \n     if (state !== "merge") {\n       apiResponse = GitLabGetResponse.noRequestNeeded();\n-      goodGitPractice = mrIsNotSelfAssignedOrMerged(assigneeId, authorId);\n+      goodGitPractice = this.mrIsNotSelfAssignedOrMerged(assigneeId, authorId);\n     } else {\n       // Make API call for merge state only\n       const whoApproved = await api.getMRApprovalConfig();\n@@ -66,7 +63,7 @@ export class SelfMerge extends BotAction {\n         whoApproved.result.hasOwnProperty("approved_by")\n       ) {\n         if (whoApproved.result.approved_by.length) {\n-          goodGitPractice = mrIsNotSelfApproved(\n+          goodGitPractice = this.mrIsNotSelfApproved(\n             whoApproved.result.approved_by,\n             authorId,\n           );\n@@ -80,7 +77,7 @@ export class SelfMerge extends BotAction {\n             whoMerged.apiRequest.success &&\n             whoMerged.result.hasOwnProperty("merged_by")\n           ) {\n-            goodGitPractice = mrIsNotSelfAssignedOrMerged(\n+            goodGitPractice = this.mrIsNotSelfAssignedOrMerged(\n               whoMerged.result.merged_by.id,\n               authorId,\n             );\n@@ -102,4 +99,40 @@ export class SelfMerge extends BotAction {\n       approversNeeded,\n     );\n   }\n+\n+  private static mrIsNotSelfAssignedOrMerged(\n+    assigneeOrMergerId: number,\n+    authorId: number,\n+  ): boolean {\n+    let mrIsNotSelfAssignedOrMerged: boolean;\n+\n+    if (assigneeOrMergerId === authorId) {\n+      mrIsNotSelfAssignedOrMerged = false;\n+    } else {\n+      mrIsNotSelfAssignedOrMerged = true;\n+    }\n+\n+    return mrIsNotSelfAssignedOrMerged;\n+  }\n+\n+  /**\n+   * @param approvedByArray array of GitLab users who approved the GitLab Merge Request\n+   * @param authorId the GitLab id of the user who authored the Merge Request\n+   * @returns true if the author of the GitLab Merge Request is not the only user in the `approvedByArray`\n+   * */\n+  private static mrIsNotSelfApproved(\n+    approvedByArray: Array<{ user: User }>,\n+    authorId: number,\n+  ): boolean {\n+    let mrIsNotSelfApproved: boolean;\n+\n+    if (approvedByArray.length === 1) {\n+      mrIsNotSelfApproved =\n+        approvedByArray[0].user.id === authorId ? false : true;\n+    } else {\n+      mrIsNotSelfApproved = true;\n+    }\n+\n+    return mrIsNotSelfApproved;\n+  }\n }\n',
  },
  {
    old_path: "src/bot_actions/self_merge/self_merge_helpers.ts",
    new_path: "src/bot_actions/self_merge/self_merge_helpers.ts",
    a_mode: "100755",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      "@@ -1,35 +0,0 @@\n-export function mrIsNotSelfAssignedOrMerged(\n-  assigneeOrMergerId: number,\n-  authorId: number,\n-): boolean {\n-  let mrIsNotSelfAssignedOrMerged: boolean;\n-\n-  if (assigneeOrMergerId === authorId) {\n-    mrIsNotSelfAssignedOrMerged = false;\n-  } else {\n-    mrIsNotSelfAssignedOrMerged = true;\n-  }\n-\n-  return mrIsNotSelfAssignedOrMerged;\n-}\n-\n-/**\n- * @param approvedByArray array of GitLab users who approved the GitLab Merge Request\n- * @param authorId the GitLab id of the user who authored the Merge Request\n- * @returns true if the author of the GitLab Merge Request is not the only user in the `approvedByArray`\n- * */\n-export function mrIsNotSelfApproved(\n-  approvedByArray: any[],\n-  authorId: number,\n-): boolean {\n-  let mrIsNotSelfApproved: boolean;\n-\n-  if (approvedByArray.length === 1) {\n-    mrIsNotSelfApproved =\n-      approvedByArray[0].user.id === authorId ? false : true;\n-  } else {\n-    mrIsNotSelfApproved = true;\n-  }\n-\n-  return mrIsNotSelfApproved;\n-}\n",
  },
  {
    old_path: "src/bot_actions/too_many_assigned/index.ts",
    new_path: "src/bot_actions/too_many_assigned/index.ts",
    a_mode: "100755",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      '@@ -1,2 +0,0 @@\n-export * from "./too_many_assigned";\n-export * from "./too_many_assigned_note";\n',
  },
  {
    old_path: "src/bot_actions/too_many_assigned/too_many_assigned.ts",
    new_path: "src/bot_actions/too_many_assigned/too_many_assigned.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,4 +1,3 @@\n-import { TooManyAssignedNote } from ".";\n import {\n   GitLabAPIRequest,\n   GitLabGetResponse,\n@@ -7,6 +6,7 @@ import {\n import { BotActionConfig } from "../../custom_config/bot_action_config";\n import * as winston from "winston";\n import { BotAction } from "../bot_action";\n+import { TooManyAssignedNote } from "./too_many_assigned_note";\n \n /**\n  * This class extends the `BotAction` class by analyzing the number of merge requests assigned to the assignee of the GitLab Merge Request.\n',
  },
  {
    old_path: "src/custom_config/action_config_defaults.ts",
    new_path: "src/custom_config/action_config_defaults.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      "@@ -14,7 +14,6 @@ interface CommitMessageAdditonalProperties {\n interface CommitMessageNudges {\n   length: boolean;\n   capitalization: boolean;\n-  semantic: boolean;\n   punctuation: boolean;\n   tense: boolean;\n }\n",
  },
  {
    old_path: "src/interfaces/custom_types.ts",
    new_path: "src/interfaces/custom_types.ts",
    a_mode: "100755",
    b_mode: "0",
    new_file: false,
    renamed_file: false,
    deleted_file: true,
    diff:
      "@@ -1,16 +0,0 @@\n-export interface ReducedCommitAnalysis {\n-  length: Array<boolean>;\n-  semantic: Array<boolean>;\n-  capitalization: Array<boolean>;\n-  punctuation: Array<boolean>;\n-  tense: Array<boolean>;\n-}\n-\n-export interface CommitAnalysisResult {\n-  length: boolean;\n-  semantic: boolean;\n-  capitalization: boolean;\n-  punctuation: boolean;\n-  tense: boolean;\n-  [index: string]: any;\n-}\n",
  },
  {
    old_path: "src/interfaces/index.ts",
    new_path: "src/interfaces/index.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -1,5 +1,4 @@\n export * from "../merge_request/i_merge_request_event";\n-export * from "./custom_types";\n export * from "./gitlab_api_types";\n export * from "./i_generic_handler_response";\n export * from "./i_lambda_handler_response";\n',
  },
  {
    old_path: "src/merge_request/bot_actions_response.ts",
    new_path: "src/merge_request/bot_actions_response.ts",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -2,7 +2,7 @@ import * as HttpStatus from "http-status-codes";\n import * as winston from "winston";\n import {\n   BranchAge,\n-  CommitMessage,\n+  CommitMessages,\n   DiffSize,\n   GitOuttaHere,\n   NewGitWhoDis,\n@@ -33,7 +33,7 @@ export class BotActionsResponse {\n     readonly mergeRequestEvent: MergeRequestEvent,\n     readonly customConfig: CustomConfig,\n     readonly branchAge: BranchAge,\n-    readonly commitMessage: CommitMessage,\n+    readonly commitMessage: CommitMessages,\n     readonly diffSize: DiffSize,\n     readonly gitOuttaHere: GitOuttaHere,\n     readonly newGitWhoDis: NewGitWhoDis,\n@@ -68,7 +68,7 @@ export class BotActionsResponse {\n     // only status is guaranteed to be set regardless of error\n     let status: Status,\n       branchAge!: BranchAge,\n-      commitMessage!: CommitMessage,\n+      commitMessage!: CommitMessages,\n       diffSize!: DiffSize,\n       gitOuttaHere!: GitOuttaHere,\n       newGitWhoDis!: NewGitWhoDis,\n@@ -89,7 +89,7 @@ export class BotActionsResponse {\n       // NOTE: this hardcoded commitMessageConstructiveFeedbackOnlyToggle is a placeholder until\n       // correct customConfig functionality can be implemented\n       const commitMessageConstructiveFeedbackOnlyToggle = false;\n-      const commitMessagePromise: Promise<CommitMessage> = CommitMessage.from(\n+      const commitMessagePromise: Promise<CommitMessages> = CommitMessages.from(\n         state,\n         api,\n         commitMessageConstructiveFeedbackOnlyToggle,\n',
  },
  {
    old_path: "tsconfig.json",
    new_path: "tsconfig.json",
    a_mode: "100755",
    b_mode: "100755",
    new_file: false,
    renamed_file: false,
    deleted_file: false,
    diff:
      '@@ -11,5 +11,5 @@\n     "target": "es6",\n   },\n   "include": ["src", "handler.ts"],\n-  "exclude": ["node_modules", "dist"]\n+  "exclude": ["node_modules", "dist"],\n }\n',
  },
];

describe("calculateDiffs function", () => {
  test("should return a total diffs value of less than 500", () => {
    expect(
      DiffSize["calculateDiffs"](changes_between_zero_and_500),
    ).toBeLessThan(500);
  });

  test("should return a total diffs value of greater than 500", () => {
    expect(DiffSize["calculateDiffs"](changes_more_than_500)).toBeGreaterThan(
      500,
    );
  });

  test("should calculate correct number of diffs when multiple files are changed", () => {
    expect(
      DiffSize["calculateDiffs"](multiple_files_changes_equal_1476),
    ).toEqual(1476);
  });

  test("should return a total diffs value of exactly 0", () => {
    expect(DiffSize["calculateDiffs"](changes_equal_zero)).toEqual(0);
  });
});
