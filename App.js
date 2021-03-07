import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, StatusBar, Modal } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import colors from './Colors';
import tempData from './tempData';
import ServiceList from './components/ServiceList';
import AddListModal from './components/AddListModal';


export default class App extends React.Component {
  state = {
    addServiceVisible: false
  }

  toggleAddService() {
    this.setState({addServiceVisible: !this.state.addServiceVisible})
  }

  renderList = list => {
    return <ServiceList list={list} />
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
        />
        <Modal animationType='slide' visible={this.state.addServiceVisible} onRequestClose={() => this.toggleAddService()}>
          <AddListModal closeModal={() => this.toggleAddService()}/>
        </Modal>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Service<Text style={{ fontWeight: '300', color: colors.blue }} >Station</Text>
          </Text>
          <View style={styles.divider} />
        </View>
        <View style={{ marginVertical: 48 }} >
          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddService()}>
            <AntDesign name="plus" size={16} color={colors.blue} ></AntDesign>
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>
        </View>
        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList 
            data={tempData} 
            keyExtractor={item => item.name} 
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            renderItem={({item}) => this.renderList(item)}
            />
        </View>
      </View>

    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
    alignItems: 'center',
    paddingTop: 75,
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
    color: colors.black,
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
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  }
});