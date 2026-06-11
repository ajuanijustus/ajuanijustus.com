import React, { Component } from "react";
import Header from "../../components/header/Header";
import Greeting from "./greeting/Greeting";
import News from "./news/News";
import Publications from "./publications/Publications";
import Teaching from "./teaching/Teaching";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";

class Home extends Component {
  render() {
    console.log(this.props.theme);
    return (
      <div>
        <Header theme={this.props.theme} />
        <Greeting theme={this.props.theme} />
        <News theme={this.props.theme} />
        <Publications theme={this.props.theme} />
        <Teaching theme={this.props.theme} />
        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Home;
