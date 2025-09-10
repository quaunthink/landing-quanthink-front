import React, { useState } from 'react';
import '../styles/EditDemoPage.css';

const EditDemoPage = () => {
  const [title, setTitle] = useState('Título de Demo');
  const [subtitle, setSubtitle] = useState('Subtítulo / descripción breve');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setMsg('');
    // Aquí iría tu apiClient.put(`/api/demos/${id}`, {...})
    setTimeout(() => {
      setSaving(false);
      setMsg('Cambios guardados');
    }, 600);
  };

  return (
    <div className="edit-demo container">
      <header className="edit-header">
        <h1>Editar Demo</h1>
        <p>Actualiza el contenido de tu demo.</p>
      </header>

      {msg && <div className="edit-alert">{msg}</div>}

      <form className="edit-form" onSubmit={onSubmit}>
        <label className="edit-label" htmlFor="title">Título</label>
        <input
          id="title"
          className="edit-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nombre del demo"
        />

        <label className="edit-label" htmlFor="subtitle">Descripción</label>
        <textarea
          id="subtitle"
          className="edit-textarea"
          rows={5}
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Descripción corta..."
        />

        <button className="edit-btn" type="submit" disabled={saving}>
          {saving ? 'Guardando…' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  );
};

export default EditDemoPage;
