import React from 'react';
import { Form, Button, FormField, Header, Table, Segment,
    Image, Grid, Container, Menu, Icon, Divider, Transition, Progress, Label} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import Validator from 'validator';
import firebase from 'firebase';
import 'firebase/database';
import icono from './petinder.ico';

class HistForm extends React.Component {
    constructor () {
        super();
        this.state = {
            user: null,
            isMobile: window.innerWidth < 768,
            vaccineName: "",
            vetName: "",
            vaccineDate: "",
            photoURL: 'https://react.semantic-ui.com/images/wireframe/image.png',
            photoName: "",
            uploadValue: 0,
            visible: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    updateIsMobile=() => {
        this.setState({
            isMobile: window.innerWidth < 768
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateIsMobile);
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
        this.llenarTabla();
    }

    handleUpload(event) {
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`fotosC/${file.name}`);
        const task = storageRef.put(file);
        task.on('state_changed', (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue: progress
            })
          }, (error) => {
            console.log('Error ', error.message);
          }, () => {
            task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                this.setState({photoURL: downloadURL, photoName: file.name, uploadValue: 100})
            });
          });
    }
    
    llenarTabla(){
        const card = document.querySelector("#TableBody");
        var vacunas = "";
        card.innerHTML = "";
        firebase.database().ref('userPets').orderByKey().equalTo(this.state.userId).once("value").then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                vacunas = childSnapshot.child('petInfo/petVaccinations').val();
                Object.keys(vacunas).forEach(function(key) {
                    card.innerHTML += "<tr class=''>"+
                                            "<td class='single line'><i aria-hidden='true' class='file outline icon' /> <a href='"+vacunas[key]['Photo']+"'>Comprobante</a></td>"+
                                            "<td class=''>"+vacunas[key]['Name']+"</td>"+
                                            "<td class=''>"+vacunas[key]['Vet']+"</td>"+
                                            "<td class='right aligned'>"+vacunas[key]['Date']+"</td>"+
                                        "</tr>"
                });    
            });
        });
    }

    handleText(){
        const record = {
                Photo: this.state.photoURL,
                PhotoName: this.state.photoName,
                Name: this.state.data.vaccineName,
                Vet: this.state.data.vetName,
                Date: this.state.vaccineDate
        }
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
                            <a class="userm popup icon" data-tooltip="Directorio de veterinarios" data-position={ this.state.isMobile ? "bottom right" : "bottom center" } href = "/Vet" role="button">
                            <i class="user md icon"></i>
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

                <Table celled striped color="yellow" key="yellow" >
                    <Table.Header>
                    <Table.Row>   
                        <Table.HeaderCell>Comprobante</Table.HeaderCell>
                        <Table.HeaderCell>Vacuna</Table.HeaderCell>
                        <Table.HeaderCell>Veterinario</Table.HeaderCell>
                        <Table.HeaderCell>Fecha</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body id='TableBody'>
                    </Table.Body>

            <Table.Footer fullWidth>
                <Table.Row>
                    <Table.HeaderCell colSpan='4'>
                        <Button content={visible ? 'Hide' : 'Show'} onClick={this.toggleVisibility} floated='right' icon labelPosition='left' color='blue' size='small'>
                            <Icon name='syringe' /> Agregar Vacuna
                        </Button>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
        <Divider hidden />
            <Transition visible={visible} animation='scale' duration={500}>
                <Segment vertical style={{ padding: '5em 0em' }}>
                <Container>
                    <Grid divided stackable>
                    <Grid.Row>
                        <Grid.Column width={7}>
                            <Header as='h3' align="center">Comprobante</Header>
                            <div position="centered">  
                                <Image width="250" src={this.state.photoURL} centered />
                                <br/>
                                <div class="ui yellow progress">
                                <Progress value={this.state.uploadValue} total='100' progress />
                                </div>
                                <p align="center">
                                <Label color="blue"  width="4" as="label" htmlFor="file" size="large">
                                    <Icon name="file image icon"/>
                                    Sube una imágen del comprobante...
                                </Label>
                                </p>
                                <input id="file" hidden type="file" onChange={this.handleUpload} />
                            </div>              
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header as='h3' align="center">Datos de la Vacuna</Header>                    
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
                            <p align="center">
                            <Button onClick={this.handleText} primary>Registrar </Button>
                            </p>
                            <br/>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Container>
                </Segment>
            </Transition>
        </Form>
    );
    }
}

export default HistForm