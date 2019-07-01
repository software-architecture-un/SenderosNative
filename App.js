import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './src/screens/Home.js'
import Login from './src/screens/Login.js'
import Signup from './src/screens/Signup.js'
import Main from './src/screens/Main.js'

const RootStack = createStackNavigator({
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
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
