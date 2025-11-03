import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// URL de conexão vinda do .env
const DB_URL = process.env.MONGO_URI; 

const connectDB = async () => {
  try {
    console.log(DB_URL);
    // Tenta conectar ao MongoDB
    await mongoose.connect(DB_URL);
    console.log('✅ Conexão com MongoDB estabelecida com sucesso.');

  } catch (error) {
    console.error('❌ Erro na conexão com MongoDB:', error.message);
    // Encerra a aplicação em caso de falha de conexão
    process.exit(1); 
  }
};

// Exporta a função de conexão usando export default
export default connectDB;