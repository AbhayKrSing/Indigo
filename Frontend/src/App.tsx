import React, { useState, useEffect } from "react";
import axios from "axios";

// Define TypeScript interfaces for flight information
interface FlightInfo {
  flightNumber: string;
  status: string;
  gate: string;
  lastUpdated: string;
}

const App: React.FC = () => {
  const [flightNumber, setFlightNumber] = useState<string>("");
  const [flightInfo, setFlightInfo] = useState<FlightInfo | null>(null);

  const fetchFlightInfo = async () => {
    if (flightNumber) {
      try {
        const result = await axios.get<FlightInfo>(
          `http://localhost:3000/flights/${flightNumber}`
        );
        setFlightInfo(result.data);
      } catch (error) {
        console.error("Error fetching flight information:", error);
      }
    }
  };

  useEffect(() => {
    if (flightNumber) {
      fetchFlightInfo();
    }
  }, [flightNumber]);

  return (
    <div>
      <h1>Flight Status</h1>
      <input
        type="text"
        value={flightNumber}
        onChange={(e) => setFlightNumber(e.target.value)}
        placeholder="Enter flight number"
      />
      <button onClick={fetchFlightInfo}>Check Status</button>
      {flightInfo && (
        <div>
          <h2>Flight Number: {flightInfo.flightNumber}</h2>
          <p>Status: {flightInfo.status}</p>
          <p>Gate: {flightInfo.gate}</p>
          <p>
            Last Updated: {new Date(flightInfo.lastUpdated).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
