import React from 'react';
import { Form, Button, FormField, Message, Header, Radio } from 'semantic-ui-react';
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

const optionsCastra = [
    { key: 's', text: 'Si', value: '1' },
    { key: 'n', text: 'No', value: '0' },
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
            picturePet: []
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
        this.handleChangeSex = this.handleChangeSex.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    putData(data) {
        //console.log(data.val());
        var petsData = data.val();
        var keys = Object.keys(petsData);        
        console.log(keys);
        
        for (var i=0; i<keys.length; i++){
            var k = keys[i];
            var init = petsData[k].petInfo;
            var NombrePet = init.petName;
            //console.log(NombrePet);
            //console.log(init);
            //var SexoPet = React.createElement('Sexo', init.petSex);
            //SexoPet.parent('Ser');
        }
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user });
          });
          firebase.database().ref('userPets').on('child_added', snapshot => {
            this.setState({
              picturePet: this.state.picturePet.concat = () => snapshot.val()
            });
          });
    }

    handleUpload (event) {
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`fotos/${file.name}`);
        const task = storageRef.put(file);
    
        task.on('state_changed', snapshot => {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({
            uploadValue: percentage
          })
        }, error => {
          console.error(error.message);
        },() => {
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
                petBirthDate: this.state.petBirthDate
                //photoURL: task.snapshot.ref.getDownloadURL()
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

    handleChangeDate = (e, { value }) => {
        this.setState({ petBirthDate : value });
        console.log(this.state.petBirthDate);
    }

    handleChangeSpecies = (e, { value }) => {
        this.setState({ petSpecies : value });
        console.log(this.state.petSpecies);
    }

    handleChangeSex = (e, { value }) => {
        this.setState({ petSex: value });
        console.log(this.state.petSpecies);
    }

    handleChangeCastrado = (e, { value }) => {
        this.setState({ petAsexed: value });
        console.log(this.state.petBirthDate);
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
        const { petBirthDate } = this.state.petBirthDate;
        const { ownerName } = this.state.ownerName;
        return (
            <Form>
                <Link to="/filter">Filtros</Link>
                <Header as='h3'>Datos mascota</Header>
                <FileUpload onUpload={ this.handleUpload }/>
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
                    value={petBirthDate}
                    onChange={this.handleChangeDate} 
                />
                <Form.Select
                    fluid
                    selection
                    label='Castrado'
                    options={optionsCastra}
                    value={petAsexed}
                    placeholder='Castrado'
                    onChange={this.handleChangeCastrado}
                />
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
                <Button onClick={this.handleUpload} primary>Registrar</Button>
                <br/>
            </Form>
        );
    }
}


export default PetProfileForm;