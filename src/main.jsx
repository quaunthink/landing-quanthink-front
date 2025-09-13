// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import App from './App.jsx';

const hasAPI =
  (import.meta.env && import.meta.env.VITE_API_BASE) ? true : false;

function Root() {
  const content = <App />;

  return (
    <React.StrictMode>
      <BrowserRouter>
        {hasAPI ? <AuthProvider>{content}</AuthProvider> : content}
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
