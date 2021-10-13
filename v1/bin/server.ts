import * as app from "../app"

import * as http from "http"

const server = http.createServer(app)

const port = 8888

server.listen(port, () => console.log(`listen on ${port}`))
