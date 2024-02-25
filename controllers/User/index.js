const bcrypt = require("bcrypt");
const connection = require("../../config/db");
const jwt = require('jsonwebtoken');

const Register = async (req, res) => {
  const { username, password, confPassword, email, full_name, address } =
    req.body;

  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "password dan confPassword tidak cocok" });

  const salt = await bcrypt.genSalt();

  const hashPassword = await bcrypt.hash(password, salt);
  const insertUserQuery = `
    INSERT INTO User (username, password_hash, email, full_name, address)
    VALUES (?, ?, ?, ?, ?)
  `;

  // Eksekusi pernyataan SQL untuk menyimpan pengguna baru
  connection.query(insertUserQuery, [username, hashPassword, email, full_name, address], (err) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: 'Error creating user' });
    }
    console.log('User created successfully');
    res.status(201).json({ message: 'User created successfully' });
  });
}


const Login = async (username, password) => {
    const user = await getUserByIdentifier(username);

    if (user && await bcrypt.compare(password, user.password_hash)) {
      const token = jwt.sign({
        email: user.email,
        username: user.username,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : '1d'
    })
  
    //   Simpan token ke dalam database
      await updateToken(token, user.user_id);
  
      return { token };
    } else {
      return null; // Login gagal
    }
}

const getUserByIdentifier = async (username) => {
    const [rows] = await connection.promise().query('SELECT * FROM User WHERE email = ? OR username = ?', [username, username]);
  return rows[0];
}

  const updateToken = async (token, user_id) => {
    await connection.promise().query('UPDATE User SET token = ? WHERE user_id = ?', [token, user_id]);
  }

const LoginLaman = async (req, res) => {
      const { username, password } = req.body;
      try {
        const result = await Login(username, password);
        if (result) {
          res.json({ success: true, message : "Success Login",  token: result.token });
        } else {
          res.status(401).json({ success: false, message: 'Login failed. Check your credentials.' });
        }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
      }
}

const getuserAll = async (req, res) => {
    try {
        const [rows] = (await connection.promise().query('SELECT user_id, email, username, full_name, address FROM User'))
        res.json({ success: true, message: "success get all data", users: rows});
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
      }
}

const Logout = async (req, res) => {
  const userId = req.body.id;
  try {
    await connection.promise().query('UPDATE User SET token = null WHERE user_id = ?', [userId]);
    res.json({ success: true, message: 'Logout successful.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });  
  }
}

module.exports = { Register, LoginLaman, getuserAll, Logout };
