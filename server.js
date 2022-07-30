const express = require('express');
const app = express();
const {router} = require('./Routes/router');
const {routerCart} = require('./Routes/routerCart')
app.use('/api/productos', router);
app.use('/api/carrito', routerCart);
app.use(express.static('public'));

function error404(req, res, next) {
	console.log(req.url, req.method);
	const message = {
		error: 404,
		descripcion: `ruta ${req.url} y metodo ${req.method} no estan implementados`,
	};
	if (req.url !== "/" || (req.url === "/" && req.method !== "GET")) {
		res.status(404).json(message);
	}
	next();
}

app.use(error404);


 const PORT = process.env.PORT || 8080;
 const srv = app.listen(PORT, () => { 
    console.log(`Servidor escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))