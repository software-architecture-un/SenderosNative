import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import GraphQLIP from '../connection/GraphQLIP.js';
import LocalStorage from '../components/LocalStorage.js'

export default class Signup extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state= {name:"", document:"", age:"", email:"", password:""}
  }

  render() {
    return (
      <ScrollView style={styles.container}>

        <Text style={styles.welcome}>Crear cuenta</Text>

        <Text style={styles.labelField}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          onChangeText={(name)=>this.setState({name})}
          value={this.state.name}
        />

        <Text style={styles.labelField}>Documento</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su número de identificación"
          onChangeText={(document)=>this.setState({document})}
          value={this.state.document}
          keyboardType="numeric"
        />

        <Text style={styles.labelField}>Edad</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su edad"
          onChangeText={(age)=>this.setState({age})}
          value={this.state.age}
          keyboardType="numeric"
        />

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
          style={styles.btnSignup}
          onPress={this._signup}
        >
          <Text style={styles.btnEnterText}>Crear cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnBack}
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text style={styles.btnEnterText}>Volver</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  _signup = async () => {
    const query = `
    mutation {
      createUser(user: {
        name: "${this.state.name}"
        document: "${this.state.document}"
        age: ${this.state.age}
        email: "${this.state.email}"
        password: "${this.state.password}"
      }) {
        content {
          name
          document
          age
          email
        }
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
        if(this.state.name === "" || this.state.document === "" || this.state.age === "" || 
        this.state.email === "" || this.state.password === "") {
          alert("Ningún campo puede estar vacío");
        }
        else if(res.data.createUser !== null) {
          alert("Usuario creado correctamente")
          this.props.navigation.navigate('Home')
        }
        else {
          alert("Datos incorrectos")
        } 
      }) 
      .catch((error)=>{
        alert(error.message)
      });
  }
}

const styles =StyleSheet.create ({
  container: {
    backgroundColor: '#2B303A',
    fontFamily: 'sans-serif',
  },
  welcome: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#D64933',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  labelField: {
    fontSize: 20,
    color: '#92DCE5',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
    padding: 5,
    fontSize: 20,
    backgroundColor: '#FFFFFF',
  },
  btnSignup: {
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
    marginTop: 10,
    marginBottom: 40,
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