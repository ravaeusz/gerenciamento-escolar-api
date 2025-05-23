import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function authLogin ( req, res, next){
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1]

    if(!token){
        return res.status(401).json({mensagem:'Sem autorização'});
    }

    jwt.verify(token, process.env.SECRET, (err, email) => {
        if(err) return res.status(403).json({mensagem: "Token inválido"}) 
        
        
    next()
    });
} 