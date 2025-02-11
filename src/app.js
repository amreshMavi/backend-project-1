import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"})) //configure to accept limit json data
app.use(express.urlencoded({extended: true, limit: "16kb"})) //you can give nested objects using extended
// many times url gets encoded (eg: amresh+mavi or amresh%20, %20 means space), so to make express accept this it needs to be configured 

app.use(express.static("public")) // public assets for people to access
app.use(cookieParser())


export { app }