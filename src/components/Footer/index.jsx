import style from "../../components/Footer/Footer.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import imgProfile from "../../assets/imgProfile.jpg";

function Footer() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <footer className={style.footer}>
      <div className={style.boxProfile}>
        <div className={style.cardProfile}>
          <img src={imgProfile} alt="imagem perfil" />
        </div>
        <h3>Pedro Henrique</h3>
        <p>Desenvolvedor Full-Stack / Automação</p>
      </div>

      <div className={style.boxCall}>
        <h1>Transforme sua ideia em um projeto real!</h1>
        <p>
          Quer modernizar o seu negócio, automatizar processos ou ter um sistema
          exclusivo que atenda às suas necessidades? Eu posso te ajudar!
        </p>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>
          <button type="submit">Entrar em Contato</button>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
