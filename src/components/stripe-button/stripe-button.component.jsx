import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) =>{
    const priceForStripe = price*100;
    const pushlishableKey = 'pk_test_T2YUjWakK7gyySbIjBwjcQvI00iFvpmymE';


    const onToken = token =>{
        console.log(token);
        alert('Payment Succesful')
    }

    return(
        <StripeCheckout 
            label = 'Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            parellabel = 'Pay Now'
            token={onToken}
            stripeKey={pushlishableKey}
        />
    )
}

export default StripeCheckoutButton 