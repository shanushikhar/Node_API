const http = require('http')

const todos = [
    { id: 1, text: 'Todo One' },
    { id: 2, text: 'Todo Two' },
    { id: 3, text: 'Todo Three' },
]

const server = http.createServer((req, res) => {
    //res.statusCode = 201

    // res.setHeader('Content-Type','text/plain')
    // res.setHeader('Content-Type','text/html')
    // res.setHeader('Content-Type', 'application/json')
    // res.setHeader('X-Powered-By', 'Node.js')

    // res.write('hey')
    // res.write('<h1>hommie</h1>')

    // res.end(JSON.stringify({
    //     success: true,
    //     data: todos
    // }))

    // OR

    console.log(req.headers.authorization)

    let body = []
    let data = ''
    req.on('data',chunk => {
       // console.log(chunk)
        body.push(chunk)
        data = data + chunk
    }).on('end',() => {
        body =  Buffer.concat(body).toString()
        console.log(JSON.parse(body))
      
        // console.log(data.toString())
        console.log(JSON.parse(data))
    })

    res.writeHead(404, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js'
    })
    res.end(JSON.stringify({
        success: false,
        error: 'Not Found',
        data: []
    }))

})

const port = 5000
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})



// npm i --save-dev nodemon or npm i -D nodemon