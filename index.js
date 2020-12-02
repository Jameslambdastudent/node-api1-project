const express = require("express")
const db = require('./database')

const server = express()
const port = 4000

server.use(express.json())


server.get('/', (req, res) => {
    res.json({
        message: "Lambda Server Running"
    })
})

server.get('/candy', (req, res) => {
    const candy = db.getCandy()
    res.json(candy)
})

server.post('/candy', (req, res) => {
    if(!req.body.name) {
        return res.status(400).json({message: `Add Your Favorite Candy`})
    }
    const newCandy = db.createCandy({name: req.body.name})
    res.json(newCandy)
})

server.get('/candy/:id', (req, res) => {
    const id = req.params.id
    const candys = db.getCandyById(id)

    if(candys) {
        res.json(candys)
    } else {
        res.status(400).json({message: `Cannot Find That Candy In Our Database`})
    }
})

server.put('/candy/:id', (req, res) => {
    const candys = db.getCandyById(req.params.id)
    if(candys) {
        const updateCandys = db.updateCandy(candys.id, {
            name: req.body.name || candys.name
        })
        res.json(updateCandys)
    } else {
        res.status(404).json({message: `That Candy Is Lost In Our Database`})
    }
})

server.delete('/candy/:id', (req, res) => {
    const candys = db.getCandyById(req.params.id)
    if (candys) {
        db.deleteCandy(candys.id)
        res.status(204).end()
    } else {
        res.status(404).json({message: `Candy Was Eaten By The Candy Monster`})
    }
})

server.listen(port, () => console.log(`Server Running Strong,`))