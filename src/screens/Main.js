import React, {Component} from 'react';
 //import { StyleSheet, View } from 'react-native';
import { Text, View } from 'native-base';
import MenuHeader from '../components/MenuHeader'
import SideBar from '../components/MenuSidebar'


export default class Main extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
     
        <MenuHeader></MenuHeader>
     
   
    );
  }
}