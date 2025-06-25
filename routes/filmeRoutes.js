const express = require('express');
const router = express.Router();

const {
  getFilmes,
  getFilmesParaEdicao,
  getFilme,
  createFilme,
  updateFilme,
  deleteFilme,
  newFilme,
  editFilmeForm
} = require('../controllers/filmeController');

// Rota de visualização
router.get('/', getFilmes);

// Rota do modo edição (todos os filmes com botões)
router.get('/edit', getFilmesParaEdicao);

// Formulário para adicionar novo filme
router.get('/new', newFilme);

// Criar novo filme
router.post('/', createFilme);

// Formulário para editar UM filme
router.get('/:id/edit', editFilmeForm);

// Ver detalhes de um filme
router.get('/:id', getFilme);

// Atualizar filme
router.put('/:id', updateFilme);

// Excluir filme
router.delete('/:id', deleteFilme);

module.exports = router;
