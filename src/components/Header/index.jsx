import style from "../../components/Header/Header.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/">
        <p>home</p>
      </Link>
      <Link to="/projects">
        <p>Projetcs</p>
      </Link>
      <Link to="/contact">
        <p>Contatc</p>
      </Link>
      <Link to="/resume">
        <p>resume</p>
      </Link>
    </header>
  );
}

export default Header;
