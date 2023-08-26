import express, { NextFunction, Request, Response } from "express"
import dontenv from "dotenv"
dontenv.config()

const app = express()

app.post("/sendMail", async (req : Request, res : Response, next : NextFunction) =>{

})