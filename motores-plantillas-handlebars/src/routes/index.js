const { Router } = require('express');
const router = Router();
const productos = [];

router.get('/', (req, res) => { 
    res.render('products-details');
}); 

router.post('/productos', (req, res) => {
    try {
        productos.push(req.body); 
        res.redirect('/');
    } catch(e) {
        console.log('Error: ', e);
        res.sendStatus(500);
    }
});

router.get('/productos', (req, res) => { 
    res.render('products', { hasProductos: productos.length > 0 , productos });
});
 
module.exports = router;