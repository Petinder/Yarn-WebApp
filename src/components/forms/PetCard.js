import React, {Component} from 'react';
import { Card, Button, Popup, Label, Image, Icon, Modal, Table } from 'semantic-ui-react';
import firebase from 'firebase';
import 'firebase/database';
import PetCardHist from './PetCardHist';

class PetCard extends Component {
    constructor(props){
        super(props);
        this.state={active: false};
    }

    sendEmail(toMail, name, phone) {
        console.log('Send email');
        var to = toMail
        var from = "marinesm96@gmail.com"
        var subject = "¡Quiero conocerte!"
        var eText = "¡Hola! Mi nombre es " + name + " y me gustaría conocerte. Me puedes contactar al teléfono: " + phone + ". Petinder"
        fetch(`http://localhost:4000/send-email?recipient=${to}&sender=${from}&topic=${subject}&text=${eText}`) //query string url
          .catch(err => console.error(err))
    }

    handleLike = () =>{
        this.setState({ active: !this.state.active })
        if(!this.state.active){
            console.log("Guardar en base de datos")
            const dbRef = firebase.database().ref('userPets/' + this.props.pet.key  +'/likeInfo');
            const Data = dbRef.push();
            Data.set({keyPet: this.props.user});
        }else{
            //this.props.pet.encanta.map(x => { console.log(x)})
            console.log("Eliminar " + this.props.pet.key + " "+ this.props.user);
        }
    }

    handlec = () =>{
        console.log("email ");
        this.sendEmail(this.props.pet.mail, this.props.pet.petName, this.props.pet.phone)
    }

    render(){
        let { active } = this.state;
        /*this.props.pet.encanta.map(x => {
            if (x === this.props.user.toString() ){
                console.log("Debe cambiar boton a activo para la mascota " + this.props.pet.key)
            }
        });*/

        let petCardHist;
        if (this.props.pet.vaccinations !== null){
            let vacc = Object.values(this.props.pet.vaccinations);
            petCardHist = vacc.map(vaccination=>{
                return(
                    <PetCardHist vaccination={vaccination}/>
                )
            })
        }else{
            petCardHist = "No tiene actualizado el historial de vacunas";
        }

        let buttonLike = "";
        if(this.props.pet.petSpecies === "Perro"){
            buttonLike = "Guau"
        }else{
            buttonLike = "Miau"
        }
        
        return(
            <Card>
                <Popup trigger={<Image src={this.props.pet.petPhoto} width='290' height='270' />} inverted>
                    <Popup.Content>
                    <Label as='a' color='green'>
                        <Icon name='heart' /> {this.props.pet.like}
                    </Label>
                    </Popup.Content>
                </Popup>
                <Card.Content>
                <Card.Header>{this.props.pet.petName}</Card.Header>
                <Card.Meta>
                    <span className='date'>{this.props.pet.petBreed}</span>
                </Card.Meta>
                <Card.Description>{this.props.pet.petDescription}<br/>Nací en {this.props.pet.petBirthDate}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                <div class='ui two buttons'>
                <Button toggle active={active} onClick={this.handleLike} color='grey'><i class='heart outline icon left'></i>{buttonLike}</Button>
                <Modal trigger={<Button color='blue'>Conóceme</Button>} inverted>
                    <Modal.Header>
                        ¿Quieres contactar al dueño de la mascota?
                    </Modal.Header>
                    <Modal.Content>
                    <Button floated='right' color='orange' inverted  onClick={this.handlec}>
                        <Icon name='home' /> ¡Enviar correo!
                    </Button>
                    <br/>
                    <br/>
                    <Table celled striped color="yellow" key="yellow" >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4' textAlign='center'>Historial de vacunas</Table.HeaderCell>
                            </Table.Row>
                            <Table.Row>   
                                <Table.HeaderCell textAlign='center'>Comprobante</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Vacuna</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Veterinario</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Fecha</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {petCardHist}
                        </Table.Body>
                    </Table>
                    </Modal.Content>
                </Modal>
                </div>
                </Card.Content>
            </Card>
        )
    }
}

export default PetCard;