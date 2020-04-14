import { ADD_DIRECTOR, REMOVE_DIRECTOR, EDIT_DIRECTOR } from '../../contants';

const initialState = []
const newItem = {name: '', address: ''}

const directorReducer = (index, director, payload) => {
    if (index !== payload.index) return director;

    return (
        Object.assign({}, director, {
            [payload.name]: payload.value
        })
    )
}

const directorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DIRECTOR:
            return [...state, {...newItem}]
        case REMOVE_DIRECTOR:          
            return state.filter((_, index) => index !== action.payload)
        case EDIT_DIRECTOR:
            return state.map((director, index) => directorReducer(index, director, action.payload));
        default:
            return state;
    }
}

export default directorsReducer;