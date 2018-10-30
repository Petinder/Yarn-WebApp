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
  Modal,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

const HomepageHeading = ({ mobile }) => (
    <Container text>
        <Header
        as='h1'
        content='Petinder'
        inverted
        style={{
            fontSize: mobile ? '2em' : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile ? '1.5em' : '3em',
        }}
        />
        <Header
        as='h2'
        content='¡Conectando mascotas!'
        inverted
        style={{
            fontSize: mobile ? '1.5em' : '1.7em',
            fontWeight: 'normal',
            marginTop: mobile ? '0.5em' : '1.5em',
        }}
        />
    </Container>
)

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
}

class DesktopContainer extends React.Component {
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
                        //this.props.history.push("/filter");
                        window.location.pathname='/filter'
                    }else{
                        window.location.pathname='/profile'
                    }
                })   
            }
          });     
    }

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    getUserId(key){
        this.setState({userId: key});
        console.log("User logged: " + key);
    }

    render(){
        const { children } = this.props
        const { fixed } = this.state

        return(
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                once={false}
                onBottomPassed={this.showFixedMenu}
                onBottomPassedReverse={this.hideFixedMenu}
                >

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
                    <Button as='a' inverted={!fixed} onClick={this.handleAuth}>
                        Iniciar sesión
                    </Button>
                    <Button inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }} onClick={this.handleAuth}>
                        Regístrate
                    </Button>
                    </Menu.Item>

                </Container>
                </Menu>
                <HomepageHeading />
                    
                    
                <Button color="orange" size='huge' onClick={this.handleAuth}>
                Únete
                <Icon name='right arrow' />
                </Button>
                
                
                </Segment>
                </Visibility>

            {children}
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

class MobileContainer extends React.Component {
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
                        window.location.pathname='/filter'
                    }else{
                        window.location.pathname='/profile'
                    }
                })   
            }
          });     
    }

    handlePusherClick = () => {
        const { sidebarOpened } = this.state
        if (sidebarOpened) this.setState({ sidebarOpened: false })
    }
    
    handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

    getUserId(key){
        this.setState({userId: key});
        console.log("User logged: " + key);
    }

    render(){
        const { children } = this.props
        const { sidebarOpened } = this.state

        return(
            <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
            <Sidebar.Pushable>
                <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened} >
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

                    <Menu.Item as='a' role='button' onClick={this.handleAuth}>
                    Iniciar sesión
                    </Menu.Item>
                    <Menu.Item as='a' role='button' onClick={this.handleAuth}>
                    Regístrate
                    </Menu.Item>
                </Sidebar>

            <Sidebar.Pusher
                dimmed={sidebarOpened}
                onClick={this.handlePusherClick}
                style={{ minHeight: '100vh' }}
            >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
              color='yellow'
            >
            
            <Menu
              inverted
              color='black'
              size='large'
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                </Menu>
              </Container>
              </Menu>
              <HomepageHeading mobile />
              <Button color="orange" size='huge' onClick={this.handleAuth}>
                Únete
                <Icon name='right arrow' />
              </Button>
            </Segment>

            {children}
            </Sidebar.Pusher>
            </Sidebar.Pushable>
            </Responsive>
        )
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

const LoginPage = () => (
<ResponsiveContainer>
</ResponsiveContainer>
)

export default LoginPage