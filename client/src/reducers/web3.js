const initialState = {
  web3: null,
  accounts: null,
  instance: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_WEB3':
      return {
        ...state,
        web3: action.web3,
        accounts: action.accounts,
        instance: action.instance
      }
    default:
      return state
  }
}
