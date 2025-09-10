import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      const msg = err?.response?.data?.message || 'No se pudo iniciar sesión';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-wrap">
      <form className="card" onSubmit={handleSubmit}>
        <h1 className="card-title">Inicia sesión</h1>

        {error && <div className="alert">{error}</div>}

        <label className="label" htmlFor="email">Correo</label>
        <input
          id="email"
          type="email"
          className="input"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <label className="label" htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          className="input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button
          className="btn w-full"
          type="submit"
          disabled={submitting}
          aria-label="Iniciar sesión"
        >
          {submitting ? 'Ingresando…' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
