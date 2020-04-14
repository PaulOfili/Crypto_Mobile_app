import produce from 'immer';
import { 
    EDIT_DATE_OF_SEARCH, 
    EDIT_PLACE_OF_SEARCH, 
    EDIT_TYPE_OF_SEARCH,
    EDIT_NAME_OF_COMPANY,
    EDIT_REGISTERED_ADDRESS,
    EDIT_DATE_OF_REGISTRATION,
    EDIT_ANNUAL_RETURNS,
    EDIT_REGISTRATION_NUMBER,
    ADD_DIRECTOR,
    REMOVE_DIRECTOR,
    EDIT_DIRECTOR, 
    ADD_TRUSTEE,
    REMOVE_TRUSTEE,
    EDIT_TRUSTEE,
    ADD_PROPRIETOR,
    REMOVE_PROPRIETOR,
    EDIT_PROPRIETOR} from '../../contants';
import { 
    placeOfSearchReducer,
    dateOfSearchReducer,
    typeOfSearchReducer,
    companyNameReducer,
    registeredAddressReducer,
    dateOfRegistrationReducer,
    annualReturnsReducer,
    registrationNumberReducer }from './commonFields.reducer';

import directorsReducer from './directors.reducer';
import trusteesReducer from './trustees.reducer';
import proprietorsReducer from './proprietors.reducer';

const initialState = {
    1: {
        dateOfSearch: '',
        placeOfSearch: '',
        typeOfSearch: 'Low',
        companyName: '',
        registeredAddress: '',
        dateOfRegistration: '',
        annualReturns: 0,
        registrationNumber: 0,
        directors: [],
        trustees: [],
        proprietors: [],
    },
    2: {
        dateOfSearch: '',
        placeOfSearch: '',
        typeOfSearch: 'Low',
        companyName: '',
        registeredAddress: '',
        dateOfRegistration: '',
        annualReturns: 0,
        registrationNumber: 0,
        directors: [],
        trustees: [],
        proprietors: [],
    }
}

export const searchReportReducer = (state = initialState, action) => {
    switch(action.type){
        case EDIT_DATE_OF_SEARCH:
            return produce(state, draft => {
                draft[action.requestId].dateOfSearch = dateOfSearchReducer(draft[action.requestId].dateOfSearch, action)
            })
        case EDIT_PLACE_OF_SEARCH:
            return produce(state, draft => {
                draft[action.requestId].placeOfSearch = placeOfSearchReducer(draft[action.requestId].placeOfSearch, action)
            })
        case EDIT_TYPE_OF_SEARCH:
            return produce(state, draft => {
                draft[action.requestId].typeOfSearch = typeOfSearchReducer(draft[action.requestId].typeOfSearch, action)
            })
        case EDIT_NAME_OF_COMPANY:
            return produce(state, draft => {
                draft[action.requestId].companyName = companyNameReducer(draft[action.requestId].companyName, action)
            })
        case EDIT_REGISTERED_ADDRESS:
            return produce(state, draft => {
                draft[action.requestId].registeredAddress = registeredAddressReducer(draft[action.requestId].registeredAddress, action)
            })
        case EDIT_DATE_OF_REGISTRATION:
            return produce(state, draft => {
                draft[action.requestId].dateOfRegistration = dateOfRegistrationReducer(draft[action.requestId].dateOfRegistration, action)
            })
        case EDIT_ANNUAL_RETURNS:
            return produce(state, draft => {
                draft[action.requestId].annualReturns = annualReturnsReducer(draft[action.requestId].annualReturns, action)
            })
        case EDIT_REGISTRATION_NUMBER:
            return produce(state, draft => {
                draft[action.requestId].registrationNumber = registrationNumberReducer(draft[action.requestId].registrationNumber, action)
            })
        case ADD_DIRECTOR:
            return produce(state, draft => {
                draft[action.requestId].directors = directorsReducer(draft[action.requestId].directors, action)
            })
        case REMOVE_DIRECTOR:
            return produce(state, draft => {
                draft[action.requestId].directors = directorsReducer(draft[action.requestId].directors, action)
            })  
        case EDIT_DIRECTOR:
            return produce(state, draft => {
                draft[action.requestId].directors = directorsReducer(draft[action.requestId].directors, action)
            })
        case ADD_TRUSTEE:
            return produce(state, draft => {
                draft[action.requestId].trustees = trusteesReducer(draft[action.requestId].trustees, action)
            })
        case REMOVE_TRUSTEE:
            return produce(state, draft => {
                draft[action.requestId].trustees = trusteesReducer(draft[action.requestId].trustees, action)
            })  
        case EDIT_TRUSTEE:
            return produce(state, draft => {
                draft[action.requestId].trustees = trusteesReducer(draft[action.requestId].trustees, action)
            })  
        case ADD_PROPRIETOR:
            return produce(state, draft => {
                draft[action.requestId].proprietors = proprietorsReducer(draft[action.requestId].proprietors, action)
            })
        case REMOVE_PROPRIETOR:
            return produce(state, draft => {
                draft[action.requestId].proprietors = proprietorsReducer(draft[action.requestId].proprietors, action)
            })  
        case EDIT_PROPRIETOR:
            return produce(state, draft => {
                draft[action.requestId].proprietors = proprietorsReducer(draft[action.requestId].proprietors, action)
            })   
        default:
            return state;
    }
}

export default searchReportReducer;