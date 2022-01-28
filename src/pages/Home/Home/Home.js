import React from 'react';
import './Home.css';
import Reviews from '../../Experiences/Experiences';
import Banner from '../../Banner/Banner';
import HomeServices from './Blogs/Blogs';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HomeServices/>
            <Reviews/>
        </div>
    );
};

export default Home;