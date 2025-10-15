import Header from "../../components/Header";
import Grid from "../../components/Grid";
import style from "./Projects.module.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

function Projects() {
  return (
    <>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          {/* Botão de voltar */}
          <div className={style.backContainer}>
            <Link to="/" className={style.backLink}>
              ◀ Voltar para Home
            </Link>
          </div>

          {/* Título */}
          <h1 className={style.pageTitle}>Todos os Projetos</h1>

          {/* Grid de projetos */}
          <Grid />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Projects;
