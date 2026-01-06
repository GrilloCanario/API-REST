const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const jedis = [
    {
        "id": 1,
        "name": "Ahsoka Tano",
        "species": "Togruta"
    },
    {
        "id": 2,
        "name": "Luke Skywalker",
        "species": "Human"
    },
    {
        "id": 3,    
        "name": "Jhuan Vekar Bel’tan",
        "species": "Human"
    },
    {
        "id": 4,
        "name": "Andros Alfon Kresh",
        "species": "Human"
    }
]

const app = express();
const PORT = 3030;

app.use(cors()); //- app.use es para usar una funcionalidad


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

//- Mostrar todos los jedi
app.get('/jedis', (req, res) =>{
    res.json(jedis);
})

//- Mostrar jedi por ID
app.get('/jedis/:id',(req, res) =>{
    let id = req.params.id;
    res.json(jedis.find(jedi => jedi.id == id));
})

//-Eliminar un jedi por ID
app.delete('/jedis/:id', (req, res) =>{
    let id = req.params.id;
    res.status(204);
})


//- Para ver la API 
app.listen(PORT, () => {
    console.log(`La API está escuchando en http://localhost:${PORT}`);
});