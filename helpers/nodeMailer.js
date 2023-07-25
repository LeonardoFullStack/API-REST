const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tu_correo@gmail.com', // Reemplaza con tu correo electrónico
      pass: 'tu_contraseña',      // Reemplaza con tu contraseña
    },
  });