// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets');

function authenticate(req, res, next) {
  // Check for a valid token in the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token.' });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user; // Attach the user information to the request object
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
  }
}

module.exports = authenticate;