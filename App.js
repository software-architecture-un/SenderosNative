import { createStackNavigator, createAppContainer } from 'react-navigation';
import Initial from './src/screens/Initial.js'
import Home from './src/screens/Home.js'
import Login from './src/screens/Login.js'
import Signup from './src/screens/Signup.js'
import Main from './src/screens/Main.js'
import UserData from './src/screens/UserData.js'
import MyMap from './src/screens/Map.js'
import InputMap from './src/screens/InputMap'
import MyPlaces from './src/screens/MyPlaces'
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
  UserData: {
    screen: UserData
  },
  InputMap: {
    screen: InputMap
  },
  MyPlaces: {
    screen: MyPlaces
  }
}); 

let App = createAppContainer(RootStack);

export default App;