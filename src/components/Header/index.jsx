import style from "../../components/Header/Header.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={style.header}>
      <section className={style.container}>
        <div className={style.boxLogo}>
          <Link to="/">
            <p>Pedro Henrique Souza Candido</p>
          </Link>
        </div>

        <nav>
          <button
            className={style.menuIcon}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className={`${style.links} ${menuOpen ? style.active : ""}`}>
            <Link to="/projects" onClick={() => setMenuOpen(false)}>
              <p>Projects</p>
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              <p>Contacts</p>
            </Link>
            <Link to="/resume" onClick={() => setMenuOpen(false)}>
              <p>Resume</p>
            </Link>
          </div>
        </nav>
      </section>
    </header>
  );
}

export default Header;
