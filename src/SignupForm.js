import React, { useEffect, useState, } from 'react';

// import axios from 'axios';
function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dogBreeds, setDogBreeds] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

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
const fetchImage = async () => {
  const dog = await fetch("https://dog.ceo/api/breeds/list/all");
  const dogList = await dog.json();

  //Get all of the object for the dogs
  const dogNames = Object.keys(dogList.message);
  setDogBreeds(dogNames);
};

useEffect(() => {
  fetchImage();
}, []);



//Select Option and display image
const SelectBreed = async (event) => {
  const options = document.getElementById("dropdownmenu");
  const BreedValues = options.value;
  const dogImageUrl = `https://dog.ceo/api/breed/${BreedValues}/images/random`;
  const data = await fetch(dogImageUrl);
  const getDog = await data.json();

  setImageUrl(getDog.message);

  if (options != null) {
    options.addEventListener("change", (event) => SelectBreed(event));
  }

  return () => {
    if (options != null) {
      options.removeEventListener("change", (event) => SelectBreed(event));
    }
  };
};

useEffect(() => {
  SelectBreed();
});


  // Create a dropdown menu  
  // useEffect(() => {
  //    async function FetchDogData() {
  //      const dog = await fetch("https://dog.ceo/api/breeds/list/all");
  //      const dogList = await dog.json();
       
  //      //Get all of the object for the dogs
  //      const dogNames = Object.keys(dogList.message);
  //      setDogBreeds(dogNames);
  //     };
  //    FetchDogData();
  //   }, []);


    // useEffect(() => {
    //   const SelectBreed = async (event) => {
    //     const BreedValues = event.target.value;
    //     const dogImageUrl = `https://dog.ceo/api/breed/${BreedValues}/images/random`;
    //     const data = await fetch(dogImageUrl);
    //     const getDog = data.json();

    //     setImageUrl(getDog.message);
    //   };

    //   const options = document.getElementById("dropdownmenu");
    //   if (options != null) {
    //     options.addEventListener("change", SelectBreed);
    //   }

    //   return () => {
    //     if (options != null) {
    //       options.removeEventListener("change", SelectBreed);
    //     }
    //   };
    // }, []);

   
    //Trigger change when press on a breed
    // const options = document.getElementById('dropdownmenu');

    //  if (options != null) {
    //   options.addEventListener("change", async function () {
    //     const BreedValues = this.value;
    //     const dogImageUrl = `https://dog.ceo/api/breed/${BreedValues}/images/random`;
    //     const data = await fetch(dogImageUrl)
    //     const getDog = data.json();

    //     if (options.value === BreedValues) {
    //       const imageElement = document.createElement("img");
    //       imageElement.src = getDog.message;
        
    //       //Get the id from <img id="contain-image" src=""></img> and then execute
    //       const imgContainer = document.getElementById("contain-image");
          
    //       if (imgContainer.hasChildNodes()) {
    //         imgContainer.removeChild(imgContainer.lastChild);
    //       } else {
    //         // Add imageElement.src source to <img id="contain-image" src=""></img>
    //         // `.append()` basically add new elements to the end of an array. For example: let numbers = [1, 2, 3]; numbers.append(4); [1, 2, 3, 4]
    //         imgContainer.append(imageElement);
    //         document.getElementById("postImage").appendChild(imageElement);
    //       }
    //     }
    //   });
    //  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:{" "} <input type="text" name="name" value={name} onChange={handleNameChange} 
        />
      </label>
      <br />
      <label>
        Email:{" "} <input type="email" value={email} onChange={handleEmailChange} name="email" 
        />
      </label>
      <br />
      <input type="submit" value="Submit"></input>


      {/* <option key={uniqueId} value={breed}>{breed}</option> 
      This creates an option element with a key and value and set current elements to dogBreeds array [   ]*/}
      <select id="dropdownmenu">{dogBreeds.map((breed, uniqueId) => 
          (<option key={uniqueId} value={breed}>{breed}</option>))}
      </select>

      <img id="contain-image" src={imageUrl} style={{width: '300px', height: '300px', objectFit: 'cover'}} alt="dogImages"></img>
    </form>
  );
}

export default SignupForm;