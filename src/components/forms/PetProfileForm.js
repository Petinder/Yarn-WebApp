import React from 'react';
import { Form, Button, FormField, Header, Grid, Image, Container, Menu, Radio } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/database';
import FileUpload from '../../actions/FileUpload';

const options = [
    { key: 'c', text: 'Gato', value: 'Gato' },
    { key: 'd', text: 'Perro', value: 'Perro' },
  ]

  const optionsSex = [
    { key: 'f', text: 'Hembra', value: 'F' },
    { key: 'm', text: 'Macho', value: 'M' },
  ]

class PetProfileForm extends React.Component {
    constructor () {
        super();
        this.state = {
            user: null,
            ownerAddress: "",
            ownerName: "",
            ownerPhone: "",
            petName: "",
            petBreed: "",
            petSpecies: "",
            petSex: "",
            petAsexed: "",
            petBirthDate: "",
            photoURL: "",
            picturePet: [],
            task: null
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
        this.handleChangeSex = this.handleChangeSex.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleText = this.handleText.bind(this);
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user });
          });
    }
    componentDidMount(){
        firebase.database().ref('userPets').on('child_added', snapshot => {
            this.setState({
              picturePet: this.state.picturePet.concat = () => snapshot.val()
            });
          });
    }

    handleUpload (event) {
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`fotos/${file.name}`);
        this.setState({task : storageRef.put(file)});
    }
      
    handleText(){
        console.log("Task = " + this.state.task)
        this.state.task.on('state_changed', snapshot => {
            console.log("Snapshot " + snapshot);
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({
            uploadValue: percentage
          })
        }, error => {
          console.error(error.message);
        },() => {
            console.log("url " + this.state.task.snapshot.ref.getDownloadURL()[0])
        const record = {
            ownerInfo: {
                address: this.state.data.ownerAddress,
                mail: this.state.user.email,
                name: this.state.data.ownerName,
                phone: this.state.data.ownerPhone
            },
            petInfo: {
                petName: this.state.data.petName,
                petBreed: this.state.data.petBreed,
                petSpecies: this.state.petSpecies,
                petSex: this.state.petSex,
                petAsexed: this.state.petAsexed,
                petBirthDate: this.state.petBirthDate,
                photoURL: this.state.task.snapshot.ref.getDownloadURL()
            }
          }
          const dbRef = firebase.database().ref('userPets');
          const newPicture = dbRef.push();
          newPicture.set(record);
        });
    }
 
    onChange = e => 
    this.setState({ 
        data: { ...this.state.data, [e.target.name]: e.target.value } 
    })

    handleChangeDate = (e, { name, value }) => {
        this.setState({ [name] : value });
    }

    handleChangeSpecies = (e, { value }) => {
        this.setState({ petSpecies : value });
    }

    handleChangeSex = (e, { value }) => {
        this.setState({ petSex: value });
    }
    
    handleLogout () {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("Exito");
          }).catch(function(error) {
            // An error happened.
            console.log("Hay error", error);
          });
    }

    validate = (data) => {
        const errors = {};
        if (Validator.isEmpty(data.ownerName)) errors.ownerName = "Debe ingresar un nombre";
        if (!Validator.isMobilePhone(data.ownerPhone)) errors.ownerPhone = "Número inválido";
        if (Validator.isEmpty(data.petName)) errors.petName = "Debe ingresar un nombre";
        return errors;
    };

    render() {
        const { ownerPhone } = this.state.ownerPhone;
        const { ownerAddress } = this.state.ownerAddress;
        const { petSpecies } = this.state.petSpecies;
        const { petSex } = this.state.petSex;
        const { petAsexed } = this.state.petAsexed;
        const { petName } = this.state.petName;
        const { petBreed } = this.state.petBreed;
        const { ownerName } = this.state.ownerName;
        return (
            <Form>
                <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item as='a' header href = "/filter">
                    <Image size='mini' src='https://firebasestorage.googleapis.com/v0/b/petinder-fc7b6.appspot.com/o/petinder.ico?alt=media&token=670db3dc-3bf1-452a-b8fd-5bdf83bc23d2' style={{ marginRight: '1.5em' }} />
                    Petinder
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Menu.Item as='a' >
                            <div class="syringe popup icon" data-tooltip="Historial de vacunas" data-position="bottom center">
                            <i class="syringe icon"></i>
                            </div>
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <div class="userm popup icon" data-tooltip="Directorio de veterinarios" data-position="bottom left">
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
                <Grid>
                <Grid.Column width={8}>
                <br></br>
                    <Header as='h3'>Datos mascota</Header>
                    <FileUpload onUpload={ this.handleUpload }/>
                     {
                        this.state.picturePet.map = () => (picturePet => (
                        <div className="App-card">
                            <figure className="App-card-image">
                            <img width="320" src={picturePet.image} />
                            <figCaption className="App-card-footer">
                                <img className="App-card-avatar" src={picturePet.photoURL} alt={picturePet.displayName} />
                                <span className="App-card-name">{picturePet.displayName}</span>
                            </figCaption>
                            </figure>
                        </div>
                        )).reverse()
                    }
                    <FormField>
                        <label htmlFor="petName">Nombre</label>
                        <input 
                        type="text" 
                        id="petName" 
                        name="petName" 
                        placeholder="Nombre"
                        value={petName}
                        onChange={this.onChange}/>
                    </FormField>
                    <Form.Select
                        fluid
                        selection
                        label='Especie'
                        options={options}
                        value={petSpecies}
                        placeholder='Especie'
                        onChange={this.handleChangeSpecies}
                    />
                    <FormField>
                        <label htmlFor="petBreed">Raza</label>
                        <input 
                        type="text" 
                        id="petBreed" 
                        name="petBreed" 
                        placeholder="Raza"
                        value={petBreed}
                        onChange={this.onChange}/>
                    </FormField>
                    <Form.Select
                        fluid
                        selection
                        label='Sexo'
                        options={optionsSex}
                        value={petSex}
                        placeholder='Sexo'
                        onChange={this.handleChangeSex}
                    />
                    <DateInput
                        fluid
                        label="Fecha Nacimiento"
                        name="petBirthDate"
                        placeholder = "Fecha Nacimiento"
                        value={this.state.petBirthDate}
                        onChange={this.handleChangeDate} 
                    />
                    <Form.Group inline>
                    <label>Castrado</label>
                    <Form.Field>
                    <Radio
                        label='Si'
                        name='petAsexed'
                        value='1'
                        checked={this.state.petAsexed === '1'}
                        onChange={this.handleChangeDate}
                    />
                    </Form.Field>
                    <Form.Field>
                    <Radio
                        label='No'
                        name='petAsexed'
                        value='0'
                        checked={this.state.petAsexed === '0'}
                        onChange={this.handleChangeDate}
                    />
                    </Form.Field>
                    </Form.Group>
                </Grid.Column>
                <Grid.Column width={7}>
                <br></br>
                    <Header as='h3'>Datos dueño de mascota</Header>
                    <FormField>
                        <label htmlFor="ownerName">Nombre</label>
                        <input 
                        type="text" 
                        id="ownerName" 
                        name="ownerName" 
                        placeholder="Nombre"
                        value={ownerName}
                        onChange={this.onChange}/>
                    </FormField>
                    <FormField>
                        <label htmlFor="ownerPhone">Número de teléfono</label>
                        <input 
                        type="text" 
                        id="ownerPhone" 
                        name="ownerPhone" 
                        placeholder="Número de teléfono"
                        value={ownerPhone}
                        onChange={this.onChange}/>
                    </FormField>
                    <FormField>
                        <label htmlFor="ownerAddress">Dirección</label>
                        <input 
                        type="text" 
                        id="ownerAddress" 
                        name="ownerAddress" 
                        placeholder="Dirección"
                        value={ownerAddress}
                        onChange={this.onChange}/>
                    </FormField>
                    <Button onClick={this.handleText} primary>Registrar</Button>
                    <br/>
                </Grid.Column>
                </Grid>
            </Form>
        );
    }
}


export default PetProfileForm;