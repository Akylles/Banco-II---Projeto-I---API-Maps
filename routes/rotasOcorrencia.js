import express from 'express'
import Ocorrencias from '../models/Ocorrencia.js'

const router = express.Router()

const pesquisaOcorrencias = async () => {
    let colecaoOcorrencias
    
    try {
        const pesquisaOcorrencias = await Ocorrencias.findAll()

        colecaoOcorrencias = pesquisaOcorrencias.map(
            ocorrencia => {
                return {
                    id: ocorrencia.id,
                    nome: ocorrencia.nome,
                    cpf: ocorrencia.cpf,
                    local: ocorrencia.local,
                    data: ocorrencia.data.toLocaleString('pt-BR', { timezone: 'UTC' }),
                    posicao: ocorrencia.posicao
                }
            }
        )
    } catch (error) {
        colecaoOcorrencias = {}
    }

    return colecaoOcorrencias
}

router.get('/', async (req, res) => {
    let colecaoOcorrencias = await pesquisaOcorrencias()

    res.render('assaltos/ocorrencias', {ocorrencias: colecaoOcorrencias})
})

router.get('/mapa', (req, res) => {
    res.render('mapa/mapa')
})

router.get('/form/:lat/:lng', (req, res) => {

    res.render('assaltos/formulario', {
        lat: req.params.lat,
        lng: req.params.lng
    })
})

router.post('/salvar', async (req, res) => {
    const latitude = req.body.lat
    const longitude = req.body.lng

    const ponto = { type: 'Point', coordinates: [longitude, latitude]};
    
    const novoAssalto = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        local: req.body.local,
        data: req.body.data,
        posicao: ponto
    }

    await Ocorrencias.create(novoAssalto)
    
    res.redirect('/assaltos/')
})

router.get('/local/:id', async (req, res) => {
    const buscarOcorrencia = await Ocorrencias.findByPk(req.params.id)
    
    const ocorrencia = {
        id: buscarOcorrencia.id,
        nome: buscarOcorrencia.nome,
        cpf: buscarOcorrencia.cpf,
        local: buscarOcorrencia.local,
        data: buscarOcorrencia.data.toLocaleString('pt-BR', { timezone: 'UTC' }),
        lat: buscarOcorrencia.posicao.coordinates[1],
        lng: buscarOcorrencia.posicao.coordinates[0]
    }

    res.render('mapa/local', ocorrencia)
})

export default router