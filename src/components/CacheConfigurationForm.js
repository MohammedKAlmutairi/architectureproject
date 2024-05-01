import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CacheConfigurationForm.css';
import { FaDatabase, FaNetworkWired } from 'react-icons/fa';
import { MdMemory, MdPolicy, MdTimer, MdAddCircleOutline } from 'react-icons/md';

function CacheConfigurationForm({ onSubmit }) {
    const navigate = useNavigate();
    const [geoL1, setGeoL1] = useState({
        sets: '64',
        assoc: '2',
        blockSize: '64',
        latency: '2',
        policy: 'LRU',
        ports: '2'
    });

    const [geoL2, setGeoL2] = useState({
        sets: '256',
        assoc: '4',
        blockSize: '64',
        latency: '10',
        policy: 'LRU',
        ports: '2'
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/defaultSimulationData.json');
            const data = await response.json();
            console.log("Fetched data:", data);  // Make sure this is the correct data
            onSubmit(data);
            console.log("Data submitted for state update:", data);
            navigate('/SimulationStats');
        } catch (error) {
            console.error('Failed to load simulation data:', error);
        }
    };


    const handleChange = (event, setFunction) => {
        const { name, value } = event.target;
        setFunction(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>

        <h3><FaDatabase /> Cache Geometry L1</h3>
        <label><MdMemory /> Sets: <input type="number" name="sets" value={geoL1.sets} onChange={(e) => handleChange(e, setGeoL1)} /></label>
        <label><MdAddCircleOutline /> Assoc: <input type="number" name="assoc" value={geoL1.assoc} onChange={(e) => handleChange(e, setGeoL1)} /></label>
        <label><FaNetworkWired /> Block Size: <input type="number" name="blockSize" value={geoL1.blockSize} onChange={(e) => handleChange(e, setGeoL1)} /></label>
        <label><MdTimer /> Latency: <input type="number" name="latency" value={geoL1.latency} onChange={(e) => handleChange(e, setGeoL1)} /></label>
        <label><MdPolicy /> Policy: <input type="text" name="policy" value={geoL1.policy} onChange={(e) => handleChange(e, setGeoL1)} /></label>
        <label><FaNetworkWired /> Ports: <input type="number" name="ports" value={geoL1.ports} onChange={(e) => handleChange(e, setGeoL1)} /></label>

        <h3><FaDatabase /> Cache Geometry L2</h3>
        <label><MdMemory /> Sets: <input type="number" name="sets" value={geoL2.sets} onChange={(e) => handleChange(e, setGeoL2)} /></label>
        <label><MdAddCircleOutline /> Assoc: <input type="number" name="assoc" value={geoL2.assoc} onChange={(e) => handleChange(e, setGeoL2)} /></label>
        <label><FaNetworkWired /> Block Size: <input type="number" name="blockSize" value={geoL2.blockSize} onChange={(e) => handleChange(e, setGeoL2)} /></label>
        <label><MdTimer /> Latency: <input type="number" name="latency" value={geoL2.latency} onChange={(e) => handleChange(e, setGeoL2)} /></label>
        <label><MdPolicy /> Policy: <input type="text" name="policy" value={geoL2.policy} onChange={(e) => handleChange(e, setGeoL2)} /></label>
        <label><FaNetworkWired /> Ports: <input type="number" name="ports" value={geoL2.ports} onChange={(e) => handleChange(e, setGeoL2)} /></label>

        <button type="submit"><MdAddCircleOutline /> Submit Configuration</button>
      </form>
    </div>
  );
}

export default CacheConfigurationForm;