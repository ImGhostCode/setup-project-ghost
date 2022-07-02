const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
const fs = require('fs')
const path = require('path')

const logEvents = require('./src/api/v1/helpers/logEvents')
require('dotenv').config()
// require('./src/configs/connectDB')

const app = express()

//Configs
const port = process.env.PORT || 3000


//Connect redis
const { redisClient, connectRedis } = require('./src/configs/connectRedis')
let RedisStore = require("connect-redis")(session)
// connectRedis() 



//Session 
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    // store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false  // set true if https
        , httpOnly: true
    },

}))


//Cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser())
/*
    res.cookie('key', 'value', {   // set cookie
        httpOnly: true,
        secure: true,
        maxAge: 5000
    })

    const cookie = req.cookies     // get cookie

    res.clearCookie('key')         //  clear cookie
*/


//Middleware
app.use(helmet())

app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, './src/api/v1/logs', 'access.log'), { flags: 'a' })
}))

app.use(cors({
    origin: 'http://127.0.0.1:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Route
app.use('/api/v1/users', require('./src/api/v1/routes/User.route'))

app.use((req, res, next) => {



    next(new Error('Not found'))
})

//Handle error
app.use((err, req, res, next) => {
    logEvents(`${req.url}---${req.method}---${err.message}`)
    res.status(err.status || 400).json({ status: err.status || 400, message: err.message })
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))