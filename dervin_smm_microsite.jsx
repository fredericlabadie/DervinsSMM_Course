import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
* { box-sizing: border-box; }
.fc-card { perspective: 900px; cursor: pointer; }
.fc-inner { transform-style: preserve-3d; transition: transform 0.5s cubic-bezier(0.4,0,0.2,1); }
.fc-inner.flipped { transform: rotateY(180deg); }
.fc-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.fc-back-face { transform: rotateY(180deg); }
.prose-indent { text-indent: 0; }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #2a4a40; border-radius: 4px; }
`;

const NAV = [
  { id: "core",    num: "01", label: "Core Class" },
  { id: "visual",  num: "02", label: "Visual Model" },
  { id: "method",  num: "03", label: "Methodology" },
  { id: "applied", num: "04", label: "Applied" },
  { id: "cliff",   num: "05", label: "Cliff Notes" },
  { id: "recall",  num: "06", label: "Active Recall" },
  { id: "compare", num: "07", label: "Comparisons" },
  { id: "ethics",  num: "08", label: "Ethical Projects" },
  { id: "plan",    num: "09", label: "Mastery Plan" },
];

const FLASHCARDS = [
  { q: "What is the root metaphor of SMM?", a: "A person moving through time-space encounters a gap (discontinuity) and must construct a bridge to continue forward. Every element of SMM flows from this spatial-temporal image." },
  { q: "Define 'gap' in Dervin's framework.", a: "The discontinuity that interrupts forward movement — a question, confusion, barrier, dilemma, or absence. Not a failure; the engine of sense-making." },
  { q: "What is a 'bridge' and how does it differ from 'information'?", a: "A bridge is any resource constructed to cross a gap: ideas, memories, emotions, social connections, procedures, or information. Information is just one bridge type among many." },
  { q: "What are the four S-G-B-O elements?", a: "Situation (context), Gap (discontinuity), Bridge (constructed crossing), Outcome/Use (what results). The framework is recursive — outcomes create new situations." },
  { q: "What is sense-unmaking?", a: "The deliberate or necessary dismantling of existing sense structures. Required for unlearning, transformation, and critical thought. Not failure — a constitutive part of the process." },
  { q: "Why does SMM insist on specific moments?", a: "Because sense-making is always situated in a specific time-space context. General questions abstract away from the situational ground that constitutes the sense-making." },
  { q: "What is neutral questioning?", a: "A technique avoiding presupposition of gap type, bridge type, or outcome type — letting respondents name their own experience rather than conforming to researcher categories." },
  { q: "Name four gap types in Dervin's taxonomy.", a: "Decision (choosing between paths), Barrier (external obstacle), Spin-out (total disorientation), Washout (information received but unhelpful), Problematic (something wrong but unclear), Role (unclear how to behave)." },
  { q: "What is the MMTLI?", a: "Micro-Moment Time-Line Interview. Six steps: (1) situate in specific moment, (2) step through narrative, (3) probe gaps, (4) probe bridges, (5) probe outcomes, (6) probe hurts." },
  { q: "How does SMM's ontology differ from the transmission model?", a: "Transmission model: information exists independently as an object. SMM: information is constructed in the act of bridging — always relational, situational, never free-standing." },
  { q: "What does 'outcome' include beyond 'was the gap bridged'?", a: "Helps (forward movement), Hurts (movement blocked), New gaps, and Use types: deciding, acting, connecting, evaluating, feeling." },
  { q: "Why probe for hurts as well as helps?", a: "Bridges often fail or generate worse gaps. Asking only about successes produces a distorted picture — asymmetric data misrepresents how sense-making actually works." },
  { q: "What philosophical tradition most informs SMM's situatedness?", a: "Phenomenology (Schutz, Husserl) — experience is always embodied, positioned, temporal. Also constructivism (Kelly) — knowledge is constructed, not received." },
  { q: "What is the 'conduit metaphor' Dervin critiques?", a: "The view that communication is a pipeline transmitting information intact from sender to receiver. Dervin shows empirically this fails: meaning is made, not transmitted." },
  { q: "What does 'universality of procedure, uniqueness of instance' mean?", a: "Everyone sense-makes (universal procedure), but the specific sense any person makes is unique to their situation, history, and moment — preventing over-generalization and radical relativism." },
  { q: "What is 'situation' and why is it constitutive, not contextual?", a: "The specific time-space context of a person. Constitutive because it determines what counts as a gap, what bridges are available, and what outcomes are possible. The same information means different things in different situations." },
  { q: "How does sense-unmaking relate to power?", a: "Dominant groups impose sense structures. Marginalized groups must unmake imposed sense to survive and resist. Sense-unmaking is therefore both cognitive and political." },
  { q: "What is the key unit of analysis in SMM research?", a: "The gap — the specific discontinuity experienced by a specific person in a specific situation. Not the document, the topic, or the information object." },
  { q: "Why is coding gap types analytically superior to coding topics?", a: "Topic coding (e.g., 'questions about pricing') describes content. Gap-type coding (e.g., 'decision-gap requiring comparison') describes the nature of the discontinuity and enables structural cross-domain analysis." },
  { q: "What is the core design principle SMM implies for communications?", a: "Design for gap-bridging, not message-sending. Ask 'what gaps does our audience have?' not 'what do we want to tell them?'" },
];

const TEST_QUESTIONS = [
  { q: "A UX researcher says: 'Users need information about pricing, features, and comparisons.' What would Dervin critique and how would she reframe this?", a: "This replicates topic-based, transmission-model thinking. Dervin would critique: (1) 'information needs' abstracts from situation; (2) it presupposes information as the only bridge; (3) it describes content rather than gap type. SMM reframe: conduct MMTLI interviews about specific moments — identify gap types (decision, confusion, barrier), map bridge attempts (including non-informational ones), analyze outcomes. 'Pricing information need' becomes: 'decision-gap requiring comparison to choose between plans — bridges attempted: pricing page scan (hurt: confusing), social query (helped), support call (mixed outcome)." },
  { q: "Explain why 'outcome' in SMM is more analytically powerful than 'satisfaction' or 'usability'.", a: "Satisfaction/usability measure reaction to an artifact in isolation. SMM outcome is tied to the specific gap: (1) Helps — what movement was enabled, how; (2) Hurts — how the bridge failed or worsened the situation; (3) New gaps — secondary discontinuities created; (4) Use types — what the person actually did differently. A highly 'satisfying' document may bridge no actual gaps; a frustrating search experience may ultimately help enormously. SMM makes effectiveness situated and causal, not preferential." },
  { q: "A communications director says: 'We sent detailed strategy communications but employees are still confused.' Apply SMM to diagnose this.", a: "The director applied a transmission model: encode → send → assume comprehension. SMM diagnosis: employees' actual gaps (What does this mean for my role? / Why is this better than before? / Who can I trust?) were never diagnosed. The communication was designed around what leadership wanted to transmit, not around gap types employees actually have. It is a bridge designed for imagined gaps. Fix: MMTLI-style interviews or open-ended surveys asking about specific moments of uncertainty. Identify gap types. Design communications as bridges for those gaps — organized by gap, not by leadership's topic preferences." },
  { q: "What problem does SMM's sense-unmaking concept create for knowledge management systems?", a: "KM systems assume knowledge is a capturable, retrievable object — a transmission model. Sense-unmaking reveals two problems: (1) Knowledge is a bridge constructed for a specific gap in a specific situation — a document that bridges one gap may fail entirely in another context; (2) Transformation requires dismantling existing 'knowledge,' which a deposit-and-retrieve system cannot facilitate. SMM-informed KM would index resources by gap type, surface assumption-challenging materials alongside informational ones, and build in processes for questioning existing organizational sense." },
  { q: "Design an SMM study of how expats navigate healthcare in a new country.", a: "MMTLI interviews with expats: anchor in a specific recent healthcare-seeking moment. Step through from initial need to resolution. Gap probes at each step: role gaps (how to register?), decision gaps (which specialist?), barrier gaps (language, system structure), trust gaps (who is reliable here?). Bridge analysis: internet searches, expat communities, calling home, GP visits, trial and error. Outcome analysis: what helped movement, what created worse situations. Output: a gap map organized by gap type, enabling communications and services to bridge actual gaps — not assumed 'information needs.'" },
];

const SCENARIOS = [
  { domain: "UX Research", title: "Mobile banking — 40% transfer abandonment", sit: "First-time international transfer attempt on a new mobile app.", gap: "Procedural (how to do this?), decision (which transfer type?), barrier (IBAN/BIC not to hand), anxiety (is this safe?).", bridge: "Abandons app; calls bank; searches online; asks a friend; tries again with documents.", outcome: "Phone call helps but app trust eroded. New gap: 'Why didn't the app tell me what I'd need beforehand?'" },
  { domain: "Strategy", title: "Post-merger integration resistance", sit: "Employee receiving strategy communications after merger, facing changed teams and leadership.", gap: "Role gap (what does this mean for my job?), decision gap (should I look elsewhere?), trust gap (who can I believe?), problematic gap (cultural fit feels wrong but hard to name).", bridge: "Informal peer conversations, reading between lines, LinkedIn scanning, cautious manager conversations.", outcome: "Formal communications bridge none of the actual gaps. Informal network is the most effective bridge. Helps predominantly come outside the official communications architecture." },
  { domain: "Communications", title: "Vaccine hesitancy — saturation campaign failing", sit: "Individual facing vaccine decision: new parent, chronic illness, prior institutional distrust, conflicting community signals.", gap: "Not an information-lack gap — a trust gap (who to believe?), social gap (community belonging), risk decision gap (small risk vs. small benefit), access/barrier gap.", bridge: "Official communications fail because they address assumed knowledge gaps, not actual trust/social gaps. Effective bridges: trusted community members, personal stories, known healthcare providers.", outcome: "Traditional campaign hurts by confirming institutions transmit rather than listen. Community dialogue bridges the actual gaps; information delivery does not." },
  { domain: "Personal Decisions", title: "Career pivot after international relocation", sit: "Expat professional 6 months in, previous career context no longer available, network not yet built.", gap: "Decision gap (which direction?), confusion gap (how do norms differ here?), barrier gap (credentials, language, network don't transfer), identity gap (who am I professionally here?).", bridge: "Internal: draw on transferable expertise; sense-unmake assumption that career must continue same trajectory. External: expat communities, informational interviews, adjacent roles.", outcome: "Network conversations help define options. Credential barrier creates worse gap. Sense-unmaking of 'I must continue in same field' opens new decision space." },
  { domain: "Organizations", title: "Knowledge silos in a distributed company", sit: "Employee encountering a problem where relevant expertise exists elsewhere in the organization but is inaccessible.", gap: "Search gap (where is the expertise?), access gap (how to contact unknown people?), trust gap (will I look incompetent asking?), role gap (is this my job to find?).", bridge: "Workarounds: external Googling, reinventing solutions, restricting queries to immediate network, doing without.", outcome: "Silos persist not because knowledge doesn't exist but because gap types driving knowledge-seeking (access, trust, role) are unaddressed by topic-organized systems. Fix: design KM around gap types, not topic taxonomies." },
];

const ETHICAL_PROJECTS = [
  { name: "Healthcare Navigation Study", goal: "Interview patients about moments of uncertainty navigating care systems — especially relevant in cross-national or expat contexts.", risks: ["Recall may surface trauma or fear — prepare de-escalation; know local crisis referral options", "Health data carries legal and ethical weight — collect only what illuminates gaps, nothing clinical", "Power asymmetry: participants may feel obligated to share more than comfortable"], mitigations: ["Full informed consent with explicit right to stop; no deception", "Anonymize at analysis stage; destroy raw audio after coding", "Co-design consent forms with patient advocates from the community"] },
  { name: "Civic Information Access Audit", goal: "Map citizen gaps when accessing public services — tax, housing, immigration, healthcare registration.", risks: ["Digitally marginalized users may be systematically excluded from sampling", "Undocumented or vulnerable participants face risk if data is mishandled", "Findings may be used to justify service cuts rather than improvements"], mitigations: ["Oversample non-digital channels; conduct in-person interviews", "Store no identifying data; ensure legal team reviews for immigration-adjacent studies", "Include community organizations as co-investigators; publish findings to participants first"] },
  { name: "Workplace Onboarding Friction Map", goal: "Identify new employee gaps during onboarding — especially role-gaps and systemic barrier-gaps in new organizations.", risks: ["Managerial misuse: findings used to evaluate rather than support employees", "Retaliation risk if negative experiences are traceable", "Organizational inertia: data collected but never acted on (ethical failure of omission)"], mitigations: ["Contractually establish: data is not used for performance review", "Aggregate all reporting; individuals never identified", "Establish change commitment before beginning; co-design action plan with HR"] },
  { name: "Community Crisis Communication Review", goal: "Analyze how people bridged uncertainty during emergencies — natural disasters, public health crises, civil unrest.", risks: ["Re-traumatization through narrative recall of crisis moments", "Community distrust if research extracts without reciprocating", "Over-generalization from crisis-state to normal conditions"], mitigations: ["Train interviewers in trauma-informed questioning; provide resource sheets", "Return findings to community in accessible form; involve them in interpretation", "Contextualize findings explicitly; label crisis-specific limitations"] },
  { name: "Expat Cultural Adaptation Study", goal: "Map sense-making gaps as people navigate new national systems — healthcare, education, employment, social norms.", risks: ["Language barriers may distort gap reporting (gaps in expressing gaps)", "Cultural norms around disclosure vary; what counts as a 'gap' may differ", "Researcher positionality: expat researcher may over-identify; non-expat researcher may misread"], mitigations: ["Interview in participant's language of comfort; use bilingual co-researchers", "Pilot MMTLI instrument with diverse cultural consultants before deployment", "Keep reflexive research journal; include positionality statement in publications"] },
];

const COMPARE_DATA = [
  { vs: "Weickian Sensemaking", dims: [
    { d: "Unit", smm: "Individual in a specific time-space moment", other: "Organization or social collective" },
    { d: "Method", smm: "Prescriptive: MMTLI, S-G-B-O coding, neutral questioning", other: "Descriptive: case study, ethnography — no prescribed method" },
    { d: "Time direction", smm: "Prospective and retrospective; gaps require forward movement", other: "Primarily retrospective — sense is made after action" },
    { d: "Integration", smm: "Use Weick for organizational-level context (situation); Dervin for individual-level gap-bridging within that context", other: "" },
  ]},
  { vs: "Design Thinking", dims: [
    { d: "Purpose", smm: "Diagnose how people make sense; map gaps and bridges", other: "Generate solutions through iterative prototyping" },
    { d: "Flow", smm: "Situation → Gap → Bridge → Outcome (diagnostic)", other: "Empathize → Define → Ideate → Prototype → Test (generative)" },
    { d: "Weakness", smm: "Not inherently generative; doesn't specify how to design bridges", other: "'Empathy' framing can be shallow; solutions risk missing actual gaps" },
    { d: "Integration", smm: "Use SMM for rigorous gap diagnosis in DT phases 1–2; use DT's ideation tools to design bridges for the gaps SMM surfaces", other: "" },
  ]},
  { vs: "User Journey Mapping", dims: [
    { d: "Structure", smm: "Theoretically grounded S-G-B-O analysis of specific moments", other: "Touchpoints, emotions, actions across a timeline — often persona-based" },
    { d: "Data source", smm: "MMTLI interviews — actual specific experience", other: "Often composite/generalized; persona-imagined" },
    { d: "Theory", smm: "Rigorous; epistemologically grounded; resists abstraction", other: "Largely atheoretical; pragmatic communicative artifact" },
    { d: "Integration", smm: "Use SMM interviews to generate empirically grounded data that journey maps then visualize. Gap = pain point; Bridge = support mechanism; Outcome = what moved or blocked", other: "" },
  ]},
  { vs: "Systems Thinking", dims: [
    { d: "Scale", smm: "Micro: individual experience in specific moments", other: "Macro: feedback loops, emergent properties, system structure" },
    { d: "Agency", smm: "High emphasis on individual sense-making agency", other: "Individual agency constrained by system structure" },
    { d: "Blind spot", smm: "Can miss structural/systemic causes of gaps", other: "Can miss lived experience of people inside the system" },
    { d: "Integration", smm: "Use Systems Thinking to map why certain gaps are endemic; use SMM to study how individuals experience and navigate those gaps", other: "" },
  ]},
  { vs: "Ethnographic Interviewing", dims: [
    { d: "Structure", smm: "Prescriptive: MMTLI guides around S-G-B-O", other: "Emergent: follows participant lead; thick description" },
    { d: "Comparability", smm: "High — structured approach enables cross-participant analysis", other: "Lower — emergent structure makes cross-case comparison harder" },
    { d: "Surprise", smm: "Structured probing can foreclose emergent discovery", other: "Rich at capturing unexpected cultural context and tacit knowledge" },
    { d: "Integration", smm: "Use ethnographic immersion to understand situational context; deploy MMTLI to systematically map gap-bridge-outcome patterns within that context", other: "" },
  ]},
];

const DAYS = [
  { n: 1, theme: "Foundations", tasks: ["Read Core Class section in full", "Memorize 7 philosophical assumptions", "Read Dervin (1992) 'From the Mind's Eye'", "Write: what does 'constructed information' mean?"] },
  { n: 2, theme: "Core Concepts", tasks: ["Master S-G-B-O from memory", "Study Visual Model — reproduce diagrams by hand", "Memorize gap taxonomy (6 types)", "Drill flashcards 1–10"] },
  { n: 3, theme: "Methodology", tasks: ["Study Methodology section in full", "Memorize MMTLI 6-step protocol", "Rewrite 5 non-neutral questions as neutral", "Drill flashcards 11–20"] },
  { n: 4, theme: "Live Practice", tasks: ["Conduct a self-MMTLI on a real recent decision", "Code your transcript: mark S, G, B, O", "Identify gap types in your narrative", "Reflect: what did sense-unmaking require?"] },
  { n: 5, theme: "Applied Domain", tasks: ["Choose one applied domain (Sec 4) for your work", "Design an SMM research plan for a real project", "Write 8 MMTLI-style interview questions", "Answer test questions 1–3"] },
  { n: 6, theme: "Comparisons", tasks: ["Work through Comparative Analysis", "Map SMM against frameworks you currently use", "Write: where would SMM have changed your last research project?", "Answer test questions 4–5"] },
  { n: 7, theme: "Integration", tasks: ["From memory: write full S-G-B-O model with gap taxonomy", "Write your own one-page SMM summary in your voice", "Work through all 5 applied scenarios", "Identify one real project to apply SMM to this week"] },
];

const Tag = ({ children, color = "teal" }) => {
  const colors = {
    teal: "bg-teal-950 text-teal-300 border border-teal-800",
    amber: "bg-amber-950 text-amber-300 border border-amber-800",
    rose: "bg-rose-950 text-rose-300 border border-rose-800",
    violet: "bg-violet-950 text-violet-300 border border-violet-800",
  };
  return (
    <span className={`inline-block text-xs font-mono tracking-widest uppercase px-2 py-0.5 rounded ${colors[color]}`}>{children}</span>
  );
};

const SectionTitle = ({ num, title }) => (
  <div className="mb-8">
    <div className="font-mono text-xs tracking-widest text-teal-500 mb-1">{num}</div>
    <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-3xl font-bold text-stone-100 leading-tight">{title}</h1>
    <div className="mt-3 h-px bg-stone-700" />
  </div>
);

const H2 = ({ children }) => (
  <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-xl font-semibold text-stone-200 mt-8 mb-3">{children}</h2>
);

const H3 = ({ children }) => (
  <h3 style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-base font-semibold text-stone-300 mt-5 mb-2 tracking-wide">{children}</h3>
);

const P = ({ children }) => (
  <p style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-400 text-base leading-relaxed mb-3">{children}</p>
);

const Callout = ({ label, children, color = "teal" }) => {
  const border = color === "amber" ? "border-l-amber-500 bg-amber-950/30" : color === "rose" ? "border-l-rose-500 bg-rose-950/30" : "border-l-teal-500 bg-teal-950/30";
  const lc = color === "amber" ? "text-amber-400" : color === "rose" ? "text-rose-400" : "text-teal-400";
  return (
    <div className={`border-l-2 ${border} px-4 py-3 rounded-r my-4`}>
      <div className={`font-mono text-xs tracking-widest uppercase ${lc} mb-1`}>{label}</div>
      <p style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-300 text-sm leading-relaxed m-0">{children}</p>
    </div>
  );
};

const Tbl = ({ headers, rows }) => (
  <div className="overflow-x-auto my-4 rounded-lg border border-stone-700">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="bg-stone-800">
          {headers.map((h, i) => (
            <th key={i} className="text-left font-mono text-xs tracking-wider text-stone-400 uppercase px-3 py-2.5 border-b border-stone-700">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-stone-900" : "bg-stone-850"} style={{ background: i % 2 === 0 ? "#1c1917" : "#1a1714" }}>
            {row.map((cell, j) => (
              <td key={j} className={`px-3 py-2 border-b border-stone-800 align-top leading-snug ${j === 0 ? "text-stone-300 font-semibold text-xs font-mono" : "text-stone-400"}`}
                style={{ fontFamily: j === 0 ? "'JetBrains Mono', monospace" : "'Crimson Pro', Georgia, serif" }}
                dangerouslySetInnerHTML={{ __html: cell }} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ConceptCard = ({ tag, title, children, accent = "#0d9e76" }) => (
  <div className="bg-stone-900 rounded-xl p-4 border border-stone-700" style={{ borderTopColor: accent, borderTopWidth: 2 }}>
    <div className="font-mono text-xs tracking-widest text-stone-500 uppercase mb-1">{tag}</div>
    <div style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="font-semibold text-stone-200 mb-2">{title}</div>
    <p style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-400 text-sm leading-relaxed m-0">{children}</p>
  </div>
);

const DiagramBox = ({ children }) => (
  <div className="bg-stone-950 rounded-xl border border-stone-700 p-5 my-4 overflow-x-auto">
    <pre className="font-mono text-xs leading-relaxed text-stone-400 whitespace-pre">{children}</pre>
  </div>
);

function Flashcard({ card, index }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="fc-card h-36" onClick={() => setFlipped(f => !f)}>
      <div className={`fc-inner relative h-full`} style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", transformStyle: "preserve-3d", transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
        <div className="fc-face absolute inset-0 bg-stone-900 border border-stone-700 border-l-2 rounded-xl p-4 flex flex-col justify-between" style={{ borderLeftColor: "#0d9e76", backfaceVisibility: "hidden" }}>
          <div>
            <div className="font-mono text-xs text-stone-600 mb-2">Card {String(index + 1).padStart(2, "0")}</div>
            <div style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-200 text-sm font-semibold leading-snug">{card.q}</div>
          </div>
          <div className="font-mono text-xs text-teal-700">tap to reveal →</div>
        </div>
        <div className="fc-face fc-back-face absolute inset-0 bg-stone-950 border border-stone-700 rounded-xl p-4 flex flex-col justify-between" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-300 text-sm leading-snug">{card.a}</div>
          <div className="font-mono text-xs text-stone-700">← tap to flip back</div>
        </div>
      </div>
    </div>
  );
}

function TestQ({ tq, index }) {
  const [show, setShow] = useState(false);
  return (
    <div className="bg-stone-900 rounded-xl border border-stone-700 overflow-hidden mb-3">
      <div className="flex gap-0">
        <div className="bg-stone-800 flex items-center justify-center px-4 min-w-12 border-r border-stone-700">
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-2xl font-bold text-stone-600">{index + 1}</span>
        </div>
        <div className="p-4 flex-1">
          <p style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-200 font-semibold text-sm leading-snug mb-3">{tq.q}</p>
          <button onClick={() => setShow(s => !s)} className="font-mono text-xs tracking-wider text-teal-500 uppercase hover:text-teal-300 transition-colors">
            {show ? "hide answer ↑" : "show answer ↓"}
          </button>
          {show && (
            <div className="mt-3 bg-teal-950/30 border-l-2 border-teal-600 pl-3 py-2 rounded-r">
              <p style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-300 text-sm leading-relaxed m-0">{tq.a}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SECTIONS ──────────────────────────────────────────

function CoreClass() {
  return (
    <div>
      <SectionTitle num="01" title="Core Class" />
      <H2>Origins & Intellectual History</H2>
      <P>Brenda Dervin began developing SMM in the early 1970s during her doctoral and faculty work, driven by repeated empirical failure: public information campaigns designed to inform and change behavior consistently failed to reach target audiences. The dominant explanation — "they didn't receive the message" — seemed inadequate. Dervin's explanation: the transmission model was wrong.</P>
      <Tbl headers={["Influence", "What Dervin Borrowed", "What She Transformed"]}
        rows={[
          ["Shannon-Weaver", "Communication as process", "Information as a fixed object that transfers intact"],
          ["Carter's info-seeking", "Users have genuine needs", "Needs as static, predictable, topic-based"],
          ["Phenomenology", "Experience is situated, temporal, subjective", "Observer-independent 'reality'"],
          ["Constructivism", "Knowledge is constructed, not received", "Learning as passive absorption"],
          ["Critical theory", "Power shapes information access", "Value-free, neutral information science"],
        ]} />
      <H2>Seven Philosophical Assumptions</H2>
      {[
        ["Reality is discontinuous", "Gaps are not exceptions — they are the fundamental condition of human experience. The world does not present as smooth or gapless."],
        ["Information is constructed, not found", "There are no free-standing information objects waiting to be retrieved. Information is always constructed in the act of bridging a gap."],
        ["Situation is constitutive", "Context is not background — it determines what counts as a gap, what bridges are available, and what outcomes are possible."],
        ["People are active sense-makers", "The human being is agent who constructs bridges using internal resources (memory, emotion) and external resources (information, people, systems)."],
        ["Universal procedure, unique instance", "Every person sense-makes (universal), but the specific sense made is irreducibly unique to that situation and moment."],
        ["Subjectivity is datum, not noise", "Internal experience — confusion, emotion, intuition — is what SMM is designed to capture, not something to be controlled for."],
        ["Both internal and external orders are real", "Neither pure subjectivism nor pure objectivism is adequate. SMM operates in the space between."],
      ].map(([title, body], i) => (
        <div key={i} className="flex gap-3 mb-3">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-900 border border-teal-700 flex items-center justify-center font-mono text-xs text-teal-400 mt-0.5">{i + 1}</div>
          <div><span style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-200 font-semibold">{title}. </span><span style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-400">{body}</span></div>
        </div>
      ))}
      <H2>Key Concepts</H2>
      <div className="grid grid-cols-1 gap-3 mt-3">
        <ConceptCard tag="Concept 01" title="Situation" accent="#0d9e76">The specific time-space context in which a person finds themselves. Situations create, constrain, and define the sense-making that is possible. Not mere background — situation is the operative ground of all sense-making.</ConceptCard>
        <ConceptCard tag="Concept 02" title="Gap" accent="#7c3aed">The discontinuity that interrupts forward movement. A question, confusion, barrier, uncertainty, or absence. Gaps are the engine of sense-making — without a gap, no sense-making is needed. They can be cognitive, emotional, or situational.</ConceptCard>
        <ConceptCard tag="Concept 03" title="Bridge" accent="#c0392b">The sense constructed to cross the gap. Bridges may be ideas, information found, memories recalled, emotional resolutions, social connections, or procedural steps. Bridges are built, not received. They may succeed, fail, or generate new gaps.</ConceptCard>
        <ConceptCard tag="Concept 04" title="Outcome / Use" accent="#b8860b">What results from bridging: Helps (movement continues), Hurts (movement blocked), New gaps (created by the bridge), and Uses — deciding, acting, connecting, evaluating, feeling. Multiple uses can follow one bridge.</ConceptCard>
      </div>
      <H2>Gap Taxonomy</H2>
      <Tbl headers={["Gap Type", "Description", "Example"]}
        rows={[
          ["Decision", "Faced with choice; unclear how to decide", "'I need to choose between two career paths'"],
          ["Barrier", "External obstacle blocking movement", "'I can't get access to the system I need'"],
          ["Problematic", "Something is wrong but unclear what", "'Something feels off but I can't articulate it'"],
          ["Role", "Unclear what to do in a given role/situation", "'I don't know how to behave in this meeting'"],
          ["Spin-out", "Total disorientation; no clear question", "'Everything is unclear; I don't know where to start'"],
          ["Washout", "Information received but doesn't address the gap", "'I got a lot but none of it addresses what I need'"],
        ]} />
      <H2>Sense-Making vs. Sense-Unmaking</H2>
      <Callout label="Sense-Unmaking Defined">In her later work (1990s onward), Dervin added sense-unmaking — the recognition that people must also dismantle existing sense. Not the failure of sense-making: a constitutive part of it. People must forget, unlearn, challenge assumptions, and destabilize established understandings before new sense can be made.</Callout>
      <P>Sense-unmaking is critical for: transformative learning (where old frameworks must be dismantled), organizational change (procedures and assumptions must be unlearned), critical consciousness (dominant sense structures must be actively unmade), and creativity (established frames must be broken before new ones can form).</P>
      <H2>SMM vs. Transmission Model</H2>
      <Tbl headers={["Dimension", "Transmission Model", "SMM"]}
        rows={[
          ["Ontology of information", "Information exists independently as an objective thing", "Information is constructed in the act of bridging — always relational"],
          ["Role of the human", "Passive receiver / decoder", "Active sense-maker constructing bridges"],
          ["Model of communication", "Linear: Source → Message → Channel → Receiver", "Recursive: Situation → Gap → Bridge → Outcome → New Situation"],
          ["Unit of analysis", "The message or information object", "The gap — the specific discontinuity in a specific situation"],
          ["Success criterion", "Accurate transmission: did the message arrive intact?", "Effective bridging: did the person cross the gap in a way that helped?"],
          ["Role of context", "Noise to be reduced", "Constitutive: determines what counts as a gap and a bridge"],
        ]} />
    </div>
  );
}

function VisualModel() {
  return (
    <div>
      <SectionTitle num="02" title="Visual Model" />
      <H2>The Root Metaphor</H2>
      <P>The entire SMM framework flows from a single spatial metaphor: a person moving through time-space encounters a gap — an absence, a question, a barrier. To continue the journey they must construct a bridge. What happens after they cross (or fail to cross) shapes their next situation.</P>
      <DiagramBox>{`  SITUATION          GAP              BRIDGE            OUTCOME
  ─────────          ───              ──────            ───────
  Where you       What stops        What you          What results
  are now         movement          construct         from crossing

  [Person in]         ???           [Ideas found]     [Helps: moves
  [time-space]       /   \\          [Info sought]      forward     ]
                    /     \\         [Memories]        [Hurts: blocks]
                   /       \\        [Feelings]        [New gap: loops]
                  /         \\       [Connections]

  TIME ──────────────────────────────────────────────────────────►`}</DiagramBox>
      <H2>The Formal S-G-B-O Triangle</H2>
      <DiagramBox>{`                   [ PERSON ]
                  /            \\
                 /  standing on  \\
                /  edge of gap   \\
               /                  \\
  SITUATION ──►  · · · GAP · · ·  ──►  BRIDGE  ──►  OUTCOME
  [What I know]    [What I need]    [What helps]     [Use / Effect]
  [Where I am]     [What stops me]  [Constructed]    [New Situation]


  SENSE-UNMAKING adds a recursive arc:

  OUTCOME ─────► may destabilize existing sense ─────► NEW GAP
                                                           │
                  Old bridge dismantled ◄──────────────────┘
                       (sense-unmaking)`}</DiagramBox>
      <H2>The Recursive Loop</H2>
      <P>SMM is not a linear pipeline. Each outcome creates a new situation (or transforms the current one), generating new gaps requiring new bridges. Some bridges worsen the situation — the system is not teleologically optimistic.</P>
      <DiagramBox>{`  S ──► G ──► B ──► O (help)   ──► New Situation S'
  S ──► G ──► B ──► O (hurt)   ──► Worse Situation S–
  S ──► G ──► B ──► O (new gap)──► Spiral: new G within S

  Multiple simultaneous gaps:
  S ──► G₁ (decision)  ──► B₁ ──► O₁
     ──► G₂ (barrier)   ──► B₂ ──► O₂   ← all active at once
     ──► G₃ (confusion) ──► B₃ ──► O₃`}</DiagramBox>
      <H2>Gap & Bridge Surface Signals</H2>
      <Tbl headers={["Signal Type", "Linguistic Markers", "Gap / Bridge?"]}
        rows={[
          ["Questions", '"I didn\'t know why..." / "I wondered how..."', "GAP"],
          ["Confusions", '"It didn\'t make sense..." / "I was lost..."', "GAP"],
          ["Barriers", '"I couldn\'t get through..." / "They wouldn\'t let me..."', "GAP"],
          ["Spin-out", '"Everything was unclear..." / "I had no idea where to start..."', "GAP"],
          ["External resource", "Found a document / asked a person / used a tool", "BRIDGE"],
          ["Internal resource", "Remembered something / drew on experience / felt calmer", "BRIDGE"],
          ["Social resource", "Got help from someone / connected with a community", "BRIDGE"],
        ]} />
    </div>
  );
}

function Methodology() {
  return (
    <div>
      <SectionTitle num="03" title="Methodology in Practice" />
      <Callout label="Core Research Commitment">SMM research asks participants about verbs, not nouns. Not "what topic did you need information about?" but "what question were you trying to answer?" This verb-centered stance is what distinguishes SMM from topic-based information-seeking research.</Callout>
      <H2>The Micro-Moment Time-Line Interview (MMTLI)</H2>
      <P>Dervin's signature technique. It anchors the conversation in a specific, concrete moment — preventing the retrospective abstraction and generalization that plague most interviews.</P>
      {[
        ["Situating move", "Tell me about a specific time when you had to [navigate X / deal with Y]. Not in general — a specific moment."],
        ["Step-through", "Walk me through what happened, step by step, from the beginning. The interviewer constructs a mental timeline."],
        ["Gap probe", "At each step: 'At this point, what questions did you have? What was confusing? What were you trying to figure out?'"],
        ["Bridge probe", "'What helped you with that? What did you find or use? What did you draw on?'"],
        ["Outcome probe", "'How did that help — or not help? What were you able to do as a result? What happened next?'"],
        ["Hurt probe", "'Was there anything that got in the way? Anything that made it harder or more confusing?'"],
      ].map(([label, body], i) => (
        <div key={i} className="flex gap-3 mb-3">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-stone-800 border border-teal-800 flex items-center justify-center font-mono text-xs text-teal-500 mt-0.5">{i + 1}</div>
          <div><span style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-300 font-semibold">{label}. </span><span style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-400">{body}</span></div>
        </div>
      ))}
      <H2>Neutral Questioning</H2>
      <Tbl headers={["Avoid (Non-Neutral)", "Use (Neutral)", "Why"]}
        rows={[
          ['"What information did you need?"', '"What questions did you have at that point?"', "Avoids presupposing information as the only bridge resource"],
          ['"Did the library help you?"', '"What helped you move forward?"', "Avoids privileging formal information systems"],
          ['"Was the information useful?"', '"How did that help — or not help?"', "Opens space for both helpful and unhelpful outcomes"],
          ['"What topic were you researching?"', '"What were you trying to do or figure out?"', "Frames inquiry around the gap, not the topic"],
          ['"Did you understand it?"', '"What made sense? What remained confusing?"', "Separates understanding from use; avoids binary success/fail"],
        ]} />
      <H2>Analysis Protocol</H2>
      <Tbl headers={["Stage", "Method", "What You're Looking For"]}
        rows={[
          ["Transcript coding", "Open coding for S-G-B-O markers; in-vivo codes for gap types", "Where in the transcript do gaps, bridges, and outcomes appear?"],
          ["Gap taxonomy", "Code gaps by type (decision, barrier, spin-out, etc.)", "What kinds of discontinuity are most common in this context?"],
          ["Bridge mapping", "Map which bridge types address which gap types", "Are bridges matched to gaps? Any gaps systematically under-bridged?"],
          ["Outcome analysis", "Code as: helps, hurts, new gaps; classify use types", "What is the downstream effect of different bridge types?"],
          ["Comparative analysis", "Compare S-G-B-O patterns across participants/groups", "What structural patterns appear across individual stories?"],
        ]} />
    </div>
  );
}

function Applied() {
  const domains = [
    { title: "UX Research", traditional: '"Do users find the navigation intuitive?"', smm: '"At what moments do users encounter confusion? What do they reach for to resolve it?"', practice: "Conduct MMTLI-style user interviews anchored in the last time they used the product for a specific purpose. Probe for gaps (confusion, questions, frustration) and bridges (what helped). Produce a gap map annotated with bridge types. Design for gap-bridging, not feature delivery." },
    { title: "Strategy", traditional: '"What message should we send about the strategy?"', smm: '"What gaps does our audience have in this situation — about their role, the change, the future?"', practice: "Gap audit: MMTLI interviews with stakeholders about specific moments of uncertainty. Bridge inventory: what resources (formal/informal) are being used? Outcome mapping: which bridges help, which hurt? Design communications that address actual gaps — not leadership's desired messages." },
    { title: "Communications", traditional: '"What do we need to tell them?"', smm: '"What gaps do they have, and what bridges would help them cross those gaps?"', practice: "Organize content by gap type, not topic. A message organized around 'decision-gap: should I adopt this?' is more effective than one organized around 'here is information about the new system.' Evaluate by gap-bridging effect, not message recall." },
    { title: "Personal Decisions", traditional: '"What are my options?"', smm: '"What is the gap? What situation am I in? What bridges are available? What sense might I need to unmake first?"', practice: "Name the gap precisely before seeking bridges. Is it a decision-gap? A confusion-gap? A barrier-gap? Different gap types require different bridge strategies. Use sense-unmaking: what existing assumptions need dismantling before the gap can be crossed?" },
  ];
  return (
    <div>
      <SectionTitle num="04" title="Applied Practice" />
      {domains.map(d => (
        <div key={d.title} className="bg-stone-900 rounded-xl border border-stone-700 mb-4 overflow-hidden">
          <div className="bg-stone-800 px-4 py-3 border-b border-stone-700">
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="font-semibold text-stone-200">{d.title}</span>
          </div>
          <div className="p-4 grid md:grid-cols-2 gap-3">
            <div>
              <div className="font-mono text-xs text-stone-600 uppercase tracking-wider mb-1">Traditional question</div>
              <p style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-500 text-sm italic leading-snug">{d.traditional}</p>
            </div>
            <div>
              <div className="font-mono text-xs text-teal-700 uppercase tracking-wider mb-1">SMM question</div>
              <p style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-teal-300 text-sm italic leading-snug">{d.smm}</p>
            </div>
          </div>
          <div className="px-4 pb-4 border-t border-stone-800 pt-3">
            <div className="font-mono text-xs text-amber-700 uppercase tracking-wider mb-1">In practice</div>
            <p style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-400 text-sm leading-relaxed m-0">{d.practice}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CliffNotes() {
  const defs = [
    ["SMM", "Sense-Making Methodology — Dervin's framework for studying how people construct meaning across discontinuities in time-space"],
    ["Situation", "The specific time-space context that constitutes sense-making — not background, but ground"],
    ["Gap", "The discontinuity interrupting forward movement; the engine of sense-making"],
    ["Bridge", "Any resource constructed to cross a gap: informational, emotional, social, procedural, cognitive"],
    ["Outcome / Use", "What results from bridging: helps, hurts, new gaps, and specific uses (deciding, acting, connecting)"],
    ["MMTLI", "Micro-Moment Time-Line Interview — Dervin's 6-step interview protocol anchored in a specific moment"],
    ["Neutral questioning", "Questions avoiding presupposition of gap type, bridge type, or outcome type"],
    ["Sense-unmaking", "Dismantling existing sense structures — required for transformation, learning, and critical thought"],
    ["Discontinuity", "The fundamental condition of reality in SMM's ontology — gaps are normal, not exceptional"],
    ["Transmission model", "The dominant alternative SMM critiques: information as an object transmitted intact from sender to receiver"],
  ];
  const mistakes = [
    ["Equating bridge with information", "Dervin explicitly resists this. Information is one bridge type — bridges can also be emotional, social, procedural, or recalled from memory. Privileging information replicates the transmission model inside SMM."],
    ["Abstracting from situation", "Asking 'what do users generally need?' rather than 'what did this person need in this moment?' evacuates the methodology of its explanatory power."],
    ["Ignoring sense-unmaking", "Treating SMM as purely constructive misses resistance, confusion, and transformative learning — where old sense must be dismantled before new sense can be made."],
    ["Treating gaps as deficits", "A gap is not the user's failure to know something. It is the normal discontinuity of human experience. Framing gaps as deficits reintroduces transmission-model normativity."],
    ["Topic-based coding", "Coding by topic ('questions about pricing') rather than gap type ('decision-gap requiring comparison') loses SMM's structural analytical value."],
    ["Probing only positive outcomes", "Asking only 'what helped?' misses bridge failures, hurts, and worse gaps — the most diagnostically valuable data."],
  ];
  return (
    <div>
      <SectionTitle num="05" title="Cliff Notes" />
      <Callout label="Model in One Paragraph">A person moves through time-space in a specific situation. They encounter a gap — a discontinuity in their understanding or ability to move forward. To cross the gap they construct a bridge, drawing on internal resources (memory, emotion, knowledge) and external resources (information, people, systems). The bridge produces an outcome: it helps (movement continues), hurts (movement is blocked), or creates a new gap (requiring more bridging). Sense-unmaking is the complementary practice of dismantling existing bridges when they no longer serve.</Callout>
      <H2>Core Definitions</H2>
      <div className="space-y-0 rounded-lg overflow-hidden border border-stone-700 my-4">
        {defs.map(([term, def], i) => (
          <div key={term} className="flex border-b border-stone-800 last:border-b-0" style={{ background: i % 2 === 0 ? "#1c1917" : "#181614" }}>
            <div className="flex-shrink-0 w-36 px-3 py-2.5 font-mono text-xs text-teal-500 tracking-wide uppercase border-r border-stone-800">{term}</div>
            <div className="px-3 py-2.5 text-stone-400 text-sm leading-relaxed" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{def}</div>
          </div>
        ))}
      </div>
      <H2>Common Mistakes</H2>
      {mistakes.map(([title, body]) => (
        <div key={title} className="border-l-2 border-rose-700 bg-rose-950/20 px-4 py-3 rounded-r mb-3">
          <div style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-rose-300 font-semibold text-sm mb-1">{title}</div>
          <p style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-400 text-sm leading-relaxed m-0">{body}</p>
        </div>
      ))}
    </div>
  );
}

function ActiveRecall() {
  return (
    <div>
      <SectionTitle num="06" title="Active Recall" />
      <H2>Flashcards <span className="font-mono text-xs text-stone-600 font-normal ml-2">tap to flip</span></H2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        {FLASHCARDS.map((card, i) => <Flashcard key={i} card={card} index={i} />)}
      </div>
      <H2>Test Questions <span className="font-mono text-xs text-stone-600 font-normal ml-2">click to reveal</span></H2>
      <div className="mt-4">
        {TEST_QUESTIONS.map((tq, i) => <TestQ key={i} tq={tq} index={i} />)}
      </div>
      <H2>Scenario Applications</H2>
      {SCENARIOS.map((s, i) => (
        <div key={i} className="bg-stone-900 rounded-xl border border-stone-700 mb-4 overflow-hidden">
          <div className="bg-stone-800 px-4 py-3 flex gap-3 items-center border-b border-stone-700">
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-stone-600 text-2xl font-bold">0{i + 1}</span>
            <div>
              <Tag color="teal">{s.domain}</Tag>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-stone-200 font-semibold mt-0.5">{s.title}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-700">
            {[["Situation", s.sit, "teal"], ["Gap(s)", s.gap, "violet"], ["Bridge(s)", s.bridge, "amber"], ["Outcome(s)", s.outcome, "rose"]].map(([label, text, c]) => (
              <div key={label} className="bg-stone-900 p-3">
                <Tag color={c}>{label}</Tag>
                <p style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-400 text-xs leading-relaxed mt-1 mb-0">{text}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Compare() {
  return (
    <div>
      <SectionTitle num="07" title="Comparative Analysis" />
      <P>Each comparison maps SMM against a framework you likely use already — identifying genuine overlaps, genuine tensions, and practical integration points.</P>
      {COMPARE_DATA.map((comp, ci) => (
        <div key={ci} className="mb-6">
          <H2>SMM vs. {comp.vs}</H2>
          <div className="rounded-xl overflow-hidden border border-stone-700">
            <div className="grid grid-cols-2 bg-stone-800 border-b border-stone-700">
              {["Dervin's SMM", comp.vs].map((name, i) => (
                <div key={i} className={`px-4 py-2.5 ${i === 0 ? "border-r border-stone-700" : ""}`}>
                  <div className="font-mono text-xs text-stone-500 uppercase tracking-wider">Framework {i === 0 ? "A" : "B"}</div>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-stone-200 font-semibold text-sm">{name}</div>
                </div>
              ))}
            </div>
            {comp.dims.map((row, ri) => (
              <div key={ri} className={`grid ${row.other ? "grid-cols-3" : "grid-cols-1"} border-b border-stone-800 last:border-b-0`} style={{ background: ri % 2 === 0 ? "#1c1917" : "#181614" }}>
                <div className="px-3 py-2 font-mono text-xs text-stone-500 uppercase tracking-wider border-r border-stone-800 bg-stone-900/50">{row.d}</div>
                <div className="px-3 py-2 text-sm text-stone-400 border-r border-stone-800" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{row.smm}</div>
                {row.other && <div className="px-3 py-2 text-sm text-stone-400 col-span-1" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{row.other}</div>}
                {!row.other && <div className="px-3 py-2 text-sm text-teal-400/70 col-span-2 italic" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{row.smm}</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Ethics() {
  return (
    <div>
      <SectionTitle num="08" title="Ethical Projects" />
      <P>This section — absent from most SMM treatments — addresses the ethical commitments that must accompany SMM research design. Because MMTLI interviews ask people to recall specific moments of vulnerability, confusion, and crisis, ethical scaffolding is not optional. SMM's philosophical commitments (subjectivity as datum; situated experience as primary) also generate specific ethical obligations.</P>
      <Callout label="Core Ethical Principle" color="amber">SMM positions participants as active sense-makers, not informants. This means research design must protect their ability to make sense of the research process itself — informed consent, power transparency, and benefit reciprocity are structural requirements, not procedural formalities.</Callout>
      {ETHICAL_PROJECTS.map((p, i) => (
        <div key={i} className="bg-stone-900 rounded-xl border border-stone-700 mb-4 overflow-hidden">
          <div className="bg-stone-800 px-4 py-3 border-b border-stone-700 flex gap-3 items-center">
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-stone-600 text-2xl font-bold">0{i + 1}</span>
            <div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-stone-200 font-semibold">{p.name}</div>
              <p style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-500 text-sm m-0 mt-0.5">{p.goal}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-4 border-r border-stone-800">
              <div className="font-mono text-xs text-rose-500 uppercase tracking-wider mb-2">Ethical Risks</div>
              {p.risks.map((r, ri) => (
                <div key={ri} className="flex gap-2 mb-2">
                  <span className="text-rose-700 mt-0.5 flex-shrink-0">◆</span>
                  <p style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-400 text-sm leading-snug m-0">{r}</p>
                </div>
              ))}
            </div>
            <div className="p-4">
              <div className="font-mono text-xs text-teal-500 uppercase tracking-wider mb-2">Mitigations</div>
              {p.mitigations.map((m, mi) => (
                <div key={mi} className="flex gap-2 mb-2">
                  <span className="text-teal-700 mt-0.5 flex-shrink-0">◆</span>
                  <p style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-400 text-sm leading-snug m-0">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <H2>Universal Ethical Commitments in SMM Research</H2>
      <Tbl headers={["Principle", "What It Requires in SMM Practice"]}
        rows={[
          ["Informed consent as ongoing", "Because MMTLI interviews follow emergent narratives into unpredictable territory, consent must be renewed as sensitive material emerges — not only at the outset"],
          ["Reciprocity", "Participants share sense-making moments; researchers owe them: findings in accessible form, co-interpretation opportunities, and actionable outputs"],
          ["Power transparency", "MMTLI positions the researcher as gap-mapper; participants may feel their sense-making is being evaluated. Explicitly de-hierarchize the interview dynamic"],
          ["Trauma sensitivity", "Gap probes about crisis, illness, institutional failure, or conflict may surface trauma. Train interviewers in trauma-informed questioning; have referral resources available"],
          ["Sense-unmaking ethics", "If research design challenges participants' existing worldviews (sense-unmaking), this must be consensual and supported — not imposed in the name of critical method"],
          ["Data minimization", "SMM's richness tempts over-collection. Collect only what illuminates gap types and bridge patterns for your specific research question"],
        ]} />
    </div>
  );
}

function MasteryPlan() {
  return (
    <div>
      <SectionTitle num="09" title="7-Day Mastery Plan" />
      <div className="grid grid-cols-1 gap-3 mt-4">
        {DAYS.map(d => (
          <div key={d.n} className="bg-stone-900 rounded-xl border border-stone-700 overflow-hidden flex">
            <div className="bg-stone-800 flex flex-col items-center justify-center px-4 min-w-16 border-r border-stone-700">
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-3xl font-bold text-teal-500">{d.n}</span>
              <span className="font-mono text-xs text-stone-600 uppercase tracking-wider">Day</span>
            </div>
            <div className="p-4 flex-1">
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="font-semibold text-stone-200 mb-2">{d.theme}</div>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-1">
                {d.tasks.map((t, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="text-teal-700 flex-shrink-0 mt-0.5 text-xs">—</span>
                    <span style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-400 text-sm leading-snug">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <H2>Study Loop (Daily Ritual)</H2>
      <P>Adapted from the ChatGPT microsite's Study Loop concept — refined for SMM practice depth:</P>
      {["Recall the S-G-B-O framework from memory. Write the gap taxonomy unaided.", "Apply: identify one gap you encountered today (personal, professional, intellectual). Name its type.", "Bridge audit: what did you reach for to bridge it? Was it information, emotion, social, procedural?", "Outcome trace: did the bridge help, hurt, or create a new gap?", "Sense-unmaking check: did you need to dismantle an existing assumption before the bridge could work?"].map((step, i) => (
        <div key={i} className="flex gap-3 mb-2">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-800 border border-stone-600 flex items-center justify-center font-mono text-xs text-stone-500 mt-0.5">{i + 1}</div>
          <p style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-400 text-sm leading-snug m-0 mt-0.5">{step}</p>
        </div>
      ))}
      <H2>Primary Sources</H2>
      <Tbl headers={["Work", "Why Read It"]}
        rows={[
          ["Dervin (1983) — 'Information as a User Construct'", "Foundational statement — introduces gap-bridge metaphor; critique of transmission model"],
          ["Dervin (1992) — 'From the Mind's Eye of the User'", "Best single overview; full S-G-B-O articulation; methodological implications — start here"],
          ["Dervin & Nilan (1986) — Annual Review of Information Science", "Landmark critique of traditional information needs research; establishes the paradigm shift"],
          ["Dervin (1998) — 'Sense-Making Theory and Practice'", "Mature statement; introduces sense-unmaking; feminist and power dimensions"],
          ["Dervin (1999) — 'On Studying Information Seeking Methodologically'", "Deepest methodological discussion; best on MMTLI design and analysis"],
        ]} />
      <H2>Mastery Milestones</H2>
      {["Conceptual: You can explain S-G-B-O fluently to someone unfamiliar with SMM, without jargon, in under 2 minutes.", "Methodological: You can design and conduct an MMTLI interview, probe all six steps, and code the transcript by gap, bridge, and outcome type.", "Critical: You can explain why SMM's critique of the transmission model matters for your specific domain, with concrete examples.", "Applied: You have conducted at least one real SMM analysis and produced gap-type findings.", "Integrative: You make deliberate methodological choices about when to use SMM vs. other frameworks you have."].map((m, i) => (
        <div key={i} className="flex gap-3 mb-3">
          <div className="flex-shrink-0 w-6 h-6 rounded bg-teal-900 border border-teal-700 flex items-center justify-center font-mono text-xs text-teal-400 mt-0.5">✓</div>
          <p style={{ fontFamily: "'Crimson Pro', Georgia, serif" }} className="text-stone-400 text-sm leading-snug m-0 mt-0.5">{m}</p>
        </div>
      ))}
    </div>
  );
}

const SECTION_COMPONENTS = { core: CoreClass, visual: VisualModel, method: Methodology, applied: Applied, cliff: CliffNotes, recall: ActiveRecall, compare: Compare, ethics: Ethics, plan: MasteryPlan };

export default function DervinSMMMicrosite() {
  const [active, setActive] = useState("core");
  const ActiveSection = SECTION_COMPONENTS[active];

  return (
    <>
      <style>{FONTS}</style>
      <div className="min-h-screen bg-stone-950 text-stone-300 flex flex-col">
        {/* Header */}
        <div className="bg-stone-950 border-b border-stone-800 px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-teal-600 tracking-widest uppercase mb-1">Advanced Study Guide · Communication Theory</div>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-2xl font-bold text-stone-100 leading-tight">Brenda Dervin's Sense-Making Methodology</h1>
            </div>
            <div className="hidden md:flex gap-4 flex-shrink-0">
              {[["9", "Sections"], ["20", "Flashcards"], ["5", "Scenarios"], ["5", "Ethical Projects"]].map(([n, l]) => (
                <div key={l} className="text-center">
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-xl font-bold text-teal-400">{n}</div>
                  <div className="font-mono text-xs text-stone-600 uppercase tracking-wider">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="bg-stone-900 border-b border-stone-800 overflow-x-auto sticky top-0 z-50">
          <div className="flex max-w-5xl mx-auto">
            {NAV.map(n => (
              <button key={n.id}
                onClick={() => setActive(n.id)}
                className={`flex-shrink-0 flex flex-col items-center px-4 py-2.5 border-b-2 transition-all hover:bg-stone-800 ${active === n.id ? "border-teal-500 bg-stone-800" : "border-transparent"}`}>
                <span className="font-mono text-xs text-stone-600">{n.num}</span>
                <span className={`font-mono text-xs whitespace-nowrap tracking-wide ${active === n.id ? "text-teal-400" : "text-stone-500 hover:text-stone-300"}`}>{n.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
          <ActiveSection />
        </div>

        {/* Footer */}
        <div className="border-t border-stone-800 px-6 py-4 max-w-5xl mx-auto w-full">
          <p className="font-mono text-xs text-stone-700 text-center">Dervin's SMM · Synthesized Study Resource · Based on Dervin (1983, 1992, 1998, 1999)</p>
        </div>
      </div>
    </>
  );
}
