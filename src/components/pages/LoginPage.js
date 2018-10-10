import React from 'react';
import firebase from 'firebase';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Form
  } from 'semantic-ui-react'

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
                this.props.history.push("/filter");
            }
          });
    }


    render(){
        return(
            <div class="ui inverted vertical center aligned segment" style={{ minHeight: 550, padding: '1em 0em' }}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Container text textAlign='center' vertical>
                    <Header
                    as='h1'
                    content='Petinder'
                    inverted
                    />
                    <Header
                    as='h2'
                    content='¡Conectando mascotas!'
                    inverted
                    />
                <Button color="orange" onClick={this.handleAuth}>Regístrate</Button>
                </Container>
            </div>
        );
    }
}

export default LoginPage;