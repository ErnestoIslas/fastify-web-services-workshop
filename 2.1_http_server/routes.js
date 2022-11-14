const http = require('http');
const url = require('url');

const { STATUS_CODES } = http;

const PORT = process.env.PORT || 3000;

const root = `
<html>
  <body>
    <p>Developing web services in Node.js with Fastify</p>
  </body>
</html>
`;

const hello = `
<html>
  <body>
    <p>Hello JavaScript!</p>
  </body>
</html>
`;

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'text/html');

  if (request.method !== 'GET') {
    response.statusCode = 405;
    response.end(`${STATUS_CODES[response.statusCode]}\r\n`);
    return;
  }

  const { pathname } = url.parse(request.url);

  if (pathname === '/') {
    response.end(root);
    return;
  }

  if (pathname === '/hello') {
    response.end(hello);
    return;
  }

  response.statusCode = 404;
  response.end(`${STATUS_CODES[response.statusCode]}\r\n`);
});

server.listen(PORT);
