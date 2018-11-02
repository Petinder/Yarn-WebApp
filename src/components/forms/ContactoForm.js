import React from 'react';
import { Form, Image, Grid, Container, Menu } from 'semantic-ui-react';
import firebase from 'firebase';
import icono from './petinder.ico';

class ContactoForm extends React.Component {
    constructor() {
        super();
        this.state = {
            rootRef: firebase.database().ref().child('admins'),
        };
      }

    componentDidMount() {
        const card = document.querySelector("#cardAdmins");

        this.state.rootRef.on('child_added', snapshot => {
            card.innerHTML += "<div class='ui centered card'>"+
                            "<div class='content'>"+
                            "<img src='" + snapshot.child('photo').val()+"'"+
                                "class='ui medium right floated image'/>"+
                            "<div class='header'>" + snapshot.child('alias').val() + "</div>"+
                            "<div class='meta'>" + snapshot.child('job').val()+"</div>"+
                            "<div class='description'>Estoy a cargo del <strong>"+
                                snapshot.child('department').val() +"</strong>. Puedes contactarme al siguiente número: "+ snapshot.child('contacto').val()+
                            "</div></div>"+
                            "</div>"
        });
    }

    render() {
        return (
            <Form>
                <Menu fixed='top' inverted color='yellow'>
                <Container>
                    <Menu.Item as='a' header href = "/login">
                    <Image size='mini' src={icono} style={{ marginRight: '1.5em' }} />
                    Petinder
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Menu.Item as='a'>
                            <a class="signo popup icon button" data-tooltip="Regresar al inicio" data-position="bottom right" role="button" active href = "/login">
                            <i class="home icon"></i>
                            </a>
                        </Menu.Item>
                    </Menu.Item>
                </Container>
                </Menu>
                <Grid>
                <Grid.Column width={0}>
                    <br/><br/><br/><br/>
                    <div class='ui cards' id ='cardAdmins'>
                    </div>
                </Grid.Column>
                </Grid>
            </Form>
        );
    }
}
export default ContactoForm;