import firebase from 'firebase';
import PropTypes from 'prop-types'
import React from 'react'
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Image,
  Modal,
  TransitionablePortal
} from 'semantic-ui-react'

class LoginPage extends React.Component {
    //Manejar estados
    constructor (){
        super();
        this.state={
        //objeto
        user: null,
        userId: ""
    };
  }

    handleAuth(){
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(result => console.log(`${result.user.email} ha iniciado sesion`))
        .catch(error => console.log(`Error ${error.code}: ${error.message}`))
    }

    //Ciclo de vida
    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.setState({ user, userMail: user.email });
                var key = "";
                firebase.database().ref('userPets').orderByChild('ownerInfo/mail').equalTo(user.email).once("value").then((snapshot) => {
                    if (snapshot.exists()){
                        console.log(snapshot.val());
                        snapshot.forEach((childSnapshot) => {
                            key = childSnapshot.key;
                            this.getUserId(key);
                        });
                        this.props.history.push("/filter");
                    }else{
                        this.props.history.push("/profile");
                    }
                })   
            }
          });     
    }

    getUserId(key){
        this.setState({userId: key});
        console.log("User logged: " + key);
    }


    render(){

        return(
            <div class="ui inverted yellow vertical center aligned segment"  style={{ minHeight: 550, padding: '1em 0em' }}>
            <Segment
            inverted
            color='yellow'
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical>
            <Menu
              inverted
              color='black'
              size='large'>
              <Container>
                <Menu.Item as='a' role='button'
                    href='/contacto'
                    active>
                    Contáctanos
                </Menu.Item>

                    <Modal trigger={<Menu.Item as='a' role='button'>Términos y condiciones</Menu.Item>}>
                    <Modal.Header>Términos y condiciones de nuestra aplicación Petinder</Modal.Header>
                    <Modal.Content >
                    <Modal.Description >
                        <p>Al utilizar nuestro sitio web u obtener cualquier producto o servicio a través del mismo, usted, 
                            como usuario, autoriza la recopilación y utilización de la información según lo establecido en 
                            la presente política.</p>
                        <Header>Información que recopilamos y ¿Cómo la usamos?</Header>
                        <p>Con el fin de brindarle mejores productos y servicios, nuestro sitio web recopila dos tipos de 
                            información: información personal e información no personal.</p>
                        <p><strong>Información personal</strong>: Es aquella información que nos permite conocer los detalles 
                        específicos de quién es usted y puede utilizarse para identificarlo, ponerse en contacto con usted o 
                        localizarlo. Usted puede optar por no brindar ningún tipo de información personal y, aún así, podrá 
                        tener acceso a la mayoría de las secciones del sitio web. Sin embargo, se puede recopilar cierta 
                        información personal de los visitantes que buscan obtener los servicios que ofrecemos, como:</p>
                        <ul>
                        <li>Correo electrónico y nombre al momento de iniciar sesión</li>
                        <li>Información de su mascota al momento de crearle un perfil</li>
                        <li>Al momento de buscar una mascota ideal</li>
                        <li>Formar parte e alguna comunidad dentro de la aplicación web</li>
                        </ul>
                        <p>Entre los ejemplos de la información personal que usted puede enviar se incluyen su nombre o, al combinarse 
                            con su nombre u otra información que razonablemente pudiese ser utilizada para identificarlo a usted, su 
                            domicilio postal, número de teléfono, número de celular, dirección de correo electrónico y cualquier otra 
                            información de identificación y contacto. También es posible que recopilemos otros tipos de información 
                            que usted pueda haber ingresado.</p>
                        <p>Nuestra aplicación utiliza esta información personal para brindar servicios, desempeñar sus 
                            actividades comerciales y mejorar la experiencia de los visitantes de nuestro sitio web.</p>
                        <p><strong>Información no personal</strong>: Es información que no identifica a un individuo en particular 
                            por sí sola ni en combinación con otra información no personal. Nuestra aplicación puede recopilar información 
                            no personal utilizando cookies, agentes o a través de la recopilación de datos de tráfico e información sobre 
                            la ubicación.</p>
                        <Header>Prácticas sobre seguridad de la información</Header>
                        <p>Petinder realiza esfuerzos comercialmente razonables para prevenir que terceros adquieran, alteren o destruyan
                             información puesta a disposición en nuestra aplicación web. Estos esfuerzos incluyen la supervisión del tráfico 
                             de la red con el fin de identificar intentos no autorizados de cargar (subir) o cambiar información; además, 
                             en algunas circunstancias, incluye la encriptación de la información confidencial utilizando capas de conexión 
                             segura (SSL, Secure Socket Layers) u otra tecnología similar. Este control también se realiza para evitar que 
                             se lleven a cabo actividades ilegales o que pudieran someter a Petinder a responsabilidad civil o daños. </p>
                        <p>Petinder tiene el compromiso de mantener la seguridad del sitio web y el cumplimiento continuo de las leyes, 
                            de manera que este servicio permanezca disponible para todos los visitantes. Aunque Petinder realiza esfuerzos 
                            comercialmente razonables para evitar que terceros no autorizados adquieran información personal, la intercepción 
                            o adquisición ilícita por parte de un tercero sigue siendo posible.</p>
                    </Modal.Description>
                    </Modal.Content>
                    </Modal>

                <Menu.Item position='right'>
                  <Button as='a' inverted onClick={this.handleAuth}>
                    Iniciar sesión
                  </Button>
                  <Button inverted style={{ marginLeft: '0.5em' }} onClick={this.handleAuth}>
                    Regístrate
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <Container text>
                <Header
                as='h1'
                content='Petinder'
                inverted
                style={{
                    fontSize: '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: '3em',
                }}
                />
                <Header
                as='h2'
                content='¡Conectando mascotas!'
                inverted
                style={{
                    fontSize: '1.7em',
                    fontWeight: 'normal',
                    marginTop: '1.5em',
                }}
                />
                <Button color="orange" size='huge' onClick={this.handleAuth}>
                Únete
                <Icon name='right arrow' />
                </Button>
            </Container>
            </Segment>
        </div>
        );
    }
}

export default LoginPage;