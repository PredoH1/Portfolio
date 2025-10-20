import style from "../Grid/Grid.module.css";
import { Link } from "react-router-dom";
import AutoRisque from "../../images/AutoRisque.png";
import PlannerPlay1 from "../../images/PlannerPlay1.png";
import Suple1 from "../../images/Suple1.png";
import CapLogistica1 from "../../images/CapLogistica1.png";
import AutoSAP1 from "../../images/AutoSAP1.png";

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
      image: Suple1,
      name: "Aplicativo Suplementando",
      description:
        "Aplicativo fitness que ajuda você a conhecer e comparar suplementos de forma segura, com informações sobre ingredientes e avaliação conforme critérios da ANVISA. Projeto com visibilidade estadual na competição Desafio Liga Jovem. Ainda em Desenvolvimento",
      techs: ["React Native", "Firebase", "Figma"],
    },
    {
      id: 4,
      image: CapLogistica1,
      name: "Programa de Capacitação em Logística",
      description:
        "Plataforma de apoio ao aprendizado dos colaboradores, com conteúdos, exercícios práticos e teóricos, integração com Excel e funcionalidades interativas para revisão das aulas.",
      techs: ["Google Sites", "HTML", "CSS", "Javascript", "Excel"],
    },

    {
      id: 5,
      image: AutoSAP1,
      name: "Automação SAP - Buscar e Filtrar Dados",
      description:
        "Automação desenvolvida para extrair e filtrar dados de depósitos no SAP, exportando-os automaticamente para o Excel. Reduz o tempo de execução de tarefas repetitivas, minimiza erros e aumenta a eficiência do processo logístico.",
      techs: ["SAP", "VBA", "Excel"],
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
