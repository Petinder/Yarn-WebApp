import React from 'react';
import { Form, Image, Container, Menu, } from 'semantic-ui-react';
import firebase from 'firebase';
import icono from './petinder.ico';
 
class VetForm extends React.Component {

    constructor() {
        super();
        this.state = {
            isMobile: window.innerWidth < 768,
            rootRef: firebase.database().ref().child('userVets'),
        };
    }
    
    updateIsMobile=() => {
        this.setState({
            isMobile: window.innerWidth < 768
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateIsMobile);


        const card = document.querySelector("#cardVets");
        card.innerHTML = "";

        this.state.rootRef.on('child_added', snapshot => {
            card.innerHTML += "<div class='ui orange fluid card'><div class='ui divided items'>"+
                                "<div class='item'>"+
                                    "<div class='image'>"+
                                    "<img src='"+snapshot.child('vetInfo/photo').val()+"' />"+
                                    "</div>"+
                                    "<div class='content'><br/>"+
                                    "<a class='header'>"+snapshot.child('services/clinicName').val()+"<br/>"+snapshot.child('vetInfo/name').val()+"</a>"+
                                    "<div class='meta'>"+
                                        "<span class='cinema'>Visítanos en "+snapshot.child('vetInfo/address').val()+"<br/>Contáctanos "+snapshot.child('services/clinicPhone').val()+" - "+snapshot.child('vetInfo/phone').val()+"</span>"+
                                    "</div>"+
                                    "<div class='description'>"+
                                    snapshot.child('services/vetDescription').val()+" Ofrecemos: "+snapshot.child('services/clinicAditionalServices').val()+
                                    "</div>"+
                                    "<div class='extra'>"+
                                        "<div class='ui green label' >"+snapshot.child('services/animalThatServes').val()+"</div>"+
                                        "<div class='ui blue label' >"+snapshot.child('experience/AditionalExpertise').val()+"</div>"+
                                    "</div>"+
                                    "</div>"+
                                "</div>"+
                                "</div></div>"

        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateIsMobile);
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            if (user) {             
                var key = "";
                firebase.database().ref('userPets').orderByChild('ownerInfo/mail').equalTo(user.email).once("value").then((snapshot) => {
                    if (snapshot.exists()){
                        console.log(snapshot.val());
                        snapshot.forEach((childSnapshot) => {
                            key = childSnapshot.key;
                            this.getUserId(key);
                        });
                    }
                })
            } else {
                window.location.pathname = '/login'
            }
        });
    }

    getUserId(key){
        this.setState({userId: key});
        console.log("User logged: " + key);
    }
    
    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Menu fixed='top' inverted color='yellow'>
                    <Container>
                        <Menu.Item as='a' header href = "/filter">
                        <Image size='mini' src={icono} style={{ marginRight: '1.5em' }} />
                        Petinder
                        </Menu.Item>
                        <Menu.Item position='right'>
                            <Menu.Item as='a'>
                                <a class="paw popup icon button" data-tooltip="Editar perfil" data-position="bottom right" href = "/profile" role="button">
                                <i class="paw icon" ></i>
                                </a>
                            </Menu.Item>
                            <Menu.Item as='a'>
                                <a class="syringe popup icon" data-tooltip="Historial de vacunas" data-position={ this.state.isMobile ? "bottom right" : "bottom center" } href = "/history" role="button">
                                <i class="syringe icon"></i>
                                </a>
                            </Menu.Item>
                            <Menu.Item as='a'>
                                <a class="signo popup icon button" data-tooltip="Cerrar sesión" data-position={ this.state.isMobile ? "bottom right" : "bottom left" } role="button" href = "/login" onClick={this.handleLogout}>
                                <i class="sign out alternate icon"></i>
                                </a>
                            </Menu.Item>
                        </Menu.Item>
                    </Container>
                </Menu>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div class='ui cards' id ='cardVets'> </div>
            </Form>
        );
    }
    
}

export default VetForm