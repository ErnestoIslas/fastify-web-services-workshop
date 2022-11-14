module.exports = async function root(fastify /* opts */) {
  // eslint-disable-next-line no-unused-vars
  fastify.get('/', async (request, reply) => ({ root: true }));
};
