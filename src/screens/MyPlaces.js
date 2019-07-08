import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import GraphQLIP from '../connection/GraphQLIP.js';
import MapView, {Marker} from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.025; //0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class MyPlaces extends React.Component {

    static navigationOptions = {
        //header: null
    };

    constructor(props) {
        super(props);
        this.state = { mymaps: [] }
    }

    componentWillMount() {
        let url = GraphQLIP;
        let query = `
        query {
            scoreresourceByuser(user_id: 1) {
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
                            <MapView
                                liteMode
                                key={`map_${myMaps._id}`}
                                style={styles.map}
                                initialRegion={region}
                            >
                                <Marker 
                                    coordinate={cood}
                                    title= {title}
                                    description={description}
                                ></Marker>
                        </MapView>
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
            <ScrollView style={StyleSheet.absoluteFillObject}>{this.state.mymaps}</ScrollView>
        );

    }



}

const styles = StyleSheet.create({
    map: {
        height: 200,
        marginVertical: 50,
    },
});
export default MyPlaces;