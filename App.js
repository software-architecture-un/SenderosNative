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
import ViewAllMyLists from './src/screens/ViewAllMyLists.js'
import ViewList from './src/screens/ViewList.js'
import InputList from './src/screens/InputList.js'
import InputRoute from './src/screens/InputRoute.js'
import MyRoutes from './src/screens/MyRoutes.js'
import ViewRoute from './src/screens/ViewRoute.js'
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
  },
  InputList: {
    screen: InputList
  },
  ViewAllMyLists: {
    screen: ViewAllMyLists
  },
  ViewList: {
    screen : ViewList
  },
  InputRoute: {
    screen: InputRoute
  },
  MyRoutes: {
    screen: MyRoutes
  },
  ViewRoute: {
    screen: ViewRoute
  },

}); 

let App = createAppContainer(RootStack);

export default App;