let { Router } = require('express');
let router = Router();

let ranks = require('../../data/ranks.json');

//- MOSTRAR TODOS LOS RANGOS
router.get('/', (req, res) => {
    res.json(ranks);
});

//- MOSTRAR UN RANGO POR ID
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let rank = ranks.find(r => r.id == id);

    if (rank) {
        res.json(rank);
    } else {
        res.status(404).json({ error: `No se encuentra el rango con id ${id}` });
    }
});

//- ELIMINAR UN RANGO
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let existe = ranks.some(r => r.id == id);

    if (!existe) {
        return res.status(404).json({ error: `No existe el rango con id ${id}` });
    }

    ranks = ranks.filter(r => r.id != id);
    res.status(204).json({ msg: 'Rango eliminado' });
});

//- CREAR UN RANGO
router.post('/', (req, res) => {
    const newRank = req.body;

    if (newRank.name && newRank.name.trim() !== '') {
        let maximo = Math.max(...ranks.map(r => r.id));
        newRank.id = maximo + 1;
        ranks.push(newRank);
        res.status(201).json(newRank);
    } else {
        res.status(400).json({ error: 'El nombre del rango no puede estar vacío' });
    }
});

//- MODIFICAR UN RANGO
router.put('/:id', (req, res) => {
    let id = req.params.id;
    const nuevoNombre = req.body.name;

    let rank = ranks.find(r => r.id == id);

    if (!rank) {
        return res.status(404).json({ error: 'No existe este rango' });
    }

    if (!nuevoNombre || nuevoNombre.trim() === '') {
        return res.status(400).json({ error: 'El nombre no puede estar vacío' });
    }

    rank.name = nuevoNombre;
    res.status(200).json(rank);
});

module.exports = router;