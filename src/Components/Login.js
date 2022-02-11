import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { getLoginToken } from "../services/getLoginToken";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputUsername: "",
      inputPassword: "",
    };
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
    console.log(
      typeof this.state.inputUsername,
      typeof this.state.inputPassword
    );
  }
  async handleLoginAttempt() {
    const { history } = this.props;

    // perform the actual login

    try {
      // 1. Make a POST request to /login in the API
      const { token } = await getLoginToken({
        username: this.state.inputUsername,
        password: this.state.inputPassword,
      });

      if (!token) {
        throw new Error("Unsuccessful login");
      }

      // 2. Store token in local storage
      localStorage.setItem("twatter_token", token);

      // 3. Redirect back to feed
      history.replace("/");
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="centered mainLogin">
        <form className="loginForm loginContainer">
          <div>
            <label>Username: </label>
            <input
              name="inputUsername"
              onChange={this.handleInputChange.bind(this)}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              name="inputPassword"
              onChange={this.handleInputChange.bind(this)}
            />
          </div>
          <div>
            <button
              className="loginBtn"
              onClick={this.handleLoginAttempt.bind(this)}
            >
              Log In!
            </button>
          </div>
          <div>
            <Link to="/signup">Not a member? Become a Twat today!</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
