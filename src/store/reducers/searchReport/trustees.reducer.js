import { ADD_TRUSTEE, REMOVE_TRUSTEE, EDIT_TRUSTEE } from '../../contants';

const initialState = []
const newItem = {name: '', address: ''}

const trusteeReducer = (index, trustee, payload) => {
    if (index !== payload.index) return trustee;

    return (
        Object.assign({}, trustee, {
            [payload.name]: payload.value
        })
    )
}

const trusteesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TRUSTEE:
            return [...state, {...newItem}]
        case REMOVE_TRUSTEE:          
            return state.filter((_, index) => index !== action.payload)
        case EDIT_TRUSTEE:
            return state.map((trustee, index) => trusteeReducer(index, trustee, action.payload));
        default:
            return state;
    }
}

export default trusteesReducer;