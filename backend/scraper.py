# scraper.py
import requests
from bs4 import BeautifulSoup
import re

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; DeepKlarity/1.0)"}

def clean_text(text: str) -> str:
    # remove reference markers like [1], [a], [note 1]
    text = re.sub(r"\[[^\]]*\]", "", text)
    # split joined words like 'theRepublic' -> 'the Republic'
    text = re.sub(r"([a-z])([A-Z])", r"\1 \2", text)
    # normalize whitespace
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def scrape_wikipedia(url: str):
    """Return (title, cleaned_text). Raises requests exceptions on network errors."""
    resp = requests.get(url, headers=HEADERS, timeout=15)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    title_tag = soup.find("h1", id="firstHeading")
    title = title_tag.get_text(strip=True) if title_tag else (soup.title.string if soup.title else url)

    content_node = soup.find(id="mw-content-text") or soup.find("article") or soup.find("main") or soup.body
    # remove unwanted elements
    for selector in content_node.select("sup, .reference, table, .infobox, .toc, .mw-editsection, .navbox"):
        selector.decompose()

    paras = [p.get_text(" ", strip=True) for p in content_node.find_all("p") if p.get_text(strip=True)]
    cleaned_paras = [clean_text(p) for p in paras if len(clean_text(p)) > 60]

    full_text = "\n\n".join(cleaned_paras)
    return title, full_text
