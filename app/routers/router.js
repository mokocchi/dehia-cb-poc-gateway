var express = require('express');
var router = express.Router()

const loginRouter = require('./loginService')
const collectRouter = require('./collectService')
const resultsRouter = require('./resultsService')

router.use((req, res, next) => {
    console.log(`Called: ${req.method} ${req.path}`)
    next()
})

router.use(loginRouter)
router.use(collectRouter)
router.use(resultsRouter)

module.exports = router