import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./ProjectDetail.module.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import * as projectsApi from "../../lib/api/projects";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState("loading");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setStatus("loading");
    projectsApi
      .get(id)
      .then((data) => {
        setProject(data);
        setStatus(data ? "ready" : "not-found");
      })
      .catch(() => setStatus("error"));
  }, [id]);

  if (status === "loading") {
    return (
      <main className={style.main}>
        <Header />
        <p className={style.loading}>Carregando...</p>
        <Footer />
      </main>
    );
  }

  if (status === "not-found" || status === "error") {
    return (
      <main className={style.main}>
        <Header />
        <h1 style={{ color: "#fff", textAlign: "center" }}>
          Projeto não encontrado!
        </h1>
        <Footer />
      </main>
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
        <Link to="/projects" className={style.backBtn}>
          ◀ Voltar para projetos
        </Link>

        <h1 className={style.title}>{project.name}</h1>
        {project.description.map((paragraph, i) => (
          <p key={i} className={style.description}>
            {paragraph}
          </p>
        ))}

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

        <h3 className={style.subTitle}>Tecnologias utilizadas</h3>
        <ul className={style.techList}>
          {project.techs.map((tech, i) => (
            <li key={i}>{tech}</li>
          ))}
        </ul>

        <div className={style.links}>
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              🔗 Ver Projeto
            </a>
          ) : (
            <Link to="/error">🔗 Ver Projeto</Link>
          )}

          {project.github ? (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              💻 GitHub
            </a>
          ) : (
            <Link to="/error">💻 GitHub</Link>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
