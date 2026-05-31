# Product Guidelines: freelance-site (nickfig.dev)

## Visual Branding & Theming
- **Color Scheme:** Strictly dark-mode-only to represent a modern developer console aesthetic. Employs a deep zinc background (`#09090b`) with a subtle noise/grain texture (3% opacity).
- **Accents:** Neon cyan/teal (`#2dd4bf`) is reserved for highlights, interactive links, availability indicators, and button fills.
- **Typography:** Uses high-contrast, premium font families:
  - *Serif/Display:* Playfair Display for headers.
  - *Sans/Body:* DM Sans for readable layout paragraphs.
  - *Mono:* DM Mono for tags, statistics, and metadata.

## Prose & Editorial Tone
- **Hybrid Voice:** A balanced mix of technical precision and approachable storytelling.
- **Clear & Outcome-Oriented:** Case studies should explicitly lay out the *problem*, *solution*, and quantifiable *outcomes/metrics* using bullet points and data callouts.
- **Conversational Tone:** Combines deep technical accuracy (naming specific frameworks/architectures) with a casual, developer-to-developer conversational approach to keep the reader engaged.

## User Experience & Motion Principles
- **Subtle Micro-interactions:** Use hardware-accelerated transitions. Every button/card should feel alive.
- **Elevation Lift:** Interactive cards scale up or translate upwards slightly (`hover:-translate-y-1`) accompanied by a soft teal drop-shadow.
- **Tactile Responses:** Buttons scale down (`active:scale-[0.98]`) upon click, mimicking physical controls.
- **Smooth Page Motion:** Employs `scroll-behavior: smooth` with `scroll-padding-top` offsets to prevent sticky nav coverage.

## Code Quality & Accessibility (a11y)
- **Semantic HTML:** Use appropriate HTML5 tags (`<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`) to facilitate screen readers.
- **Keyboard Navigation:** Focus states should be clearly visible, and interactive elements must remain fully focusable via Tab keys.
- **Tailwind & CSS Custom Properties:** Layout styles should leverage Tailwind v4 combined with central CSS variables (`var(--bg)`, `var(--accent)`) to maintain design tokens.
