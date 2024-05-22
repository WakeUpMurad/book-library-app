const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const booksData = require('./db/books.json')

const app = express()
const PORT = process.env.PORT || 5003

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'my-blog/build')))

function getRandomBook() {
  const randomIndex = Math.floor(Math.random() * booksData.length)
  const randomBook = booksData[randomIndex]
  return randomBook
}

app.get('/random-book', (req, res) => {
  fs.readFile(path.join(__dirname, './db/books,json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err)
      res.status(500).send('Ошибка сервера')
      return
    }
    res.json(getRandomBook())
  })
})

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`)
})
