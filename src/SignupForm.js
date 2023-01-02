import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Make a post request to the server frontend.js
  async function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3002/signup", {
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
          <MDBCol col="6" className="mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img src="/doglogo.png" style={{ width: "185px" }} alt="logo" />
                {/* <h4 className="mt-1 mb-5 pb-1">We are dog lovers</h4> */}
              </div>

              <p>Sign up a free account to browse a list of dogs</p>

              <Form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Username"
                  id="form1"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />

                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Password"
                  id="form2"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />

                <div className="text-center pt-1 mb-5 pb-1">
                  <button className="mb-4 w-100 gradient-custom-2 signupButton">
                    Sign Up
                  </button>
                  <a className="text-muted" href="#!">
                    Forgot password?
                  </a>
                </div>
              </Form>
            </div>
          </MDBCol>

          <MDBCol col="6" className="mb-5">
            <div className="d-flex justify-content-center h-100 mb-4">
              <img
                className="text-white px-3 py-4 p-md-5 mx-md-4"
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
