const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3030;

app.use(cors()); //- app.use es para usar una funcionalidad
app.use(express.json());

//- Crear ruta de Documentación
let swaggerDocument;
try {
    swaggerDocument = require('../swagger-output.json');
} catch {
    console.error('Swagger no generado aún. Vuelve a ejecutar npm run start o dev');
}

if (swaggerDocument) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

//- RUTAS -//

//- Ejemplo
app.get('/', (req, res) => {
    res.send('<h1>API de JEDI</h1>');
})

//- RUTA JEDI HACIA ROUTER-//
app.use('/jedis', require('./routes/jedis'));

//- RUTA RANGOS HACIA ROUTER-//

//- RUTA FORMAS COMBATE HACIA ROUTER-//
app.use('/stylesForm', require('./routes/stylesForm'));

//- RUTA ESPECIALIZACIÓN HACIA ROUTER-//


//- Para ver la API 
app.listen(PORT, () => {
    console.log(`La API está escuchando en http://localhost:${PORT}`);
});