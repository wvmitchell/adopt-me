import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import fetchSearch from "./fetchSearch";
import useBreedList from "./useBreedList";
import Results from "./Results";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = function () {
  const [requestParams, setRequestParams] = useState({
    animal: "",
    location: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds, status] = useBreedList(animal);
  const result = useQuery(["search", requestParams], fetchSearch);
  const pets = result?.data?.pets ?? [];
  const [adoptedPet, _] = useContext(AdoptedPetContext);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    setRequestParams({
      location: formData.get("location"),
      animal: formData.get("animal"),
      breed: formData.get("breed"),
    });
  }

  return (
    <div className="search-params">
      {
        // todo: extract form to its own component
      }
      <form onSubmit={handleSearchSubmit}>
        {adoptedPet && (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        )}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" name="breed" disabled={status === "unloaded"}>
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
