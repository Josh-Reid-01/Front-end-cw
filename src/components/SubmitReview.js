import React, { useContext, useState } from "react";
import ItemContext from "./ItemContext";
import Modal from "./Modal";
import useModal from "./useModal";

const SubmitReview = () => {
  const [nameField, setNameField] = useState("");
  const [hostelField, setHostelField] = useState("Torridon Youth Hostel");
  const [reviewField, setReviewField] = useState("");
  const [message, setMessage] = useState("");
  const [isShowingModal, toggleModal] = useModal();
  const [error, setError] = useState(false);

  const addReview = () => {
    let newReview = [nameField, hostelField, reviewField];
    const reviewString = JSON.stringify(newReview);
    if (
      nameField.length == 0 ||
      hostelField.length == 0 ||
      reviewField.length == 0
    ) {
      setError(true);
    }
    if (nameField && hostelField && reviewField) {
      setError(false);
      fetch(`http://localhost:3000/addReview`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*     ",
          "Content-Type": "application/json",
        },
        body: reviewString,
      })
        .then(() => {
          setMessage("Hi " + nameField + " thank you for submitting a review ");

          setNameField("");
          setHostelField("");
          setReviewField("");
          toggleModal(message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h2>Submit Review</h2>
      <label> Enter your name:</label>
      <input
        className="form-control"
        type="text"
        placeholder="Enter your name here ..."
        value={nameField}
        onChange={(e) => setNameField(e.target.value)}
      />
      <br />
      {error && nameField.length <= 0 ? <label>Name can't be empty</label> : ""}
      <br />
      <label> Enter the Hostel:</label>
      <br />
      <select
        name="form"
        defaultValue={{ value: "Inverness" }}
        value={hostelField}
        onChange={(e) => setHostelField(e.target.value)}
      >
        <option>Torridon Youth Hostel</option>
        <option>Inverness Youth Hostel</option>
        <option>Gairloch Sands Youth Hostel</option>
        <option>Tongue Hoste</option>
        <option>Ullapool youth hostel</option>
        <option>Durness smoo youth hostel</option>
        <option>Helmsdale hotel</option>
        <option>Applecross, Hartfield House</option>
        <option>Achmelvich Beach Youth Hostel</option>
        <option>Portsoy</option>
        <option>Drumnadrochit</option>
        <option>Glen Affric Youth Hostel</option>
        <option>Ratagan Youth Hostel</option>
        <option>Portree Youth Hostel</option>
        <option>Fort Augustus</option>
      </select>
      <br />
      {error && hostelField.length <= 0 ? (
        <label>Hostel can't be empty</label>
      ) : (
        ""
      )}
      <br />
      <label> Enter your review:</label>
      <input
        required
        className="form-control"
        type="text"
        placeholder="Enter your review here ..."
        value={reviewField}
        onChange={(e) => setReviewField(e.target.value)}
      />
      <br />
      {error && reviewField.length <= 0 ? (
        <label>Review can't be empty</label>
      ) : (
        ""
      )}
      <br />
      <button className="button btn btn-primary" onClick={addReview}>
        Submit Review
      </button>
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
export default SubmitReview;
