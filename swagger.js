const swaggerAutogen = require('swagger-autogen');

const outputFile = './swagger-output.json';

const doc = {
    info: {
        title: 'Jedis API',
        description: 'API con datos de la Orden Jedi'
    },
    host: 'localhost:3030',
    schemas: ['http']
}

const endpointsFiles = [
    './src/app.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc)
.then(() => {
    require('./src/app.js');
});