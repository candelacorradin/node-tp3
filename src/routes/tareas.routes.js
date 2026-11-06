const { Router } = require('express');
const {
  crearTarea,
  obtenerTareas,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
} = require('../controllers/tareas.controller');

const router = Router();

router.post('/', crearTarea);
router.get('/', obtenerTareas);
router.get('/:id', obtenerTarea);
router.put('/:id', actualizarTarea);
router.delete('/:id', eliminarTarea);

module.exports = router;
