## Plan: Bedtime Story Generator

**TL;DR**
A mobile-optimized web application to generate personalized bedtime stories and illustrations for a 4-year-old using the Gemini API, designed for an exhausted parent (quick inputs, dark mode, zero friction).

**Steps**
1. **Scaffold Project**: Initialize a Next.js (React) application with Tailwind CSS for fast mobile-first UI development.
2. **Setup API Routes**: Create secure backend API routes to communicate with the Gemini API (for text) and an Image Generation API (for illustrations) to keep keys hidden.
3. **Build UI - Input Form**: Create a simple, dark-mode optimized form with inputs for Theme/Setting, Supporting Characters, and a persistent "Hero Name" field (saved to local storage).
4. **Build UI - Story View**: Build a reading interface that displays the generated text in large, readable typography alongside generated illustrations.
5. **Integration**: Connect the frontend form to the API routes, adding loading states (essential for API wait times).
6. **Refinement**: Add error handling and polish the dark-mode aesthetic for nighttime reading.

**Relevant files**
- `src/app/page.tsx` — Main UI component (Form and Story display).
- `src/app/api/generate/route.ts` — Backend endpoint for Gemini & Image AI integration.
- `src/components/...` — Modular UI components (Input, Button, StoryCard).

**Verification**
1. Run local dev server and verify mobile responsiveness using browser dev tools.
2. Test API integration by generating a story with "Space" theme and "Dog" supporting character.
3. Verify Dark Mode styling is comfortable for nighttime reading.

**Decisions**
- **Platform**: Mobile Web App (Next.js).
- **APIs**: Gemini API for text generation. Image generation API (e.g., OpenAI DALL-E 3 or similar) for illustrations.
- **Scope**: MVP focuses on generating text + images. User authentication and saving past stories are excluded for now to prioritize core functionality.

**Further Considerations**
1. **Image API choice**: Gemini API (via Vertex AI) can do images (Imagen), or we can mix Gemini for text and OpenAI/Stability for images. What is your preference for image generation?
2. **State Management**: Do you want the app to save previously generated stories in the browser's local storage so you can re-read favorites?

---

### Product Requirement Document (PRD)

**1. Product Vision & Problem Statement**
* **Problem:** An exhausted parent needs a fresh, engaging bedtime story every night at 8 PM for their 4-year-old. The child wants to be the hero, and existing physical books have lost their novelty.
* **Vision:** A friction-free, mobile-web "Bedtime Story Generator" that requires minimal mental effort from the parent while delivering highly personalized, magical stories and illustrations on demand.

**2. Target Audience**
* **Primary User (Operator):** Exhausted parent (needs simple UI, big buttons, dark screen).
* **Primary Consumer:** 4-year-old child (needs engaging narrative, simple vocabulary, and visual illustrations).

**3. Core Features (MVP)**
* **Quick-Start Form:** Minimal inputs for "Theme/Setting" (e.g., Space, Forest) and "Supporting Characters" (e.g., pet dog, grandma).
* **Sticky Defaults:** The child's name (the Hero) is saved locally so the parent doesn't have to type it every night.
* **Story Generation:** Uses the Gemini API to craft a 3-5 minute, age-appropriate bedtime story featuring the inputs.
* **Illustration Generation:** Generates 1-2 images to accompany the story to show the child.
* **Nighttime Reading UI:** Dark mode by default, large typography for tired eyes, and easy scrolling.

**4. Out of Scope (For Now)**
* Audio/Text-to-Speech generation.
* User authentication / Cloud syncing.
* Complex branching narratives or interactive games.

---

### Software Requirement Specification (SRS)

**1. System Architecture**
* **Frontend:** Mobile-first web application using React (Next.js framework) and Tailwind CSS for rapid UI styling.
* **Backend:** Next.js Serverless API Routes (Node.js) to securely handle API keys and external requests without exposing them to the browser.
* **Storage:** Browser `localStorage` for saving the child's name, preferences, and potentially recent stories.

**2. Functional Requirements (FRs)**
* **FR1:** The system shall provide text inputs for Theme/Setting and Supporting Characters.
* **FR2:** The system shall store the Hero's name in `localStorage` upon first entry and auto-populate it on subsequent visits.
* **FR3:** The system shall send a structured prompt to the Gemini API and return a generated story of ~300-500 words.
* **FR4:** The system shall use an Image Generation API to produce at least one illustration based on the story's context.
* **FR5:** The system shall display a loading state (e.g., a "breathing" or "stars twinkling" animation) while waiting for the APIs, as generation can take several seconds.

**3. Non-Functional Requirements (NFRs)**
* **NFR1 (Usability):** The UI must be optimized for mobile portrait orientation.
* **NFR2 (Accessibility/Ergonomics):** The UI must default to a high-contrast Dark Mode to protect night vision in a dark bedroom. Typography must be at least 18px for readability.
* **NFR3 (Performance):** Time-to-interactive for the initial load should be under 2 seconds.