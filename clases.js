const e = require('express');
const fs = require('fs');
class Contenedor{
    constructor(archivo){
        this.archivo=archivo;
    }
    
    getAll(){
        const respuesta = fs.readFileSync(this.archivo, "utf-8", (err, data) => { if (err) throw err;});
        const productos = JSON.parse(respuesta);
        return  productos
    }
    save(product){
            const data = this.getAll();
            product.id = data.length + 1;
            data.push(product);
            fs.writeFileSync(this.archivo, JSON.stringify(data));
            return {
                product: product,
            };
    }

    getById(id){
        const respuesta = fs.readFileSync(this.archivo, "utf-8");
        const datos = JSON.parse(respuesta);
        const resultado = datos.findIndex((obj)=> obj.id == id);
        if (resultado !== undefined) {
            return (datos[resultado])
        } else {
            return (null)
        }
    }
    update(id, product) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: "El producto con el id especificado no ha sido encontrado.",
			};
		}
		product.id = id;
		const previousProduct = data.splice(id - 1, 1, product);
		fs.writeFileSync(this.archivo, JSON.stringify(data));
		return {
			anterior: previousProduct,
			nuevo: product,
		};
	}

    getRandomItem(){
        const respuesta =  fs.readFileSync(this.archivo, "utf-8");
        const productos = JSON.parse(respuesta);
        const productoRandom= productos[parseInt(Math.random()*3)];
        return productoRandom;
    }
    
    deleteById(id){
        const respuesta =  fs.readFileSync(this.archivo, "utf-8");
        const productosParseados = JSON.parse(respuesta);
        const prods = productosParseados.filter(prod=> prod.id!==id);
        fs.writeFileSync(this.archivo, JSON.stringify(prods));
        return `Has eliminado el producto con id: ${id} de la lista`
    }
    deleteAll (){
        const respuesta = fs.readFileSync(this.archivo, "utf-8");
        if (respuesta == "") {
            console.log('No hay productos para borrar');
        } else {
            fs.writeFileSync(this.archivo, "[]");
        }
    }
    
    deleteCartById(id){
        const respuesta =  fs.readFileSync(this.archivo, "utf-8");
        const productosParseados = JSON.parse(respuesta);
        const prods = productosParseados.filter(prod=> prod.id!== Number(id));
        fs.writeFileSync(this.archivo, JSON.stringify(prods));
        return `Has eliminado el producto con id: ${id} de la lista`
    }
    addProd(product){
        const respuesta = fs.readFileSync(this.archivo, "utf-8");
        const prodsParse= JSON.parse(respuesta);
        const cart= prodsParse.length;
        const cartRandom= prodsParse[parseInt(Math.random()*cart)];
        cartRandom.products.push(product);
        fs.writeFileSync(this.archivo, JSON.stringify(prodsParse));
        return cartRandom
    }
    deleteOneProd(id_prod, id){
        const carritos = this.getAll();
        const carrito = carritos.find(prod=> prod.id== Number(id));
        if (carrito == undefined) {
            return 'No existe carrito con ese id'
        } else {
            const prodsCarrito= carrito.products.filter(prod=> prod.id !== Number(id_prod));
            carrito.products = prodsCarrito;
            fs.writeFileSync(this.archivo, JSON.stringify(carritos));
            return carrito
        }
    }
    idCart() {
		const data = this.getAll();
		let id = 1;
		data.forEach((element) => (element.id = id++));
		fs.writeFileSync(this.archivo, JSON.stringify(data));
	}
}

const contenedor1 = new Contenedor("productos.txt");

module.exports = { Contenedor }