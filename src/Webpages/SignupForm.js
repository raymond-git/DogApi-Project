import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRedirectLogin = () => {
    navigate("/login");
  };

 
  // Make a post request to the server frontend.js
  async function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:8080/signup", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Making sure previous error message is removed before new error message appeared
        document.getElementById("error-message").textContent = "";
        document.getElementById("error-message2").textContent = "";
        document.getElementById("error-message3").textContent = "";
        document.getElementById("error-message4").textContent = "";

        // Validate if email already exists in the MongoDB database by evaluating the 'error' property in the server's
        if (data.error === "Email already exists, try a new one") {
          const errorElement = document.getElementById("error-message");
          if (errorElement.childNodes.length === 0) {
            const errorMessage = document.createTextNode("Email already exists, try a new one");
            errorElement.append(errorMessage);
            errorElement.style.color = "red";
          }
        }

        // Validate if the provided email input is null by evaluating the 'error' property in the server's
        if (data.error === "Please enter an email") {
          const errorElement = document.getElementById("error-message2");
          if (errorElement.childNodes.length === 0) {
            const errorMessage = document.createTextNode("Please enter an email");
            errorElement.append(errorMessage);
            errorElement.style.color = "red";
          }
        }

        // Validate if the provided email and password input are null by evaluating the 'error' property in the server's
        if (data.error === "Please enter valid email and password") {
          const errorElement = document.getElementById("error-message3");
          if (errorElement.childNodes.length === 0) {
            const errorMessage = document.createTextNode("Please enter valid email and password");
            errorElement.append(errorMessage);
            errorElement.style.color = "red";
          }
        }

        // Validate if the provided password input is null by evaluating the 'error' property in the server's
        if (data.error === "Please enter a password") {
          const errorElement = document.getElementById("error-message4");
          if (errorElement.childNodes.length === 0) {
            const errorMessage = document.createTextNode("Please enter a password");
            errorElement.append(errorMessage);
            errorElement.style.color = "red";
          }
        }

        // If there are no errors, the user is successfully signed up
        if (data.status === "Success") {
          navigate("/login");
        }
        console.log(data);
      })
      .catch(() => {
        console.error("Something is wrong with your server");
      });
  }

  return (
    <div>
      <MDBContainer className="my-5 gradient-form">
        <MDBRow>
          <MDBCol col="6" className="mb-5  overflow-hidden">
            <div className="d-flex flex-column ms-5">
              <div className="logo-center">
                <img src="/doglogo.png" style={{ width: "185px" }} alt="logo" />
              </div>
              <p className="mt-24">Sign up a free account to browse a list of dogs</p>

              <Form className="mt-4" onSubmit={handleSubmit}>
                <span id="error-message"></span>
                <span id="error-message2"></span>
                <span id="error-message3"></span>
                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Username"
                  id="form1"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <span id="error-message4"></span>
                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Password"
                  id="form2"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div className="text-center pt-1 mb-5 pb-1">
                  <button className="mb-4 w-100 gradient-custom-2 signupButton">Sign Up</button>
                  <a className="text-muted" href="#!">Forgot password?</a>
                </div>
              </Form>

              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Have an account?</p>
                <MDBBtn
                  onClick={handleRedirectLogin}
                  outline
                  className="mx-2"
                  color="danger"
                >
                  Go to Login
                </MDBBtn>
              </div>
            </div>
          </MDBCol>

          <MDBCol col="6" className="mb-5">
            <div className="d-flex justify-content-center h-100">
              <img
                className="text-white px-3 py-4 p-md-5 mx-md-4 dog-images-responsive"
                id="dogHome"
                src="/dogHome.png"
                width="580"
                height="640"
                alt="dogimage"
              />
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default SignupForm;
