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
                            <Card>
                                <CardItem
                                    header
                                    bordered
                                    button
                                    onPress={
                                        () => this.props.navigation.navigate('ViewList', { id })
                                    }>
                                    <Text>{myLists[index].name}</Text>
                                </CardItem>
                                <CardItem bordered>
                                    <Body>
                                        <Text>{myLists[index].comment}</Text>
                                        
                                    </Body>
                                </CardItem>
                            </Card>
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
});


export default ViewAllMyLists;