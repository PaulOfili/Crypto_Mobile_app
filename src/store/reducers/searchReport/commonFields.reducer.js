import { EDIT_DATE_OF_SEARCH, 
        EDIT_PLACE_OF_SEARCH, 
        EDIT_TYPE_OF_SEARCH,
        EDIT_NAME_OF_COMPANY,
        EDIT_REGISTERED_ADDRESS,
        EDIT_DATE_OF_REGISTRATION,
        EDIT_ANNUAL_RETURNS,
        EDIT_REGISTRATION_NUMBER } from '../../contants';

const initialDateOfSearchState = '';
export const dateOfSearchReducer = (state = initialDateOfSearchState, action) => {
    switch (action.type) {
        case EDIT_DATE_OF_SEARCH:
            return (
                action.payload
            )
        default:
            return state;
    }
}

const initialPlaceOfSearchState = '';
export const placeOfSearchReducer = (state = initialPlaceOfSearchState, action) => {
    switch (action.type) {
        case EDIT_PLACE_OF_SEARCH:
            return (
                action.payload
            )
        default:
            return state;
    }
}

const initialTypeOfSearchState = '';
export const typeOfSearchReducer = (state = initialTypeOfSearchState, action) => {
    switch (action.type) {
        case EDIT_TYPE_OF_SEARCH:
            return (
                action.payload
            )
        default:
            return state;
    }
}

const initialCompanyNameState = '';
export const companyNameReducer = (state = initialCompanyNameState, action) => {
    switch (action.type) {
        case EDIT_NAME_OF_COMPANY:
            return (
                action.payload
            )
        default:
            return state;
    }
}

const initialRegisteredAddressState = '';
export const registeredAddressReducer = (state = initialRegisteredAddressState, action) => {
    switch (action.type) {
        case EDIT_REGISTERED_ADDRESS:
            return (
                action.payload
            )
        default:
            return state;
    }
}

const initialDateOfRegistrationState = '';
export const dateOfRegistrationReducer = (state = initialDateOfRegistrationState, action) => {
    switch (action.type) {
        case EDIT_DATE_OF_REGISTRATION:
            return (
                action.payload
            )
        default:
            return state;
    }
}

const initialAnnualReturnsState = 0;
export const annualReturnsReducer = (state = initialAnnualReturnsState, action) => {
    switch (action.type) {
        case EDIT_ANNUAL_RETURNS:
            return (
                action.payload
            )
        default:
            return state;
    }
}

const initialRegistrationNumberState = 0;
export const registrationNumberReducer = (state = initialRegistrationNumberState, action) => {
    switch (action.type) {
        case EDIT_REGISTRATION_NUMBER:
            return (
                action.payload
            )
        default:
            return state;
    }
}

// Object.assign({}, state, {
//     value: action.payload
// })