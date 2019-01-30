import React from 'react';
import HomeImg from '../assets/homeimg.png'
import '../stylesheets/home.css'

const Home = () => {
    return (
        <div className='home-img-container'>
            <img src={HomeImg} alt='nunca dejes de buscar' className='home-image'/>
        </div>
    )
}

export default Home;