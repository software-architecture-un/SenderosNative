import React, { Component } from 'react';
import { Platform, StyleSheet, Text, 
    View, FlatList, TouchableOpacity, 
    Image, SafeAreaView } from 'react-native';
import ic_menu from '../images/list.png'
import Drawer from 'react-native-drawer'
import LocalStorage from '../components/LocalStorage'
import RenderDrawer from '../components/RenderDrawer';

console.disableYellowBox = true;

const menu = [
    { 'title': 'Home' },
    { 'title': 'Wishlist' },
    { 'title': 'About us' },
    { 'title': 'Contact us' },
    { 'title': 'Log out' }
]

export default class Home extends Component {

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

    Vista1Funcion = async () => {
        this.closeDrawer.bind(this)
    }

    Vista2Funcion = async () => {
        this.openDrawer.bind(this)
    }

    renderDrawer() {
        //SlideMenu
        return (
            <RenderDrawer/>
        )
    }

    openDrawer() {
        this.drawer.open()
    }

    closeDrawer() {
        this.drawer.close()
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaStyle}>
                <View style={styles.mainContainer}>
                    <Drawer
                        ref={(ref) => this.drawer = ref}
                        content={this.renderDrawer()}
                        type='static'
                        tapToClose={true}
                        openDrawerOffset={0.35}
                        styles={drawerStyles}>
                        {/* //Main View */}
                        <View style={styles.headerContainer}>
                            <View style={styles.menuButton}>
                                <TouchableOpacity
                                    onPress={this.openDrawer.bind(this)}>
                                    <Image style={{ tintColor: 'white' }} source={ic_menu} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.headerTitle}>Senderos UN</Text>
                            <View style={styles.menuButton} />
                        </View>
                    </Drawer>

                    <Text>Prueba Main</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const drawerStyles = {
    drawer: {
        flex: 1.0,
        backgroundColor: '#3B5998',
    },
    main: {
        flex: 1.0,
        backgroundColor: 'white'
    }
}

const styles = {
    mainContainer: {
        flex: 1.0,
        backgroundColor: 'white'
    },
    safeAreaStyle: {
        flex: 1.0,
        backgroundColor: '#3B5998',
    },
    headerContainer: {
        height: 44,
        flexDirection: 'row',
        justifyContect: 'center',
        backgroundColor: '#3B5998',
    },
    headerTitle: {
        flex: 1.0,
        textAlign: 'center',
        alignSelf: 'center',
        color: 'white'
    },
    menuButton: {
        marginLeft: 8,
        marginRight: 8,
        alignSelf: 'center',
        tintColor: 'white'
    },
    menuContainer: {
        flex: 1.0,
        backgroundColor: '#3B5998',
    },
    menuTitleContainer: {
        alignItem:'center',
        height: 60,
        width:'100%',
        flexDirection:'row',
    },
    menuTitle: {
        width:'100%',
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        alignSelf:'center',
    }
}
