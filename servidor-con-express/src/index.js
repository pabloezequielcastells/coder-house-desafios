const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;
const DATA = "./src/productos.txt";
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/productos", async(req, res) => {
    try { 
        const productos = JSON.parse(await fs.promises.readFile(DATA, "utf-8"));
        return res.send({
            items: productos,
            cantidad: productos.length,
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/productoRandom", async(req, res) => {
    try { 
        const productos = JSON.parse(await fs.promises.readFile(DATA, "utf-8"));
        const producto = productos[Math.floor(Math.random() * productos.length)];
        return res.send({
            item: producto,
        });
    } catch (error) {
        console.log(error);
    }
});