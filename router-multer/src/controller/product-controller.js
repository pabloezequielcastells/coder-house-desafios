import ProductService from "../services/product-service.js";

const service = new ProductService();

const getAllProducts = (req, res) => {
    try {
        res.send(service.getAll());
    } catch (error) {
        res.status(500).send(error);
    }
}

const getProduct = (req, res) => {
    try {
        const id = req.params.id;
        const product = service.get(id);  
        if(product) {
            res.send(product);
        } else {
            res.status(404).send({ status: "error", message: "Product not found" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const createProduct =  (req, res) => {
    try {
        let product = req.body;
        productValidation(product);
        product = service.create(product);
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateProduct = (req, res) => {
    try {
        const product = req.body;
        productValidation(product);
        product.id = req.params.id;
        service.update(product);
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteProduct = (req, res) => {
    try {
        service.delete(req.params.id);
        res.send({ status: "success", message: "Product deleted" });
    } catch (error) {
        res.status(500).send(error);
    }
}

const productValidation = (product) => {
    if (!product.title)
        throw "Product Titulo is required"; 
    if (!product.thumbnail)
        throw "Product Imagen Url is required";
    if (isNaN(product.price))
        throw "Product Precio is required";
}

export default {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}