import * as actionTypes from './actionTypes'

const initialState = []

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BOOK:
      return [...state, action.payload]
    case actionTypes.DELETE_BOOK:
      return state.filter((book) => book.id !== action.payload)
    case actionTypes.TOOGLE_FAVORITE:
      return state.map((book) => {
        return book.id === action.payload ? { ...book, isFavorite: !book.isFavorite } : book
      })
    default:
      return state
  }
}

export default booksReducer
