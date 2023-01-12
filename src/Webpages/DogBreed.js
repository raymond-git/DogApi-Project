import React, { useEffect, useState } from "react";
import NavBarLogged from "../Component/NavBarLogged";
import Footer from "../Component/Footer";

function DogBreed() {
  // Get all list of dog names for option dropdown menu
  const [dogBreeds, setDogBreeds] = useState([]);
  const fetchDog = async () => {
    try {
      const res = await fetch("https://dog.ceo/api/breeds/list/all");
      const data = await res.json();
      const getBreed = Object.keys(data.message);
      setDogBreeds(getBreed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDog();
  }, []);
  //--------------------------------------------------------


  // Populate dog once image is selected
  const [dogImages, setDogImages] = useState([]);
  const fetchDogImage = (BreedName) => {
    try {
      fetch(`https://dog.ceo/api/breed/${BreedName}/images/random/12`) // The /3 is populating 3 images per row
        .then((response) => response.json())
        .then((getData) => {
          setDogImages(getData.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handler = (event) => {
    const BreedName = event.target.value;
    fetchDogImage(BreedName);
  };

  useEffect(() => {
    const options = document.getElementById("dropdownmenu");
    if (options != null) {
      options.addEventListener("change", handler);

      return () => {
        options.removeEventListener("change", handler);
      };
    }
  });
  //--------------------------------------------------------

  // Get random images when click button
  const [subBreed, setSubBreed] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random/12")
      .then((response) => response.json())
      .then((getSubBreed) => {
        setSubBreed(getSubBreed.message);
      });
  }, [buttonClicked]);

  const handleButtonChange = () => {
    setButtonClicked(!buttonClicked);
  };

  //--------------------------------------------------------

  return (
    <div>
      <div className="container" id="container">
        {/* Navbar links calling from Component/Navbar.js */}
        <NavBarLogged></NavBarLogged>
        <div className="dogBreed-title">Welcome to the dog World</div>
        <div className="option-wrap grid md:grid-cols-1 flex items-center justify-center text-center">
          <div className="row">
            <div className="col-sm">
              <select id="dropdownmenu">
                <option>Please select a breed</option>
                {dogBreeds.map((dogBreed, uniqueId) => (
                  <option key={uniqueId} value={dogBreed}>
                    {dogBreed}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-sm">
              <button
                className="randomImageButton"
                onClick={handleButtonChange}
              >
                Generate random images{" "}
              </button>
            </div>
          </div>
        </div>

        <div className="position-dog">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {dogImages.map((dogImage, uniqueId2) => (
              <img
                id="contain-image"
                src={dogImage}
                key={uniqueId2}
                style={{ width: "345px", height: "354px", objectFit: "cover" }}
                alt="Dog Images"
              ></img>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {subBreed.map((breed, uniqueId3) => (
            <img
              src={breed}
              key={uniqueId3}
              alt="random dog"
              style={{ width: "380px", height: "300px", objectFit: "cover" }}
            ></img>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default DogBreed;
