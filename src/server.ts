import express, { Request, Response } from 'express'
import { config } from './config'
import { initDB } from './config/db'
const app = express()
const port = config.port

initDB()

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!d')
})



app.use(( req : Request, res : Response) => {
    res.status(404).send('Route not found')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
