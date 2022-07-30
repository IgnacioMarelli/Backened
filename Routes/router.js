const express = require('express');
const { Router }= express;
const router = Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const { Contenedor }= require ('../Contenedores/clases');
const contenedor1 = new Contenedor("productos.json");

const validarAdmin = (req, res, next)=>{
    if(req.headers.admin){
        next()
    }else{
        res.status(401).send('No autorizado');
    }
}

router.get('/:id?', (req, res)=>{
    const { id } = req.query;
    if (id != undefined) {
      const response = contenedor1.getById(Number(id));
      res.send( response );
    } else {
      const response = contenedor1.getAll();
      res.send(response );
    }
})
router.post('/',validarAdmin, (req, res)=>{
    const { title, price, thumbnail, description, codigo, stock } = req.body;
    if ( title && price && thumbnail && description && codigo && stock ) {
        if (title === "" || price === "" || thumbnail === ""|| description ===""|| codigo === "" || stock ==="") {
            res.send("Falta completar alguno de los datos");
        }else{
            const dt = new Date();
            const date = dt.toLocaleString();
            contenedor1.save({ title, price, thumbnail, date, description, codigo, stock });
            const response = contenedor1.getAll();
            res.send(response );
        }
    }else{
        res.send('No ingreso alguna de las características del objeto')
    }
})

router.put('/:id', validarAdmin, (req, res)=>{
    const producto = req.body;
    const { id } = req.params;
    const prod = contenedor1.update(id, producto);
    res.json(prod)
})

router.delete("/:id", validarAdmin, (req, res) => {
    const { id } = req.params;
    res.json( contenedor1.deleteById(id));
})
module.exports = { router }