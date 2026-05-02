from pathlib import Path

path = Path('theory.qmd')
text = path.read_text(encoding='utf-8')

replacements = [
    (
        '"Information is not a thing. It is a verb — the moment a person constructs sense across a gap they cannot yet see across."\n    <span class="pull-quote-attr">— after Brenda Dervin, paraphrased</span>',
        '"Information is not simply a thing transmitted intact. In Sense-Making, it becomes useful when a person constructs it into help for moving across a gap."\n    <span class="pull-quote-attr">— course paraphrase after Brenda Dervin</span>'
    ),
    (
        '<span class="plate-title">The seven assumptions</span>',
        '<span class="plate-title">Seven assumptions — course synthesis</span>'
    ),
    (
        'These are not optional background — they are constitutive of the methodology. Every design decision in SMM research follows from them. <em>Synthesised across Dervin (1983, 1992, 1998) — not a direct enumeration from any single paper.</em>',
        'These are not optional background — they are the premises this course uses to organise Dervin\'s methodological stance. Every design decision in SMM research should be checked against them. <em>Course synthesis across Dervin (1983, 1992, 1998) — not a direct enumeration from any single paper.</em>'
    ),
    (
        'This is what makes cross-case comparisons by gap type powerful — the structure is shared, the content is individual.',
        'This is what makes cautious cross-case comparison possible — recurring structures can be compared, while the content remains situated and individual.'
    ),
    (
        'When a participant says "I felt lost," that is primary data about a spin-out gap, not a measurement error.',
        'When a participant says "I felt lost," that is primary data about the stop they experienced, not a measurement error.'
    ),
    (
        'In her later work (primarily 1990s onward), Dervin added <strong>sense-unmaking</strong> — recognition that people must also <em>dismantle</em> existing sense structures. This is not the failure of sense-making. It is a constitutive part of it.',
        'In later work, Dervin foregrounded <strong>sense-unmaking</strong> — the recognition that people may also need to <em>dismantle</em>, challenge, or loosen existing sense structures. This is not merely the failure of sense-making. It is part of how sense-making changes over time.'
    ),
    (
        '<blockquote>People must forget, unlearn, challenge assumptions, and destabilise established understandings before new sense can be made.</blockquote>',
        '<blockquote>Course paraphrase: people sometimes need to unlearn, challenge assumptions, or destabilise established understandings before new sense can be made.</blockquote>'
    ),
    (
        'Sense-unmaking is particularly critical for: transformative learning, organisational change, critical consciousness, and creative work. In Dervin\'s later framework (1998), she connected sense-unmaking explicitly to power — dominant groups impose sense structures, and marginalised groups must unmake imposed sense to survive and resist.',
        'Sense-unmaking is particularly relevant for transformative learning, organisational change, critical consciousness, and creative work. In later SMM writing, Dervin connects making and unmaking sense to power: some sense structures are imposed, and people may need to challenge or undo them in order to move.'
    ),
    (
        'For analytics practitioners: sense-unmaking is what happens when a redesign breaks established user habits. Users had working sense of the old interface. The redesign unmade that sense, creating new gaps. Support ticket spikes after a product launch are often sense-unmaking events — the telemetry shows the fact, SMM diagnoses the structure.',
        'Course application for analytics practitioners: a redesign can disrupt users\' established sense of an interface. Users had workable sense of the old design; the redesign may unsettle that sense and create new gaps. Support ticket spikes after a product launch are often worth reading this way: telemetry shows the event, and SMM helps ask what sense was unmade.'
    ),
    (
        'Dervin\'s core critique: the transmission model assumes meaning inheres in messages — that the same message means the same thing to all receivers. SMM demonstrates empirically this is false. Designing for information transfer is designing for failure.',
        'Dervin\'s core critique: the transmission model assumes meaning inheres in messages — that the same message means the same thing to all receivers. SMM challenges that assumption by asking how people in different situations construct different helps, hindrances, and uses. A transfer-only design frame is therefore inadequate.'
    ),
    (
        '<tr><td>Model</td><td>Linear: Source → Message → Channel → Receiver</td><td>Recursive: Situation → Gap → Bridge → Outcome → New Situation</td></tr>',
        '<tr><td>Model</td><td>Linear: Source → Message → Channel → Receiver</td><td>Situational and recursive: Situation → Gap → Bridge/Help → Outcome/Use → New Situation</td></tr>'
    ),
    (
        '<!-- SGBO Section Head (unchanged from original) -->',
        '<!-- SGBO Section Head -->'
    ),
    (
        '<div class="sgbo-sub">The four stations of the recursive loop. Outcomes reshape situations; bridges may help, hurt, or grow new gaps.</div>',
        '<div class="sgbo-sub">A course teaching shorthand for the movement from situation, through discontinuity, toward helps, hurts, uses, and new situations.</div>'
    ),
    (
        '<div class="diag-hints"><span>· six structural shapes</span><span>· not a failure: the engine</span></div>',
        '<div class="diag-hints"><span>· situated stops</span><span>· not a failure: the engine</span></div>'
    ),
    (
        'The recursive arc — <span class="neon-hl">sense-unmaking</span>:\n        an outcome may destabilise existing sense, which becomes a new gap. The loop never closes.',
        'The recursive arc — <span class="neon-hl">course visualisation</span>:\n        an outcome may help, hurt, or destabilise existing sense, becoming part of the next situation. The loop never closes.'
    ),
    (
        'Dervin, B. (1992). "From the mind\'s eye of the user: The sense-making qualitative-quantitative methodology." In J. D. Glazier & R. R. Powell (Eds.), <em>Qualitative Research in Information Management</em> (pp. 61–84). Englewood, CO: Libraries Unlimited. — The most accessible single-paper introduction. Full S-G-B-O articulation, methodological implications, and examples. If you read one thing, read this.',
        'Dervin, B. (1992). "From the mind\'s eye of the user: The sense-making qualitative-quantitative methodology." In J. D. Glazier & R. R. Powell (Eds.), <em>Qualitative Research in Information Management</em> (pp. 61–84). Englewood, CO: Libraries Unlimited. — The most accessible single-paper introduction to the qualitative-quantitative methodology, situational questioning, gaps, and uses/helps. If you read one thing, read this.'
    ),
    (
        'Introduces the gap-bridge metaphor and the critique of the transmission model. The paper that established SMM as a distinct paradigm.',
        'Introduces core Sense-Making premises, perceived information needs, and the critique of information-as-transmission. Foundational for the gap/bridge metaphor and later SMM formulations.'
    ),
]

missing = []
for old, new in replacements:
    if old not in text:
        missing.append(old[:120].replace('\n', ' '))
    text = text.replace(old, new)

sgbo_note = '''
  <div class="smm-callout-box" style="margin:24px 0;">
    <strong>Academic note</strong>
    Situation → Gap → Bridge → Outcome is the shorthand used in this course for teaching and practice. Dervin's early formulations often foreground situations, gaps, and uses/helps; later summaries and applications make bridge and outcome language more explicit. Read SGBO here as a practitioner map across Dervin's work, not as a claim that every period of her writing used the exact same four labels.
  </div>
'''
anchor = '  <!-- Plate II: The Constitution (dark diagram) -->'
if sgbo_note.strip() not in text:
    text = text.replace(anchor, sgbo_note + '\n' + anchor)

if missing:
    print('Some expected strings were not found:')
    for item in missing:
        print('-', item)
else:
    print('All theory replacements applied.')

path.write_text(text, encoding='utf-8')
