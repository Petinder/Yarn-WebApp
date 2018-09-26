import React from 'react';
import LoginForm from "../forms/LoginForm";
import firebase from 'firebase';


class LoginPage extends React.Component {
    submit = data => 
        this.props.login(data).then(() => this.props.history.push("/"));

    render(){
        return(
           <div>
            <br></br>
            <h1>Petynder</h1>
            <LoginForm submit={this.submit} />
           </div> 
        );
    }
}

export default LoginPage;