import { ADD_PROPRIETOR, REMOVE_PROPRIETOR, EDIT_PROPRIETOR }from '../../contants';

export const addProprietor = (requestId, data) => {
    return {
        type: ADD_PROPRIETOR,
        requestId
    };
};

export const removeProprietor = (requestId, index) => {
    return {
        type: REMOVE_PROPRIETOR,
        payload: index,
        requestId
    }
}

export const editProprietor = (requestId, index, data) => {
    const {name, value} = data
    return {
        type: EDIT_PROPRIETOR,
        payload: { index, name, value },
        requestId
    }
}