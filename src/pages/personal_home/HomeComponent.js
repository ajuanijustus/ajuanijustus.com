import React, { Component } from "react";
import PersonalHeader from "../../components/personal_header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";

class PersonalHome extends Component {
  render() {
    console.log(this.props.theme);
    return (
      <div>
        <PersonalHeader theme={this.props.theme} />
        You've unlocked secrets. Congrats.
        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default PersonalHome;
