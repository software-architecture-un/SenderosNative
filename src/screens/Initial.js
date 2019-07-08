import Home from '../screens/Home.js'
import MainMenu from '../screens/MainMenu.js'
import LocalStorage from '../components/LocalStorage.js'
import React, {Component} from 'react';
import {View} from 'react-native';

export default class Initial extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    console.log("Los props de initial: ", super(props))

    this.state = {isValid:"", firstView:""}
  }

  async componentDidMount() {  
   
    var tokenObtained = await LocalStorage.validateToken();
    this.setState({isValid: tokenObtained})

    if(this.state.isValid === "Valid") {
      this.setState({firstView: 'FlatMenu'})
    }
    else {
      this.setState({firstView: 'Home'})
    }

    this.props.navigation.navigate(this.state.firstView);

    //this.props.navigation.navigate('Home');
  }

  render() {
    return (null);
  }
}