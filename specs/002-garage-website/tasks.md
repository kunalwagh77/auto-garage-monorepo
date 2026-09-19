# Tasks: Garage & Car Repair Shop Website

**Input**: Design documents from `/specs/002-garage-website/`

**Prerequisites**: plan.md, spec.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure: `src/assets/images`, `src/assets/icons`
- [ ] T002 [P] Initialize `index.html` with basic HTML5 boilerplate and meta tags
- [ ] T003 [P] Create `style.css` with CSS reset and root variables (colors, fonts)
- [ ] T004 [P] Create `script.js` with basic console log for initialization check
- [ ] T005 [P] Source and place placeholder images in `src/assets/images/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure and layout shell

- [ ] T006 Implement responsive Header with mobile menu toggle in `index.html` and `style.css`
- [ ] T007 Implement Footer with contact info and social links
- [ ] T008 [P] Define `services.js` data structure with service names, descriptions, and prices
- [ ] T009 [P] Setup Lucide icons integration in `index.html`
- [ ] T010 Setup Flatpickr library inclusion in `index.html`

**Checkpoint**: Foundation ready - UI shell and data structures are in place.

---

## Phase 3: User Story 1 - Online Service Booking (Priority: P1) 🎯 MVP

**Goal**: Allow users to book an appointment with date/time selection.

**Independent Test**: Fill out form, select date/time, click "Book Now", and see success message.

### Implementation for User Story 1

- [ ] T011 [P] Create booking form section in `index.html` (Inputs: Name, Phone, Email, Service Select)
- [ ] T012 Style booking form in `style.css` (Responsive layout, validation states)
- [ ] T013 Implement `booking.js` to handle form submission and prevent default
- [ ] T014 Initialize Flatpickr in `booking.js` and link to date/time input field
- [ ] T015 Implement client-side validation for booking form in `booking.js`
- [ ] T016 Implement "Success/Thank You" message display after submission

**Checkpoint**: User Story 1 is fully functional and testable.

---

## Phase 4: User Story 2 - Price Estimation (Priority: P2)

**Goal**: Provide instant price estimates based on service selection.

**Independent Test**: Select services and verify the "Estimated Total" updates correctly.

### Implementation for User Story 2

- [ ] T017 Create Price Estimator UI in `index.html` (Checkbox/Select list for services)
- [ ] T018 Style Estimator UI in `style.css` (Hover states, total display)
- [ ] T019 Implement `estimator.js` to calculate total based on `services.js` data
- [ ] T020 Link Estimator UI changes to `estimator.js` calculation function
- [ ] T021 Update "Estimated Total" DOM element on every change

**Checkpoint**: User Story 2 is functional and integrated with service data.

---

## Phase 5: User Story 3 - Emergency Assistance & WhatsApp (Priority: P3)

**Goal**: Provide quick contact options via Phone and WhatsApp.

**Independent Test**: Click buttons and ensure they open the dialer/WhatsApp.

### Implementation for User Story 3

- [ ] T022 Create "Emergency Call" button in Header (Mobile-optimized)
- [ ] T023 Create floating WhatsApp button in `index.html`
- [ ] T024 Style contact buttons in `style.css` (Fixed positioning for WhatsApp, high contrast for Emergency)
- [ ] T025 Implement `tel:` and `wa.me` links with custom pre-filled messages

---

## Phase 6: User Story 4 - Services List & Reviews (Priority: P3)

**Goal**: Display services information and customer feedback.

**Independent Test**: Verify services and reviews are visible and responsive.

### Implementation for User Story 4

- [ ] T026 Create Services list section in `index.html` using a grid layout
- [ ] T027 Populate Services section dynamically from `services.js`
- [ ] T028 Create Customer Reviews section in `index.html` (Grid or simple slider)
- [ ] T029 Style Reviews section in `style.css` (Card layout)

---

## Phase 7: Polish & Performance

**Purpose**: Refinement and final optimization

- [ ] T030 [P] Implement smooth scroll for navigation links
- [ ] T031 Optimize all images and minify CSS/JS (if needed)
- [ ] T032 Final responsive testing on Chrome/Safari/Firefox (Mobile & Desktop)
- [ ] T033 Accessibility audit (Alt tags, contrast ratios, keyboard navigation)

---

## Dependencies & Execution Order

1. **Setup (Phase 1)** & **Foundational (Phase 2)** must be completed first.
2. **Phase 3 (Booking)** is the top priority for MVP.
3. **Phase 4 (Estimator)** can be built once `services.js` is defined.
4. **Phase 5 & 6** can be implemented in parallel.
5. **Phase 7** is the final step.
