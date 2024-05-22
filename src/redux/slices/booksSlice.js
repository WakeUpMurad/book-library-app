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
    return thunkAPI.rejectWithValue(error)
  }
})

const initialState = {
  books: [],
  isLoadingViaAPI: false,
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload)
    },
    deleteBook: (state, action) => {
      return { ...state, books: state.books.filter((book) => book.id !== action.payload) }
    },
    toogleFavorite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoadingViaAPI = true
    })
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithID(action.payload, 'API'))
      }
    })
    builder.addCase(fetchBooks.rejected, (state) => {
      state.isLoadingViaAPI = false
    })
  },
})

export const { addBook, deleteBook, toogleFavorite } = booksSlice.actions

export const selectBooks = (state) => state.books.books
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI

export default booksSlice.reducer
