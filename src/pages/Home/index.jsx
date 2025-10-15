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
      role: "Jovem Profissional/ Estagiário",
      location: "Coty - Goiânia/Goias",
      date: "Jun 2024 - Present",
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
              graduando em Sistemas de Informação e atualmente atuo como
              Desenvolvedor de Automação na multinacional Coty. Paralelamente,
              trabalho como freelancer na área de desenvolvimento web, mobile e
              automação empresarial, com foco em otimizar processos e
              simplificar a rotina de negócios por meio de soluções ágeis e
              inteligentes. Ao longo da minha trajetória, tive o privilégio de
              participar de diversos projetos corporativos e acadêmicos,
              adquirindo experiência prática e sólida em diferentes contextos
              tecnológicos. Possuo certificações em Desenvolvimento Web, Banco
              de Dados, Cibersegurança, Excel, VBA, Inglês e Logística, o que me
              permite atuar com segurança e versatilidade em múltiplas frentes
              de desenvolvimento.
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
