const fastifyPlugin = require('fastify-plugin');

async function database(fastify) {
  const products = {
    1: {
      title: 'MacBook Pro',
      description: 'MacBook Pro 2021 with mini-LED display may launch between September, November',
      price: 1749,
      brand: 'APPle',
      category: 'laptops',
      thumbnail: 'https://dummyjson.com/image/i/products/6/thumbnail.png',
    },
    2: {
      title: 'Samsung Universe 9',
      description: "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      brand: 'Samsung',
      category: 'smartphones',
      thumbnail: 'https://dummyjson.com/image/i/products/3/thumbnail.jpg',
    },
  };

  function read(id, callback) {
    if (!Object.prototype.hasOwnProperty.call(products, id)) {
      const error = Error('not found');
      setImmediate(() => callback(error));
    } else {
      setImmediate(() => callback(null, products[id]));
    }
  }

  fastify.decorate('database', {
    read,
  });
}

module.exports = fastifyPlugin(database, {
  fastify: '4.x',
  name: 'database',
  dependencies: [],
});
