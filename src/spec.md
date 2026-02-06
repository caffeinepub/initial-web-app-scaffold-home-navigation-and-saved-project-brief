# Specification

## Summary
**Goal:** Apply Dawateiqra Organization branding (logo, app title, favicon) and improve the Internet Identity login experience to be retryable with clear English feedback.

**Planned changes:**
- Add the provided Dawateiqra logo as a static asset and generate square icon variants for app usage.
- Update the top navigation brand area to show the logo next to the app name (replacing the current text-only branding) and update the app title text to a Dawateiqra Organization English title.
- Set the browser favicon (and other standard web app icons used by the frontend) to the generated Dawateiqra icon assets.
- Improve Internet Identity login UX: when login fails or gets stuck, show a clear English error message and provide a “Try again” action that can clear stored identity/bad state and retry without a page refresh.

**User-visible outcome:** Users see Dawateiqra Organization branding in the navbar and browser tab, and can retry Internet Identity login from the UI with clear English error messaging if a login attempt fails or gets stuck.
