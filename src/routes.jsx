import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/index.jsx";
import Contact from "./pages/Contact/index.jsx";
import Projects from "./pages/Projects/index.jsx";
import Resume from "./pages/Resume/index.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/resume" element={<Resume />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
