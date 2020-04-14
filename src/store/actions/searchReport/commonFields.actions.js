import { EDIT_PLACE_OF_SEARCH, 
    EDIT_DATE_OF_SEARCH, 
    EDIT_TYPE_OF_SEARCH,
    EDIT_NAME_OF_COMPANY,
    EDIT_REGISTERED_ADDRESS,
    EDIT_DATE_OF_REGISTRATION,
    EDIT_ANNUAL_RETURNS,
    EDIT_REGISTRATION_NUMBER }from '../../contants';
    
const commonFieldsMapping = {
    'placeOfSearch': EDIT_PLACE_OF_SEARCH,
    'dateOfSearch': EDIT_DATE_OF_SEARCH,
    'typeOfSearch': EDIT_TYPE_OF_SEARCH,
    'companyName': EDIT_NAME_OF_COMPANY,
    'registeredAddress': EDIT_REGISTERED_ADDRESS,
    'dateOfRegistration': EDIT_DATE_OF_REGISTRATION,
    'annualReturns': EDIT_ANNUAL_RETURNS,
    'registrationNumber': EDIT_REGISTRATION_NUMBER,
}

export const editCommonField = (requestId, data) => {
    return {
        type: commonFieldsMapping[data.name],
        payload: data.value,
        requestId
    }
}