import React from 'react';
import { Form, Button, FormField, Radio, FormRadio, FormInput } from 'semantic-ui-react';
import firebase from 'firebase';

const RadioExampleToggle = () => <Radio toggle />

const OpcionesRaza = [
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
            valor: "",
            radio: "",
            sexo: "",
            raza: "",
            pedigree: false,
            castrado: false,
            rootRef: firebase.database().ref().child('userPets')
        };
    
        this.handleChangeR = this.handleChangeR.bind(this);
        this.handleChangeS = this.handleChangeS.bind(this);
        this.componentRand = this.componentRand.bind(this);
      }

    handleChangeR = (e, { value }) => {
        this.setState({ raza: value })
        console.log(value);
        this.componentRand(value, 'raza');
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
    change = e => {
        console.log("change");
        const {name, value} = e.target;
        console.log(value);
        this.setState({[name]: value});
    }

    componentRand(value, filtro) {
        console.log("INGRESO");
        //const rootRef = firebase.database().ref().child('userPets');

        const table = document.querySelector("#petTable");
        table.innerHTML = "";

        if(filtro === 'sexo'){
            if(this.state.raza === ""){
                this.state.rootRef.on('child_added', snapshot => {
                    if(value === 'M'){
                        if(snapshot.child('petInfo/petSex').val() === 'M'){
                            table.innerHTML += "<tr class='single line'><td class='single line'><div class='ui star rating' role='radiogroup'>"+
                                        "<i aria-checked='false' aria-posinset='1' aria-setsize='3' class='active icon' tabindex='0' role='radio' /></div>" +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petName').val() + 
                                        "<td class='single line'>" + snapshot.child('petInfo/petSex').val() +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petBreed').val() +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petSpecies').val() +"</td></td></tr>"
                        }
                    }else{
                        if(snapshot.child('petInfo/petSex').val() === 'F'){
                            table.innerHTML += "<tr class='single line'><td class='single line'><div class='ui star rating' role='radiogroup'>"+
                                        "<i aria-checked='false' aria-posinset='1' aria-setsize='3' class='active icon' tabindex='0' role='radio' /></div>" +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petName').val() + 
                                        "<td class='single line'>" + snapshot.child('petInfo/petSex').val() +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petBreed').val() +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petSpecies').val() +"</td></td></tr>"
                        } 
                    }
                });
            }else{
                this.state.rootRef.orderByChild("petInfo/petSpecies").equalTo(this.state.raza).on('child_added', snapshot => {
                    if(value === 'M'){
                        if(snapshot.child('petInfo/petSex').val() === 'M'){
                            table.innerHTML += "<tr class='single line'><td class='single line'><div class='ui star rating' role='radiogroup'>"+
                                        "<i aria-checked='false' aria-posinset='1' aria-setsize='3' class='active icon' tabindex='0' role='radio' /></div>" +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petName').val() + 
                                        "<td class='single line'>" + snapshot.child('petInfo/petSex').val() +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petBreed').val() +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petSpecies').val() +"</td></td></tr>"
                        }
                    }else{
                        if(snapshot.child('petInfo/petSex').val() === 'F'){
                            table.innerHTML += "<tr class='single line'><td class='single line'><div class='ui star rating' role='radiogroup'>"+
                                        "<i aria-checked='false' aria-posinset='1' aria-setsize='3' class='active icon' tabindex='0' role='radio' /></div>" +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petName').val() + 
                                        "<td class='single line'>" + snapshot.child('petInfo/petSex').val() +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petBreed').val() +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petSpecies').val() +"</td></td></tr>"
                        } 
                    }
                });
            }
        }else{
            if(this.state.sexo === ""){
                this.state.rootRef.on('child_added', snapshot => {
                    if(value === 'Gato'){
                        if(snapshot.child('petInfo/petSpecies').val() === 'Gato'){
                            table.innerHTML += "<tr class='single line'><td class='single line'><div class='ui star rating' role='radiogroup'>"+
                                        "<i aria-checked='false' aria-posinset='1' aria-setsize='3' class='active icon' tabindex='0' role='radio' /></div>" +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petName').val() + 
                                        "<td class='single line'>" + snapshot.child('petInfo/petSex').val() +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petBreed').val() +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petSpecies').val() +"</td></td></tr>"
                        }
                    }else{
                        if(snapshot.child('petInfo/petSpecies').val() === 'Perro'){
                            table.innerHTML += "<tr class='single line'><td class='single line'><div class='ui star rating' role='radiogroup'>"+
                                        "<i aria-checked='false' aria-posinset='1' aria-setsize='3' class='active icon' tabindex='0' role='radio' /></div>" +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petName').val() + 
                                        "<td class='single line'>" + snapshot.child('petInfo/petSex').val() +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petBreed').val() +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petSpecies').val() +"</td></td></tr>"
                        } 
                    }
                });
            }else{
                this.state.rootRef.orderByChild("petInfo/petSex").equalTo(this.state.sexo).on('child_added', snapshot => {
                    if(value === 'Gato'){
                        if(snapshot.child('petInfo/petSpecies').val() === 'Gato'){
                            table.innerHTML += "<tr class='single line'><td class='single line'><div class='ui star rating' role='radiogroup'>"+
                                        "<i aria-checked='false' aria-posinset='1' aria-setsize='3' class='active icon' tabindex='0' role='radio' /></div>" +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petName').val() + 
                                        "<td class='single line'>" + snapshot.child('petInfo/petSex').val() +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petBreed').val() +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petSpecies').val() +"</td></td></tr>"
                        }
                    }else{
                        if(snapshot.child('petInfo/petSex').val() === 'Perro'){
                            table.innerHTML += "<tr class='single line'><td class='single line'><div class='ui star rating' role='radiogroup'>"+
                                        "<i aria-checked='false' aria-posinset='1' aria-setsize='3' class='active icon' tabindex='0' role='radio' /></div>" +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petName').val() + 
                                        "<td class='single line'>" + snapshot.child('petInfo/petSex').val() +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petBreed').val() +
                                        "</td><td class='single line'>" + snapshot.child('petInfo/petSpecies').val() +"</td></td></tr>"
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
        console.log("ENTRO COMPONENT");
        const table = document.querySelector("#petTable");

        //this.state.rootRef.orderByChild("petInfo/petSpecies").equalTo("Gato").on('child_added', snapshot => {
        //this.state.rootRef.orderByChild("petInfo/petSex").startAt(this.state.sexo).on('child_added', snapshot => {
        this.state.rootRef.on('child_added', snapshot => {
            //if(snapshot.child('petInfo/petSex').val() === 'M'){
                table.innerHTML += "<tr class='single line'><td class='single line'><div class='ui star rating' role='radiogroup'>"+
                            "<i aria-checked='false' aria-posinset='1' aria-setsize='3' class='active icon' tabindex='0' role='radio' /></div>" +
                            "</td><td class='single line'>" + snapshot.child('petInfo/petName').val() + 
                            "<td class='single line'>" + snapshot.child('petInfo/petSex').val() +
                            "</td><td class='single line'>" + snapshot.child('petInfo/petBreed').val() +
                            "</td><td class='single line'>" + snapshot.child('petInfo/petSpecies').val() +"</td></td></tr>"
            //}
        });
    }

    render() {
        const {valor, radio, sexo, raza, pedigree, castrado} = this.state
        return (
            <Form>
                <Form.Select
                    fluid
                    selection
                    label='Raza'
                    options={OpcionesRaza}
                    value={raza}
                    placeholder='Raza'
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
                <Form.Group inline>
                    <label>Otras opciones:</label>
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

                    <Form.Input
                        name = "valor"
                        onChange={this.change}
                        value={valor}
                        placeholder = "Valor"
                        fluid
                    />
                    <button class="negative ui button">Eliminar filtro</button>
                </Form.Group>
            </Form>
        );
    }
}
export default FilterForm;