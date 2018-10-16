import React from 'react';
import { Form, Button, FormField, Message, Header, Radio, FormRadio, Table,
    Image, Grid, Container, Menu, Icon } from 'semantic-ui-react';

class HistForm extends React.Component {

    render() {
        return (
            <Form>
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
                            <a class="userm popup icon" data-tooltip="Directorio de veterinarios" data-position="bottom left" href = "/Vet" role="button">
                            <i class="user md icon"></i>
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

                <Table celled striped color="yellow" key="yellow" >
                    <Table.Header>
                    <Table.Row>   
                        <Table.HeaderCell>Comprobante</Table.HeaderCell>
                        <Table.HeaderCell>Vacuna</Table.HeaderCell>
                        <Table.HeaderCell>Veterinario</Table.HeaderCell>
                        <Table.HeaderCell>Fecha</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    <Table.Row>
                        <Table.Cell collapsing singleLine>
                        <Icon name='file outline' /> rabia_200.png
                        </Table.Cell>
                        <Table.Cell>Rabia</Table.Cell>
                        <Table.Cell>Javier Argueta</Table.Cell>
                        <Table.Cell collapsing textAlign='right'>
                        20/03/200
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell singleLine>
                        <Icon name='file outline' /> parvovirus_2017.png
                        </Table.Cell>
                        <Table.Cell>Parvovirus</Table.Cell>
                        <Table.Cell>Carrillo Palvet</Table.Cell>
                        <Table.Cell textAlign='right'>15/10/2017</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell singleLine>
                        <Icon name='file outline' /> polivalente_2018.png
                        </Table.Cell>
                        <Table.Cell>Polivalente</Table.Cell>
                        <Table.Cell>Lopez Dogtors</Table.Cell>
                        <Table.Cell textAlign='right'>12/12/2018</Table.Cell>
                    </Table.Row>
                    </Table.Body>
                </Table>
            </Form>
        );
    }
}
export default HistForm;