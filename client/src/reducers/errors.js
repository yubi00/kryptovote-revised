const errorDefaultState = {
  message: '',
  id: null
}

export default (state = errorDefaultState, action) => {
  switch (action.type) {
    case 'GET_ERRORS':
      return { ...state, ...action.payload }
    case 'CLEAR_ERRORS':
      return {}
    default:
      return state
  }
}
