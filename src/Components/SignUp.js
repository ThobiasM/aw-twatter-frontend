import React from "react";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      username: "",
      password: "",
    };
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { history } = this.props;

    await fetch("http://localhost:3333/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
      }),
    }).then((res) => res.json());

    history.push("/login");
  }

  render() {
    return (
      <div className="signupMain">
        <div className="signupContainer">
          <h1>Sign up to Twatter!</h1>
          <form className="signupForm">
            <div>
              <label>Name: </label>
              <input
                name="name"
                placeholder="What's your name, twat?"
                onChange={this.handleInputChange.bind(this)}
              />
            </div>
            <div>
              <label>Username: </label>
              <input
                name="username"
                placeholder="Pick a username. It's probably already taken.."
                onChange={this.handleInputChange.bind(this)}
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                name="password"
                type="password"
                placeholder="Pick a password"
                onChange={this.handleInputChange.bind(this)}
              />
            </div>
            <button onClick={this.handleSubmit.bind(this)}>Become a twat!</button>{" "}
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
