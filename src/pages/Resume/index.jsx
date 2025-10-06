// Resume.jsx
import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/Header";
import style from "../Resume/Resume.module.css";

import htmlIcon from "../../assets/html.png";
import cssIcon from "../../assets/css.png";
import excelIcon from "../../assets/excel.png";
import googleSitesIcon from "../../assets/googleSites.png";
import javascriptIcon from "../../assets/javascript.png";
import mongoDbIcon from "../../assets/mongoDb.png";
import mySqlIcon from "../../assets/mySql.png";
import nextIcon from "../../assets/next.png";
import nodeIcon from "../../assets/node.png";
import powerappsIcon from "../../assets/powerapps.png";
import sapIcon from "../../assets/sap.png";
import reactIcon from "../../assets/react.png";
import vbaIcon from "../../assets/vba.png";

// Import dos certificados
import cert1 from "../../files/Certificado1.pdf";
import cert2 from "../../files/Certificado2.png";
import cert3 from "../../files/Certificado3.png";
import cert4 from "../../files/Certificado4.pdf";
import cert5 from "../../files/Certificado5.pdf";

function Resume() {
  const [scrollX, setScrollX] = useState(0);
  const scrollRef = useRef(null);
  const [modalFile, setModalFile] = useState(null);

  const techIcons = [
    htmlIcon,
    cssIcon,
    excelIcon,
    googleSitesIcon,
    javascriptIcon,
    mongoDbIcon,
    mySqlIcon,
    nextIcon,
    nodeIcon,
    powerappsIcon,
    sapIcon,
    reactIcon,
    vbaIcon,
  ];

  const certificacoes = [
    { name: "Certificação 1", file: cert1 },
    { name: "Certificação 2", file: cert2 },
    { name: "Certificação 3", file: cert3 },
    { name: "Certificação 4", file: cert4 },
    { name: "Certificação 5", file: cert5 },
  ];

  // Scroll automático do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const maxScroll =
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        if (scrollX >= maxScroll) setScrollX(0);
        else setScrollX(scrollX + 1);
        scrollRef.current.scrollLeft = scrollX;
      }
    }, 20);
    return () => clearInterval(interval);
  }, [scrollX]);

  return (
    <>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          {/* Botão Voltar */}
          <button
            className={style.backButton}
            onClick={() => window.history.back()}
          >
            ◀ Voltar
          </button>

          {/* Resumo / Bibliografia */}
          <section className={style.aboutMe}>
            <h1 className={style.nomeTitle}>Pedro Henrique Souza Candido</h1>
            <p className={style.bio}>
              Me chamo Pedro Henrique Souza Candido, atualmente moro em
              Goiânia/Goias e sempre fui apaixonado por tecnologia. Desde sempre
              colaborei no desenvolvimento relacionado a TI. Faço Sistemas de
              Informação e estou no 4º período. Por meio da minha dedicação,
              tive a oportunidade de realizar diversos feitos profissionais e
              acadêmicos, com destaque e visibilidade, podendo até competir
              estadualmente com o aplicativo "Suplementando", que desenvolvemos
              em equipe. Também trabalhei em uma multinacional, desenvolvendo
              habilidades em automação, Excel e desenvolvimento web. Hoje posso
              contribuir oferecendo meu trabalho como desenvolvedor, atendendo
              clientes com sites, automações, ferramentas de gerenciamento e
              muito mais. Suporte 24h.
            </p>
          </section>

          {/* Tech Skills Carousel */}
          <section className={style.techSkills}>
            <h2 className={style.titleHome}>Tech Skills</h2>
            <div className={style.carousel} ref={scrollRef}>
              {techIcons.map((icon, index) => (
                <img key={index} src={icon} alt="" className={style.techIcon} />
              ))}
            </div>
          </section>

          {/* Certificações */}
          <section className={style.certificacoes}>
            <h2 className={style.titleHome}>Certificações</h2>
            <div className={style.certGrid}>
              {certificacoes.map((cert, i) => (
                <button
                  key={i}
                  className={style.certButton}
                  onClick={() => setModalFile(cert.file)}
                >
                  {cert.name}
                </button>
              ))}
            </div>
          </section>

          {/* Modal para exibir certificado */}
          {modalFile && (
            <div
              className={style.modalOverlay}
              onClick={() => setModalFile(null)}
            >
              <div
                className={style.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                {modalFile.endsWith(".pdf") ? (
                  <iframe
                    src={modalFile}
                    width="100%"
                    height="500px"
                    title="Certificado"
                  ></iframe>
                ) : (
                  <img src={modalFile} alt="Certificado" />
                )}
                <button
                  className={style.closeModal}
                  onClick={() => setModalFile(null)}
                >
                  ✖
                </button>
              </div>
            </div>
          )}

          {/* Chamada para contato */}
          <section className={style.contactCall}>
            <p>
              Quer melhorar seu negócio, digitalizar ele, alavancar a sua
              carreira? Entre em contato comigo, irei te ajudar! Faço sites,
              automatizo seu negócio, melhoro suas planilhas, crio ferramentas
              de gerenciamento e muitos outros serviços.
            </p>
            <button
              className={style.contactButton}
              onClick={() => (window.location.href = "/contact")}
            >
              Entrar em Contato
            </button>
          </section>
        </div>
      </main>
    </>
  );
}

export default Resume;
