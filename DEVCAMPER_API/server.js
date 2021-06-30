const express = require('express')
const dotenv = require('dotenv')

// load env vars
dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

//console.log(process.env)

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
