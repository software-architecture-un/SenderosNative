import { createStackNavigator, createAppContainer } from 'react-navigation';
import Initial from './src/screens/Initial.js'
import Home from './src/screens/Home.js'
import Login from './src/screens/Login.js'
import Signup from './src/screens/Signup.js'
import Main from './src/screens/Main.js'
import MyMap from './src/screens/Map.js'
import imputMap from './src/screens/InputMap'
import myMaps from './src/screens/MyPlaces'
import FlatMenu from './src/screens/FlatMenu.js'
import header1 from './src/components/MenuHeader'
import MenuSidebar from './src/components/MenuSidebar.js'

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
  FlatMenu: {
    screen: FlatMenu
  },
}); 

let App = createAppContainer(RootStack);

export default App;