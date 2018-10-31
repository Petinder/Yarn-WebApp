import React from 'react';
import { Form, Button, FormField, Message, Header, Radio, FormRadio, Table,
  Responsive, Visibility, Image, Grid, Container, Menu, Icon, Modal } from 'semantic-ui-react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import icono from './petinder.ico';


const HomepageHeading = ({ mobile }) => (
    <Container text>
        
    </Container>
)

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
}


class DesktopContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            rootRef: firebase.database().ref().child('userVets'),
        };
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

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    getUserId(key){
        this.setState({userId: key});
        console.log("User logged: " + key);
    }

    
    componentDidMount() {
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

    render() {
        const { children } = this.props
        return (
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
            >
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
                            <a class="syringe popup icon" data-tooltip="Historial de vacunas" data-position="bottom center" href = "/history" role="button">
                            <i class="syringe icon"></i>
                            </a>
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <a class="signo popup icon button" data-tooltip="Cerrar sesión" data-position="bottom left" role="button" href = "/login" onClick={this.handleLogout}>
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
            </Visibility>

            {children}
            </Responsive>
        );
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

class MobileContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            rootRef: firebase.database().ref().child('userVets'),
        };
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

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    getUserId(key){
        this.setState({userId: key});
        console.log("User logged: " + key);
    }

    
    componentDidMount() {
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

    render() {
        const { children } = this.props
        return (
            <Responsive minWidth={Responsive.onlyMobile.minWidth}>
            <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
            >
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
                            <a class="syringe popup icon" data-tooltip="Historial de vacunas" data-position="bottom center" href = "/history" role="button">
                            <i class="syringe icon"></i>
                            </a>
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <a class="signo popup icon button" data-tooltip="Cerrar sesión" data-position="bottom left" role="button" href = "/login" onClick={this.handleLogout}>
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
                
                <br></br>
            </Form>
            </Visibility>

            {children}
            </Responsive>
        );
    }
} 

MobileContainer.propTypes = {
    children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
    <div>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </div>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

const VetForm = () => (
<ResponsiveContainer>
</ResponsiveContainer>
)

export default VetForm;