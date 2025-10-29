import express from 'express';
import bookController from '../controllers/bookController.js'; 

const router = express.Router();

router.post('/books', bookController.createBook);
router.get('/books', bookController.getAllBooks);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

export default router;