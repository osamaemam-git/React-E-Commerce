import React from 'react'
import GifPlayer from 'react-gif-player';
import { Typography, Button, Divider, Box, CardMedia } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import './HeroStyle.scss'
import img from '../../assets/img/index.jpeg';
import Carousel from '../Carousel/Carousel';
import { MuiThemeProvider, createMuiTheme }from '@material-ui/core/styles';
import Cards from '../Card/Card'
import { FcApproval, FcLike } from 'react-icons/fc'
import { SiReact } from "react-icons/si";



const img1= {
    backgroundImage: 'url('+ img+')'
}

function HeroSection() {
    const theme = createMuiTheme ({
        palette: {
            secondary: {
                main: 'rgba(0,0,0,0.87)'
            },
        }
    })
    return (
        <div className="hero-container">
        <MuiThemeProvider theme={theme}>
        <br/>
        <br/>
        <br/>
        <h1 className="teou">
        Paiement sécurisé <FcApproval className="fcApp"/>
        </h1>
        <h1 className="teou1">
        by Osama and David with<FcLike className="fcLike"/>
        </h1>
        <h1 className="teou2">
        Sandbox Website (inDev) <SiReact className="fcReact"/>
        </h1>
            <h1 className="title">Personnalisez vos sneakers</h1>
                <h1 className="subtitle1">Sneakers custom est une application visant à mettre en avant les artistes, leur permettant de 
                        professionnaliser leur art et de le valoriser</h1>
            <div className= "hero-btns">
            <Box textAlign='center'>
                    <Button component={Link} to ="/products" className="customBtn" size="medium" type="button" variant="contained" color="secondary">Découvrir</Button>      
                    <div style={img1} className="up"/>
                    <br/>
                    <br/>
            </Box>
            <br />
            <br />
            <br /> 
            <h1 className="hein">Tendances :</h1>
            <Carousel />
            <h1 className="art">L'art de customer :</h1>
            <h1 className="texte">Les prémices du ‘’custom’’ actuel remontent en réalité aux années 70 lorsque Bill Bowerman, l’un des deux fondateurs de Nike, modifiait lui-même les chaussures de sport des athlètes qu’il entraînait à l’Université de l’Oregon avant de co-cofonder la firme de Beaverton (voir l’histoire de Nike). Pour la petite histoire, il procédera d’ailleurs ainsi jusqu’à ce qu’il ait l’idée de créer une semelle crantée surnommée ‘’waffle’’, en mangeant une gaufre avec sa femme au cours de l’été 1971. Une dizaine d’années plus tard, les fans de la Air Force 1 n’en pouvant plus d’attendre la sortie de nouveaux coloris de la célèbre chaussure de Bruce Kilgore inventeront leurs propres déclinaisons en customisant leurs anciennes paires.</h1>
            <GifPlayer className="gif" gif="videos/7.gif" autoplay muted/>
            </div>
            </MuiThemeProvider>
        </div>
    )
}

export default HeroSection
