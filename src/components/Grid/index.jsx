import style from "../Grid/Grid.module.css";
import { Link } from "react-router-dom";

function Grid() {
  const projects = [
    {
      id: 1,
      name: "Project One",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat.",
      techs: ["React", "Bootstrap", "Styled Components"],
    },
    {
      id: 2,
      name: "Project Two",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat.",
      techs: ["React", "Node.js", "Express"],
    },
    {
      id: 3,
      name: "Project Three",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat.",
      techs: ["React", "Firebase", "Tailwind"],
    },
    {
      id: 4,
      name: "Project Four",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat.",
      techs: ["React", "MongoDB", "Prisma"],
    },
  ];

  return (
    <section className={style.container}>
      <div className={style.grid}>
        {projects.map((project) => (
          <Link
            to={`/projects/${project.id}`}
            key={project.id}
            className={style.card}
          >
            {/* Placeholder da imagem - você substitui depois */}
            <div className={style.imagePlaceholder}></div>

            {/* Informações do projeto */}
            <div className={style.info}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <span className={style.techs}>{project.techs.join(" • ")}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Grid;
