import express from "express"
import logger from "morgan"
import cors from "cors"
import mysql from "mysql"

const app = express()

app.use(logger("dev"))
app.use(cors())

app.use(express.json())

import { createConnection } from "typeorm"
import { Notification } from "./entity/notification"
import Connection from "mysql/lib/Connection"

// app.get("/notification", async (req, res) => {
createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "puyopuyo",
  database: "web_push",
  entities: [__dirname + "/entity/*.*s"],
  synchronize: true
})
  .then(async (connection) => {
    // console.log(connection)

    const NotificationRepository = connection.getRepository(Notification)

    const results = await NotificationRepository.find()

    console.log(results)

    return results
  })
  .catch((err) => console.log(err))
// })

// .then((connection) => {
//   // here you can start to work with your entities
//   // console.log(connection)

//   let notification = new Notification()
//   notification.notification_user_id = 3
//   notification.notification_new_follower = 1
//   notification.notification_title = "new follower"
//   notification.notification_content = "Hi,Igor is following you"
//   notification.notification_type = "new_follower"
//   notification.created_at = ""
//   notification.deleted_at = ""

//   return connection.manager.save(notification).then((notification) => {
//     console.log(`Photo has been saved. notification_id: ${notification.notification_id}`)
//   })
// })
// .catch((error) => console.log(error))

// app.delete("/notification/:notification_id", (req, res) => {
//   const delete_sql = `delete from web_push.notification where notification_id = ${req.params.notification_id};`

//   return con.query(delete_sql, (err, result) => {
//     if (err) throw err
//     console.log(JSON.stringify(result))
//     return result
//   })
// })

// app.post("/notification", (req, res) => {
//   const notificationRequest = `insert into web_push.notification values();`

//   console.log(notificationRequest)

//   return con.query(notificationRequest, (err, result) => {
//     if (err) throw err
//     console.log(JSON.stringify(result))
//     return result
//   })
// })

// app.get("/notification/:notification_id", (req, res) => {
//   const notificationRequest = `select * from web_push.notification where notification_id = ${req.params.notification_id};`

//   console.log(notificationRequest)

//   return con.query(notificationRequest, (err, result) => {
//     if (err) throw err
//     console.log(JSON.stringify(result))
//     return result
//   })
// })

module.exports.app = app
