import React from "react";
import "./App.css";
import Feed from "./Components/Feed";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import UserTweets from "./Components/UserTweets";
import Header from "./Components/Header";
import SignUp from "./Components/SignUp";

import { HashRouter, Switch, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      twats: [],
      params: {},
      username: "",
      name: "",
    };
  }
  componentDidMount() {
    console.log("Component mounted");
  }

  render() {
    return (
      <HashRouter>
          <Header/>

          <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/tweets/:username" exact component={UserTweets} />
            <Route path='/signup' component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </Switch>
      </HashRouter>
    );
  }
}

export default App;
