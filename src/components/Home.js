import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="main-content">
            <h1>What is Multi2Sim?</h1>
            <h5>Computer architects constantly seek to design faster, more powerful, and more power-efficient Central Processing Units (CPUs) and Graphics Processing Units (GPUs). But manufacturing a new design is a long and expensive process that relies on a previous verification for correctness and feasibility.
            Multi2Sim is a simulator of CPUs and GPUs, used to test and validate new hardware designs before they are physically manufactured. By running a set of standard benchmarks on Multi2Sim, a computer architect can verify whether a proposed alternative design is correct, and what its relative performance is over existing designs. For more details, <a href="http://www.multi2sim.org" target="_blank" rel="noopener noreferrer">click here</a>.
            </h5>
        </div>
    );
};

export default Home;
