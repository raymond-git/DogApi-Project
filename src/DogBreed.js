import React, { useEffect, useState } from 'react';

function DogBreed(){

    // Dropdown Menu
    const [dogBreeds, setDogBreeds] = useState([]);
    const fetctDog = async () => {
      const dogUrl = await fetch("https://dog.ceo/api/breeds/list/all");
      const dogList = await dogUrl.json();

      // Get all of the object for the dogs. For example:
      // {
      //   "message": {
      //      "affenpinscher": [],
      //      "african": [],
      //      "australian": [
      //          "shepherd"
      //      ],
      // }
      const dogNames = Object.keys(dogList.message);
      setDogBreeds(dogNames);
    };
    useEffect(()=> {
        fetctDog();
    }, [])



    // Select Dropdown option
    const [dogImage, setDogImage] = useState([]);
    const SelectBreed = async (event) => {
    const BreedValues = event.target.value;
    const dogImageUrl = `https://dog.ceo/api/breed/${BreedValues}/images/random`;
    const data = await fetch(dogImageUrl);
    const getDog = await data.json();
    setDogImage(getDog.message);
    };

    useEffect(() => {
      const options = document.getElementById("dropdownmenu");
      if (options != null) {
        options.addEventListener("change", (event) => SelectBreed(event));
        return () => {
          options.removeEventListener("change", (event) => SelectBreed(event));
        };
      }
    }, []);


    // useState with .map() example: 
    // dogBreeds = [" ", " "]
    // setDogBreeds["object", "object"]
    // breed = ["object"(uniqueId), "object"(uniqueId)] in dogBreeds.map(breed)
    return (
      <div>
        {/* <Dropdown>
          <DropdownButton id="dropdown-item-button" title="Dropdown button">
            {dogBreeds.map((breed, uniqueId) => (
              <Dropdown.Item
                key={uniqueId}
                value={breed}>
                {breed}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Dropdown> */}

        <select id="dropdownmenu">
          {dogBreeds.map((breed, uniqueId) => (
            <option key={uniqueId} value={breed}>
              {breed}
            </option>
          ))}
        </select>

        {[dogImage].map((specificImage) => (
          <img
            id="contain-image"
            src={specificImage}
            key={specificImage}
            style={{ width: "300px", height: "300px", objectFit: "cover" }}
            alt="dogImages"
          ></img>
        ))}
      </div>
    );
}

export default DogBreed;