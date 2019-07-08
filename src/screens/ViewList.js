import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import GraphQLIP from '../connection/GraphQLIP.js';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 4.6355555555556;
const LONGITUDE = -74.082777777778;
const LATITUDE_DELTA = 0.1; //0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}

class ViewList extends Component {
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
            pinsOfMap: [], //Los pines del mapa de list, multiples
            nameList: '',
            commentsList: '',
        }

    }

    async componentWillMount() {
        console.log('Entra a component did amount 1')
        let url = GraphQLIP;
        console.log('Entra a component did amount 2')
        console.log('Component wil mount', this.props.navigation.state.params.id)
        let query = `
        query {
            listWhitPlacesByListId(id: ${this.props.navigation.state.params.id}) {
              content {
                id
                id_user
                name
                comment
                estimatedDate
                places {
                  id_place
                  id_list
                  id
                }
              }
              message
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
        console.log('list whit places:', response)
        if (response.data.listWhitPlacesByListId.message === ''
            && response.data.listWhitPlacesByListId.content.length > 0) {

            let places = response.data.listWhitPlacesByListId.content[0].places;
            console.log('places:', places)
            for (let index = 0; index < places.length; index++) {
                this.getPinsOfMap(places[index].id_place)
            }
            this.setState({ nameList: response.data.listWhitPlacesByListId.content[0].name })
            this.setState({ descriptionList: response.data.listWhitPlacesByListId.content[0].comment })


        }
    }

    getPinsOfMap = (idPlace) => {
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
        fetch(url, opts)
            .then(response => response.json())

            .then(response => {
                console.log('view place:', response)
                if (response.data.scoreresourceById.status === 200) {
                    let place = response.data.scoreresourceById.content;
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
                                    description={place.description}
                                    pinColor={randomColor()}
                                ></Marker>
                            )
                        ]
                    });
                } else {
                    alert(response.data.scoreresourceByuser.message)
                }


            })
            .catch((error) => {
                alert(error.message)
            });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.labelField}>Tu lista de lugares: </Text>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    {this.state.pinsOfMap}
                </MapView>
                <Text style={styles.labelField}>Nombre de la lista </Text>
                <TextInput
                    style={styles.input}
                    editable={false} selectTextOnFocus={false}
                    value={this.state.nameList}
                    autoCapitalize="none"
                />

                <Text style={styles.labelField}>Commentarios</Text>
                <TextInput
                    style={styles.inputDescription}
                    editable={false} selectTextOnFocus={false}
                    value={this.state.descriptionList}
                    autoCapitalize="none"

                />

                {/* <TouchableOpacity
                    style={styles.btnEnter}
                    onPress={this.safeListInMS}
                >
                    <Text style={styles.btnEnterText}>Guardar</Text>
                </TouchableOpacity> */}
            </ScrollView>
        );
    }
    ;

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2B303A',
        fontFamily: 'sans-serif',
    },
    map: {
        height: 300,
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
        // color: '#2B303A',
        paddingBottom: 20,
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
export default ViewList;