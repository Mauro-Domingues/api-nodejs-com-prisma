import express from "express"
import { router } from "./routes"

const app = express()

app.listen(3000, () => {console.log("Rodando em http://localhost:3000")})
app.get('/', (req, res) => {res.status(200).send("Conexão ok")})
app.use(express.json())
app.use(router)