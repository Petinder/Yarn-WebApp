import React, {Component} from 'react';
import { Card, Button, Popup, Rating, Image } from 'semantic-ui-react';
import firebase from 'firebase';
import 'firebase/database';

class PetCard extends Component {
    constructor(props){
        super(props);
        this.state={};
    }

    handleLike = () =>{
        this.setState({ active: !this.state.active })
        
        const dbRef = firebase.database().ref('userPets/' + this.props.pet.key  +'/likeInfo');
        const Data = dbRef.push();
        Data.set({keyPet: this.props.user});
    }

    render(){
        const { active } = this.state

        let buttonLike = "";
        if(this.props.pet.petSpecies === "Perro"){
            buttonLike = "Guau"
        }else{
            buttonLike = "Miau"
        }
        
        return(
            <Card>
                <Popup trigger={<Image src={this.props.pet.petPhoto} />} inverted>
                    <Popup.Header>Rating</Popup.Header>
                    <Popup.Content>
                    <Rating icon='star' defaultRating={3} maxRating={4} />
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
                <Button toggle active={active} onClick={this.handleLike} color='gray'><i class='heart outline icon left'></i>{buttonLike}</Button>
                <Popup trigger={<Button color='blue'>Conóceme</Button>} inverted>
                    <Popup.Header>Contáctame al número</Popup.Header>
                    <Popup.Content>
                    <i class="whatsapp icon green"></i>
                    {this.props.pet.phone}
                    </Popup.Content>
                </Popup>
                </div>
                </Card.Content>
            </Card>
        )
    }
}

export default PetCard;