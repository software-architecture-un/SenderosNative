import { createStackNavigator, createAppContainer } from 'react-navigation';
import Initial from './src/screens/Initial.js'
import Home from './src/screens/Home.js'
import Login from './src/screens/Login.js'
import Signup from './src/screens/Signup.js'
import Main from './src/screens/Main.js'
import MyMap from './src/screens/Map.js'
import example from './src/screens/DraggableMarkers'
import header1 from './src/components/MenuHeader'
import MenuSidebar from './src/components/MenuSidebar.js'
import MainMenu from './src/screens/MainMenu.js'
import VistaPrueba1 from './src/screens/VistaPrueba1.js'

const RootStack = createStackNavigator({
  Initial: {
    screen: Initial
  }, 
  Home: {
    screen: Home
  },
  Main: {
    screen: Main
  },
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  }, 
  MenuSidebar: {
    screen: MenuSidebar
  },
  MainMenu: {
    screen: MainMenu
  },
  VistaPrueba1: {
    screen: VistaPrueba1
  }
}); 

let App = createAppContainer(RootStack);

export default App;