import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core'
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { Link } from 'react-router-dom'

const steps = [ 'Adresse de paiement', 'Détails du paiement'];

const Payer = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles ();
    const [shippingData, setShippingData] = useState({});

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'});

                console.log(token);

                setCheckoutToken(token);
            } catch(error) {
                console.log(error)
            }
}

        generateToken();
    }, [cart]);

    const nextStep = () => setActiveStep ((preActiveStep) => preActiveStep + 1);
    const backStep = () => setActiveStep ((preActiveStep) => preActiveStep -1);

    const next = (data) => {
        setShippingData(data);

        nextStep();
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
            <Typography variant="h5"> Merci pour votre achat, {order.customer.firstname} {order.customer.lastname}</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Référence de commande : {order.customer.reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button"> Retour à l'accueil </Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );

    if(error) {
        <>
            <Typography variant="h5">Errir: {error}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button"> Retour à l'accueil </Button>
        </>
    }

    const Form = () => activeStep == 0 
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout}/>
    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Payer</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}

                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}
export default Payer
