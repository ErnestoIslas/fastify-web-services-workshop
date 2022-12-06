module.exports = async (fastify) => {
  fastify.get('/', (request, reply) => {
    const { name = 'world' } = request.query;
    reply.view('hello.hbs', { name });
  });
};
