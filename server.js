require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const filmesRoutes = require('./routes/filmeRoutes');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/filmes', filmesRoutes);

//Rota Inicial
app.get('/', (req, res) => {
    res.redirect('/filmes')
})

// BD
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Mongo DB Online');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Rodando na Porta: ${PORT}`);
        });
    })
    .catch(err => console.log(err));

//views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));