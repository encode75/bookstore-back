import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
// Importa o arquivo de conexão
import connectDB from './src/config/database.js';
// Importa as rotas
import userRoutes from './src/routes/userRoutes.js'; 
import bookRoutes from './src/routes/bookRoutes.js'; 
import { userAdmin } from './src/controllers/userController.js';

dotenv.config();

// Chama a função de conexão com o banco de dados
connectDB(); 

userAdmin();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // Habilita o parsing de JSON no corpo da requisição
app.use(cors()); //Habilita CORS para todas as origens

// ---------------------------
// MONTAGEM DAS ROTAS
// ---------------------------
app.use('/', userRoutes);
app.use('/', bookRoutes); 

// Inicia o Servidor
app.listen(PORT, () => {
    console.log(`⚡ Server is running on http://localhost:${PORT}`);
});