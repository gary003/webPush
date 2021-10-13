import express from "express"
import logger from "morgan"
import cors from "cors"
import mysql from "mysql"

const app = express()

app.use(logger("dev"))
app.use(cors())

app.use(express.json())

import { createConnection } from "typeorm"

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
  .then((connection) => {
    // here you can start to work with your entities
    console.log(connection)
  })
  .catch((error) => console.log(error))

// app.get("/notification", (req, res) => {
//   const all_notification_sql = `select * from web_push.notification;`

//   return con.query(all_notification_sql, (err, result) => {
//     if (err) throw err
//     console.log(JSON.stringify(result))
//     return result
//   })
// })

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
