// src/App.tsx (yangilangan)
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppTheme from "./theme/AppTheme";
import AppAppBar from "./components/AppAppBar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import SubjectDetailPage from "./components/SubjectDetailPage";
import TestPage from "./components/TestPage";

export default function Blog(props: { disableCustomTheme?: boolean }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  if (isLoading) {
    return <div>Yuklanmoqda...</div>;
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Router>
        {isAuthenticated ? (
          <>
            <AppAppBar onLogout={handleLogout} />
            <Routes>
              <Route
                path="/"
                element={
                  <Container
                    maxWidth="lg"
                    component="main"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      my: 16,
                      gap: 4,
                    }}
                  >
                    <MainContent />
                  </Container>
                }
              />
              <Route
                path="/subject/:subject/theme/:themeId"
                element={<SubjectDetailPage />}
              />
              <Route path="/test/:subject/:topicId" element={<TestPage />} />
              <Route path="/signin" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <Routes>
            <Route
              path="/signin"
              element={<LoginForm onLogin={handleLogin} />}
            />
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Routes>
        )}
      </Router>
    </AppTheme>
  );
}
