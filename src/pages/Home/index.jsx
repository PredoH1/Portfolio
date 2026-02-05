import Header from "../../components/Header";
import Grid from "../../components/Grid";
import style from "../Home/Home.module.css";
import React, { useState } from "react";
import ContactGrid from "../../components/ContactGrid";
import Footer from "../../components/Footer";

function Home() {
  const experiences = [
    {
      company: "COTY Brasil",
      role: "Assistente de Automação e BI",
      location: "Coty - Goiânia/Goias",
      date: "Nov 2025 - Present",
      details: [
        "Atuo no suporte e desenvolvimento de melhorias para fluxos logísticos, utilizando tecnologia para transformar processos manuais em soluções digitais. Meu trabalho consiste em apoiar a operação através da análise de dados e da criação de ferramentas que trazem mais agilidade e visibilidade para a área, com foco especial em Logística Reversa.",
        "Análise de Dados e BI: Apoio na criação de indicadores (KPIs) no Power BI, realizando desde o tratamento de dados no Power Query e gerenciamento de relacionamentos até a criação de medidas em DAX para facilitar a tomada de decisão.",
        "Digitalização de Processos: Desenvolvimento de aplicativos operacionais em PowerApps (PowerFx), focados em facilitar a coleta de dados e a rotina da Logística Reversa.",
        "Automação de Rotinas: Criação de fluxos de automação utilizando Power Automate, Python e macros para integrar dados entre SAP e Excel, visando reduzir tarefas repetitivas e erros manuais.",
      ],
    },
    {
      company: "COTY Brasil",
      role: "Jovem Profissional/ Estagiário",
      location: "Coty - Goiânia/Goias",
      date: "Jun 2024 - Nov 2025",
      details: [
        "Suporte ao time de Logística Reversa, utilizando SAP (transações MIGO, MB52, LS26, LS22, LT06, LT12, MB51, ZPP195, ZMM077) para movimentações entre estoques, análise e acompanhamento de processos. ",
        "Manipulação e análise de dados via Excel, com foco em filtragem, listagem e consolidação de informações. ",
        "Desenvolvimento de automação de processos com VBA, PowerApps e Power Automate, Python, SAP e Excel",
        "Apoio direto a assistentes e analistas em demandas operacionais e projetos de melhoria contínua",
      ],
    },
    {
      company: "Projeto Universitário - Faculdade Unialfa ",
      role: "Desenvolvedor Full Stack (Projeto Acadêmico) ",
      location: "Goiânia/Goias",
      date: "Jan 2025 - Jun 2025",
      details: [
        "Desenvolvimento de uma plataforma web voltada para pequenos empreendedores com baixa familiaridade com tecnologia, como idosos. A solução elimina o uso de papel e facilita a gestão do negócio. A primeira funcionalidade implementada foi o cálculo do CAC (Custo de Aquisição de Clientes), com uma interface simples e intuitiva",
        "Tecnologias: React, JavaScript, Node.js, Express, MySQL, ApexCharts, GSAP, HTML, CSS. Backend e banco de dados hospedados na nuvem. ",
      ],
    },
    {
      company: "Suplementando – Liga Jovem do Sebrae ",
      role: "Desenvolvedor Mobile ",
      location: "Goiânia/Goias",
      date: "Jun 2025 - Present",
      details: [
        "Competindo na fase estadual, projeto em desenvolvimento. ",
        "Aplicativo para fornecer informações confiáveis sobre nutrição suplementar, com dados baseados na ANVISA (nota de confiabilidade, ingredientes e benefícios). ",
        "Responsável pelo desenvolvimento e design da interface, utilizando React Native e Firebase. ",
      ],
    },
  ];

  const [selected, setSelected] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex < experiences.length - 3) setStartIndex(startIndex + 1);
  };
  return (
    <>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <section className={style.aboutMe}>
            <p className={style.apresentacao}>Ola, me chamo</p>
            <h1 className={style.nomeTitle}>Pedro Henrique Souza Candido</h1>
            <p className={style.apresentacao}>
              Me chamo Pedro Henrique e atuo como Assistente de Automação e BI
              na Coty, focado em transformar processos logísticos através de
              dados e tecnologia. Trabalho na criação de indicadores
              estratégicos em Power BI (DAX/Power Query) e no desenvolvimento de
              aplicativos operacionais com PowerApps (Power Fx), visando
              otimizar a Logística Reversa e a eficiência da área. Minha rotina
              une análise de dados, automações com Power Automate, Python e VBA,
              e integrações com SAP. Nas horas vagas, atuo como desenvolvedor
              Front-End freelancer.
            </p>
          </section>

          <section className={style.experience}>
            <h1 className={style.titleHome}>Experience</h1>
            <div className={style.carousel}>
              <button
                className={style.arrow}
                onClick={handlePrev}
                disabled={startIndex === 0}
              >
                ◀
              </button>

              <div className={style.tabs}>
                {experiences
                  .slice(startIndex, startIndex + 3)
                  .map((exp, index) => (
                    <button
                      key={index}
                      className={`${style.tab} ${
                        selected === startIndex + index ? style.active : ""
                      }`}
                      onClick={() => setSelected(startIndex + index)}
                    >
                      {exp.company}
                    </button>
                  ))}
              </div>

              <button
                className={style.arrow}
                onClick={handleNext}
                disabled={startIndex >= experiences.length - 3}
              >
                ▶
              </button>
            </div>

            <div className={style.experienceDetails}>
              <div className={style.experienceHeader}>
                <h3>{experiences[selected].role}</h3>
                <span>{experiences[selected].date}</span>
              </div>
              <p className={style.location}>{experiences[selected].location}</p>
              <ul>
                {experiences[selected].details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </section>
          <section className={style.projetos}>
            <h2>Featured Projects</h2>
            <Grid />
          </section>
          <section className={style.contato}>
            <ContactGrid />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
