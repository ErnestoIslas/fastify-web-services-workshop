const AutoLoad = require('@fastify/autoload');
const handlebars = require('handlebars');
const path = require('path');
const view = require('@fastify/view');

module.exports = async function root(fastify, opts) {
  fastify.register(view, {
    engine: {
      handlebars,
    },
    root: path.join(__dirname, 'views'),
    layout: 'layout.hbs',
  });

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
