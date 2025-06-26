import style from "../../components/Header/Header.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <header className={style.header}>
      <section className={style.container}>
        <div className={style.boxLogo}>
          <Link to="/">
            <p>Pedro Henrique Souza Candido</p>
          </Link>
        </div>
        <nav>
          <Link to="/projects">
            <p>Projetcs</p>
          </Link>
          <Link to="/contact">
            <p>Contatcs</p>
          </Link>
          <Link to="/resume">
            <p>resume</p>
          </Link>
        </nav>
      </section>
    </header>
  );
}

export default Header;
