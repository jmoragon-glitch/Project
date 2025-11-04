// Producto Model / Schema

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaProducto = new mongoose.Schema({
    codigo:{
        type: String,
        required: true,
        unique: true
    },
    nombre:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true

    },
    marca:{
        type: String,
        required: true
    },
    cantidadDisponible:{
        type: Number,
        required: true,
        default: 0
    },
    enInventario:{
        type: Boolean,
        default: true
    }
});

// Middleware pre-save
schemaProducto.pre("save", function (next) {
  // Si cantidadDisponible > 0 → debe estar en inventario
  if (this.cantidadDisponible > 0 && this.enInventario === false) {
    this.enInventario = true;
  }

  // Si cantidadDisponible = 0 → debe salir del inventario
  if (this.cantidadDisponible === 0 && this.enInventario === true) {
    this.enInventario = false;
  }

  next();
});

const Producto = mongoose.model("Producto", schemaProducto);
module.exports = Producto;