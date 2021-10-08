const express = require("express")
const webpush = require("web-push")
const path = require("path")
const logger = require("morgan")
const cors = require("cors")
const app = express()
const mysql = require("mysql")

app.use(express.static(path.join(__dirname, "client")))
app.use(logger("dev"))
app.use(cors())

const publicVapidKey = "BI54aD1IHv1ZVK_3HafrXMeSQF-nBhrTnsZEJParg6s0PIgP888RrkYcqvL0kTEc5yi33XJI86p8Q9eZtPi1V3o"
const privateVapidKey = "JC0nm2gS3hUC637U8fHyxfmi5CL1UR70VTHx5sqvk9w"

webpush.setVapidDetails("mailTo:test@test.com", publicVapidKey, privateVapidKey)

app.use(express.json())

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "puyopuyo"
})

con.connect((err) => {
  if (err) throw err
  console.log("Connected!")
})

app.post("/notificationButton", (req, res) => {
  const subs = req.body

  res.status(201).json({})

  const notificationRequest = "select * from web_push.notification;"

  con.query(notificationRequest, (err, result) => {
    if (err) throw err
    console.log(JSON.stringify(result))
  })

  //optional
  const payload = JSON.stringify({ title: "Push Test", content: "Hi, this is a notification" })

  webpush.sendNotification(subs, payload).catch((err) => console.log(err))
})

app.get("/notification", (req, res) => {
  const all_notification_sql = `select * from web_push.notification;`

  return con.query(all_notification_sql, (err, result) => {
    if (err) throw err
    console.log(JSON.stringify(result))
    return result
  })
})

app.delete("/notification/:notification_id", (req, res) => {
  const delete_sql = `delete from web_push.notification where notification_id = ${req.params.notification_id};`

  return con.query(delete_sql, (err, result) => {
    if (err) throw err
    console.log(JSON.stringify(result))
    return result
  })
})

app.post("/notification", (req, res) => {
  const notificationRequest = `insert into web_push.notification values();`

  console.log(notificationRequest)

  return con.query(notificationRequest, (err, result) => {
    if (err) throw err
    console.log(JSON.stringify(result))
    return result
  })
})

app.get("/notification/:notification_id", (req, res) => {
  const notificationRequest = `select * from web_push.notification where notification_id = ${req.params.notification_id};`

  console.log(notificationRequest)

  return con.query(notificationRequest, (err, result) => {
    if (err) throw err
    console.log(JSON.stringify(result))
    return result
  })
})

const port = 8888
app.listen(port, () => console.log(`listen on ${port}`))
