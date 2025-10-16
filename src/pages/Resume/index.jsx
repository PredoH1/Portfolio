// Resume.jsx
import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/Header";
import style from "../Resume/Resume.module.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
register();

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
import Footer from "../../components/Footer";

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
    { name: "Excel Avancado", file: cert1 },
    { name: "Desenvolvimento Web", file: cert2 },
    { name: "CiberSegurança", file: cert3 },
    { name: "Inglês", file: cert4 },
    { name: "Banco de Dados", file: cert5 },
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
          <div className={style.backContainer}>
            <Link to="/" className={style.backLink}>
              ◀ Voltar para Home
            </Link>
          </div>

          {/* Resumo / Bibliografia */}
          <section className={style.aboutMe}>
            <p className={style.bio}>
              Olá! Sou Pedro Henrique Souza Candido, graduando em Sistemas de
              Informação e atualmente atuo como Desenvolvedor de Automação na
              multinacional Coty. Paralelamente, trabalho como freelancer na
              área de desenvolvimento web, mobile e automação empresarial, com
              foco em otimizar processos e simplificar a rotina de negócios por
              meio de soluções ágeis e inteligentes. Ao longo da minha
              trajetória, tive o privilégio de participar de diversos projetos
              corporativos e acadêmicos, adquirindo experiência prática e sólida
              em diferentes contextos tecnológicos. Possuo certificações em
              Desenvolvimento Web, Banco de Dados, Cibersegurança, Excel, VBA,
              Inglês e Logística, o que me permite atuar com segurança e
              versatilidade em múltiplas frentes de desenvolvimento.
            </p>
          </section>

          {/* Tech Skills Carousel */}

          <section className={style.techSkills}>
            <h2 className={style.titleHome}>Tech Skills</h2>

            <div className={style.boxCarrosel}>
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className={style.swiper}
              >
                {techIcons.map((icon, index) => (
                  <SwiperSlide key={index} className={style.swiperSlide}>
                    <img
                      src={icon}
                      alt={`Tech icon ${index}`}
                      className={style.techIcon}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          {/* Certificações */}
          <section className={style.certificacoes}>
            <h2>Certificações</h2>
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
            <h2>Ofereço serviços personalizados como:</h2>

            <ul>
              <li>
                Criação de Landing Pages profissionais para empresas e
                empreendedores;
              </li>
              <li>Desenvolvimento de sistemas de gestão sob medida;</li>
              <li>Integração de bancos de dados e APIs;</li>
              <li>Aplicativos Web e Mobile completos;</li>
              <li>Automação de planilhas e macros VBA;</li>
              <li>Desenvolvimento full stack (front-end e back-end);</li>
              <li>Suporte vitalício após a entrega do projeto.</li>
            </ul>

            <p>
              Meu compromisso é transformar ideias em soluções eficientes, com
              qualidade, performance e design profissional.
            </p>
            <div className={style.card}>
              <a
                href="#"
                className={`${style.socialContainer} ${style.containerOne}`}
              >
                <svg
                  className={`${style.socialSvg} ${style.instagramSvg}`}
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                </svg>
              </a>

              <a
                href="https://github.com/seuusuario"
                target="_blank"
                rel="noopener noreferrer"
                className={`${style.socialContainer} ${style.containerTwo}`}
              >
                <svg
                  className={`${style.socialSvg} ${style.githubSvg}`}
                  viewBox="-267 288.9 264.5 225.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-21.8,354.4c-0.8-0.9-1.3-2.3-1.2-3.5c0.9-20.1-1.8-39.6-8.6-58.6c-0.9-2.4-2-3.3-4.5-2.6c-5.6,1.7-11.4,3-16.9,5 
                    c-15.2,5.5-29.1,13.5-42.6,22.2c-1.4,0.9-3.5,1.5-5.2,1.2c-22.1-3.9-44.3-3.7-66.5-0.3c-2.2,0.3-5-0.2-6.8-1.3 
                    c-15.7-10.2-31.7-20.2-50-25c-15.1-4-12-4.8-16.3,8.9c-5.1,16.4-7.1,33.4-6,50.6c0.1,1.2-0.8,2.7-1.6,3.8 
                    c-6.6,7.9-11.7,16.6-14.8,26.4c-6,19-4.8,38.2-1,57.3c7.5,37.5,32.8,63.8,70.2,70.3c19.3,3.4,39.2,3.7,57.3,5.2 
                    c20.2-1.5,38.9-1.6,57.1-4.5c31.8-5.1,55.8-22,67.8-52.7c4.2-10.7,6.5-22.4,7.9-33.8C-0.3,397.9-4.6,374.3-21.8,354.4z 
                    M-39.5,458.8c-3.3,15.6-12.4,26.3-27.6,31.8c-14.7,5.4-29.9,7.6-45.4,8.6c-7.5,0.5-15,0.1-22.5,0.1
                    c-20.2,0.4-40.4-0.4-59.9-6.2 c-24.5-7.3-35.5-21.9-36.2-47.5c-0.3-9.1,0.7-17.9,5-26.1c8.5-16.5,23.2-22.3,40.6-22.6
                    c9.5-0.1,19.1,0.7,28.7,1.6 c20.1,1.8,40-0.1,60-1.2c8.8-0.5,17.8-0.7,26.4,0.8c18.5,3.2,32.5,21.6,32.8,42.3
                    C-37.6,446.5-38.3,452.8-39.5,458.8z"
                  ></path>
                  <path
                    d="M-191.5,424.5c-5.5,5.7-7.4,12.9-7.7,19.3c0,9.6,2.8,17.3,7.7,22.3c6.8,6.9,16.1,6.7,22.6-0.3
                    c9.8-10.6,9.7-30.5,0-41 C-175.4,417.7-184.9,417.6-191.5,424.5z"
                  ></path>
                  <path
                    d="M-99.4,423.7c-11.2,10.3-11.2,33,0,43.2c6.5,5.9,15.3,5.6,21.4-0.7
                    c5.6-5.8,7.6-13.1,7.8-21c-0.2-7.9-2.2-15.1-7.9-20.9 C-84.2,418-93,417.8-99.4,423.7z"
                  ></path>
                </svg>
              </a>

              <a
                href="#"
                className={`${style.socialContainer} ${style.containerThree}`}
              >
                <svg
                  className={`${style.socialSvg} ${style.linkedinSvg}`}
                  viewBox="0 0 448 512"
                >
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                </svg>
              </a>

              <a
                href="#"
                className={`${style.socialContainer} ${style.containerFour}`}
              >
                <svg
                  className={`${style.socialSvg} ${style.whatsappSvg}`}
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                </svg>
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Resume;
