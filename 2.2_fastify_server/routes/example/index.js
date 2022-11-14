const hello = `
<html>
  <body>
    <p>Hello JavaScript!</p>
  </body>
</html>
`;

module.exports = async function example(fastify /* opts */) {
  fastify.get('/', async (request, reply) => {
    reply.type('text/html');
    return hello;
  });
};
