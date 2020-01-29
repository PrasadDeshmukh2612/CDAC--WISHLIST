const db=require('./db')
const express=require('express')
const utils = require('./utils')
const multer=require('multer')
const upload=multer({dest:'./images'})

const router=express.Router();

//on click of place order
router.post('/',(request,response)=>{

    const{customer_id,product_id,product_name,price}=request.body
    // const image=request.file.filename   

    const connection=db.connect();
    const statement=`insert into Orders(customer_id,product_id,product_name,price) values ('${customer_id}','${product_id}','${product_name}','${price}')`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})




module.exports=router