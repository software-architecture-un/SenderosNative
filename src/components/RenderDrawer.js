
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, 
    View, FlatList, TouchableOpacity, 
    Image, SafeAreaView } from 'react-native';
import ic_menu from '../images/list.png'
import Drawer from 'react-native-drawer'
import LocalStorage from '../components/LocalStorage.js'
console.disableYellowBox = true;

 class RenderDrawer extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        header: null
      };

      Logout = async () => {
        await LocalStorage.resetToken();
        await LocalStorage.resetEmail();
        
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={styles.menuContainer}>
                <FlatList
                    style={{ flex: 1.0 }}
                    data={menu}
                    extraData={this.state}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.menuTitleContainer}
                                onPress={this.Logout}
                            >
                                <Text style={styles.menuTitle}
                                    key={index}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    }} />
            </View>
        );
    }
}

export default RenderDrawer;