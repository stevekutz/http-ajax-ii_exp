const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const lowdb = require("lowdb")
const FileAsync = require("lowdb/adapters/FileAsync")

const port = process.env.PORT || 3333
const adapter = new FileAsync("db.json")

const server = express()
server.use(bodyParser.json())
server.use(cors())

// Data from https://www.uncommongoods.com/fun/by-interest/geek-gifts

lowdb(adapter)
  .then(db => {
    server.use((req, res, next) => {
      db.read().then(() => next())
    })

    server.get("/", (req, res) => {
      res.json({ message: "Welcome to the Trinkets API!" })
    })
    
    server.get("/items", (req, res) => {
      res.json(db.get("items").value())
    })
    
    server.get("/items/:id", (req, res) => {
      const id = parseInt(req.params.id)
      const item = db.get("items").find({ id }).value()

      if (item) {
        res.json(item)
      } else {
        res.status(404).json({
          error: "No Item found by that ID"
        })
      }
    })
    
    server.post("/items", (req, res) => {
      const { name, price, imageUrl, description, shipping } = req.body
      
      if (!name || !price || !description) {
        return res.status(400).json({
          error: "Ya gone did goofed! Name/Price/Description are all required to create an item in the item DB."
        })
      }

      const id = db.get("count").value() + 1
    
      db.set("count", id).write()
      db.get("items").push({ id, name, price, imageUrl, description, shipping }).write()

      res.json(db.get("items").value())
    })
    
    server.put("/items/:id", (req, res) => {
      const id = parseInt(req.params.id)
      const { name, price, imageUrl, description, shipping } = req.body
      
      const item = db.get("items").find({ id })
      if (!item.value()) {
        return res.status(404).json({
          error: "No Item found by that ID"
        })
      }

      db.get("items").find({ id }).assign({ name, price, imageUrl, description, shipping }).write()
      res.json(db.get("items").value())
    })
    
    server.delete("/items/:id", (req, res) => {
      const id = parseInt(req.params.id)
      const item = db.get("items").find({ id }).value()
    
      if (!item) {
        return res.status(404).json({
          error: "No item by that ID exists in the item DB"
        })
      }

      db.get("items").remove({ id }).write()
      res.json(db.get("items").value())
    })

    return db.defaults({ count: 0, items: [] }).write()
  })
  .then(() => {
    server.listen(port, err => {
      if (err) console.log(err)
      console.log(`server is listening on port ${port}`)
    })
  })


