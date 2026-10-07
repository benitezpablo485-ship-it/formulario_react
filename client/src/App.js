import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const [estado, setEstado] = useState({ cargando: false, exito: null, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado({ cargando: true, exito: null, error: null });

    try {
      const response = await fetch('http://localhost:5000/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Error al enviar los datos');

      setEstado({ cargando: false, exito: '¡Formulario enviado con éxito!', error: null });
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    } catch (err) {
      setEstado({ cargando: false, exito: null, error: err.message });
    }
  };

  return (
    <div className="container">
      <h2>Formulario de Contacto</h2>
      <p className="subtitle">Desarrollado con React JS (Create React App) + Node.js Backend</p>

      {estado.exito && <div className="alert alert-success">{estado.exito}</div>}
      {estado.error && <div className="alert alert-danger">{estado.error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
        </div>

        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Asunto:</label>
          <input
            type="text"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            placeholder="Motivo de consulta"
            required
          />
        </div>

        <div className="form-group">
          <label>Mensaje:</label>
          <textarea
            name="mensaje"
            rows="4"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Escribí tu mensaje acá..."
            required
          ></textarea>
        </div>

        <button type="submit" disabled={estado.cargando}>
          {estado.cargando ? 'Enviando...' : 'Enviar Formulario'}
        </button>
      </form>
    </div>
  );
}

export default App;