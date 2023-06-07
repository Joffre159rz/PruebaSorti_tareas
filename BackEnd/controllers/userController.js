const sequelize = require("../config/connection");

require("dotenv").config();
const user = require("../models/user");
const nodemailer=require('nodemailer');
const jwt = require('../helpers/jwt');

async function signup(req, res) {
  try {
    const { nombre, telefono, email, password } = req.body;
    if (password) {
        const usuario = await user.findOne({
          attributes: ["email", "password"],
          where: { email: email },
        });
        if (usuario) {
          return res.status(400).json({ message: "Email Existente" });
        } else {
          // Crea el usuario en la base de datos
          const newUser = await user.create({
            nombre,
            telefono,
            email,
            password
          });
          return res
            .status(200)
            .json({
              message: "Registrado Correctamente",
              user: newUser.toJSON(),
            });
        }
    } else {
      res.status(403).json({ error: "No se ingresó una contraseña" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
async function login(req, res) {
  try {
    const data=req.body
    const { email, password } = req.body;
    const ipAddress = getDeviceIP(req);
    const usuario = await user.findOne({
      attributes: ["email", "password", "nombre", "id", "telefono"],
      where: { email: email },
    });
    if (usuario) {
        if (usuario.password==password) {
            const response = {
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario.id,
                telefono: usuario.telefono,
                ip:ipAddress
              };
              if (data.gettoken) {
                const token = jwt.createToken(response);                         
                res.status(200).send({
                    jwt: token,
                    user: response,
                });
                console.log(jwt);
            } else {
                res.status(200).send({
                    user: response,
                    message: 'no token',
                    jwt: jwt.createToken(response),
                });
            }
        } else {
            res
            .status(403)
            .json({ message: "Las credenciales de ingreso no coinciden" });
        }
    } else {
      return res.status(401).json({ message: "Correo no existe" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
// const login=async(req,res)=>{
//  }
const getDeviceIP = (req) => {
  const forwardedIP = req.headers['x-forwarded-for'];
  if (forwardedIP) {
    // Si hay múltiples IP separadas por comas, toma la primera (la más cercana al usuario)
    const ips = forwardedIP.split(',');
    console.log("ip valida");
    return ips[0].trim();
  }
  // Si no se encuentra el encabezado 'X-Forwarded-For', utiliza la IP remota de la conexión
  console.log("localhost");
  return req.connection.remoteAddress;
};


var trasnporter=nodemailer.createTransport({
    service:'hotmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})
async function forgotpassword(req,res){
    try {
        const { email } = req.body;
        const usuario = await user.findOne({
            attributes: ["email", "password"],
            where: { email: email },
        });
        if (usuario) {
            var mailOptions={
                from:process.env.EMAIL,
                to:usuario.email,
                subject:"Contraseña para sistemas de tareas:",
                html:'<p><b> Tu detalles para iniciar secion en el sistema de tareas</b><br><b>Email:</b>'+usuario.email+'<br><b>Contraseña:</b>'+usuario.password+'<br><a href="https://localhost:4200">Click para ingresar</a> </p>'
            };
            trasnporter.sendMail(mailOptions,(error, info)=>{
                if (error) {
                    console.log(error);
                }else{
                    console.log("Email enviado "+ info.response);
                }
            });
            return res.status(200).json({message:"Contraseña enviada correctamente a tu correo"})
        } else {
            return res.status(401).json({ message: "Correo no existe" });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}
async function getAllUsers(req,res){
  try {
    const usuario=await user.findAll()
    return res.status(200).json({
      message: "usuarios:",
      user: usuario,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al consultar los usuarios:",
      error: error,
    });
  }
}
async function updateUserById (req, res){
  const userId = req.params.id;
  const { nombre,telefono,email,password} = req.body;
  try {
    const useredit = await user.findByPk(userId);
    if (!useredit) {
      return res.status(500).json({ error: 'El usuario no existe' });
    }
    useredit.nombre = nombre;
    useredit.telefono = telefono;
    useredit.email = email;
    useredit.password = password;
    await useredit.save();
    return res.status(200).json({
      message: "Atualizado correctamente",
      user: useredit,
    });
  } catch (error) {
    console.error('Error al actualizar el usuario por ID:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario por ID' });
  }
};
module.exports = {
  signup,
  login,
  forgotpassword,
  getAllUsers,
  updateUserById,
};
