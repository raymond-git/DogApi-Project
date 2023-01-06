import React, { useEffect, useState } from "react";

function DogBreed() {

  //Get all list of dogs for option dropdown menu
  const [dogBreeds, setDogBreeds] = useState([]);
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((getData) => {
        const getBreed = Object.keys(getData.message);
        setDogBreeds(getBreed);
      });
  }, []);


  // Populate dog once image is selected
  const [dogImage, setDogImage] = useState();
  const fetchDogImage = (BreedName) => {
    fetch(`https://dog.ceo/api/breed/${BreedName}/images/random`)
      .then((response) => response.json())
      .then((getData) => {
        setDogImage(getData.message);
      });
  };

  useEffect(() => {
    const options = document.getElementById("dropdownmenu");
    if (options != null) {
      options.addEventListener("change", (event) => {
        const BreedName = event.target.value;
        fetchDogImage(BreedName);
      });
    }
    return () => {
      options.removeEventListener("change", (event) => {
        const BreedName = event.target.value;
        fetchDogImage(BreedName);
      });
    };
  }, []);

  
  // Get random images when click button
  const [subBreed, setSubBreed] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((getSubBreed) => {
        setSubBreed(getSubBreed);
      });
  }, [buttonClicked]);

  const handleButtonChange = () => {
    setButtonClicked(!buttonClicked);
  };

  return (
    <div>
      <div className="row">
        <div className="col-6-sm">
          <select id="dropdownmenu">
            <option>Please select a breed</option>
            {dogBreeds.map((breed, uniqueId) => (
              <option key={uniqueId} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>

        <div className="col-6-sm">
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

        <div className="col-6-sm">
          <button id="click" onClick={handleButtonChange}>
            Click Random Image
          </button>
        </div>

        <div className="col-6-sm">
          <img
            src={subBreed.message}
            alt="random dog"
            style={{ width: "380px", height: "300px", objectFit: "cover" }}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default DogBreed;
