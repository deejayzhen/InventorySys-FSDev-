import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router";
import PartsPage from "./PartsPage";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";
import { useAuthStore } from "./authStore";

function App() {
  const token = useAuthStore((s) => s.token);
  const setToken = useAuthStore((s) => s.setToken);

  return (
    <BrowserRouter>
      {token && (
        <nav className="flex gap-4 p-4 border-b">
          <Link className="hover:underline" to="/">
            Parts
          </Link>
          <Link className="hover:underline" to="/dashboard">
            Dashboard
          </Link>
          <button
            className="ml-auto hover:underline"
            onClick={() => setToken(null)}
          >
            Logout
          </button>
        </nav>
      )}
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/"
          element={token ? <PartsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
