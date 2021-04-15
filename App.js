import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, StatusBar, Modal } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import colors from './Colors';
import tempData from './tempData';
import ServiceList from './components/ServiceList';
import AddListModal from './components/AddListModal';


export default class App extends React.Component {
  state = {
    addServiceVisible: false,
    lists: tempData
  }

  toggleAddService() {
    this.setState({addServiceVisible: !this.state.addServiceVisible})
  }

  addList = list => {
    this.setState({ lists: [...this.state.lists, { ...list, id: this.state.lists.length + 1, service: [] }]})
  };

  updateList = list => {
    this.setState({
      lists: this.state.lists.map(item => {
        return item.id === list.id ? list : item
      })
    })
  };

  renderList = list => {
    return <ServiceList list={list} updateList={ this.updateList }/>
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <Modal animationType='slide' visible={this.state.addServiceVisible} onRequestClose={() => this.toggleAddService()}>
          <AddListModal closeModal={() => this.toggleAddService()} addList={this.addList}/>
        </Modal>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Service<Text style={{ fontWeight: '300', color: colors.blue }} >Station</Text>
          </Text>
          <View style={styles.divider} />
        </View>
     
        <View style={{ height: '50%', paddingLeft: 16, marginVertical: 125 }}>
          <FlatList 
            data={this.state.lists} 
            keyExtractor={item => item.id.toString()} 
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            renderItem={({item}) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
            />
        </View>
        <View style={styles.addListButton} >
          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddService()}>
            <AntDesign name="plus" size={16} color={colors.blue} ></AntDesign>
          </TouchableOpacity>
          <Text style={styles.add}>Add Vehicle</Text>
        </View>
      </View>

    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1d',
    alignItems: 'center',
    paddingTop: 100,
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.lightGrey,
    paddingHorizontal: 10,
  },
  addList: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 60,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addListButton: {
    position: 'absolute',
    bottom: 75,
    left: '50%',
    transform: [
      {
        translateX: "-30%"
      }]
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
    marginLeft: -9
  }
});
