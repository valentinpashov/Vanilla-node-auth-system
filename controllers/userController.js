const pool = require('../db');
const { parse } = require('querystring');
const { hashPassword } = require('../utils/hash');
const bcrypt = require('bcrypt'); 

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Register handler
async function handleRegister(req, res) {
  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', async () => {
    const user = parse(body);

    if (!emailPattern.test(user.email)) {
      res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>Невалиден имейл!</h1><a href="/">Назад</a>');
      return;
    }

    try {
      const hashedPassword = await hashPassword(user.password);
      await pool.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)',
        [user.username, user.email, hashedPassword]
      );
      res.writeHead(302, { Location: '/login' });
      res.end();
    } catch (e) {
      console.error(e);
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>Грешка (Имейлът е зает)</h1><a href="/">Назад</a>');
    }
  });
}

// Login handler
async function handleLogin(req, res) {
  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', async () => {
    const { email, password } = parse(body);

    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      
      if (result.rows.length === 0) {
        res.writeHead(401, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Грешен имейл!</h1><a href="/login">Опитай пак</a>');
        return;
      }

      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password_hash);

      if (match) {
        res.writeHead(302, { Location: '/dashboard' });
        res.end();
      } else {
        res.writeHead(401, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Грешна парола!</h1><a href="/login">Опитай пак</a>');
      }

    } catch (e) {
      console.error(e);
      res.writeHead(500);
      res.end('Server Error');
    }
  });
}

module.exports = { handleRegister, handleLogin };