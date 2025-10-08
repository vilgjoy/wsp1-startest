import express from "express"
import nunjucks from "nunjucks" 
import morgan from "morgan"

import indexRouter from "./routes/index.js"

const app = express()


nunjucks.configure("views", {
    autoescape: true,
    express: app
})

app.use(express.static("public"))
app.use(morgan("dev"))
app.use("/", indexRouter)

function notFound(req, res, next) {
    res.status(404)
    res.send("404 - Not Found")
}

app.use(notFound)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


