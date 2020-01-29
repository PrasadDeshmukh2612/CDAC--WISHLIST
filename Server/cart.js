const db=require('./db')
const express=require('express')
const utils=require('./utils')
const multer=require('multer')
const upload=multer({dest:'./images'})



const router=express.Router()

router.post('/add_to_cart',(request,response)=>{

    const{product_id,customer_id,product_name,price}=request.body
    // const image=request.file.filename

    const connection=db.connect()
    const statement=`insert into Cart(product_id,customer_id,product_name,price) values(${product_id},${customer_id},'${product_name}',${price})`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.get('/:customer_id',(request,response)=>{
    const{customer_id}=request.params
    const connection=db.connect()
    const statement=`select * from Cart where customer_id = ${customer_id} `
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})


router.delete('/:customer_id',(request,response)=>{
    const{customer_id}=request.params

    const connection=db.connect()

    const statement=`delete from Cart where customer_id=${customer_id}`

    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.delete('/cart_item_delete/:customer_id/:product_id',(request,response)=>{
    const{product_id,customer_id}=request.params

    const connection=db.connect()

    const statement=`delete from Cart where product_id=${product_id} and customer_id=${customer_id}`

    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})


module.exports=router