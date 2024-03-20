const express = require('express');
//const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const connection = require('./config/db');

const app = express();


app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/',(req,res)=>{
        res.send("hello");
    })

const PORT = process.env.PORT || 8080;
app.listen(PORT,async()=>{
        try{
           await connection,
           console.log("connected to db");
           console.log(`Server is running at port ${PORT}`);
        
        }
        catch(err){
            console.log(err);
        }
    })