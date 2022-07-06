const fs = require('fs');
class Contenedor{
    constructor(archivo){
        this.archivo=archivo;
    }
    async save(product){
        try{
            const data = await this.getAll();
            product.id = data.length + 1;
            data.push(product);
            fs.writeFileSync(this.archivo, JSON.stringify(data));
            return {
                product: product,
            };
        }catch (error){
            console.log(`El error es: ${error}`);
        }
    }

    async getById(id){
        try{
            const respuesta = await fs.promises.readFile(this.archivo, "utf-8");
            const datos = JSON.parse(respuesta);
            const resultado = datos.findIndex((obj)=> obj.id == id);
            if (resultado > 0) {
                return (datos[resultado])
            } else {
                return (null)
            }
        }catch(error){
            console.log(`El error es: ${error}`);
        }
    }
    async update(id, product) {
		const data = await this.getAll();
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

    async getAll(){
        try {
            const respuesta = await fs.promises.readFile(this.archivo, "utf-8");
            const productos = JSON.parse(respuesta);
            return  productos
        } catch (error) {
            console.log(`El error es: ${error}`);
        }
    }
    async getRandomItem(){
        try {
            const respuesta = await fs.promises.readFile(this.archivo, "utf-8");
            const productos = JSON.parse(respuesta);
            console.log(productos)
            const productoRandom= productos[parseInt(Math.random()*3)];
            return productoRandom;
        } catch (error) {
            console.log(`El error es: ${error}`);
        }
    }

    async deleteById(id){
        try {
            const respuesta = await fs.promises.readFile(this.archivo, "utf-8");
            const productosParseados = JSON.parse(respuesta);
            const prods = productosParseados.filter(prod=> prod.id!==id);
            await fs.promises.writeFile(this.archivo, JSON.stringify(prods));
            return `Has eliminado el producto con id: ${id} de la lista`
        } catch (error) {
            console.log(`El error es: ${error}`);
        }
    }
    async deleteAll (){
        try {
            const respuesta = await fs.promises.readFile(this.archivo, "utf-8");
            if (respuesta == "") {
                console.log('No hay productos para borrar');
            } else {
                await fs.promises.writeFile(this.archivo, "");
            }
        } catch (error) {
            console.log(`El error es: ${error}`);
        }
    }
}

const contenedor1 = new Contenedor("productos.txt");

module.exports = { Contenedor }