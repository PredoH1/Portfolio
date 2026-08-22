import { useEffect, useState } from "react";
import * as resumeApi from "../../../lib/api/resume";
import ImageUploadField from "../../../components/admin/ImageUploadField";
import ConfirmDeleteButton from "../../../components/admin/ConfirmDeleteButton";
import style from "./Admin.module.css";

function TechIconsSection() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [name, setName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [error, setError] = useState("");

  const refresh = () => {
    setStatus("loading");
    resumeApi
      .listTechIcons()
      .then((data) => {
        setItems(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(refresh, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !iconUrl) {
      setError("Preencha o nome e envie o ícone.");
      return;
    }
    await resumeApi.addTechIcon({ name, iconUrl, order: items.length });
    setName("");
    setIconUrl("");
    refresh();
  };

  const handleDelete = async (id) => {
    await resumeApi.removeTechIcon(id);
    refresh();
  };

  return (
    <div>
      <h2 className={style.sectionTitle}>Tech skills</h2>
      <form className={style.form} onSubmit={handleAdd}>
        <label className={style.label}>
          Nome da tecnologia
          <input
            className={style.inputField}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
          />
        </label>
        <ImageUploadField
          label="Ícone"
          value={iconUrl}
          onUploaded={(url) => setIconUrl(url)}
        />
        {error && <p className={style.error}>{error}</p>}
        <div className={style.formActions}>
          <button className={style.primaryBtn} type="submit">
            Adicionar ícone
          </button>
        </div>
      </form>

      {status === "loading" && <p className={style.loadingState}>Carregando...</p>}
      {status === "ready" && items.length === 0 && (
        <p className={style.emptyState}>Nenhum ícone cadastrado ainda.</p>
      )}
      <div className={style.list}>
        {items.map((icon) => (
          <div key={icon.id} className={style.listItem}>
            <div className={style.itemInfo}>
              <h3>{icon.name}</h3>
            </div>
            <div className={style.itemActions}>
              <ConfirmDeleteButton onConfirm={() => handleDelete(icon.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificatesSection() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const refresh = () => {
    setStatus("loading");
    resumeApi
      .listCertificates()
      .then((data) => {
        setItems(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(refresh, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !file) {
      setError("Preencha o nome e envie o certificado.");
      return;
    }
    await resumeApi.addCertificate({
      name,
      fileUrl: file.url,
      fileType: file.fileType,
      order: items.length,
    });
    setName("");
    setFile(null);
    refresh();
  };

  const handleDelete = async (id) => {
    await resumeApi.removeCertificate(id);
    refresh();
  };

  return (
    <div>
      <h2 className={style.sectionTitle}>Certificados</h2>
      <form className={style.form} onSubmit={handleAdd}>
        <label className={style.label}>
          Nome do certificado
          <input
            className={style.inputField}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={120}
          />
        </label>
        <ImageUploadField
          label="Arquivo (imagem ou PDF)"
          value={file?.url}
          onUploaded={(url, fileType) => setFile({ url, fileType })}
        />
        {error && <p className={style.error}>{error}</p>}
        <div className={style.formActions}>
          <button className={style.primaryBtn} type="submit">
            Adicionar certificado
          </button>
        </div>
      </form>

      {status === "loading" && <p className={style.loadingState}>Carregando...</p>}
      {status === "ready" && items.length === 0 && (
        <p className={style.emptyState}>Nenhum certificado cadastrado ainda.</p>
      )}
      <div className={style.list}>
        {items.map((cert) => (
          <div key={cert.id} className={style.listItem}>
            <div className={style.itemInfo}>
              <h3>{cert.name}</h3>
            </div>
            <div className={style.itemActions}>
              <ConfirmDeleteButton onConfirm={() => handleDelete(cert.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResumeAdmin() {
  return (
    <>
      <TechIconsSection />
      <CertificatesSection />
    </>
  );
}

export default ResumeAdmin;
