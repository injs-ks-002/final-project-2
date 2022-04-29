const express = require('express')
const app = express()
const port = process.env.PORT | 4000;
const router = require('./routes/app.route')

appInit(app)

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
})

function appInit(app) {
    app.use(express.json())
    app.use(express.urlencoded({
        extended: false
    }))
    app.use('/', router)
}