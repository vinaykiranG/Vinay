import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Reservation from './components/Reservation';

function App() {
  const [reservations, setReservations] = useState([]);

  const handleReservationSubmit = (reservationData) => {
    // Process the reservation data and update the reservations state
    setReservations([...reservations, reservationData]);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard reservations={reservations} />} />
          <Route
            path="/reservation"
            element={<Reservation onReservationSubmit={handleReservationSubmit} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
