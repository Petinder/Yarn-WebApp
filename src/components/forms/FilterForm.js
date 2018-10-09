import React from 'react';
import { Form, Button, Radio, FormInput, Card, Image, Grid, Rail, Segment, Sticky } from 'semantic-ui-react';
import firebase from 'firebase';

const RadioExampleToggle = () => <Radio toggle />

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
            pedigree: false,
            castrado: false,
            rootRef: firebase.database().ref().child('userPets'),
        };
    
        this.handleChangeR = this.handleChangeR.bind(this);
        this.handleChangeS = this.handleChangeS.bind(this);
        this.componentRand = this.componentRand.bind(this);
      }

    handleChangeR = (e, { value }) => {
        this.setState({ especie: value })
        console.log(value);
        this.componentRand(value, 'especie');
    }
    handleChangeS = (e, { value }) => {
        this.setState({ sexo: value })
        console.log(value);
        this.componentRand(value, 'sexo');
    }
    changeRadio = e => {
        this.setState({ [e.target.name]: e.target.checked });
        console.log("Valor ", e.target.checked, "nombre ", e.target.name)
    }

    componentRand(value, filtro) {
        console.log("INGRESO");
        //const rootRef = firebase.database().ref().child('userPets');

        const card = document.querySelector("#cardPets");
        card.innerHTML = "";

        if(filtro === 'sexo'){
            if(this.state.especie === ""){
                this.state.rootRef.on('child_added', snapshot => {
                    if(value === 'M'){
                        if(snapshot.child('petInfo/petSex').val() === 'M'){
                            card.innerHTML += "<div class='ui card'>"+
                                "<div class='content'>"+
                                "<img src='" + snapshot.child('petInfo/petPhoto').val()+"'"+
                                    "class='ui medium right floated image'/>"+
                                "<div class='header'>" + snapshot.child('petInfo/petName').val() + "</div>"+
                                "<div class='meta'>" + snapshot.child('petInfo/petBreed').val()+"</div>"+
                                "<div class='description'>"+
                                    "Steve wants to add you to the group <strong>best friends</strong>"+
                                "</div></div>"+
                                "<div class='extra content'>"+
                                "<div class='ui two buttons'>"+
                                    "<button class='ui green basic button' role='button'>Approve</button>"+
                                    "<button class='ui red basic button' role='button'>Decline</button>"+
                                "</div></div></div>"
                        }
                    }else{
                        if(snapshot.child('petInfo/petSex').val() === 'F'){
                            card.innerHTML += "<div class='ui card'>"+
                                "<div class='content'>"+
                                "<img src='" + snapshot.child('petInfo/petPhoto').val()+"'"+
                                    "class='ui medium right floated image'/>"+
                                "<div class='header'>" + snapshot.child('petInfo/petName').val() + "</div>"+
                                "<div class='meta'>" + snapshot.child('petInfo/petBreed').val()+"</div>"+
                                "<div class='description'>"+
                                    "Steve wants to add you to the group <strong>best friends</strong>"+
                                "</div></div>"+
                                "<div class='extra content'>"+
                                "<div class='ui two buttons'>"+
                                    "<button class='ui green basic button' role='button'>Approve</button>"+
                                    "<button class='ui red basic button' role='button'>Decline</button>"+
                                "</div></div></div>"
                        } 
                    }
                });
            }else{
                this.state.rootRef.orderByChild("petInfo/petSpecies").equalTo(this.state.especie).on('child_added', snapshot => {
                    if(value === 'M'){
                        if(snapshot.child('petInfo/petSex').val() === 'M'){
                            card.innerHTML += "<div class='ui card'>"+
                                "<div class='content'>"+
                                "<img src='" + snapshot.child('petInfo/petPhoto').val()+"'"+
                                    "class='ui medium right floated image'/>"+
                                "<div class='header'>" + snapshot.child('petInfo/petName').val() + "</div>"+
                                "<div class='meta'>" + snapshot.child('petInfo/petBreed').val()+"</div>"+
                                "<div class='description'>"+
                                    "Steve wants to add you to the group <strong>best friends</strong>"+
                                "</div></div>"+
                                "<div class='extra content'>"+
                                "<div class='ui two buttons'>"+
                                    "<button class='ui green basic button' role='button'>Approve</button>"+
                                    "<button class='ui red basic button' role='button'>Decline</button>"+
                                "</div></div></div>"
                        }
                    }else{
                        if(snapshot.child('petInfo/petSex').val() === 'F'){
                            card.innerHTML += "<div class='ui card'>"+
                                "<div class='content'>"+
                                "<img src='" + snapshot.child('petInfo/petPhoto').val()+"'"+
                                    "class='ui medium right floated image'/>"+
                                "<div class='header'>" + snapshot.child('petInfo/petName').val() + "</div>"+
                                "<div class='meta'>" + snapshot.child('petInfo/petBreed').val()+"</div>"+
                                "<div class='description'>"+
                                    "Steve wants to add you to the group <strong>best friends</strong>"+
                                "</div></div>"+
                                "<div class='extra content'>"+
                                "<div class='ui two buttons'>"+
                                    "<button class='ui green basic button' role='button'>Approve</button>"+
                                    "<button class='ui red basic button' role='button'>Decline</button>"+
                                "</div></div></div>"
                        } 
                    }
                });
            }
        }else{
            if(this.state.sexo === ""){
                this.state.rootRef.on('child_added', snapshot => {
                    if(value === 'Gato'){
                        if(snapshot.child('petInfo/petSpecies').val() === 'Gato'){
                            card.innerHTML += "<div class='ui card'>"+
                                "<div class='content'>"+
                                "<img src='" + snapshot.child('petInfo/petPhoto').val()+"'"+
                                    "class='ui medium right floated image'/>"+
                                "<div class='header'>" + snapshot.child('petInfo/petName').val() + "</div>"+
                                "<div class='meta'>" + snapshot.child('petInfo/petBreed').val()+"</div>"+
                                "<div class='description'>"+
                                    "Steve wants to add you to the group <strong>best friends</strong>"+
                                "</div></div>"+
                                "<div class='extra content'>"+
                                "<div class='ui two buttons'>"+
                                    "<button class='ui green basic button' role='button'>Approve</button>"+
                                    "<button class='ui red basic button' role='button'>Decline</button>"+
                                "</div></div></div>"
                        }
                    }else{
                        if(snapshot.child('petInfo/petSpecies').val() === 'Perro'){
                            card.innerHTML += "<div class='ui card'>"+
                                "<div class='content'>"+
                                "<img src='" + snapshot.child('petInfo/petPhoto').val()+"'"+
                                    "class='ui medium right floated image'/>"+
                                "<div class='header'>" + snapshot.child('petInfo/petName').val() + "</div>"+
                                "<div class='meta'>" + snapshot.child('petInfo/petBreed').val()+"</div>"+
                                "<div class='description'>"+
                                    "Steve wants to add you to the group <strong>best friends</strong>"+
                                "</div></div>"+
                                "<div class='extra content'>"+
                                "<div class='ui two buttons'>"+
                                    "<button class='ui green basic button' role='button'>Approve</button>"+
                                    "<button class='ui red basic button' role='button'>Decline</button>"+
                                "</div></div></div>"
                        } 
                    }
                });
            }else{
                this.state.rootRef.orderByChild("petInfo/petSex").equalTo(this.state.sexo).on('child_added', snapshot => {
                    if(value === 'Gato'){
                        if(snapshot.child('petInfo/petSpecies').val() === 'Gato'){
                            card.innerHTML += "<div class='ui card'>"+
                                "<div class='content'>"+
                                "<img src='" + snapshot.child('petInfo/petPhoto').val()+"'"+
                                    "class='ui medium right floated image'/>"+
                                "<div class='header'>" + snapshot.child('petInfo/petName').val() + "</div>"+
                                "<div class='meta'>" + snapshot.child('petInfo/petBreed').val()+"</div>"+
                                "<div class='description'>"+
                                    "Steve wants to add you to the group <strong>best friends</strong>"+
                                "</div></div>"+
                                "<div class='extra content'>"+
                                "<div class='ui two buttons'>"+
                                    "<button class='ui green basic button' role='button'>Approve</button>"+
                                    "<button class='ui red basic button' role='button'>Decline</button>"+
                                "</div></div></div>"
                        }
                    }else{
                        if(snapshot.child('petInfo/petSex').val() === 'Perro'){
                            card.innerHTML += "<div class='ui card'>"+
                                "<div class='content'>"+
                                "<img src='" + snapshot.child('petInfo/petPhoto').val()+"'"+
                                    "class='ui medium right floated image'/>"+
                                "<div class='header'>" + snapshot.child('petInfo/petName').val() + "</div>"+
                                "<div class='meta'>" + snapshot.child('petInfo/petBreed').val()+"</div>"+
                                "<div class='description'>"+
                                    "Steve wants to add you to the group <strong>best friends</strong>"+
                                "</div></div>"+
                                "<div class='extra content'>"+
                                "<div class='ui two buttons'>"+
                                    "<button class='ui green basic button' role='button'>Approve</button>"+
                                    "<button class='ui red basic button' role='button'>Decline</button>"+
                                "</div></div></div>"
                        } 
                    }
                });
            }
        }


        //this.state.rootRef.orderByChild("petInfo/petSpecies").startAt("P").on('child_added', snapshot => {
        //this.state.rootRef.orderByChild("petInfo/petSex").startAt(value).on('child_added', snapshot => {
        
    }

    componentDidMount() {
        //const rootRef = firebase.database().ref().child('userPets');
        const card = document.querySelector("#cardPets");

        //this.state.rootRef.orderByChild("petInfo/petSpecies").equalTo("Gato").on('child_added', snapshot => {
        //this.state.rootRef.orderByChild("petInfo/petSex").startAt(this.state.sexo).on('child_added', snapshot => {
        this.state.rootRef.on('child_added', snapshot => {
            //if(snapshot.child('petInfo/petSex').val() === 'M'){
                card.innerHTML += "<div class='ui card'>"+
                                "<div class='content'>"+
                                "<img src='" + snapshot.child('petInfo/petPhoto').val()+"'"+
                                    "class='ui medium right floated image'/>"+
                                "<div class='header'>" + snapshot.child('petInfo/petName').val() + "</div>"+
                                "<div class='meta'>" + snapshot.child('petInfo/petBreed').val()+"</div>"+
                                "<div class='description'>"+
                                    "Steve wants to add you to the group <strong>best friends</strong>"+
                                "</div></div>"+
                                "<div class='extra content'>"+
                                "<div class='ui two buttons'>"+
                                    "<button class='ui green basic button' role='button'>Approve</button>"+
                                    "<button class='ui red basic button' role='button'>Decline</button>"+
                                "</div></div></div>"
            //}
        });
    }

    handleContextRef = contextRef => this.setState({ contextRef })

    render() {
        const {sexo, especie, pedigree, castrado, contextRef} = this.state
        return (
            <Form>
                <Grid>
                <Grid.Column width={4}>
                    <Sticky context={contextRef}>
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
                        <label>Otras opciones:</label>
                        <Form.Group inline>
                            <FormInput
                                label='Pedigree' 
                                name="pedigree" 
                                type='checkbox' 
                                checked={pedigree}
                                onChange={this.changeRadio}
                            />
                            <FormInput 
                                label='Castrado' 
                                name="castrado" 
                                type='checkbox' 
                                checked={castrado} 
                                onChange={this.changeRadio}
                            />
                        </Form.Group>
                        <br/><br/>
                        <button class="negative ui button">Eliminar filtro</button>
                    </Sticky>
                </Grid.Column>
                <Grid.Column width={9}>
                    <div class='ui cards' id ='cardPets'>
                    </div>
                </Grid.Column>
                </Grid>
            </Form>
        );
    }
}
export default FilterForm;