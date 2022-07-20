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
app.use(express.static("public"));
app.set("view engine", ".pug");
app.set("views", "views");


router.get('/', (req, res)=>{
    res.render('../views/formulario');
})
router.post('/productos', (req, res)=>{
    const { title, price, thumbnail } = req.body;
    const productoAgregado= { title, price, thumbnail };
    if (title === "" || price === "" || thumbnail === "") {
        res.render("../views/faltanDatos", {prodsAgregados});
    }else{
        prodsAgregados.push(productoAgregado);
        res.render('../views/historial', {prodsAgregados});
    }
})




const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

server.on("error", error=> console.log(error));