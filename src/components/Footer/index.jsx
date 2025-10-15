import style from "../../components/Footer/Footer.module.css";
import { Link } from "react-router-dom";
import imgProfile from "../../assets/imgProfile.jpg";

function Footer() {
  return (
    <footer className={style.footer}>
      {/* Perfil */}
      <div className={style.boxProfile}>
        <div className={style.cardProfile}>
          <img src={imgProfile} alt="Imagem de perfil" />
        </div>
        <h3>Pedro Henrique</h3>
        <p>Desenvolvedor Full-Stack / Automação</p>
      </div>

      {/* Chamada */}
      <div className={style.boxCall}>
        <h1>
          Transforme sua <span className={style.gradientText}>ideia</span> em um
          projeto real!
        </h1>
        <p>
          Quer modernizar o seu negócio, automatizar processos ou ter um sistema
          exclusivo que atenda às suas necessidades? Eu posso te ajudar!
        </p>
        <Link to="/contact">
          <button type="button">Entrar em Contato</button>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
