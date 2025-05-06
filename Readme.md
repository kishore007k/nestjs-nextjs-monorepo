# Microservices-Style Monorepo

This repository demonstrates a **microservices-style monorepo** architecture, combining the power of **NestJS** for backend services and **Next.js** for frontend applications. It is designed to streamline development, improve scalability, and foster better collaboration across teams.

## What is a Microservices Architecture?

Microservices architecture is a design pattern where applications are built as a collection of small, independent services. Each service is responsible for a specific functionality and communicates with others via APIs. This approach enhances scalability, fault isolation, and flexibility in development.

## Why a Monorepo?

A monorepo (monolithic repository) is a single repository that contains multiple projects, often related or interdependent. In this case, it houses both backend and frontend services. Benefits of a monorepo include:

- **Centralized Management**: All services and applications are in one place.
- **Code Sharing**: Reuse common libraries and utilities across projects.
- **Simplified Dependency Management**: Consistent tooling and dependencies.
- **Streamlined CI/CD**: Unified pipelines for building, testing, and deploying.

## Installation

To get started, clone the repository and install dependencies:

```bash
git clone https://github.com/kishore007k/nestjs-nextjs-monorepo.git
cd nestjs-nextjs-monorepo
npm install
```

## Development

Run the development servers for both backend and frontend:

```bash
# To develop all the services
pnpm dev
```

Access the frontend at `http://localhost:3000` and the backend API at `http://localhost:5000`.

## Folder Structure

```plaintext
nestjs-nextjs-monorepo/
│   .gitignore
│   package.json
│   pnpm-lock.yaml
│   pnpm-workspace.yaml
│   Readme.md
│   turbo.json
│
├───apps
│   ├───auth
│   │   ├───src
│   │   │       main.ts
│   │   └───test
│   ├───e-commerce
│   │   ├───app
│   │   │       page.tsx
│   │   └───public
│   ├───gateway
│   │   ├───src
│   │   │       main.ts
│   │   └───test
│   ├───orders
│   │   ├───src
│   │   │       main.ts
│   │   └───test
│   ├───products
│   │   ├───src
│   │   │       main.ts
│   │   └───test
│   └───users
│       ├───src
│       │       main.ts
│       └───test
└───packages
    ├───types
    └───ui
```

This structure ensures clear separation of concerns while enabling code reuse and efficient collaboration.
