const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

//Database
const DB = require('./DB/connect')

// Router functionality

const AuthRouter = require('./ControllerFunctionality/Auth')
const MovieRouter = require('./ControllerFunctionality/Movie')
const UserRouter =  require('./ControllerFunctionality/Users')
const ShowRouter = require('./ControllerFunctionality/ShowBooking')
const TheaterRouter = require('./ControllerFunctionality/Theaters')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

app.use('/api/v1/auth',AuthRouter)
app.use('/api/v1/movie',MovieRouter)
app.use('/api/v1/theater',TheaterRouter)
app.use('/api/v1/users',UserRouter)
app.use('/api/v1/show',ShowRouter)

app.get('/',(req,res)=>{
    res.send('<h2>My Movie Booking App</h2>')
})

app.use((err,req,res,next)=>{
    const errStatus = err.status || 500
    const errMessage = err.message || "something went wrong"
    return res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errMessage,
        stack:err.stack
    })
})
const start = async ()=>{
    const port = process.env.PORT 
try {
    DB(process.env.MONGO_URI)
    app.listen(port,()=>{
        console.log(`Server is listening on PORT : ${port}`)
    })
} catch (error) {
    console.log('Something went wrong');
}
}
start()