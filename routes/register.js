const { handleRegister } = require('../controllers/userController');

function registerRoute(req, res) {
  if (req.method === 'POST' && req.url === '/register') {
    handleRegister(req, res);
    return true;
  }
  return false;
}

module.exports = registerRoute;