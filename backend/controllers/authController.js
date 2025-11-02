const express = require('express')
const router = express.Router()
const { User } = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { authenticate, adminOnly } = require('../utils/middleware')

router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body
        
        // 1. FIND THE USER IN DB
        const user = await User.findOne({ username })
        if (!user) return res.status(400).json({ error: 'Invalid credentials' })
        
        // 2. COMPARE PASSWORD WITH HASHED PASSWORD
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(400).json({ error: 'Invalid credentials' })
        
        // 3. GENERATE JWT WITH USER ID AND ROLE
        const token = jwt.sign(
            { id: user.id, role: user.role },  //payload
            config.JWT_SECRET                  //secret key
        ) 
        
        // 4. SEND TOKEN TO FRONTEND
        res.json({ token })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
