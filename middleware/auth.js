//jwt 
const jwt = require('../JWT/jwt.js')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '')
        jwt.jwt.verify(token, jwt.SECRET_KEY)
        next()
    } catch (err) {
        return res.status(401).send({
            message: 'Unauthorized'
        })
    }
}