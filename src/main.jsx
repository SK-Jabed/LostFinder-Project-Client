import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import router from './routes/Router';
import AuthProvider from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}