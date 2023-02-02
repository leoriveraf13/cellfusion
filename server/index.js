const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();

const  PORT = 3002;
app.use(cors());
app.use(express.json())

// Route to get all warehouses
app.get("/api/getWarehouse/", (req, res)=>{
    db.query('SELECT * FROM warehouse', (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    }
    );   
});

// Route to get all products
app.get("/api/getProducts/", (req, res)=>{
    db.query('SELECT * FROM products', (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    }
    );   
});

// Route for creating warehouse
app.post('/api/createWarehouse', (req,res)=> {
    const name = req.body.name;
    const minProd = req.body.minProd;
    const maxProd = req.body.maxProd;

    db.query("INSERT INTO warehouse (name, minProd, maxProd) VALUES (?,?,?)",[name,minProd,maxProd], (err,result)=>{
    if(err) {
        console.log(err)
    } 
    res.send(result)
    });   
})

// Route for creating products
app.post('/api/createProducts', (req,res)=> {

    const name = req.body.name;
    const total = req.body.total;
    const remaining = req.body.remaining;
    const warehouse = req.body.warehouse;
    
    db.query("INSERT INTO products (name, total, remaining, warehouse) VALUES (?,?,?,?)",[name, total, remaining, warehouse], (err,result)=>{
       if(err) {
           console.log(err)
       } 
       res.send(result)
    });   
})

// Route to update a warehouse
app.post('/api/updateWarehouse/:id',(req,res)=>{
    const id = req.params.id;
    const name = req.body.name;
    const minProd = req.body.minProd;
    const maxProd = req.body.maxProd;

    db.query("UPDATE warehouse SET name = ?, minProd = ?, maxProd = ? WHERE id = ?",[name,minProd,maxProd,id], (err,result)=>{
        if(err) {
            console.log(err)   
        } 
        res.send(result)
    });
});

// Route to update a product
app.post('/api/updateProducts/:id',(req,res)=>{
    const id = req.params.id;
    const name = req.body.name;
    const total = req.body.total;
    const remaining = req.body.remaining;
    const warehouse = req.body.warehouse;

    db.query("UPDATE products SET name = ?, total = ?, remaining = ?, warehouse = ? WHERE id = ?", [name, total, remaining, warehouse, id], (err,result)=>{
        if(err) {
            console.log(err)   
        } 
        res.send(result)
    });    
});

// Route to delete a warehouse
app.delete('/api/deleteWarehouse/:id',(req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM warehouse WHERE id= ?", id, (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
})})

// Route to delete a warehouse
app.delete('/api/deleteProducts/:id',(req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM products WHERE id= ?", id, (err,result)=>{
    if(err) {
        console.log(err)
    } 
    res.send(result)
})})


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})