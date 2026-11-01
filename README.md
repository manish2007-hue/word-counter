# CleanWordCounter ✍️⚡

> A category-defining, privacy-first Online Word Counter & Writing Aid built with Astro, Tailwind CSS v4, and the Apple Design System. 100% client-side, zero server tracking, instant performance, and works offline as a PWA.

![CleanWordCounter Preview](https://raw.githubusercontent.com/manish2007-hue/word-counter/main/public/favicon.svg)

---

## ✨ Features

- **100% Client-Side Privacy**: All parsing, metrics, readability, and keywords calculation occur strictly in the browser. Zero bytes transmitted to any server.
- **Apple Design Language**: SF Pro typography, hairline borders, frosted glass blur headers, and smooth dark/light mode toggles.
- **Comprehensive Text Metrics**: Real-time counts for words, characters (with & without spaces), sentences, paragraphs, reading time (225 WPM), speaking time (130 WPM), and average word length.
- **Social Media Constraints Grid**: Live tracking across 10 publishing limits (X/Twitter, LinkedIn, Instagram, Google SEO, YouTube, TikTok, Reddit, Pinterest) with progress bars and remaining badges.
- **Multi-Formula Readability**: Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, Coleman-Liau Index, and Automated Readability Index (ARI).
- **Keyword Density & N-Gram Analyzer**: 1-word, 2-word, and 3-word n-gram frequency analysis with stop-word exclusion and density warning badges.
- **Academic Citation Filter**: Automatic isolation and exclusion of parenthetical citations (e.g. `(Smith, 2024)`, `[1-3]`) and end bibliographies to report official Net Essay word counts.
- **In-Browser Document Parsing**: Client-side parsing of `.docx` (via Mammoth.js), `.pdf` (via PDF.js), `.txt`, and `.md` with drag-and-drop support.
- **Offline PWA Support**: Installable Progressive Web App with service worker offline caching and local auto-save.
- **Case Transformations & Safe Clear**: One-click uppercase, lowercase, title case, sentence case conversions, and 2-step confirmation on clear.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/manish2007-hue/word-counter.git
cd word-counter

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 🛠️ Tech Stack

- **Framework**: [Astro 5](https://astro.build/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Document Parsers**: `mammoth` (browser bundle for .docx), `pdfjs-dist` (local worker for .pdf)
- **Design System**: Apple HIG (SF Pro typography, Action Blue `#0066cc`, Parchment `#f5f5f7`, deep dark `#000000`/`#1c1c1e`)
- **PWA**: Web App Manifest & Service Worker

---

## 🧪 Testing

CleanWordCounter includes automated unit, integration, and HTTP route verification suites:

```bash
# Run unit & integration tests
npx tsx tests/all-functions.test.ts

# Run live server route checks
npx tsx tests/server-routes.test.ts

# Production static build
npm run build
```

---

## 📄 License

MIT License. Free to use for personal and commercial projects.
