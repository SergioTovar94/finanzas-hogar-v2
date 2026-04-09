import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './config/database.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

const start = async () => {
    try {
        await sequelize.authenticate()
        console.log('Autenticación exitosa')
        await sequelize.sync({ alter: true })
        console.log('Tablas sincronizadas')

        app.listen(PORT, () => {
            console.log(`MS-Core corriendo en el puerto: ${PORT}`)
        })
    } catch (error) {
        console.log('Error al iniciar', error)
        process.exit(1)
    }
}

start()

export default app