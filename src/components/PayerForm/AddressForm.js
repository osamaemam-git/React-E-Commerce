import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from './CustomTextField';
import { commerce } from '../../lib/commerce';

export const AddressForm = ({ checkoutToken, next }) => {
    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const countries = Object.entries(shippingCountries).map(([code, name]) => ( { id: code, label: name }))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ( { id: code, label: name }))
    const options = shippingOptions.map((s0) => ({id: s0.id, label: `${s0.description} - (${s0.price.formatted_with_symbol})` }))


    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, []);


    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision]);

    return (
        <div>
            <Typography variant="h6" gutterBottom> Adresse de paiement </Typography>
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='Nom*' />
                        <FormInput required name='lastName' label='Prénom*' />
                        <FormInput required name='address1' label='Adresse*' />
                        <FormInput required name='email' label='Email*' />
                        <FormInput required name='city' label='Ville*' />
                        <FormInput required name='zip' label='Code Postal*' />
                        <Grid item xs={12} sm={6}>
                           <InputLabel>Adresse de livraison</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                         <Grid item xs={12} sm={6}>
                        <InputLabel>Région</InputLabel>
                        <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                    {subdivisions.map((subdivision) => (
                            <MenuItem key={subdivision.id} value={subdivision.id}>
                                {subdivision.label}
                            </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                   <Grid item xs={12} sm={6}>
                    <InputLabel>Options de livraison</InputLabel>
                    <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                        {options.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.label}
                        </MenuItem>
                        ))};
                    </Select> 
                    </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button component={Link} to="/cart" variant="outlined">Retour au panier</Button>
                            <Button type="submit" variant="outlined">Suivant</Button>
                    </div>
                    </form>
            </FormProvider>
        </div>
    )
}

export default AddressForm