import fs from 'fs';
class Contenedor {

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.productos = null;
    }

    async getAll() {
        try {
            if (fs.existsSync(this.nombreArchivo)) {
                const texto = await fs.promises.readFile(this.nombreArchivo, "utf-8");
                this.productos = await JSON.parse(texto);
            } else {
                this.productos = [];
            }
            return this.productos;
        } catch (error) {
            console.log("No se pudo leer: " + error);
        }
    }

    async getById(id) {
        try {
            if (!this.productos) await this.getAll();
            const index = this.productos.findIndex(p => p.id == id);
            return index > -1 ? this.productos[index] : null;
        } catch (error) {
            console.log("No se pudo leer: " + error);
        }
    }

    async save(producto) {
        try {
            if (!this.productos) await this.getAll();
            producto.id = this.productos.length > 0 ? this.productos[this.productos.length - 1] + 1 : 1;
            this.productos.push(producto);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos, null, "\t"));
            return producto.id;
        } catch (error) {
            console.log("Error al guardar " + error);
        }
    }

    async deleteById(id) {
        try {
            if (!this.productos) await this.getAll();
            const index = this.productos.findIndex(p => p.id == id);
            if (index > -1) {
                this.productos.splice(index, 1);
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos, null, "\t"));
            }
        } catch (error) {
            console.log("No se pudo leer: " + error);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.unlink(this.nombreArchivo);
        } catch (error) {
            console.log("Error al borrar " + error);
        }
    }

}

const escuadra = {
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
}

const calculadora = {
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
}

const globo = {
    title: "Globo Terraqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
}

const contenedor = new Contenedor("productos.txt");

const addProducts = async() => {
    await contenedor.save(escuadra);
    await contenedor.save(calculadora);
    await contenedor.save(globo);
    await getAll();
}

const getAll = async() => {
    const products = await contenedor.getAll();
    console.log(products);
}

const getById = async() => {
    const id = await contenedor.save(escuadra);
    const product = await contenedor.getById(id);
    console.log(product);
}

const deleteAll = async() => {
    await contenedor.deleteAll();
}

const addProductAndDelete = async() => {
    const id = await contenedor.save(escuadra);
    await contenedor.deleteById(id);
}

// addProducts();

// getAll();

// addProductAndDelete(); 

// deleteAll();

// getById();