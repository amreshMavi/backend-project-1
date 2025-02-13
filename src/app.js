import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express()

// CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers to restrict requests from different origins (domains, protocols, or ports) to a web server. By default, browsers block such cross-origin requests to prevent security risks (like Cross-Site Request Forgery - CSRF).

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