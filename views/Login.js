import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Login extends Component {
  render() {
    return (
      <View>
        <Text>Iniciar sesión</Text>

        <TextInput
          placeholder="Correo electrónico"/>

        <TextInput
          placeholder="Contraseña"/>
      </View>
    );
  }
}
