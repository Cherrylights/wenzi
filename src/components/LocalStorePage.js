import React, { Component } from "react";

class LocalStorePage extends Component {
  componentDidMount() {
    document.body.style.cssText = "";
  }
  render() {
    return (
      <div className="local-store-page transition-item">
        <div className="LocalStore">
          <div className="LocalStore__info">
            <h3>Textile Museum of Canada</h3>
            <h4>For Exclusive Collection</h4>
            <div>
              <p>55 Centre Avenue, Toronto, Ontario, M5G 2H5</p>
              <p>(416) 599-5321</p>
              <p>info@textilemuseum.ca</p>
            </div>
          </div>
          <div className="LocalStore__info">
            <h3>Craft Ontario</h3>
            <h4>For Full Collection</h4>
            <div>
              <p>1106 Queen St. West, Toronto, Ontario, M6J 1H9</p>
              <p>(416) 921-1721</p>
              <p>shop@craftontario.com</p>
            </div>
          </div>
          <div className="LocalStore__info">
            <h3>KaKaFaFa Ideas</h3>
            <h4>For Girls Collection</h4>
            <div>
              <p>275 Dundas Street West, Toronto, ON M5T 3K1</p>
              <p>(647) 348-2880</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LocalStorePage;
