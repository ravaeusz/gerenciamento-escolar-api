import express from 'express';
import router from './routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(router)


app.listen(process.env.PORT, () => {
    console.log("Servidor iniciado!");
    console.log("Clique + Shift em http://localhost:3030");
    
})