import React from 'react';
import { Form, Button, FormField, Header, Grid, Input,
    Image, Container, Menu, Radio, TextArea, Progress, Dimmer, Loader, Segment } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/database';
import icono from './petinder.ico';

  const options = [
    { key: 'c', text: 'Gato', value: 'Gato' },
    { key: 'd', text: 'Perro', value: 'Perro' },
  ]

  const optionsSex = [
    { key: 'f', text: 'Hembra', value: 'F' },
    { key: 'm', text: 'Macho', value: 'M' },
  ]

  let optionsRaza = []

  const optionsGato = [
    { key: '0', text: 'Ragdoll', value: 'Ragdoll' },
    { key: '1', text: 'Angora', value: 'Angora' },
    { key: '2', text: 'British Shorthair', value: 'British Shorthair' },
    { key: '3', text: 'Scottish Fold', value: 'Scottish Fold' },    
    { key: '4', text: 'Birmano', value: 'Birmano' },
    { key: '5', text: 'Persa', value: 'Persa' },
    { key: '6', text: 'Ruso azul', value: 'Ruso azul' },
    { key: '7', text: 'Siamés', value: 'Siamés' },
    { key: '8', text: 'Snowshoe', value: 'Snowshoe' },
    { key: '9', text: 'Cartujo', value: 'Cartujo' },
    { key: '10', text: 'Bombay', value: 'Bombay' },
    { key: '11', text: 'Korat', value: 'Korat' },
    { key: '12', text: 'Balinés', value: 'Balinés' },
    { key: '13', text: 'Burmés', value: 'Burmés' },
    { key: '14', text: 'Habano', value: 'Habano' },
    { key: '15', text: 'Cornish Rex', value: 'Cornish Rex' },
    { key: '16', text: 'Oriental', value: 'Oriental' },
    { key: '17', text: 'Devon Rex', value: 'Devon Rex' },
    { key: '18', text: 'Seychellois', value: 'Seychellois' },
    { key: '19', text: 'Tonkinés', value: 'Tonkinés' }
  ]

  const optionsPerro = [
    { key: '0', text: 'Husky Siberiano', value: 'Husky Siberiano' },
    { key: '1', text: 'Golden Retriever', value: 'Golden Retriever' },
    { key: '2', text: 'Labrador Retriever', value: 'Labrador Retriever' },
    { key: '3', text: 'Pastor Alemán', value: 'Pastor Alemán' },    
    { key: '4', text: 'Beagle', value: 'Beagle' },
    { key: '5', text: 'Alaskan Malamute', value: 'Alaskan Malamute' },
    { key: '6', text: 'San Bernardo', value: 'San Bernardo' },
    { key: '7', text: 'Boxer', value: 'Boxer' },
    { key: '8', text: 'Rottweiler', value: 'Rottweiler' },
    { key: '9', text: 'Samoyedo', value: 'Samoyedo' },
    { key: '10', text: 'Pit Bull', value: 'Pit Bull' },
    { key: '11', text: 'Chow Chow', value: 'Chow Chow' },
    { key: '12', text: 'Dálmata', value: 'Dálmata' },
    { key: '13', text: 'Collie', value: 'Collie' },
    { key: '14', text: 'Carlino', value: 'Carlino' },
    { key: '15', text: 'Doberman', value: 'Doberman' },
    { key: '16', text: 'Gran Danés', value: 'Gran Danés' },
    { key: '17', text: 'Cocker Inglés', value: 'Cocker Inglés' },
    { key: '18', text: 'Schnauzer', value: 'Schnauzer' },
    { key: '19', text: 'Chihuahua', value: 'Chihuahua' }
  ]

class PetProfileForm extends React.Component {
    constructor () {
        super();
        this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
        this.handleChangeSex = this.handleChangeSex.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            user: null,
            userMail: "",
            ownerAddress: "",
            ownerName: "",
            ownerPhone: "",
            petName: "",
            petBreed: "",
            petSpecies: "",
            petSex: "",
            petAsexed: "",
            petBirthDate: "",
            photoURL: 'https://react.semantic-ui.com/images/wireframe/image.png',
            uploadValue: 0,
            petPedigree: "",
            petDescription: "",
            userId: "",
            isNew: true
        };

    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            if (user) {              
                this.setState({ user, userMail: user.email });
            } else {
                window.location.pathname = '/login'
            }
          });
        
    }

    componentDidMount(){
        console.log("didmount")
        firebase.auth().onAuthStateChanged(user => {
            if (user) {              
                this.setState({ user, userMail: user.email });
                var key = "";
                firebase.database().ref('userPets').orderByChild('ownerInfo/mail').equalTo(user.email).once("value").then((snapshot) => {
                    if (snapshot.exists()){
                        console.log(snapshot.val());
                        snapshot.forEach((childSnapshot) => {
                            key = childSnapshot.key;
                            this.profile(snapshot, key);
                        });
                        }
                    })
            } else {
                window.location.pathname = '/login'
            }
          });
    }

    profile (snapshot, key) {
        var currOption = [];
        if (snapshot.child(key + '/petInfo/petSpecies').val() === 'Gato'){
            currOption = optionsGato
        }else{
            currOption = optionsPerro
        }
        this.setState({
            ownerAddress: snapshot.child(key + '/ownerInfo/address').val(),
            ownerName: snapshot.child(key + '/ownerInfo/name').val(),
            ownerPhone: snapshot.child(key + '/ownerInfo/phone').val(),
            petName: snapshot.child(key + '/petInfo/petName').val(),
            petSpecies: snapshot.child(key + '/petInfo/petSpecies').val(),
            optionsRaza: currOption,
            petSex: snapshot.child(key + '/petInfo/petSex').val(),
            petAsexed: snapshot.child(key + '/petInfo/petAsexed').val(),
            petBirthDate:snapshot.child(key + '/petInfo/petBirthDate').val(),
            photoURL: snapshot.child(key + '/petInfo/petPhoto').val(),
            uploadValue: 0,
            petPedigree: snapshot.child(key + '/petInfo/petPedigree').val(),
            petDescription: snapshot.child(key + '/petInfo/petDescription').val(),
            userId: key,
            isNew: false
        });
        console.log(this.state.photoURL);
        this.setState({petBreed: snapshot.child(key + '/petInfo/petBreed').val()});
    }

    handleUpload(event) {
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`fotos/${file.name}`);
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
        console.log(this.state.ownerAddress);
        const record = {
            ownerInfo: {
                address: this.state.ownerAddress,
                mail: this.state.user.email,
                name: this.state.ownerName,
                phone: this.state.ownerPhone
            },
            petInfo: {
                petName: this.state.petName,
                petBreed: this.state.petBreed,
                petSpecies: this.state.petSpecies,
                petSex: this.state.petSex,
                petAsexed: this.state.petAsexed,
                petBirthDate: this.state.petBirthDate,
                petPhoto: this.state.photoURL,
                petPedigree: this.state.petPedigree,
                petDescription: this.state.petDescription
            }
        }
        console.log(record)
        console.log("UserId: " + this.state.userId);
        if (this.state.userId == ""){
            var dbRef = firebase.database().ref('userPets');
            var Data = dbRef.push();
            Data.set(record);
        }else{
            var dbRef = firebase.database().ref('userPets/' + this.state.userId);
            dbRef.set(record);
        }
    
    }
 

    onChange(event) {
        this.setState({[event.target.name]: ""});
        this.setState({[event.target.name]: event.target.value});
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name] : value });
    }

    handleChangeSpecies = (e, { value }) => {
        this.setState({ petSpecies : value });
        if (value === 'Gato'){
            optionsRaza = optionsGato
        }else{
            optionsRaza = optionsPerro
        }
    }

    handleChangeSex = (e, { value }) => {
        this.setState({ petSex: value });
    }
    
    handleLogout () {
        firebase.auth().signOut().then(function() {
            console.log("Exito");
          }).catch(function(error) {
            console.log("Hay error", error);
          });
    }

    handleChangeRaza = (e, { value }) => {
        this.setState({ petBreed: value });
    }

    validate = (data) => {
        const errors = {};
        if (Validator.isEmpty(data.ownerName)) errors.ownerName = "Debe ingresar un nombre";
        if (!Validator.isMobilePhone(data.ownerPhone)) errors.ownerPhone = "Número inválido";
        if (Validator.isEmpty(data.petName)) errors.petName = "Debe ingresar un nombre";
        return errors;
    };

    render() {
        return (
            <Form>
                <Menu fixed='top' inverted color='yellow'>
                <Container>
                    <Menu.Item as='a' header href = "/filter">
                    <Image size='mini' src={icono} style={{ marginRight: '1.5em' }} />
                    Petinder
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Menu.Item as='a' >
                            <div class="syringe popup icon" data-tooltip="Historial de vacunas" data-position="bottom center" href = "/history" role="button">
                            <i class="syringe icon"></i>
                            </div>
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <div class="userm popup icon" data-tooltip="Directorio de veterinarios" data-position="bottom left" href = "/Vet" role="button">
                            <i class="user md icon"></i>
                            </div>
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <a class="signo popup icon button" data-tooltip="Cerrar sesión" data-position="bottom left" role="button" href = "/login" onClick={this.handleLogout}>
                            <i class="sign out alternate icon"></i>
                            </a>
                        </Menu.Item>
                    </Menu.Item>
                </Container>
                </Menu>

                <Grid columns={3} divided>
                <Grid.Column width={5.5}>
                    <br></br>
                    <Header as='h3'>Datos mascota</Header>

                    <div position="centered">  
                        <Image width="250" src={this.state.photoURL} centered />
                        <br/>
                        <Progress value={this.state.uploadValue} total='100' progress />
                        <Input type="file" onChange={this.handleUpload} class="inputfile" id="InputPhoto"/>
                    </div>
                    
                </Grid.Column>
                <Grid.Column width={6}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>  
                    <FormField>
                        <label htmlFor="petName">Nombre</label>
                        <input 
                        type="text" 
                        id="petName" 
                        name="petName" 
                        placeholder="Nombre"
                        value={this.state.petName}
                        onChange={this.onChange}/>
                    </FormField>
                    <Grid columns='equal'>
                    <Grid.Column>
                    <Form.Select
                        fluid
                        selection
                        label='Especie'
                        options={options}
                        value={this.state.petSpecies}
                        placeholder='Escoge una especie'
                        onChange={this.handleChangeSpecies}
                    />
                    </Grid.Column>
                    <Grid.Column>
                    <Form.Select
                        fluid
                        selection
                        label='Raza'
                        options={optionsRaza}
                        value={this.state.petBreed}
                        placeholder='Escoge una raza'
                        onChange={this.handleChangeRaza}
                    />
                    </Grid.Column>
                    </Grid>
                    <Form.Select
                        fluid
                        selection
                        label='Sexo'
                        options={optionsSex}
                        value={this.state.petSex}
                        placeholder='Sexo'
                        onChange={this.handleChangeSex}
                    />
                    <DateInput
                        fluid
                        label="Fecha Nacimiento"
                        name="petBirthDate"
                        placeholder = "Fecha Nacimiento"
                        value={this.state.petBirthDate}
                        onChange={this.handleChange} 
                    />
                    <Grid columns='equal'>
                    <Grid.Column>
                    <label>Esterilización/Castración:</label>
                    <Form.Group inline>
                    <Form.Field>
                    <Radio
                        label='Si'
                        name='petAsexed'
                        value={this.state.petAsexed}
                        checked={this.state.petAsexed === '1'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                    <Form.Field>
                    <Radio
                        label='No'
                        name='petAsexed'
                        value={this.state.petAsexed}
                        checked={this.state.petAsexed === '0'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                    </Form.Group>
                    </Grid.Column>
                    <Grid.Column>
                    <label>Pedigree:</label>
                    <Form.Group inline>
                    <Form.Field>
                    <Radio
                        label='Si'
                        name='petPedigree'
                        value='1'
                        checked={this.state.petPedigree === '1'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                    <Form.Field>
                    <Radio
                        label='No'
                        name='petPedigree'
                        value='0'
                        checked={this.state.petPedigree === '0'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                    </Form.Group>
                    </Grid.Column>
                    </Grid>
                    <br/>
                    <label>Descripción</label>
                    <TextArea
                        id="petDescription" 
                        name="petDescription"
                        value={this.state.petDescription}
                        onChange={this.onChange}
                        label="Descripción de tu mascota para que los demás la conozcan"
                        maxlength = "250"
                        placeholder="Breve descripción de 250 caracteres como máximo..."/>

                </Grid.Column>
                <Grid.Column width={4}>
                <br></br>
                    <Header as='h3'>Datos dueño de mascota</Header>
                    <FormField>
                        <label htmlFor="ownerName">Nombre</label>
                        <input 
                        type="text" 
                        id="ownerName" 
                        name="ownerName" 
                        placeholder="Nombre"
                        value={this.state.ownerName}
                        onChange={this.onChange}/>
                    </FormField>
                    <FormField>
                        <label htmlFor="ownerPhone">Número de teléfono</label>
                        <input 
                        type="text" 
                        id="ownerPhone" 
                        name="ownerPhone" 
                        placeholder="Número de teléfono"
                        value={this.state.ownerPhone}
                        onChange={this.onChange}/>
                    </FormField>
                    <FormField>
                        <label htmlFor="ownerAddress">Dirección</label>
                        <input 
                        type="text" 
                        id="ownerAddress" 
                        name="ownerAddress" 
                        placeholder="Dirección"
                        value={this.state.ownerAddress}
                        onChange={this.onChange}/>
                    </FormField>
                    <Form.Button
                        content={this.state.isNew ? 'Registrar' : 'Actualizar'}
                        color = 'blue'
                        onClick={this.handleText}
                    />
                    <br/>
                </Grid.Column>
                </Grid>
            </Form>
        );
    }
}


export default PetProfileForm;