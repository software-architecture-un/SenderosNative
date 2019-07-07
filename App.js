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
import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, View } from 'react-native';

export default class App extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {isValid:""}
  }

  async componentDidMount() {  
   
    LocalStorage.validateToken()
    .then(response => {
      this.setState({isValid: response})
      console.log("Validación desde App.js: ", response);
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  render() {
    return (
      <View>
        <Text>Estado del token: {this.state.isValid}</Text>
      </View>
      );
    }
}

//  const RootStackWithoutSession = createStackNavigator({
//   Home: {
//     screen: Home
//   },
//   Login: {
//     screen: Login
//   },
//   Signup: {
//     screen: Signup
//   },
//   Main: {
//     screen: Main
//   },
//   MenuSidebar: {
//     screen: MenuSidebar
//   },
// });

// const RootStackWithSession = createStackNavigator({
//   Main: {
//     screen: Main
//   }, 
//   Home: {
//     screen: Home
//   },
//   Login: {
//     screen: Login
//   },
//   Signup: {
//     screen: Signup
//   }, 
//   MenuSidebar: {
//     screen: MenuSidebar
//   },
// }); 

// //   if(obtainedJWT === null || obtainedJWT === '') {
// //     RootStack = RootStackWithoutSession;
// //   }
// //   else {
// //     RootStack = RootStackWithSession;
// //   }

// RootStack = RootStackWithoutSession;

// let App = createAppContainer(RootStack);

// export default App;