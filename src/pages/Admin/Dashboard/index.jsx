import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import ProjectsAdmin from "../sections/ProjectsAdmin";
import ExperiencesAdmin from "../sections/ExperiencesAdmin";
import ActivitiesAdmin from "../sections/ActivitiesAdmin";
import ResumeAdmin from "../sections/ResumeAdmin";
import ProfileAdmin from "../sections/ProfileAdmin";
import style from "./Dashboard.module.css";

const TABS = [
  { key: "projects", label: "Projetos", Component: ProjectsAdmin },
  { key: "experiences", label: "Experiências", Component: ExperiencesAdmin },
  { key: "activities", label: "Atividades", Component: ActivitiesAdmin },
  { key: "resume", label: "Resumo/Certificados", Component: ResumeAdmin },
  { key: "profile", label: "Perfil/Links", Component: ProfileAdmin },
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const { logout } = useAuth();

  const ActiveComponent = TABS.find((t) => t.key === activeTab).Component;

  return (
    <div className={style.dashboard}>
      <header className={style.header}>
        <h1 className={style.title}>Painel Administrativo</h1>
        <button className={style.logoutBtn} onClick={logout}>
          Sair
        </button>
      </header>

      <nav className={style.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`${style.tabButton} ${
              activeTab === tab.key ? style.active : ""
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className={style.content}>
        <ActiveComponent />
      </main>
    </div>
  );
}

export default Dashboard;
