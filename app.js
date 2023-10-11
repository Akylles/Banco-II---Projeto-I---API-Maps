import express from 'express'
import handlebars from 'express-handlebars'
import router from './routes/rotasOcorrencia.js'

const app = express()

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

const PORTA = 8080

app.use(express.urlencoded({extended: true}))
app.use('/assaltos', router)

app.listen(PORTA, () => console.log(`APP ouvindo na porta ${PORTA}...`))