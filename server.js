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



router.get('/', async (req, res)=>{
    const products = await contenedor1.getAll()
    res.json(products);
})
router.post('/', async (req, res)=>{
    const { title, price, thumbnail } = req.body;
    if(title === "" || price === "" || thumbnail === "") {
        res.json({
        error: "Alguno de los campos ha quedado sin rellenar"
        });
    } 
    const product = await contenedor1.save({ title: title, price: Number(price), thumbnail: thumbnail})
    res.json(product);
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

router.put('/:id', async (req, res)=>{
    const producto = req.body;
    const { id } = req.params;
    const prod = await contenedor1.update(id, producto);
    res.json(prod)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    res.json( await contenedor1.deleteById(Number(id)));
  })



const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

server.on("error", error=> console.log(error));