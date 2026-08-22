import { useEffect, useState } from "react";
import * as profileApi from "../../../lib/api/profile";
import style from "./Admin.module.css";

function ProfileAdmin() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    profileApi.get().then(setForm);
  }, []);

  if (!form) return <p className={style.loadingState}>Carregando...</p>;

  const updateService = (index, value) => {
    const next = [...form.servicesOffered];
    next[index] = value;
    setForm({ ...form, servicesOffered: next });
  };

  const updateSocial = (key, value) => {
    setForm({ ...form, socialLinks: { ...form.socialLinks, [key]: value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaved(false);

    const payload = {
      ...form,
      servicesOffered: form.servicesOffered.map((s) => s.trim()).filter(Boolean),
    };

    setSaving(true);
    try {
      await profileApi.update(payload);
      setSaved(true);
    } catch {
      setError("Erro ao salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <h2 className={style.sectionTitle}>Perfil e links</h2>
      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>
          Bio (aparece na Home e no Resume)
          <textarea
            className={style.textarea}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            maxLength={2000}
          />
        </label>

        <div className={style.label}>
          Serviços oferecidos
          <div className={style.arrayField}>
            {form.servicesOffered.map((service, i) => (
              <div key={i} className={style.arrayRow}>
                <input
                  className={style.inputField}
                  value={service}
                  maxLength={200}
                  onChange={(e) => updateService(i, e.target.value)}
                />
                <button
                  type="button"
                  className={style.removeBtn}
                  onClick={() =>
                    setForm({
                      ...form,
                      servicesOffered: form.servicesOffered.filter(
                        (_, idx) => idx !== i
                      ),
                    })
                  }
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              className={style.addRowBtn}
              onClick={() =>
                setForm({
                  ...form,
                  servicesOffered: [...form.servicesOffered, ""],
                })
              }
            >
              + Adicionar serviço
            </button>
          </div>
        </div>

        <label className={style.label}>
          Instagram (URL completa)
          <input
            className={style.inputField}
            value={form.socialLinks.instagram}
            onChange={(e) => updateSocial("instagram", e.target.value)}
            maxLength={300}
          />
        </label>

        <label className={style.label}>
          GitHub (URL completa)
          <input
            className={style.inputField}
            value={form.socialLinks.github}
            onChange={(e) => updateSocial("github", e.target.value)}
            maxLength={300}
          />
        </label>

        <label className={style.label}>
          LinkedIn (URL completa)
          <input
            className={style.inputField}
            value={form.socialLinks.linkedin}
            onChange={(e) => updateSocial("linkedin", e.target.value)}
            maxLength={300}
          />
        </label>

        <label className={style.label}>
          WhatsApp (URL completa, ex: https://wa.me/55...)
          <input
            className={style.inputField}
            value={form.socialLinks.whatsapp}
            onChange={(e) => updateSocial("whatsapp", e.target.value)}
            maxLength={300}
          />
        </label>

        {error && <p className={style.error}>{error}</p>}
        {saved && !error && (
          <p className={style.loadingState}>Salvo com sucesso.</p>
        )}

        <div className={style.formActions}>
          <button className={style.primaryBtn} type="submit" disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProfileAdmin;
