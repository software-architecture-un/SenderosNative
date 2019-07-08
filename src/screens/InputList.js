import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, Text, TextInput, Picker, TouchableOpacity } from 'react-native';
import GraphQLIP from '../connection/GraphQLIP.js';
import MapView, { Marker } from 'react-native-maps';
import LocalStorage from '../components/LocalStorage.js';


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



class InputList extends React.Component {

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
      mymaps: [],
      existPlace: '-1', // lugar seleccionado
      pickItems: [], //lugares ya creados para seleccionar
      myExistendsPlaceToAdd: [], //Lugares seleccionados para adicionar a la list
      pinsOfMap: [], //Los pines del mapa de list, multiples
      nameList: '',
      commentsList: '',
      description: "",
      name: "",
      coord: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
    }
    this.baseState = this.state;
  }

  async componentWillMount() {
    this.setState({ idUser: await LocalStorage.getId() });
    let url = GraphQLIP;
    let userId = await LocalStorage.getId();

    let query = `
    query {
        scoreresourceByuser(user_id: ${this.state.idUser}) {
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
        if (response.data.scoreresourceByuser.status === 200) {
          let myMaps = response.data.scoreresourceByuser.content;
          let pickers = [];
          for (let index = 0; index < myMaps.length; index++) {

            pickers.push(
              <Picker.Item label=
                {myMaps[index].name}
                value={index} />
            );
          }

          this.setState({ mymaps: myMaps })
          this.setState({ pickItems: pickers })
          // console.log('pickItems:', this.state.pickItems)
          // console.log('existPlace :', this.state.existPlace)
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
        <Picker
          selectedValue={this.state.existPlace}
          onValueChange={
            this.changeExistenPlace
          }
        >
          <Picker.Item label="Seleccione un lugar" value='-1' />
          {this.state.pickItems}
        </Picker>
        <TouchableOpacity
          onPress={this.addPlaceExistenced}
        >
          <Text style={styles.btnEnterText}>Adicionar este lugar</Text>
        </TouchableOpacity>

        <Text >Crear lugar</Text>

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
              coordinate={this.state.coord}
              onDragEnd={(e) => this.setState({ coord: e.nativeEvent.coordinate })}
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
            onChangeText={(name) => this.setState({ name: name })}
            value={this.state.name}
            autoCapitalize="none"
          />

          <Text style={styles.labelField}>Descripción</Text>
          <TextInput
            style={styles.inputDescription}
            placeholder="Ingrese la descripcion del lugar"
            onChangeText={(description) => this.setState({ description: description })}
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
          placeholder="Ingrese un nombre creativo para que recuerdes!!"
          onChangeText={(nameList) => this.setState({ nameList: nameList })}
          value={this.state.nameList}
          autoCapitalize="none"
        />

        <Text style={styles.labelField}>Commentarios</Text>
        <TextInput
          style={styles.inputDescription}
          placeholder="Notas pára recordar :)"
          onChangeText={(descriptionList) => this.setState({ descriptionList: descriptionList })}
          value={this.state.descriptionList}
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.btnEnter}
          onPress={this.safeListInMS}
        >
          <Text style={styles.btnEnterText}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  changeExistenPlace = async (value, value2) => {
    await this.setState({ existPlace: value });
  }

  addPlaceExistenced = () => {
    if (this.state.existPlace !== '-1') {
      let exitendsPlacesToAdd = this.state.myExistendsPlaceToAdd;
      let place = this.state.mymaps[this.state.existPlace];
      exitendsPlacesToAdd.push(
        place
      );
      this.setState({ myExistendsPlaceToAdd: exitendsPlacesToAdd })
      // console.log('Lugares a agregar:', this.state.myExistendsPlaceToAdd);
      let pins = this.state.pinsOfMap;

      pins.push(
        <Marker
          coordinate={{
            latitude: place.latitude,
            longitude: place.longitude
          }}
          key={pins.length}
          title={place.name}
          description={place.description}
          pinColor={randomColor()}
        ></Marker>
      )
      this.setState({ pinsOfMap: pins })
    }
  }

  safePlace = () => {
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
        if (response.data.createScoreResource.message === 'OK') {
          this.setState({
            myExistendsPlaceToAdd: [
              ...this.state.myExistendsPlaceToAdd,
              response.data.createScoreResource.content
            ]
          });

          this.setState({
            pinsOfMap: [
              ...this.state.pinsOfMap,
              (
                <Marker
                  coordinate={{
                    latitude: response.data.createScoreResource.content.latitude,
                    longitude: response.data.createScoreResource.content.longitude
                  }}
                  key={this.state.pinsOfMap.length}
                  title={response.data.createScoreResource.content.name}
                  description={response.data.createScoreResource.content.description}
                  pinColor={randomColor()}
                ></Marker>
              )
            ]
          })

        } else {
          alert(response.data.createScoreResource.message)
        }
        this.setState({ name: "" })
        this.setState({ description: "" })
        this.setState({ coord: { latitude: LATITUDE, longitude: LONGITUDE } })
      })
      .catch((error) => {
        alert(error.message)
      });

  }

  safeListInMS = async () => {
    let url = GraphQLIP;
    let query = `
        mutation{
          createList(list:{
            id_user: ${this.state.idUser}
            comment: "${this.state.descriptionList}"
            estimatedDate: "2019-01-01"
            name: "${this.state.nameList}"
          }  ){
         message
            content{
              id
              id_user
              name
              comment
              estimatedDate
            }
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

    console.log('Lista creada', response)
    if (response.data.createList.message === 'List was created') {
      let places = this.state.myExistendsPlaceToAdd;
      console.log('places a guardar:', places )
      for (let index = 0; index < places.length; index++) {
        await this.safePlacesInMS(response.data.createList.content.id, places[index]._id)
      }
      this.state = this.baseState;
      alert('Lista creada con exito')

    } else {
      alert(response.data.createList.message)

    }



  }

  safePlacesInMS = async (idList, idPlace) => {
    if (idList !== undefined && idPlace !== undefined) {
      let url = GraphQLIP;
      let query = `
        mutation{
          createPlace(
            place:{
            id_list: ${idList}
              id_place: ${idPlace}
            }
          ){
            content{
              id
              id_place
              id_list
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
      // response = await response.json();
      response = await response.json()

      console.log('Lugar guardado:', response)
      if (response.data.createPlace.message === '') {
        return true;
      } else {
        alert(response.data.createPlace.message)
        return false;
      }

    }
  }




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
export default InputList;
