import React from 'react';
import { Form, Button, FormField, Message, Header, Radio, FormRadio, Table,
<<<<<<< HEAD
    Image, Grid, Container, Menu, Icon, Divider, Transition, Progress, Input } from 'semantic-ui-react';
    import { DateInput } from 'semantic-ui-calendar-react';
    import Validator from 'validator';
    import InlineError from '../messages/InlineError';
    import propTypes from 'prop-types';
    import { Link } from 'react-router-dom';
    import firebase from 'firebase';
    import 'firebase/database';
=======
    Image, Grid, Container, Menu, Icon } from 'semantic-ui-react';
import icono from './petinder.ico';
import firebase from 'firebase';
>>>>>>> 3ff37fa438218ffed97366ef4a2aad3c4fbd1ecd

class HistForm extends React.Component {
    constructor () {
        super();
        this.state = {
            user: null,
            vaccineName: "",
            vetName: "",
            vaccineDate: "",
            photoURL: 'https://react.semantic-ui.com/images/wireframe/image.png',
            uploadValue: 0,
            visible: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

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

    handleUpload(event) {
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`fotosC/${file.name}`);
        const task = storageRef.put(file);
        task.on('state_changed', (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            this.setState({
                uploadValue: progress
            })
          }, (error) => {
            console.log('Error ', error.message);
          }, () => {
            task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                this.setState({photoURL: downloadURL, uploadValue: 100})
            });
          });
    }
      
    handleText(){
        const record = {
            vaccine:{
                Photo: this.state.photoURL,
                Name: this.state.data.vaccineName,
                Vet: this.state.data.vetName,
                Date: this.state.vaccineDate
            }
        }
        console.log(record)
        const dbRef = firebase.database().ref('userPets/' + this.state.userId +'/petInfo/petVaccinations');
        const Data = dbRef.push();
        Data.set(record);

    }
 
    onChange = e => 
    this.setState({ 
        data: { ...this.state.data, [e.target.name]: e.target.value } 
    })

    handleChange = (e, { name, value }) => {
        this.setState({ [name] : value });
    }
    

    validate = (data) => {
        const errors = {};
        if (Validator.isEmpty(data.vaccineName)) errors.vaccineName = "Debe ingresar un nombre";
        return errors;
    };


    render() {

        const { visible } = this.state
        const { vaccineName } = this.state.vaccineName;
        const { vetName } = this.state.vetName;

        return (
            <Form>
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

            <Table.Footer fullWidth>
                <Table.Row>
                    <Table.HeaderCell colSpan='4'>
                        <Button content={visible ? 'Hide' : 'Show'} onClick={this.toggleVisibility} floated='right' icon labelPosition='left' color='yellow' size='small'>
                            <Icon name='syringe' /> Agregar Vacuna
                        </Button>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
        <Divider hidden />
            <Transition visible={visible} animation='scale' duration={500}>
                
            <Grid columns={3} divided>
                <Grid.Column width={5.5}>
                    <br></br>
                    <Header as='h3' align="center">Comprobante</Header>

                    <div position="centered">  
                        <Image width="250" src={this.state.photoURL} centered />
                        <br/>
                        <div class="ui yellow progress">
                        <Progress value={this.state.uploadValue} total='100' progress />
                        </div>
                        <Input type="file" onChange={this.handleUpload} class="inputfile" id="InputPhoto"/>
                    </div>
                    
                </Grid.Column>
                <Grid.Column width={6}>
                <br></br>
                <Header as='h3' align="center">Datos Vacuna</Header>                    
                    <FormField>
                        <label htmlFor="petName">Nombre</label>
                        <input 
                        type="text" 
                        id="vaccineName" 
                        name="vaccineName" 
                        placeholder="Nombre"
                        value={vaccineName}
                        onChange={this.onChange}/>
                    </FormField>
                    <br></br>
                    <Grid columns='equal'>
                    </Grid>
                    <DateInput
                        fluid
                        label="Fecha de vacunación"
                        name="vaccineDate"
                        placeholder = "Fecha de Subida"
                        value={this.state.vaccineDate}
                        onChange={this.handleChange} 
                    />
                </Grid.Column>
                <Grid.Column width={4}>
                <br></br>
                    <Header as='h3' align="center">Datos del Veterinario</Header>
                    <FormField>
                        <label htmlFor="petName">Nombre</label>
                        <input 
                        type="text" 
                        id="vetName" 
                        name="vetName" 
                        placeholder="Nombre"
                        value={vetName}
                        onChange={this.onChange}/>
                    </FormField>
                    <Button onClick={this.handleText} primary>Registrar</Button>
                    <br/>
                </Grid.Column>
                </Grid>
            </Transition>
    </Form>
        );
    }
}
export default HistForm;