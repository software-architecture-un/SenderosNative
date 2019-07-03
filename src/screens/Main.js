import React, {Component} from 'react';
 //import { StyleSheet, View } from 'react-native';
import { Text, View, Container } from 'native-base';
import MenuHeader from '../components/MenuHeader'


export default class Main extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
       
        <Container>
           <MenuHeader/>
          <Text>
            Main page
          </Text>
        </Container>
     
   
    );
  }
}