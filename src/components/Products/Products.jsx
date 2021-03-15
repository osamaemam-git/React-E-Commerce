import React from 'react';
import { Grid, Button } from '@material-ui/core';
import useStyles from './styles';
import Product from './Product/Product';

const Products = ({ products, onAddToCart }) => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Button className="btn" size="small" type="button" variant="contained" color="secondary">Filtrer par prix</Button>
        <Grid container justify="center" spacing={4}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} onAddToCart={onAddToCart}/>
                </Grid>
        ))}
        </Grid>
    </main>
    )

}

export default Products;