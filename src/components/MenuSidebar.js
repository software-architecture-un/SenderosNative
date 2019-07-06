import React, { Component } from 'react';
import { Content, ListItem, Left, Button,  Body, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LocalStorage from '../components/LocalStorage.js'

export default class MenuSidebar extends Component {

    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props);
      }

    render() {
        return (
            <Content style={{ backgroundColor: "#ffffff" }}>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#FF9501" }}>
                            <Icon active name="map" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Lugares</Text>
                    </Body>
                </ListItem>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#FF9501" }}>
                            <FontAwesome5 name={'route'} />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Rutas</Text>
                    </Body>
                </ListItem>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#FF9501" }}>
                            <Icon active name="map-signs" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Listas</Text>
                    </Body>
                </ListItem>

                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#FF9501" }}
                            onPress={this._logout}>
                            <Icon active name="map-signs" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Cerrar sesión</Text>
                    </Body>
                </ListItem>
            </Content>
        )
    };

    _logout = async () => {
        LocalStorage.resetToken()
      .then(res => {
        this.props.navigation.navigate('Main');
      }) 
      .catch((error)=>{
        alert(error.message)
      });
    }
}