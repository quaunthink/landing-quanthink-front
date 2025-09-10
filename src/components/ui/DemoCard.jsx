import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/DemoCard.css';

const DemoCard = ({ demo }) => {
  return (
    <article className="demo-card">
      <div className="demo-card-header">
        <span className="demo-tag">{demo.tag}</span>
      </div>
      <div className="demo-card-body">
        <h3 className="demo-title">{demo.title}</h3>
        <p className="demo-subtitle">{demo.subtitle}</p>
      </div>
      <div className="demo-card-actions">
        <Link className="demo-btn" to={`/admin/demos/edit/${demo.id}`}>Editar</Link>
      </div>
    </article>
  );
};

export default DemoCard;
