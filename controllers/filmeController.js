const Filme = require('../models/Filme');

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


exports.getFilme = async (req, res) => {
    try {
        const filme = await Filme.findById(req.params.id);
        if (!filme) {
            return res.status(404).render('error', {
                title: 'Filme não encontrado',
                error: 'O filme solicitado não existe no banco de dados'
            });
        }
        res.render('filmes/show', {
            title: filme.titulo,
            filme
        });
    } catch (err) {
        res.status(500).render('error', {
            title: 'Erro ao carregar filme',
            error: err.message
        });
    }
};

exports.newFilme = (req, res) => {
  res.render('filmes/new', {
    title: 'Adicionar Novo Filme',
    filme: new Filme()
  });
};

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

exports.editFilme = async (req, res) => {
  try {
    const filme = await Filme.findById(req.params.id);
    res.render('filmes/edit', {
      title: `Editar: ${filme.titulo}`,
      filme
    });
  } catch (err) {
    res.redirect('/filmes');
  }
};

exports.updateFilme = async (req, res) => {
  try {
    await Filme.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.redirect(`/filmes/${req.params.id}`);
  } catch (err) {
    res.render('filmes/edit', {
      title: 'Editar Filme - Erro',
      error: err.message,
      filme: req.body
    });
  }
};

exports.deleteFilme = async (req, res) => {
  try {
    await Filme.findByIdAndDelete(req.params.id);
    res.redirect('/filmes');
  } catch (err) {
    res.status(500).render('error', {
      title: 'Erro',
      error: 'Falha ao excluir filme'
    });
  }
};