import React, { Component } from "react";
import { BrowserView, MobileView, TabletView } from "react-device-detect";
import HomeContentDesktop from "../HomeContentDesktop";
import HomeContentMobile from "../HomeContentMobile";

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserView>
          <HomeContentDesktop></HomeContentDesktop>
        </BrowserView>
        <TabletView>
          <HomeContentMobile></HomeContentMobile>
        </TabletView>
        <MobileView>
          <HomeContentMobile></HomeContentMobile>
        </MobileView>
      </React.Fragment>
    );
  }
}

export default HomePage;
