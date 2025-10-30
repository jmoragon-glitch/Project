const express = require("express");
const router = express.Router(); // Crear la señal
const Usuario = require("../models/usuario.model");

// Rutas

// Post: Crear / enviar datos al servidor
router.post("/", async(req, res) => {
    const{correo, nombre, cedula, celular, contrasenia} = req.body;

    if(!correo || !nombre || !cedula || !celular || !contrasenia){
        return res.status(400).json({mensaje: "Todos los campos son obligatorios"});
    }
});