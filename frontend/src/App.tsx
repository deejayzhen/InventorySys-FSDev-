import { BrowserRouter, Link, Route, Routes } from "react-router";
import PartsPage from "./PartsPage";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4 p-4 border-b">
        <Link to="/">Parts</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PartsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
