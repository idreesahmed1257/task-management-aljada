# Employee Task Management Dashboard — Theme

## 1. Design Direction

Use a premium modern office/operations theme.

The visual language should feel like an internal enterprise product used by a technology company: precise, calm, information-dense, polished, and professional.

Avoid:

- Generic Bootstrap-looking layouts.
- Excessive gradients.
- Neon colors.
- Oversized typography.
- Excessive rounded cards.
- Excessive shadows.
- Decorative UI with no functional purpose.

Prefer:

- Strong hierarchy.
- Dense but breathable information layout.
- Subtle borders.
- Soft surface elevation.
- Clear status colors.
- Professional data tables.
- Refined form controls.
- Consistent spacing.

## 2. Color System

Primary:

- Ink: `#172033`
- Deep Navy: `#1F2A44`
- Slate: `#536176`
- Muted Slate: `#7A879A`

Background:

- App Background: `#F4F6F9`
- Surface: `#FFFFFF`
- Surface Subtle: `#F8FAFC`
- Border: `#E2E7EF`

Accent:

- Primary Blue: `#315EFB`
- Primary Hover: `#2549D8`

Semantic:

- Success: `#16845B`
- Success Background: `#EAF7F1`
- Warning: `#B7791F`
- Warning Background: `#FFF7E6`
- Danger: `#C63D4F`
- Danger Background: `#FDEDEF`
- Info: `#2563A8`
- Info Background: `#EAF2FB`

Do not use semantic colors as the main brand color. They are reserved for state communication.

## 3. Typography

Use a modern professional font pairing.

Primary UI font:

`Inter`

Display/heading font:

`Plus Jakarta Sans`

Use a clear type scale:

- Page title: 28–32px, semibold.
- Section title: 18–22px, semibold.
- Body: 14–15px.
- Secondary text: 13px.
- Table metadata: 12–13px.
- Button labels: 13–14px, semibold.

Use `font-variant-numeric: tabular-nums` for dashboard statistics and numerical table data where appropriate.

## 4. Layout

Desktop:

- Fixed left sidebar around 240–260px.
- Top header inside the content region.
- Main content max-width around 1440px.
- 24px page padding.
- 24px primary grid gaps.

Mobile:

- Sidebar becomes a drawer or compact navigation.
- Header remains accessible.
- Dashboard cards become a responsive grid.
- Tables become horizontally scrollable or transform into stacked records.

## 5. Navigation

Primary navigation:

- Dashboard
- Employees
- Tasks

Secondary actions:

- User/account menu.
- Logout.

Active navigation should use a subtle filled surface and clear accent indicator rather than a loud color block.

## 6. Cards

Cards should use:

- White surface.
- 1px border.
- 10–14px radius.
- Minimal shadow.
- Consistent internal padding.

Do not make every UI element a card.

## 7. Status Presentation

Pending:

- Amber semantic styling.

In Progress:

- Blue semantic styling.

Completed:

- Green semantic styling.

Statuses should be represented using compact badges with text, not color alone.

## 8. Priority Presentation

High:

- Strong red/danger text.

Medium:

- Amber/warning text.

Low:

- Neutral/slate styling.

## 9. Tables

Tables should feel like an operations console.

Requirements:

- Clear column alignment.
- Sticky header where useful.
- Row hover state.
- Compact but readable row height.
- Action menu at the right.
- Status and priority badges.
- Date formatting consistent throughout the application.

## 10. Forms

Forms should use:

- Clear labels.
- Helpful placeholders only where necessary.
- Visible validation errors.
- Consistent field height.
- Focus ring using the primary blue.
- Primary action on the right.
- Cancel action as secondary/ghost.

Use modal dialogs for short employee/task forms when appropriate. Avoid very large modal forms.

## 11. Icons

Use a consistent icon library such as Lucide React.

Icons must support the interface rather than replace text where the action may be ambiguous.

## 12. Motion

Keep motion subtle:

- 120–180ms transitions.
- Button hover/focus transitions.
- Drawer/modal transitions.
- Avoid animated dashboard statistics unless they provide value.

## 13. Accessibility

- Keyboard accessible controls.
- Visible focus states.
- Semantic buttons.
- Labels connected to inputs.
- Sufficient contrast.
- Do not communicate status using color alone.
