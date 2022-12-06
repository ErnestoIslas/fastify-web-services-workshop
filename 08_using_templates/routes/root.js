module.exports = async (fastify) => {
  fastify.get('/', (request, reply) => {
    reply.view('index.hbs');
  });
};
