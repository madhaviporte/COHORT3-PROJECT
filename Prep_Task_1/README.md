# PrepTrack — Weekly Assignment Management Dashboard

PrepTrack is a single-page React dashboard for tracking weekly interview-preparation assignments. Every week keeps its own independent copy of the four default practice sections, plus any custom sections and tasks you add. Everything is stored locally in the browser, so the app works with no backend, account or network connection after the first load.

The interface uses a consistent dark developer-dashboard theme across the week list, week overview, all section workspaces, forms, modals, dropdowns, empty states and confirmation dialogs.

---

## Features

### Weekly assignment management

- Create unlimited weeks.
- Each new week is generated automatically with all four default sections.
- Edit a week's title and description.
- Delete a week behind a confirmation dialog.
- Switch between weeks from the dashboard or the sidebar.
- Duplicate week titles and duplicate `Week N` numbers are rejected.
- Empty state and a guided first-week action when no weeks exist.
- Dashboard statistics aggregate progress across every saved week.

### 1. DSA Practice

- Add, edit and delete problems.
- Store title, topic, difficulty (Easy / Medium / Hard) and an optional problem link.
- Mark problems solved / unsolved.
- Live solved count and progress bar.

### 2. Git & GitHub Interview

- Seeded with five scenario-based Git questions and full answers.
- Expand and collapse answers.
- Add, edit and delete questions, answers and notes.
- Mark questions as Reviewed; review progress is persisted.

### 3. Full Stack Technical Interview

- Seeded with five full-stack questions and detailed answers.
- Expand and collapse answers.
- Add, edit and delete questions, answers and notes.
- Mark questions as Reviewed; review progress is persisted.

### 4. Frontend Machine Coding Tracker

- Add, edit and delete practice questions.
- Category: DSA, Git, Technical.
- Difficulty: Easy, Medium, Hard.
- Status: Pending, In Progress, Completed.
- Search by question title.
- Combine category, difficulty and status filters, plus a one-click reset.
- Separate empty state and "no matching questions" state.
- Inline status editing updates dashboard statistics immediately.

### Custom sections and topics

- Create, rename and delete custom sections per week (e.g. Aptitude, System Design, HR).
- Add, edit and delete tasks inside each section.
- Tasks support a description/answer, an optional resource link and completion status.
- Sections can be collapsed and show their own progress.
- Duplicate section names within a week are rejected.

### UI and accessibility

- Dark theme built on CSS custom properties.
- Responsive sidebar that becomes an off-canvas drawer with backdrop on small screens.
- Keyboard-closable modals (`Escape`), labelled form fields, `aria-*` state on tabs, accordions, progress bars and icon-only buttons.
- Reduced-motion support and visible focus outlines.
- No horizontal overflow at mobile, tablet, laptop or desktop widths.

---

## Technologies

- **React 19** (function components and hooks)
- **Vite 8** (dev server and production build)
- **JavaScript (JSX)** — no TypeScript
- **SCSS** with CSS custom properties for theming
- **lucide-react** for icons
- **Browser Local Storage** for persistence

No Redux, router, backend or database is used. Navigation is handled by component state and the persisted active week.

---

## Installation

Requirements: Node.js 20+ and npm.

```bash
npm install
```

## Local development

```bash
npm run dev
```

Vite prints a local URL (normally `http://localhost:5173/`). Open it in a browser.

## Production build and preview

```bash
npm run build
npm run preview
```

The production bundle is written to `dist/`.

## Lint

```bash
npm run lint
```

---

## Local Storage

All state lives in the browser's Local Storage. Keys used by the app:

| Key | Contents |
| --- | --- |
| `weeks` | Array of all weeks with their sections, questions, tasks and completion state |
| `active-week-id` | The last opened week, restored after refresh |
| `prep-questions`, `dsa-progress`, `git-progress`, `fullstack-progress` | Legacy single-week data (read once, never deleted) |
| `<key>__backup` | Raw copy of a value that could not be parsed, written before falling back |

### Data safety rules

- Every mutation updates only the target week, and only the target item inside it.
- State updates use functional React updates, so two quick changes cannot overwrite each other.
- Writes happen in one place (the `useLocalStorage` hook) once per committed change.
- Stored weeks pass through a normalizer that fills missing fields, coerces booleans, validates enum values and regenerates missing or duplicate IDs. Malformed values never crash the UI.
- The legacy single-week tracker is imported into `Week 1` only when the `weeks` key does not exist yet. The import is idempotent (safe under React StrictMode), progress maps and tracker questions are preserved, and the old keys are kept intact.
- Nothing is deleted automatically. Removing a week or item always requires an explicit confirmation.
- Clearing site data, using a different browser or a private window starts with an empty dashboard; there is no sync or export.

---

## Progress calculation rules

All progress is derived from item counts; nothing is hard-coded.

| Scope | Rule |
| --- | --- |
| DSA Practice | `solved problems / total problems` |
| Git & GitHub | `reviewed questions / total questions` |
| Full Stack Technical | `reviewed questions / total questions` |
| Machine Coding Tracker | `questions with status Completed / total questions` |
| A custom section | `completed tasks / total tasks` |
| A single week | Average of the section percentages above that contain at least one item, rounded to the nearest whole number. Empty sections are ignored so a fresh week starts at 0%. |
| Dashboard DSA / Q&A / Machine coding cards | Summed done and total counts across all weeks |
| Dashboard average progress | Mean of each week's overall percentage |

Percentages are clamped to 0–100 for display. A week with no items in any section reports `0%`.

---

## Project structure

```
src/
├── components/
│   ├── common/          # Badge, ConfirmDialog, EmptyState, Modal, ProgressBar,
│   │                    # QAForm, QAWorkspace, SectionHeader
│   ├── custom/          # CustomSectionsView, CustomSection, CustomSectionForm, CustomTaskForm
│   ├── dsa/             # DSASection, ProblemForm
│   ├── git/             # GitSection (shared QAWorkspace wrapper)
│   ├── layout/          # Sidebar, Topbar
│   ├── technical/       # TechnicalSection (shared QAWorkspace wrapper)
│   ├── tracker/         # TrackerSection, QuestionForm, SearchFilter
│   └── weeks/           # WeekList, WeekCard, WeekForm, WeekOverview, DashboardStats
├── data/
│   ├── defaultSections.js   # Week factory with all four default sections
│   ├── dsaProblems.js       # Seed DSA problems
│   ├── gitQuestions.js      # Seed Git questions and answers
│   ├── fullstackQuestions.js# Seed full-stack questions and answers
│   └── sections.js          # Shared section metadata (labels, icons, accents)
├── hooks/
│   ├── useLocalStorage.js   # Persistence, parsing safety, cross-tab sync
│   └── useWeeks.js          # Week CRUD, normalization, legacy migration
├── utils/
│   ├── filters.js           # Tracker search/filter logic
│   ├── format.js            # Date formatting and class-name slugs
│   ├── id.js                # Collision-resistant IDs
│   ├── progress.js          # All progress and dashboard calculations
│   ├── validation.js        # URL validation
│   └── weeks.js             # Week normalization and title validation
├── App.jsx                  # Layout, navigation and week selection
├── App.scss                 # Dark layout and component styles
├── index.scss               # Theme tokens and base styles
└── main.jsx                 # React entry point
```

---

## Assumptions and limitations

- The app is single-user and browser-local; there is no authentication or server storage.
- Local Storage is typically capped around 5 MB per origin, which is far more than this app needs, but clearing browser data removes everything.
- There is no import/export or cloud sync yet.
- New weeks intentionally start with the five seeded DSA, Git and full-stack questions each. Tracker and custom sections start empty.
- Progress measures completed items, not answer quality or scores.
- Week numbering is derived from titles that start with `Week N`; titles without a number are still allowed but are only checked for exact duplicates.
- Deleting a week is permanent and cannot be undone.

---

## Assignment deliverables

These are manual submission steps. This repository does not claim that any of them are already done.

1. **GitHub repository** — push the final source (excluding `node_modules` and `dist`) to your GitHub repository and submit that link.
2. **Live deployment** — not deployed yet. `npm run build` produces a static `dist/` folder that can be hosted on Vercel, Netlify or any static host. Configure a single-page fallback to `index.html`. After deploying, add the real URL here.
3. **Demo video (1–2 minutes)** — not recorded yet. Suggested outline:
   - `0:00–0:15` Dashboard overview and statistics.
   - `0:15–0:35` Create a week, show the four default sections and switch weeks.
   - `0:35–0:55` Add a DSA problem, mark it solved, watch progress update.
   - `0:55–1:10` Expand a Git answer and mark it reviewed.
   - `1:10–1:30` Machine coding filters combined, then a custom section with a task.
   - `1:30–1:45` Refresh the page to prove persistence.
