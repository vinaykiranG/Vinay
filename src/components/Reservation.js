import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reservation.css';

const Reservation = ({ onReservationSubmit, isFormSubmitted }) => {
  const [lowerDeckSeats, setLowerDeckSeats] = useState(Array(20).fill(false));
  const [upperDeckSeats, setUpperDeckSeats] = useState(Array(20).fill(false));
  const [passenger, setPassenger] = useState({
    firstName: '',
    lastName: '',
    email: '',
    seatNumber: '',
    bookingDate: ''
  });

  const navigate = useNavigate();

  const handleSeatClick = (deck, index) => {
    if (isFormSubmitted) {
      return; // Prevent seat selection after form submission
    }

    if (deck === 'lowerDeck') {
      const updatedSeats = [...lowerDeckSeats];
      updatedSeats[index] = !updatedSeats[index]; // Toggle seat reservation
      setLowerDeckSeats(updatedSeats);
      const seatNumber = index + 1;
      setPassenger(prevPassenger => ({
        ...prevPassenger,
        seatNumber: `Lower Deck ${seatNumber}`
      }));
    } else if (deck === 'upperDeck') {
      const updatedSeats = [...upperDeckSeats];
      updatedSeats[index] = !updatedSeats[index]; // Toggle seat reservation
      setUpperDeckSeats(updatedSeats);
      const seatNumber = index + 21; // Calculate seat number (21 to 40 for upper deck)
      setPassenger(prevPassenger => ({
        ...prevPassenger,
        seatNumber: `Upper Deck ${seatNumber}`
      }));
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPassenger(prevPassenger => ({
      ...prevPassenger,
      [name]: value
    }));
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    const updatedPassenger = { ...passenger, bookingDate: today };
    onReservationSubmit(updatedPassenger);
    navigate('/');
  };

  return (
    <div className="reservation-container">
      <h1 className="reservation-title">Bus Ticket Reservation</h1>
      <div className="seat-layout-container">
        <h2 className="seat-layout-title">Lower Deck</h2>
        <div className="bus-container">
          <div className="seat-layout">
            {lowerDeckSeats.map((isReserved, index) => (
              <div
                key={index}
                className={`seat ${isReserved ? 'reserved' : 'available'} ${
                  isFormSubmitted ? 'locked' : ''
                }`}
                onClick={() => handleSeatClick('lowerDeck', index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="seat-layout-container">
        <h2 className="seat-layout-title">Upper Deck</h2>
        <div className="bus-container">
          <div className="seat-layout">
            {upperDeckSeats.map((isReserved, index) => (
              <div
                key={index}
                className={`seat ${isReserved ? 'reserved' : 'available'} ${
                  isFormSubmitted ? 'locked' : ''
                }`}
                onClick={() => handleSeatClick('upperDeck', index)}
              >
                {index + 21}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="reservation-form-container">
        <h2 className="reservation-form-title">Passenger Details</h2>
        <form className="reservation-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={passenger.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={passenger.lastName}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={passenger.email}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
