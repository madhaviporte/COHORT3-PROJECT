# AeroFlow - Premium Productivity Suite Dashboard

AeroFlow is a modern, responsive, and glassmorphic productivity dashboard designed to streamline your daily workflow in one gorgeous view. Inspired by Notion, Linear, Microsoft To Do, and TickTick, this application uses only core web technologies (pure vanilla HTML5, CSS3, and JavaScript) to guarantee blazing fast performance and compatibility.

## 🚀 Folder Structure

```
Productivity-Dashboard/
│── index.html
│── style.css
│── script.js
│── assets/
│   ├── icons/
│   ├── images/
│   └── backgrounds/
│
├── css/
│   ├── dashboard.css
│   ├── todo.css
│   ├── planner.css
│   ├── timer.css
│   ├── weather.css
│   └── darkmode.css
│
├── js/
│   ├── navigation.js
│   ├── todo.js
│   ├── planner.js
│   ├── goals.js
│   ├── pomodoro.js
│   ├── weather.js
│   ├── quotes.js
│   ├── datetime.js
│   ├── theme.js
│   ├── background.js
│   └── storage.js
│
└── README.md
```

## ✨ Key Features

1. **Dashboard Home View**:
   - Welcome greetings calculated from local hours (Good Morning/Afternoon/Evening).
   - Live summary metrics grid (completion rates on tasks, circular goals tracker, focus session counts).
   - Interactive 7-card responsive preview grid (Desktop: 4 columns, Tablet: 2 columns, Mobile: 1 column).
2. **Todo Manager**:
   - Task Priorities (Low, Medium, High) with left-color borders.
   - Calendared Due Dates with expired status tags (Overdue warning indicators).
   - Live query text search matching and status filters (All, Pending, Completed, Important).
   - Multi-option sorting (by Date Added, Due Date, Priority).
   - Global Floating Action Button (FAB) + key triggers.
3. **Hourly Daily Planner**:
   - Scheduling grid blocks spanning from 8 AM to 8 PM.
   - Context highlights: shading past slots, and highlighting active hours with a pulsing live status banner.
   - Micro-saving on keystroke inputs with debounced triggers.
4. **Daily Goals Tracker**:
   - Circular SVG percentage wheel.
   - Goal completion metrics counters.
   - Dynamic canvas confetti particle explosion celebrating 100% finish.
5. **Focus Pomodoro Timer**:
   - Triple interval phases: Work Session (25 min), Short Break (5 min), and Long Break (15 min).
   - Circular SVG countdown ring and audio finished ring synthesized locally via the **Web Audio API** (browser client-side sound - no external downloads needed).
   - Desktop system notifications (requires prompt approval).
6. **Geolocated Weather**:
   - Real-time weather parameters querying Open-Meteo forecasts.
   - Automatically parses GPS coordinates to city names via nominatim reverse lookup.
   - Manual search bar overrides with autocomplete resolves (powered by Open-Meteo Geocoding).
   - Fallback defaults to "New Delhi" on geolocation rejection.
7. **Quotes Board**:
   - Random quotes retrieved from public REST APIs.
   - Offline fallback collections inside script buffers.
8. **Live Clock**:
   - Dynamic 1-second header clock, tz information, and calendar rendering.
9. **Display Adaptations**:
   - Light/Dark theme switchers which apply immediately on load (omitting browser flash).
   - Ambient gradient overlays that alter depending on time of day (Morning sky, bright afternoon sunshine, sunset crimson, starry night sky).
10. **Toast Notifications**:
    - Animated slide-in cards updating actions (Adding items, completed details, saving planner, quotes loaded).

---

## 🎨 Theme Presets & Styling variables

| Color | Hex | Role |
| --- | --- | --- |
| **Primary** | `#4F46E5` | Active accents, Todo anchors, Navigation links (Indigo) |
| **Secondary** | `#06B6D4` | Live tags, Planner schedule headers, focus items (Teal) |
| **Success** | `#10B981` | Completed marks, 100% progress badges (Emerald) |
| **Warning** | `#F59E0B` | Weather conditions, Medium priority marks (Amber) |
| **Danger** | `#EF4444` | High priority triggers, Timer Work periods (Rose) |

---

## 💡 Keyboard Shortcuts

AeroFlow supports advanced shortcuts to optimize workflow. Pressing `Alt + Option` combined with:
- **`Alt + T`**: Open Todo List view and focus input text-area.
- **`Alt + P`**: Open Daily Planner view.
- **`Alt + G`**: Open Goals Tracker view and focus input.
- **`Alt + C`**: Open Pomodoro Timer.
- **`Alt + W`**: Open Weather details page.
- **`Escape`**: Return to main Home Dashboard grid.

---

## 🛠️ APIs & Browser Integrations

- **Open-Meteo Forecast API**: Queries real-time temperatures, wind speeds, humidity, sunrise, and sunset without api keys.
- **Open-Meteo Geocoding API**: Resolves manually queried city names to coordinates.
- **Nominatim osm reverse-geocoder**: Decodes GPS coordinate values into local city names.
- **HTML5 Web Audio API**: Graph-synthesized sine sound bell alerts on timer finishes.
- **HTML5 Web Notifications API**: Fires operating system push-cards.
- **HTML5 Geolocation API**: Interrogation coordinates from user browser.
- **LocalStorage API**: Saves todo lists, themes, schedules, goals, and focus sessions.

---

## 🚀 Setup & Launch Instructions

1. Clone or download this project workspace:
   ```bash
   git clone https://github.com/yourusername/Productivity-Dashboard.git
   cd Productivity-Dashboard
   ```
2. Double-click the file `index.html` to open it in any modern browser (Chrome, Edge, Safari, Firefox).
3. **Alternative Local Server Launch**:
   Launch a lightweight HTTP server in the directory to enable Geolocation reverse Nominatim calls (which some browsers restrict on raw `file:///` protocols). Make sure Python is installed:
   ```bash
   python -m http.server 3000
   ```
   Open `http://localhost:3000` inside your browser.

---

## 🖼️ Screenshots Placeholder
*A mockup of the dashboard main view showing the stats overlay, glass glassmorphism navigation grid, and dark mode toggles.*
*Add screenshots inside your repository folder here.*

---

## 🔮 Future Improvements

- [ ] Task sub-checkbox checklist lists.
- [ ] Task due time alerts and notifications.
- [ ] Planner calendar sync and multi-day scheduler schedules.
- [ ] Weather weekly forecast chart displays.
- [ ] Pomodoro session records and focus tracker logs.
- [ ] Custom profile configuration settings.
