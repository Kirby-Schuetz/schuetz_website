const client = require('../client')

const createUser = async ({ username, password }) => {
  try {
      const {
          rows: [user],
      } = await client.query (
          ` INSERT INTO users (username, password)
            VALUES($1, $2)
            RETURNING *;
          `,
          [username, password]
      )
          return user
  } catch (error) {
      throw error
  }
}

const loginUser = async (username, password) => {
    try {
      const {
        rows: [user],
      } = await client.query(
        `
        SELECT *
        FROM users
        WHERE username = $1;
        `,
        [username]
      );
  
      if (!user) {
        // User not found
        return null;
      }
  
      // Compare the provided password with the hashed password in the database (TBD - password currently not hashed)
    //   const passwordMatch = await bcrypt.compare(password, user.password);

      const passwordMatch = password === user.password;
  
      if (passwordMatch) {
        // Passwords match, user is logged in
        return user;
      } else {
        // Incorrect password
        return null;
      }
    } catch (error) {
      throw error;
    }
  };

  module.exports = { createUser,loginUser }