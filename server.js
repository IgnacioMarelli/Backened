const express = require ('express');
const app = express();
const fs = require('fs');
const { Contenedor }= require ('./desafio2');

const contenedor1 = new Contenedor("productos.txt");

app.get('/', (req, res)=>{
    res.send('Hola!');
})
app.get('/productos', async (req, res)=>{
    const prods = await contenedor1.getAll();
    res.send(prods);
})
app.get('/productoRandom', async (req, res)=>{
    const prod = await contenedor1.getRandomItem();
    res.send(prod);
})
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

server.on("error", error=> console.log(error));