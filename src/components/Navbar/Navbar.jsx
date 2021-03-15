import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import logo from '../../assets/aaa.png'
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme }from '@material-ui/core/styles';
import { FcApproval } from 'react-icons/fc'

const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();
    const theme = createMuiTheme ({
        palette: {
            primary: {
                main: 'rgba(0,0,0,0.87)'
            },
        }
    })
    return (
        <>
        <MuiThemeProvider theme={theme}>
            <AppBar position="fixed" className={classes.appBar} color="primary">
                <Toolbar>
                    <Typography component= {Link} to="/" variant="h6" className={classes.appBar} color="inherit" style={{textDecoration: 'none'}}>
                        <img src={logo} alt="Sneaker Custom" height="35px" className={classes.image} />
                        Sneaker Custom    
                    </Typography>
                    <div className={classes.grow} />
                    <div>
                    <Typography component= {Link} to="/products" variant="h6" className={classes.prodBar} color="inherit" style={{textDecoration: 'none'}}>Products</Typography>
                    </div>
                    {location.pathname == '/', '/products' && (
                    <div className={classes.button}>
                        <IconButton component = {Link} to= "/cart" arial-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary"> 
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>)}
                </Toolbar>
            </AppBar>
            </MuiThemeProvider>
        </>
    )
}

export default Navbar
