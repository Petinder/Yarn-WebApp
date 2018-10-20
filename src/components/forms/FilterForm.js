import React from 'react';
import { Form, Radio, FormInput, Image, Grid, Container, Menu, Advertisement } from 'semantic-ui-react';
import firebase from 'firebase';

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
            rootRef: firebase.database().ref().child('userPets'),
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

    tarjetas(snapshot, card){
        card.innerHTML += "<div class='ui card'>"+
                                "<div class='content'>"+
                                "<img src='" + snapshot.child('petInfo/petPhoto').val()+"'"+
                                    "class='ui medium right floated image'/>"+
                                "<div class='header'>" + snapshot.child('petInfo/petName').val() + "</div>"+
                                "<div class='meta'>" + snapshot.child('petInfo/petBreed').val()+"</div>"+
                                "<div class='description'>"+
                                    snapshot.child('petInfo/petDescription').val() +
                                "</div></div>"+
                                "<div class='extra content'>"+
                                "<div class='ui two buttons'>"+
                                    "<button class='ui green basic button' role='button'>Approve</button>"+
                                    "<button class='ui red basic button' role='button'>Decline</button>"+
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
        if (this.state.especie != "" || this.state.sexo!= ""){
            this.setState({ especie: "", sexo: "" });
            this.componentDidMount();
        }
    }

    componentDidMount() {
        const card = document.querySelector("#cardPets");
        card.innerHTML = "";

        this.state.rootRef.on('child_added', snapshot => {
            card.innerHTML += "<div class='ui card'>"+
                            "<div class='content'>"+
                            "<img src='" + snapshot.child('petInfo/petPhoto').val()+"'"+
                                "class='ui medium right floated image'/>"+
                            "<div class='header'>" + snapshot.child('petInfo/petName').val() + "</div>"+
                            "<div class='meta'>" + snapshot.child('petInfo/petBreed').val()+"</div>"+
                            "<div class='description'>Soy un <strong>"+
                                snapshot.child('petInfo/petSpecies').val() +"</strong> que nací el "+ snapshot.child('petInfo/petBirthDate').val()+
                            "</div></div>"+
                            "<div class='extra content'>"+
                            "<div class='ui two buttons'>"+
                                "<button class='ui green basic button' role='button'>Agregar</button>"+
                                "<button class='ui red basic button' role='button'>Ignorar</button>"+
                            "</div></div></div>"
        });
    }

    render() {
        const {sexo, especie} = this.state
        return (
            <Form>
                <Menu fixed='top' inverted color='yellow'>
                <Container>
                    <Menu.Item as='a' header >
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
                
                <Grid>
                <Grid.Column width={4}>
                    <div class= "ui sticky fixed top">
                    <br/><br/>
                    <br/><br/>
                    <br></br>
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
                <Grid.Column width={9}>
                    <br/><br/>
                    <div class='ui cards' id ='cardPets'>
                    </div>
                </Grid.Column>
                <Grid.Column width={3}>
                    <br/><br/>
                    <Advertisement unit='ui vertical rectangle'>
                        <img src='https://i.pinimg.com/originals/14/dc/cc/14dcccda1ec006ac52fa17c642666e68.png' width="100%"/>
                    </Advertisement>
                    <Advertisement unit='ui vertical rectangle'>
                        <img src='http://www.venfido.com.mx/im/banner_300x390.jpg' width="100%"/>
                    </Advertisement>
                </Grid.Column>
                </Grid>
            </Form>
        );
    }
}
export default FilterForm;