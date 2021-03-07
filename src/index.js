const express = require('express')
const app = express()
const userRouter = require('./routes/user.route')

const PORT = process.env.PORT || 8080
const USER_ROUTE_PATH = '/api/v1/users'

app.use(express.json())

app.use(USER_ROUTE_PATH, userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
