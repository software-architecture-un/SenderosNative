import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, Text, View } from 'react-native';
import GraphQLIP from '../connection/GraphQLIP.js';
import MapView, { Marker } from 'react-native-maps';
import LocalStorage from '../components/LocalStorage.js';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.025; //0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class MyPlaces extends React.Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#2B303A',
            borderBottomColor: '#2B303A',
            borderBottomWidth: 0,
          },
      };

    constructor(props) {
        super(props);
        this.state = { mymaps: []}
    }

    async componentWillMount() {

        let url = GraphQLIP;
        let userId = await LocalStorage.getId();

        let query = `
        query {
            scoreresourceByuser(user_id: ${userId}) {
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
                if (response.data.scoreresourceByuser.status === 200) {
                    let mapArray = [];
                    let myMaps = response.data.scoreresourceByuser.content;
                    for (let index = 0; index < myMaps.length; index++) {
                        let region = {
                            latitude: myMaps[index].latitude,
                            longitude: myMaps[index].longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA
                        };
                        let cood = {
                            latitude: region.latitude,
                            longitude: region.longitude
                        };
                        let title = myMaps[index].name;
                        let description = myMaps[index].description;
                        mapArray.push(
                            <View style={styles.outMaps}>
                                <Text style={styles.dataField}>{title}</Text>

                                <MapView
                                    liteMode
                                    key={`map_${myMaps._id}`}
                                    style={styles.map}
                                    initialRegion={region}
                                >
                                <Marker
                                    coordinate={cood}
                                    title={title}
                                    description={description}
                                ></Marker>
                                </MapView>
                            </View>
                            
                        );

                    }
                    this.setState({ mymaps: mapArray })
                } else {
                    alert(response.data.scoreresourceByuser.message)
                }

                this.setState({ name: "" })
                this.setState({ description: "" })
            })
            .catch((error) => {
                alert(error.message)
            });
    }
    render() {
        return (
            <ScrollView style={styles.container}>

                <Text style={styles.welcome}>Lugares</Text>

                {this.state.mymaps}
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
        fontSize: 40,
        fontWeight: 'bold',
        color: '#D64933',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
      },
      dataField: {
        fontSize: 25,
        color: '#92DCE5',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 10,
      },
      outMaps: {
          borderWidth: 4,
          marginVertical: 10,
          marginLeft: 10,
          marginRight: 10,
          borderStyle: 'solid',
          borderColor: '#92DCE5',
      },
      map: {
        height: 300,
      },
});

export default MyPlaces;