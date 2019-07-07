import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class Home extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    console.log("Los props de home: ", super(props))
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>SENDEROS</Text>

        <Text style={styles.welcome}>UN</Text>

        <TouchableOpacity 
          style={styles.btnLogin}
          
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text style={styles.btnEnterText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnSignup}
          onPress={() => this.props.navigation.navigate('Signup')}
        >
          <Text style={styles.btnEnterText}>Crear cuenta</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Universidad Nacional de Colombia</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  btnLogin: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 15,
    padding: 5,
    backgroundColor: "#92DCE5",
    color: '#2B303A',
  },
  btnSignup: {
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 50,
    marginTop: 30,
    fontSize: 20,
    marginBottom: 5,
    borderRadius: 15,
    color: '#92DCE5',
  },
});
