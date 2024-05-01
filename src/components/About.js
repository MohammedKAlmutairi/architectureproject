import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="main-content">
            <h1>About Us</h1>
            <h5>Computer Architecture Project 2024.</h5>
            <h5>Group Members</h5>
            <ul className="member-list">
                <li>
                    <img src="/images/Z.jpg" alt="Ningzhi Tang" className="member-image"/>
                    Ningzhi Tang
                </li>
                <li>
                    <img src="/images/C.jpg" alt="Chaoran Chen" className="member-image"/>
                    Chaoran Chen
                </li>
                <li>
                    <img src="/images/X.png" alt="Gelei Xu" className="member-image"/>
                    Gelei Xu
                </li>
                <li>
                    <img src="/images/M.png" alt="Mohammed Almutairi" className="member-image"/>
                    Mohammed Almutairi
                </li>
            </ul>
        </div>
    );
};

export default About;
