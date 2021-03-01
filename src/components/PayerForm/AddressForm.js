import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './CustomTextField';
import { commerce } from '../../lib/commerce';

export const AddressForm = ({ checkoutToken }) => {
    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const {shippingCountry, setShippingCountry} = useState('');
    const {shippingSubdivisions, setShippingSubdivisions} = useState([]);
    const {shippingSubdivision, setShippingSubdivision} = useState('');
    const {shippingOptions, setShippingOptions} = useState([]);
    const {shippingOption, setShippingOption} = useState('');

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        setShippingCountries(countries);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, []);

    return (
        <div>
            <Typography variant="h6" gutterBottom> Addresse de paiement </Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='Nom*' />
                        <FormInput required name='lastName' label='Prénom*' />
                        <FormInput required name='address1' label='Adresse*' />
                        <FormInput required name='email' label='Email*' />
                        <FormInput required name='city' label='Ville*' />
                        <FormInput required name='zip' label='Code Postal*' />
                        { /*< Grid item xs={12} sm={6}>
                           <InputLabel>Adresse de livraison</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Sélectionnez-moi
                                </MenuItem>
                            </Select>
                        </>
                        <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select value={} fullWidth onChange={}>
                            <MenuItem key={} value={}>
                                Sélectionnez-moi
                            </MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <InputLabel>Options de paiement</InputLabel>
                    <Select value={} fullWidth onChange={}>
                        <MenuItem key={} value={}>
                            Sélectionnez-moi
                        </MenuItem>
                    </Select>
    </Grid > */}
                    </Grid>

                </form>
            </FormProvider>
        </div>
    )
}

export default AddressForm