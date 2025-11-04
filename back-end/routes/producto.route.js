const express = require("express");
const router = express.Router();
const Producto = require("../models/producto.model");

// POST: Crear / enviar datos al servidor
router.post("/", async (req, res) => {
  console.log("📩 Body recibido:", req.body);

  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();

    res.status(201).json(nuevoProducto); // 201: creado correctamente
  } catch (error) {
    console.error("Error creando producto:", error);

    // Si quieres, aquí sí puedes mandar un mensaje genérico
    res.status(400).json({
      mensaje: "Error al crear el producto",
      detalle: error.message
    });
  }
});

// GET: Obtener los datos de todos los Productos
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(400).json({ mensajeError: error.message });
  }
});

module.exports = router;
