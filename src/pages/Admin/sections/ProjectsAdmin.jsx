import { useEffect, useState } from "react";
import * as projectsApi from "../../../lib/api/projects";
import ImageUploadField from "../../../components/admin/ImageUploadField";
import ConfirmDeleteButton from "../../../components/admin/ConfirmDeleteButton";
import style from "./Admin.module.css";

const EMPTY_FORM = {
  name: "",
  summary: "",
  description: [""],
  images: [],
  techs: [""],
  github: "",
  demo: "",
  order: 0,
};

function ProjectsAdmin() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const refresh = () => {
    setStatus("loading");
    projectsApi
      .list()
      .then((data) => {
        setItems(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(refresh, []);

  const startEdit = (project) => {
    setEditingId(project.id);
    setForm({
      name: project.name,
      summary: project.summary,
      description: project.description.length ? project.description : [""],
      images: project.images,
      techs: project.techs.length ? project.techs : [""],
      github: project.github || "",
      demo: project.demo || "",
      order: project.order,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
  };

  const updateListField = (field, index, value) => {
    const next = [...form[field]];
    next[index] = value;
    setForm({ ...form, [field]: next });
  };

  const addListRow = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeListRow = (field, index) => {
    setForm({ ...form, [field]: form[field].filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      description: form.description.map((d) => d.trim()).filter(Boolean),
      techs: form.techs.map((t) => t.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    };

    if (!payload.name || !payload.description.length || !payload.images.length) {
      setError("Preencha nome, ao menos um parágrafo de descrição e uma imagem.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await projectsApi.update(editingId, payload);
      } else {
        await projectsApi.add(payload);
      }
      resetForm();
      refresh();
    } catch {
      setError("Erro ao salvar o projeto. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    await projectsApi.remove(id);
    refresh();
  };

  return (
    <section>
      <h2 className={style.sectionTitle}>
        {editingId ? "Editar projeto" : "Novo projeto"}
      </h2>

      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>
          Nome
          <input
            className={style.inputField}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            maxLength={120}
            required
          />
        </label>

        <label className={style.label}>
          Resumo curto (aparece no card)
          <textarea
            className={style.textarea}
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            maxLength={300}
          />
        </label>

        <div className={style.label}>
          Descrição (parágrafos)
          <div className={style.arrayField}>
            {form.description.map((paragraph, i) => (
              <div key={i} className={style.arrayRow}>
                <textarea
                  className={style.textarea}
                  value={paragraph}
                  maxLength={2000}
                  onChange={(e) =>
                    updateListField("description", i, e.target.value)
                  }
                />
                <button
                  type="button"
                  className={style.removeBtn}
                  onClick={() => removeListRow("description", i)}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              className={style.addRowBtn}
              onClick={() => addListRow("description")}
            >
              + Adicionar parágrafo
            </button>
          </div>
        </div>

        <div className={style.label}>
          Imagens
          <ImageUploadField
            label="Adicionar imagem"
            onUploaded={(url) =>
              setForm({ ...form, images: [...form.images, url] })
            }
          />
          <div className={style.arrayField}>
            {form.images.map((url, i) => (
              <div key={i} className={style.arrayRow}>
                <img
                  src={url}
                  alt={`Imagem ${i + 1}`}
                  style={{ width: 60, height: 45, objectFit: "cover" }}
                />
                <button
                  type="button"
                  className={style.removeBtn}
                  onClick={() => removeListRow("images", i)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={style.label}>
          Tecnologias
          <div className={style.arrayField}>
            {form.techs.map((tech, i) => (
              <div key={i} className={style.arrayRow}>
                <input
                  className={style.inputField}
                  value={tech}
                  maxLength={40}
                  onChange={(e) => updateListField("techs", i, e.target.value)}
                />
                <button
                  type="button"
                  className={style.removeBtn}
                  onClick={() => removeListRow("techs", i)}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              className={style.addRowBtn}
              onClick={() => addListRow("techs")}
            >
              + Adicionar tecnologia
            </button>
          </div>
        </div>

        <label className={style.label}>
          Link do GitHub (opcional)
          <input
            className={style.inputField}
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            maxLength={300}
          />
        </label>

        <label className={style.label}>
          Link da demo (opcional)
          <input
            className={style.inputField}
            value={form.demo}
            onChange={(e) => setForm({ ...form, demo: e.target.value })}
            maxLength={300}
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
            {saving ? "Salvando..." : editingId ? "Salvar alterações" : "Adicionar projeto"}
          </button>
          {editingId && (
            <button
              type="button"
              className={style.secondaryBtn}
              onClick={resetForm}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h2 className={style.sectionTitle}>Projetos existentes</h2>
      {status === "loading" && <p className={style.loadingState}>Carregando...</p>}
      {status === "error" && <p className={style.errorState}>Erro ao carregar.</p>}
      {status === "ready" && items.length === 0 && (
        <p className={style.emptyState}>Nenhum projeto cadastrado ainda.</p>
      )}

      <div className={style.list}>
        {items.map((project) => (
          <div key={project.id} className={style.listItem}>
            <div className={style.itemInfo}>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
            </div>
            <div className={style.itemActions}>
              <button className={style.editBtn} onClick={() => startEdit(project)}>
                Editar
              </button>
              <ConfirmDeleteButton onConfirm={() => handleDelete(project.id)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsAdmin;
