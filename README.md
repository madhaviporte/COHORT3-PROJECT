# Finance Tracker App (React + Vite)

This is a simple frontend Finance Tracker app made using React and Vite. It helps users track income and expenses, manage transactions, and view basic analytics.

---

## Features

- User registration and login
- Add, edit, and delete transactions
- Income and expense tracking
- Basic charts for visualization
- Dark and light mode support
- Profile and currency settings

---

## Notification System

The app uses a global popup notification system instead of browser alerts.

All messages appear as toast notifications in the top-right corner of the screen.

Duration: 2.5–3 seconds

---

## Notification Types

- Success (green)
- Error (red)
- Warning (orange)
- Info (blue)

---

## Messages Used in App

### Register
- "You are registered. Now you can login."
- "User already exists."
- "Passwords do not match."
- "Username is required."
- "Password is required."

### Login
- "Login successful."
- "First you have to register."
- "Invalid username or password."
- "Username required."
- "Password required."

### Logout
- "Logout successful."

### Transactions
- "Transaction added successfully."
- "Transaction deleted successfully."
- "Transaction updated successfully."
- "Invalid amount."
- "Description required."
- "Category required."

### Settings
- "Profile updated successfully."
- "Currency updated successfully."

### Reset
- "Data reset successfully."
- Before reset: "Are you sure you want to reset all data?"

### Theme
- "Dark mode enabled."
- "Dark mode disabled."

---

## Validation Rule

All errors and validations are shown using popup notifications only.

No browser alert is used anywhere in the app.

---

## Tech Stack

- React
- Vite
- React Router
- Chart.js
- React Toastify

---

## Project Structure

src/
- components/
- pages/
- context/
- utils/
- styles/

---

## Run Project

Install dependencies:
npm install

Start development server:
npm run dev

Build project:
npm run build

---

## Goal

To build a clean and simple finance tracker with smooth UI and proper notification system like modern apps.
