const knexLib = require("knex");
class ContenedorSql{
    constructor(archivo){
        this.knex=knexLib(archivo);
    }

    crearTabla(){
        return this.knex.schema.dropTableIfExists('libros')
        .finally(()=>{
            return this.knex.schema.createTable('libros', table=>{
                table.increments('id').primary();
                table.string('title', 30).notNullable();
                table.float('price');
                table.string('thumbnail', 80).notNullable();
    //            table.string('date', 10).notNullable();
                table.string('description', 80).notNullable();
                table.string('codigo', 10).notNullable();
                table.integer('stock');
            })
        })
    }
    save(product){
        return this.knex('libros').insert(product);
    }
    getAll(){
        return this.knex('libros').select('*');       
    }
    deleteById(id){
        return  this.knex('libros').where('id', id).del()
    }
    deleteAll (){
        return this.knex.destroy()
    }
    update(id, product){
        return this.knex.from('libros').where('title',product).update({id : id})
    }
}

module.exports = { ContenedorSql }