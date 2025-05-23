import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export async function connect(){
    if(global.connection && global.connection.state !== 'disconnected'){    
    return global.connection;
}
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

connect();

