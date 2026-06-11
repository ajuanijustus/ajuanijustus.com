import React, { Component } from "react";
import Header from "../../components/personal_header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";

class PersonalHome extends Component {
  render() {
    console.log(this.props.theme);
    return (
      <div>
        <Header theme={this.props.theme} />
        hbfd
        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default PersonalHome;
