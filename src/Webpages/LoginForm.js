import React, { useState, useEffect } from "react";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  const [token, setToken] = useState(null);
  useEffect(() => {
    const tokenFromCookies = Cookies.get('token');
    setToken(tokenFromCookies);
  }, []);

  // Make a post request to the server frontend.js
  async function handleSubmit(event) {
    event.preventDefault();
    fetch("https://admirable-salmiakki-5da3da.netlify.app/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`//Authenticate user and then pass the token to the server
      },
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.error) {
          navigate("/login");
        } else {
          if (data.authenticated) {
            navigate("/welcome");
          }
        }

        // Validate client side login form
        if (data.error === "Please enter a valid email and password") {
          const errorElement = document.getElementById("error-message");
          if (errorElement.childNodes.length === 0) { // If the length of child nodes is 0, it means that the error message is not present and it appends the error message.
            const errorMessage = document.createTextNode("Please enter a valid email and password");
            errorElement.appendChild(errorMessage);
            errorElement.style.color = "red";
          }
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
          <MDBCol col="6" className="mb-5 overflow-hidden">
            <div className="d-flex flex-column ms-5">
              <div className="logo-center">
                <img src="/doglogo.png" style={{ width: "185px" }} alt="logo" />
              </div>
              <p className="mt-24">Please login to your account</p>

              <Form className="mt-4" onSubmit={handleSubmit}>
                <span id="error-message"></span>
                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Username"
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />

                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />

                <div className="text-center pt-1 mb-5 pb-1">
                  <button className="mb-4 w-100 gradient-custom-2 loginButton">Log in</button>
                  <a className="text-muted" href="#!">Forgot password?</a>
                </div>
              </Form>
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Don't have an account?</p>
                <MDBBtn
                  onClick={handleCreateAccount}
                  outline
                  className="mx-2"
                  color="danger"
                >
                  Create Account
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

export default LoginForm;
