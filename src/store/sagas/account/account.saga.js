import {put, call, takeLatest, delay} from 'redux-saga/effects';
import {POST_CREATE_ACCOUNT, POST_CREATE_ACCOUNT_START, POST_CREATE_ACCOUNT_SUCCESS, POST_CREATE_ACCOUNT_FAILURE} from '../../contants';
import { postCreateAccount } from '../../../services/account.service';
import * as RootNavigation from '../../../navigation/RootNavigation';
import { Alert } from 'react-native';


export function* createAccountWorker(action) {
    yield put({
        type: POST_CREATE_ACCOUNT_START,
    });

    const requestBody = action.payload;

    try {

        yield call(postCreateAccount, requestBody);
        
        yield Alert.alert(
            'Success',
            'Congratulations, you created an account',
            [
                {
                    text: 'Ok',
                    onPress: () => RootNavigation.navigate('Balance')
                },
            ],
            { cancelable: false}
        );

        yield put({
            type: POST_CREATE_ACCOUNT_SUCCESS,
            payload: requestBody.email,
        });

    } catch (error) {
        yield put({
            type: POST_CREATE_ACCOUNT_FAILURE,
        });

        Alert.alert(error.message)
    }

}

export function* createAccountWatcher() {
  yield takeLatest(POST_CREATE_ACCOUNT, createAccountWorker);
}
