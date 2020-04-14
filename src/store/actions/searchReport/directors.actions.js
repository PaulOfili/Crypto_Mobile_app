import { ADD_DIRECTOR, REMOVE_DIRECTOR, EDIT_DIRECTOR }from '../../contants';

export const addDirector = (requestId, data) => {
    return {
        type: ADD_DIRECTOR,
        requestId
    };
};

export const removeDirector = (requestId, index) => {
    return {
        type: REMOVE_DIRECTOR,
        payload: index,
        requestId
    }
}

export const editDirector = (requestId, index, data) => {
    const {name, value} = data
    return {
        type: EDIT_DIRECTOR,
        payload: { index, name, value },
        requestId
    }
}