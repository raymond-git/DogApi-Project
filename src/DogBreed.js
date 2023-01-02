import React, { useEffect, useState } from 'react';

function DogBreed(){

    // Dropdown Menu
    const [dogBreeds, setDogBreeds] = useState([]);
    const fetctDog = async () => {
      const dogUrl = await fetch("https://dog.ceo/api/breeds/list/all");
      const allBreed = await dogUrl.json();

      // Get all of the object for the dogs. For example:
      // {
      //   "message": {
      //      "affenpinscher": [],
      //      "african": [],
      //      "australian": [
      //          "shepherd"
      //      ],
      // }
      const dogNames = Object.keys(allBreed.message);
      setDogBreeds(dogNames);
    };
    useEffect(()=> {
        fetctDog();
    }, [])

      

    // Select Dropdown option
    const [dogImage, setDogImage] = useState();
    const SelectBreedOption = async (event) => {
    const BreedValues = event.target.value;
    const dogImageUrl = `https://dog.ceo/api/breed/${BreedValues}/images/random`
    const dogImage = await fetch(dogImageUrl);
    const getDog = await dogImage.json();
    setDogImage(getDog.message);
    };

    useEffect(() => {
      const options = document.getElementById("dropdownmenu");
      if (options != null) {
        options.addEventListener("change", (event) => SelectBreedOption(event));
        return () => {
          options.removeEventListener("change", (event) => SelectBreedOption(event));
        };
      }
    }, []);


    // useState with .map() example: 
    // dogBreeds = [" ", " "]
    // setDogBreeds["object", "object"]
    // breed = ["object"(uniqueId), "object"(uniqueId)] in dogBreeds.map(breed)
  return (
    <div>
      <div className="row">
        <div className='col-6-sm'>
          <select id="dropdownmenu">
            <option>Please select a breed</option>
            {dogBreeds.map((breed, uniqueId) => (
              <option
                key={uniqueId}
                value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>

        <div className='col-6-sm'>
          <div className="dogImages">
            {[dogImage].map((specificImage) => (
              <img
                id="contain-image"
                src={specificImage}
                key={specificImage}
                style={{ width: "380px", height: "300px", objectFit: "cover" }}
                alt="Dog Images"
              ></img>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogBreed;