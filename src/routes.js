import {homeController, PostAlunos, deleteAlunos, updateAlunos, getAlunosId, getAlunoTurma} from './controllers/alunosController.js';
import {RegisterController,LoginController, DeleteController, UpdateController} from './controllers/loginController.js'

import {authLogin} from '../middleware/loginMiddleware.js'

import express from 'express'
const router = express.Router();


//ROTAS ALUNOS
router.get('/alunos',authLogin, homeController);
router.post('/alunos',authLogin, PostAlunos)
router.delete('/alunos/:id',authLogin, deleteAlunos)
router.put('/alunos/:id',authLogin, updateAlunos)
router.get('/alunos/:id',authLogin, getAlunosId)
router.get('/alunos/turma/:turma', authLogin, getAlunoTurma)

//ROTAS LOGIN
router.post('/register', RegisterController)
router.post('/login', LoginController)
router.delete('/users/:id', DeleteController)
router.put('/user/:id', UpdateController)

export default router;