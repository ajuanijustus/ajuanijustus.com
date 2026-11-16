import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Greeting from "./greeting/Greeting";
import News from "./news/News";
import Publications from "./publications/Publications";
import Teaching from "./teaching/Teaching";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";

class Home extends Component {
  render() {
    return (
      <div>
        <Header theme={this.props.theme} />
        <Greeting theme={this.props.theme} />
        <News theme={this.props.theme} limit={6} />
        <Publications theme={this.props.theme} />
        <Teaching theme={this.props.theme} />
        <div className="home-more-links">
          <Link to="/research/" style={{ color: this.props.theme.highlight }}>
            More on my research →
          </Link>
          <Link to="/teaching/" style={{ color: this.props.theme.highlight }}>
            Teaching & outreach →
          </Link>
        </div>
        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Home;
