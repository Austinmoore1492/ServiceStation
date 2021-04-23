import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Modal } from 'react-native';

import colors from '../Colors';
import AddServiceModal from './AddServiceModal';

import { AntDesign } from '@expo/vector-icons';


export default class ServiceModal extends React.Component {

    state = {
        newService: '',
        addServiceVisible: false,
    }
    
      toggleAddService() {
        this.setState({addServiceVisible: !this.state.addServiceVisible})
      }

      toggleServiceCompleted = index => {
          let list = this.props.list;
          list.service[index].completed = !list.service[index].completed

          this.props.updateList(list)
      }

    renderService = (service, index) => {
        return (
            <View 
            style={[ styles.serviceContainer, { borderLeftColor: this.props.list.color }]}>
                <View style={{flexDirection: 'column', width: '100%' }}>
                <TouchableOpacity style={{ width: '100%' }} onPress={() => this.toggleServiceCompleted(index)}>
                    <Text style={{ color: colors.lightGrey }}>{service.title}</Text>
                    <Text style={{ color: colors.lightGrey }}>Type: {service.type}</Text>
                    <Text style={{ color: colors.lightGrey }}>Date: {service.date}</Text>
                    
                        <Text 
                        style={{ color: colors.lightGrey }}
                        >Completed: {service.completed ? 'Yes' : 'No'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render (){
        const list = this.props.list;

        const taskCount = list.service.length
        const completedCount = list.service.filter(service => service.completed).length

        return (
            <SafeAreaView style={styles.container}>
                   <TouchableOpacity style={{position: 'absolute', top: 64, right: 32, zIndex: 10}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={list.color} />
                </TouchableOpacity>
                <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
                    <View>
                        <Text style={styles.title}>
                            {list.name} {list.model}
                        </Text>

                        {/* Show amount of service orders complete */}
                        {/* <Text style={styles.taskCount}>
                            {completedCount} of {taskCount} {list.name}s Complete
                        </Text> */}
                    </View>
                </View>
                <View style={[styles.section,  {flex: 3}]}>
                    <FlatList 
                    style={styles.text}
                    data={list.service} 
                    renderItem={({item, index}) => this.renderService(item, index)} 
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
                    showsVerticalScrollIndicator={false}
                    />
                </View>

                <Modal animationType='slide' visible={this.state.addServiceVisible} onRequestClose={() => this.toggleAddService()}>
                    <AddServiceModal 
                    closeModal={() => this.toggleAddService()} 
                    color={list.color}
                    list={list}
                    updateList={this.props.updateList}
                    />
                </Modal>
                <TouchableOpacity 
                    onPress={() => this.toggleAddService()}
                    style={[ styles.addButton,{backgroundColor: list.color, shadowColor: colors.shadow,
                        shadowOffset: { width: 3, height: 6 }, shadowOpacity: 0.8} ]} 
                >
            
           
                     <Text style={styles.add}>Add New Service For Your {list.model}</Text>
              
            </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#062e3d',
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
        color: colors.lightGrey,
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.grey,
    },
    text: {
        color: colors.lightGrey,
    },
    addButton: {
        alignSelf: 'stretch', 
        marginVertical: 48, 
        flexDirection: 'row',
        marginHorizontal: 32,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 24, 
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    add: {
      color: colors.white,
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
        paddingVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
        marginBottom: 24,
        paddingLeft: 10
    }
})