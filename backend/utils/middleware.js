const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { User } = require('../models/User')

// MIDDLEWARE TO CHECK JWT
const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization

    // CHECKING IF HEADER CONTAINS 'BEARER'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'no token provided' })
    }

    const token = authHeader.split(' ')[1] //get the actual token

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET) //verify JWT token
        req.user = decoded //add payload to req.user
        next() //pass control to next middleware/route
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' })
    }
}

// MIDDLEWARE TO CHECK IF USER IS ADMIN
const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied, admin only' })
    }
    next()
}

module.exports = { authenticate, adminOnly }