const path = require('path');
const AutoLoad = require('@fastify/autoload');

const dev = process.env.NODE_ENV !== 'production';

// eslint-disable-next-line global-require, import/no-extraneous-dependencies
const fastifyStatic = dev && require('@fastify/static');

module.exports = async function root(fastify, opts) {
  if (dev) {
    fastify.register(fastifyStatic, {
      root: path.join(__dirname, 'public'),
    });
  }

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });

  fastify.setNotFoundHandler((request, reply) => {
    if (request.method !== 'GET') {
      reply.status(405);
      return 'Method not allowed\n';
    }
    return 'Not found\n';
  });
};
