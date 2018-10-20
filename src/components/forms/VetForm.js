import React from 'react';
import { Form, Button, FormField, Message, Header, Radio, FormRadio, Table,
    Image, Grid, Container, Menu, Icon, Card } from 'semantic-ui-react';
import firebase from 'firebase';

class VetForm extends React.Component {
    constructor() {
        super();
        this.state = {
            rootRef: firebase.database().ref().child('userVets'),
        };
      }
    
    componentDidMount() {
        const card = document.querySelector("#cardVets");
        card.innerHTML = "";

        this.state.rootRef.on('child_added', snapshot => {
            card.innerHTML += "<div class='ui card'>"+
                                "<div class='ui yellow fluid card'>"+
                                  "<div class='content'>"+
                                    "<img src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' class='ui mini right floated image' />"+
                                    "<div class='header'>"+snapshot.child('vetInfo/name').val()+"</div>"+
                                    "<div class='meta'>"+snapshot.child('services/clinicName').val()+"</div>"+
                                    "<div class='description'>"+snapshot.child('services/vetDescription').val()+
                                    "</div>"+
                                    "</div>"+
                                    "<div class='extra content'>"+
                                    "<div class='ui two buttons'>"+
                                    "<button class='ui green basic button' role='button'>Horarios</button>"+
                                    "<button class='ui orange basic button' role='button'>Mas información</button>"+
                                    "</div>"+
                                  "</div>"+
                                "</div>"+
                               "</div>"
        });
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Menu fixed='top' inverted color='yellow'>
                <Container>
                    <Menu.Item as='a' header href = "/filter">
                    <Image size='mini' src='https://firebasestorage.googleapis.com/v0/b/petinder-fc7b6.appspot.com/o/petinder.ico?alt=media&token=670db3dc-3bf1-452a-b8fd-5bdf83bc23d2' style={{ marginRight: '1.5em' }} />
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
        );
    }
}
export default VetForm;