const express = require('express');
const router = express.Router();
const authenticate = require('../api/auth');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


const { loginUser } = require('../db/helpers/usershelper');

// GET user login
router.post('/login', authenticate, async (req, res) => {
  try {
    const { username, password } = req.body.user;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }
    const user = await loginUser(username, password);

    if (user) {
      // Successful login
      const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration
      return res.status(200).json({ success: true, user });
    } else {
      // Failed login
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'An error occurred during login.' });
  }
});

  // GET user logout

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true });
});

router.get('/', (req, res) => {
  console.log("here");
})
//   export router
module.exports = router;