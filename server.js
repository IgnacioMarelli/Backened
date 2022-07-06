const express = require ('express');
const app = express();
const { Router }= express;
const router = Router();

const { Contenedor }= require ('./desafio2');
const contenedor1 = new Contenedor("productos.json");

app.use('/api/productos', router);
router.use(express.json());
router.use(express.urlencoded({extended:true}));

app.use(express.static('public'));



router.get('/', (req, res)=>{
    res.json(contenedor1.getAll());
})
router.post('/', (req, res)=>{
    const { title, precio, thumbnail } = req.body;
    if(title === "" || precio === "" || thumbnail === "") {
        res.json({
        error: "Alguno de los campos ha quedado sin rellenar"
        });
    } 
    res.json(contenedor1.save({ title: title, precio: Number(precio), thumbnail: thumbnail}));

})

router.get('/:id', (req, res)=>{
    const idRouter = parseInt(req.params.id);
    const resultado = productos.find(element=> element.id == idRouter)
    if (resultado.id > 0) {
        return res.json([resultado])
    } else {
        return res.send('No existe el producto buscado')
    } 
})
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

server.on("error", error=> console.log(error));