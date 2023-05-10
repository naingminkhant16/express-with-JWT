//express
const express = require('express')
const app = express()
const PORT = 3000

//body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//jwt 
const jwt = require('./JWT/jwt.js')

//testing data
const user_data = {
    id: 1,
    name: 'Nmk',
    email: "nmk@nmk.com",
    password: 'password'
}

//middleware
const auth = require('./middleware/auth.js')

// use auth middleware on every routes
// app.use(auth)

//public route
app.get('/', (req, res) => {
    res.send({
        message: "Hello World"
    })
})

//login route
app.post('/login', (req, res) => {
    try {
        const body = req.body

        if (!(body.email === user_data.email && body.password === user_data.password)) throw new Error('Login Fail')

        const token = jwt.jwt.sign(user_data, jwt.SECRET_KEY, {
            expiresIn: '1h'
        })

        return res.status(200).send({
            message: 'Login success',
            token
        })
    } catch (err) {
        return res.status(401).send({
            message: err.message
        })
    }
})

//auth route
app.get('/user/:id', auth, (req, res) => {
    try {
        return res.send({
            user_data
        })
    } catch (err) {
        return res.status(401).send({
            message: 'Unauthenticate'
        })
    }
})

//listen
app.listen(PORT, () => {
    console.log(`API server is listening on port ${PORT}`)
})