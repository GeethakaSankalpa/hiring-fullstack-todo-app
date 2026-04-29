# Todo App — Frontend

A clean, minimal React frontend for managing todos. Communicates with a REST API backend and persists data in MongoDB.

---

## Tech Stack

- **React 18** (Vite)
- **Axios** — HTTP requests
- **DM Sans / DM Mono** — Google Fonts (loaded via CSS import)
- **Plain CSS** — no CSS framework or component library

---

## Project Structure

```
frontend/
└── src/
    ├── components/
    │   ├── TodoForm.jsx      # Add new todo
    │   ├── TodoItem.jsx      # Single todo row (view, edit, delete, toggle)
    │   └── TodoList.jsx      # Renders the list or empty state
    ├── services/
    │   └── api.js            # Axios instance + all API calls
    ├── styles/
    │   └── app.css           # All styles
    ├── App.jsx               # Root component — state, fetch, toasts
    └── main.jsx              # React entry point
```

---

## Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- The **backend server must be running** at `http://localhost:5000` before starting the frontend

---

## Setup & Running

**1. Install dependencies**

```bash
cd frontend
npm install
```

**2. Start the development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (Vite default).

**3. Build for production**

```bash
npm run build
```

Output goes to the `dist/` folder. Serve it with any static file server.

---

## Backend API

All requests go to `http://localhost:5000/api`. This is set in `src/services/api.js`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Fetch all todos |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update title and/or description |
| PATCH | `/todos/:id/done` | Toggle done status |
| DELETE | `/todos/:id` | Delete a todo |

If you run the backend on a different port, update the `baseURL` in `src/services/api.js`:

```js
const API = axios.create({
  baseURL: 'http://localhost:YOUR_PORT/api',
});
```

---

## Features

- **Add todos** — title (required) + description (optional)
- **Edit todos** — inline editing, confirm with `Enter` or Save button, cancel with `Escape`
- **Toggle done** — checkbox marks a task done or undone
- **Delete todos** — delete button appears on hover
- **Completed style** — done tasks show with strikethrough and faded text
- **Loading state** — shown while the initial fetch is in progress
- **Error handling** — failed fetches show an inline error banner; failed actions show a toast notification that auto-dismisses after 3.5 seconds

---

## Assumptions

- The backend is expected to be running locally on port `5000` before the frontend is started. There is no fallback or mock data if the server is unavailable.
- Todo `_id` values are MongoDB ObjectIDs, supplied by the backend. The frontend does not generate IDs.
- The API returns todo objects in the shape `{ _id, title, description, done }`. If the backend schema differs, `TodoItem.jsx` and `TodoList.jsx` may need minor updates.
- `Content-Type: application/json` is set automatically by Axios for all POST and PUT requests. No manual header configuration is needed.
- Fonts are loaded from Google Fonts over the internet. In an offline environment the UI will fall back to system sans-serif fonts and remain fully functional.

---

## Limitations

- **No authentication** — all todos are visible to anyone who can reach the app. This is a single-user local tool.
- **No pagination** — all todos are fetched in one request. Performance may degrade with a very large number of todos.
- **No optimistic updates** — the list re-fetches from the server after every create, update, toggle, or delete. On a slow network this may feel sluggish.
- **Edit is disabled for completed todos** — marking a task done hides the edit button. To edit, uncheck the task first.
- **No offline support** — the app requires a live connection to the backend. There is no local caching or service worker.