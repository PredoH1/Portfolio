import style from "../../components/ContactGrid/ContactGrid.module.css";
import bannerContact from "../../assets/bannerContact.png";
import { useState } from "react";

function ContactGrid() {
  return (
    <section className={style.container}>
      <div className={style.bannerBox}>
        <img src={bannerContact} alt="bannner de contato" />
      </div>
      <div>Formulario pra entrar em contato + link do whatsapp</div>
    </section>
  );
}

export default ContactGrid;
