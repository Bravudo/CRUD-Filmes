const mongoose = require('mongoose');

const filmeSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O título é obrigatório'],
    trim: true
  },
  descricao: {
    type: String,
    required: [true, 'A descrição é obrigatória']
  },
  diretor: {
    type: String,
    trim: true
  },
  genero: {
    type: [String],
    required: true,
    enum: ['Ação', 'Comédia', 'Drama', 'Ficção', 'Terror', 'Romance', 'Animação']
  },
  elenco: [String],
  duracao: {
    type: Number,
    min: [1, 'Duração deve ser maior que 0']
  },
  anoLancamento: Number,
  classificacao: {
    type: String,
    enum: ['L', '10', '12', '14', '16', '18'],
    default: 'L'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Filme', filmeSchema);