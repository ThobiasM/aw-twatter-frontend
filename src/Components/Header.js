import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      token: "",
      payload: {},
    };
  }

  componentDidMount() {
    console.log("Header mounted");
  }
  render() {
    return (
      <header className="header">
        <Link to="/">
          <h1>Twatter</h1>
        </Link>

        <Link to={"/logout"} className='logout'>Log Out.. </Link>
      </header>
    );
  }
}

export default Header;
