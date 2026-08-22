import style from "./ConfirmDeleteButton.module.css";

function ConfirmDeleteButton({ onConfirm, label = "Excluir", confirmMessage }) {
  const handleClick = () => {
    if (window.confirm(confirmMessage || "Tem certeza que deseja excluir?")) {
      onConfirm();
    }
  };

  return (
    <button type="button" className={style.deleteBtn} onClick={handleClick}>
      {label}
    </button>
  );
}

export default ConfirmDeleteButton;
