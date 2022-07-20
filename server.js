const express = require('express');
const app = express();
const { Router }= express;
const router = Router();
const { Contenedor }= require ('./desafio2');
const contenedor1 = new Contenedor("productos.json");
app.use('/', router);
router.use(express.json());
router.use(express.urlencoded({extended:true}));
app.set("view engine", ".ejs");
app.set("views", "views");
const server = require('http').Server(app)
const io = require('socket.io')(server)

let messages = [
];

app.use(express.static('public'));

io.on('connection', function(socket) {
    let prodsAgregados = contenedor1.getAll();
    console.log('Nuevo usuario conectado');
    socket.emit('messages', messages);
    socket.emit('products', prodsAgregados);

    socket.on('new-message', (data)=>{
        messages.push(data);
        io.sockets.emit('messages', messages); 
        prodsAgregados.push(data);       
        io.sockets.emit('products', prodsAgregados);
    });
});



router.get('/', (req, res)=>{
    let prodsAgregados = contenedor1.getAll();

    res.render('../views/formulario', {prodsAgregados});
})
router.post('/', (req, res)=>{
    let prodsAgregados = contenedor1.getAll();

    const { title, price, thumbnail } = req.body;
    if (title === "" || price === "" || thumbnail === "") {
        res.render("../views/faltanDatos", {prodsAgregados});
    }else{
        contenedor1.save({ title, price, thumbnail });
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
 const connectedServer = server.listen(PORT, ()=>{
     console.log(`Servidor escuchando en el puerto ${PORT}`)
 })
 connectedServer.on('error', error=> console.log(`Se detecto el error: ${error}`));
 