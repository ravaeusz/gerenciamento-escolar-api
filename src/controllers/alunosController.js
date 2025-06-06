import {getAlunos, StoreAlunos, DeleteAlunos, Updatealunos, getAlunosById, getAlunosByTurma } from '../model/Alunomodel.js'

export const homeController = async (req, res) => {
    const alunos = await getAlunos();
    res.json({alunos})
  };

export const PostAlunos = async (req, res) => {
 const {nome,sobrenome,peso, telefone, turma} = req.body
 if (!nome || !sobrenome || !peso || !telefone || !turma) {
  return res.status(400).send("Todos os campos são obrigatórios.");
}
  try{
    await StoreAlunos(nome, sobrenome, peso, telefone,turma);
    res.status(201).send("Tudo ok!")
  }catch(e){
    console.log(e);
    res.status(500).send("Erro ao enviar")
  }
}

export const deleteAlunos = async (req, res) => {
  const id = req.params.id
    try{
      const result = await DeleteAlunos(id)
      if (result === null){
        res.status(401).send("Aluno não existe")
      }else{
      res.status(201).send("Alundo deletado!")
      }
    }
    catch(e){
      console.log(e);
    }
}

export const updateAlunos = async (req, res) =>{
  const id = req.params.id
  const nome = req.body.nome
  const sobrenome = req.body.sobrenome
  const peso = req.body.peso
  const telefone = req.body.telefone
  const turma = req.body.turma

  
  try{
    const result = await Updatealunos(id, {nome,sobrenome,peso,telefone,turma})
  if (result === null){
    res.status(401).send("Aluno não existe")
  }else{
    res.status(201).send("Alundo atualizado")
  }
  }catch(e){
    console.log(e)
  }
}

export const getAlunosId = async (req, res) => {
  const id = req.params.id
  try{
    const result = await getAlunosById(id)
    if(result === null){
          res.status(401).send("Aluno não existe")
    }else{
    res.status(201).json({result})
    }
  }catch(e){console.log(e);
  }
}

export const getAlunoTurma = async (req, res) =>{
  const turma = req.params.turma
  try{
    const result = await getAlunosByTurma (turma)
    if(result === null){
      res.status(401).send("Aluno não existe")
    }else{
      res.status(201).json({result})
    }
  }catch(e){console.log(e);
  }
}