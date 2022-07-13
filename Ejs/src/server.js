const express = require ('express');
const exphbs = require('express-handlebars');
const app = express();
const { Router }= express;
const router = Router();
const { Contenedor }= require ('../../Handlesbar/desafio2');
const contenedor1 = new Contenedor("productos.json");
app.use('/api', router);
router.use(express.json());
router.use(express.urlencoded({extended:true}));
let prodsAgregados = [];
app.set("view engine", ".ejs");
app.set("views", "views");


router.get('/', (req, res)=>{
    res.render('../views/formulario');
})
router.post('/productos', (req, res)=>{
    const { title, price, thumbnail } = req.body;
    prodsAgregados.push({ title, price, thumbnail });
 //    const product = await contenedor1.save({ title: title, price: Number(price), thumbnail: thumbnail})
     res.render('../views/historial', {prodsAgregados});
})

//router.get('/:id', (req, res)=>{
//    const idRouter = parseInt(req.params.id);
//    const products = await contenedor1.getAll()
//    const resultado = products.find(element=> element.id == idRouter)
 //   if (resultado.id > 0) {
//       return res.json([resultado])
//    } else {
//        return res.send('No existe el producto buscado')
//    } 
//})

//router.put('/:id', async (req, res)=>{
//    const producto = req.body;
//    const { id } = req.params;
//    const prod = await contenedor1.update(id, producto);
//    res.json(prod)
//})

//router.delete("/:id", (req, res) => {
 //   const { id } = req.params;
 //   res.json( contenedor1.deleteById(Number(id)));
 // })



const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

server.on("error", error=> console.log(error));