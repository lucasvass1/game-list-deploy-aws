# Game List Frontend

This is the **frontend** of the Game List project, built with **React** and integrated with the Game List API.

## 🚀 Technologies Used

- **React 19**
- **React Router DOM v7**
- **React Query (TanStack)**
- **Styled-Components**
- **Axios**
- **React Toastify**

## 📁 Project Structure

```
frontend/
├── public/
├── src/
│   ├── @types/               # Custom TypeScript types
│   ├── assets/               # Images, icons, etc.
│   ├── components/           # Reusable UI components
│   ├── context/              # React Context providers (auth, games, etc.)
│   ├── config/               # Config files (e.g., React Query)
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Application pages (Home, Dashboard, etc.)
│   ├── services/             # API services (Axios)
│   ├── styles/               # Global styles, themes, SASS files
│   ├── App.tsx               # Main App component
│   └── index.tsx             # Entry point
├── .env                     # Environment variables (API base URL, etc.)
├── package.json
└── README.md
```

## 🧪 Available Scripts

Run the following commands using **npm** or **yarn**:

```bash
# Start development server
npm start

# Build project for production
npm run build

# Run tests
npm run test

# Eject Create React App (optional)
npm run eject
```

## ⚙️ Environment Variables

Create a `.env` file in the root and configure the API URL:

```env
REACT_APP_API_URL=http://localhost:3333
```

## 🐳 Docker Support

This frontend is designed to work alongside a backend API running in Docker. Ensure you run the full stack with:

```bash
docker-compose up -d
```

> ℹ️ Make sure the backend API is running at the correct URL configured in your `.env`.

## 🧼 Linting & Formatting

This project uses ESLint and Prettier. You can format the code using:

```bash
npm run format
```

## 📌 Notes

- The project is bootstrapped with **Create React App** (CRA).
- TypeScript is used across the whole codebase.
- Styling is handled via **Styled-Components**.
