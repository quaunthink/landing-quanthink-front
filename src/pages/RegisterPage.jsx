import React, { useState } from 'react';
import '../styles/LoginPage.css';
import apiClient from '../services/apiClient';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErr('');
    setMsg('');
    try {
      await apiClient.post('/auth/register', { email, password });
      setMsg('Usuario creado. Ya puedes iniciar sesión.');
    } catch (error) {
      const m = error?.response?.data?.message || 'No se pudo registrar';
      setErr(m);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-wrap">
      <form className="card" onSubmit={onSubmit}>
        <h1 className="card-title">Crear cuenta</h1>

        {err && <div className="alert">{err}</div>}
        {msg && (
          <div
            className="alert"
            style={{
              borderColor: '#5fbf7a',
              color: '#b7ffd0',
              background: 'rgba(95,191,122,0.12)',
            }}
          >
            {msg}
          </div>
        )}

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
          autoComplete="new-password"
        />

        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? 'Creando…' : 'Registrarme'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
