const express=require("express");
const dotenv=require("dotenv");
const { chats } =require("./data/data");
const connectDB = require("./config/db");
const colors=require('colors');
const userRoutes=require('./routes/userRoutes')
const chatRoutes=require('./routes/chatRoutes')
const messageRoutes=require('./routes/messageRoutes')
const {notFound,errorHandler}=require("./middleware/errorMiddleware");
//Whenever we make changes to this file we have to save it and then restart the server afain so that it gets updated. It becomes tiresome.
// So we will use "nodemon" for that, it automatically restarts the server


dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept json data

// Ye api is ruuning ko uncomment krna hai wapis
app.get('/',(req,res) => {
    res.send("API is running Successfully");
});

// //Creating another end-point(API) with express js

app.get('/api/chat',(req,res)=>{
    res.send(chats);
})

// //Creating another end-[point] for our users
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/mesaage',messageRoutes);





// Deployment
//--- Yahan se


// Yahan tk baad me hatana hai








// // Error handling middlewares for API
app.use(notFound)
app.use(errorHandler)
const PORT= process.env.PORT || 5000;
// yahan pe PORT ko 5000 se replace krna hai baad me
app.listen(5000,console.log(`Server started on port ${PORT}`.yellow.bold));