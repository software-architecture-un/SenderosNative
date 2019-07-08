import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, TextInput, TouchableOpacity, Text } from 'react-native';
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

    async componentWillMount(){
        this.setState({idUser: await LocalStorage.getId()})
    }

    render() {
        return (
            <View>
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
                <View>
                <TextInput
                    placeholder="Ingrese el nombre del lugar"
                    onChangeText={(name) => this.setState({name: name })}
                    value={this.state.name}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Ingrese la descripcion del lugar"
                    onChangeText={(description) => this.setState({ description:  description})}
                    value={this.state.description}
                    autoCapitalize="none"
                />
                <TouchableOpacity 
                    onPress={this.safePlace}
                >
                    <Text>Guardar</Text>
                </TouchableOpacity>
                </View>
            </View>
           
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
        
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 400,
        width: 400,
    },
});

export default InputMap