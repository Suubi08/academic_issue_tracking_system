# Academic Issue Tracking System (AITS)

A web-based academic issue tracking application built to help university students report academic concerns and follow their progress while lecturers and university administrators review, manage, and update issues.

> **Project context:** Collaborative university software project. This repository contains a React/Vite frontend and a Django REST Framework backend.

## Table of contents

- [Overview](#overview)
- [Problem and goals](#problem-and-goals)
- [Features](#features)
- [User roles](#user-roles)
- [Technology stack](#technology-stack)
- [Architecture](#architecture)
- [Data model](#data-model)
- [API overview](#api-overview)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Configuration](#configuration)
- [Authentication flow](#authentication-flow)
- [Testing and quality checks](#testing-and-quality-checks)
- [Known limitations and future improvements](#known-limitations-and-future-improvements)
- [Contributing](#contributing)
- [Authors and acknowledgements](#authors-and-acknowledgements)
- [License](#license)

## Overview

Academic Issue Tracking System (AITS) provides a central place for recording and following up on academic issues. Students can submit issues with information such as the course unit, date, category, description, year of study, and semester. Issues can be assigned to lecturers and moved through a defined status workflow.

The application has role-specific screens for students, lecturers, academic registrars, and administrators. It also includes issue comments, notifications, dashboards, and reporting-oriented views.

## Problem and goals

Academic concerns can be difficult to follow when they are reported through disconnected channels. AITS aims to make issue handling more organized by:

- Providing a structured way to submit and describe an issue.
- Making issue status visible as it moves through the workflow.
- Supporting assignment of issues to lecturers.
- Keeping discussion associated with the relevant issue.
- Giving different university roles interfaces suited to their responsibilities.

## Features

Features represented in the codebase include:

- **Account registration and login** with role-specific registration fields.
- **Role-based frontend routes** for students, lecturers, academic registrars, and administrators.
- **Issue submission and tracking**, including course unit, category, date, year of study, semester, description, and optional attachment fields.
- **Issue assignment** to a lecturer.
- **Issue status workflow:** `pending`, `in_progress`, and `resolved`.
- **Issue details and comments** to support follow-up discussion.
- **Notifications** with message, type, read state, and timestamp.
- **Role-specific dashboards and management screens.**
- **Lecturer issue counts** for pending, resolved, and total assigned issues.
- **Search support** for lecturer listings.
- **JWT access and refresh tokens** for API authentication.

Some frontend components also contain sample issue data for interface development. Actual persistence depends on the relevant screen using the backend API; the application should be tested end-to-end before describing every screen as fully integrated.

## User roles

| Role | Intended responsibilities |
|---|---|
| **Student** | Submit academic issues, view issues, follow status updates, and participate in issue-related discussion. |
| **Lecturer** | Review assigned issues, update issue status, and communicate about issues. |
| **Academic Registrar** | Access registrar-oriented issue action, dashboard, settings, and notification screens. |
| **Administrator** | Access administrative dashboards, issue management, reports, settings, and notifications. |

The backend defines these roles in the custom `User` model. The frontend also uses role-specific protected routes. Authorization should be enforced and verified on the backend for every sensitive operation, not only by hiding frontend pages.

## Technology stack

### Frontend

- React 19
- Vite 6
- React Router
- Axios
- Tailwind CSS 4
- Recharts
- Radix UI components and Lucide React icons

### Backend

- Python
- Django 5.1
- Django REST Framework
- Simple JWT for JSON Web Token authentication
- `dj-database-url` and `python-decouple` for database/environment configuration
- Gunicorn and WhiteNoise are included in the backend dependencies for deployment-related use

### Database

- PostgreSQL is supported through the `DATABASE_URL` configuration.
- Django ORM models define the application's users, issues, notifications, comments, and attachments.

## Architecture

AITS uses a client–API–database architecture. The React application renders the user interface and sends HTTP requests to the Django REST API. Django views and serializers validate/process requests and use the Django ORM to read and write database records.

```mermaid
flowchart TD
    U["Student / Lecturer / Registrar / Admin"]
    FE["React + Vite frontend<br/>Role-specific pages and routes"]
    AX["Axios API client<br/>Bearer access token"]
    API["Django REST Framework API<br/>Views, serializers, permissions"]
    AUTH["Django authentication<br/>Simple JWT"]
    ORM["Django ORM"]
    DB[("PostgreSQL database")]
    FILES[("Uploaded issue attachments")]

    U --> FE
    FE --> AX
    AX --> API
    API --> AUTH
    API --> ORM
    ORM --> DB
    API --> FILES
```

### Request lifecycle

1. A user interacts with a page in the React application.
2. The frontend sends a request through its Axios API client.
3. For authenticated requests, the client adds the access token as a `Bearer` token.
4. Django REST Framework processes the request through the configured view and serializer.
5. The Django ORM interacts with the configured database.
6. The API returns a JSON response for the frontend to display.

The diagram describes the intended application architecture. Deployment infrastructure, production storage, and the completeness of each frontend-to-API integration should be verified separately.

## Data model

The main Django models are defined in `server/backend/api/models.py`.

| Model | Purpose | Important relationships / fields |
|---|---|---|
| `User` | Extends Django's `AbstractUser` with AITS roles and academic profile fields. | Role, student number, course, college, lecturer number, subjects taught, department. |
| `Issue` | Represents an academic issue submitted for follow-up. | Created by a user; may be assigned to a lecturer; has category, description, course unit, status, date, semester, year, and optional attachment. |
| `Notification` | Stores a message for a particular user. | User, title, message, type, read state, timestamp. |
| `Comments` | Stores discussion entries attached to an issue. | Foreign keys to issue and user, message, creation time. |
| `Attachment` | Represents an uploaded file associated with an issue. | Foreign key to issue, file, upload time. |

### Relationships at a glance

- A user can create multiple issues.
- An issue can optionally be assigned to a lecturer.
- An issue can have multiple comments.
- A user can receive multiple notifications.
- An issue can have associated attachments.

The codebase contains both an `Issue.attachment` field and a separate `Attachment` model. Confirm which approach is used by each upload workflow before extending the attachment feature.

## API overview

The API is mounted under `/api/`. The routes below are taken from `server/backend/api/urls.py`.

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/register/` | Register a user and return JWT tokens. |
| `POST` | `/api/login/` | Authenticate a user and return JWT tokens. |
| `POST` | `/api/token/refresh/` | Request a new access token using a refresh token. |
| `GET` | `/api/users/` | List users. |
| `GET` | `/api/users/lecturer/` | List lecturers; supports search parameters configured in the view. |
| `GET` | `/api/users/lecturer/<id>/` | Retrieve a lecturer. |
| `GET` | `/api/users/registrar/<id>/` | Retrieve an academic registrar. |
| `GET` | `/api/users/student/<id>/` | Retrieve a student. |
| `GET`, `POST` | `/api/issues/` | List issues or create an issue. |
| `GET`, `PUT`/`PATCH`, `DELETE` | `/api/issues/<id>/` | Retrieve, update, or delete an issue, subject to the view's queryset and permissions. |
| `PATCH`/`PUT` | `/api/issues/<id>/status/` | Update an issue's status through the status endpoint. |
| `GET`, `POST` | `/api/comments/` | List comments or create a comment; filtering by issue ID is supported by the view. |
| `GET`, `PUT`, `DELETE` | `/api/comments/<id>/` | Retrieve, edit, or delete a comment. |
| `GET`, `POST` | `/api/notifications/` | List or create notifications through the configured view. |
| `GET`, `PUT`/`PATCH` | `/api/notifications/<id>/` | Retrieve or update a notification belonging to the requesting user. |
| `GET` | `/api/issues/lecturer/<lecturer_id>/counts/` | Return pending, resolved, and total issue counts for a lecturer. |

**API note:** This table describes declared routes and their intended purpose, not a guarantee that every route is production-ready. Review backend authorization and test each endpoint before deploying. For example, some views filter issues using Django groups while the custom user model also has a `role` field; ensure group membership and role checks are consistent.

## Project structure

```text
aits/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/       # Shared UI components
│   │   ├── context/          # React context, including issue UI state
│   │   ├── features/         # Role-specific issue, settings, and notification screens
│   │   ├── Layout/           # Shared application layout
│   │   ├── pages/            # Dashboards, authentication, and issue detail pages
│   │   ├── routes/           # React Router route definitions
│   │   ├── utils/            # API client and authentication helpers
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── server/
    ├── requirements.txt
    └── backend/
        ├── backend/          # Django project settings and URL configuration
        ├── api/
        │   ├── models.py     # Data models
        │   ├── serializers.py
        │   ├── views.py
        │   ├── permissions.py
        │   ├── signals.py
        │   ├── tests.py
        │   └── urls.py
        └── manage.py
```

## Getting started

These instructions describe a local development setup. They assume Python and Node.js/npm are installed and a PostgreSQL database is available.

### 1. Clone the repository

```bash
git clone https://github.com/Suubi08/academic_issue_tracking_system.git
cd academic_issue_tracking_system
```

### 2. Configure the backend environment

From the repository root:

```bash
cd server
python -m venv .venv
```

Activate the virtual environment.

**Windows PowerShell**
```powershell
.\.venv\Scripts\Activate.ps1
```

**macOS/Linux**
```bash
source .venv/bin/activate
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

### 3. Set environment variables

The Django settings read the database URL from `DATABASE_URL` and use `DEBUG` as a configuration value. Set these variables in your local environment or configure a local `.env` file in the directory from which Django loads it.

Example values (replace the database name, username, and password with your local PostgreSQL credentials):

```env
DATABASE_URL=postgresql://aits_user:your_password@localhost:5432/aits_db
DEBUG=True
```

Create the PostgreSQL database and user before running migrations. Do not commit `.env` files, database passwords, Django secret keys, API tokens, or other credentials.

**Important setup caveat:** The current settings import a secret key that is hard-coded in the source file. Before using this project outside a local demonstration, move the secret key to an environment variable and rotate it if it has ever been exposed.

### 4. Run database migrations

From `server/backend/`:

```bash
python manage.py migrate
```

Create an administrator account if needed:

```bash
python manage.py createsuperuser
```

### 5. Start the Django API

From `server/backend/`:

```bash
python manage.py runserver
```

The development server normally runs at `http://127.0.0.1:8000/`. The API routes are under `/api/`.

### 6. Configure and start the frontend

Open a second terminal and navigate to the frontend:

```bash
cd client
npm install
npm run dev
```

Vite prints the local frontend URL in the terminal, commonly `http://localhost:5173/`.

The current Axios configuration uses `http://127.0.0.1:8000/api/` as its API base URL. If the backend runs elsewhere, update the frontend configuration or refactor it to use a Vite environment variable such as `VITE_API_BASE_URL`.

### 7. Build and lint the frontend

From `client/`:

```bash
npm run build
npm run lint
```

The build command checks whether Vite can produce a frontend bundle. The lint command runs ESLint; address any findings before presenting the project as production-ready.

## Configuration

| Setting | Description |
|---|---|
| `DATABASE_URL` | Database connection URL used by `dj-database-url`. |
| `DEBUG` | Django debug setting. Keep it disabled in production. |
| Frontend API base URL | Currently configured directly in `client/src/utils/axiosInstance.js`. |

For deployment, configure `SECRET_KEY`, `ALLOWED_HOSTS`, CORS/CSRF trusted origins, database credentials, static files, and uploaded-file storage appropriately for the hosting platform. Avoid exposing secrets in frontend environment variables because frontend variables are bundled for browser access.

## Authentication flow

The backend uses Django authentication and Simple JWT. The login and registration endpoints return an access token, refresh token, and selected user details. The Axios client attaches the access token to API requests and attempts to refresh it after an HTTP `401` response.

The current frontend stores tokens in `localStorage`. This is convenient for a student project, but it increases exposure if a cross-site scripting (XSS) vulnerability exists. A production security review should consider safer token storage, short token lifetimes, refresh-token rotation/blacklisting, HTTPS, and comprehensive server-side authorization checks.

## Testing and quality checks

A Django test module exists at `server/backend/api/tests.py`. Run the backend tests from `server/backend/`:

```bash
python manage.py test
```

Run the frontend static checks and production build from `client/`:

```bash
npm run lint
npm run build
```

These commands are recommended verification steps; no claim is made here that all tests or checks currently pass. Record actual results when running them in your environment.

## Known limitations and future improvements

The following are practical next steps identified from the current code structure and configuration. They should be treated as improvement opportunities, not existing features.

- **Strengthen backend authorization:** consistently enforce access by authenticated user and role for user, issue, comment, status-update, and notification endpoints.
- **Standardize role checks:** views currently use Django group checks in some places while the custom user model defines a `role` field. Align the authorization strategy and add tests for every role.
- **Centralize configuration:** move the Django secret key and frontend API URL out of source code and into environment-specific configuration.
- **Improve file-upload handling:** validate allowed file types and sizes, and use appropriate storage and access controls.
- **Expand automated tests:** cover registration, login, permissions, issue creation, assignment, status transitions, comments, and notifications.
- **Unify issue attachment handling:** clarify whether files are stored through the `Issue.attachment` field or the separate `Attachment` model.
- **Separate demo state from persisted data:** ensure screens intended to show live issues use the API consistently rather than sample frontend data.
- **Improve deployment readiness:** configure production CORS/CSRF settings, HTTPS, logging, database backups, and static/media file serving.

## Contributing

Contributions and constructive feedback are welcome. For a change:

1. Create a feature branch.
2. Keep changes focused and document meaningful behavior changes.
3. Run backend tests and frontend lint/build checks.
4. Open a pull request describing the change and how it was verified.

## Authors and acknowledgements

AITS was developed collaboratively as a university project. The repository owner and team members should be credited according to their actual contributions. If you are using this repository for a job portfolio, add a short section describing the components you personally implemented, the technical decisions you made, and the work you can confidently discuss in an interview.

## License

No license file was identified during this review. Unless a license is added, others should not assume they have permission to reuse, modify, or distribute this code. Choose a license that reflects the team's intentions and confirm that all collaborators agree before adding it.
