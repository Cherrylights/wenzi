import React, { Component } from "react";

class AboutPage extends Component {
  componentDidMount() {
    document.body.style.cssText = "";
  }
  render() {
    return (
      <div className="about-page transition-item">
        <div className="About">
          <div className="About__text">
            <div>
              <h1>About Wenzi</h1>
              <p>
                I am Wenzi Li, a Toronto based textile artist holds MFA in
                Interdisciplinary Master’s in Art, Media and Design Program at
                OCAD University. I identify and position my textile work in a
                historical and contemporary context as a Chinese female living
                in Toronto immersed by both eastern and western cultures to
                explore my Asian identity in this multi-culture community. My
                silk art were developing from my unique textile design method
                that derived from the motifs of traditional Chinese needlework.
              </p>
            </div>
          </div>
          <div className="About__photo">
            <img src="/assets/images/wenzi.png" alt="wenzi" />
          </div>
        </div>
      </div>
    );
  }
}

export default AboutPage;
