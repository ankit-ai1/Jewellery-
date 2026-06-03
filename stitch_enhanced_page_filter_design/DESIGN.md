---
name: Lumoria Design System
colors:
  surface: '#fdf9f2'
  surface-dim: '#dddad3'
  surface-bright: '#fdf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3ec'
  surface-container: '#f1ede6'
  surface-container-high: '#ebe8e1'
  surface-container-highest: '#e5e2db'
  on-surface: '#1c1c18'
  on-surface-variant: '#4e4639'
  inverse-surface: '#31302c'
  inverse-on-surface: '#f4f0e9'
  outline: '#7f7667'
  outline-variant: '#d1c5b4'
  surface-tint: '#775a19'
  primary: '#775a19'
  on-primary: '#ffffff'
  primary-container: '#c5a059'
  on-primary-container: '#4e3700'
  inverse-primary: '#e9c176'
  secondary: '#5e5f5d'
  on-secondary: '#ffffff'
  secondary-container: '#e0e0dd'
  on-secondary-container: '#626361'
  tertiary: '#605e5b'
  on-tertiary: '#ffffff'
  tertiary-container: '#a8a5a2'
  on-tertiary-container: '#3c3b39'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdea5'
  primary-fixed-dim: '#e9c176'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#5d4201'
  secondary-fixed: '#e3e2e0'
  secondary-fixed-dim: '#c7c6c4'
  on-secondary-fixed: '#1a1c1a'
  on-secondary-fixed-variant: '#464745'
  tertiary-fixed: '#e6e2de'
  tertiary-fixed-dim: '#cac6c2'
  on-tertiary-fixed: '#1c1b19'
  on-tertiary-fixed-variant: '#484644'
  background: '#fdf9f2'
  on-background: '#1c1c18'
  surface-variant: '#e5e2db'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.1em
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is anchored in the concept of "Effortless Radiance." It targets a discerning audience looking for accessible luxury—demi-fine pieces that bridge the gap between costume and high jewelry. The visual language is a blend of **Minimalism** and **High-Contrast Editorial**, creating an environment that feels spacious, curated, and timeless.

The UI should evoke a sense of calm confidence. By using generous whitespace and a restricted color palette, we allow the product photography to be the primary storyteller. The emotional response should be one of "quiet luxury": trustworthy, refined, and modern without being trendy.

## Colors

The palette is designed to mimic the materials of the brand: gold, silk, and stone.

- **Primary (Gold):** Used for calls to action, price highlights, and delicate decorative elements. It represents the warmth and value of the jewelry.
- **Secondary (Ivory/Off-White):** The primary background color. It is softer than pure white, providing a gallery-like warmth that feels more premium.
- **Tertiary (Deep Charcoal):** Used for primary text and high-contrast footers. It provides better legibility and a more modern feel than pure black.
- **Neutral (Warm Grey):** Used for secondary text, borders, and disabled states.

## Typography

This design system utilizes a high-contrast typographic pairing to establish hierarchy and brand character. 

**Libre Caslon Text** is reserved for headlines and editorial moments. Its classical proportions and sharp serifs communicate heritage and elegance. For large displays, tight tracking and slightly reduced line heights create a sophisticated "fashion magazine" feel.

**Manrope** is used for all functional UI, body copy, and labels. Its clean, geometric sans-serif nature ensures readability on small screens and keeps the interface feeling modern and accessible. All labels and overlines should use uppercase with generous letter spacing to maintain the premium aesthetic.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to ensure a curated, centered viewing experience that prevents the content from feeling "stretched" on ultra-wide monitors.

- **Grid:** A 12-column grid with a 24px gutter.
- **Rhythm:** An 8px linear scale drives all padding and margins.
- **Desktop:** Generous 64px outer margins to create a "frame" around the content.
- **Mobile:** Reflows to a 2-column grid for product listings to maximize image size, with 20px margins.

Whitespace is treated as a core design element, not just a separator. Content blocks are separated by significant vertical padding (80px - 120px) to allow each collection or product story to breathe.

## Elevation & Depth

To maintain a minimal and high-end feel, this design system avoids heavy drop shadows. Depth is achieved through:

- **Tonal Layering:** Using subtle shifts between the Ivory background and slightly darker containers for sections like "Quick View" or shopping bags.
- **Low-Contrast Outlines:** Buttons and cards use very thin (1px) borders in neutral or primary colors rather than shadows.
- **Intentional Overlaps:** Images may occasionally overlap containers or text slightly to create a physical, layered "scrapbook" or "lookbook" effect without needing 3D shadows.

## Shapes

The design system utilizes **Sharp (0)** corners for all primary containers, buttons, and input fields. This architectural approach reinforces the "modern luxury" aesthetic, feeling more intentional and bespoke than standard rounded web elements.

The only exception to this rule is for purely circular elements, such as color swatches or icon-only toggle buttons (e.g., "Add to Wishlist" heart icons), which should remain perfect circles.

## Components

### Buttons
Primary buttons are solid Deep Charcoal with Ivory text, or solid Gold with Tertiary text. They are strictly rectangular (sharp corners). Secondary buttons use a 1px border with no fill. All button labels use the `label-sm` style.

### Input Fields
Fields consist of a single 1px bottom border (minimalist style) or a full sharp-edged rectangle. Placeholder text uses the Neutral color.

### Cards
Product cards are borderless with the background matching the page. The focus is entirely on the product imagery. Information (title, price) is center-aligned beneath the image using a mix of Serif for the title and Sans-serif for the price.

### Chips/Tags
Used for "New" or "Best Seller" labels. These should be small, sharp-edged rectangles with high-contrast text and minimal padding, placed in the top-left corner of product images.

### Lists & Navigation
Navigation links use `label-sm` with a subtle 1px underline animation on hover. Lists in the footer are left-aligned with increased line height for a clean, vertical rhythm.