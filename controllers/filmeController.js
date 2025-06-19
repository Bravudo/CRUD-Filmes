const Filme = require('../models/filme');

// @desc    Obter todos os filmes
// @route   GET /filmes
// @access  Public
exports.getFilmes = async (req, res, next) => {
  try {
    const filmes = await Filme.find();
    res.status(200).json({
      success: true,
      count: filmes.length,
      data: filmes
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Erro no servidor'
    });
  }
};

// @desc    Obter um filme
// @route   GET /filmes/:id
// @access  Public
exports.getFilme = async (req, res, next) => {
  try {
    const filme = await Filme.findById(req.params.id);

    if (!filme) {
      return res.status(404).json({
        success: false,
        error: 'Filme não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: filme
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Erro no servidor'
    });
  }
};

// @desc    Criar filme
// @route   POST /filmes
// @access  Public
exports.createFilme = async (req, res, next) => {
  try {
    const filme = await Filme.create(req.body);
    res.status(201).json({
      success: true,
      data: filme
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Atualizar filme
// @route   PUT /filmes/:id
// @access  Public
exports.updateFilme = async (req, res, next) => {
  try {
    const filme = await Filme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!filme) {
      return res.status(404).json({
        success: false,
        error: 'Filme não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: filme
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Deletar filme
// @route   DELETE /filmes/:id
// @access  Public
exports.deleteFilme = async (req, res, next) => {
  try {
    const filme = await Filme.findByIdAndDelete(req.params.id);

    if (!filme) {
      return res.status(404).json({
        success: false,
        error: 'Filme não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Erro no servidor'
    });
  }
};