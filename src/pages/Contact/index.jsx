import { useEffect, useState } from "react";
import Header from "../../components/Header";
import ContactGrid from "../../components/ContactGrid";
import style from "../Contact/Contact.module.css";
import Footer from "../../components/Footer";
import SocialLinks from "../../components/SocialLinks";
import * as profileApi from "../../lib/api/profile";

function Contact() {
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    profileApi.get().then((profile) => setSocialLinks(profile.socialLinks));
  }, []);

  return (
    <>
      <Header />
      <section className={style.sectionInfo}>
        <ContactGrid />
        <SocialLinks links={socialLinks} />
      </section>
      <Footer />
    </>
  );
}

export default Contact;
