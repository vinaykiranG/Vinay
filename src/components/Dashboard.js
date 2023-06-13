import React, { useState } from 'react';
import './styles/Dashboard.css';

const Dashboard = ({ reservations }) => {
  const [passengers, setPassengers] = useState(reservations);

  const handleEdit = (index) => {
    setPassengers((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];
      updatedPassengers[index].isEditing = true;
      return updatedPassengers;
    });
  };

  const handleSave = (index) => {
    setPassengers((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];
      updatedPassengers[index].isEditing = false;
      return updatedPassengers;
    });
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    setPassengers((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];
      updatedPassengers[index][name] = value;
      return updatedPassengers;
    });
  };

  const handleDelete = (index) => {
    setPassengers((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];
      updatedPassengers.splice(index, 1);
      return updatedPassengers;
    });
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Passenger Dashboard</h2>
      {passengers.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Seat Number</th>
                <th>Date of Booking</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {passengers.map((passenger, index) => (
                <tr key={index}>
                  <td>
                    {passenger.isEditing ? (
                      <input
                        type="text"
                        name="firstName"
                        value={passenger.firstName}
                        onChange={(event) => handleInputChange(event, index)}
                      />
                    ) : (
                      passenger.firstName
                    )}
                  </td>
                  <td>
                    {passenger.isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={passenger.email}
                        onChange={(event) => handleInputChange(event, index)}
                      />
                    ) : (
                      passenger.email
                    )}
                  </td>
                  <td>{passenger.seatNumber}</td>
                  <td>
                    {passenger.isEditing ? (
                      <input
                        type="date"
                        name="bookingDate"
                        value={passenger.bookingDate}
                        onChange={(event) => handleInputChange(event, index)}
                      />
                    ) : (
                      new Date(passenger.bookingDate).toLocaleDateString()
                    )}
                  </td>
                  <td>
                    {passenger.isEditing ? (
                      <>
                        <button className="save-button" onClick={() => handleSave(index)}>Save</button>
                        <button className="cancel-button" onClick={() => handleSave(index)}>Cancel</button>
                      </>
                    ) : (
                      <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                    )}
                    <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No passengers found.</p>
      )}
    </div>
  );
};

export default Dashboard;
