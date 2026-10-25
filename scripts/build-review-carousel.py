"""Regenerate all review carousels from the verified catalog; standard library only."""
from pathlib import Path
from html import escape
import json
import re

ROOT = Path(__file__).resolve().parents[1]
PAGES = ["index.html", "contact.html", "about.html", "services.html", "realtors.html", "gallery.html", "tankless-water-heater-flush.html"]
catalog = json.loads((ROOT / "data/reviews.json").read_text())
reviews = catalog["reviews"]
assert len({r["id"] for r in reviews}) == len(reviews)
assert sum(r["source"] == "Google" for r in reviews) == catalog["googleReviewCount"]

cards = []
for i, review in enumerate(reviews):
    name, text, source, url = (escape(review[k], quote=True) for k in ("name", "text", "source", "url"))
    hidden = " hidden" if i > 1 else ""
    stars = '<span class="uhr-review-stars" aria-label="5 out of 5 stars">★★★★★</span>' if source == "Google" else '<span class="uhr-review-recommendation">Neighbor recommendation</span>'
    quote = '<blockquote class="uhr-review-excerpt">' + text + '</blockquote>' if text else '<p class="uhr-review-excerpt">Five-star Google rating. No written review.</p>'
    full = '<button type="button" class="uhr-review-full" data-review-full aria-label="Read full review by ' + name + '">Read full review</button>' if text else ''
    cards.append(f'''<article class="uhr-review-card" data-review-id="{escape(review['id'])}" role="group" aria-roledescription="slide" aria-label="Review {i+1} of {len(reviews)}"{hidden}>
<div class="uhr-review-card-top">{stars}<span class="uhr-review-source">{source}</span></div>
{quote}<p class="uhr-review-name">{name}</p>
<div class="uhr-review-actions">{full}<a class="uhr-review-source-link" href="{url}" target="_blank" rel="noopener noreferrer" aria-label="Open {source} reviews in a new tab">View on {source} ↗</a></div></article>''')

component = '''<section id="reviews" class="uhr-reviews" data-review-carousel aria-labelledby="uhr-review-title" aria-roledescription="carousel">
<div class="uhr-reviews-inner"><header class="uhr-review-heading"><p class="uhr-review-kicker">What clients say</p><h2 id="uhr-review-title">Real Reviews from Real Clients</h2><p class="uhr-review-intro">5 stars on Google, plus Nextdoor recommendations from Ultra Home Repair clients.</p></header>
<div class="uhr-review-grid">''' + '\n'.join(cards) + '''</div>
<div class="uhr-review-controls"><button type="button" class="uhr-review-control uhr-review-arrow" data-review-previous aria-label="Previous reviews">←</button><span class="uhr-review-counter" data-review-counter>Reviews 1 &amp; 2 of ''' + str(len(reviews)) + '''</span><button type="button" class="uhr-review-control uhr-review-arrow" data-review-next aria-label="Next reviews">→</button><button type="button" class="uhr-review-control" data-review-pause aria-pressed="false">Pause reviews</button></div>
<p class="uhr-review-announcement" data-review-announcement role="status" aria-live="polite"></p><a class="uhr-review-all-link" href="https://share.google/qhuI73fJBqeY8x6Mu" target="_blank" rel="noopener noreferrer">Read reviews on Google ↗</a>
<dialog class="uhr-review-dialog" aria-labelledby="uhr-review-dialog-name"><div class="uhr-review-dialog-top"><div><h3 id="uhr-review-dialog-name" data-review-dialog-name>Client review</h3><span class="uhr-review-source" data-review-dialog-source>Google</span></div><button type="button" class="uhr-review-dialog-close" data-review-close aria-label="Close full review">×</button></div><blockquote data-review-dialog-text></blockquote><a class="uhr-review-dialog-link" data-review-dialog-link href="https://share.google/qhuI73fJBqeY8x6Mu" target="_blank" rel="noopener noreferrer">View the original source ↗</a></dialog>
</div></section>'''

for name in PAGES:
    path = ROOT / name
    source = path.read_text()
    sections = list(re.finditer(r'<section\b[^>]*>.*?</section>', source, flags=re.S | re.I))
    targets = [s for s in sections if any(marker in s.group() for marker in ('id="carouselTrack"', 'id="hr-track"', 'data-review-carousel'))]
    assert len(targets) == 1, (name, len(targets))
    target = targets[0]
    source = source[:target.start()] + component + source[target.end():]

    def remove_legacy_script(match):
        script = match.group()
        if 'carouselTrack' in script and name == 'gallery.html':
            # The gallery script also owns working lightbox/comparison controls.
            return re.sub(r'\n\s*//[^\n]*CAROUSEL[^\n]*\n.*?(?=</script>)', '\n', script, flags=re.S)
        if 'carouselTrack' in script or "getElementById('hr-track')" in script:
            return ''
        if "const section=document.getElementById('reviews'),track=" in script:
            return ''
        return script

    source = re.sub(r'<script\b[^>]*>.*?</script>', remove_legacy_script, source, flags=re.S | re.I)
    if 'css/review-carousel.css' not in source:
        source = source.replace('</head>', '  <link rel="stylesheet" href="css/review-carousel.css?v=20261025-1">\n  <script defer src="js/review-carousel.js?v=20261025-1"></script>\n</head>')
    path.write_text(source)
    print(f'{name}: {len(reviews)} verified-source reviews; shared two-card carousel')
