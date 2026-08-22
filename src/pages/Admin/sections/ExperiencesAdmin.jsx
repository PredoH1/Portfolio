import { useEffect, useState } from "react";
import * as experiencesApi from "../../../lib/api/experiences";
import ConfirmDeleteButton from "../../../components/admin/ConfirmDeleteButton";
import style from "./Admin.module.css";

const EMPTY_FORM = {
  company: "",
  role: "",
  location: "",
  date: "",
  details: [""],
  order: 0,
};

function ExperiencesAdmin() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const refresh = () => {
    setStatus("loading");
    experiencesApi
      .list()
      .then((data) => {
        setItems(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(refresh, []);

  const startEdit = (exp) => {
    setEditingId(exp.id);
    setForm({
      company: exp.company,
      role: exp.role,
      location: exp.location,
      date: exp.date,
      details: exp.details.length ? exp.details : [""],
      order: exp.order,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
  };

  const updateDetail = (index, value) => {
    const next = [...form.details];
    next[index] = value;
    setForm({ ...form, details: next });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      details: form.details.map((d) => d.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    };

    if (!payload.company || !payload.role || !payload.details.length) {
      setError("Preencha empresa, cargo e ao menos um detalhe.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await experiencesApi.update(editingId, payload);
      } else {
        await experiencesApi.add(payload);
      }
      resetForm();
      refresh();
    } catch {
      setError("Erro ao salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    await experiencesApi.remove(id);
    refresh();
  };

  return (
    <section>
      <h2 className={style.sectionTitle}>
        {editingId ? "Editar experiência" : "Nova experiência"}
      </h2>

      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>
          Empresa
          <input
            className={style.inputField}
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            maxLength={120}
            required
          />
        </label>

        <label className={style.label}>
          Cargo
          <input
            className={style.inputField}
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            maxLength={120}
            required
          />
        </label>

        <label className={style.label}>
          Local
          <input
            className={style.inputField}
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            maxLength={120}
          />
        </label>

        <label className={style.label}>
          Período (ex: Nov 2025 - Present)
          <input
            className={style.inputField}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            maxLength={60}
          />
        </label>

        <div className={style.label}>
          Detalhes/responsabilidades
          <div className={style.arrayField}>
            {form.details.map((detail, i) => (
              <div key={i} className={style.arrayRow}>
                <textarea
                  className={style.textarea}
                  value={detail}
                  maxLength={500}
                  onChange={(e) => updateDetail(i, e.target.value)}
                />
                <button
                  type="button"
                  className={style.removeBtn}
                  onClick={() =>
                    setForm({
                      ...form,
                      details: form.details.filter((_, idx) => idx !== i),
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
              onClick={() => setForm({ ...form, details: [...form.details, ""] })}
            >
              + Adicionar detalhe
            </button>
          </div>
        </div>

        <label className={style.label}>
          Ordem de exibição
          <input
            type="number"
            className={style.inputField}
            value={form.order}
            onChange={(e) => setForm({ ...form, order: e.target.value })}
          />
        </label>

        {error && <p className={style.error}>{error}</p>}

        <div className={style.formActions}>
          <button className={style.primaryBtn} type="submit" disabled={saving}>
            {saving ? "Salvando..." : editingId ? "Salvar alterações" : "Adicionar experiência"}
          </button>
          {editingId && (
            <button type="button" className={style.secondaryBtn} onClick={resetForm}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h2 className={style.sectionTitle}>Experiências existentes</h2>
      {status === "loading" && <p className={style.loadingState}>Carregando...</p>}
      {status === "error" && <p className={style.errorState}>Erro ao carregar.</p>}
      {status === "ready" && items.length === 0 && (
        <p className={style.emptyState}>Nenhuma experiência cadastrada ainda.</p>
      )}

      <div className={style.list}>
        {items.map((exp) => (
          <div key={exp.id} className={style.listItem}>
            <div className={style.itemInfo}>
              <h3>{exp.role}</h3>
              <p>
                {exp.company} · {exp.date}
              </p>
            </div>
            <div className={style.itemActions}>
              <button className={style.editBtn} onClick={() => startEdit(exp)}>
                Editar
              </button>
              <ConfirmDeleteButton onConfirm={() => handleDelete(exp.id)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExperiencesAdmin;
