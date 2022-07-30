const express = require('express');
const { Router }= express;
const routerCart = Router();
routerCart.use(express.json());
routerCart.use(express.urlencoded({extended:true}));
const { Contenedor }= require ('../Contenedores/clases');
const contenedor1 = new Contenedor("productos.json");
const contenedor2 = new Contenedor("carrito.json");


routerCart.post('/', (req, res)=>{
    const { title, price, thumbnail, description, codigo, stock } = req.body;
    const producto={ title, price, thumbnail, description, codigo, stock };
    if ( title && price && thumbnail && description && codigo && stock ) {
        if (title === "" || price === "" || thumbnail === ""|| description ===""|| codigo === "" || stock ==="") {
            res.send("Falta completar alguno de los datos");
        }else{
            const dt = new Date();
            const date = dt.toLocaleString();
            contenedor1.save(producto);
            const response = contenedor2.getAll();
            if (response == []) {
                const newCart = {
                    timestamp: date,
                    products: [producto],
                };
                contenedor2.save(newCart);
                res.send(contenedor2.getAll() );
                return newCart;
            } else {
                const newCart = {
                    timestamp: date,
                    products: [producto],
                };
                contenedor2.save(newCart);
                res.send(contenedor2.getAll());
            }
        }
    }else{
        res.send('No ingreso el objeto')
    }
})

routerCart.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.json( contenedor2.deleteCartById(id));
})
routerCart.get("/:id/productos", (req, res)=>{
    const { id } = req.params;
    const carritos = contenedor2.getAll();
    const prods = carritos.find(prod=> prod.id== Number(id));
    res.send(prods.products);
})
routerCart.post("/:id/productos", (req, res) => {
    const { id } = req.params;
    const response = contenedor1.getById(Number(id));
    if (response) {
         const result = contenedor2.addProd(response);
         res.send(result)
    } else {
        res.send(`No hay producto con id: ${id}`)
    }
})

routerCart.delete("/:id/productos/:id_prod", (req,res)=>{
    const { id, id_prod } = req.params;
    res.send(contenedor2.deleteOneProd(id_prod, id))
})

module.exports = { routerCart }