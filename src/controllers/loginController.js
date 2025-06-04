import { storeRegister, storeLogin, deleteLogin, updateLogin } from '../model/Loginmodel.js';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export const RegisterController = async (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

       const token = jwt.sign({email}, process.env.SECRET);

       console.log(token);
       
    try {
        const result = await storeRegister(nome, email, senha);

        if (result === null) {
            res.send("Usuario ja cadastrado")
        } else {
            res.send('Usuario cadastrado com sucesso!')
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Erro ao enviar")
    }
}

export const LoginController = async (req, res) => {
    const {email, senha} = req.body;

    const rows = await storeLogin(email,senha);
    

    if(!rows){
        res.send('Usuario não cadastrado');
    }else{
        const token = jwt.sign({email}, process.env.SECRET);

        res.json({mensagem: 'Logado no sistema, bem vindo ' +rows,
            token})
    }
}
export const DeleteController = async (req, res) =>{
    const id = req.params.id

    try{
    const rows = await deleteLogin(id)

    if(rows === null){
        res.send("Usuario não encontrado")
    }else{
        res.send("Usuario de " +rows+ " deletado com sucesso")
    }
}catch(e){
    console.log(e);
    
}
    }

export const UpdateController = async  (req, res) =>{
    const id = req.params.id;
    const {senha} = req.body

    try{
        const rows = await updateLogin(senha, id)

        if(rows === null) {
            res.send("Usuario não encontrado")
    }else{
        res.send("Senha de " +rows+ " alterada!")
    }
}catch(e){
    console.log(e); 
}
}
    