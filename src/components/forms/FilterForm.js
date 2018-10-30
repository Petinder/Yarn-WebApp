import React from 'react';
import { Form, Radio, Rating, Image, Grid, Container, Menu, } from 'semantic-ui-react';
import firebase from 'firebase';
import icono from './petinder.ico';

const OpcionesEspecie = [
    { key: 'c', text: 'Gato', value: 'Gato' },
    { key: 'd', text: 'Perro', value: 'Perro' },
]

const OpcionesSexo = [
    { key: 'f', text: 'Hembra', value: 'F' },
    { key: 'm', text: 'Macho', value: 'M' },
]

class FilterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            radio: "",
            sexo: "",
            especie: "",
            userId: "",
            rootRef: firebase.database().ref().child('userPets'),
            rootRefAnun: firebase.database().ref().child('picturesA').limitToLast(2),
        };
    
        this.handleChangeR = this.handleChangeR.bind(this);
        this.handleChangeS = this.handleChangeS.bind(this);
        this.componentRand = this.componentRand.bind(this);
      }

    handleChangeR = (e, { value }) => {
        this.setState({ especie: value })
        this.componentRand(value, 'especie');
    }
    handleChangeS = (e, { value }) => {
        this.setState({ sexo: value })
        this.componentRand(value, 'sexo');
    }

    onChange  = (e, { value }) => {
        console.log("nombre del boton "+ value);
    }

    tarjetas = (snapshot, card) =>{
        console.log("Key pet "+snapshot.key);
        let buttonLike = "";
        let buttonDisLike = "";
        if(snapshot.child('petInfo/petSpecies').val() === "Perro"){
            buttonLike = "Guau"
            buttonDisLike = "Ggrr"
        }else{
            buttonLike = "Miau"
            buttonDisLike = "Gghh"
        }
        card.innerHTML += "<div class='ui card'>"+
                                "<div class='content'>"+
                                "<img src='" + snapshot.child('petInfo/petPhoto').val()+"'"+
                                    "class='ui medium right floated image'/>"+
                                "<div class='header'>" + snapshot.child('petInfo/petName').val() + "</div>"+
                                "<div class='meta'>" + snapshot.child('petInfo/petBreed').val()+"</div>"+
                                "<div class='description'>"+
                                    snapshot.child('petInfo/petDescription').val() + 
                                    "<br/> Nací en "+ snapshot.child('petInfo/petBirthDate').val() +
                                "</div></div>"+
                                "<div class='extra content'>"+
                                "<div class='ui buttons'>"+
                                "<button class='ui green basic button' role='button' name='petName' value='145' onClick={console.log("+snapshot.key.toString()+")}><i class='thumbs up outline icon left'></i>"+buttonLike+"</button>"+
                                "<button class='ui red basic button' role='button'><i class='thumbs down outline icon left'></i>"+buttonDisLike+"</button>"+
                                "<button class='ui black basic button' data-tooltip='Contáctame al número: "+snapshot.child('ownerInfo/phone').val()+"' data-position='top center' data-inverted=''><i class='add icon'></i></button>"+
                                "</div></div></div>"
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

    componentRand(value, filtro) {
        //const rootRef = firebase.database().ref().child('userPets');
        const card = document.querySelector("#cardPets");
        card.innerHTML = "";

        if(filtro === 'sexo'){
            if(this.state.especie === ""){
                this.state.rootRef.on('child_added', snapshot => {
                    if(value === 'M'){
                        if(snapshot.child('petInfo/petSex').val() === 'M'){
                            this.tarjetas(snapshot, card)
                        }
                    }else{
                        if(snapshot.child('petInfo/petSex').val() === 'F'){
                            this.tarjetas(snapshot, card)
                        } 
                    }
                });
            }else{
                this.state.rootRef.orderByChild("petInfo/petSpecies").equalTo(this.state.especie).on('child_added', snapshot => {
                    if(value === 'M'){
                        if(snapshot.child('petInfo/petSex').val() === 'M'){
                            this.tarjetas(snapshot, card)
                        }
                    }else{
                        if(snapshot.child('petInfo/petSex').val() === 'F'){
                            this.tarjetas(snapshot, card)
                        } 
                    }
                });
            }
        }else{
            if(this.state.sexo === ""){
                this.state.rootRef.on('child_added', snapshot => {
                    if(value === 'Gato'){
                        if(snapshot.child('petInfo/petSpecies').val() === 'Gato'){
                            this.tarjetas(snapshot, card)
                        }
                    }else{
                        if(snapshot.child('petInfo/petSpecies').val() === 'Perro'){
                            this.tarjetas(snapshot, card)
                        }
                    }
                });
            }else{
                this.state.rootRef.orderByChild("petInfo/petSex").equalTo(this.state.sexo).on('child_added', snapshot => {
                    if(value === 'Gato'){
                        if(snapshot.child('petInfo/petSpecies').val() === 'Gato'){
                            this.tarjetas(snapshot, card)
                        }
                    }else{
                        if(snapshot.child('petInfo/petSex').val() === 'Perro'){
                            this.tarjetas(snapshot, card)
                        } 
                    }
                });
            }
        }        
    }

    handleClick = () =>{
        if (this.state.especie !== "" || this.state.sexo!== ""){
            this.setState({ especie: "", sexo: "" });
            this.componentDidMount();
        }
    }

    componentDidMount() {
        const card = document.querySelector("#cardPets");
        card.innerHTML = "";

        this.state.rootRef.on('child_added', snapshot => {
            this.tarjetas(snapshot, card)
        });

        const anuncios = document.querySelector("#anuncios");
        anuncios.innerHTML = "";

        this.state.rootRefAnun.on('child_added', snapshot => {
            console.log("child key: " + snapshot.key);
            anuncios.innerHTML += "<Advertisement unit='ui square'>"+
                            "<img src='"+ snapshot.child('adInfo/adPhoto').val()+"' width='100%'/>"+
                            "</Advertisement>"+
                            "<br/>"
        }); 
    }

    render() {
        const {sexo, especie} = this.state
        return (
            <div>
                <Menu fixed='top' inverted color='yellow'>
                <Container>
                    <Menu.Item as='a' header>
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

                <Grid centered columns={3} style={{ marginTop: '3em' }}>
                    <Grid.Column width={4} >
                        <div style={{ marginTop: '7em' }} class= "ui sticky fixed top">
                            <Form.Select
                                fluid
                                selection
                                label='Especie'
                                options={OpcionesEspecie}
                                value={especie}
                                placeholder='Especie'
                                onChange={this.handleChangeR}
                            />
                            <br/><br/>
                            <Form.Select
                                fluid
                                selection
                                label='Sexo'
                                options={OpcionesSexo}
                                value={sexo}
                                placeholder='Sexo'
                                onChange={this.handleChangeS}
                            />
                            <br/><br/>
                            <button class="negative ui button" onClick = {this.handleClick}>Eliminar filtro</button>

                        </div>
                    </Grid.Column>
                    <Grid.Column width={9} >
                        <div class='ui cards' id ='cardPets'>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={3} >
                        <div style={{ marginTop: '7em' }} class= "ui sticky fixed top" id ='anuncios'> 
                        </div>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}
export default FilterForm;