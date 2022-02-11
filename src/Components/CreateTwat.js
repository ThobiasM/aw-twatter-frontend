import React from "react";

class CreateTwat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        token: '',
        message: ''
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
    console.log(
      this.state
    );
  }

  async handleSubmit (event) {
    event.preventDefault();

    fetch(`http://localhost:3333/tweets/1`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${this.state.token}`
          },
        body: JSON.stringify({ message: this.state.message })
  })
}
componentDidMount () {
  console.log('CreateTwat mounted')
  const { history } = this.props;
        let token = localStorage.getItem('twatter_token');
        if(!token){
          history.push('/login')
        }
    return;
}

  render() {
    return (
      <form>
        <h1>CREATE TWAT!</h1>
        <form>
          <label>Username</label>
          <input name="username" onChange={this.handleInputChange.bind(this)} />
          <label>Password</label>
          <input name="password" onChange={this.handleInputChange.bind(this)} />
          <label>Secret Token</label>
          <input name="token" onChange={this.handleInputChange.bind(this)} />
          <label>Message</label>
          <input name="message" onChange={this.handleInputChange.bind(this)} />
          <button onClick={this.handleSubmit.bind(this)}>Post Twat!</button>
        </form>
      </form>
    );
  }
}

export default CreateTwat;
