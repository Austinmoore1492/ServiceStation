import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import colors from '../Colors';

import { AntDesign } from '@expo/vector-icons';
import tempData from '../tempData';

export default class AddServiceModal extends React.Component {

    state = {
      name: '',
      date: '',
      type: '',
      completed: false,
      errors: []
    }

    createService = () => {
        const {name, date, type, color} = this.state;
        let errors = []
        
        if(name === '' ){
          errors.push('name')
        } 

        if(date === ''){
            errors.push('date')
        }

        if(type === ''){
            errors.push('type')
        }

        if (errors.length) { 
          this.setState({ errors });
          return;
        } 
        if(!errors.length) {
       
      let list = this.props.list;
      list.service.unshift({ title: this.state.name, date: this.state.date, type: this.state.type, completed: false})

      this.props.updateList(list);
      this.setState({ name: '', date: '', type: ''})
      this.props.closeModal();
        }
      }


    render (){
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <TouchableOpacity style={{position: 'absolute', top: 64, right: 32, zIndex: 10}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={this.props.color} />
                </TouchableOpacity>

                <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
                    <Text style={styles.title}>New Service</Text>

                    <TextInput 
                    style={[styles.input, {borderColor: this.state.errors.includes('name') ? 'red' : this.props.color}]} 
                    placeholder='Service Center'
                    placeholderTextColor='#7a7a7a'
                    onChangeText={text =>this.setState({ name: text })}
                    />
                     <TextInput 
                    style={[styles.input, {borderColor: this.state.errors.includes('type') ? 'red' : this.props.color}]} 
                    placeholder='Type, ex. Oil Change'
                    placeholderTextColor='#7a7a7a'
                    onChangeText={text =>this.setState({ type: text })}
                    />
                     <TextInput 
                    style={[styles.input, {borderColor: this.state.errors.includes('date') ? 'red' : this.props.color}]} 
                    placeholder='Date'
                    placeholderTextColor='#7a7a7a'
                    onChangeText={text =>this.setState({ date: text })}
                    />

                    <TouchableOpacity style={[styles.create, { backgroundColor: this.props.color, shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 6 }, shadowOpacity: 0.8 }]} onPress={this.createService}>
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