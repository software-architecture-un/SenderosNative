import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import GraphQLIP from '../connection/GraphQLIP.js';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state= {email:"", password:""}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciar sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          onChangeText={(email)=>this.setState({email})}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={(password)=>this.setState({password})}
          value={this.state.password}
          secureTextEntry={true}
        />

        <TouchableOpacity 
          style={styles.btnEnter}
          onPress={this._signin}
        >
          <Text style={styles.btnEnterText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async getKey() {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      this.setState({myKey: value});
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  async saveKey(value) {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  _signin = async () => {
    const query = `
          mutation {
              signIn(user: {
                  email: "${this.state.email}"
                  password: "${this.state.password}"
              }) {
                  content
                  message 
                  status
              } 
          }
      `;

      const url = GraphQLIP;
      const opts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query })
      };

      fetch(url, opts)
      .then(res => res.json())
      .then(res => {
        if(this.state.email === "" || this.state.password === "") {
          alert('Ningún campo puede estar vacío')
        } else if( res.data.signIn !== null) {
          
      
          //this.props.navigation.navigate('Main')
        } else {
          alert('Correo electrónico o contraseña incorrectos')
        }
      })
      .catch(function(error) {
        throw error;
      });
  }
}

const styles =StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  input: {
    margin: 15,
    height: 40,
    padding: 5,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#42BAF8'
  },
  btnEnter: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: "#42BAF8",
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    padding: 10
  },
  btnEnterText: {
    color: "#FFFFFF",
    fontWeight: '700'
  },
});
