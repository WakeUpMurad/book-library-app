import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBook, fetchBooks } from '../../redux/slices/booksSlice'
import createBookWithID from '../../utils/createBookWithID'
import booksData from '../../data/books.json'
import './BookForm.css'
import { setError } from '../../redux/slices/errorSlice'

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title && author) {
      const book = createBookWithID({ title, author }, 'manual')
      dispatch(addBook(book))
      setAuthor('')
      setTitle('')
    } else {
      dispatch(setError('You must fill title and author!'))
    }
  }

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length)
    const randomBook = booksData[randomIndex]
    const randomBookWithId = createBookWithID(randomBook, 'random')
    dispatch(addBook(randomBookWithId))
  }

  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBooks())
  }

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button
          type="button"
          onClick={handleAddRandomBook}
        >
          Add Random
        </button>
        <button
          type="button"
          onClick={handleAddRandomBookViaAPI}
        >
          Add Random via API
        </button>
      </form>
    </div>
  )
}

export default BookForm
