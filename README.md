# daily.dev Learning Sprints ⚡

Turn passive saved bookmarks into active skill-building sprints. A gamified developer roadmap generator designed for the **daily.dev Hackathon**.

Built with Next.js 16 (App Router), React 19, Tailwind CSS, and Material Symbols.

---

## 🚀 Key Features

*   **Friction-Free Launchpad**: Explore immediately using the Sandbox mode by entering your daily.dev username, or connect securely via a **daily.dev API Personal Access Token (PAT)** to fetch live bookmarks.
*   **AI-Powered Clustering & Task Generation**: Groups related bookmarks into themed Sprints and generates structured, checkable tasks with rationales to reinforce knowledge.
*   **Premium Glassmorphic Dashboard**: A desktop-first, mobile-responsive layout built with an **Obsidian Neon** color palette, custom glows, and hover transition effects.
*   **Gamified Learning Analytics**: Track XP, developer level metrics, streak calendar triggers, and category-focused learning hour breakdowns.
*   **Sprint Completion modal**: Generates a share card (using canvas rendering) showcasing developer milestones, ready to download or share.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 16.2.6 (App Router, Turbopack support)
*   **Library**: React 19
*   **Styling**: Tailwind CSS & Vanilla Custom CSS Properties (`app/globals.css`)
*   **Icons**: Material Symbols Outlined
*   **Fonts**: Outfit (Google Fonts)
*   **Canvas Export**: `html2canvas` for PNG certificate downloads
*   **Local Persistence**: Client-side state managed via Context API and synced atomically with `localStorage`

---

## 📦 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Verify Production Compilation
Run Next.js build configuration checks:
```bash
npm run build
```

---

## 📱 Core Pages & Structure

*   `/` (Launchpad Onboarding): Input field for username quick-start or PAT token entry.
*   `/dashboard` (Sprint Overviews): Lists active learning tracks, overall stats strip, and contains the Floating Action Button (FAB) to create custom sprints.
*   `/sprint/[id]` (Action Center): Focused workspace detailing articles, checklists, rationales, and the "Regenerate Tasks" floating trigger.
*   `/dashboard/stats` (Analytics Screen): XP progression, levels, weekly streaks, category hours, and completed tracks archive.
*   `/dashboard/settings` (Profile Configuration): Manage developer username, avatar presets, sandbox data toggle, and sync API log outputs.
