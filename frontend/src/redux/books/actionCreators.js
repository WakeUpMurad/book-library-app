import * as actionTypes from './actionTypes'

export const addBook = (newBook) => {
  return {
    type: actionTypes.ADD_BOOK,
    payload: newBook,
  }
}

export const deleteBook = (id) => {
  return {
    type: actionTypes.DELETE_BOOK,
    payload: id,
  }
}

export const toogleFavoriteBook = (id) => {
  return {
    type: actionTypes.TOOGLE_FAVORITE,
    payload: id,
  }
}
