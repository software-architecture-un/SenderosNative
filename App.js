import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './src/screens/Home.js'
import Login from './src/screens/Login.js'
import Signup from './src/screens/Signup.js'
import Main from './src/screens/Main.js'
import MyMap from './src/screens/Map.js'
import example from './src/screens/DraggableMarkers'
import header1 from './src/components/MenuHeader'
import LocalStorage from './src/components/LocalStorage.js'
import MenuSidebar from './src/components/MenuSidebar.js'

 const RootStackWithoutSession = createStackNavigator({
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
  },
  MenuSidebar: {
    screen: MenuSidebar
  },
});

const RootStackWithSession = createStackNavigator({
  Main: {
    screen: Main
  }, 
  Home: {
    screen: Home
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
}); 

LocalStorage.getToken().then(function(value){
  alert(value);

  //return value;
})

//   alert(obtainedJWT);

//   if(obtainedJWT === null || obtainedJWT === '') {
//     RootStack = RootStackWithoutSession;
//   }
//   else {
//     RootStack = RootStackWithSession;
//   }

RootStack = RootStackWithoutSession;

let App = createAppContainer(RootStack);

export default App;

  
