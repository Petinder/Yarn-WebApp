import PropTypes from 'prop-types'
import React from 'react'
import firebase from 'firebase';
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
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
    pictures: []
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
          window.location.pathname = "/filter";
        }
      });
}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
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
            vertical
          >
            <Menu
              inverted
              color='black'
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                 Contáctanos
                </Menu.Item>
                <Menu.Item as='a'>Términos y condiciones</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed}>
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
    pictures: []
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
          window.location.pathname = "/filter";
        }
      });
}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened} >
            <Menu.Item as='a' active>
              Contáctanos
            </Menu.Item>
            <Menu.Item as='a'>Términos y condiciones</Menu.Item>
            <Menu.Item as='a'>Iniciar sesión</Menu.Item>
            <Menu.Item onClick={this.handleAuth}>Regístrate</Menu.Item>
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
                  <Menu.Item position='right'>
                    <Button as='a' inverted>
                      Iniciar sesión
                    </Button>
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