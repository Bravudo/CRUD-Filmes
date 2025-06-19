const express = require('express');
const {
  getFilmes,
  getFilme,
  createFilme,
  updateFilme,
  deleteFilme,
  newFilme,
  editFilme
} = require('../controllers/filmeController');

const router = express.Router();

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