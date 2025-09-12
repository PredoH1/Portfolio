// src/pages/Projects/ProjectDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import style from "./ProjectDetail.module.css";

const projects = [
  {
    id: 1,
    name: "Project One",
    description:
      "Um projeto desenvolvido em React, com foco em frontend moderno e responsivo.",
    images: [
      "/images/proj1-1.png",
      "/images/proj1-2.png",
      "/images/proj1-3.png",
    ],
    techs: ["React", "Bootstrap", "Styled Components"],
    github: "https://github.com/seu-repo/project-one",
    demo: "https://project-one.vercel.app",
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
      <div className={style.container}>
        {/* Botão de voltar */}
        <Link to="/projects" className={style.backBtn}>
          ← Voltar para projetos
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
    </main>
  );
}
