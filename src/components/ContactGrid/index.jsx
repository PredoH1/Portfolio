import { useRef } from "react";
import emailjs from "emailjs-com";
import style from "../../components/ContactGrid/ContactGrid.module.css";
import bannerContact from "../../assets/bannerContact.png";

function ContactGrid() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_0opgvpm", // ID do serviço no EmailJS
        "template_yp4slvp", // ID do template no EmailJS
        form.current,
        "hk4EdxdSkIthHyA9N" // Public key do EmailJS
      )
      .then(
        () => {
          alert("✅ Mensagem enviada com sucesso!");
          form.current.reset();
        },
        (error) => {
          alert("❌ Erro ao enviar, tente novamente.");
          console.error(error.text);
        }
      );
  };

  return (
    <section className={style.card}>
      {/* Imagem lateral */}
      <div className={style.imgContact}>
        <img src={bannerContact} alt="Imagem de contato" />
      </div>

      {/* Formulário */}
      <div className={style.contactInfo}>
        <h2>Entre em Contato</h2>
        <form ref={form} onSubmit={sendEmail} className={style.form}>
          <input type="text" name="user_name" placeholder="Seu Nome" required />
          <input
            type="email"
            name="user_email"
            placeholder="Seu Email"
            required
          />
          <textarea
            name="message"
            placeholder="Sua Mensagem"
            required
          ></textarea>
          <button type="submit">Enviar Mensagem</button>
        </form>

        <a
          href="https://wa.me/5562992293167"
          target="_blank"
          rel="noopener noreferrer"
          className={style.whatsappBtn}
        >
          Chamar no WhatsApp
        </a>
      </div>
    </section>
  );
}

export default ContactGrid;
