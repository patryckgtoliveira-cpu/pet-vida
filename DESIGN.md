---
name: PetVida Clínica
description: Sistema de operação para agenda veterinária e cuidado estético integrados.
colors:
  forest-deep: "#12382f"
  forest: "#17483b"
  lime-signal: "#d9ef81"
  care-coral: "#c34f43"
  care-blue: "#3d6d88"
  neutral-canvas: "#f5f7f2"
  neutral-paper: "#ffffff"
  neutral-ink: "#202b27"
  neutral-line: "#e1e8e1"
typography:
  display:
    fontFamily: "'Barlow Condensed', sans-serif"
    fontSize: "36px"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "normal"
  title:
    fontFamily: "'Barlow Condensed', sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "normal"
  body:
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif"
    fontSize: "9px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.neutral-paper}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "39px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "#23634e"
    textColor: "{colors.neutral-paper}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "39px"
    typography: "{typography.label}"
  button-quiet:
    backgroundColor: "{colors.neutral-paper}"
    textColor: "#526159"
    rounded: "{rounded.md}"
    padding: "0 10px"
    height: "35px"
    typography: "{typography.label}"
  nav-active:
    backgroundColor: "{colors.lime-signal}"
    textColor: "{colors.forest-deep}"
    rounded: "{rounded.md}"
    padding: "0 11px"
    height: "43px"
    typography: "{typography.label}"
  input-search:
    backgroundColor: "{colors.neutral-paper}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.sm}"
    padding: "0 9px"
    height: "34px"
  status-confirmed:
    backgroundColor: "#e7f2e6"
    textColor: "#356548"
    rounded: "{rounded.sm}"
    padding: "0 6px"
    height: "21px"
    typography: "{typography.label}"
  schedule-ticket:
    backgroundColor: "{colors.neutral-paper}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.sm}"
    padding: "7px 15px"
    height: "59px"

# Design System: PetVida Clínica

## Overview

**Creative North Star: "A Clinic's Ticket Rail"**

The interface treats the appointment as a working ticket rather than a detached calendar cell. Time, service, pet, responsible person, staff assignment, and current state travel together so reception can scan a busy day without losing the care context.

The system pairs a practical work surface with a neighborhood-clinic palette: deep forest anchors navigation, white and a cool green-tinted canvas hold dense information, and coral, blue, lime, and yellow distinguish operational states. The visual language comes from clear labels, short rows, and a restrained type contrast, not faux paper or decorative medical imagery.

**Key Characteristics:**
- Appointment-first information hierarchy.
- Distinct color roles paired with readable state labels.
- Dense schedule rows balanced by an unhurried page rhythm.
- Clear synthetic-data notices wherever demonstration content appears.

## Colors

Deep greens carry the persistent workspace; the lighter surfaces keep repeated schedule information calm and legible, while accent colors separate service and status roles.

### Primary
- **Deep Forest** (`{colors.forest-deep}`): persistent navigation and the brand anchor.
- **Clinic Green** (`{colors.forest}`): primary actions and selected work states.

### Secondary
- **Care Coral** (`{colors.care-coral}`): grooming and time-marker accents.
- **Care Blue** (`{colors.care-blue}`): clinical and informational states.
- **Signal Lime** (`{colors.lime-signal}`): active navigation and emphasis against deep green.

### Neutral
- **Operational Canvas** (`{colors.neutral-canvas}`): the page field around work panels.
- **Clean Surface** (`{colors.neutral-paper}`): schedule, forms, and directories.
- **Graphite Ink** (`{colors.neutral-ink}`): primary reading color.
- **Quiet Rule** (`{colors.neutral-line}`): separators and structural borders.

**The Labeled State Rule.** Color reinforces a state; readable text always names it.

## Typography

**Display Font:** Barlow Condensed (with sans-serif fallback)  
**Body Font:** DM Sans (with Segoe UI fallback)  
**Label/Mono Font:** No separate mono face; labels use the body family.

**Character:** Condensed display headings conserve space and give the dashboard a clear voice. DM Sans handles forms, names, metadata, and longer reading with compact, neutral clarity.

### Hierarchy
- **Display** (600, 36px, 1.06): main page heading; reduced to 32px on narrow screens.
- **Headline** (600, 25px, 1): selected pet or record name.
- **Title** (600, 22px, 1.1): schedule and directory section headings.
- **Body** (400, 12px, 1.5): supporting copy and normal reading.
- **Label** (700, 9px, 1.3): compact metadata, filters, and status labels.

**The Two-Face Rule.** Use Barlow Condensed for hierarchy and DM Sans for all operational detail; do not introduce a third display voice.

## Layout

The desktop workspace uses a persistent 246px navigation rail beside a fluid content area. Within the schedule, a wide ticket list shares space with a 274–310px context panel. Content padding scales with the viewport; repeated appointments remain chronological and aligned by metadata. At 980px the context panel moves below the schedule, and at 720px the sidebar becomes a compact horizontal navigation. Ticket columns simplify on small screens to retain time, pet, state, and the detail affordance. The principal responsive breakpoints are 1240px, 980px, and 720px.

## Elevation & Depth

The system is primarily flat. Thin neutral borders, background shifts, and clear grouping separate the schedule and context panel; shadows are not used to imply floating cards. Focus uses a visible lime outline, and search fields add a restrained green-tinted ring when active.

**The Border-First Rule.** Separate operational surfaces with a fine border or a tonal shift, not a stack of shadows.

## Shapes

Controls use compact 4–6px corners; work panels and schedule containers use 5–8px corners. Avatars are circular, while appointment tickets remain rectangular rows with a selected-state inset marker. Avoid oversized pill shapes for primary navigation or repeated content.

## Components

### Buttons
- **Shape:** compact corners (6px); primary height is 39px.
- **Primary:** Clinic Green surface with white text and a 14px horizontal inset.
- **Hover / Focus:** green deepens on hover; keyboard focus receives a 3px lime outline with a 2px offset.
- **Quiet / Complete:** white or pale-green surface with a thin neutral or green border.

### Chips
- **Style:** small, legible labels with a soft role-tinted background and dark text.
- **State:** selected filters use pale green plus a visible border; appointment states always include their text label.

### Cards / Containers
- **Corner Style:** 5–8px.
- **Background:** white surface on the green-tinted canvas.
- **Shadow Strategy:** flat, separated by a fine border.
- **Internal Padding:** 12–20px according to the density of the task.

### Inputs / Fields
- **Style:** white fill, neutral 1px border, 5px corners, compact 34–35px height.
- **Focus:** green border and a restrained pale-green outer ring.
- **Error:** explicit alert text on pale coral with an icon; preserve the entered values.

### Navigation
- **Style:** persistent deep-green rail on desktop, horizontal dark-green band on mobile.
- **Active:** lime surface with deep-green text; inactive items remain readable and gain a tonal hover state.

### Appointment Ticket
Time, service, pet, staff, and state form one selectable row. The selected row gets a pale-green field and a narrow inset green marker; mobile keeps the time, pet, state, and chevron visible.

## Do's and Don'ts

### Do:
- **Do** keep status text visible beside its color treatment.
- **Do** place service, pet, time, and assigned professional in the same appointment row.
- **Do** label synthetic records and unconnected capabilities wherever they appear.
- **Do** retain the full keyboard focus outline and reduced-motion preference.

### Don't:
- **Don't** make color the only way to recognize a booking state.
- **Don't** present demonstration notes as a real medical history or reminder.
- **Don't** replace the operational ticket list with decorative metric cards or faux-paper textures.