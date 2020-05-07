import {put, call, takeLatest, delay} from 'redux-saga/effects';
import {POST_MAKE_WITHDRAW, POST_MAKE_WITHDRAW_START, POST_MAKE_WITHDRAW_SUCCESS, POST_MAKE_WITHDRAW_FAILURE} from '../../contants';
import { postMakeWithdraw } from '../../../services/trade.service';
import * as RootNavigation from '../../../navigation/RootNavigation';
import { Alert } from 'react-native';


export function* makeWithdrawWorker(action) {
    yield put({
        type: POST_MAKE_WITHDRAW_START,
    });

    const requestBody = action.payload;

    try {

        const response = yield call(postMakeWithdraw, requestBody);
        
        yield Alert.alert(
            'Success',
            'Congratulations, your transaction was successful!',
            [
                {
                    text: 'Ok',
                    onPress: () => RootNavigation.navigate('Balance')
                },
            ],
            { cancelable: false}
        );

        yield put({
            type: POST_MAKE_WITHDRAW_SUCCESS,
            payload: requestBody.email,
        });

    } catch (error) {
        yield put({
            type: POST_MAKE_WITHDRAW_FAILURE,
        });

        Alert.alert(error.message)
    }

}

export function* makeWithdrawWatcher() {
  yield takeLatest(POST_MAKE_WITHDRAW, makeWithdrawWorker);
}
