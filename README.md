# AD Brothers Website

A React + Tailwind frontend with a Node.js backend for AD Brothers — a hotel and hospitality management, recruitment, and manpower consulting company.

## Structure

- `client/` — React application built with Vite and Tailwind CSS
- `server/` — Node.js, Express, and MongoDB Atlas API for gallery management

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
cp .env.example .env
# Add your MongoDB Atlas URI and secure admin credentials to .env
npm start
```

The frontend is configured to proxy `/api` requests to `http://localhost:4000`.

## Gallery administration

- Public gallery: `/gallery`
- Protected content dashboard: `/dashboard`
- Gallery records and uploaded image data are stored in MongoDB Atlas.
- Set `VITE_API_URL` when the frontend and backend are deployed on different domains.

The root `render.yaml` can deploy the API to Render. Configure the MongoDB URI and admin credentials in Render, then set the resulting API URL as the GitHub Actions `VITE_API_URL` repository variable.
