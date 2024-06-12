import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import Carosel from "./Carosel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import fetchPet from "./fetchPet";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  function handleButtonClick(e) {
    if (e.target.dataset.adopt === "true") {
      setAdoptedPet(pet);
      navigate("/");
    }
    setShowModal(false);
  }

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🤣</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} - ${pet.breed} - ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>
      <Carosel images={pet.images} />
      {showModal ? (
        <Modal>
          <div className="modal">
            <h2>Would you like to adopt {pet.name}?</h2>
            <div className="buttons">
              <button data-adopt="true" onClick={handleButtonClick}>
                Yes
              </button>
              <button data-adopt="false" onClick={handleButtonClick}>
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
