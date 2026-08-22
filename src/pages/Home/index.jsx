import Header from "../../components/Header";
import Grid from "../../components/Grid";
import style from "../Home/Home.module.css";
import { useState, useEffect } from "react";
import ContactGrid from "../../components/ContactGrid";
import Footer from "../../components/Footer";
import ActivityGallery from "../../components/ActivityGallery";
import * as experiencesApi from "../../lib/api/experiences";
import * as profileApi from "../../lib/api/profile";
import { useCollection } from "../../hooks/useCollection";

function Home() {
  const { data: experiences, status } = useCollection(experiencesApi.list);
  const [bio, setBio] = useState("");

  useEffect(() => {
    profileApi.get().then((profile) => setBio(profile.bio));
  }, []);

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
            <p className={style.apresentacao}>{bio}</p>
          </section>

          <ActivityGallery />

          <section className={style.experience}>
            <h1 className={style.titleHome}>Experiências</h1>

            {status === "loading" && (
              <p className={style.status}>Carregando experiências...</p>
            )}
            {status === "error" && (
              <p className={style.status}>
                Não foi possível carregar as experiências.
              </p>
            )}

            {status === "ready" && experiences.length > 0 && (
              <>
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
                          key={exp.id}
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
                  <p className={style.location}>
                    {experiences[selected].location}
                  </p>
                  <ul>
                    {experiences[selected].details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </section>
          <section className={style.projetos}>
            <h2>Projetos Recentes</h2>
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
