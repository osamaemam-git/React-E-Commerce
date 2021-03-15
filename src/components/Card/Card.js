import { render } from '@testing-library/react'
import React, { Component } from 'react'
import Card from './CardUI';
import './Card.scss'




const Cards = () => {
    return (
        <div className="container-fluid d-flex justify-content-center">
            <div className="row">
                <div className="col-md-4"></div>
                <Card />
                <div className="col-md-4"></div>
                <Card />
                <div className="col-md-4"></div>
                <Card />
            </div>
        </div>
    );
  }


export default Cards
