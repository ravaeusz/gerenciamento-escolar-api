
import {connect} from '../config/db.js';

export async function getAlunos(){
    const conn = await connect()
    const [rows] = await conn.query('Select * from alunos;')
    return rows
}

export async function StoreAlunos(nome, sobrenome, peso, telefone, turma){
    const conn = await connect()
    const [rows] = await conn.query('INSERT INTO `crud`.`alunos` (`al_nome`, `al_sobrenome`, `al_peso`, `al_telefone`, `al_turma`) VALUES (?, ?, ?, ?, ?)' ,[nome, sobrenome, peso, telefone, turma])
    return rows
}

export async function DeleteAlunos(id){
    const conn = await connect()
    const [result] = await conn.query('SELECT * FROM alunos WHERE al_id = ?', [id]);
    if (result.length === 0){ return null}
    const [rows] = await conn.query('DELETE FROM alunos WHERE al_id = ?', [id] )
    return rows
}

export async function Updatealunos(id, {nome, sobrenome, peso, telefone, turma}){
    const conn = await connect()
    const [result] = await conn.query('SELECT * FROM alunos WHERE al_id = ?', [id]);
    if (result.length === 0){ return null}
    const [rows] = await conn.query(`UPDATE alunos set al_nome=?, al_sobrenome=?, al_peso=?, al_telefone=?, al_turma=? where al_id=?` ,[nome, sobrenome, peso, telefone, turma, id])
    return rows
}

export async function getAlunosById(id){
    const conn = await connect()
    const [rows] = await conn.query('Select * from alunos where al_id = ?', [id])
    return rows
}

export async function getAlunosByTurma(turma){
    const conn = await connect()
    const [rows] = await conn.query('Select * from alunos where al_turma = ?', [turma])
    return rows
}


