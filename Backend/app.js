const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');

connectToDb();

app.use(cors()); //abhi ke liye abhi ko access denge but baad mein production mein sirf apna domain hi access karega
//aur baaki sbb ko block kar dega; isliye cors use karte hain.

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/', (req, res)=>{
    res.send("Hello World");
});

app.use('/users',userRoutes);

module.exports=app;