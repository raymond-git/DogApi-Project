import React, { useState, useEffect } from "react";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { Amplify, API } from 'aws-amplify';


// Amplify.configure({
//   Auth: {
//     region: 'us-west-2',
//     userPoolId: 'us-west-2_8huwQtHxw',
//     userPoolWebClientId: 'a3oem26tu2b9iavd825ed19m95q',
//   },
//   API: {
//     endpoints: [
//       {
//         name: "REST API",
//         endpoint: "https://p4z38ggupb.execute-api.us-west-2.amazonaws.com/dev",
//         region: "us-west-2"
//       },
//     ]
//   }
// });

Amplify.configure({
  aws_cloud_logic_custom: [
    {
      Auth: {
        region: 'us-west-2',
        userPoolId: 'us-west-2_8huwQtHxw',
        userPoolWebClientId: 'a3oem26tu2b9iavd825ed19m95q',
      }
    },
    {
      name: 'REST API', // (required) - API Name (This name is used used in the client app to identify the API - API.get('your-api-name', '/path'))
      endpoint: 'https://p4z38ggupb.execute-api.us-west-2.amazonaws.com/dev', // (required) -API Gateway URL + environment
      region: 'us-west-2' // (required) - API Gateway region
    }
  ]
});


function LoginForm(event) {
  event.preventDefault();
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

  

  async function handleSubmit(event) {
  event.preventDefault();

  const apiName = 'Rest API';
  const path = '/login';
  const myInit = {
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    response: true,
  };


  API.post(apiName, path, myInit)
  .then((response) => {
    // Validate client side login form
    if (response.error) {
      const errorElement = document.getElementById("error-message");
      errorElement.innerHTML = response.error;
      errorElement.style.color = "red";
      errorElement.style.display = "block";
      navigate("/login");
    } else {
      if (response.authenticated) {
        navigate("/welcome");
        console.log("success")
      }
    }
  })
  .catch((error) => {
    console.log(error);
  });
}


  // Make a post request to the server frontend.js
  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   // fetch("https://www.dogbrowsing.com/login", {
  //     fetch("https://p4z38ggupb.execute-api.us-west-2.amazonaws.com/dev/login", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email: email,
  //       password: password,
  //     }),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`//Authenticate user and then pass the token to the server
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {

  //       // Validate client side login form
  //       if (data.error) {
  //         const errorElement = document.getElementById("error-message");
  //         errorElement.innerHTML = data.error;
  //         errorElement.style.color = "red";
  //         errorElement.style.display = "block";
  //         navigate("/login");
  //       } else {
  //         if (data.authenticated) {
  //           navigate("/welcome");
  //           console.log("successs")
  //         }
  //       }
  //       console.log(data);
  //     })
  //     .catch(() => {
  //       console.error("Something is wrong with your server");
  //     });
  // }

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
              <span className="error" id="error-message"></span>
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
