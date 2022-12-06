const http = require('http');

const PORT = process.env.PORT || 3000;

const root = `
<html>
  <body>
    <p>Developing web services in Node.js with Fastify</p>
  </body>
</html>
`;

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'text/html');
  response.end(root);
});

server.listen(PORT);
