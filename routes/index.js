import express from "express"
import fs, { read } from "fs"

const router = express.Router()


router.get("/", (req, res) => {
    res.render("index.njk", {
        title: "Home",
        message: "welcome to express server with nunjucks"
    })
})

router.get("/about", (req, res) => {
    res.render("about.njk", {
        title: "About",
        message: "this is a schoolwork for teacher"
    })
})

router.get("/greeting", (req, res) => {
    console.log(req.query)
    const name = req.query.name || ""
    res.render("greeting.njk", { name})
})

const {movies} = JSON.parse(fs.readFileSync("./data/movies.json"))

router.get("/movies", (req, res) => {
    const query = req.query.q
    let filteredMovies = movies
    if (query) {
        filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))
    }
    res.render("movies.njk", {
        title: "All Movies",
        movies: filteredMovies
    })
})

router.get("/movies/:id", (req, res) => {
    console.log(req.params)
    const movie = movies.find(m => m.id === +req.params.id)
    if (movie) {
        res.render("movie.njk", {
            title: movie.title,
            movie
        })
    } else {
        res.status(404).json({error: "Movie not found"})
    }
})


export default router