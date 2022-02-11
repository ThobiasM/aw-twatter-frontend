import React from "react";

class Logout extends React.Component {

    componentDidMount(){
        const { history } = this.props;
        localStorage.removeItem('twatter_token');
        history.replace('/login');
    }
    render(){
        return(
            <h1>Logging out...</h1>
        )
    }
}

export default Logout;