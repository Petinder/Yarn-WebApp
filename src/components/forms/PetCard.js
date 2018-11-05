import React, {Component} from 'react';
import { Card, Button, Popup, Label, Image, Icon, Modal } from 'semantic-ui-react';
import firebase from 'firebase';
import 'firebase/database';
import {mailgunKey} from '../../config';
import axios from 'axios';

class PetCard extends Component {
    constructor(props){
        super(props);
        this.state={active: false};
    }

    sendMail(sendTo, mssg){
        console.log('send mail');
        var data = {
            service_id: 'gmail',
            template_id: 'petinder',
            user_id: 'user_Ra5X3rQvPEA3TcKETNOM2',
            template_params: {
                'user_name': 'James',
                'user_email': 'mimontenegro@ufm.edu'
            }
        };

        axios({
            method: 'post',
            url: 'https://api.emailjs.com/api/v1.0/email/send',
            data: JSON.stringify(data)
          }).then(function (response) {
            console.log('email was sent');
          }).catch(function (err) {
            console.log(err);
          });;
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

    render(){
        let { active } = this.state;
        this.props.pet.encanta.map(x => {
            if (x === this.props.user.toString() ){
                console.log("Debe cambiar boton a activo para la mascota " + this.props.pet.key)
            }
        });

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
                    <Modal.Header>Contáctame al número</Modal.Header>
                    <Modal.Content>
                    <i class="whatsapp icon green"></i>
                    {this.props.pet.phone}
                    <Button color='orange' inverted  onClick={this.sendMail}>
                        <Icon name='home' /> Enviar correo!
                    </Button>
                    </Modal.Content>
                </Modal>
                </div>
                </Card.Content>
            </Card>
        )
    }
}

export default PetCard;