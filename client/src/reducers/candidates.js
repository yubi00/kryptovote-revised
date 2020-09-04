const initialState = []

export default (state=initialState, action) {
    switch (action.type) {
        case 'ADD_CANDIDATE':    
            return [...state, action.candidate]
        default:
            return state;
    }
}