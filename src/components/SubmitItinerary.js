import React, { useContext, useState } from "react";
import ItemContext from "./ItemContext";
import Modal from "./Modal";
import useModal from "./useModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const SubmitItinerary = () => {
  const [date, setDate] = useState(new Date());
  const [Itinerary, setItinerary] = useContext(ItemContext);
  const [nameField, setNameField] = useState("");
  const [message, setMessage] = useState("");
  const [isShowingModal, toggleModal] = useModal();
  const [error, setError] = useState(false);

  const addItinerary = () => {
    let newItinerary = [nameField, date, ...Itinerary];
    const itineraryString = JSON.stringify(newItinerary);
    if (nameField.length == 0 || Itinerary.length === 0) {
      setError(true);
    }
    if (nameField && date && Itinerary.length >= 1) {
      setError(false);
      fetch(`http://localhost:3000/addItinerary`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*     ",
          "Content-Type": "application/json",
        },
        body: itineraryString,
      })
        .then(() => {
          setMessage(
            "Hi " + nameField + " thank you for creating an itinerary.  "
          );
          setItinerary([]);
          setNameField("");
          setDate(new Date());

          toggleModal(message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <h2>Submit Itinerary</h2>
      <label> Enter your name:</label>
      <input
        className="form-control"
        type="text"
        placeholder="Enter your name here ..."
        value={nameField}
        onChange={(e) => setNameField(e.target.value)}
      />
      {error && nameField.length <= 0 ? <label>Name can't be empty</label> : ""}
      <br />
      <label> Enter your start date:</label>

      <div>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          minDate={new Date()} //set the current date to disable past date
          //this set the max time (i.e. 23:59)
          dateFormat="MM dd, yyyy "
        />
      </div>

      <br />

      <button className="button btn btn-primary" onClick={addItinerary}>
        Submit Itinerary
      </button>
      <br />
      {error ? <label>Itinerary can't be empty</label> : ""}

      <div className="modalContainer">
        <Modal
          show={isShowingModal}
          onCloseButtonClick={toggleModal}
          message={message}
        />
      </div>
    </div>
  );
};
export default SubmitItinerary;
