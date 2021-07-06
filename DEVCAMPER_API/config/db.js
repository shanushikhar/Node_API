const mongoose = require('mongoose')

const connectDB = async () => {
    // let data = 'mongodb+srv://bradnode:bradnode@travnode.k8sdv.mongodb.net/devcamper?retryWrites=true&w=majority&ssl=true'
    // mongoose.connect(data, {
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useFindAndModify: true,
    //     useUnifiedTopology: true
    // })

    let data = 'mongodb://localhost/devcamper'
    const conn = await mongoose.connect(data, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    })

    console.log(`MongoDB connected: ${conn.connection.host}`)
}

module.exports = connectDB
