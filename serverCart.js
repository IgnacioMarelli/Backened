const express = require('express');
const app = express();
const { Router }= express;
const routerCart = Router();
app.use('/carrito', routerCart);
routerCart.use(express.json());
routerCart.use(express.urlencoded({extended:true}));
const { Contenedor }= require ('./clases');
const contenedor1 = new Contenedor("productos.json");
const contenedor2 = new Contenedor("carrito.json");
app.use(express.static('public'));


routerCart.post('/', (req, res)=>{
        const { title, price, thumbnail, description, codigo, stock } = req.body;
        const producto={ title, price, thumbnail, description, codigo, stock };
        const dt = new Date();
        const cartDate = dt.toLocaleString();
        contenedor1.save(producto);
        const response = contenedor2.getAll();
        if (response == []) {
            const newCart = {
				timestamp: cartDate,
				products: [producto],
			};
            contenedor2.save(newCart);
            res.send(contenedor2.getAll() );
			return newCart;
        } else {
            const newCart = {
				timestamp: cartDate,
				products: [producto],
			};
            contenedor2.save(newCart);
            res.send(contenedor2.getAll());
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
const PORT = process.env.PORT || 8080;
const srv = app.listen(PORT, () => { 
   console.log(`Servidor escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))