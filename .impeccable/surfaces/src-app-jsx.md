---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: []
---

# PetVida Operations Dashboard

MODE: Operate. Primary target: `src/App.jsx`.

Audience: reception and clinical / grooming staff. Task: scan today's appointments, prevent resource conflicts, find pet context, and register a booking. Content: synthetic demonstration schedule, pets, staff, and service notes. Constraint: no real medical data, backend, authentication, calendar integration, or delivered reminders.

## Direction contract

THESIS: Replace the paper agenda with a shared service-ticket rail where the appointment, assigned person, pet, and care context stay together. Refuse the generic month calendar as the opening screen.

OWN-WORLD: A neighborhood clinic's practical work-order rack: hard-edged ticket slips, indexed time lanes, compact printed labels, and a calm paper-white field with deep green, coral, and signal-yellow used as distinct operational states. No faux-paper texture or medical claims.

STORY: Reception sees each slot, service, assigned staff member, pet, and synthetic care note at a glance; selecting a ticket exposes its complete appointment context. New bookings enter the rail immediately and a visible conflict warning blocks double-booking the same staff member.

FIRST VIEWPORT: Persistent left navigation; a compact clinic header with today's date and a prominent new-appointment action; an unmistakable synthetic-data notice; operational counts above a vertically scrollable time rail grouped by staff. Tickets show time, service, pet and guardian, assignee, and explicit status. The next-time marker and empty slots remain visible without scrolling on desktop.

FORM: Assigned candidate 3, service-ticket rack, seed key `10f7ef1b`; user skipped the direction-choice prompt, so this selection is an explicit exercise of the original request's delegated autonomy, not a claimed user preference. The clinical handoff-board pick remains the legibility benchmark. Raised by Alphabet Storm: every color state also has a text label. Raised by Tensegrity: resource assignments and collisions are visible. Raised by Racing: a clear time axis supports rapid scanning. Raised by Drum Machine: status changes are immediate and reversible. Raised by Character Catalog: pet identity is prominent, never ranked. Raised by Depot Blind: stopped or stale states remain explicit without animation.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
