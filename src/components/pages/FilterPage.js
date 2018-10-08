import React from 'react';
import FilterForm from "../forms/FilterForm";
import Table from "../forms/Table";
import firebase from 'firebase';
import 'firebase/database';

class FilterPage extends React.Component {
    submit = data => 
        this.props.login(data).then(() => this.props.history.push("/"));

    constructor (){
        super();
        this.state = {
            pets: ["MILI"],
            namesP: ["Saber"]
        };
    }

    gotData(data) {
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

    gotError(err){
        console.log('Error!');
        console.log(err);
    }
    
    componentDidMount() {
        const rootRef = firebase.database().ref().child('userPets');
        const petRef = rootRef.child('1');
        //Especifico valor
        const due = petRef.child('ownerInfo/name');

        this.setState({
            pets:["Linda ", " Morales"]
        });

        /*due.on('value', snap => {
            this.setState({
                pets:snap.val()
            });
        });*/
        //todos los animales de la base de datos
        //rootRef.on('value', this.gotData, this.gotError);
        
        const table = document.querySelector("#petTable");

        /*rootRef.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childSnapshot = childSnapshot.val();
                console.log(childSnapshot);
            });
        });*/

        rootRef.on('child_added', snapshot => {
            table.innerHTML += "<tr class='single line'><td class='single line'><div class='ui star rating' role='radiogroup'>"+
                            "<i aria-checked='false' aria-posinset='1' aria-setsize='3' class='active icon' tabindex='0' role='radio' /></div>" +
                            "</td><td class='single line'>" + snapshot.child('petInfo/petName').val() + 
                            "<td class='single line'>" + snapshot.child('petInfo/petSex').val() +
                            "</td><td class='single line'>" + snapshot.child('petInfo/petBreed').val() +
                            "</td><td class='single line'>" + snapshot.child('petInfo/petSpecies').val() +"</td></td></tr>"
        });
    }

    render(){
        return(
           <div>
            <h1>Filtros</h1>
            <FilterForm submit={this.submit} />
            <h1>{this.state.pets}</h1><h3>{this.state.namesP}</h3>
            <Table /*data={[
                {name:['5', '4']},
                {name: this.state.pets},
                //{name: ["Linda ", " Morales"]},
                {name:['Masculino', 'Femenino']},
                {name:['Puddul', 'chiguagua']},
                {name:['Chihuagua','quien']}]}*/
                 header={[
                {name:'Rating'},
                {name:'Nombre'},
                {name:'Sexo'},
                {name:'Raza'},
                {name:'Especie'}]}/>
           </div>
        );
    }
}

export default FilterPage;