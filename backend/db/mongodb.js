const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
console.log('Connected to MongoDB Atlas');       
})
.catch(()=>{
    console.log('Error connecting to MongoDB Atlas');
})