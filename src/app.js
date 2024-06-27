const express = require("express");
const db = require("./db")
const app = express();

app.use(express.text());
app.use(express.json());

//Lista de productos
app.get("/products",(req, res)=>{
    res.json(db)
})
//Producto por id
app.get("/products/:id",(req, res)=>{
    const id = parseInt(req.params.id);

    const encontrarProducto = db.find((name)=>name.id === id);
    res.json(encontrarProducto);
})
//Agregar Producto
app.post("/products",(req, res)=>{
    const {id, name, quantity, price} = req.body;

    const nuevoProducto = db.push({id: id, name: name, quantity: quantity, price: price})
    res.send("Producto agregado con exito")
})
//Actualizar precio, nombre, cantidad por su id
app.put("/products/:id",(req, res)=>{
    const id = parseInt(req.params.id);
    const {name, price, quantity} = req.body;

    const encontrarProducto = db.find((name)=>name.id === id)
    encontrarProducto.name= name;
    encontrarProducto.price = price;
    encontrarProducto.quantity= quantity;
    res.send("Producto actualizado correctamente")
})
//eliminar un producto por su id
app.delete("/products/:id",(req, res)=>{
    const id = parseInt(req.params.id);

    const encontrarProducto = db.find((name)=>name.id === id)
    const indicieProducto = db.indexOf(encontrarProducto);
    const eliminarProducto = db.splice(indicieProducto, 1);
    res.send("Producto eliminado exitosamente")
})
app.listen(3000,()=>console.log("Servidor funcionando en el puerto 3000"))