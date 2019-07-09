import React, { Component } from 'react';
import { Card, CardItem, Text, Body } from 'native-base';
import { StyleSheet, View, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import LocalStorage from '../components/LocalStorage.js';
import GraphQLIP from '../connection/GraphQLIP.js';

class ViewAllMyLists extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#2B303A',
            borderBottomColor: '#2B303A',
            borderBottomWidth: 0,
        },
    };

    constructor(props) {
        super(props);
        this.state = { myLists: [] }
    }

    async componentWillMount() {
        let url = GraphQLIP;
        let userId = await LocalStorage.getId();

        let query = `
        query {
            listsByUserId(id: ${userId}) {
              content {
                id
                id_user
                name
                comment
                estimatedDate
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
        fetch(url, opts)
            .then(response => response.json())

            .then(response => {
                console.log('Response in list:', response)
                if (response.data.listsByUserId.message === '') {
                    let lists = [];
                    let myLists = response.data.listsByUserId.content;
                    for (let index = 0; index < myLists.length; index++) {
                        let id = myLists[index].id
                        lists.push(
                            <TouchableOpacity style={styles.cardStyle}
                            button
                                    onPress={
                                        () => this.props.navigation.navigate('ViewList', { id })
                                    }>
                                <CardItem
                                    style={styles.cardItemStyle}
                                    header
                                    >
                                    <Text style={styles.titleStyle}>{myLists[index].name}</Text>
                                </CardItem>
                                <CardItem 
                                    style={styles.cardItemStyle}
                                    >
                                    
                                    <Text style={styles.descriptionStyle}>{myLists[index].comment}</Text>
                                </CardItem>
                            </TouchableOpacity>
                        );
                    }
                    this.setState({ myLists: lists });
                } else {
                    alert(response.data.listsByUserId.message)
                }

            })
            .catch((error) => {
                alert(error.message)
            });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.welcome}>Mis listas de lugares</Text>

                {this.state.myLists}
            </ScrollView>
        )
    };

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
      cardStyle: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 0,
        borderWidth: 6,
        borderStyle: 'solid',
        borderColor: '#92DCE5',
        backgroundColor: 'transparent'
      },
      cardItemStyle: {
        backgroundColor: "transparent",
      },
      titleStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#92DCE5',
        backgroundColor: 'transparent',
        textAlign: 'center',
      },
      descriptionStyle: {
        fontSize: 15,
        color: '#92DCE5',
        backgroundColor: 'transparent',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
});


export default ViewAllMyLists;