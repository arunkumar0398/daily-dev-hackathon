# daily.dev Learning Sprints — Technical Design Specification (DESIGN.md)

This document outlines the visual identity, UI/UX architecture, component designs, and styling tokens for **daily.dev Learning Sprints** (a premium, gamified developer productivity application that transforms passive bookmarked reading into active skill-building).

---

## 1. Brand Identity & Visual Language

**daily.dev Learning Sprints** is designed to feel cohesive with the developer-centric, premium dark aesthetic of daily.dev, but with a heightened focus on **action, progress, and gamification**. The visual system relies on glassmorphism, high-contrast neon accents, glowing state highlights, and tactile micro-interactions.

### 1.1 Color Tokens (Theme: Tech Dark / Obsidian Neon)

```css
:root {
  /* Brand Core */
  --color-bg-base: #0B0F19;         /* Rich Obsidian Blue-Gray */
  --color-bg-surface: #151C2C;      /* Translucent Deep Navy */
  --color-border-subtle: rgba(255, 255, 255, 0.08);
  --color-border-focus: #FF5A36;     /* daily.dev Signature Orange */

  /* Gradients & Accents */
  --gradient-primary: linear-gradient(135deg, #FF5A36 0%, #FF8A65 100%);  /* Core Orange Glow */
  --gradient-success: linear-gradient(135deg, #10B981 0%, #06B6D4 100%);  /* Progress / Complete Green */
  --gradient-indigo: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);   /* Tech / AI Indigo */
  --gradient-glass: linear-gradient(135deg, rgba(21, 28, 44, 0.6) 0%, rgba(15, 21, 34, 0.8) 100%);

  /* Neon Shadows (Glowing effects) */
  --shadow-glow-orange: 0 0 20px rgba(255, 90, 54, 0.25);
  --shadow-glow-success: 0 0 20px rgba(16, 185, 129, 0.25);
  --shadow-glow-indigo: 0 0 20px rgba(99, 102, 241, 0.25);
  --shadow-glass: 0 8px 32px 0 rgba(0, 0, 0, 0.4);

  /* Typography / Text Colors */
  --text-primary: #F9FAFB;          /* Off-white */
  --text-secondary: #9CA3AF;        /* Cool Gray */
  --text-muted: #6B7280;            /* Muted Gray */
  --text-accent: #FF5A36;
}
```

### 1.2 Typography
*   **Primary Font:** `Outfit`, sans-serif (imported from Google Fonts) - provides a modern, geometric tech-first look.
*   **Fallback Font:** `Inter`, system-ui, sans-serif.
*   **Font Weights:**
    *   `400` (Regular) for body copy.
    *   `500` (Medium) for UI labels, lists, and metadata.
    *   `600` (Semi-Bold) for subtitles and card headers.
    *   `700` (Bold) for hero statements and page titles.

### 1.3 Radii & Shadows
*   **Border Radius:**
    *   `8px` (Small): Checkboxes, badges, tags.
    *   `12px` (Medium): Small cards, buttons, input fields.
    *   `18px` (Large): Main content wrappers, sprint cards, dialogs.
*   **Glassmorphic Base:**
    ```css
    background: var(--gradient-glass);
    backdrop-filter: blur(12px);
    border: 1px solid var(--color-border-subtle);
    box-shadow: var(--shadow-glass);
    ```

---

## 2. Micro-Interactions & Animations

An interface that feels alive encourages developer completion. We implement three core animations:

### 2.1 Glow-Pulse Hover (For Dashboard Cards)
When hovering over an interactive sprint card, it subtly scales up and emits a background gradient glow.
```css
@keyframes glowPulse {
  0% { box-shadow: 0 0 10px rgba(99, 102, 241, 0.15); }
  50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.35); }
  100% { box-shadow: 0 0 10px rgba(99, 102, 241, 0.15); }
}
```

### 2.2 Task Complete Strike-Through & Check
Checking off a task triggers an instantaneous strikethrough animation with an emerald gradient reveal and a micro-confetti feedback trigger on the checkbox itself.
```css
@keyframes strikeReveal {
  from { width: 0%; }
  to { width: 100%; }
}
```

### 2.3 Shimmer Loading (For AI Ingestion)
While AI is categorizing bookmarks or generating tasks, the containers shimmer with a sleek, moving gradient.
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

## 3. UI Screens and Structural Mockups

### Screen 1: The Launchpad (Landing & Auth)
The landing page establishes immediate product value with a clean, high-impact presentation.

```
+--------------------------------------------------------------+
| [daily.dev Sprints]                         [Explore Demo]   |
+--------------------------------------------------------------+
|                                                              |
|       TURN PASSIVE SAVED ARTICLES INTO ACTIVE SKILL SPRINT    |
|   "daily.dev helps you discover content; we help you use it" |
|                                                              |
|       +---------------------------------------------+        |
|       | Enter daily.dev Personal Access Token (PAT) |        |
|       | [ e.g., dd_pat_xxxxxxxxxxxxxxxxxxxxxx   ]   |        |
|       |                                             |        |
|       | [--->  Import & Group Bookmarks ]           |        |
|       +---------------------------------------------+        |
|                                                              |
|        - Secure PAT Connection  - No signup required         |
+--------------------------------------------------------------+
```

*   **Interactive Demo Toggle:** For users who don't have their daily.dev PAT handy, a premium mock dataset is provided so they can test the app instantly.

---

### Screen 2: Sprints Dashboard
Once authenticated, the user is greeted by a central command center displaying metrics, active sprints, and a clean overview of progress.

```
+--------------------------------------------------------------+
| [daily.dev Sprints]    [User: Alex] [Streak: 4 🔥] [Disconnect] |
+--------------------------------------------------------------+
| OVERVIEW:  [Sprints Active: 2] [Tasks Done: 14/20] [Saved Hr: 8.5]|
+--------------------------------------------------------------+
| YOUR ACTIVE LEARNING SPRINTS                                 |
|                                                              |
| +-------------------------+     +--------------------------+ |
| | REACT PERFORMANCE       |     | SYSTEM DESIGN SPRINT     | |
| | 3 Articles | 9 Tasks    |     | 2 Articles | 6 Tasks     | |
| |                         |     |                          | |
| | Progress: 66% [====--]  |     | Progress: 33% [==----]   | |
| | [ Open Sprint -> ]      |     | [ Open Sprint -> ]       | |
| +-------------------------+     +--------------------------+ |
|                                                              |
| +-------------------------+                                  |
| | GENERAL TOPICS          |                                  |
| | 4 Articles | 12 Tasks   |                                  |
| | Progress: 0% [------]   |                                  |
| | [ Open Sprint -> ]      |                                  |
| +-------------------------+                                  |
+--------------------------------------------------------------+
```

---

### Screen 3: Sprint Action Center (Detail View)
The primary workspace where the developer reads and completes actions.

```
+--------------------------------------------------------------+
| [< Back to Dashboard]             Sprint: REACT PERFORMANCE  |
+--------------------------------------------------------------+
| SPRINT PROGRESS: 66% [===========-----] 6/9 Tasks Completed  |
|                                                              |
| +----------------------------------+-----------------------+ |
| | ARTICLES IN SPRINT               | TASK CHECKLIST        | |
| |                                  |                       | |
| | [Article 1]                      | [x] Measure render    | |
| | "Optimizing React Re-renders"    |     times with DevTools| |
| | Tag: React | 8 min read          | [x] Refactor a slow   | |
| |                                  |     map key index     | |
| | [Article 2]                      | [ ] Profile re-renders| |
| | "How useMemo Works Under the Hood"|     using dynamic memo| |
| | Tag: JS | 12 min read            |                       | |
| |                                  |                       | |
| | [Article 3]                      | [ ] Implement a memo  | |
| | "React 19 Compiler deep dive"    |     cache key comparison| |
| | Tag: React | 15 min read         | [ ] (Regenerate Tasks)| |
| +----------------------------------+-----------------------+ |
+--------------------------------------------------------------+
```

---

### Screen 4: Shareable Sprint Card ( payoff & Virality)
When a sprint reaches 100% completion, an overlay modal displays a highly styled shareable developer card.

```
+-------------------------------------------------------------+
|                        CONGRATULATIONS!                      |
|                  Sprint Completed Successfully!             |
+-------------------------------------------------------------+
|                                                             |
|   +-----------------------------------------------------+   |
|   |  daily.dev SPRINT CHAMPION                          |   |
|   |                                                     |   |
|   |  Alex has completed:                                |   |
|   |  [ REACT PERFORMANCE SPRINT ]                       |   |
|   |                                                     |   |
|   |  Stats achieved:                                    |   |
|   |  - 3 Advanced Articles Mastered                     |   |
|   |  - 9 Concrete Implementation Tasks Complete         |   |
|   |  - 4.2 Estimated Practice Hours Earned              |   |
|   |                                                     |   |
|   |  [Badges Earned]: [Performance Guru ⚡] [React Compiler] |   |
|   |                                                     |   |
|   |  Generated on Sprints.daily.dev                     |   |
|   +-----------------------------------------------------+   |
|                                                             |
|   [ Copy Card Image ]   [ Share to Twitter ]   [ Close ]    |
+-------------------------------------------------------------+
```

---

## 4. Component Library & CSS Specifications

### 4.1 Custom Checkbox Component
A sleek, glowing custom checkbox replacing standard browser defaults.

```html
<label class="custom-checkbox">
  <input type="checkbox" checked />
  <span class="checkmark"></span>
  <span class="label-text">Implement custom React compiler flags in next.config.js</span>
</label>
```

```css
.custom-checkbox {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 32px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-primary);
  user-select: none;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
  background-color: var(--color-bg-base);
  border: 2px solid var(--text-muted);
  border-radius: 6px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-checkbox:hover input ~ .checkmark {
  border-color: var(--color-border-focus);
}

.custom-checkbox input:checked ~ .checkmark {
  background: var(--gradient-success);
  border-color: transparent;
  box-shadow: var(--shadow-glow-success);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.custom-checkbox input:checked ~ .label-text {
  color: var(--text-muted);
  text-decoration: line-through;
  text-decoration-color: rgba(16, 185, 129, 0.6);
  transition: color 0.3s ease;
}
```

### 4.2 Sleek Sprint Card Container
The interactive cards displayed on the main dashboard.

```html
<div class="sprint-card">
  <div class="sprint-glow"></div>
  <div class="card-content">
    <div class="sprint-badge">React</div>
    <h3>React Performance Sprint</h3>
    <p>Master memoization, profiling, and server components.</p>
    <div class="progress-container">
      <div class="progress-bar" style="width: 66%;"></div>
    </div>
    <span class="progress-label">66% Completed</span>
  </div>
</div>
```

```css
.sprint-card {
  position: relative;
  background: var(--gradient-glass);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border-subtle);
  border-radius: 18px;
  padding: 24px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.sprint-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 90, 54, 0.3);
  box-shadow: var(--shadow-glow-orange), var(--shadow-glass);
}

.progress-container {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  margin-top: 16px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--gradient-success);
  border-radius: 3px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.sprint-badge {
  display: inline-block;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-accent);
  background: rgba(255, 90, 54, 0.1);
  border: 1px solid rgba(255, 90, 54, 0.2);
  border-radius: 20px;
  margin-bottom: 12px;
}
```
