import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import style from "./Login.module.css";

function Login() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to="/painel-x7k9" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/painel-x7k9");
    } catch {
      setError("Email ou senha incorretos.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={style.main}>
      <form className={style.card} onSubmit={handleSubmit}>
        <h1 className={style.title}>Painel Administrativo</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={style.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={style.input}
        />
        {error && <p className={style.error}>{error}</p>}
        <button type="submit" className={style.button} disabled={submitting}>
          {submitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}

export default Login;
