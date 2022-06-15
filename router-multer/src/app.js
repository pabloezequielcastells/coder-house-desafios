import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js"; 
import __dirname from "./utils.js";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", productsRouter); 
 