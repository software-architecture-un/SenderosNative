import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import GraphQLIP from '../connection/GraphQLIP.js';
import LocalStorage from '../components/LocalStorage.js';
import usersImage from '../images/user.png'

export default class FlatMeu extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state= {keepEmail:"", id:"", name:"", document:"", age:"", email:""}
  }

  async componentDidMount() {  
   
    var storeEmail = await LocalStorage.getEmail();
    this.setState({keepEmail: storeEmail});

    await this._userByEmail();
  }

  _logout = async () => {
    await LocalStorage.resetToken();
    await LocalStorage.resetEmail();
    await LocalStorage.resetId();
    
    this.props.navigation.navigate('Home');
}

  render() {
    return (
      <ScrollView style={styles.container}>

        <Image
          style={styles.imageStyle}
          source={usersImage}
        />

        <Text style={styles.welcome}>{this.state.name}</Text>

        <TouchableOpacity 
          style={styles.btnNormal}
          onPress={() => this.props.navigation.navigate('UserData')}
        >
          <Text style={styles.btnEnterText}>Datos personales</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnNormal}
          onPress={() => this.props.navigation.navigate('InputMap')}
        >
          <Text style={styles.btnEnterText}>Crear lugar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnNormal}
          onPress={() => this.props.navigation.navigate('MyPlaces')}
        >
          <Text style={styles.btnEnterText}>Mis lugares</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnNormal}
          onPress={() => this.props.navigation.navigate('InputList')}
        >
          <Text style={styles.btnEnterText}>Crear lista de lugares</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnNormal}
          onPress={() => this.props.navigation.navigate('ViewAllMyLists')}
        >
          <Text style={styles.btnEnterText}>Mis listas de lugares</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnNormal}
          onPress={this._signup}
        >
          <Text style={styles.btnEnterText}>Crear ruta</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnNormal}
          onPress={this._signup}
        >
          <Text style={styles.btnEnterText}>Mis rutas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnLogout}
          onPress={this._logout}
        >
          <Text style={styles.btnEnterText}>Salir</Text>
        </TouchableOpacity>
                
      </ScrollView>
    );
  }

  _userByEmail = async () => {
    const query = `
    mutation {
        userByEmail(email: 
          {
            email: "${this.state.keepEmail}"
          }
        )
        {
          content
          {
            id
            name
            document
            age
            email
          }
        }
      }
      `;
  
      const url = GraphQLIP;
      
      const opts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query })
      };
  
      let res = await fetch(url, opts);
      res = await res.json()

      if(res.data.userByEmail !== null) {
        console.log(res.data.userByEmail.content)

        this.setState({id: (res.data.userByEmail.content.id).toString()});
        this.setState({name: res.data.userByEmail.content.name});
        this.setState({document: res.data.userByEmail.content.document});
        this.setState({age: res.data.userByEmail.content.age});
        this.setState({email: res.data.userByEmail.content.email});
      }
      else {
        console.log("El usuario no existe o se trajo mal")
      } 

      await LocalStorage.saveId(this.state.id);

      var x = await LocalStorage.getId();
      console.log("Obtuve el ID: ", x)
  }
}

const styles = StyleSheet.create ({
    imageStyle: {
      alignSelf: 'center',
      width: 100,
      height: 100,
      borderRadius: 100,
      backgroundColor: '#7C7C7C',
      marginTop: 20,
      marginBottom: 10,
      marginLeft: 20,
      marginRight: 20,
    },
  container: {
    backgroundColor: '#2B303A',
    fontFamily: 'sans-serif',
  },
  welcome: {
    fontSize: 20,
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
  btnNormal: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 0,
    padding: 5,
    backgroundColor: "#92DCE5",
    color: '#2B303A',
  },
  btnLogout: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 0,
    padding: 5,
    backgroundColor: "#D64933",
    color: '#2B303A',
  },
  btnEnterText: {
    fontSize: 20,
    color: '#2B303A',
  },
});