const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")

const resenhas = db.define("resenhas", {
    id:{
    type: Sequelize.INTEGER,
    autoIncrement: true, 
    allowNull: false,
    primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    autor: { //nesse caso é o usuário que escreve a resenha
        type: Sequelize.STRING,
        allowNull: false
    },
    texto: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    avaliacao: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
})

resenhas.sync()

const Todos = () => resenhas.findAll()

const add = async (params) => await resenhas.create(params)

const buscar_id = (id) => resenhas.findByPk(id)

const buscar_titulo = async (titulo) => await bd.promise().query(`SELECT * FROM resenhas WHERE titulo = '${titulo}' LIMIT 1`)
    .then(([rows, fields]) => {return {resultados: rows, colunas: fields} })
    .catch((erro) => {return erro
})

const buscar_autor = async (autor) => await bd.promise().query(`SELECT * FROM resenhas WHERE autor = '${autor}'`)
    .then(([rows, fields]) => {return {resultados: rows, colunas: fields} })
    .catch((erro) => {return erro
})

const delet = async(id) => {
    await resenhas
.destroy({
        where: {
            id: id
        }
    });
}

const atualizar = async(params) => {
    await resenhas.update(
        {
            texto: params.texto,
            titulo: params.titulo,
            avaliacao: params.avaliacao
        },
        {
            where: {
                id: params.id
            }
        }
    )
}

module.exports = {resenhas, Todos, add, delet, buscar_id, buscar_titulo, buscar_autor, atualizar};