import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIKE_PUBLIC_KEY);


const PaymentForm = ({ checkoutToken, backStep }) => {
    const handleSubmit= () => {

    }
    return (
        <div>
            <Review  checkoutToken={checkoutToken}/>
            <Divider />
            <Typography variant='h6' gutterBottom style={{ margin: '20 px 0' }}>
            Méthodes de paiement
            </Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                {({ elements, stripe }) => (
                    <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                        <CardElement />
                        <br /> <br/>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button variant="outlined" onClick={backStep}>Retour</Button>
                            <Button type="submit" varinat="contained" disabled={!stripe} color="primary">
                            Payez { checkoutToken.live.subtotal.formatted_with_symbol }
                            </Button>
                        </div>
                    </form>
                )}
                </ElementsConsumer>
            </Elements>

        </div>
    )
}

export default PaymentForm;