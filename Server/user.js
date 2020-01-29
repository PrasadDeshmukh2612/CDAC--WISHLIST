//Service For User
const db=require('./db')
const express=require('express')
const utils=require('./utils')
const cryptoJs=require('crypto-js')

const router=express.Router()


router.post('/login',(request,response)=>{
const customer=[]
    const{email,password}=request.body
    const encryptedPassword=''+cryptoJs.MD5(password)
    const connection=db.connect()
    const statement=`select * from Customers where email='${email}' and password='${encryptedPassword}'`
    connection.query(statement,(error,customer)=>{
        connection.end()
        
        if(customer.length==0){
            response.send(utils.createResult('Invalid Email or Password'))
        }
        else{
            const Customers=customer[0]
            const info={
                customer_id:Customers['customer_id'],
                customer_name:Customers['customer_name'],
                email:Customers['email']
            }
            response.send(utils.createResult(null,info))//??
        }
    })
})


// router.post('/register',(request,response)=>{
//     const{customer_name,email,contact,area,street,city,state,country,pin,password}=request.body
//     const encryptedPassword=''+cryptoJs.MD5(password)
//     const connection=db.connect()

//     const statement1=`select * from Customers where email ='${email}'`
//     connection.query(statement1,(error,customer)=>{
//         if(customer.length==0){

//             //insert a new record
//             const statement=`insert into  Customers(customer_name,email,contact,area,street,city,state,country,pin,password) values ('${customer_name}','${email}','${contact}','${area}','${street}','${city}','${state}','${country}','${pin}','${encryptedPassword}')`
//             connection.query(statement,(error,data)=>{
//                 connection.end()
//                 response.send(utils.createResult(error,data))
//             })

//         }else{
//             //user with email already exists
//             connection.end()
//             response.send(utils.createResult('Email Already Exist..!!'))

//         }
//     })
// })


router.post('/register',(request,response)=>{
    const{customer_name,email,contact,password}=request.body
    const encryptedPassword=''+cryptoJs.MD5(password)
    const connection=db.connect()

    const statement1=`select * from Customers where email ='${email}'`
    connection.query(statement1,(error,customer)=>{
        if(customer.length==0){

            //insert a new record
            const statement=`insert into  Customers(customer_name,email,contact,password) values ('${customer_name}','${email}','${contact}','${encryptedPassword}')`
            connection.query(statement,(error,data)=>{
                connection.end()
                response.send(utils.createResult(error,data))
            })

        }else{
            //user with email already exists
            connection.end()
            response.send(utils.createResult('Email Already Exist..!!'))

        }
    })
})



module.exports=router
