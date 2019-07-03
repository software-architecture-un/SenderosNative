import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Drawer } from 'native-base';
import SideBar from '../components/MenuSidebar'


export default class MenuHeader extends Component {

    closeDrawer() {
        this._drawer._root.close()
    };

    openDrawer() {
        this._drawer._root.open()
       
    };

    render() {
        return (
            <Drawer
                ref={(ref) => { this._drawer = ref; }}
                content={<SideBar navigator={this._navigator} />}
                onClose={() => this.closeDrawer()} >
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.openDrawer()}>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Senderos UN</Title>
                        </Body>
                    </Header>
                </Container>
            </Drawer>
        );
    }

}