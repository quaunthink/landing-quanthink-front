import React from 'react';
import '../styles/AdminDashboard.css';

const ClientDashboard = () => {
  return (
    <div className="admin-dashboard container">
      <header className="admin-header">
        <h1 className="admin-title">Tu Panel</h1>
        <p className="admin-subtitle">Bienvenido/a. Aquí verás tus accesos y avances.</p>
      </header>

      <section className="admin-grid">
        <div className="admin-empty">
          <p>No hay elementos aún. Cuando tengas demos asignados, aparecerán aquí.</p>
        </div>
      </section>
    </div>
  );
};

export default ClientDashboard;
