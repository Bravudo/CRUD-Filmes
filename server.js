require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const filmesRoutes = require('./routes/filmeRoutes');
const path = require('path');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro MongoDB:', err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// EJS Configuration
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rotas
app.use('/filmes', filmesRoutes);

// Rota inicial
app.get('/', (req, res) => res.redirect('/filmes'));

// Error Handling
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Página não encontrada',
    error: 'Recurso não encontrado'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    title: 'Erro interno',
    error: process.env.NODE_ENV === 'development' ? err.stack : 'Erro no servidor'
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));