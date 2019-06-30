import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './views/Home.js'
import Login from './views/Login.js'
import Signup from './views/Signup.js'

const RootStack = createStackNavigator({
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  }
});

const App = createAppContainer(RootStack);

export default App;
