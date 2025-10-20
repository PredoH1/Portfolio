import style from "../Grid/Grid.module.css";
import { Link } from "react-router-dom";
import AutoRisque from "../../images/AutoRisque.png";
import PlannerPlay1 from "../../images/PlannerPlay1.png";

function Grid() {
  const projects = [
    {
      id: 1,
      image: AutoRisque,
      name: "Automação Risque",
      description:
        "Essa automação foi desenvolvido para a Logistica Reversa da Coty, onde foi indentificado a necessidade de criar uma ferramenta simples e agil para a demanda da area, solucionando um problema da area, esse aplicativo permite imprimir etiquetas de risque em massa",
      techs: ["HTML", "CSS", "Javascript", "ZPL", "Excel"],
    },
    {
      id: 2,
      image: PlannerPlay1,
      name: "CACByPlannerPlay",
      description:
        "Projeto universitário voltado ao desenvolvimento de uma plataforma web para pequenos empreendedores com pouca familiaridade com tecnologia, como pessoas idosas. A solução elimina o uso de papel e simplifica a gestão do negócio.",
      techs: [
        "React",
        "Node.js",
        "Express",
        "MySql",
        "Apexcharts",
        "gsap",
        "swiper",
        "Cloud",
      ],
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
            <div className={style.imagePlaceholder}>
              <img src={project.image} alt={project.name} />
            </div>

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
