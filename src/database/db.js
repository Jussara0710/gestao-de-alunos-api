import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer = null;

const connectDB = async () => {
  try {
    let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gestao-de-alunos';

    // Se estiver em ambiente de teste, cria o servidor em memória automaticamente
    if (process.env.NODE_ENV === 'test') {
      if (!mongoServer) {
        mongoServer = await MongoMemoryServer.create();
      }
      MONGODB_URI = mongoServer.getUri();
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
      console.log(`MongoDB conectado em ${MONGODB_URI}`);
    }
  } catch (error) {
    console.error('Erro de conexão com o MongoDB:', error.message);
  }
};

await connectDB();

export default mongoose;