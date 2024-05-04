import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import CacheConfigurationForm from "./components/CacheConfigurationForm";
import About from "./components/About";
import SimulationStats from "./components/SimulationStats";


const FormHandler = ({ setSimulationData }) => {
    const navigate = useNavigate();

    const handleConfigurationSubmit = (config) => {
        console.log("Received configuration data:", config);
        setSimulationData(config);
        navigate('/SimulationStats');
    };

    return <CacheConfigurationForm onSubmit={handleConfigurationSubmit} />;
}

const Components = () => {
    const [simulationData, setSimulationData] = useState(null);

    return (

        <Router>
            <Header/>
            <Navbar/>
            <div className="main-content">

                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/CacheConfigurationForm"
                           element={<FormHandler setSimulationData={setSimulationData}/>}/>
                    <Route path="/SimulationStats" element={<SimulationStats stats={simulationData}/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
                </div>
                <Footer/>
        </Router>

)
    ;
};

export default Components;
