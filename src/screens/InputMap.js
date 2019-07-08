import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, TextInput, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import GraphQLIP from '../connection/GraphQLIP.js';
import LocalStorage from '../components/LocalStorage.js';



const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 4.6355555555556;
const LONGITUDE = -74.082777777778;
const LATITUDE_DELTA = 0.025; //0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.00001;

class InputMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initial: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
            },
            coord:{
                latitude: LATITUDE,
                longitude: LONGITUDE,
            },
            description: "",
            name: ""

        };
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#2B303A',
            borderBottomColor: '#2B303A',
            borderBottomWidth: 0,
          },
      };

    async componentWillMount(){
        this.setState({idUser: await LocalStorage.getId()})
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.welcome}>Crear lugar</Text>

                <View style={styles.outMaps}>
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    <Marker
                        coordinate={this.state.initial}
                        onDragEnd={(e) => this.setState({coord: e.nativeEvent.coordinate})}
                        draggable
                    >
                    </Marker>
                </MapView>
                </View>
                <View>

                <Text style={styles.labelField}>Nombre</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese el nombre del lugar"
                    onChangeText={(name) => this.setState({name: name })}
                    value={this.state.name}
                    autoCapitalize="none"
                />

                <Text style={styles.labelField}>Descripción</Text>
                <TextInput
                    style={styles.inputDescription}
                    placeholder="Ingrese la descripcion del lugar"
                    onChangeText={(description) => this.setState({ description:  description})}
                    value={this.state.description}
                    autoCapitalize="none"
                />

                <TouchableOpacity
                    style={styles.btnEnter}
                    onPress={this.safePlace}
                >
                    <Text style={styles.btnEnterText}>Guardar</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
           
        );
    }

     safePlace =  () => {
        let url = GraphQLIP;
        let query = `
        mutation {
            createScoreResource(
                scoreresource: {
                  name: "${this.state.name}"
                  description: "${this.state.description}"
                  latitude: ${this.state.coord.latitude}
                  longitude: ${this.state.coord.longitude}
                  user_id: ${this.state.idUser}
                }
              ) {
                content {
                  _id
                  name
                  description
                  latitude
                  longitude
                  user_id
                }
                message
                status
              }
            
        }
          `;
          let opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
        };
        fetch(url, opts)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if (response.data.createScoreResource.message === 'OK') {
                alert('Lugar adicionado con exito')
            } else {
                alert(response.data.createScoreResource.message)
            }
            
            this.setState({name: ""})
            this.setState({description:""})
        })
        .catch((error)=>{
            alert(error.message)
          });
    
    }
}

InputMap.propTypes = {
    provider: ProviderPropType,
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2B303A',
        fontFamily: 'sans-serif',
      },
      welcome: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#D64933',
        textAlign: 'center',
        marginTop: 0,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
      },
      dataField: {
        fontSize: 25,
        color: '#92DCE5',
        textAlign: 'center',
        marginTop: 0,
        marginBottom: 10,
      },

  labelField: {
    fontSize: 20,
    color: '#D64933',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 0,
  },
  input: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
    padding: 5,
    fontSize: 20,
    backgroundColor: '#FFFFFF',
  },
  inputDescription: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
    padding: 5,
    fontSize: 20,
    backgroundColor: '#FFFFFF',
    height: 300,
  },
  btnEnter: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 15,
    padding: 5,
    backgroundColor: "#92DCE5",
    color: '#2B303A',
  },
  btnEnterText: {
    fontSize: 20,
    color: '#2B303A',
  },
      outMaps: {
          borderWidth: 4,
          marginVertical: 0,
          marginLeft: 10,
          marginRight: 10,
          borderStyle: 'solid',
          borderColor: '#92DCE5',
      },
      map: {
        height: 350,
      },
});

export default InputMap