import dontenv from "dotenv"
dontenv.config()

import fs from "fs"
import { join } from "path"
import express, { NextFunction, Request, Response } from "express"
import sendMail from "./email"


const app = express()

app.use(express.json())

const currentWorkingDirectory = process.cwd()

const gettingMessageHTML = fs.readFileSync(join(currentWorkingDirectory, "./template/gettingMessage.html"), "utf-8")
const recievedMessageHTML = fs.readFileSync(join(currentWorkingDirectory, "./template/recievedMessage.html"), "utf-8")


app.post("/sendMail", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, subject, name, message } = req.body;
        if(!email || !subject || !name || !message) throw new Error("Please provide all email, subject, name, message")

        let afterchangeGettingMessage = gettingMessageHTML.replace(/\{%NAME%}/g, name);
        afterchangeGettingMessage = afterchangeGettingMessage.replace(/\{%EMAIL%}/g, email);
        afterchangeGettingMessage = afterchangeGettingMessage.replace(/\{%SUBJECT%}/g, subject);
        afterchangeGettingMessage = afterchangeGettingMessage.replace(/\{%MESSAGE%}/g, message);


        //    This is sending me my mail 
        await Promise.all([sendMail(process.env.GEMAIL_MY!, subject, afterchangeGettingMessage), sendMail(email, "Message Received", recievedMessageHTML)])
        
        res.status(200).json({
            status: "success",
            "message": "Message sended Successfully"
        })
    } catch (error) {
        res.status(403).json({
            status: "fail",
            "message": error || "someting is wrong sending Mail"
        })
    }
})
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: "fail",
        "message": "This route is not defined"
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on " + process.env.PORT || 3000)
})