let { Router } = require('express');
let router = Router();

let stylesForm = require('../../data/stylesForm.json');

//- Mostrar todos los Estilos de Combate
router.get('/', (req, res) => {
    res.json(stylesForm);
})


module.exports = router;