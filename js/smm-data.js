// Course practitioner gap labels, sample rewrites, and support content.
// The labels below are a teaching heuristic grounded where possible in Dervin's
// movement-state / stop framing. Do not describe them as a canonical Dervin taxonomy.
// Plain global script so any page can use it.

window.SMM_GAPS = [
  { id: 'decision',   label: 'Decision',     hue: 265, color: '#6d3acd', desc: 'Facing a choice; unclear how to decide',          signal: '"I needed to choose between..."' },
  { id: 'barrier',    label: 'Barrier',      hue: 18,  color: '#b94a28', desc: 'External obstacle blocking movement',              signal: '"I couldn\u2019t get access to..."' },
  { id: 'problematic',label: 'Problematic',  hue: 350, color: '#a8324d', desc: 'Something wrong but unclear what',                 signal: '"Something felt off but I couldn\u2019t name it..."' },
  { id: 'role',       label: 'Role',         hue: 200, color: '#2a6f97', desc: 'Course extension: unclear how to behave in a role/situation', signal: '"I didn\u2019t know what I was supposed to do..."' },
  { id: 'spinout',    label: 'Spin-out',     hue: 42,  color: '#a87a1f', desc: 'Total disorientation; no clear question',          signal: '"I had no idea where to start..."' },
  { id: 'washout',    label: 'Washout',      hue: 158, color: '#0d6e56', desc: 'Information received but doesn\u2019t address the gap', signal: '"I got a lot but none of it helped..."' },
];

// Pre-built worked-example rewrites (illustrative — modeled on the course heuristic).
window.SMM_REWRITES = [
  {
    id: 'pricing',
    domain: 'SaaS — Onboarding survey',
    original: 'Did you find the pricing information clear?',
    diagnosis: [
      'Presupposes "information" was the bridge the user needed.',
      'Asks about the artifact (pricing page), not the moment.',
      'Yes/no closes the answer space before the gap can surface.',
    ],
    rewrite: 'Walk me through the moment you were trying to decide which plan fit you. What did you turn to, and what made it harder?',
    gap: 'decision',
    why: 'A decision-oriented practitioner label points to comparison and trade-off reasoning. The neutral framing surfaces what the user actually weighed, which bridges they tried (peers, the pricing page, support), and where the journey broke — not whether one artifact felt "clear" in the abstract.',
    diff: [
      { kind: 'cut',  text: 'Did you find the pricing information clear?' },
      { kind: 'add',  text: 'Walk me through the moment you were trying to decide which plan fit you.' },
      { kind: 'add',  text: 'What did you turn to, and what made it harder?' },
    ],
  },
  {
    id: 'nps',
    domain: 'NPS — Post-purchase',
    original: 'How likely are you to recommend us to a friend?',
    diagnosis: [
      'Measures preference, not gap-bridging.',
      'Treats the product as a static object rather than a resource the user constructed into a bridge for a specific situation.',
      'Strips the situation entirely.',
    ],
    rewrite: 'Think back to the last time you used us for something that mattered. What were you trying to do, what helped, and what got in the way?',
    gap: 'washout',
    why: 'NPS asks for a generalized affective rating. The SMM rewrite anchors a specific micro-moment, lets the situation surface, and probes for both helps and hurts — which may reveal a washout pattern where something was received but did not bridge the operative gap.',
    diff: [
      { kind: 'cut',  text: 'How likely are you to recommend us to a friend?' },
      { kind: 'add',  text: 'Think back to the last time you used us for something that mattered.' },
      { kind: 'add',  text: 'What were you trying to do, what helped, and what got in the way?' },
    ],
  },
  {
    id: 'feature',
    domain: 'A/B test — Feature adoption',
    original: 'Why don\u2019t users adopt the new export feature?',
    diagnosis: [
      'Frames the user as deficient ("don\u2019t adopt") rather than the feature as an answer to a possibly-wrong question.',
      'Presupposes the gap that the feature is bridging is real and shared.',
      'Asks for explanation, not for the situation.',
    ],
    rewrite: 'Tell me about the last time you needed to get something out of the product to use elsewhere. What were you trying to accomplish, and how did you actually do it?',
    gap: 'role',
    why: 'Low adoption may indicate a role-oriented applied gap: users may not see exporting as part of how they are supposed to work with the tool, or they may have already constructed another bridge (screenshot, copy/paste, a colleague). The rewrite finds the actual workflow, not the assumed one.',
    diff: [
      { kind: 'cut',  text: 'Why don\u2019t users adopt the new export feature?' },
      { kind: 'add',  text: 'Tell me about the last time you needed to get something out of the product to use elsewhere.' },
      { kind: 'add',  text: 'What were you trying to accomplish, and how did you actually do it?' },
    ],
  },
  {
    id: 'engagement',
    domain: 'Employee engagement survey',
    original: 'Do you have the information you need to do your job?',
    diagnosis: [
      'Conflates "information" with the full set of bridges (people, process, trust, memory).',
      'Yes/no collapses a multi-gap reality into a single signal.',
      'Asks about a steady state, not a moment.',
    ],
    rewrite: 'Tell me about a recent time you were stuck on something at work. What did you reach for, who or what helped, and what didn\u2019t?',
    gap: 'barrier',
    why: 'The rewrite admits all bridge types — informational, social, procedural, emotional — and asks about a barrier-moment specifically. This produces actionable diagnosis: missing tool, missing trust, missing process, or missing person.',
    diff: [
      { kind: 'cut',  text: 'Do you have the information you need to do your job?' },
      { kind: 'add',  text: 'Tell me about a recent time you were stuck on something at work.' },
      { kind: 'add',  text: 'What did you reach for, who or what helped, and what didn\u2019t?' },
    ],
  },
  {
    id: 'onboard',
    domain: 'Onboarding — week 1 check-in',
    original: 'Was the onboarding helpful?',
    diagnosis: [
      'Asks for global judgment of a process that is in fact a sequence of moments, gaps, and bridges.',
      'No room for hurts, only helps.',
      'Cannot inform any specific change.',
    ],
    rewrite: 'Walk me through your first week. Where did you feel completely lost, and what did you do about it?',
    gap: 'spinout',
    why: 'Onboarding failures often present as spin-out: total disorientation with no clear question to ask. The rewrite invites that signal to surface and probes the bridges (asking a colleague, finding a doc, giving up and waiting) the new hire actually built.',
    diff: [
      { kind: 'cut',  text: 'Was the onboarding helpful?' },
      { kind: 'add',  text: 'Walk me through your first week.' },
      { kind: 'add',  text: 'Where did you feel completely lost, and what did you do about it?' },
    ],
  },
  {
    id: 'merger',
    domain: 'Internal comms — post-merger',
    original: 'How can we communicate the strategy more clearly?',
    diagnosis: [
      'Frames the problem as a clarity-of-message problem (transmission model).',
      'Skips diagnosing what gaps employees actually have.',
      'Solves backwards from leadership intent, not employee situation.',
    ],
    rewrite: 'When you think about your role after the merger, what is the question you keep coming back to that nobody has answered?',
    gap: 'role',
    why: 'Post-merger employees often carry role-oriented and trust-oriented gaps, not simply information gaps. Asking for the unanswered question surfaces the gap directly, in employees\u2019 own words, and lets communications be designed as bridges rather than broadcasts.',
    diff: [
      { kind: 'cut',  text: 'How can we communicate the strategy more clearly?' },
      { kind: 'add',  text: 'When you think about your role after the merger,' },
      { kind: 'add',  text: 'what is the question you keep coming back to that nobody has answered?' },
    ],
  },
];

// IA — support metadata for any future curriculum/spine view.
// These labels are not the primary site navigation; current visible nav is
// Orientation · Theory · Method · Practice · Fieldwork.
window.SMM_SECTIONS = [
  { n: '01', id: 'core',        title: 'Core Concepts',          sub: 'Origins, S\u2011G\u2011B\u2011O, practitioner gap labels' },
  { n: '02', id: 'visual',      title: 'Visual Model',           sub: 'Diagrams, recursive loop, gap anatomy' },
  { n: '03', id: 'protocol',    title: 'Protocol',               sub: 'MMTLI, neutral questioning, analysis' },
  { n: '04', id: 'applied',     title: 'Applied Practice',       sub: 'UX, strategy, comms, decisions, orgs' },
  { n: '05', id: 'analytics',   title: 'Analytics & Product',    sub: 'Funnels, telemetry, A/B, measurement' },
  { n: '06', id: 'projects',    title: 'Practice Projects',      sub: 'Four 30\u201390 minute exercises' },
  { n: '07', id: 'cliff',       title: 'Cliff Notes',            sub: 'Definitions, principles, common mistakes' },
  { n: '08', id: 'recall',      title: 'Active Recall',          sub: '20 flashcards, 10 questions, 5 scenarios' },
  { n: '09', id: 'compare',     title: 'Comparative Analysis',   sub: 'Weick, design thinking, journeys, ethnography' },
  { n: '10', id: 'ethics',      title: 'Ethical Projects',       sub: 'Risk and mitigation case studies' },
  { n: '11', id: 'rewriter',    title: 'Question Rewriter',      sub: 'Practicum partner — paste a question' },
  { n: '12', id: 'fieldwork',   title: 'Fieldwork Template',     sub: 'Printable interview sheet' },
];

// Module previews — support metadata for a possible curriculum spine.
// One teaching moment per module so a future page can preview depth without dumping content.
window.SMM_MODULE_PREVIEWS = {
  core: {
    learn: ['Origins (early 1970s) and the post-positivist turn', 'The S-G-B-O scaffold and why it\u2019s recursive', 'Practitioner gap labels and how to use them cautiously'],
    moment: { kind: 'definition', term: 'Sense-Making', body: 'Verbing, not noun. The continuous activity of constructing bridges across discontinuities to move through time-space.' },
    duration: '40 min',
  },
  visual: {
    learn: ['Reading the gap as a structural object', 'How outcomes become next situations', 'Diagrammatic vs narrative reasoning'],
    moment: { kind: 'principle', term: 'Recursion', body: 'Every outcome reshapes the next situation. The diagram is a loop, not a line.' },
    duration: '25 min',
  },
  protocol: {
    learn: ['Micro-Moment Time-Line Interview, end to end', 'Neutral question construction', 'Coding gaps, bridges, helps, and hurts'],
    moment: { kind: 'instrument', term: 'MMTLI', body: 'Six probes: situate \u2192 step-through \u2192 gap \u2192 bridge \u2192 outcome \u2192 hurt. Each probe is a station, not a question.' },
    duration: '90 min',
  },
  applied: {
    learn: ['Diagnosing UX research questions', 'Re-framing strategy and comms problems', 'Spotting role-oriented applied gaps in org dynamics'],
    moment: { kind: 'caution', term: 'Watch for', body: 'Most "communication" problems are role-oriented and trust-oriented gaps wearing information-gap clothing.' },
    duration: '60 min',
  },
  analytics: {
    learn: ['Funnels as bridge sequences', 'Why drop-off is a gap signal', 'Designing telemetry that respects the gap'],
    moment: { kind: 'principle', term: 'Telemetry', body: 'A drop-off event is the silhouette of a gap. The instrument must be designed to read both the help and the hurt.' },
    duration: '45 min',
  },
  projects: {
    learn: ['Four hands-on exercises (30\u201390 min each)', 'From a single question to full diagnosis', 'Reviewing your own past research'],
    moment: { kind: 'practice', term: 'Project 01', body: 'Find one survey question you\u2019ve sent. Diagnose it. Rewrite it. Re-collect. Compare.' },
    duration: '30\u201390 min ea.',
  },
  cliff: {
    learn: ['Twelve definitions in one page', 'Five common SMM mistakes', 'When NOT to use SMM'],
    moment: { kind: 'definition', term: 'Bridge', body: 'Any resource constructed to cross a gap. Ideas, memories, people, procedures \u2014 information is one bridge type among many.' },
    duration: '15 min',
  },
  recall: {
    learn: ['Twenty flashcards covering core concepts', 'Ten short-answer questions', 'Five scenario diagnostics'],
    moment: { kind: 'flashcard', term: 'What is sense-unmaking?', body: 'Dismantling existing sense structures. Required for unlearning, transformation, and critical thought \u2014 a constitutive part of the process, not failure.' },
    duration: '30 min',
  },
  compare: {
    learn: ['Weick: collective sensemaking vs individual', 'Design thinking: empathy phase as gap probe', 'Ethnography: thick description meets the MMTLI'],
    moment: { kind: 'principle', term: 'Distinction', body: 'Weick studies how groups make collective sense after the fact. Dervin studies how individuals make moves in the moment.' },
    duration: '40 min',
  },
  ethics: {
    learn: ['Surveillance risks of the MMTLI', 'When the gap is the wrong unit of analysis', 'Mitigations and informed-consent patterns'],
    moment: { kind: 'caution', term: 'Watch for', body: 'A method that surfaces moments of disorientation can also be a method that surveils them. Consent must be specific.' },
    duration: '30 min',
  },
  rewriter: {
    learn: ['Use the question rewriter on real research', 'Save and share rewrites', 'Build a personal rewrite library'],
    moment: { kind: 'instrument', term: 'Practicum', body: 'Paste any survey, interview, or strategy question. Receive diagnosis, transformation, and a practitioner-label suggestion \u2014 instantly.' },
    duration: 'Open',
  },
  fieldwork: {
    learn: ['A printable MMTLI sheet', 'Interview prep checklist', 'Post-interview coding template'],
    moment: { kind: 'instrument', term: 'Sheet', body: 'One page. Six probes. Coding gutter. Print and bring.' },
    duration: '\u2014',
  },
};

// Tracks for a possible curriculum spine. These are not visible page-nav labels.
window.SMM_TRACKS = [
  { id: 'theory',  label: 'Theory',  sections: ['core', 'visual', 'compare'] },
  { id: 'method',  label: 'Method',  sections: ['protocol', 'rewriter', 'fieldwork'] },
  { id: 'applied', label: 'Applied', sections: ['applied', 'analytics', 'projects'] },
  { id: 'study',   label: 'Study',   sections: ['cliff', 'recall', 'ethics'] },
];

// Sample flashcards (subset)
window.SMM_FLASHCARDS = [
  { q: 'What is the root metaphor of SMM?', a: 'A person moving through time-space encounters a gap and must construct a bridge to continue forward.' },
  { q: 'Define "gap" in Dervin\u2019s framework.', a: 'The discontinuity that interrupts forward movement — question, confusion, barrier, dilemma. Not a failure: the engine of sense-making.' },
  { q: 'How does a bridge differ from "information"?', a: 'A bridge is any resource — ideas, memories, emotions, social ties, procedures, information. Information is one bridge type among many.' },
  { q: 'What is sense-unmaking?', a: 'Dismantling existing sense structures. Required for unlearning, transformation, and critical thought. A constitutive part of the process — not failure.' },
  { q: 'What is the MMTLI?', a: 'Micro-Moment Time-Line Interview. Six steps: situate, step-through, gap probe, bridge probe, outcome probe, hurt probe.' },
  { q: 'Why probe for hurts as well as helps?', a: 'Bridges often fail or generate worse gaps. Asking only about successes produces asymmetric data that misrepresents how sense-making actually works.' },
];
