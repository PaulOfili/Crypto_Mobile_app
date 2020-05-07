import {put, call, takeLatest, delay} from 'redux-saga/effects';
import {POST_MAKE_TRANSFER, POST_MAKE_TRANSFER_START, POST_MAKE_TRANSFER_SUCCESS, POST_MAKE_TRANSFER_FAILURE} from '../../contants';
import { postMakeTransfer } from '../../../services/trade.service';
import * as RootNavigation from '../../../navigation/RootNavigation';
import { Alert } from 'react-native';


export function* makeTransferWorker(action) {
    yield put({
        type: POST_MAKE_TRANSFER_START,
    });

    const requestBody = action.payload;

    try {

        const response = yield call(postMakeTransfer, requestBody);
        
        yield Alert.alert(
            'Success',
            `Congratulations, your transaction was successful! A service fee of ${response.fee} was deducted from your account.`,
            [
                {
                    text: 'Ok',
                    onPress: () => RootNavigation.navigate('Balance')
                },
            ],
            { cancelable: false}
        );

        yield put({
            type: POST_MAKE_TRANSFER_SUCCESS,
            payload: requestBody.senderEmail,
        });

    } catch (error) {
        yield put({
            type: POST_MAKE_TRANSFER_FAILURE,
        });

        Alert.alert(error.message)
    }

}

export function* makeTransferWatcher() {
  yield takeLatest(POST_MAKE_TRANSFER, makeTransferWorker);
}
