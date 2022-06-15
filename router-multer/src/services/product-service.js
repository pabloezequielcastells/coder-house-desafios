export default class ProductService {

    constructor() {
        this.products = [];
    }

    getAll() {
        return this.products;
    }

    get(id) {
        console.log(this.products);
        
        let index = this.products
            .findIndex(p => p.id == id);
        
        if (index >= 0) {
            return this.products[index];
        } else {
            return null;
        }
    }

    create(product) {
        product.id = new Date().getTime();
        this.products.push(product);
        return product;
    }

    update(product) {
        const index = this.products.findIndex(p => p.id == product.id);
        if (index >= 0) {
            this.products[index] = product;
        }
        return product;
    }

    delete(id) {
        const index = this.products.findIndex(p => p.id == id);
        this.products.splice(index, 1);
    }
}