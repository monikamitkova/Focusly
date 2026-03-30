# Focusly

Focusly is a gamified focus timer built with React, Node js, Express, and MongoDB. It combines Pomodoro-style sessions with progression features like XP, levels, daily streaks, today focus count, recent sessions, and persistent user progress.

## Features

- Focus, short break, and long break timers
- Per-user login/signup by name
- XP and level progression
- Daily streak tracking
- Today focus sessions tracking
- Recent sessions stored per profile
- Level progress bar
- Persistent login across refresh
- Logout flow

## Tech Stack

- Frontend: React, react-scripts, react-icons
- Backend: Node.js, Express
- Database: MongoDB with Mongoose

## Project Structure

```text
Focusly/
├── backend/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── node_modules/
│   └── src/
│       └── modules/
│           └── user/
│               ├── application/
│               │   ├── dtos/
│               │   └── use-case/
│               ├── domain/
│               │   ├── services/
│               │   └── User.js
│               ├── infrastructure/
│               │   ├── models/
│               │   └── repositories/
│               └── interfaces/
│                   ├── controllers/
│                   └── routes/
└── frontend/
    ├── package.json
    ├── package-lock.json
    ├── node_modules/
    ├── public/
    │   ├── index.html
    │   ├── logo.png
    │   └── timer-end.mp3
    └── src/
        ├── App.js
        ├── App.css
        ├── hooks/
        │   ├── useAuth.js
        │   └── useUserProgress.js
        └── domains/
            ├── components/
            │   ├── Controls.js
            │   ├── ModeSelector.js
            │   ├── Notification.js
            │   ├── RecentSessions.js
            │   ├── Stats.js
            │   ├── TimeDisplay.js
            │   ├── TimeInput.js
            │   ├── UserMenu.js
            │   └── auth/
            └── pages/
                ├── AuthPage.js
                └── FocusPage.js
├── .gitignore
├── README.md


```

## Backend Overview

The backend exposes user-related routes under `/api/auth`:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `PATCH /api/auth/:id/progress`

User progress is persisted in MongoDB and includes:

- `xp`
- `level`
- `streak`
- `lastActiveDate`
- `todayFocusSessions`
- `lastFocusSessionDate`
- `totalMinutes`
- `recentSessions`

## Frontend Overview

The frontend renders either:

- `AuthPage` when no user is logged in
- `FocusPage` when a user is available

The logged-in user is stored in `localStorage` so refresh does not log the user out unintentionally.

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB connection string

### 1. Install dependencies

Root:

```bash
npm install
```

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd backend
npm install
```

### 2. Configure environment variables

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 3. Run the backend

From `backend/`:

```bash
node index.js
```

The backend runs on `http://localhost:5000`.

### 4. Run the frontend

From `frontend/`:

```bash
npm start
```

The frontend runs on `http://localhost:3000`.

## Current Behavior

- Completing a focus session updates XP, level, streak, today focus sessions, total focus time, and recent sessions
- Recent sessions are tied to the logged-in user, not shared across accounts
- Focus progress is loaded again after refresh because the active user is persisted locally
