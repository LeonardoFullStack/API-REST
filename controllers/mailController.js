const nodemailer = require('nodemailer');


const nodeMailerController = (req,res) => {

   const {name,email,text} = req.body

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'joneszegbe@gmail.com', // Reemplaza con tu correo electrónico
          pass: process.env.CLAU_MAIL,      // Reemplaza con tu contraseña
        },
      });
      
    const mailOptions = {
        from: 'joneszegbe@gmail.com',
        to: 'esteveleonardo@gmail.com', // Reemplaza con la dirección de correo del destinatario
        subject: 'Nueva notificación de contacto de mi web. Email: ' + email,
        text: text,
      };
    
      // Enviar el correo electrónico
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);

          res.status(400).json({
            ok:false,
            msg:  'Error al enviar el correo electrónico'
          })

        } else {
          
          res.status(200).json({
            ok:true,
            msg: 'Correo electrónico enviado: ' + info.response
          })
          
        }
      });

    
}

module.exports = {
    nodeMailerController
}