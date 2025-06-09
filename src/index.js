const express = require('express')

const { PORT } = require('./config/server.config')
const apiRouter = require('./routes')
const errorHandler = require('./utils/errorHandler')
const connectDB = require('./config/db.config')


const app = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRouter)

app.get('/ping', (req, res) => {
  return res.send({
    message: "Problem Service is Alive!"
  })
})

app.use(errorHandler)


app.listen(PORT, async () => {
  console.log(`Server Started at http://localhost:${PORT}/`);
  await connectDB()
})