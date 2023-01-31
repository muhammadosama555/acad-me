const express= require("express")
const dotenv=require("dotenv")


//Load env variables
dotenv.config({path: './config/config.env'})

const app = express()

const PORT= process.env.PORT

app.listen(PORT,console.log(`serving running in ${process.env.NODE_ENV}mode on 
port${PORT}`))