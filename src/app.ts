import express, { Request, Response } from 'express'
import { authRoutes } from './modules/auth/auth.routes'
import { initDB } from './config/db'

const app = express()
app.use(express.json())
initDB()

app.get('/', (req : Request, res : Response) => {
  res.send('Server is running')
})

app.use('/api/v1/', authRoutes)



app.use(( req : Request, res : Response) => {
    res.status(404).send('Route not found')
})

export default app