const express = require('express')
const app = express()
const cors = require('cors')
const OpenApiValidator = require('express-openapi-validator')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
require('dotenv').config()

const swaggerDocument = YAML.load(__dirname + '/openapi.yaml')

app.use(cors())
app.use(express.json())

app.use(
    OpenApiValidator.middleware({
        apiSpec: __dirname + '/openapi.yaml',
        ignoreUndocumented: true
    })
)

const registerRouter = require('./routers/registerRouter')
app.use('/register', registerRouter)

const criticsEditorsRouter = require('./routers/criticsEditorsRouter')
app.use('/criticsEditors', criticsEditorsRouter)

const criticsUsersRouter = require('./routers/criticsUsersRouter')
app.use('/criticsUsers', criticsUsersRouter)

const reviewsRouter = require('./routers/reviewsRouter')
app.use('/reviews', reviewsRouter)

const usersRouter = require('./routers/usersRouter')
app.use('/users', usersRouter)

const titlesRouter = require('./routers/titlesRouter')
app.use('/titles', titlesRouter)

const gameInfosRouter = require('./routers/gameInfosRouter')
app.use('/infos', gameInfosRouter)

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((error, req, res, next) => {
    res.status(error.status || 500)
        .json({success: false, message: error.message, status: error.status})
})

module.exports = app
