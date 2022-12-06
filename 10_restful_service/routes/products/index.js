module.exports = async (fastify) => {
  fastify.get('/:id', (request, reply) => {
    const { id } = request.params;

    fastify.database.read(id, (error, product) => {
      if (error) {
        if (error.message === 'not found') {
          reply.notFound();
        } else {
          reply.send(error);
        }
      } else {
        reply.send(product);
      }
    });
  });
};
