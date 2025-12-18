const { handleLogin } = require('../controllers/userController');

function loginRoute(req, res) {
  if (req.method === 'POST' && req.url === '/login') {
    handleLogin(req, res);
    return true;
  }
  return false;
}

module.exports = loginRoute;