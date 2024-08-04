const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para autenticar y autorizar JWT
const authenticateJWT = (req, res, next) => {
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No Authorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.employee = user;
        next();
    });
};

module.exports = authenticateJWT;