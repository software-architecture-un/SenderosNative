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
        
        const url = GraphQLIP;
        const token = await this.getToken();    
          console.log("Token en validate: ", token);
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
            
            const opts = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query })
            };

            let response = await fetch(url, opts)
             response = await response.json()
            
          if(response.data.verifyToken !== null) {
            console.log("Voy a enviar: ", response.data.verifyToken.content)
            return response.data.verifyToken.content;
          }
          else {
            return "No valid";
          }
      }  

      static async getEmail() {
        try {
          console.log("Buscando el email en storage");
          const value = await AsyncStorage.getItem('email');
        
          return value;
        } catch (error) {
          console.log("Error retrieving data" + error);
        }
      }
    
      static async saveEmail(value) {
        try {
          console.log('Guardando el email');
          console.log(value);
          await AsyncStorage.setItem('email', value);
        } catch (error) {
          console.log("Error saving data" + error);
        }
      }
    
      static async resetEmail() {
        try {
          await AsyncStorage.removeItem('email');
          //const value = await AsyncStorage.getItem('jwt');
          // this.setState({myKey: value});
        } catch (error) {
          console.log("Error resetting data" + error);
        }
      }

      static async getId() {
        try {
          console.log("Buscando el id en storage");
          const value = await AsyncStorage.getItem('id');

          console.log("Obtuve el ID: ", value);
        
          return value;
        } catch (error) {
          console.log("Error retrieving data" + error);
        }
      }
    
      static async saveId(value) {
        try {
          console.log('Guardando el id');
          console.log(value);
          await AsyncStorage.setItem('id', value);

          var storeId = await this.getId(value);
          console.log("Estoy guardando el it el ID: ", storeId)

        } catch (error) {
          console.log("Error saving data" + error);
        }
      }
    
      static async resetId() {
        try {
          await AsyncStorage.removeItem('id');
          //const value = await AsyncStorage.getItem('jwt');
          // this.setState({myKey: value});
        } catch (error) {
          console.log("Error resetting data" + error);
        }
      }

      render() {
        return null
      }
}