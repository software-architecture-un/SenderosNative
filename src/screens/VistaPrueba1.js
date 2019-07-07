import React, {Component} from 'react';
import { Platform, StyleSheet, Text, 
  View, FlatList, TouchableOpacity, 
  Image, SafeAreaView  } from 'react-native';
import ic_menu from '../images/list.png'
import Drawer from 'react-native-drawer'
import GraphQLIP from '../connection/GraphQLIP.js';
import LocalStorage from '../components/LocalStorage.js'

export default class VistaPrueba1 extends Component {

  // static navigationOptions = {
  //   header: null
  // };

  constructor(props) {
    super(props);
    this.state = {email:"", password:"", resp:"", pruebaToken:""}
  }

  Logout = async () => {
    await LocalStorage.resetToken();
    await LocalStorage.resetEmail();
    
    this.props.navigation.navigate('Home');
}

  openDrawer() {
    this.drawer.open()
  }

  closeDrawer() {
      this.drawer.close()
  }

  renderDrawer() {
    //SlideMenu
    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuTitleContainer}
                onPress={this.Vista1Funcion}
            >
                <Text style={styles.menuTitle}>
                    VIsta 1
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuTitleContainer}
                onPress={() => this.props.navigation.navigate('VistaPrueba1')}
            >
                <Text style={styles.menuTitle}>
                    VIsta 2
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuTitleContainer}
                onPress={this.Logout}
            >
                <Text style={styles.menuTitle}>
                    Cerrar sesión
                </Text>
            </TouchableOpacity>

            {/* <FlatList
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
                }} /> */}
        </View>
    )
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

                <Text>Otra vista probandooooo</Text>
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