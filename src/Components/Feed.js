import React from "react";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      twats: [],
      payload: {},
    };
  }

  getJSON(url) {
    console.log("getJSON running");
    return fetch(url).then((res) => res.json());
  }

  async getTweets() {
    console.log("getTweets running");
    const twats = await this.getJSON(`${API_URL}/tweets`);
    this.setState({
      twats,
    });
    console.log(this.state);
  }

  handleInputChange(event) {
    this.setState({
      message: event.target.value,
    });
    console.log(this.state);
  }

  async handleSubmit() {
    await fetch(`${API_URL}/tweets/${this.state.payload.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("twatter_token")}`,
      },
      body: JSON.stringify({ message: this.state.message }),
    });
    this.setState({ message: "" });
    window.location.reload(false);
  }

  componentDidMount() {
    console.log("Feed mounted");
    const { history } = this.props;
    let token = localStorage.getItem("twatter_token");
    if (!token) {
      return history.replace("/login");
    }
    console.log(token);
    const payload = jwtDecode(token);
    console.log(payload);
    this.setState({ payload });

    this.getTweets();
  }

  render() {
    const allTweets = this.state.twats.map((twat) => {
      return (
        <li key={twat.id}>
          <h4>
            {twat.name} (
            <Link to={`/tweets/${twat.username}`}>@{twat.username}</Link>)
          </h4>
          <p>{twat.created_at}</p>
          <p>{twat.message}</p>
        </li>
      );
    });
    return (
      <div>
        <form className="createTwat">
          <input
            placeholder="What's on your mind, twat?"
            className="createTwatField"
            onChange={this.handleInputChange.bind(this)}
            value={this.state.message}
          />
          <button className="postTwat" onClick={this.handleSubmit.bind(this)}>
            Post Twat!
          </button>
        </form>
        <h1 className="feedTitle">
          Feed for {this.state.payload.name} (@{this.state.payload.username})
        </h1>
        <ul>{allTweets}</ul>
      </div>
    );
  }
}

export default Feed;
