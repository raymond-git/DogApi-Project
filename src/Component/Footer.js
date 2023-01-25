function Footer() {
  return (
    <div>
      <div className="wrap5">
        <div className="footer overflow-x-hidden">
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
export default Footer;
