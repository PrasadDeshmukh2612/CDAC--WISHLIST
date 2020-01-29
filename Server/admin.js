const db=require('./db')
const express=require('express')
const utils = require('./utils')
const cryptoJs=require('crypto-js')

const router=express.Router()

router.get('/',(request,response)=>{
    const connection=db.connect()
    const statement='select * from Admin'
    connection.query(statement,(error,data)=>{
        connection.end()
        const admin=[]
        for(let index=0;index<data.length;index++){
            const Admin=data[index]
            admin.push({
                username:Admin['username'],
                email:Admin['email']
            })
        }
        response.send(utils.createResult(error,admin))
    })
})


router.post('/login',(request,response)=>{
    const{email,password}=request.body
    const encryptedPassword=''+cryptoJs.MD5(password)
    const connection=db.connect()
    const statement=`select * from Admin where email='${email}' and password='${encryptedPassword}'`
    connection.query(statement,(error,admin)=>{
        connection.end()
        if(admin.length==0){
            response.send(utils.createResult('Invalid Email or Password'))
        }
        else{
            const Admin=admin[0]
            const info={
                username:Admin['username'],
                email:Admin['email']
            }
            response.send(utils.createResult(null,info))//??
        }
    })
})

router.post('/register',(request,response)=>{
    const{username,email,password}=request.body
    const encryptedPassword=''+cryptoJs.MD5(password)
    const connection=db.connect()

    const statement1=`select * from Admin where email ='${email}'`
    connection.query(statement1,(error,admin)=>{
        if(admin.length==0){

            //insert a new record
            const statement=`insert into Admin(username,email,password) values ('${username}','${email}','${encryptedPassword}')`
            connection.query(statement,(error,data)=>{
                connection.end()
                response.send(utils.createResult(error,data))
            })

        }else{
            //user with email already exists
            connection.end()
            response.send(utils.createResult('Email Already,Please Use Another EmailID'))

        }
    })


})

module.exports=router