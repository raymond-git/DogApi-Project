import React, { useEffect, useState } from 'react';
// import axios from 'axios';

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const[dogBreeds, setDogBreeds] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  //Make a post request to the server frontend.js
  async function handleSubmit(event) {
    event.preventDefault();
      fetch("http://localhost:3002/login", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
        }),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch(() => {
        console.error('Something is wrong with your server');
      });
    }

  useEffect(() => {
     async function FetchDogData() {
       const dogBreed = await fetch("https://dog.ceo/api/breeds/list/all");
       const data = await dogBreed.json();
       
       //Get all of the object for the dogs
       const dogNames = Object.keys(data.message);
       setDogBreeds(dogNames);
      }

     FetchDogData();

    }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:{" "} <input type="text" onChange={handleNameChange} name="name" value={name}
        />
      </label>
      <br />
      <label>
        Email:{" "} <input type="email" onChange={handleEmailChange} name="email" value={email}
        />
      </label>
      <br />
      <input type="submit" value="Submit"></input>

      <select id="dropdownmenu">{dogBreeds.map((breed) => (<option key={breed.id} value={breed}>{breed}</option>))}</select>
    </form>
  );
}

export default SignupForm;