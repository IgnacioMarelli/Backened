const express = require('express');
const app = express();
const { Router }= express;
const router = Router();
const { Contenedor }= require ('./clases');
const contenedor1 = new Contenedor("productos.json");
app.use('/api', router);
router.use(express.json());
router.use(express.urlencoded({extended:true}));
/*app.set("view engine", ".ejs");
app.set("views", "views");
const server = require('http').Server(app);

const io = require('socket.io')(server);

let messages = [
];
let prodsAgregados = contenedor1.getAll();
app.use(express.static('public'));

io.on('connection', function(socket) {
    console.log('Nuevo usuario conectado');
    socket.emit('messages', messages);
    socket.emit('products', prodsAgregados);

    socket.on('new-message', (data)=>{
        messages.push(data);
        io.sockets.emit('messages', messages); 
    });
    socket.on('new-product', (prod)=>{
        contenedor1.save(prod);
        io.sockets.emit('products', prodsAgregados);
    });
});*/

const validarAdmin = (req, res, next)=>{
    if(req.headers.admin){
        next()
    }else{
        res.status(401).send('No autorizado');
    }
}

router.get('/productos', (req, res)=>{

    res.render('../views/formulario', {prodsAgregados});
})
router.post('/', (req, res)=>{

    const { title, price, thumbnail } = req.body;
    if (title === "" || price === "" || thumbnail === "") {
        res.render("../views/faltanDatos", {prodsAgregados});
    }else{
        contenedor1.save({ title, price, thumbnail });
        let prodsAgregados = contenedor1.getAll();
        res.render('../views/formulario', {prodsAgregados});
    }
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
 const srv = server.listen(PORT, () => { 
    console.log(`Servidor Http con Websockets escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))