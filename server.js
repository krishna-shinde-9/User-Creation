let express = require('express')
let db = require('./userModel')
let app = express()
let path =  require('path')
const { id } = require('zod/v4/locales')
const { name } = require('ejs')
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded())
app.use(express.json())


  
  
 



app.get('/',(req,res)=>{

res.render('index')


})
app.get('/account',(req,res)=>{

res.render('account')


})
app.post('/createUser',async(req,res)=>{
const {userId ,fullName ,userPassword,imageUrl } = req.body
  const data = await db.create({
  id:userId,
name:fullName,
password:userPassword,
imageUrl:imageUrl
})
console.log(data)
res.redirect('/account')


})

app.get('/user', async (req,res)=>{
  const userAll = await db.find()
  console.log(userAll)
res.render('user',{userAll:userAll})

})

app.get('/delete/:id',async(req,res)=>{
 const userAll = await db.find()
 await db.findOneAndDelete({id:req.params.id})
  res.render('user',{userAll:userAll})

})

app.get('/edit/:id',async (req,res)=>{
   
  const user =  await db.findOne({id:req.params.id})
   
  
  res.render('edit',{id:user.id,name:user.name,password : user.password,imageUrl:user.imageUrl}) 

})

app.post('/updateUser/:id',async(req,res)=>{

const {name,password,imageUrl} = req.body
await db.findOneAndUpdate({id:req.params.id},{

name:name ,
password:password,
imageUrl:imageUrl



})
res.redirect('show')

})

app.get('/updateUser/show',(req,res)=>{

res.render('show')

})

app.listen(3000,()=>{

console.log('running....')

})