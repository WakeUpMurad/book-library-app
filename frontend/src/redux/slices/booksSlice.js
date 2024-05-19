import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import createBookWithID from '../../utils/createBookWithID'
import { setError } from './errorSlice'

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (url, thunkAPI) => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    thunkAPI.dispatch(setError(error.message))
    throw error
  }
})

const initialState = []

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload)
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload)
    },
    toogleFavorite: (state, action) => {
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        state.push(createBookWithID(action.payload, 'API'))
      }
    })
  },
})

export const { addBook, deleteBook, toogleFavorite } = booksSlice.actions

export const selectBooks = (state) => state.books

export default booksSlice.reducer
