const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/contacto', (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  if (!nombre || !email || !asunto || !mensaje) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  console.log('📩 Datos recibidos en el servidor:', { nombre, email, asunto, mensaje });

  res.status(200).json({
    mensaje: 'Formulario recibido y procesado con éxito por el servidor Node.js',
    datos: { nombre, email, asunto, mensaje }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend Node.js corriendo en el puerto ${PORT}`);
}); 