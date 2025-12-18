const http = require('http');
const fs = require('fs');
const path = require('path');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

function serveFile(res, fileName, contentType = 'text/html') {
  const filePath = path.join(__dirname, fileName);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

http.createServer((req, res) => {
  if (req.url.startsWith('/style/')) {
    const cssName = req.url; 
    serveFile(res, cssName, 'text/css');
    return;
  }

  // HTML
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    serveFile(res, 'index.html');
  } 
  else if (req.method === 'GET' && req.url === '/login') {
    serveFile(res, 'login.html');
  } 
  else if (req.method === 'GET' && req.url === '/dashboard') {
    serveFile(res, 'dashboard.html');
  }

  // API logic
  else if (registerRoute(req, res)) {
  } 
  else if (loginRoute(req, res)) {
  } 
  
  else {
    res.writeHead(404);
    res.end('Not Found');
  }
}).listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});