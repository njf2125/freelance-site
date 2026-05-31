# Specification: Finalize Site Polish and Analytics Integration

## Goal
Improve visual polish, dynamic customization, and user engagement across the freelance landing page, and integrate basic Cloudflare web analytics.

## Scope
1. **Dynamic Config:**
   - Centralize availability status, pricing rate, max clients, and Cloudflare analytics token in `src/config/site.ts`.
   - Update `src/app/page.tsx` and `src/app/about/page.tsx` to read from the site config.
2. **Cloudflare Analytics:**
   - Render Cloudflare web analytics tag in `src/app/layout.tsx` if token exists.
3. **UX & Interactive Polish:**
   - Add smooth scrolling and scroll padding top in `src/app/globals.css`.
   - Add card hover translation and glow shadow transforms in `src/components/WorkCard.tsx` and `src/app/page.tsx`.
   - Add button active-state scale down haptic-scaling in pages and layouts.
   - Add fade-in CSS transitions for contact form statuses.
