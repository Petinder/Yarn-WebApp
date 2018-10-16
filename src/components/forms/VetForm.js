import React from 'react';
import { Form, Button, FormField, Message, Header, Radio, FormRadio, Table,
    Image, Grid, Container, Menu, Icon, Card } from 'semantic-ui-react';

class VetForm extends React.Component {

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


                <Card.Group>
                    <Card color='yellow'>
                    <Card.Content>
                        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
                        <Card.Header>Javier Argueta</Card.Header>
                        <Card.Meta>PALVET</Card.Meta>
                        <Card.Description>
                        El mejor lugar para curar a tu mascota.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                        <Button basic color='green'>
                            Horarios
                        </Button>
                        <Button basic color='yellow'>
                            Más información
                        </Button>
                        </div>
                    </Card.Content>
                    </Card>
                    <Card color='yellow'>
                    <Card.Content>
                        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                        <Card.Header>Carrillo Palvet</Card.Header>
                        <Card.Meta>Hospital veterinario</Card.Meta>
                        <Card.Description>
                        Estamos para servir a tu mascota.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                        <Button basic color='green'>
                            Horarios
                        </Button>
                        <Button basic color='yellow'>
                            Más información
                        </Button>
                        </div>
                    </Card.Content>
                    </Card>
                    <Card color='yellow'>
                    <Card.Content>
                        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
                        <Card.Header>Lopez Dogtors</Card.Header>
                        <Card.Meta>Veterinaria, Dres. Bobadilla</Card.Meta>
                        <Card.Description>Más que una veterinaria, somos tu familia.</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                        <Button basic color='green'>
                            Horarios
                        </Button>
                        <Button basic color='yellow'>
                            Más información
                        </Button>
                        </div>
                    </Card.Content>
                    </Card>
                </Card.Group>
            </Form>
        );
    }
}
export default VetForm;