import React from 'react';
import { Link } from 'react-router-dom'
import "./Navbar.css";


const Navbar = () => {


    return (
        <nav className="navigation-bar">
            <ul>
                <li><Link className="nav-link" to="/">Home</Link></li>
                <li><Link className="nav-link" to="/CacheConfigurationForm">New Simulation</Link></li>
                <li><Link className="nav-link" to="/SimulationStats">Simulation history</Link></li>



                <li><Link className="nav-link" to="/about">About</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
