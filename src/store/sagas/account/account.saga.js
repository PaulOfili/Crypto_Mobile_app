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
        yield delay(4000);

        // const response = yield call(postCreateAccount, requestBody);

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
            payload: 'test',
        });

    } catch (error) {
        yield put({
            type: POST_CREATE_ACCOUNT_FAILURE,
            payload: error.message,
        });

        Alert.alert(error.message)
    }

}

export function* createAccountWatcher() {
  yield takeLatest(POST_CREATE_ACCOUNT, createAccountWorker);
}
