const mongoose = require('mongoose');
const Filme = require('../models/Filme');

// LISTAR TODOS
exports.getFilmes = async (req, res) => {
  try {
    const filmes = await Filme.find().sort({ createdAt: -1 });
    res.render('filmes/index', {
      title: 'Todos os Filmes',
      filmes
    });
  } catch (err) {
    res.status(500).render('error', {
      title: 'Erro',
      error: 'Falha ao carregar filmes'
    });
  }
};

// MODO EDIÇÃO: LISTAR COM BOTÕES
exports.getFilmesParaEdicao = async (req, res) => {
  try {
    const filmes = await Filme.find().sort({ createdAt: -1 });

    res.render('filmes/edit', {
      title: 'Editar Filmes',
      filmes
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', {
      title: 'Erro ao carregar filmes',
      error: err.message
    });
  }
};

// FORMULÁRIO DE EDIÇÃO DE UM FILME ESPECÍFICO
exports.editFilmeForm = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).render('error', {
      title: 'ID inválido',
      error: `O ID fornecido (${id}) não é válido.`
    });
  }

  try {
    const filme = await Filme.findById(id);

    if (!filme) {
      return res.status(404).render('error', {
        title: 'Filme não encontrado',
        error: 'O filme solicitado para edição não existe.'
      });
    }

    res.render('filmes/editForm', {
      title: `Editar: ${filme.titulo}`,
      filme
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', {
      title: 'Erro ao carregar filme para edição',
      error: err.message
    });
  }
};

// DETALHE DE UM FILME
exports.getFilme = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).render('error', {
      title: 'ID inválido',
      error: `O ID fornecido (${id}) não é válido.`
    });
  }

  try {
    const filme = await Filme.findById(id);

    if (!filme) {
      return res.status(404).render('error', {
        title: 'Filme não encontrado',
        error: 'O filme solicitado não existe'
      });
    }

    res.render('filmes/show', {
      title: filme.titulo,
      filme
    });

  } catch (err) {
    console.error(err);
    res.status(500).render('error', {
      title: 'Erro ao carregar filme',
      error: err.message
    });
  }
};

// FORM DE NOVO FILME
exports.newFilme = (req, res) => {
  res.render('filmes/new', {
    title: 'Adicionar Novo Filme',
    filme: new Filme()
  });
};

// CRIAR FILME
exports.createFilme = async (req, res) => {
  try {
    const filme = await Filme.create(req.body);
    res.redirect(`/filmes/${filme._id}`);
  } catch (err) {
    res.render('filmes/new', {
      title: 'Adicionar Filme - Erro',
      error: err.message,
      filme: req.body
    });
  }
};

// ATUALIZAR FILME
exports.updateFilme = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).render('error', {
      title: 'ID inválido',
      error: `O ID fornecido (${id}) não é válido.`
    });
  }

  try {
    const { titulo, descricao, diretor, genero, elenco, duracao, anoLancamento, classificacao } = req.body;

    const filmeAtualizado = await Filme.findByIdAndUpdate(
      id,
      {
        titulo,
        descricao,
        diretor,
        genero: Array.isArray(genero) ? genero : [genero],
        elenco: elenco.split(',').map(e => e.trim()),
        duracao,
        anoLancamento,
        classificacao
      },
      { new: true, runValidators: true }
    );

    res.redirect('/filmes');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', {
      title: 'Erro ao atualizar',
      error: err.message
    });
  }
};

// DELETAR FILME
exports.deleteFilme = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).render('error', {
      title: 'ID inválido',
      error: `O ID fornecido (${id}) não é válido.`
    });
  }

  try {
    await Filme.findByIdAndDelete(id);
    res.redirect('/filmes');
  } catch (err) {
    res.status(500).render('error', {
      title: 'Erro',
      error: 'Falha ao excluir filme'
    });
  }
};
