const express = require("express")
const webpush = require("web-push")
const path = require("path")
const logger = require("morgan")
const cors = require("cors")
const app = express()

app.use(express.static(path.join(__dirname, "client")))
app.use(logger("dev"))
app.use(cors())

const publicVapidKey = "BI54aD1IHv1ZVK_3HafrXMeSQF-nBhrTnsZEJParg6s0PIgP888RrkYcqvL0kTEc5yi33XJI86p8Q9eZtPi1V3o"
const privateVapidKey = "JC0nm2gS3hUC637U8fHyxfmi5CL1UR70VTHx5sqvk9w"

webpush.setVapidDetails("mailTo:test@test.com", publicVapidKey, privateVapidKey)

app.use(express.json())

// const { MongoClient } = require("mongodb")
// const uri = "mongodb+srv://garyFcc:<password>@fccex.1zhjz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
// client.connect((err) => {
//   const collection = client.db("test").collection("devices")
//   // perform actions on the collection object
//   client.close()
// })

app.post("*/notifications", (req, res) => {
  const subs = req.body

  res.status(201).json({})

  //optional
  const payload = JSON.stringify({ title: "Push Test", content: "Hi, this is a notification" })

  webpush.sendNotification(subs, payload).catch((err) => console.log(err))
})

const port = 8888
app.listen(port, () => console.log(`listen on ${port}`))
