import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, View} from 'react-native';

export default class Main extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <Text>Main Page</Text>
      </View>
    );
  }
}