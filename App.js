import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './src/screens/Home.js'
import Login from './src/screens/Login.js'
import Signup from './src/screens/Signup.js'
import Main from './src/screens/Main.js'
import MyMap from './src/screens/Map.js'
import example from './src/screens/DraggableMarkers'
const RootStack = createStackNavigator({
  example:{
    screen: example
  },
  MyMap: {
    screen: MyMap
  },
  Login: {
    screen: Login
  },
  Home: {
    screen: Home
  },
  
  Signup: {
    screen: Signup
  },
  Main: {
    screen: Main
  }
  
});

const App = createAppContainer(RootStack);

export default App;
