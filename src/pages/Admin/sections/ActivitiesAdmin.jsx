import { useEffect, useState } from "react";
import * as activitiesApi from "../../../lib/api/activities";
import ImageUploadField from "../../../components/admin/ImageUploadField";
import ConfirmDeleteButton from "../../../components/admin/ConfirmDeleteButton";
import style from "./Admin.module.css";

const TAGS = ["Trabalho", "Projeto", "Competição", "Certificação"];

const EMPTY_FORM = {
  title: "",
  description: "",
  image: "",
  tag: TAGS[0],
  date: "",
  order: 0,
};

function ActivitiesAdmin() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const refresh = () => {
    setStatus("loading");
    activitiesApi
      .list()
      .then((data) => {
        setItems(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(refresh, []);

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      image: item.image || "",
      tag: item.tag,
      date: item.date,
      order: item.order,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = { ...form, order: Number(form.order) || 0 };

    if (!payload.title || !payload.description) {
      setError("Preencha título e descrição.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await activitiesApi.update(editingId, payload);
      } else {
        await activitiesApi.add(payload);
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
    await activitiesApi.remove(id);
    refresh();
  };

  return (
    <section>
      <h2 className={style.sectionTitle}>
        {editingId ? "Editar atividade" : "Nova atividade"}
      </h2>

      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>
          Título
          <input
            className={style.inputField}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            maxLength={120}
            required
          />
        </label>

        <label className={style.label}>
          Descrição
          <textarea
            className={style.textarea}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            maxLength={600}
            required
          />
        </label>

        <ImageUploadField
          label="Imagem (opcional)"
          value={form.image}
          onUploaded={(url) => setForm({ ...form, image: url })}
        />

        <label className={style.label}>
          Categoria
          <select
            className={style.inputField}
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
          >
            {TAGS.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>

        <label className={style.label}>
          Data (ex: Abril 2026)
          <input
            className={style.inputField}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            maxLength={60}
          />
        </label>

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
            {saving ? "Salvando..." : editingId ? "Salvar alterações" : "Adicionar atividade"}
          </button>
          {editingId && (
            <button type="button" className={style.secondaryBtn} onClick={resetForm}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h2 className={style.sectionTitle}>Atividades existentes</h2>
      {status === "loading" && <p className={style.loadingState}>Carregando...</p>}
      {status === "error" && <p className={style.errorState}>Erro ao carregar.</p>}
      {status === "ready" && items.length === 0 && (
        <p className={style.emptyState}>Nenhuma atividade cadastrada ainda.</p>
      )}

      <div className={style.list}>
        {items.map((item) => (
          <div key={item.id} className={style.listItem}>
            <div className={style.itemInfo}>
              <h3>{item.title}</h3>
              <p>
                {item.tag} · {item.date}
              </p>
            </div>
            <div className={style.itemActions}>
              <button className={style.editBtn} onClick={() => startEdit(item)}>
                Editar
              </button>
              <ConfirmDeleteButton onConfirm={() => handleDelete(item.id)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ActivitiesAdmin;
