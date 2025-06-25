const express = require('express');
const router = express.Router();
const {
  getFilmes,
  getFilme,
  createFilme,
  updateFilme,
  deleteFilme,
  newFilme,
  editFilme
} = require('../controllers/filmeController');

router.route('/')
  .get(getFilmes)
  .post(createFilme);

router.get('/new', newFilme);

router.route('/:id')
  .get(getFilme)
  .put(updateFilme)
  .delete(deleteFilme);

router.get('/:id/edit', editFilme);

module.exports = router;