let { Router } = require('express');
let router = Router();

let specializations = require('../../data/specializations.json');

//- MOSTRAR TODOS
router.get('/', (req, res) => {
    res.json(specializations);
});

//- MOSTRAR UNO POR ID
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let spec = specializations.find(s => s.id == id);

    if (spec) {
        res.json(spec);
    } else {
        res.status(404).json({ error: `No se encuentra la especialización con id ${id}` });
    }
});

//- ELIMINAR UNA ESPECIALIZACIÓN
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let existe = specializations.some(s => s.id == id);

    if (!existe) {
        return res.status(404).json({ error: `No existe la especialización con id ${id}` });
    }

    specializations = specializations.filter(s => s.id != id);
    res.status(204).json({ msg: 'Especialización eliminada' });
});

//- CREAR UNA ESPECIALIZACIÓN
router.post('/', (req, res) => {
    const newSpec = req.body;

    // Permitimos nombre/titulo y description/descripcion
    const nombre = newSpec.name;
    const descripcion = newSpec.description;

    if (!nombre || nombre.trim() === '' || !descripcion || descripcion.trim() === '') {
        return res.status(400).json({ error: 'El nombre/título y la descripción no pueden estar vacíos' });
    }

    let maximo = Math.max(...specializations.map(s => s.id));
    newSpec.id = maximo + 1;

    // Guardamos normalizado como name/description
    specializations.push({
        id: newSpec.id,
        name: nombre,
        description: descripcion
    });

    res.status(201).json(newSpec);
});

//- MODIFICAR UNA ESPECIALIZACIÓN
router.put('/:id', (req, res) => {
    let id = req.params.id;
    const nuevoNombre = req.body.name;
    const nuevaDescripcion = req.body.description;

    let spec = specializations.find(s => s.id == id);

    if (!spec) {
        return res.status(404).json({ error: 'No existe esta especialización' });
    }

    if (!nuevoNombre || nuevoNombre.trim() === '' || !nuevaDescripcion || nuevaDescripcion.trim() === '') {
        return res.status(400).json({ error: 'El nombre/título y la descripción no pueden estar vacíos' });
    }

    spec.name = nuevoNombre;
    spec.description = nuevaDescripcion;

    res.status(200).json(spec);
});

module.exports = router;
