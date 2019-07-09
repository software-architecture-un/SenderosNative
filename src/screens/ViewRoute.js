import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import GraphQLIP from '../connection/GraphQLIP.js';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 4.6355555555556;
const LONGITUDE = -74.082777777778;
const LATITUDE_DELTA = 0.1; //0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class ViewRoute extends Component {
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
            initial: {},
            end: {},
            nameRoute: '',
            pinsOfMap: [],
            route: null,

        }
    }

    async componentWillMount() {

        let url = GraphQLIP;

        console.log('Component wil mount', this.props.navigation.state.params.id)
        let query = `
        query {
            findTrailById(id: "${this.props.navigation.state.params.id}") {
              id
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
        let response = await fetch(url, opts)
        response = await response.json();
        console.log('route in response:', response)
        if (response.data.findTrailById.id !== undefined
            && response.data.findTrailById.id !== null) {
            let initial = response.data.findTrailById.origintrail;
            let end = response.data.findTrailById.destinytrail;
            initial = await this.getPlaceOfMap(initial);
            end = await this.getPlaceOfMap(end);

            this.setState({ nameRoute: response.data.findTrailById.nametrail })
            this.setState({
                route:
                    <MapViewDirections
                        origin={{
                            latitude: initial.latitude,
                            longitude: initial.longitude
                        }}
                        destination={{
                            latitude: end.latitude,
                            longitude: end.longitude
                        }}
                        apikey={'AIzaSyCOJZ-oU1uV5KmoxNS9zWBr2emcUZWjXUc'}
                        strokeWidth={3}
                        strokeColor="hotpink"
                    />
            })


        }
    }

    getPlaceOfMap = async (idPlace) => {
        let url = GraphQLIP;
        let query = `
        query {
            scoreresourceById(_id: ${idPlace}) {
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

        response = await response.json()

        console.log('view place:', response)
        if (response.data.scoreresourceById.status === 200) {
            let place = response.data.scoreresourceById.content;
            let color = (this.state.pinsOfMap.length === 0) ? '#b30000' : '#004d00';
            this.setState({
                pinsOfMap: [
                    ...this.state.pinsOfMap,
                    (
                        <Marker
                            coordinate={{
                                latitude: place.latitude,
                                longitude: place.longitude
                            }}
                            key={this.state.pinsOfMap.length}
                            title={place.name}
                            pinColor={color}
                        ></Marker>
                    )
                ]
            });
            return place;
        } else {
            alert(response.data.scoreresourceById.message)
        }


    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.welcome}>{this.state.nameRoute}</Text>
                <View style={styles.outMaps}>
                    <MapView region={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                        provider={this.props.provider}
                        style={styles.map}>
                        {this.state.pinsOfMap}
                        {this.state.route}
                    </MapView>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2B303A',
        fontFamily: 'sans-serif',
    },
    welcome: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#D64933',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    map: {
        height: 350,
    },
    labelField: {
        fontSize: 20,
        color: '#92DCE5',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 0,
    },
    labelFieldDescription: {
        fontSize: 20,
        color: '#92DCE5',
        textAlign: 'center',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 0,
    },
    outMaps: {
        borderWidth: 4,
        marginVertical: 5,
        marginLeft: 30,
        marginRight: 30,
        borderStyle: 'solid',
        borderColor: '#92DCE5',
    },
});
export default ViewRoute;