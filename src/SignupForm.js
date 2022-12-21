import React, { useEffect, useState, } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';

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
    <div>
      {/* <form onSubmit={handleSubmit}>
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
      </form> */}

      <MDBContainer className="my-5 gradient-form">
        <MDBRow>
          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                  style={{ width: "185px" }}
                  alt="logo"
                />
                <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
              </div>

              <p>Please login to your account</p>

              <MDBInput
                wrapperClass='mb-4'
                placeholder='Username'
                id="form1"
                type="email"
                
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Password"
                id="form2"
                type="password"
              />

              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn className="mb-4 w-100 gradient-custom-2">
                 Log in
                </MDBBtn>
                <a className="text-muted" href="#!">
                  Forgot password?
                </a>
              </div>

              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Don't have an account?</p>
                <MDBBtn outline className="mx-2" color="danger">
                  Create New
                </MDBBtn>
              </div>
            </div>
          </MDBCol>

          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 class="mb-4">Find the type of dogs you want to see</h4>
                <p class="small mb-0">
                  Browsing through dogs on a website can be a fun and rewarding
                  experience. There are a wide variety of dogs available to
                  view, ranging from small toy breeds to large working breeds.
                  You can browse through different breeds to find the one that
                  best fits your lifestyle and personality.
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <select id="dropdownmenu">
        {dogBreeds.map((breed, uniqueId) => (
          <option key={uniqueId} value={breed}>
            {breed}
          </option>
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
    </div>
  );
}

export default SignupForm;