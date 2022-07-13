const express = require ('express');
const exphbs = require('express-handlebars');
const app = express();
const { Router }= express;
const router = Router();

const { Contenedor }= require ('../desafio2');
const contenedor1 = new Contenedor("productos.json");
app.use('/api', router);
router.use(express.json());
router.use(express.urlencoded({extended:true}));
let prodsAgregados = [];

app.engine(
    ".hbs",
    exphbs.engine({
        extname: ".hbs",
        defaultLayout:"main.hbs",
        layoutsDir: "./views/layout"
    })
);


app.set('views', './views');
app.set("view engine", ".hbs");

router.get('/', (req, res)=>{
    res.render('../views/formulario.hbs');
})
router.post('/productos', (req, res)=>{
    const { title, price, thumbnail } = req.body;
    const productoAgregado= { title, price, thumbnail };
    prodsAgregados.push(productoAgregado);
     res.render('../views/historial.hbs', {productoAgregado});
})
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

server.on("error", error=> console.log(error));