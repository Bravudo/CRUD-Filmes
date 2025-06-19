const express = require('express');
const {
  getFilmes,
  getFilme,
  createFilme,
  updateFilme,
  deleteFilme
} = require('../controllers/filmeController');

const router = express.Router();

router.route('/')
  .get(getFilmes)
  .post(createFilme);

router.route('/:id')
  .get(getFilme)
  .put(updateFilme)
  .delete(deleteFilme);

module.exports = router;