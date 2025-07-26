const express = require('express');
const mongoose = require('mongoose');
const user = require('./models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const todo = require('./models/todoModel');

const authRoutes = require('./authorization/authentication');
const todoRoutes = require('./routes/todoRoutes');
const productRoutes = require('./routes/productRoutes')
const cors = require('cors')
require('dotenv').config()

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

app.use(express.json())
app.use(cors())

app.set('view engine','ejs');
app.use('/api/auth',authRoutes);
app.use('/api/todo',todoRoutes);
app.use('/api/products',productRoutes);

app.get("/",(req,res)=>{
    res.render("index",{aaaaa : "this is message"})
})


app.get("/login",(req,res)=>{
    res.send("this from login")
})


app.use((req,res)=>{
    res.render("404")
})



app.get("/register",(req,res)=>{
    res.send("this from register")
})


app.get("/products",(req,res)=>{
    res.send("this from products")
})




const LocalPORT = process.env.PORT || 5000
console.log(LocalPORT,'port');
app.listen(LocalPORT,()=>{
    console.log(`"backend is running at ${LocalPORT}"`);
    
})

