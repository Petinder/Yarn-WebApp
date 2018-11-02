import React from 'react';
import { Form, Button, FormField, Header, Grid, Visibility, Responsive,
    Image, Container, Menu, Radio, TextArea, Progress, Label, Icon,
    Modal} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import Validator from 'validator';
import PropTypes from 'prop-types';
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
  let optionsCat = []
  let optionsDog = []

const HomepageHeading = ({ mobile }) => (
    <Container text>
        
    </Container>
)

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
}


class DesktopContainer extends React.Component {
    constructor () {
        super();
        this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
        this.handleChangeSex = this.handleChangeSex.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.onChange = this.onChange.bind(this);
        this.goHome = this.goHome.bind(this);
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
            isNew: true,
            open: false,
            wasPressed: false
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

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    profile (snapshot, key) {
        var currOption = [];
        if (snapshot.child(key + '/petInfo/petSpecies').val() === 'Gato'){
            firebase.database().ref().child('optionsCat').on('value', function(snapshot) {
                console.log(snapshot.val());
                snapshot.val().map((x, index) =>{ 
                    optionsCat.push({key: index, text: x.text, value: x.text})
                });
            });
            currOption = optionsCat
        }else{
            firebase.database().ref().child('optionsDog').on('value', function(snapshot) {
                console.log(snapshot.val());
                snapshot.val().map((x, index) =>{ 
                    optionsDog.push({key: index, text: x.text, value: x.text})
                });
            });
            currOption = optionsDog
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
        if (this.state.userId === ""){
            var dbRef = firebase.database().ref('userPets');
            var Data = dbRef.push();
            Data.set(record);
        }else{
            var dbRefU = firebase.database().ref('userPets/' + this.state.userId + '/ownerInfo');
            dbRefU.update(record.ownerInfo);
            dbRefU = firebase.database().ref('userPets/' + this.state.userId + '/petInfo');
            dbRefU.update(record.petInfo);
        }
    }
    
    goHome(){
        if (this.state.wasPressed === true){
            console.log('wasPressed');
        }else{
            console.log('wasNotPressed');
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
            firebase.database().ref().child('optionsCat').on('value', function(snapshot) {
                console.log(snapshot.val());
                snapshot.val().map((x, index) =>{ 
                    optionsCat.push({key: index, text: x.text, value: x.text})
                });
            });
            optionsRaza = optionsCat

        }else{
            firebase.database().ref().child('optionsDog').on('value', function(snapshot) {
                console.log(snapshot.val());
                snapshot.val().map((x, index) =>{ 
                    optionsDog.push({key: index, text: x.text, value: x.text})
                });
            });
            optionsRaza = optionsDog
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
        const { children } = this.props
        return (
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
            >
            <Form>
                <Menu fixed='top' inverted color='yellow'>
                <Container>
                    <Menu.Item as='a' header href = "/filter">
                    <Image size='mini' src={icono} style={{ marginRight: '1.5em' }} />
                    Petinder
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Menu.Item as='a'>
                            <a class="syringe popup icon" data-tooltip="Historial de vacunas" data-position="bottom center" href = "/history" role="button">
                            <i class="syringe icon"></i>
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

                <Grid columns={3} divided>
                <Grid.Column width={5.5}>
                    <br></br>
                    <Header as='h3'>Datos mascota</Header>

                    <div position="centered">  
                        <Image width="250" src={this.state.photoURL} centered />
                        <br/>
                        <div class="ui yellow progress">
                        <Progress value={this.state.uploadValue} total='100' progress />
                        </div>
                        <p align="center">
                        <Label color="blue"  width="4" as="label" htmlFor="file" size="large">
                            <Icon name="file image icon"/>
                            Sube una imágen de tu mascota...
                        </Label>
                        <input id="file" hidden type="file" onChange={this.handleUpload} />
                        </p>
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
                        value='1'
                        checked={this.state.petAsexed === '1'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                    <Form.Field>
                    <Radio
                        label='No'
                        name='petAsexed'
                        value='0'
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
                    <p align="center">                    
                    <Modal trigger={<Form.Button
                        content={this.state.isNew ? 'Registrar' : 'Actualizar'}
                        color = 'blue'
                        onClick={this.handleText}/>} 
                        basic size='small'>

                        <Header as='h1'>{this.state.isNew ? '¡Perfil creado exitosamente!' : '¡Perfil actualizado exitosamente!'}</Header>
                        <Modal.Content>
                        <h3>
                            No olvides actualizar el <a href = "/history">historial de vacunas</a> de tu mascota, ya que esto te permitirá posisionar a tu
                            mascota entre las mejores.
                        </h3>
                        </Modal.Content>
                        <Modal.Actions>
                        <Button color='orange' inverted  href = "/filter">
                            <Icon name='home' /> Ir a la página principal
                        </Button>
                        <Button color='blue' inverted href = "/history">
                            <Icon name='syringe icon' /> Actualizar historial de vacunas
                        </Button>
                        </Modal.Actions>
                    </Modal>
                    </p>
                    <br/>
                </Grid.Column>
                </Grid>
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
    constructor () {
        super();
        this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
        this.handleChangeSex = this.handleChangeSex.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.onChange = this.onChange.bind(this);
        this.goHome = this.goHome.bind(this);
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
            isNew: true,
            open: false,
            wasPressed: false
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

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    profile (snapshot, key) {
        var currOption = [];
        if (snapshot.child(key + '/petInfo/petSpecies').val() === 'Gato'){
            firebase.database().ref().child('optionsCat').on('value', function(snapshot) {
                console.log(snapshot.val());
                snapshot.val().map((x, index) =>{ 
                    optionsCat.push({key: index, text: x.text, value: x.text})
                });
            });
            currOption = optionsCat
        }else{
            firebase.database().ref().child('optionsDog').on('value', function(snapshot) {
                console.log(snapshot.val());
                snapshot.val().map((x, index) =>{ 
                    optionsDog.push({key: index, text: x.text, value: x.text})
                });
            });
            currOption = optionsDog
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
        if (this.state.userId === ""){
            var dbRef = firebase.database().ref('userPets');
            var Data = dbRef.push();
            Data.set(record);
        }else{
            var dbRefU = firebase.database().ref('userPets/' + this.state.userId + '/ownerInfo');
            dbRefU.update(record.ownerInfo);
            dbRefU = firebase.database().ref('userPets/' + this.state.userId + '/petInfo');
            dbRefU.update(record.petInfo);
        }
    }
    
    goHome(){
        if (this.state.wasPressed === true){
            console.log('wasPressed');
        }else{
            console.log('wasNotPressed');
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
            firebase.database().ref().child('optionsCat').on('value', function(snapshot) {
                console.log(snapshot.val());
                snapshot.val().map((x, index) =>{ 
                    optionsCat.push({key: index, text: x.text, value: x.text})
                });
            });
            optionsRaza = optionsCat
        }else{
            firebase.database().ref().child('optionsDog').on('value', function(snapshot) {
                console.log(snapshot.val());
                snapshot.val().map((x, index) =>{ 
                    optionsCat.push({key: index, text: x.text, value: x.text})
                });
            });
            optionsRaza = optionsDog
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
        const { children } = this.props
        return (
            <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
            <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
            >
            <Form>
                <Menu fixed='top' inverted color='yellow'>
                <Container>
                    <Menu.Item as='a' header href = "/filter">
                    <Image size='mini' src={icono} style={{ marginRight: '1.5em' }} />
                    Petinder
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Menu.Item as='a'>
                            <a class="syringe popup icon" data-tooltip="Historial de vacunas" data-position="bottom center" href = "/history" role="button">
                            <i class="syringe icon"></i>
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
            </Form>
            <Container>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Header as='h3'>Datos mascota</Header>
                    <div position="centered">  
                        <Image width="250" src={this.state.photoURL} centered />
                        <br/>
                        <div class="ui yellow progress">
                        <Progress value={this.state.uploadValue} total='100' progress />
                        </div>
                        <p align="center">
                        <Label color="blue"  width="4" as="label" htmlFor="file" size="large">
                            <Icon name="file image icon"/>
                            Sube una imágen de tu mascota...
                        </Label>
                        <input id="file" hidden type="file" onChange={this.handleUpload} />
                        </p>
                    </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>  
                    <Form.Field>
                        <label>Nombre</label>
                        <br></br>
                        <input
                        fluid 
                        id="petName" 
                        name="petName" 
                        placeholder="Nombre"
                        value={this.state.petName}
                        onChange={this.onChange}/>
                    </Form.Field>
                    <Form.Select
                        fluid
                        selection
                        label='Especie'
                        options={options}
                        value={this.state.petSpecies}
                        placeholder='Escoge una especie'
                        onChange={this.handleChangeSpecies}
                    />
                    <Form.Select
                        fluid
                        selection
                        label='Raza'
                        options={optionsRaza}
                        value={this.state.petBreed}
                        placeholder='Escoge una raza'
                        onChange={this.handleChangeRaza}
                    />
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
                    <label>Esterilización/Castración:</label>
                    <Form.Group inline>
                    <Form.Field>
                    <Radio
                        label='Si'
                        name='petAsexed'
                        value='1'
                        checked={this.state.petAsexed === '1'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                    <Form.Field>
                    <Radio
                        label='No'
                        name='petAsexed'
                        value='0'
                        checked={this.state.petAsexed === '0'}
                        onChange={this.handleChange}
                    />
                    </Form.Field>
                    </Form.Group>
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
                    <br/>
                    <label>Descripción</label>
                    <br></br>
                    <TextArea
                        id="petDescription" 
                        name="petDescription"
                        value={this.state.petDescription}
                        onChange={this.onChange}
                        label="Descripción de tu mascota para que los demás la conozcan"
                        maxlength = "250"
                        placeholder="Breve descripción de 250 caracteres como máximo..."/>

                <br></br>
                    <Header as='h3'>Datos dueño de mascota</Header>
                    <FormField>
                        <label htmlFor="ownerName">Nombre</label>
                        <br></br>
                        <input 
                        type="text" 
                        id="ownerName" 
                        name="ownerName" 
                        placeholder="Nombre"
                        value={this.state.ownerName}
                        onChange={this.onChange}/>
                    </FormField>
                    <br></br>
                    <FormField>
                        <label htmlFor="ownerPhone">Número de teléfono</label>
                        <br></br>
                        <input 
                        type="text" 
                        id="ownerPhone" 
                        name="ownerPhone" 
                        placeholder="Número de teléfono"
                        value={this.state.ownerPhone}
                        onChange={this.onChange}/>
                    </FormField>
                    <br></br>
                    <FormField>
                        <label htmlFor="ownerAddress">Dirección</label>
                        <br></br>
                        <input 
                        type="text" 
                        id="ownerAddress" 
                        name="ownerAddress" 
                        placeholder="Dirección"
                        value={this.state.ownerAddress}
                        onChange={this.onChange}/>
                    </FormField>
                    <br></br>
                    <p align="center">                    
                    <Modal trigger={<Form.Button
                        content={this.state.isNew ? 'Registrar' : 'Actualizar'}
                        color = 'blue'
                        onClick={this.handleText}/>} 
                        basic size='small'>

                        <Header as='h1'>{this.state.isNew ? '¡Perfil creado exitosamente!' : '¡Perfil actualizado exitosamente!'}</Header>
                        <Modal.Content>
                        <h3>
                            No olvides actualizar el <a href = "/history">historial de vacunas</a> de tu mascota, ya que esto te permitirá posisionar a tu
                            mascota entre las mejores.
                        </h3>
                        </Modal.Content>
                        <Modal.Actions>
                        <Button color='orange' inverted  href = "/filter">
                            <Icon name='home' /> Ir a la página principal
                        </Button>
                        <Button color='blue' inverted href = "/history">
                            <Icon name='syringe icon' /> Actualizar historial de vacunas
                        </Button>
                        </Modal.Actions>
                    </Modal>
                    </p>
                    </Container>
                    <br/>
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

const PetProfileForm = () => (
<ResponsiveContainer>
</ResponsiveContainer>
)


export default PetProfileForm;