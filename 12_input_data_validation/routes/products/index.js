const schema = {
  body: {
    type: 'object',
    required: ['data'],
    additionalProperties: false,
    properties: {
      data: {
        type: 'object',
        required: [
          'title',
          'price',
          'brand',
          'category',
        ],
        additionalProperties: false,
        properties: {
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          price: {
            type: 'number',
          },
          brand: {
            type: 'string',
          },
          category: {
            type: 'string',
          },
        },
      },
    },
  },
};

module.exports = async (fastify) => {
  fastify.get('/', (request, reply) => {
    fastify.database.all((error, products) => {
      if (error) {
        reply.send(error);
      } else {
        reply.send({ products });
      }
    });
  });

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

  fastify.post('/', { schema }, (request, reply) => {
    const { data } = request.body;
    const uid = fastify.database.uid();
    fastify.database.create(uid, data, (error) => {
      if (error) {
        if (error.message === 'resource exists') {
          reply.conflict();
        } else {
          reply.send(error);
        }
      } else {
        reply.code(201);
        reply.send({ uid });
      }
    });
  });

  fastify.put('/:id', (request, reply) => {
    const { id } = request.params;
    const { data } = request.body;

    fastify.database.update(id, data, (error) => {
      if (error) {
        if (error.message === 'not found') {
          reply.notFound();
        } else {
          reply.send(error);
        }
      } else {
        reply.code(204);
        reply.send();
      }
    });
  });
};
