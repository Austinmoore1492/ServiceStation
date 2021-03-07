import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput, Touchable } from 'react-native';
import colors from '../Colors';

import { AntDesign } from '@expo/vector-icons';
import tempData from '../tempData';

export default class ServiceModal extends React.Component {

    state = {
        name: this.props.list.name,
        color: this.props.list.color,
        service: this.props.list.service,
        data: this.props.list.date,
    }

    renderService = service => {
        return (
            <View style={styles.serviceContainer}>
                <View style={{flexDirection: 'column'}}>
                    <Text>{service.title}</Text>
                    <Text>Date: {service.date}</Text>
                </View>
            </View>
        )
    }

    render (){
        const taskCount = this.state.service.length
        const completedCount = this.state.service.filter(service => service.completed).length

        return (
            <SafeAreaView style={styles.container}>
                   <TouchableOpacity style={{position: 'absolute', top: 64, right: 32, zIndex: 10}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>
                <View style={[styles.section, styles.header, {borderBottomColor: this.state.color }]}>
                    <View>
                        <Text style={styles.title}>
                            {this.state.name}
                        </Text>
                        <Text style={styles.taskCount}>
                            {completedCount} of {taskCount} Services
                        </Text>
                    </View>
                </View>
                <View style={[styles.section, {flex: 3}]}>
                    <FlatList 
                    data={this.state.service} 
                    renderItem={({item}) => this.renderService(item)} 
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
                    showsVerticalScrollIndicator={false}
                    />
                </View>
                <KeyboardAvoidingView style={[styles.section, styles.footer]} behavior="padding">
                    <TextInput style={[styles.input, {borderColor: this.state.color}]} />
                    <TouchableOpacity style={[styles.addService, {backgroundColor: this.state.color}]}>
                        <AntDesign name='plus' size={16} color={colors.white} />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        flex:1,
        alignSelf: 'stretch',
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: colors.black,
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.grey,
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    addService: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    serviceContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
    }
})