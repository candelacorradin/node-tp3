const mongoose = require('mongoose');
const Tarea = require('../models/Tarea');

// Responde 400 con los mensajes de validación del esquema
const manejarError = (res, error) => {
  if (error instanceof mongoose.Error.ValidationError) {
    const errores = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ error: 'Datos inválidos', detalles: errores });
  }
  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  res.status(500).json({ error: 'Error del servidor' });
};

const crearTarea = async (req, res) => {
  try {
    const tarea = await Tarea.create(req.body);
    res.status(201).json(tarea);
  } catch (error) {
    manejarError(res, error);
  }
};

const obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    manejarError(res, error);
  }
};

const obtenerTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(tarea);
  } catch (error) {
    manejarError(res, error);
  }
};

const actualizarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(tarea);
  } catch (error) {
    manejarError(res, error);
  }
};

const eliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndDelete(req.params.id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json({ mensaje: 'Tarea eliminada', tarea });
  } catch (error) {
    manejarError(res, error);
  }
};

module.exports = {
  crearTarea,
  obtenerTareas,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
};
