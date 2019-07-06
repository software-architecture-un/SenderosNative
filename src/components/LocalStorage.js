import {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default class LocalStorage extends Component {
    constructor(props) {
        super(props);
      }

    static async getToken() {
        try {
          console.log("Buscando el token en storage");
          const value = await AsyncStorage.getItem('jwt');
          // this.setState({myKey: value});
          //alert(value);
        
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

      render() {
        return null
      }
}