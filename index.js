const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql")

const app = express()

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.get("/", (req, res) => {
    const sql = "SELECT * FROM books"

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        const books = data

        console.log(books)

        res.render("home", { books })
    })
})

app.get("/book/:id", (req, res) => {
    const id = req.params.id

    const sql = "SELECT * FROM books WHERE id = ${id}"

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        const book = data[0]

        console.log(book)

        res.render("book", { book })
    })
})

app.get("/edit/:id", (req, res) => {
    const id = req.params.id

    const sql = "SELECT * FROM books WHERE id = ${id}"

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        const book = data[0]

        console.log(book)

        res.render("edit", { book })
    })
})

app.post("/edit/save", (req, res) => {
    const { id, nome, pageqty } = req.body

    const sql = "UPDATE books SET nome = '${nome}', pageqty = ${pageqty} WHERE id = ${id}"

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        res.redirect("/")
    })
})
//mysql coonnection
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3307
})

conn.connect((error) => {
    if (error) {
        console.log(error)
        return
    }

    console.log("conectando ao banco na porta 3307")
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000")
    })
})
