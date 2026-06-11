import React, { Component } from "react";
import LegacyHeader from "../../components/legacy_header/Header";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";

class LegacyHome extends Component {
  render() {
    console.log(this.props.theme);
    return (
      <div>
        <LegacyHeader theme={this.props.theme} />
        <Greeting theme={this.props.theme} />
        <Skills theme={this.props.theme} />
        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default LegacyHome;
