import React from 'react';
import firebase from 'firebase';
import { Button } from 'semantic-ui-react';

class LoginPage extends React.Component {
    //Manejar estados
    constructor (){
        super();
        this.state={
        //objeto
        user: null,
        pictures: []
    };
  }

    handleAuth(){
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(result => console.log(`${result.user.email} ha iniciado sesion`))
        .catch(error => console.log(`Error ${error.code}: ${error.message}`))
    }

    //Ciclo de vida
    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.props.history.push("/profile");
            }
          });
    }


    render(){
        return(
           <div>
            <br></br>
            <h1>Petynder</h1>
            <Button primary onClick={this.handleAuth}>Acceder</Button>
           </div> 
        );
    }
}

export default LoginPage;