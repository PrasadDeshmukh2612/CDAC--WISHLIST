const db=require('./db')
const express=require('express')
const utils = require('./utils')
const cryptoJs=require('crypto-js')


const router=express.Router()

router.get('/',(request,response)=>{
    const connection=db.connect()
    const statement=`select * from Customers`
    connection.query(statement,(error,data)=>{
        connection.end()
        const customers=  []
        for(let index=0;index<data.length; index++){
            const Customers=data[index]
            customers.push({
                customer_id:Customers['customer_id'],
                customer_name:Customers['customer_name'],
                email:Customers['email'],
                area:Customers['area'],
                street:Customers['street'],
                contact:Customers['contact'],
                city:Customers['city'],
                pin:Customers['pin'],
                state:Customers['state'],
                country:Customers['country'],
               // password:Customers['password'] 
            })
        }
        response.send(utils.createResult(error,customers))
    })
})


router.get('/:customer_id',(request,response)=>{
    const {customer_id} = request.params
    const connection=db.connect()
    const statement=`select * from Customers  where customer_id = ${customer_id}`
    connection.query(statement,(error,data)=>{
        connection.end()
        const customers=  []
        for(let index=0;index<data.length; index++){
            const Customers=data[index]
            customers.push({
                customer_id:Customers['customer_id'],
                customer_name:Customers['customer_name'],
                email:Customers['email'],
                area:Customers['area'],
                street:Customers['street'],
                contact:Customers['contact'],
                city:Customers['city'],
                pin:Customers['pin'],
                state:Customers['state'],
                country:Customers['country'],
               // password:Customers['password'] 
            })
        }
        response.send(utils.createResult(error,customers))
    })
})

router.post('/',(request,response)=>{
    const{customer_name,contact,area,street,city,pin,state,country}=request.body
    const connection=db.connect()
    const statement=`insert into Customers(customer_name,contact,area,street,city,pin,state,country) 
    values('${customer_name}','${contact}','${area}','${street}','${city}','${pin}','${state}','${country}')`
    connection.query(statement,(error,data)=>{
        response.send(utils.createResult(error,data))
    })
})

router.post('/login',(request,response)=>{
    const{email,password}=request.body
    const encryptedPassword=''+cryptoJs.MD5(password)
    const connection=db.connect()
    const statement=`select * from Customers where email='${email}' and password='${encryptedPassword}'`
    connection.query(statement,(error,customers)=>{
        connection.end()
      //  const customers=[]
        if(customers.length==0){
            response.send(utils.createResult('Invalid Email or Password'))
        }
        else{
            const Customers=customers[0]
            const info={
                username:Customers['username'],
                email:Customers['email']
            }
            response.send(utils.createResult(null,info))//??
        }
    })
})

router.delete('/:customer_id', (request, response) => {
    const {customer_id} = request.params
    const connection = db.connect()
   // connection.connect()
    const statement = `delete from Customers where customer_id = ${customer_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/update/:customer_id',(request,response)=>{
    const{customer_id}=request.params

    const{customer_name,email,area,street,contact,city,pin,state,country}=request.body

    const connection=db.connect()

    const statement=`update Customers set customer_name='${customer_name}',email='${email}',area='${area}',street='${street}',contact='${contact}',city='${city}',pin='${pin}',state='${state}',country='${country}' where customer_id=${customer_id}`

    connection.query(statement,(error,data)=>{
        connection.end()

        response.send(utils.createResult(error,data))
    })
})

module.exports=router
