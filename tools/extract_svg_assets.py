from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
THEORY = ROOT / "theory.qmd"
SVG_DIR = ROOT / "assets" / "svg"
CENTRAL = SVG_DIR / "central-metaphor.svg"


def fix_central_label(svg: str) -> str:
    """Make the central gap label robust when rendered as an external SVG image.

    Inline SVGs can inherit page font behavior differently from external SVGs loaded
    through <img>. The original central label box was narrow enough that fallback
    mono fonts could make the subtitle overrun the box. This widens the box,
    slightly lowers the subtitle, and constrains its text length.
    """
    svg = svg.replace(
        '<rect x="406" y="258" width="188" height="40" fill="#e3e6d3" stroke="#a06a3a" stroke-width="0.7"/>',
        '<rect x="360" y="252" width="280" height="54" fill="#e3e6d3" stroke="#a06a3a" stroke-width="0.7"/>'
    )
    svg = svg.replace(
        '<text x="500" y="280" text-anchor="middle" font-family="\'Cormorant Garamond\', serif" font-style="italic" font-size="24" font-weight="600" fill="#0c1410" letter-spacing="2">gap</text>',
        '<text x="500" y="276" text-anchor="middle" font-family="\'Cormorant Garamond\', Georgia, serif" font-style="italic" font-size="24" font-weight="600" fill="#0c1410" letter-spacing="2">gap</text>'
    )
    svg = svg.replace(
        '<text x="500" y="292" text-anchor="middle" font-family="\'IBM Plex Mono\', monospace" font-size="8.5" font-weight="600" fill="#a06a3a" letter-spacing="1.6">QUESTIONS · CONFUSIONS · MUDDLES</text>',
        '<text x="500" y="297" text-anchor="middle" font-family="\'IBM Plex Mono\', Consolas, monospace" font-size="8" font-weight="600" fill="#a06a3a" letter-spacing="1" textLength="236" lengthAdjust="spacingAndGlyphs">QUESTIONS · CONFUSIONS · MUDDLES</text>'
    )
    return svg


text = THEORY.read_text(encoding="utf-8")

# Extract the large Plate I central metaphor SVG only. Smaller repeated icons remain inline for now.
pattern = re.compile(
    r'(?P<indent>    )<svg viewBox="0 0 1000 360" style="width:100%;height:auto;display:block">(?P<body>.*?)\n(?P=indent)</svg>',
    re.DOTALL,
)

match = pattern.search(text)

if match:
    svg = match.group(0).strip()
    svg = svg.replace(
        '<svg viewBox="0 0 1000 360" style="width:100%;height:auto;display:block">',
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 360" role="img" aria-labelledby="central-metaphor-title central-metaphor-desc">\n'
        '  <title id="central-metaphor-title">Dervin Sense-Making central metaphor</title>\n'
        '  <desc id="central-metaphor-desc">A person moving through a situated moment, encountering a gap, constructing a bridge, and moving toward outcomes.</desc>'
    )

    svg = fix_central_label(svg)

    SVG_DIR.mkdir(parents=True, exist_ok=True)
    CENTRAL.write_text(svg + "\n", encoding="utf-8")

    replacement = '''    <img class="metaphor-svg" src="assets/svg/central-metaphor.svg" alt="Diagram of Dervin's Sense-Making central metaphor: a person in a situation encountering a gap, building a bridge, and moving toward outcomes." style="width:100%;height:auto;display:block" />'''

    text = text[:match.start()] + replacement + text[match.end():]
    THEORY.write_text(text, encoding="utf-8")

    print("Extracted central metaphor SVG:")
    print(f"- {CENTRAL.relative_to(ROOT)}")
    print("Updated:")
    print("- theory.qmd")
else:
    if not CENTRAL.exists():
        raise SystemExit("Could not find the central metaphor SVG in theory.qmd and assets/svg/central-metaphor.svg does not exist. No files changed.")

    svg = CENTRAL.read_text(encoding="utf-8")
    fixed = fix_central_label(svg)
    if fixed == svg:
        print("No inline SVG found; central metaphor asset already appears fixed.")
    else:
        CENTRAL.write_text(fixed, encoding="utf-8")
        print("Updated existing central metaphor SVG asset:")
        print(f"- {CENTRAL.relative_to(ROOT)}")
