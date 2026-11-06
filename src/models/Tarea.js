const { Schema, model } = require('mongoose');

const tareaSchema = new Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
      minlength: [3, 'El título debe tener al menos 3 caracteres'],
    },
    descripcion: {
      type: String,
      trim: true,
      default: '',
    },
    completada: {
      type: Boolean,
      default: false,
    },
    prioridad: {
      type: String,
      enum: {
        values: ['baja', 'media', 'alta'],
        message: 'La prioridad debe ser baja, media o alta',
      },
      default: 'media',
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model('Tarea', tareaSchema);
