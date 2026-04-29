# Todo App — Backend

A RESTful backend API for managing todos. Built with Node.js, Express, and MongoDB, and designed to be simple, clean, and easy to integrate with a React frontend.

***

## Tech Stack

*   **Node.js**
*   **Express.js**
*   **MongoDB Atlas** — cloud database
*   **Mongoose** — MongoDB object modeling
*   **dotenv** — environment variable management
*   **cors** — cross‑origin requests
*   **nodemon** — development hot reload

***

## Project Structure

```text
backend/
└── src/
    ├── config/
    │   └── db.js               # MongoDB connection logic
    ├── controllers/
    │   └── todoController.js   # Request handlers / business logic
    ├── models/
    │   └── Todo.js             # Mongoose schema
    ├── routes/
    │   └── todoRoutes.js       # API routes
    ├── middleware/
    │   ├── errorMiddleware.js  # Global error handler
    │   └── asyncHandler.js     # Async error wrapper (optional)
    ├── app.js                  # Express app configuration
    └── server.js               # Server entry point
├── .env                        # Environment variables (not committed)
├── package.json
└── README.md
```

***

## Prerequisites

*   **Node.js** v18 or higher
*   **npm** v9 or higher
*   A **MongoDB Atlas** account (free tier is sufficient)

***

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/todo_app?retryWrites=true&w=majority
```

> The `.env` file is intentionally not committed. Do not expose credentials in version control.

***

## MongoDB Connection Notes

This project uses **MongoDB Atlas (cloud)** rather than a local MongoDB instance.

### Why MongoDB Atlas?

*   No local database installation required
*   Easier setup for reviewers
*   Matches real‑world production patterns
*   Works seamlessly with Docker and cloud deployments

### Atlas Setup Summary

1.  Create a free **M0** cluster on MongoDB Atlas
2.  Create a database user with **read & write access**
3.  Allow network access from `0.0.0.0/0` (development only)
4.  Copy the connection string and set it as `MONGO_URI` in `.env`

***

## Setup & Running

**1. Install dependencies**

```bash
cd backend
npm install
```

**2. Start the development server**

```bash
npm run dev
```

The server will start on:

    http://localhost:5000

You should see logs similar to:

```text
MongoDB Connected: <cluster>.mongodb.net
Server running on port 5000
```

***

## API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint          | Description                     |
| ------ | ----------------- | ------------------------------- |
| GET    | `/todos`          | Fetch all todos                 |
| POST   | `/todos`          | Create a new todo               |
| PUT    | `/todos/:id`      | Update title and/or description |
| PATCH  | `/todos/:id/done` | Toggle done / undone            |
| DELETE | `/todos/:id`      | Delete a todo                   |

***

## Example Request

### Create a Todo

```http
POST /api/todos
Content-Type: application/json

{
  "title": "Finish assignment",
  "description": "Complete backend README"
}
```

***

## Error Handling

*   Centralized error‑handling middleware
*   Consistent JSON error responses
*   Proper HTTP status codes (`400`, `404`, `500`)
*   Server exits if database connection fails (fail‑fast)

Example error response:

```json
{
  "message": "Todo not found"
}
```

***

## Assumptions

*   This backend is designed for **single‑user usage** with no authentication.
*   Todos are stored in a single MongoDB collection with no user ownership.
*   Todo documents follow the schema:
    ```js
    { _id, title, description, done, createdAt, updatedAt }
    ```
*   The frontend is responsible for sending valid JSON requests.
*   All requests are assumed to come from trusted clients during development.

***

## Limitations

*   **No authentication or authorization**
*   **No pagination** — all todos are returned in one request
*   **No request rate limiting**
*   **Minimal validation** — only required fields are enforced
*   **No automated tests** — endpoints are manually tested using Postman
*   **Open MongoDB IP access** — acceptable for development, not production