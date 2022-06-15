import express from "express";
import controller from '../controller/product-controller.js';

const router = express.Router();

router.get('/:id', controller.getProduct);

router.get('/', controller.getAllProducts); 

router.post('/', controller.createProduct);

router.put('/:id', controller.updateProduct);

router.delete('/:id', controller.deleteProduct);

export default router;