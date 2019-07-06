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
import {TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {isValid:""}

    //this._validateToken()
  }

  async componentDidMount() {  
    const response = await LocalStorage.validateToken(this.state.token);  // it will wait here untill function a finishes

    console.log("Validación desde App.js: ", response); // after function a finished, this function will calls
  }

  render() {
    return (
      <View>
        {/* <TouchableOpacity 
          onPress={this._validateToken}
        >
          <Text>Oprima</Text>
        </TouchableOpacity> */}

        <Text>Estado del token: {this.state.isValid}</Text>
      </View>
      );
    }

    async _validateToken() {
      const response = await LocalStorage.validateToken(this.state.token)
      console.log("Validación desde App.js: ", response)

    //   LocalStorage.validateToken(this.state.token)
    //   .then(value => {
    //     this.setState({isValid: value});

    //     console.log("Validación desde App.js: ", value)
    //   })
    //   .catch((error)=>{
    //       alert(error.message)
    //     });
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

// LocalStorage.getToken().then(function(value){
//   //alert(value);

//   //return value;
// })

// //   if(obtainedJWT === null || obtainedJWT === '') {
// //     RootStack = RootStackWithoutSession;
// //   }
// //   else {
// //     RootStack = RootStackWithSession;
// //   }

// RootStack = RootStackWithoutSession;

// let App = createAppContainer(RootStack);

// export default App;

  
