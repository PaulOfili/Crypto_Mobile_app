import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';
import Container from '../layouts/Container';

const {width} = Dimensions.get('screen');

function PaymentScreen(props) {

const html = `
<div style="margin-top: 40%; text-align: center; font-size: 70px";/> 
    <p>You are about to fund your account with NGN 3000. Proceed?</p>
    <div style="margin-top: 100px">
        <a data-isw-payment-button data-isw-ref='OGrvCdxabj'> 
            <script type='text/javascript' src='https://api.interswitchng.com/paymentgateway/public/js/webpay.js' 
                data-isw-trans-amount='10000' 
                data-isw-customer-ref='1589803927395' 
                data-isw-customer-callback='customCallback'> 
            </script> 
        </a> 
    </div>
</div>
<script> 
    function customCallback(response){ console.log(response); } 
</script> 
`;

  return (
      <Container>
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <WebView
                source={{ html }}
                onMessage={event => {
                    alert(event.nativeEvent.data);
                }}
                startInLoadingState={true}
                renderLoading={() => (
                    <ActivityIndicator
                        color='black'
                        size='large'
                        style={{flex: 1}}

                    />
                )}
            />
        </View>
      </Container>
    
  );
}
const styles = StyleSheet.create({
});

export default PaymentScreen;