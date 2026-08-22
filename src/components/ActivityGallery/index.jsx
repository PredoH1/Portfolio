import style from "./ActivityGallery.module.css";
import * as activitiesApi from "../../lib/api/activities";
import { useCollection } from "../../hooks/useCollection";

const tagColors = {
  Competição: "#f59e0b",
  Certificação: "#33d2ff",
  Projeto: "#9845e8",
  Trabalho: "#22c55e",
};

function ActivityGallery() {
  const { data: activities, status } = useCollection(activitiesApi.list);

  return (
    <section className={style.section}>
      <h2 className={style.title}>Atividades Recentes</h2>
      <p className={style.subtitle}>Conquistas, certificações e marcos</p>

      {status === "loading" && (
        <p className={style.status}>Carregando atividades...</p>
      )}
      {status === "error" && (
        <p className={style.status}>Não foi possível carregar as atividades.</p>
      )}
      {status === "ready" && activities.length === 0 && (
        <p className={style.status}>Nenhuma atividade cadastrada ainda.</p>
      )}

      <div className={style.grid}>
        {activities.map((item) => (
          <div key={item.id} className={style.card}>
            <div className={style.imageArea}>
              {item.image ? (
                <img src={item.image} alt={item.title} className={style.img} />
              ) : (
                <span className={style.emoji}>📌</span>
              )}

              <span
                className={style.tag}
                style={{
                  backgroundColor: tagColors[item.tag] + "22",
                  color: tagColors[item.tag],
                  borderColor: tagColors[item.tag] + "55",
                }}
              >
                {item.tag}
              </span>
            </div>

            <div className={style.info}>
              <div className={style.header}>
                <h3 className={style.cardTitle}>{item.title}</h3>
                <span className={style.date}>{item.date}</span>
              </div>
              <p className={style.description}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ActivityGallery;
