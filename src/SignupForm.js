import React, { useEffect, useState, } from 'react';

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };



  // Make a post request to the server frontend.js
  async function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3002/login", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch(() => {
        console.error("Something is wrong with your server");
      });
  }



//Create Dropdown Menu
const [dogBreeds, setDogBreeds] = useState([]);
const fetchImage = async () => {
  const dog = await fetch("https://dog.ceo/api/breeds/list/all");
  const dogList = await dog.json();

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

useEffect(() => {
  fetchImage();
}, []);



//Select Option and display image to browser
const [imageUrl, setImageUrl] = useState([]);
const SelectBreed = async (event) => {
  const BreedValues = event.target.value;
  const dogImageUrl = `https://dog.ceo/api/breed/${BreedValues}/images/random`;
  const data = await fetch(dogImageUrl);
  const getDog = await data.json();
  setImageUrl(getDog.message);
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


  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:{" "}
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <br />
      <label>
        Email:{" "}
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          name="email"
        />
      </label>
      <br />
      <input type="submit" value="Submit"></input>

      {/* <option key={uniqueId} value={breed}>{breed}</option> 
      This creates an option element with a key and value and set current elements to dogBreeds array [   ]*/}
      <select id="dropdownmenu">
        {dogBreeds.map((breed, uniqueId) => (
          <option key={uniqueId} value={breed}> {breed} </option>
        ))}
      </select>

      {[imageUrl].map((specificImage) => (
        <img
          id="contain-image"
          key={specificImage}
          src={specificImage}
          style={{ width: "300px", height: "300px", objectFit: "cover" }}
          alt="dogImages"
        ></img>
      ))}
    </form>
  );
}

export default SignupForm;