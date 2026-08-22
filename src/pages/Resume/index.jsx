// Resume.jsx
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import style from "../Resume/Resume.module.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Footer from "../../components/Footer";
import SocialLinks from "../../components/SocialLinks";
import * as resumeApi from "../../lib/api/resume";
import * as profileApi from "../../lib/api/profile";

function Resume() {
  const [modalFile, setModalFile] = useState(null);
  const [techIcons, setTechIcons] = useState([]);
  const [certificacoes, setCertificacoes] = useState([]);
  const [profile, setProfile] = useState({
    bio: "",
    servicesOffered: [],
    socialLinks: {},
  });

  useEffect(() => {
    resumeApi.listTechIcons().then(setTechIcons);
    resumeApi.listCertificates().then(setCertificacoes);
    profileApi.get().then(setProfile);
  }, []);

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
            <p className={style.bio}>{profile.bio}</p>
          </section>

          {/* Tech Skills Carousel */}
          <section className={style.techSkills}>
            <h2 className={style.titleHome}>Tech Skills</h2>

            {techIcons.length > 0 && (
              <div className={style.boxCarrosel}>
                <Swiper
                  slidesPerView={3}
                  spaceBetween={30}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 2000, disableOnInteraction: false }}
                  modules={[Pagination, Autoplay]}
                  className={style.swiper}
                >
                  {techIcons.map((icon) => (
                    <SwiperSlide key={icon.id} className={style.swiperSlide}>
                      <img
                        src={icon.iconUrl}
                        alt={icon.name}
                        className={style.techIcon}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </section>

          {/* Certificações */}
          <section className={style.certificacoes}>
            <h2>Certificações</h2>
            <div className={style.certGrid}>
              {certificacoes.map((cert) => (
                <button
                  key={cert.id}
                  className={style.certButton}
                  onClick={() => setModalFile(cert)}
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
                {modalFile.fileType === "pdf" ? (
                  <iframe
                    src={modalFile.fileUrl}
                    width="100%"
                    height="500px"
                    title="Certificado"
                  ></iframe>
                ) : (
                  <img src={modalFile.fileUrl} alt="Certificado" />
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
              {profile.servicesOffered.map((service, i) => (
                <li key={i}>{service}</li>
              ))}
            </ul>

            <p>
              Meu compromisso é transformar ideias em soluções eficientes, com
              qualidade, performance e design profissional.
            </p>
            <SocialLinks links={profile.socialLinks} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Resume;
