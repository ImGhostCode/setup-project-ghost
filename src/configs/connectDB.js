const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.on('connected', () => {
    console.log(`Connected to mongo:: `)
})
mongoose.connection.on('disconnected', () => {
    console.log(`Disconnected to mongo:: `)
})
mongoose.connection.on('error', () => {
    console.log(`Connecte error to mongo:: ${error.message}`)
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})
