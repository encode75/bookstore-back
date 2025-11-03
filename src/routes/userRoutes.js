import express from 'express';
// Importa o objeto default com todas as funções do controller
import userController from '../controllers/userController.js'; 

const router = express.Router();

// Define as rotas 
router.post('/users', userController.createUser);    // CREATE (Registro)
router.get('/users', userController.getAllUsers);    // READ ALL
router.put('/users/:id', userController.updateUser); // UPDATE
router.delete('/users/:id', userController.deleteUser); // DELETE
router.post('/login', userController.loginUser);    // LOGIN

// Exporta o router para ser usado em server.js
export default router;