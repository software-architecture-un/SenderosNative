import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, ScrollView, Image, View } from 'react-native';
import GraphQLIP from '../connection/GraphQLIP.js';
import LocalStorage from '../components/LocalStorage.js';
import usersImage from '../images/user.png'

export default class UserData extends Component {
  static navigationOptions = {
    headerStyle: {
        backgroundColor: '#2B303A',
        borderBottomColor: '#2B303A',
        borderBottomWidth: 0,
      },
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

  render() {
    return (
      <ScrollView style={styles.container}>

        <Image
          style={styles.imageStyle}
          source={usersImage}
        />

        <Text style={styles.labelField}>Nombre</Text>
        <Text style={styles.dataField}>{this.state.name}</Text>

        <Text style={styles.labelField}>Documento</Text>
        <Text style={styles.dataField}>{this.state.document}</Text>

        <Text style={styles.labelField}>Edad</Text>
        <Text style={styles.dataField}>{this.state.age}</Text>

        <Text style={styles.labelField}>Correo electrónico</Text>
        <Text style={styles.dataField}>{this.state.email}</Text>

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
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20,
    },
  container: {
    backgroundColor: '#2B303A',
    fontFamily: 'sans-serif',
  },
  labelField: {
    fontSize: 20,
    color: '#D64933',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  dataField: {
    fontSize: 25,
    color: '#92DCE5',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
});