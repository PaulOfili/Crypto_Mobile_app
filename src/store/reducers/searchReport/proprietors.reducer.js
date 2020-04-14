import { ADD_PROPRIETOR, REMOVE_PROPRIETOR, EDIT_PROPRIETOR } from '../../contants';

const initialState = []
const newItem = {name: '', address: ''}

const proprietorReducer = (index, proprietor, payload) => {
    if (index !== payload.index) return proprietor;

    return (
        Object.assign({}, proprietor, {
            [payload.name]: payload.value
        })
    )
}

const proprietorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PROPRIETOR:
            return [...state, {...newItem}]
        case REMOVE_PROPRIETOR:          
            return state.filter((_, index) => index !== action.payload)
        case EDIT_PROPRIETOR:
            return state.map((proprietor, index) => proprietorReducer(index, proprietor, action.payload));
        default:
            return state;
    }
}

export default proprietorsReducer;