import DataTypes from 'sequelize'
import sequelize from '../db/conexao.js'

const Ocorrencia = sequelize.define('ocorrencia', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING
    },
    cpf: {
        type: DataTypes.TEXT
    },
    local: {
        type: DataTypes.TEXT
    },
    data: {
        type: DataTypes.DATE
    },
    posicao: {
        type: DataTypes.GEOMETRY
    }
}, {
    freezeTableName: true,
    timestamps: false
})

const sincronizar = async () => {
    await Ocorrencia.sync()
    .then(()=> console.log('CRIOU O MODEL OCORRÊNCIA'))
    .catch(()=>console.log('NÃO CRIOU A OCORRÊNCIA'))    
}

sincronizar()

export default Ocorrencia