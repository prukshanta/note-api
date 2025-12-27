import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import noteRoutes from './routes/noteRoutes.js'
import dotenv from 'dotenv'

dotenv.config()
console.log('MONGODB_URI:', process.env.MONGODB_URI)

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 5001

const app = express()


//Middleware
app.use(cors())
app.use(express.json())

//Heathcheck endpoint
app.get('/', (req, res) => {
    res.status(200).json({status: 'ok', message: 'Server is Live'})
})

//Routes
app.use('/api/notes', noteRoutes)

//MOngoDB Connection
mongoose
.connect(MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

