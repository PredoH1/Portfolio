import { useState } from "react";
import { uploadFile } from "../../../lib/cloudinary";
import style from "./ImageUploadField.module.css";

function ImageUploadField({ label, value, onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);
    try {
      const { url, fileType } = await uploadFile(file);
      onUploaded(url, fileType);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className={style.field}>
      <label className={style.label}>{label}</label>

      {value && (
        <div className={style.preview}>
          {value.endsWith(".pdf") ? (
            <span className={style.pdfBadge}>PDF anexado</span>
          ) : (
            <img src={value} alt="Preview" className={style.previewImg} />
          )}
        </div>
      )}

      <input
        type="file"
        accept="image/png,image/jpeg,image/webp,application/pdf"
        onChange={handleChange}
        disabled={uploading}
        className={style.input}
      />

      {uploading && <span className={style.status}>Enviando...</span>}
      {error && <span className={style.error}>{error}</span>}
    </div>
  );
}

export default ImageUploadField;
