# GridMitra

### Field Documentation & Evidence Management System for Electricity Field Workers

GridMitra is a field documentation and evidence management system designed to help electricity field workers record asset observations, capture photo evidence, preserve field knowledge, and create review-ready evidence packages for supervisors.

## Problem

Electricity field workers often collect important information during inspections, but observations, photos, and previous maintenance knowledge can become difficult to organize and review.

GridMitra provides a single workflow for documenting field activity and passing structured evidence to supervisors.

## Key Features

* **Asset Memory** — Search assets and view previous field records.
* **Field Observations** — Record observations against a specific asset.
* **Photo Evidence** — Capture and store field photographs with observations.
* **Field Language Assistant** — Converts common field-language observations into structured categories and review priorities.
* **Evidence Package** — Combines an observation and photo into a review-ready package.
* **My Work** — View submitted evidence packages.
* **Supervisor Dashboard** — Review submitted field evidence.
* **Request Review** — Send an evidence package for supervisor review.
* **Cedar Authorization** — Uses AWS Cedar locally to authorize the Request Review action before submission.
* **Multilingual Interface** — Supports multiple Indian languages.
* **Voice Input** — Supports browser-based voice input for field observations.
* **Read Observation** — Reads observations using browser speech synthesis.

## Application Workflow

```text
Field Worker
     ↓
Asset Memory
     ↓
Field Observation
     ↓
Photo Evidence
     ↓
Field Language Assistant
     ↓
Evidence Package
     ↓
My Work
     ↓
Cedar Authorization
     ↓
Supervisor Dashboard
     ↓
Request Review
```

## Current Architecture

```text
React + Vite
      ↓
Node.js HTTP API
      ↓
Cedar Authorization
      ↓
In-Memory Application Data
```

Cedar is used locally as a policy-based authorization layer. Before an evidence package is submitted for supervisor review, the backend evaluates the `RequestReview` action through a Cedar policy.

The current Field Language Assistant is **rule-based** and does not use an external LLM API.

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Built-in HTTP server
* REST-style APIs

### Authorization

* AWS Cedar
* Local Cedar authorization engine

### Data

* In-memory application data for the current prototype

## Project Structure

```text
gridmitra/
├── backend/
│   ├── cedarAuth.js
│   └── server.js
├── client/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Local Development

### Backend

```bash
cd backend
node server.js
```

Backend:

```text
http://localhost:4000
```

Health check:

```text
http://localhost:4000/api/health
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Prototype Limitations

* Application data is currently stored in memory.
* Data is cleared when the backend restarts.
* The Field Language Assistant is currently rule-based.
* The prototype does not currently use an external LLM API.
* Production deployment would require persistent storage, authentication, monitoring, and stronger authorization policies.

## Future Improvements

* PostgreSQL for persistent application data.
* Object storage for field photographs.
* RAG and vector search for field knowledge retrieval.
* LLM-based field-language assistance.
* AI agent workflows for field documentation.
* Production authentication and role management.
* Cloud deployment and monitoring.

## Safety

GridMitra is a documentation and evidence-management system.

It does not make safety-critical decisions about electrical equipment. Safety decisions must follow authorized personnel, utility procedures, and applicable safety protocols.

## Project Status

GridMitra is a working hackathon prototype demonstrating an end-to-end field documentation and supervisor-review workflow with local AWS Cedar authorization.
