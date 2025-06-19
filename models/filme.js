const mongoose = require('mongoose');
const { type } = require('os');

const FilmeSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'Adicione um título'],
        trim: true,
        maxlength: [100, 'Limite de 100 caracteres atingido']
    },
    descricao: {
        type: String,
        required: [true, 'Adicione uma descrição'],
        maxlength: [500, 'Limite de 500 caracteres atingido']
    },
    diretor: {
        type: String,
        required: [true, 'Adicione um Diretor']
    },
    genero: {
        type: [String],
        required: true,
        enum: [
      'Ação',
      'Aventura',
      'Comédia',
      'Drama',
      'Ficção Científica',
      'Terror',
      'Romance',
      'Animação',
      'Documentário',
      'Outro'
        ]
    },

    anoLancamento: {
        type: Number,
        required: [true, 'Coloca o ano logo ai, mano'],
        min: [1888, 'Apenas acima do ano 1888'],
        max: [new Date().getFullYear(), 'Apenas até a data atual'] 
    },

    duracao: {
        type: Number,
        required: [true, 'Adicione a duração']
    },
    elenco: {
        type: [String],
        required: [true, 'Adicione o nome do elenco']
    },
    classificacao:{
        type: String,
        required: true,
        enum: ['L', '10', '12', '14', '16', '18']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Filme', FilmeSchema);