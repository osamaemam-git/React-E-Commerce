import React from 'react'
import Bang from '../../assets/img/baam.jpg'
import './Card.scss'

const Card = () => {
    return (
        <div classnName="card text-center shadow">
            <div className="overflow">
                <img src={Bang} alt="image1"/>
            </div>
        <div className='card-body text-dark'>
            <h4 className="card-title">Titre</h4>
                <p className="card-text text-secondary">
                AJIAjzIJIDJZEIOJOJaozkOKFOZJEAOIJOKOfjozjaoekoazekazejaozjfz, fiejajeozakeoazeoazekaok
                </p>
                <a href="#" className="btn btn-outline-success">GO Anywhere</a>
        </div>
        </div> 
    )
}

export default Card
