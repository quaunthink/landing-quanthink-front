import React from 'react';
import '../styles/AdminDashboard.css';
import DemoCard from '../components/ui/DemoCard';

const mockDemos = [
  { id: 'd1', title: 'Demo IA Legal', subtitle: 'Comparador Legislativo', tag: 'Activo' },
  { id: 'd2', title: 'Demo IA Médica', subtitle: 'Rayos X (MSG1973)', tag: 'Beta' },
  { id: 'd3', title: 'Demo Data Gob', subtitle: 'Contrataciones Abiertas', tag: 'Privado' },
];

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard container">
      <header className="admin-header">
        <h1 className="admin-title">Panel de Administración</h1>
        <p className="admin-subtitle">Gestiona tus demos y contenido</p>
      </header>

      <section className="admin-grid">
        {mockDemos.map(demo => (
          <DemoCard key={demo.id} demo={demo} />
        ))}
      </section>
    </div>
  );
};

export default AdminDashboard;
