import { Sequelize, DataTypes } from "sequelize";
import 'dotenv/config'

// Cria conexão com o Banco

const nomeBanco = process.env.PG_NOME_BANCO
const nomeUsuario = process.env.PG_NOME_USUARIO
const senhaUsuario = process.env.PG_SENHA_USUARIO
const host = process.env.PG_HOST
const dialect = process.env.PG_DIALECT

const sequelize = new Sequelize(nomeBanco, nomeUsuario, senhaUsuario, {
    host: host,
    dialect: dialect
})

try {
    await sequelize.authenticate();
    console.log('Conexão ao banco de dados bem sucedida.');
  } catch (error) {
    console.error('Impossível se conectar:', error);
}

export default sequelize
