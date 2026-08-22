import style from "../Grid/Grid.module.css";
import { Link } from "react-router-dom";
import * as projectsApi from "../../lib/api/projects";
import { useCollection } from "../../hooks/useCollection";

function Grid() {
  const { data: projects, status } = useCollection(projectsApi.list);

  if (status === "loading") {
    return <p className={style.status}>Carregando projetos...</p>;
  }

  if (status === "error") {
    return <p className={style.status}>Não foi possível carregar os projetos.</p>;
  }

  if (projects.length === 0) {
    return <p className={style.status}>Nenhum projeto cadastrado ainda.</p>;
  }

  return (
    <section className={style.container}>
      <div className={style.grid}>
        {projects.map((project) => (
          <Link
            to={`/projects/${project.id}`}
            key={project.id}
            className={style.card}
          >
            <div className={style.imagePlaceholder}>
              <img src={project.images[0]} alt={project.name} />
            </div>

            <div className={style.info}>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <span className={style.techs}>{project.techs.join(" • ")}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Grid;
