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
/*
const { ContenedorSql } = require('./Contenedores/sql')
const {optionsMDB} = require('./options/MariaDB')
const sql = new ContenedorSql(optionsMDB)

const validarAdmin = (req, res, next)=>{
    if(req.headers.admin){
        next()
    }else{
        res.status(401).send('No autorizado');
    }
}

router.get('/', (req, res)=>{
    const { id } = req.query;
    if (id != undefined) {
      const response = sql.getById(Number(id));
      res.send( response );
    } else {
      const response = sql.getAll();
      res.send(response );
    }
})
router.post('/',validarAdmin, (req, res)=>{
    const { title, price, thumbnail, description, codigo, stock } = req.body;
    if ( title && price && thumbnail && description && codigo && stock ) {
        if (title === "" || price === "" || thumbnail === ""|| description ===""|| codigo === "" || stock ==="") {
            res.send("Falta completar alguno de los datos");
        }else{
            sql.crearTabla().then(()=>{

                const dt = new Date();
                const date = dt.toLocaleString();
                const xd = { title, price, thumbnail, date, description, codigo, stock };
                return sql.save(xd)
            }).then(()=>{
               return res.send(sql.getAll());
            }).catch((err)=>{
                console.log(err);
            } ) 
        }
    }else{
        res.send('No ingreso alguna de las características del objeto')
    }
})

router.put('/productos/:id', validarAdmin, (req, res)=>{
    const productoTitle = req.body;
    const { id } = req.params;
    const prod = sql.update(id, productoTitle);
    res.json(prod)
})

router.delete("/productos/:id", (req, res) => {
    const { id } = req.params;
    res.json( sql.deleteById(id));
})
*/

 const PORT = process.env.PORT || 8080;
 const srv = app.listen(PORT, () => { 
    console.log(`Servidor escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))