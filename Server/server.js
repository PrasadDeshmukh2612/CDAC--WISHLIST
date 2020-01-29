 const express = require('express');
 const bodyParser=require('body-parser')

 //import the routers

 const routerCustomers=require('./customers')
 const routerAdmin=require('./admin')
 const routerVendor=require('./vendor')
const routerProducts=require('./Products')
const routerCategory=require('./category')
const routerUser=require('./user')
const routerOrders=require('./orders')
const routerCart=require('./cart')

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use(bodyParser.json())//why we use this??
app.use(express.static('images'))
app.use('/customers',routerCustomers)
app.use('/admin',routerAdmin)
app.use('/vendor',routerVendor)
app.use('/Products',routerProducts)
app.use('/category',routerCategory)
app.use('/user',routerUser)
app.use('/orders',routerOrders)
app.use('/cart',routerCart)
app.listen(5000,'0.0.0.0',()=>{
    console.log('Server Started on port 5000')
})
