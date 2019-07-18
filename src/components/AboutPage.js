import React, { Component } from "react";

class AboutPage extends Component {
  componentDidMount() {
    document.body.style.cssText = "";
  }
  render() {
    return (
      <div className="about-page transition-item">
        <div className="About">
          <h1 className="About__text">To be continued</h1>
          <img src="/assets/images/to-be-continued.png" alt="about" />
        </div>
      </div>
    );
  }
}

export default AboutPage;
