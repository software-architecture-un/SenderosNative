import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import GraphQLIP from '../connection/GraphQLIP.js';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import LocalStorage from '../components/LocalStorage.js';
import MapViewDirections from 'react-native-maps-directions';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 4.6355555555556;
const LONGITUDE = -74.082777777778;
const LATITUDE_DELTA = 0.1; //0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class InputRoute extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#2B303A',
            borderBottomColor: '#2B303A',
            borderBottomWidth: 0,

        },
    };

    constructor(props) {
        super(props);
        this.state = {
            myPlaces: [],
            myPins: [],
            nametrail: '',
            labelInputMap: 'Ingrese el punto de partida',
            initial: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
            },
            coord: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
            },
            btnAddPlace: null,
            mapInit: '',
            route: null,
            btnSaveRoute: null,
        }
    }
    async componentDidMount() {
        this.setState({ idUser: await LocalStorage.getId() });
        this.setState({
            btnAddPlace:
                <TouchableOpacity
                    style={styles.btnEnter}
                    onPress={this.addPlace}
                >

                    <Text style={styles.btnEnterText}>Adicionar</Text>
                </TouchableOpacity>

        });

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.welcome}>{this.state.labelInputMap}</Text>

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
                            onDragEnd={(e) => this.setState({ coord: e.nativeEvent.coordinate })}
                            draggable
                        >
                        </Marker>
                    </MapView>
                </View>
                <View>

                    {this.state.btnAddPlace}

                </View>
                <Text style={styles.labelField}>Ruta</Text>
                <Text style={styles.labelField}>Nombre de la ruta</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese el nombre de la ruta"
                    onChangeText={(name) => this.setState({ nametrail: name })}
                    value={this.state.nametrail}
                    autoCapitalize="none"
                />
                <MapView region={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                    provider={this.props.provider}
                    style={styles.map}>
                    {this.state.myPins}
                    {this.state.route}
                </MapView>
                {this.state.btnSaveRoute}
            </ScrollView>
        );

    }

    saveRoute = async () => {
        let places = []
        for (let index = 0; index < this.state.myPlaces.length; index++) {
            let place = this.state.myPlaces[index];
            place.name = (index === 0) ? 'Inicio' : 'Final';
            places.push( await this.savePlace(place));
        }
        console.log('Id de los lugares:', places);
        let url = GraphQLIP;
        let query = `
        mutation {
            createTrail(trail: {
              usertrail: ${this.state.idUser}
              nametrail:"${this.state.nametrail}"
              origintrail: ${places[0]}
              destinytrail: ${places[1]}
            }){
              id
              usertrail
              nametrail
              origintrail
              destinytrail
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
                if (response.data.createTrail.id !== undefined
                    && response.data.createTrail.id !== null) {
                    alert("Ruta agregada con exito!!!!")
                } else {
                    alert("Error")
                }
            })
            .catch((error) => {
                alert(error.message)
            });
    }

    savePlace = async (place) => {
        let url = GraphQLIP;
        console.log('Lugar a guardar:', place)
        let query = `
        mutation {
            createScoreResource(
                scoreresource: {
                  name: "${place.name}"
                  description: " "
                  latitude: ${place.latitude}
                  longitude: ${place.longitude}
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
        let response = await fetch(url, opts)
        //   .then(response => response.json())
        response = await response.json()
        //   .then(response => {
            console.log(response)
        if (response.data.createScoreResource.message === 'OK') {
            return response.data.createScoreResource.content._id;
        } else {
            alert(response.data.createScoreResource.message)
            return false;
        }

        //   })
        //   .catch((error) => {
        //     alert(error.message)
        //   });

    }

    addPlace = async () => {
        if (this.state.myPlaces.length < 3) {
            await this.setState({
                myPlaces: [
                    ...this.state.myPlaces,
                    this.state.coord
                ]
            })
        }
        console.log('Places to add:', this.state.myPlaces.length)
        await this.setState({
            coord: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
            }
        })
        if (this.state.myPlaces.length === 1) {
            await this.setState({
                labelInputMap: 'Ingrese el punto de llegada'
            })
            await this.setState({
                myPins: [
                    ...this.state.myPins,
                    <Marker
                        coordinate={{
                            latitude: await this.state.myPlaces[0].latitude,
                            longitude: await this.state.myPlaces[0].longitude
                        }}
                        key='1'
                        title='Inicio'
                        pinColor={'#b30000'}
                    ></Marker>
                ]
            })

        }
        if (this.state.myPlaces.length === 2) {
            await this.setState({
                labelInputMap: ''
            })
            await this.setState({
                btnAddPlace: null
            })
            await this.setState({
                myPins: [
                    ...this.state.myPins,
                    <Marker
                        coordinate={{
                            latitude: await this.state.myPlaces[1].latitude,
                            longitude: await this.state.myPlaces[1].longitude
                        }}
                        key='2'
                        title='Llegada'
                        pinColor={'#004d00'}
                    ></Marker>
                ]
            })
            await this.setState({
                route:
                    <MapViewDirections
                        origin={await this.state.myPlaces[0]}
                        destination={await this.state.myPlaces[1]}
                        apikey={'AIzaSyCOJZ-oU1uV5KmoxNS9zWBr2emcUZWjXUc'}
                        strokeWidth={3}
                        strokeColor="hotpink"
                    />
            })
            await this.setState({
                btnSaveRoute:
                <TouchableOpacity
                    style={styles.btnEnter}
                    onPress={this.saveRoute}
                >
                    <Text style={styles.btnEnterText}>Guardar Ruta</Text>
                </TouchableOpacity>
            })

        }
        console.log('route :', this.state.route)
    }



}

InputRoute.propTypes = {
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

export default InputRoute;