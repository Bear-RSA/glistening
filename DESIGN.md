---
name: Glistening
description: Sulphate-free haircare, written in lipstick on a steamed bathroom mirror.
colors:
  mint: "#8ccbb6"
  grout: "#e9f5ef"
  cocoa: "#3a1e16"
  cocoa-soft: "#5b382d"
  lipstick: "#7d3329"
  glass-hi: "#eef4f2"
  glass-mid: "#cfdcd8"
  glass-lo: "#aebfbb"
  butter: "#f7e27c"
  butter-deep: "#e9cd55"
  porcelain: "#f8fbf9"
typography:
  display:
    fontFamily: "Caveat Brush, Segoe Print, cursive"
    fontSize: "clamp(4.2rem, 13vw, 11.5rem)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "0"
  script:
    fontFamily: "Caveat Brush, Segoe Print, cursive"
    fontSize: "clamp(2.6rem, 4.2vw, 3.4rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0"
  headline:
    fontFamily: "Gabarito Variable, Gabarito, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.4rem + 4.2vw, 5.4rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  lead:
    fontFamily: "Gabarito Variable, Gabarito, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 1rem + 2.6vw, 3.1rem)"
    fontWeight: 750
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Gabarito Variable, Gabarito, system-ui, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 750
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Gabarito Variable, Gabarito, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 0.98rem + 0.3vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Gabarito Variable, Gabarito, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1
rounded:
  plaque: "4px"
  note: "2px 2px 3px 14px / 2px 2px 3px 6px"
  table: "8px"
  slab: "10px"
  frame: "14px"
  mirror: "clamp(22px, 3vw, 40px)"
  round-mirror: "50%"
spacing:
  tile: "56px"
  tile-small: "44px"
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(110px, 14vw, 180px)"
components:
  nav-plaque:
    backgroundColor: "{colors.porcelain}"
    textColor: "{colors.cocoa}"
    typography: "{typography.label}"
    rounded: "{rounded.plaque}"
    padding: "0 18px"
    height: "50px"
  nav-plaque-hover:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.cocoa}"
  sticky-cta:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.lipstick}"
    typography: "{typography.script}"
    rounded: "{rounded.note}"
    padding: "34px 22px 20px"
    width: "clamp(190px, 20vw, 250px)"
  sticky-step:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.cocoa}"
    typography: "{typography.body}"
    rounded: "{rounded.note}"
    padding: "34px 28px 30px"
  porcelain-slab:
    backgroundColor: "{colors.porcelain}"
    textColor: "{colors.cocoa}"
    rounded: "{rounded.slab}"
    padding: "clamp(36px, 6vw, 84px)"
  photo-frame-placeholder:
    textColor: "{colors.cocoa-soft}"
    rounded: "{rounded.frame}"
---

# Design System: Glistening

## Overview

**Creative North Star: "The Steamed Mirror"**

Every surface is a fixture in one small bathroom. The ground is a wall of glazed mint tiles with white grout; the main surface is silvered glass that has fogged over, and the brand's voice is written on it in waxy lipstick. Actions are butter-yellow sticky notes taped to the glass or the wall. Products stand on glass shelves. Nothing on the page is a generic web panel: if a new element cannot be named as a bathroom object, it does not belong yet.

The world is warm and close, not clinical. Two voices share the page: a hand (lipstick script, tilted, streaky) and a set voice (a round, heavy grotesk in cocoa). The hand speaks in short lowercase lines; the set voice carries explanations and instructions. Depth is physical and soft: things hang, lean, and cast diffuse shadows onto tile. The palette holds to mint, cocoa, and glass silver, with butter reserved for anything you can press.

The one live behaviour is steam: the visitor wipes the glass with a pointer or finger, the fog slowly returns, and the page wipes one streak itself on load. Motion otherwise stays small and settles quickly.

**Key Characteristics:**
- Glazed mint tile wall on a 56px grid (44px under 640px) as the ground for every section.
- Fogged, bevelled mirror glass as the primary surface; a round mirror closes the page.
- Lipstick script (Caveat Brush, masked for streaky coverage) for the brand voice only.
- Gabarito in cocoa for all set text, heavy and tight at headline sizes.
- Butter sticky notes, taped and slightly rotated, as the only action surfaces.
- Glass shelves as rails for products.
- Soft, warm-tinted drop shadows; no hard edges of shadow anywhere.

## Colors

Three values carry the world (mint tile, cocoa ink, glass silver), with lipstick for the hand and butter for the press.

### Primary
- **Lipstick Cocoa-Rose** (lipstick): the brand's hand. Display script, sticky-note headings, step numerals, the heart, strike-throughs on the "before" column, and bullets on the "after" column. Always rendered through the waxy noise mask, never as a flat fill.

### Secondary
- **Sticky-Note Butter** (butter): the action colour. Sticky-note fill, nav plaque hover, the skip link, text selection, and the footer wordmark. If it is butter, it can be pressed or it is a note.
- **Butter Shadow Edge** (butter-deep): only the bottom 20% of a sticky note's gradient, where the paper curls.

### Neutral
- **Glazed Mint Tile** (mint): the wall. Page background, scrollbar track, and (mixed 45% into porcelain) the "after" column tint.
- **White Grout** (grout): 2px grout lines on the tile wall.
- **Cocoa Ink** (cocoa): all set text, focus outlines, bottle caps, footer ground.
- **Soft Cocoa** (cocoa-soft): secondary set text (body paragraphs in slabs and notes, location line, placeholders, scrollbar thumb, comb).
- **Glass High / Mid / Low** (glass-hi, glass-mid, glass-lo): the mirror's 165deg silver gradient, top-left bright to bottom-right dim. Used only on mirror glass.
- **Porcelain** (porcelain): large white tiles for content slabs, nav plaques, comparison columns, bottle labels, footer links.

### Named Rules
**The Three-Value Rule.** Mint, cocoa, and glass silver make up the page. Lipstick and butter are accents; neither may become a section ground.

**The No-Cream Rule.** Whites lean cool (porcelain, grout, glass). No cream, ivory, or beige surfaces; the warmth comes from cocoa and butter alone.

**The Butter-Means-Press Rule.** Butter appears on action surfaces, hover states, and selection. Do not use it for decoration or information.

## Typography

**Display Font:** Caveat Brush (with Segoe Print, cursive)
**Body Font:** Gabarito Variable (with Gabarito, system-ui, sans-serif)

**Character:** A lipstick hand over a round, sturdy grotesk. The script is loose and rotated; the grotesk is heavy, tight-tracked, and level, so the two never compete.

### Hierarchy
- **Display** (Caveat Brush 400, clamp(4.2rem, 13vw, 11.5rem), 0.86): the mirror message, rotated -3deg. One per page. The closing round mirror uses a smaller lipstick headline (clamp(2.6rem, 1.6rem + 3.8vw, 4.8rem), 0.9).
- **Script** (Caveat Brush 400, clamp(2.6rem, 4.2vw, 3.4rem), 0.9): sticky-note calls to action ("dm to order"), step numerals at 4rem, short asides at 1.6 to 2.4rem.
- **Headline** (Gabarito 800, clamp(2.6rem, 1.4rem + 4.2vw, 5.4rem), 0.95, -0.04em): section titles on the wall. Inside the porcelain slab it steps down to clamp(2.4rem, 1.4rem + 3.6vw, 4.6rem), 0.98, -0.035em.
- **Lead** (Gabarito 750, clamp(1.6rem, 1rem + 2.6vw, 3.1rem), 1.04, -0.02em): the promise line under the display, max 19ch (15ch on small screens).
- **Title** (Gabarito 750, 1.4 to 1.45rem, -0.015em): step and product names. Comparison list items run larger at clamp(1.3rem, 1rem + 1vw, 1.75rem), weight 650.
- **Body** (Gabarito 400, clamp(1.0625rem, 0.98rem + 0.3vw, 1.1875rem), 1.55): explanations, max 62ch. The first paragraph of a body block may step to 500 in full cocoa.
- **Label** (Gabarito 600, 0.95rem): nav plaques and the footer.

### Named Rules
**The Lipstick-Is-Voice Rule.** Caveat Brush is for things the brand would write by hand: the mirror message, note calls to action, numerals, short asides. Never for explanations, instructions longer than a line, or labels.

**The Waxy Coverage Rule.** Lipstick text always carries the fractal-noise mask (260px tile) and gets padded room (0.12em sides, 0.32em below) so swashes and descenders are not clipped.

**The Hook-Title-Promise Rule.** On a mirror, lines run in a fixed three-tier order: lipstick hook, set promise, small location/meta line. Do not add a fourth tier above the hook.

## Layout

The wall is a square tile grid: 56px tiles with 2px grout, dropping to 44px under 640px. The header sits on the top course of tiles and is exactly one tile tall. Content columns cap at 1440px for the hero and 1240px for sections, with a fluid gutter of clamp(16px, 4vw, 48px). Sections sit far apart on the wall (clamp(110px, 14vw, 180px)) so each reads as a separate fixture.

The hero mirror fills roughly the first viewport (min-height clamp(480px, 100svh - 236px, 760px)), with its glass shelf directly beneath. The porcelain slab uses large tiles at three wall tiles (168px). Product frames sit in a three-column grid on one continuous glass shelf; under 640px they go to two columns, with the last centred. Sticky-note steps run three across with staggered rotation and vertical offset, collapsing to one column (max 460px, offsets removed) under 900px. Under 900px the section nav hides and only the Instagram plaque stays.

## Elevation & Depth

Depth is physical: objects hang on the wall or lean on glass and cast soft, warm-tinted drop shadows with a negative spread, so the shadow sits under the object rather than around it. The mirror reads as bevelled glass through stacked inset rings (dark hairline, 4px bright bevel, faint second line, inner vignette). Glass shelves are lit gradients with their own soft shadow below. There are no flat material-style elevation levels.

### Shadow Vocabulary
- **Soft hang** (`box-shadow: 0 18px 40px -18px rgb(30 60 50 / 0.45), 0 4px 10px -4px rgb(30 60 50 / 0.25)`): mirrors and the porcelain slab, anything fixed to the wall.
- **Note** (`box-shadow: 0 14px 22px -12px rgb(58 30 22 / 0.45), 0 2px 4px rgb(58 30 22 / 0.12)`): sticky notes at rest; lifts to `0 24px 30px -14px rgb(58 30 22 / 0.5)` on hover.
- **Mirror bevel** (`inset 0 0 0 1px rgb(40 70 62 / 0.45), inset 0 0 0 4px rgb(255 255 255 / 0.85), inset 0 0 0 5px rgb(40 70 62 / 0.18)`): every mirror edge, rectangular or round.
- **Plaque** (`inset 0 0 0 1px rgb(255 255 255 / 0.9), inset 0 -2px 0 rgb(60 110 95 / 0.15), 0 1px 2px rgb(30 60 50 / 0.18)`): glazed nav plaques, barely raised from the wall.

### Named Rules
**The Tinted Shadow Rule.** Shadows are tinted by what they fall on: deep mint-green on the wall, cocoa under paper. Never neutral black, never hard-edged or offset without blur.

## Shapes

Shapes follow the objects they stand for. Mirrors are generously rounded (clamp(22px, 3vw, 40px)) or fully round. Sticky notes are nearly square with one curled corner (2px 2px 3px 14px / 2px 2px 3px 6px), topped with a translucent tape strip rotated -3deg. Plaques are tight 4px tiles; porcelain slabs 10px; empty photo frames 14px with a 2px dashed cocoa line. Rotation is native to the world: notes and lipstick lean between -4deg and 4deg, while set text and tiles stay level.

## Components

### Buttons (Sticky Notes)
Taped paper, slightly askew, the only things that look pressable.
- **Shape:** near-square with a curled bottom-left corner (rounded.note), tape strip 72 by 24px at the top.
- **Primary (mirror CTA):** butter gradient to butter-deep at the bottom, lipstick script heading, Gabarito 700 sub-line with an arrow, rotated 4deg, 34px 22px 20px padding. On load it drops in from -18px and 12deg over 0.9s.
- **Hover / Focus:** straightens to 1deg and lifts 4px with a deeper note shadow over 0.35s on the ease-out curve (cubic-bezier(0.16, 1, 0.3, 1)); the arrow slides 4px. Focus is a 3px cocoa outline at 3px offset.
- **Secondary (closing note):** 220px wide, rotated -3deg, straightens to 0deg on hover.

### Cards / Containers
- **Porcelain slab:** large white tiles (three wall tiles) with soft grout, 10px corners, soft hang shadow, two-column grid that stacks under 900px.
- **Comparison table:** two porcelain columns separated by a 2px gutter, 8px corners. The "before" column strikes items through in lipstick; the "after" column is tinted mint and bullets items with lipstick dots.
- **Step notes:** sticky notes holding a lipstick numeral, a title, and soft-cocoa body.

### Navigation
- **Style:** glazed porcelain plaques one tile tall (tile minus 6px, 2px off the grout), 4px corners, Gabarito 600 at 0.95rem, 6px apart. The lowercase script wordmark sits at the left of the same course.
- **Hover:** plaque turns butter and rises 1px.
- **Mobile:** section plaques hide under 900px; the Instagram plaque remains and drops its text label under 640px.

### Mirror (Signature)
Bevelled silver glass with a blurred reflection of tiles, a window, and a lamp behind a canvas of fog (rgb(236, 242, 240) at 0.86 opacity, with faint droplets). The pointer wipes it with a soft radial brush; touch and pen wipe only while pressed. The fog grows back at 0.5% per frame while the mirror is on screen. One automatic wipe crosses the glass 700ms after load. With reduced motion, there is no auto-wipe and no regrowth. The closing round mirror uses the same glass with still, pre-wiped fog.

### Glass Shelf (Signature)
A 14 to 18px lit glass edge (white to pale mint to deep mint gradient) with a soft green shadow. Products and product frames stand on it; the hero shelf carries illustrated bottles and a comb.

## Do's and Don'ts

### Do:
- **Do** set every new section on the mint tile wall and name the bathroom object it is (mirror, slab, note, shelf, plaque).
- **Do** route every action through a butter sticky note or a butter hover state.
- **Do** keep lipstick lines short and lowercase, masked, padded, and rotated within -4deg to 4deg.
- **Do** keep set text in Gabarito on cocoa or soft cocoa, level and tightly tracked at headline sizes.
- **Do** tint shadows by surface (mint-green on wall, cocoa under paper), with blur and negative spread.
- **Do** respect reduced motion: no auto-wipe, no fog regrowth, no note drop-in, no smooth scroll.

### Don't:
- **Don't** use cream, ivory, or beige surfaces; whites stay cool (porcelain, grout, glass).
- **Don't** set explanations, labels, or multi-line instructions in Caveat Brush.
- **Don't** render lipstick as a flat, unmasked fill.
- **Don't** use butter for decoration or as a section ground.
- **Don't** use hard-edged or untinted black shadows.
- **Don't** add a small label line above the lipstick hook; the mirror's hierarchy is hook, promise, meta.
