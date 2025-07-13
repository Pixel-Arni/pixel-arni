# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Backend Setup (Phase 2)

Phase 2 introduces a simple Express API backed by SQLite via Prisma. To get started:

1. Install dependencies (requires internet):
   ```bash
   npm install
   ```
2. Run Prisma migrations to create the database:
   ```bash
   npx prisma migrate dev --name init
   ```
3. Start the API server:
   ```bash
   npm run server
   ```

The server exposes basic CRUD endpoints under `/clients` as a starting point for database integration.
