import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Contact from "./pages/Contact/index.jsx";
import Projects from "./pages/Projects/index.jsx";
import ProjectDetail from "./pages/Projects/ProjectDetail.jsx";
import Resume from "./pages/Resume/index.jsx";
import ErrorPage from "./pages/ErrorPage/index.jsx";
import AdminLogin from "./pages/Admin/Login/index.jsx";
import AdminDashboard from "./pages/Admin/Dashboard/index.jsx";
import RequireAuth from "./components/RequireAuth/index.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/painel-x7k9/login" element={<AdminLogin />} />
        <Route
          path="/painel-x7k9"
          element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
