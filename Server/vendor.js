const db = require('./db')
const utils = require('./utils')
const express = require('express')
const multer=require('multer')
const upload=multer({dest:'./images'})

const router=express.Router()

router.get('/',(request,response)=>{
    const connection=db.connect()
   // connection.connect()
    const statement=`select * from Vendor_details`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})


router.get('/:vendor_id',(request,response)=>{
    const {vendor_id} = request.params
    const connection=db.connect()
   // connection.connect()
    const statement=`select * from Vendor_details where vendor_id= ${vendor_id}`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})
//add image

router.post('/',upload.single('image'),(request,response)=>{
    const{vendor_id,vendor_name}=request.body
    const image=request.file.filename

    const connection=db.connect()
    const statement=`insert into Vendor_details (vendor_id,vendor_name,image) values (${vendor_id},'${vendor_name}','${image}')`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.put('/update/:vendor_id',(request,response)=>{
    const {vendor_id}=request.params
    const {vendor_name}=request.body
    const connection=db.connect()
   // connection.connect()

    const statement=`update Vendor_details set vendor_name='${vendor_name}' where vendor_id=${vendor_id}`
    connection.query(statement,(error,data)=>{
        connection.end()

        response.send(utils.createResult(error,data))
    })
})

router.delete('/:vendor_id', (request, response) => {
    const {vendor_id} = request.params
    const connection = db.connect()
   // connection.connect()
    const statement = `delete from Vendor_details where vendor_id = ${vendor_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports=router