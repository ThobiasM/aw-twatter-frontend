import React from "react";
import { API_URL } from "../config";

class UserTweets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      user_id: "",
      twats: [],
    };
  }

  getJSON(url) {
    console.log("getJSON running");
    return fetch(url).then((res) => res.json());
  }

  async getTweets(username) {
    console.log("getTweets running");
    console.log(username);
    const twats = await this.getJSON(
      `${API_URL}/tweets/${username}`
    );
    console.log(twats);
    this.setState({
      twats,
      username: twats[0].username,
      name: twats[0].name
    });
  }

  componentDidMount() {
    this.getTweets(`${this.props.match.params.username}`);
  }
  render() {
    return (
      <div>
        <h1>
          All TWATS made by {this.state.name} (@{this.state.username})
        </h1>
        <ul>
          {this.state.twats.map((twat) => {
            return (
              <li key={twat.id}>
                <h4>
                  {twat.name} (@{twat.username})
                </h4>
                <p>{twat.created_at}</p>
                <p>{twat.message}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default UserTweets;
