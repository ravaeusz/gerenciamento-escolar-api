import { connect } from '../config/db.js';
import bcrypt from 'bcrypt'

export async function storeRegister(nome, email, senha) {
    const conn = await connect();

    const [rows] = await conn.query('SELECT * FROM USUARIOS WHERE us_email = ?', [email])

    if (rows.length > 0) {
        return null
    }

    var salt = bcrypt.genSaltSync(10);
    var senhaCript = bcrypt.hashSync(senha, salt)

    await conn.query('INSERT INTO `crud`.`usuarios` (`us_nome`, `us_email`, `us_senha`) VALUES (?,?,?)', [nome, email, senhaCript])
    return rows
}

export async function storeLogin(email, senha) {


    const conn = await connect();

    const [rows] = await conn.query('select * from usuarios where us_email = ?', [email])


    if (rows.length === 0) {
        return null
    }

    const senhaCorreta = await bcrypt.compare(senha, rows[0].us_senha)

    if(!senhaCorreta){
        return null
    }

    return rows[0].us_nome
}
export async function deleteLogin(id) {

    const conn = await connect();

    const [rows] = await conn.query('SELECT * FROM usuarios WHERE us_id = ?', [id]);

    if (rows.length === 0) { return null }
    await conn.query('DELETE FROM usuarios WHERE us_id = ?', [id])
    return rows[0].us_nome
}

export async function updateLogin(senha, id){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM usuarios WHERE us_id = ?', [id]);

    if (rows.length === 0) { return null }
    await conn.query('UPDATE usuarios set us_senha=? where us_id=?', [senha, id]);
    return rows[0].us_nome
}