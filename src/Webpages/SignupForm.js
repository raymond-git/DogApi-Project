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
    navigate("/login")
  }

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
        if(data.status === "Success"){
          navigate('/login')
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
                {/* <h4 className="mt-1 mb-5 pb-1">We are dog lovers</h4> */}
              </div>

              <p className="mt-24">Sign up a free account to browse a list of dogs</p>

              <Form className="mt-4" onSubmit={handleSubmit}>
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

              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Have an account?</p>
                <MDBBtn onClick={handleRedirectLogin} outline className="mx-2" color="danger">
                  Go to Login
                </MDBBtn>

              </div>
            </div>
          </MDBCol>

          <MDBCol col="6" className="mb-5">
            <div className="d-flex justify-content-center h-100 mb-4">
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
