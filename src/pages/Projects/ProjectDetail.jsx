// src/pages/Projects/ProjectDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import style from "./ProjectDetail.module.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import AutoRisque from "../../images/AutoRisque.png";

const projects = [
  {
    id: 1,
    name: "Automação Risque",
    description:
      "Essa automação foi desenvolvido para a Logistica Reversa da Coty, onde foi indentificado a necessidade de criar uma ferramenta simples e agil para a demanda da area, solucionando um problema da area, esse aplicativo permite imprimir etiquetas de risque em massa. O aplicativo puxa os dados das etiquetas de risque do Excel.",
    images: [AutoRisque],
    techs: ["HTML", "CSS", "Javascript", "ZPL", "Excel"],
    github: "https://github.com/PredoH1/RisqueAutomac",
  },
  {
    id: 2,
    name: "Project Two",
    description:
      "Aplicação full-stack com Node.js no backend e React no frontend.",
    images: ["/images/proj2-1.png", "/images/proj2-2.png"],
    techs: ["React", "Node.js", "Express"],
    github: "https://github.com/seu-repo/project-two",
    demo: "https://project-two.vercel.app",
  },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  const [currentImage, setCurrentImage] = useState(0);

  if (!project) {
    return (
      <h1 style={{ color: "#fff", textAlign: "center" }}>
        Projeto não encontrado!
      </h1>
    );
  }

  const handlePrev = () => {
    setCurrentImage((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImage((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <main className={style.main}>
      <Header />
      <div className={style.container}>
        {/* Botão de voltar */}
        <Link to="/projects" className={style.backBtn}>
          ◀ Voltar para projetos
        </Link>

        {/* Nome e descrição */}
        <h1 className={style.title}>{project.name}</h1>
        <p className={style.description}>{project.description}</p>

        {/* Carrossel */}
        <div className={style.carousel}>
          <button onClick={handlePrev} className={style.arrow}>
            ◀
          </button>
          <img
            src={project.images[currentImage]}
            alt={`${project.name} screenshot`}
            className={style.image}
          />
          <button onClick={handleNext} className={style.arrow}>
            ▶
          </button>
        </div>

        {/* Tecnologias */}
        <h3 className={style.subTitle}>Tecnologias utilizadas</h3>
        <ul className={style.techList}>
          {project.techs.map((tech, i) => (
            <li key={i}>{tech}</li>
          ))}
        </ul>

        {/* Links */}
        <div className={style.links}>
          <a href={project.demo} target="_blank" rel="noopener noreferrer">
            🔗 Ver Projeto
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            💻 GitHub
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
