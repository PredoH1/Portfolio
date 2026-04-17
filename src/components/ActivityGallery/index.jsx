import style from "./ActivityGallery.module.css";
import timeReversa from "../../images/timeReversa.jpeg";
import apresentacaoMelhorias from "../../images/apresentacaoMelhorias.jpeg";
import projetoSuple from "../../images/projetoSuple.JPG";
import AutoRisque from "../../images/AutoRisque.png";

function ActivityGallery() {
  const activities = [
    {
      id: 1,
      image: timeReversa, // substitua por: import img1 from "../../images/sua-imagem.png"
      placeholder: "🏆",
      title: "Time Reversa",
      description: "Apresentação das melhorias da Logística Reversa",
      tag: "Trabalho",
      date: "Abril 2026",
    },
    {
      id: 2,
      image: apresentacaoMelhorias,
      placeholder: "🎓",
      title: "Apresentação das Melhorias Coty 2026",
      description: "Apresentei as melhorias para a área de Logística Reversa",
      tag: "Trabalho",
      date: "Abril 2026",
    },
    {
      id: 3,
      image: projetoSuple,
      placeholder: "🚀",
      title: "Projeto Suplementando",
      description:
        "Apresentação do projeto Suplementando, classificado para a etapa nacional após conquistar a vitória na fase estadual do desafio Liga Jovem.",
      tag: "Competição",
      date: "Outubro 2025",
    },
    {
      id: 4,
      image: AutoRisque,
      placeholder: "⚙️",
      title: "Automação de Etiquetas na Coty",
      description:
        "Implementação do sistema de impressão ZPL integrado ao SAP, reduzindo em 60% o tempo operacional da equipe de logística reversa.",
      tag: "Trabalho",
      date: "Abril 2026",
    },
  ];

  const tagColors = {
    Competição: "#f59e0b",
    Certificação: "#33d2ff",
    Projeto: "#9845e8",
    Trabalho: "#22c55e",
  };

  return (
    <section className={style.section}>
      <h2 className={style.title}>Atividades Recentes</h2>
      <p className={style.subtitle}>Conquistas, certificações e marcos</p>

      <div className={style.grid}>
        {activities.map((item) => (
          <div key={item.id} className={style.card}>
            {/* Imagem ou placeholder */}
            <div className={style.imageArea}>
              {item.image ? (
                <img src={item.image} alt={item.title} className={style.img} />
              ) : (
                <span className={style.emoji}>{item.placeholder}</span>
              )}

              {/* Tag colorida */}
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

            {/* Informações */}
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
