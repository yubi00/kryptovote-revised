export const returnErrors = (message, id = null) => ({
  type: 'GET_ERRORS',
  payload: {
    message,
    id
  }
})

export const clearErrors = () => ({
  type: 'CLEAR_ERRORS'
})
