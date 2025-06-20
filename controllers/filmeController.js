const Filme = require('../models/Filme');

// Lista todos os filmes (VIEW)
exports.getFilmes = async (req, res) => {
    const filmes = await Filme.find();
    res.render('filmes/index', { 
        title: 'FilmesNET', // Passa o título para o head.ejs
        filmes: filmes       // Passa a lista de filmes
    });
};


// Mostra um filme específico (VIEW)
exports.getFilme = async (req, res) => {
    try {
        const filme = await Filme.findById(req.params.id);
        if (!filme) {
            return res.status(404).render('error', { error: 'Filme não encontrado' });
        }
        res.render('filmes/show', { 
            title: filme.titulo,
            filme 
        });
    } catch (err) {
        res.render('error', { error: err.message });
    }
};

// Formulário para adicionar novo filme (VIEW)
exports.newFilme = (req, res) => {
    res.render('filmes/new', { 
        title: 'Adicionar Novo Filme',
        filme:{}
    });
};
// Cria um novo filme (API)
exports.createFilme = async (req, res) => {
    try {
        const filme = await Filme.create(req.body);
        res.redirect(`/filmes/${filme._id}`);
    } catch (err) {
        res.render('filmes/new', { 
            title: 'Adicionar Novo Filme',
            error: err.message 
        });
    }
};

// Formulário para editar filme (VIEW)
exports.editFilme = async (req, res) => {
    try {
        const filme = await Filme.findById(req.params.id);
        if (!filme) {
            return res.status(404).render('error', { error: 'Filme não encontrado' });
        }
        res.render('filmes/edit', { 
            title: `Editar: ${filme.titulo}`,
            filme 
        });
    } catch (err) {
        res.render('error', { error: err.message });
    }
};


// Atualiza um filme (API)
exports.updateFilme = async (req, res) => {
    try {
        const filme = await Filme.findByIdAndUpdate(req.params.id, req.body, { 
            new: true,
            runValidators: true 
        });
        res.redirect(`/filmes/${filme._id}`);
    } catch (err) {
        res.render('filmes/edit', { 
            title: 'Editar Filme',
            error: err.message,
            filme: req.body 
        });
    }
};

// Remove um filme (API)
exports.deleteFilme = async (req, res) => {
    try {
        await Filme.findByIdAndDelete(req.params.id);
        res.redirect('/filmes');
    } catch (err) {
        res.render('error', { error: err.message });
    }
};