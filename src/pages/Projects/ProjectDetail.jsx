// src/pages/Projects/ProjectDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import style from "./ProjectDetail.module.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import AutoRisque from "../../images/AutoRisque.png";
import torreControle from "../../images/torreControle.jpeg";
import torreControle2 from "../../images/torreControle2.jpeg";
import PlannerPlay1 from "../../images/PlannerPlay1.png";
import PlannerPlay2 from "../../images/PlannerPlay2.png";
import PlannerPlay3 from "../../images/PlannerPlay3.png";
import PlannerPlay4 from "../../images/PlannerPlay4.png";
import PlannerPlay5 from "../../images/PlannerPlay5.png";
import Suple1 from "../../images/Suple1.png";
import Suple2 from "../../images/Suple2.png";
import Suple3 from "../../images/Suple3.png";
import Suple4 from "../../images/Suple4.png";
import Suple5 from "../../images/Suple5.png";
import Suple6 from "../../images/Suple6.png";
import CapLogistica1 from "../../images/CapLogistica1.png";
import CapLogistica2 from "../../images/CapLogistica2.png";
import CapLogistica3 from "../../images/CapLogistica3.png";
import CapLogistica4 from "../../images/CapLogistica4.png";
import AutoSAP1 from "../../images/AutoSAP1.png";
import AutoSAP2 from "../../images/AutoSAP2.png";

const projects = [
  {
    id: 1,
    name: "Automação Risque",
    description: [
      "Sistema de impressão de etiquetas (Risque e Biocolor) desenvolvido para substituir o processo anterior, que era manual, repetitivo e dependente de equipamentos adicionais. A nova solução automatiza a geração de dados diretamente do SAP, eliminando etapas como a leitura de código de barras.",

      "Com menos etapas e fluxo simplificado, o sistema reduziu em cerca de 60% o tempo do processo, aumentando a eficiência operacional na Logística Reversa da Coty.",
    ],
    images: [AutoRisque],
    techs: [
      "HTML",
      "CSS",
      "Javascript",
      "ZPL",
      "Excel",
      "VBS",
      "Python",
      "SAP",
    ],
    github: "https://github.com/PredoH1/RisqueAutomac",
  },
  {
    id: 2,
    name: "Torre de Controle - Reversa",
    description: [
      "Projeto desenvolvido para centralizar sistemas e dashboards da área de Logística Reversa, criando um ambiente único para organização operacional e suporte à tomada de decisão. A solução funciona como um hub integrado, onde todos os relatórios e aplicações ficam disponíveis em um só lugar.",

      "Atualmente, é utilizado por 100% da equipe, com funcionamento automatizado e autonomia total para assistentes e analistas gerenciarem (criar, editar e excluir) aplicativos e relatórios da torre de controle.",
    ],
    images: [torreControle, torreControle2],
    techs: [
      "HTML",
      "CSS",
      "Javascript",
      "Google Script",
      "Weather API",
      "Google Sheets",
    ],
    github: "https://github.com/PredoH1/RisqueAutomac",
  },
  {
    id: 3,
    name: "CACByPlannerPlay",
    description:
      "Projeto universitário voltado ao desenvolvimento de uma plataforma web para pequenos empreendedores com pouca familiaridade com tecnologia, como pessoas idosas. A solução elimina o uso de papel e simplifica a gestão do negócio.",
    images: [
      PlannerPlay1,
      PlannerPlay2,
      PlannerPlay3,
      PlannerPlay4,
      PlannerPlay5,
    ],
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
    github: "https://github.com/PredoH1/CACByPlannerPlay",
    demo: "https://cacplannerplay.netlify.app",
  },
  {
    id: 4,
    name: "Aplicativo Suplementando",
    description:
      "Suplementando é um aplicativo fitness desenvolvido em colaboração com profissionais da área da saúde, voltado para qualquer pessoa que pratique esportes, musculação ou atividades físicas. O aplicativo permite que o usuário verifique se um suplemento é adequado para o seu dia a dia, consulte os ingredientes de cada suplemento, confira a nota do suplemento baseada nos critérios da ANVISA para uso no Brasil, compare diferentes suplementos e pesquise termos relacionados à nutrição esportiva e suplementação. O projeto está em fase de desenvolvimento e já conquistou reconhecimento estadual ao participar da competição Desafio Liga Jovem, destacando-se pelo planejamento, colaboração e impacto na comunidade fitness. Com o Suplementando, buscamos oferecer informações confiáveis e seguras, ajudando os usuários a fazer escolhas conscientes sobre sua suplementação e saúde.",
    images: [Suple1, Suple2, Suple3, Suple4, Suple5, Suple6],
    techs: ["React Native", "Firebase", "Figma"],
    demo: "https://www.figma.com/design/07HNCCbl7a8HGcmLJ3mhvU/Design-App---Web---Suplementando?node-id=138-393&t=eSpmwrzg4CRcV4kG-0",
    github: "https://github.com/PredoH1/SuplementandoApp",
  },
  {
    id: 5,
    name: "Programa de Capacitação em Logística",
    description:
      "O Programa de Capacitação em Logística da empresa Coty tem como objetivo desenvolver competências essenciais e fortalecer a operação logística, promovendo integração entre os colaboradores e uma visão abrangente da gestão logística. Para apoiar os participantes, foi criado um site que permite revisar o conteúdo das aulas, realizar exercícios teóricos e práticos e praticar Excel diretamente na plataforma. Durante o desenvolvimento e manutenção da plataforma, atuei na criação de componentes interativos, como o carrossel de informativos em JavaScript, Footer e outros elementos, além de manter o site sempre atualizado com novas informações, eventos da empresa e conteúdos das aulas. Também criei a integração entre o Google Sites e o Excel, garantindo uma experiência mais completa e eficiente para os usuários.",
    images: [CapLogistica1, CapLogistica2, CapLogistica3, CapLogistica4],
    techs: ["Google Sites", "HTML", "CSS", "Javascript", "Excel"],
    demo: "https://sites.google.com/view/capacitacaoemlogistica/fale-conosco?authuser=0",
    github: "",
  },
  {
    id: 6,
    name: "Automação SAP - Buscar e Filtrar Dados",
    description:
      "Esta automação foi desenvolvida para a área de Logística Reversa da Coty, com o objetivo de extrair dados de depósitos diretamente do SAP e organizá-los automaticamente no Excel. Com apenas um clique, a automação insere o centro, o depósito e a variável de exibição. Em seguida, filtra apenas os materiais com quantidade maior que zero e exporta os dados já no layout correto para transferência entre depósitos. Antes da automação, essa tarefa precisava ser feita manualmente várias vezes ao dia, consumindo tempo e aumentando a chance de erros. Com a implementação da solução, o processo se tornou mais rápido, preciso e eficiente, automatizando uma operação repetitiva e liberando tempo para atividades mais estratégicas na equipe logística.",
    images: [AutoSAP1, AutoSAP2],
    techs: ["SAP", "VBA", "Excel"],
    demo: "",
    github:
      "https://github.com/PredoH1/Automacao31005102/blob/main/Automacao31005102.xlsm",
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
      prev === 0 ? project.images.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentImage((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1,
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
