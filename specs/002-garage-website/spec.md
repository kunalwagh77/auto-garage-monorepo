# Feature Specification: Garage & Car Repair Shop Website

**Feature Branch**: `002-garage-website`

**Created**: 2026-09-19

**Status**: Draft

**Input**: User description: "Create a feature spec for a modern, responsive HTML/CSS/JS Garage & Car Repair Shop website. Features must include: Garage Services list, Price estimator/calculator, Online Service Booking form with date/time picker, Customer Reviews section, Emergency Call button, and WhatsApp booking integration."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Online Service Booking (Priority: P1)

As a car owner, I want to book a service appointment online by selecting a date and time so that I don't have to call the garage during business hours.

**Why this priority**: Core value proposition for digital transformation; reduces administrative overhead for the garage and provides convenience for the customer.

**Independent Test**: Can be fully tested by filling out the booking form, selecting a valid date/time, and submitting. Success is confirmed by a "Booking Received" notification.

**Acceptance Scenarios**:

1. **Given** I am on the booking section, **When** I fill in my details, select a service, and pick a future date/time, **Then** the "Book Now" button should be enabled.
2. **Given** I have submitted a booking, **When** the submission is successful, **Then** I should see a confirmation message and receive a WhatsApp/Email notification (simulated).

---

### User Story 2 - Price Estimation (Priority: P2)

As a potential customer, I want to get an instant price estimate for common services (like oil change or brake pad replacement) so that I can budget for my car maintenance.

**Why this priority**: High conversion tool; transparency builds trust with new customers.

**Independent Test**: Can be tested by selecting different service combinations and seeing the "Estimated Total" update dynamically.

**Acceptance Scenarios**:

1. **Given** the price estimator tool, **When** I select "Oil Change" and "Standard Oil", **Then** the total price should reflect the sum of those items.
2. **Given** multiple selected services, **When** I deselect one, **Then** the total should decrease immediately.

---

### User Story 3 - Emergency Assistance (Priority: P3)

As a driver stranded on the road, I want to quickly find and use an "Emergency Call" button so that I can get immediate help.

**Why this priority**: Critical for roadside assistance conversion; requires high visibility and mobile-first accessibility.

**Independent Test**: Can be tested on a mobile device to ensure the button triggers the native dialer with the garage's phone number.

**Acceptance Scenarios**:

1. **Given** a mobile browser, **When** I tap the "Emergency Call" button, **Then** the phone's dialer should open with the garage's number pre-filled.

---

### User Story 4 - WhatsApp Integration (Priority: P3)

As a user who prefers messaging, I want to start a WhatsApp chat with the garage to ask specific questions or confirm my booking.

**Why this priority**: Low friction communication channel; popular for modern customer service.

**Independent Test**: Clicking the WhatsApp icon should redirect to the WhatsApp web/app with a pre-filled greeting message.

**Acceptance Scenarios**:

1. **Given** any page on the site, **When** I click the WhatsApp floating button, **Then** a new tab should open pointing to `wa.me` with a custom message.

### Edge Cases

- **Booking Overlap**: How does the system handle multiple users trying to book the same time slot? (Assumption: UI allows selection, but backend/manual confirmation handles conflicts).
- **Past Dates**: What happens if a user tries to select a date in the past for a booking? (System must disable past dates in the picker).
- **Missing Contact Info**: How does the system handle booking submissions with invalid phone numbers or missing emails? (Validation must prevent submission).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a comprehensive list of Garage Services (e.g., MOT, Servicing, Repairs, Tires).
- **FR-002**: System MUST include a dynamic Price Estimator that updates the total based on user selection.
- **FR-003**: System MUST provide a Booking Form with a Date/Time picker (using a library like flatpickr or native HTML5).
- **FR-004**: System MUST display Customer Reviews/Testimonials in a dedicated section (slider or grid).
- **FR-005**: System MUST have a prominent "Emergency Call" button fixed to the bottom or header on mobile.
- **FR-006**: System MUST integrate WhatsApp "Click to Chat" functionality.
- **FR-007**: System MUST be fully responsive and optimized for mobile, tablet, and desktop.
- **FR-008**: System MUST validate all form inputs (email, phone, required fields) before submission.

### Key Entities

- **Service**: Represents a type of repair or maintenance work (Name, Description, Base Price).
- **Booking**: Represents a customer's request (Customer Name, Phone, Vehicle Details, Service Type, Date, Time).
- **Review**: Represents customer feedback (Name, Rating, Comment, Date).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete a service booking in under 60 seconds.
- **SC-002**: The website achieves a Google Lighthouse score of 90+ for Performance and Accessibility.
- **SC-003**: 100% of "Emergency Call" and "WhatsApp" clicks successfully trigger the intended external application.
- **SC-004**: Price estimator updates in real-time (< 100ms delay) upon user selection change.

## Assumptions

- **Static Content**: Service prices and list are managed via a static JSON file or hardcoded for the initial prototype.
- **Booking Persistence**: Bookings are sent via email (formspree/netlfiy forms) or stored in local storage for the prototype; a full backend DB is out of scope for v1.
- **Time Slots**: Availability is not real-time synced with a garage management system; all future slots are technically "selectable" and subject to manual confirmation.
- **Images**: High-quality stock photography will be used for service representations.
