const initialState = {
  user: null,
  isAuthenticated: null,
  admin: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
      return { ...state, user: action.user }
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        admin: action.admin
      }
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
    case 'LOG_OUT':
      return { user: null, isAuthenticated: null, admin: false }
    default:
      return state
  }
}
