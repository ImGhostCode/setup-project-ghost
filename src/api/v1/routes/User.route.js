const { Router } = require('express')
const { register, login, home } = require('../controllers/User.controller')
const route = Router()


route.get('/', home)
route.get('/register', register)
route.get('/login', login)

module.exports = route