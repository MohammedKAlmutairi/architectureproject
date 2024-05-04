import { useLocation } from 'react-router-dom';
import { FaRegClock, FaMicrochip, FaTachometerAlt, FaBurn } from 'react-icons/fa';

import './SimulationStats.css';
function SimulationStats() {
    const location = useLocation();
    const results = location.state?.results;
    if (!results || (!results['result1'] && !results['result2'])) {
        console.log("Data for result1 or result2 is undefined, showing fallback UI.");
        return <div className="simulation-stats">No simulation data available. Please submit configuration first.</div>;
    }


        const renderStats = (stats, title) => (
        <div className="stats-section">
            <h2>{title}</h2>
            <div className="stats-subsection">
                <h3>General</h3>
                <p>Real Time: {stats.general.RealTime} [s]</p>
                <p>Sim End: {stats.general.SimEnd}</p>
                <p>Sim Time: {stats.general.SimTime} [ns]</p>
                <p>Frequency: {stats.general.Frequency} [MHz]</p>
                <p>Cycles: {stats.general.Cycles}</p>
            </div>
            <div className="stats-subsection">
                <h3>x86</h3>
                <p>Real Time: {stats.x86.RealTime} [s]</p>
                <p>Instructions: {stats.x86.Instructions}</p>
                <p>Instructions Per Second: {stats.x86.InstructionsPerSecond}</p>
                <p>Sim Time: {stats.x86.SimTime} [ns]</p>
                <p>Frequency: {stats.x86.Frequency} [MHz]</p>
                <p>Cycles: {stats.x86.Cycles}</p>
                <p>Cycles Per Second: {stats.x86.CyclesPerSecond}</p>
                <p>Fast Forward Instructions: {stats.x86.FastForwardInstructions}</p>
                <p>Committed Instructions: {stats.x86.CommittedInstructions}</p>
                <p>Committed Instructions Per Cycle: {stats.x86.CommittedInstructionsPerCycle.toFixed(3)}</p>
                <p>Committed MicroInstructions: {stats.x86.CommittedMicroInstructions}</p>
                <p>Committed MicroInstructions Per Cycle: {stats.x86.CommittedMicroInstructionsPerCycle.toFixed(3)}</p>
                <p>Branch Prediction Accuracy: {stats.x86.BranchPredictionAccuracy.toFixed(4)}</p>
            </div>
        </div>
    );

    return (
        <div className="simulation-stats">
            {results.result1 && renderStats(results.result1, "Simulation Statistics Summary 1")}
            {results.result2 && renderStats(results.result2, "Simulation Statistics Summary 2")}
        </div>
    );

}

export default SimulationStats;
