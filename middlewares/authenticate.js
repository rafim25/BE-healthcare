const jwt = require('jsonwebtoken');

function isAuthenticated() {
    return (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ message: 'Access token is missing' });
    }
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
    }   
}

module.exports = { isAuthenticated }