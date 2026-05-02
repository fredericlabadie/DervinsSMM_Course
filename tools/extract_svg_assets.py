from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
THEORY = ROOT / "theory.qmd"
SVG_DIR = ROOT / "assets" / "svg"
CENTRAL = SVG_DIR / "central-metaphor.svg"

text = THEORY.read_text(encoding="utf-8")

# Extract the large Plate I central metaphor SVG only. Smaller repeated icons remain inline for now.
pattern = re.compile(
    r'(?P<indent>    )<svg viewBox="0 0 1000 360" style="width:100%;height:auto;display:block">(?P<body>.*?)\n(?P=indent)</svg>',
    re.DOTALL,
)

match = pattern.search(text)
if not match:
    raise SystemExit("Could not find the central metaphor SVG in theory.qmd. No files changed.")

svg = match.group(0).strip()
svg = svg.replace(
    '<svg viewBox="0 0 1000 360" style="width:100%;height:auto;display:block">',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 360" role="img" aria-labelledby="central-metaphor-title central-metaphor-desc">\n'
    '  <title id="central-metaphor-title">Dervin Sense-Making central metaphor</title>\n'
    '  <desc id="central-metaphor-desc">A person moving through a situated moment, encountering a gap, constructing a bridge, and moving toward outcomes.</desc>'
)

SVG_DIR.mkdir(parents=True, exist_ok=True)
CENTRAL.write_text(svg + "\n", encoding="utf-8")

replacement = '''    <img class="metaphor-svg" src="assets/svg/central-metaphor.svg" alt="Diagram of Dervin's Sense-Making central metaphor: a person in a situation encountering a gap, building a bridge, and moving toward outcomes." style="width:100%;height:auto;display:block" />'''

text = text[:match.start()] + replacement + text[match.end():]
THEORY.write_text(text, encoding="utf-8")

print("Extracted central metaphor SVG:")
print(f"- {CENTRAL.relative_to(ROOT)}")
print("Updated:")
print("- theory.qmd")
