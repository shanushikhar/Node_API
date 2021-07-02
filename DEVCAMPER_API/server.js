const express = require('express')
const dotenv = require('dotenv')
const morganMiddleware = require('morgan') 

// Custom middleware
const logger = require('./middleware/logger')
// Route files
const routes = require('./routes/bootcamps')

// load env vars
dotenv.config()

const app = express()

// Morgan logger
if(process.env.NODE_ENV === 'development'){
    app.use(morganMiddleware('dev'))
}

// Middleware
app.use(logger)

// Mount routes
app.use('/api/v1/bootcamps', routes)

const PORT = process.env.PORT || 3000

//console.log(process.env)

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
