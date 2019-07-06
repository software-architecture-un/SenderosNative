import {Component} from 'react';
import GraphQLIP from '../connection/GraphQLIP.js';
import AsyncStorage from '@react-native-community/async-storage';

export default class LocalStorage extends Component {
    constructor(props) {
        super(props);
        this.state = {token:""}
      }

    static async getToken() {
        try {
          console.log("Buscando el token en storage");
          const value = await AsyncStorage.getItem('jwt');
        
          return value;
        } catch (error) {
          console.log("Error retrieving data" + error);
        }
      }
    
      static async saveToken(value) {
        try {
          console.log('Guardando el token');
          console.log(value);
          await AsyncStorage.setItem('jwt', value);
        } catch (error) {
          console.log("Error saving data" + error);
        }
      }
    
      static async resetToken() {
        try {
          await AsyncStorage.removeItem('jwt');
          //const value = await AsyncStorage.getItem('jwt');
          // this.setState({myKey: value});
        } catch (error) {
          console.log("Error resetting data" + error);
        }
      }

      static async validateToken() {
        var token = await this.getToken()
        //.then(value => {
          //this.setState({token: token});     
          console.log("Token en validate: ", token)

          const query = `
          mutation {
            verifyToken(jwt: 
              {
                jwt: ${token}
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
            .then(value => value.json())
            .then(value => {
              if(value.data.verifyToken !== null) {
                console.log("Voy a enviar: ", value.data.verifyToken.content)
                return value.data.verifyToken.content;
              }
              else {
                return "No valid";
              }
            }) 
            .catch((error)=>{
              alert(error.message)
            });
          }
        //)
      //}

      render() {
        return null
      }
}