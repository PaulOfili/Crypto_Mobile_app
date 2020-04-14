import { ADD_TRUSTEE, REMOVE_TRUSTEE, EDIT_TRUSTEE }from '../../contants';

export const addTrustee = (requestId, data) => {
    return {
        type: ADD_TRUSTEE,
        requestId
    };
};

export const removeTrustee = (requestId, index) => {
    return {
        type: REMOVE_TRUSTEE,
        payload: index,
        requestId
    }
}

export const editTrustee = (requestId, index, data) => {
    const {name, value} = data
    return {
        type: EDIT_TRUSTEE,
        payload: { index, name, value },
        requestId
    }
}