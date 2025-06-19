const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Mongo Conectado');
    } catch (err) {
        console.error('Erro na conexão MongoDB:' , err.message);
        process.exit(1);
    }
};