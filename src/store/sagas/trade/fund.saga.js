import {put, call, takeLatest, delay} from 'redux-saga/effects';
import {POST_FUND_ACCOUNT, POST_FUND_ACCOUNT_START, POST_FUND_ACCOUNT_SUCCESS, POST_FUND_ACCOUNT_FAILURE} from '../../contants';
import { postFundAccount } from '../../../services/trade.service';
import * as RootNavigation from '../../../navigation/RootNavigation';
import { Alert } from 'react-native';


export function* fundAccountWorker(action) {
    yield put({
        type: POST_FUND_ACCOUNT_START,
    });

    const requestBody = action.payload;

    try {

        const response = yield call(postFundAccount, requestBody);
        
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
            type: POST_FUND_ACCOUNT_SUCCESS,
            payload: 'paul@gmail.com',
        });

    } catch (error) {
        yield put({
            type: POST_FUND_ACCOUNT_FAILURE,
        });

        Alert.alert(error.message)
    }

}

export function* fundAccountWatcher() {
  yield takeLatest(POST_FUND_ACCOUNT, fundAccountWorker);
}
