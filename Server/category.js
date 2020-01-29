const db=require('./db')
const express=require('express')
const utils=require('./utils')
const multer=require('multer')
const upload=multer({dest:'./images'})

const router=express.Router()

router.get('/',(request,response)=>{
    const connection=db.connect()
    const statement=`select * from Category`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })

})

router.get('/:category_id',(request,response)=>{
    const {category_id} = request.params
    const connection=db.connect()
    const statement=`select * from Category where category_id =${category_id}`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })

})


router.post('/',upload.single('image'),(request,response)=>{
    const{category_id,category_name}=request.body
    const image=request.file.filename

    const connection=db.connect()
    const statement=`insert into Category(category_id,category_name,image) values(${category_id},'${category_name}','${image}')`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})


router.delete('/:category_id',(request,response)=>{
    const{category_id}=request.params

    const connection=db.connect()

    const statement=`delete from Category where category_id=${category_id}`

    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})


router.put('/update/:category_id',(request,response)=>{
    const {category_id}=request.params
    const {category_name}=request.body
    const connection=db.connect()
   // connection.connect()

    const statement=`update Category set category_name='${category_name}' where category_id=${category_id}`
    connection.query(statement,(error,data)=>{
        connection.end()

        response.send(utils.createResult(error,data))
    })
})



module.exports=router
