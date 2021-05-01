import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import colors from '../Colors';

import { AntDesign } from '@expo/vector-icons';
import tempData from '../tempData';

export default class AddListModal extends React.Component {
  backgroundColors = ['#c2211a', '#8022d9', '#0076be', '#005a5a', '#1b6f1b', '#405515', '#ffb101']

    state = {
      name: '',
      model: '',
      color: this.backgroundColors[0],
      errors: []
    }

    createService = () => {
      const {name, model, color} = this.state;
      let errors = []
      
      if(name === '' ){
        errors.push('name')
      } 
      if(model === '' ){
        errors.push('model')
      } 

      if (errors.length) { 
        this.setState({ errors });
        return;
      } 
      if(!errors.length) {
        const list = { name, model, color }

        this.props.addList(list)
        this.setState({ errors: [] });
        this.setState({ name: '', model: '' });
        this.props.closeModal();
      }
    }

    renderColors() {
      return this.backgroundColors.map(color => {
        return (
          <TouchableOpacity 
          key={color} 
          style={[styles.colorSelect, {backgroundColor: color}]}
          onPress={() => this.setState({ color })}
          />
        )
      })
    }

    render (){
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <TouchableOpacity style={{position: 'absolute', top: 64, right: 32, zIndex: 10 }} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={this.state.color} />
                </TouchableOpacity>

                <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
                    <Text style={styles.title}>Add A Vehicle</Text>

                    <TextInput 
                    style={[styles.input, {borderColor: this.state.errors.length ? 'red' : this.state.color}]} 
                    placeholder='Make'
                    placeholderTextColor='#7a7a7a'
                    onChangeText={text =>this.setState({ name: text })}
                    />

                    <TextInput 
                    style={[styles.input, {borderColor: this.state.errors.length ? 'red' : this.state.color}]} 
                    placeholder='Model'
                    placeholderTextColor='#7a7a7a'
                    onChangeText={text =>this.setState({ model: text })}
                    />

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
                      {this.renderColors()}
                    </View>

                    <TouchableOpacity style={[styles.create,{ backgroundColor: this.state.color, shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 6 }, shadowOpacity: 0.8}]} onPress={this.createService}>
                        <Text 
                        style={{color: colors.white, fontWeight: "600"}}>Add</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
    
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#062e3d',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.lightGrey,
        alignSelf: 'center',
        marginBottom: 16,
    },
    input: {
        borderWidth: 2,
        color: colors.lightGrey,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorSelect: {
      width: 30,
      height: 30,
      borderRadius: 4,
    }
})