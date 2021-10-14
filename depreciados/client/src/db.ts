import {connect, connections} from 'mongoose';
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/valeNightClients';

let connection: typeof import('mongoose');;

export async function initDb() {
    try {
        connection = await connect(DB_URL);
        return connection;
    } catch (error) {
        console.error('Ocorreu um erro ao conectar com o Mongo');
        console.error(error);
        throw error;
    }
}

export async function getConnection() {
    if(!connection)
        await initDb();
    return connection;
}