import { Question } from "@/types/sat";

export const RW_QUESTIONS: Question[] = [
  {
    id: "rw_craft_01",
    section: "reading_writing",
    domain: "Craft and Structure",
    subtopic: "Words in Context",
    difficultyRating: 1200, // Approx 400 SAT level (Easy)
    passage: "Although the archival manuscript had deteriorated significantly over two centuries, careful preservation techniques managed to keep the central illustrations remarkably intact and ________ to modern scholars.",
    prompt: "Which choice completes the text with the most logical and precise word?",
    options: [
      { id: "A", text: "legible" },
      { id: "B", text: "concealed" },
      { id: "C", text: "redundant" },
      { id: "D", text: "hypothetical" },
    ],
    correctAnswer: "A",
    explanation: {
      summary: "The sentence contrasts the deterioration of the manuscript with preservation that kept illustrations intact and readable.",
      steps: [
        "The sentence uses 'Although' to set up a contrast: deteriorated vs intact/clear.",
        "'Legible' means clear enough to be read or deciphered, which logically fits the context of scholars studying intact illustrations.",
        "'Concealed' (hidden), 'redundant' (unnecessary), and 'hypothetical' (theoretical) contradict the preservation success.",
      ],
      keyConcept: "Look for contrast transition words like 'Although' or 'Despite' to determine the tone and meaning.",
    },
  },
  {
    id: "rw_sec_01",
    section: "reading_writing",
    domain: "Standard English Conventions",
    subtopic: "Boundaries & Punctuation",
    difficultyRating: 1380, // Approx 490 SAT level (Medium-Easy)
    passage: "In 1912, geophysicist Alfred Wegener proposed the theory of continental drift. However, many geologists rejected his hypothesis ________ Wegener could not identify a plausible driving mechanism for the continents' movement.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      { id: "A", text: "because" },
      { id: "B", text: "because," },
      { id: "C", text: "because;" },
      { id: "D", text: "because:" },
    ],
    correctAnswer: "A",
    explanation: {
      summary: "Subordinating conjunctions that introduce dependent clauses at the end of a sentence do not require a punctuation mark directly after or before them.",
      steps: [
        "'because' introduces the reason for the geologists' rejection.",
        "No comma, semicolon, or colon is needed after 'because' before the subject 'Wegener'.",
      ],
      keyConcept: "Never place a comma immediately following a subordinating conjunction like 'because' or 'although'.",
    },
  },
  {
    id: "rw_info_01",
    section: "reading_writing",
    domain: "Information and Ideas",
    subtopic: "Central Ideas and Details",
    difficultyRating: 1540, // Approx 570 SAT level (Medium)
    passage: "Mycorrhizal networks, underground webs formed by fungi and plant roots, allow trees in dense forests to exchange carbon, water, and nutrients. When large canopy trees are exposed to drought, these fungal pathways frequently channel emergency resources toward younger understory saplings, buffering the saplings against acute stress.",
    prompt: "Based on the text, what is one key function of mycorrhizal networks during drought?",
    options: [
      { id: "A", text: "They eliminate fungi that compete with tree root development." },
      { id: "B", text: "They facilitate resource transfer from mature trees to vulnerable saplings." },
      { id: "C", text: "They prevent canopy trees from losing moisture through transpiration." },
      { id: "D", text: "They stimulate rapid sapling growth regardless of sunlight availability." },
    ],
    correctAnswer: "B",
    explanation: {
      summary: "The text directly states that the fungal pathways channel emergency resources toward younger understory saplings during drought.",
      steps: [
        "Locate the sentence addressing drought: 'these fungal pathways frequently channel emergency resources toward younger understory saplings...'",
        "Choice B accurately paraphrases this statement.",
        "Choices A, C, and D introduce claims not found in the passage.",
      ],
      keyConcept: "SAT Reading answers must be directly supported by explicit text, not assumptions or extrapolation.",
    },
  },
  {
    id: "rw_sec_02",
    section: "reading_writing",
    domain: "Standard English Conventions",
    subtopic: "Subject-Verb Agreement",
    difficultyRating: 1650, // Approx 625 SAT level (Medium-Hard)
    passage: "The discovery of fossilized footprints along with a collection of primitive obsidian tools in the southern rift valley ________ that hominids occupied the region earlier than previously assumed.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      { id: "A", text: "suggest" },
      { id: "B", text: "suggests" },
      { id: "C", text: "have suggested" },
      { id: "D", text: "are suggesting" },
    ],
    correctAnswer: "B",
    explanation: {
      summary: "Identify the true singular subject of the sentence and ignore intervening prepositional phrases.",
      steps: [
        "The subject is 'The discovery' (singular).",
        "'of fossilized footprints along with a collection of primitive obsidian tools in the southern rift valley' is a series of modifying phrases.",
        "A singular subject requires a singular verb: 'suggests'.",
        "Options A, C, and D use plural verb forms.",
      ],
      keyConcept: "Phrases introduced by 'along with', 'as well as', or prepositional phrases do not change the number of the subject.",
    },
  },
  {
    id: "rw_exp_01",
    section: "reading_writing",
    domain: "Expression of Ideas",
    subtopic: "Transitions",
    difficultyRating: 1770, // Approx 685 SAT level (Hard)
    passage: "Many marine organisms rely on calcite to synthesize their protective outer shells. When oceans absorb surplus atmospheric carbon dioxide, pH levels decline, significantly decreasing the concentration of free carbonate ions. ________, calcifying organisms must expend far more metabolic energy merely to construct and maintain their shells.",
    prompt: "Which choice completes the text with the most logical transition?",
    options: [
      { id: "A", text: "Consequently" },
      { id: "B", text: "In contrast" },
      { id: "C", text: "For instance" },
      { id: "D", text: "Nevertheless" },
    ],
    correctAnswer: "A",
    explanation: {
      summary: "The final sentence describes the direct result/consequence of the preceding chemical change in the ocean.",
      steps: [
        "Premise: Ocean acidification reduces available carbonate ions.",
        "Outcome: Marine organisms must spend more energy to build shells.",
        "This is a cause-and-effect relationship.",
        "'Consequently' signals a direct cause-and-effect conclusion.",
      ],
      keyConcept: "Choose transitions based strictly on the logical relationship: Cause/Effect ('Consequently'), Contrast ('However'), or Exemplification ('For instance').",
    },
  },
  {
    id: "rw_craft_02",
    section: "reading_writing",
    domain: "Craft and Structure",
    subtopic: "Text Structure and Purpose",
    difficultyRating: 1980, // Approx 790 SAT level (Very Hard)
    passage: "In his analysis of pre-industrial agrarian economies, historian Luis Vance argues that seasonal labor mobility was not merely a reaction to intermittent harvests, but an institutionalized strategy actively maintained by rural communities to negotiate leverage against landed nobility. Vance substantiates this thesis by demonstrating that rural wages spiked during periods of non-agricultural tenancy disputes, proving that tenant mobility was weaponized as economic resistance rather than simple desperation.",
    prompt: "Which choice best describes the main function of the second sentence in the overall structure of the text?",
    options: [
      { id: "A", text: "It introduces historical evidence that corroborates the non-traditional interpretation presented in the first sentence." },
      { id: "B", text: "It qualifies the scope of the assertion made in the first sentence by acknowledging exceptions to Vance's model." },
      { id: "C", text: "It presents an alternative hypothesis that challenges Vance's conclusions regarding rural mobility." },
      { id: "D", text: "It explains the methodological limitations Vance encountered when analyzing tenant wage fluctuations." },
    ],
    correctAnswer: "A",
    explanation: {
      summary: "The second sentence introduces empirical evidence (wage spikes during disputes) to substantiate (support) Vance's argument described in sentence 1.",
      steps: [
        "Sentence 1 asserts Vance's unconventional claim: mobility was an active leverage strategy, not just harvest reaction.",
        "Sentence 2 begins 'Vance substantiates this thesis by demonstrating...'",
        "'Substantiates' means providing corroborating evidence.",
        "Choice A perfectly captures this function.",
      ],
      keyConcept: "Analyze the relationship between sentences by noticing purpose verbs like 'substantiates', 'critiques', or 'exemplifies'.",
    },
  },
];
