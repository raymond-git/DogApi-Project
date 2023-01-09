import React, { } from "react";
import NavBar from "./Component/NavBar";

function Home() {
  return (
    <div>
      <div className="container" id="container">
       {/* Navbar links calling from Component/Navbar.js */}
        <NavBar></NavBar> 
        <div className="wrap2">
          <div className="row">
            <div className="col-sm">
              <div className="mainTitle">
                We care about dogs as much as you do.
              </div>
              <div className="title-description">
                Join now to browse through a selection of popular dogs breeds
                and choose your favorite
              </div>
              <div className="buttonPadding">
                <button className="browseButton">Browse Dogs</button>
                <button className="learnMoreButton">Learn More</button>
              </div>
            </div>
            <div className="col-sm">
              <img
                className="main-Image"
                src="/holdingDog.png"
                alt="holding a dog"
              ></img>
            </div>
          </div>
        </div>

        <div className="wrap3">
          <div className="sub-title">Why we're here?</div>
          <p className="sub-description">
            People can visit our dog breed website that features random images
            of dogs for many reasons. Some people may simply enjoy looking at
            pictures of dogs, as they find them cute and endearing. Others may
            be looking for inspiration or ideas for a specific breed of dog that
            they are interested in adopting. For example, a person might visit a
            website with random images of dogs to get a better sense of what a
            particular breed looks like in terms of size, coat color, and
            overall appearance. Additionally, a website with random images of
            dogs could be a fun way to pass the time and take a break from other
            tasks or responsibilities. Overall, a website with random images of
            dogs can provide enjoyment, education, and inspiration for people
            who are interested in these beloved animals. That is why we created
            this page. Let us know why you like to be here?
          </p>
        </div>

        <div className="wrap4">
          <div className="sub-title2">Dog Images</div>
          <div id="dogImages-padding" className="row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-sm">
              <div className="dog-Image-Border">
                <img
                  className="dog-Image mx-auto d-block "
                  src="/dog1.png"
                  alt="holding a dog"
                ></img>
                <p className="dog-Description">
                  Hi, I am Dolby. I enjoy engaging in a variety of activities,
                  such as playing in the mud and fetching objects. Wanna be
                  friends?
                </p>
              </div>
            </div>
            <div className="col-sm">
              <div className="dog-Image-Border2">
                <img
                  className="dog-Image2 mx-auto d-block"
                  src="/dog2.png"
                  alt="holding a dog"
                ></img>
                <p className="dog-Description2">
                  Hi, my name is Laffy. My favorite things to do include eating,
                  sleeping and snuggling with my mom. We do that all the time.
                </p>
              </div>
            </div>
            <div className="col-sm">
              <div className="dog-Image-Border3">
                <img
                  className="dog-Image3 mx-auto d-block"
                  src="/dog3.png"
                  alt="holding a dog"
                ></img>
                <p className="dog-Description3">
                  Hello, I am Bun. I enjoy spending my days lounging at home and
                  indulging in my favorite treats, like beef jerky. Want some?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap5">
        <div className="footer">
          <div id="footer-padding" className="row">
            <div className="col-sm">
              <div className="footer-border">
                <div className="footer-mainBorder">
                  <div className="footer-title">dogBreed</div>
                  <img className="footer-logo" src="/doglogo.png" alt=""></img>
                </div>

                <div className="footer-subtitleBorder">
                  <p className="footer-lorem">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent in vestibulum elit, ac aliquam elit. Suspendisse
                    facilisis neque sed ipsum cursus tempus. Suspendisse
                  </p>
                </div>
                <div className="footer-socialMedia">
                  <a
                    href="https://www.facebook.com/"
                    className="fa fa-facebook"
                    aria-label="Facebook"
                  >
                    {""}
                  </a>
                  <a
                    href="https://www.instagram.com/"
                    className="fa fa-instagram"
                    aria-label="Instagram"
                  >
                    {""}
                  </a>
                  <a
                    href="https://twitter.com/i/flow/login"
                    className="fa fa-twitter"
                    aria-label="Twitter"
                  >
                    {""}
                  </a>
                  <a
                    href="https://www.linkedin.com/"
                    className="fa fa-linkedin"
                    aria-label="LinkedIn"
                  >
                    {""}
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm">
              <div className="footer-border2">
                <a href="/explore">Explore</a>
                <a href="/help center">Help Center</a>
                <a href="/platform">Platform</a>
              </div>
            </div>

            <div className="col-sm">
              <div className="footer-border3">
                <a href="/article">Article</a>
                <a href="/resources">Resources</a>
                <a href="/termofuse">Term of Use</a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <hr className="horizontal-line" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
