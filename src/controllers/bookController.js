import Book from '../models/Book.js'; 


export const createBook = async (req, res) => {
    try {
        const { title, author, year, isbn, publisher } = req.body; 
        
        const book = new Book({ title, author, year, isbn, publisher }); 
        await book.save(); 
        
        res.status(201).json({ 
            message: 'Livro criado com sucesso!', 
        });
    } catch (err) {
        if (err.code === 11000) { // Código de erro de duplicidade do MongoDB
            return res.status(400).json({ message: 'Este livro já existe.' });
        }
        res.status(400).json({ message: 'Erro ao criar livro: ' + err.message });
    }
};

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find(); 
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateBook = async (req, res) => {
    const { title, author, year, isbn, publisher } = req.body;
    const updateData = { title, author, year, isbn, publisher }; // Cria objeto de atualização

    try {
        console.log(`Servidor atualizando livro: ${req.params.id}`);

        // O Mongoose espera 3 argumentos: ID, Dados de Atualização, e Opções.
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { 
                new: true, // CHAVE: Retorna o documento *após* a atualização.
                runValidators: true // Opcional: Garante que as validações do Schema rodem.
            }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        
        console.log(updatedBook);

        res.json({ 
            message: 'Livro atualizado com sucesso!', 
            book: updatedBook // Opcional: Retorna o livro atualizado
        });
    } catch (err) {
        // Geralmente 400 Bad Request para erros de validação
        res.status(400).json({ message: err.message });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const result = await Book.findByIdAndDelete(req.params.id);
        
        if (!result) return res.status(404).json({ message: 'Livro não encontrado' });
        
        res.json({ message: 'Livro deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export default {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook
};