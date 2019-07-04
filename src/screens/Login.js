import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import GraphQLIP from '../connection/GraphQLIP.js';
import LocalStorage from '../components/LocalStorage.js'


export default class Login extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state= {email:"", password:"", resp:""}
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>SENDEROS</Text>
        <Text style={styles.welcome}>UN</Text>

        <Text style={styles.labelField}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo electrónico"
          onChangeText={(email)=>this.setState({email})}
          value={this.state.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.labelField}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su contraseña"
          onChangeText={(password)=>this.setState({password})}
          value={this.state.password}
          secureTextEntry={true}
        />

        <TouchableOpacity 
          style={styles.btnEnter}
          onPress={this._signin}
        >
          <Text style={styles.btnEnterText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnBack}
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text style={styles.btnEnterText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
    
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
          alert("Ningún campo puede estar vacío");
        }
        else if(res.data.signIn !== null) {
          LocalStorage.saveToken(JSON.stringify(res.data.signIn.content));
          LocalStorage.getToken();
          this.props.navigation.navigate('Main')
        }
        else {
          alert("Correo electrónico o contraseña incorrectos")
        } 
      }) 
      .catch((error)=>{
        alert(error.message)
      });
  }
}

const styles =StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2B303A',
    fontFamily: 'sans-serif',
  },
  welcome: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#D64933',
    textAlign: 'center',
    margin: 10
  },
  labelField: {
    fontSize: 20,
    color: '#92DCE5',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
    padding: 5,
    fontSize: 20,
    backgroundColor: '#FFFFFF',
  },
  btnEnter: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 15,
    padding: 5,
    backgroundColor: "#92DCE5",
    color: '#2B303A',
  },
  btnBack: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 15,
    padding: 5,
    backgroundColor: "#D64933",
    color: '#2B303A',
  },
  btnEnterText: {
    fontSize: 20,
    color: '#2B303A',
  },
});
