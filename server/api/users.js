const express = require('express');
const router = express.Router();

const { loginUser } = require('../db/helpers/usershelper');

// GET user login
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body.user;
  
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
      }
      const user = await loginUser(username, password);
  
      if (user) {
        // Successful login
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

//   export router
module.exports = router;