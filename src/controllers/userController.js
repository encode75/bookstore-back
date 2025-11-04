import User from '../models/User.js'; 
import bcrypt from 'bcryptjs'; // Usando bcryptjs

// Função auxiliar para remover a senha do objeto de resposta
const sanitizeUser = (user) => {
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

// C (CREATE) - Registro
export const createUser = async (req, res) => {
    try {
        const { username, password, name } = req.query; 

        const user = new User({ name, username, password }); 
        await user.save(); 
        
        res.status(201).json({ 
            message: 'Usuário criado com sucesso!', 
            user: sanitizeUser(user) 
        });
    } catch (err) {
        if (err.code === 11000) { // Código de erro de duplicidade do MongoDB
            return res.status(400).json({ message: 'Nome de usuário já existe.' });
        }
        res.status(400).json({ message: 'Erro ao criar usuário: ' + err.message });
    }
};

// R (READ) - Todos
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclui a senha
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// U (UPDATE)
export const updateUser = async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        if (name) user.name = name;
        if (password) {
            // O hook 'pre save' fará o hash da nova senha automaticamente
            user.password = password; 
        }

        await user.save();
        
        res.json({ 
            message: 'Usuário atualizado com sucesso!', 
            user: sanitizeUser(user) 
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// D (DELETE)
export const deleteUser = async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        
        if (!result) return res.status(404).json({ message: 'Usuário não encontrado' });
        
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// LOGIN
export const loginUser = async (req, res) => {
    const { username, password } = req.body; 

    console.log(username, password);

    try {

        const u = username === "admin";
        const p = password === "123";
        const l = (await User.find()).length === 0;

        if (u && p && l) {
            return res.json({ 
                message: 'Login bem-sucedido!', 
                user: {
                    username: "admin",
                    name: "System Adminstrator"
                }
            });
        }

        const user = await User.findOne({ username }); 

        console.log(user);

        if (!user) {
            return res.status(401).json({ message: 'Nome de usuário ou senha inválidos.' });
        }
        
        const isMatch = await user.comparePassword(password);

        console.log(isMatch);
        
        if (isMatch) {
            res.json({ 
                message: 'Login bem-sucedido!', 
                user: sanitizeUser(user)
            });
        } else {
            res.status(401).json({ message: 'Nome de usuário ou senha inválidos.' });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Exporta todas as funções como um objeto default para ser importado no router
export default {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    loginUser,
};