import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Carosel from "./Carosel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import fetchPet from "./fetchPet";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSold, setIsSold] = useState(false);
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🤣</h2>
      </div>
    );
  }

  function handleButtonClick(e) {
    setShowModal(false);
    setIsSold(e.target.dataset.sold === "true");
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} - ${pet.breed} - ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>
          {isSold ? "Sell" : "Adopt"} {pet.name}
        </button>
        <p>{pet.description}</p>
      </div>
      <Carosel images={pet.images} />
      {showModal ? (
        <Modal>
          <div className="modal">
            <h2>Would you like to adopt {pet.name}?</h2>
            <div className="buttons">
              <button data-sold="false" onClick={handleButtonClick}>
                Yes
              </button>
              <button data-sold="true" onClick={handleButtonClick}>
                No
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

const WrappedDetails = (props) => {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
