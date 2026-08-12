# AD Brothers Website

A React + Tailwind frontend with a Node.js backend for AD Brothers — a hotel and hospitality management, recruitment, and manpower consulting company.

## Structure

- `client/` — React application built with Vite and Tailwind CSS
- `server/` — Node.js Express backend for contact submissions

## Getting started

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm start
```

The frontend is configured to proxy `/api` requests to `http://localhost:4000`.
