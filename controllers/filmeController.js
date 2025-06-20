const Filme = require('../models/Filme');

// Lista todos os filmes (VIEW)
exports.getFilmes = async (req, res) => {
    try {
        const filmes = await Filme.find().sort({ createdAt: -1 });
        res.render('filmes/index', { 
            title: 'FilmesNET',
            filmes
        });
    } catch (err) {
        res.render('error', { 
            error: 'Erro ao carregar filmes' 
        });
    }
};

// Mostra um filme específico (VIEW)
exports.getFilme = async (req, res) => {
    try {
        const filme = await Filme.findById(req.params.id);
        if (!filme) {
            return res.status(404).render('error', { 
                error: 'Filme não encontrado' 
            });
        }
        res.render('filmes/index', { 
            title: filme.titulo,
            filme 
        });
    } catch (err) {
        res.render('error', { 
            error: 'Erro ao carregar filme' 
        });
    }
};

// Formulário para adicionar novo filme (VIEW)
exports.newFilme = (req, res) => {
    res.render('filmes/new', { 
        title: 'Adicionar Novo Filme',
        filme: {
            genero: [],
            elenco: [],
            classificacao: 'L'
        } // Objeto com valores padrão
    });
};

// Cria um novo filme (API)
exports.createFilme = async (req, res) => {
    try {
        console.log('Corpo da requisição:', req.body); // Para debug
        
        // Processamento seguro dos dados
        const dadosFilme = {
            titulo: req.body.titulo || '',
            descricao: req.body.descricao || '',
            diretor: req.body.diretor || '',
            genero: req.body.genero ? 
                  (Array.isArray(req.body.genero) ? req.body.genero : [req.body.genero]) : 
                  [],
            elenco: req.body.elenco ?
                  (typeof req.body.elenco === 'string' ? 
                   req.body.elenco.split(',').map(item => item.trim()) : 
                   req.body.elenco) :
                  [],
            duracao: parseInt(req.body.duracao) || 0,
            anoLancamento: parseInt(req.body.anoLancamento) || new Date().getFullYear(),
            classificacao: req.body.classificacao || 'L'
        };

        // Validação manual adicional
        if (!dadosFilme.titulo) {
            throw new Error('O título é obrigatório');
        }

        const filme = await Filme.create(dadosFilme);
        console.log('Filme criado com sucesso:', filme);
        res.redirect(`/filmes/${filme._id}`);
    } catch (err) {
        console.error('Erro detalhado:', err);
        res.render('filmes/new', {
            title: 'Adicionar Novo Filme - Erro',
            error: err.message,
            filme: req.body || {} // Fallback para objeto vazio
        });
    }
};

// Formulário para editar filme (VIEW)
exports.editFilme = async (req, res) => {
    try {
        const filme = await Filme.findById(req.params.id);
        if (!filme) {
            return res.status(404).render('error', { 
                error: 'Filme não encontrado' 
            });
        }
        res.render('filmes/edit', { 
            title: `Editar: ${filme.titulo}`,
            filme 
        });
    } catch (err) {
        res.render('error', { 
            error: 'Erro ao carregar formulário de edição' 
        });
    }
};

// Atualiza um filme (API)
exports.updateFilme = async (req, res) => {
    try {
        const dadosAtualizados = {
            ...req.body,
            genero: Array.isArray(req.body.genero) ? req.body.genero : [req.body.genero],
            elenco: typeof req.body.elenco === 'string' ? 
                   req.body.elenco.split(',').map(item => item.trim()) : 
                   req.body.elenco || []
        };

        const filme = await Filme.findByIdAndUpdate(
            req.params.id, 
            dadosAtualizados, 
            { new: true, runValidators: true }
        );
        
        res.redirect(`/filmes/${filme._id}`);
    } catch (err) {
        res.render('filmes/edit', { 
            title: 'Erro ao editar filme',
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
        res.render('error', { 
            error: 'Erro ao excluir filme' 
        });
    }
};