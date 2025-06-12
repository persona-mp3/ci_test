import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import { urlencoded } from "body-parser"
import { HandleWebHook } from "./webhook.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 8900
const endpoint = process.env.EP 

app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded( { extended: true }))

// this is the specified url github actions will send post requests to
// we'll reply with "Webhook receiveed and 200"
app.post(endpoint, async (req, res) => {
    console.log("new event just dropped\n")
    
    // const payload = req.body
    // const evt = req.headers[ "x-github-event" ]
    // const repo = payload.html_url
    // const currentCommit =  payload.repository.after
    

    // res.status(200).send("Webhook received")
    await HandleWebHook(req, res)
})


app.listen(port, (err) => {
    if (err) {
        console.log("error occured in starting server\n")
        return
    }
    
    port === 8900 ? console.log("fallback port, 8900") : console.log(`active @ ${port}`)
})
