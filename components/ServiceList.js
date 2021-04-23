import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions } from 'react-native';
import colors from '../Colors';
import ServiceModal from './ServiceModal';

export default class ServiceList extends React.Component {
    state = {
        showListVisible: false
    }

    toggleListModal() {
        this.setState({showListVisible: !this.state.showListVisible})
    }

    render(){
        const list = this.props.list;

        const completedCount = list.service.filter(service => service.completed).length;
        const remainingCount = list.service.length - completedCount;
        const { width } = Dimensions.get('window');

        return (
            <View>
                <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={() => this.toggleListModal()}>
                    <ServiceModal list={list} closeModal={() => this.toggleListModal()} updateList={ this.props.updateList }/>
                </Modal>
   <TouchableOpacity style={[styles.listContainer, {backgroundColor: list.color, shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 6 }, shadowOpacity: 0.8}]} onPress={() => this.toggleListModal()}>
                <Text style={styles.listTitle} numberOfLines={1}>{list.name}</Text>
                <Text style={styles.listTitle} numberOfLines={1}>{list.model}</Text>

                {/* Show total amount of service request needed to be completed and how many are completed */}
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.count}>{remainingCount}</Text>
                    <Text style={styles.subtitle}>Upcoming Service</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.count}>{completedCount}</Text>
                    <Text style={styles.subtitle}>Completed Services</Text>
                </View> 
            </TouchableOpacity>
            </View>
         
        )

    }
}

const styles = StyleSheet.create ({
    listContainer: {
        paddingVertical: 32,
        borderRadius: 6,
        marginRight: 50,
        alignItems: 'center',
        width: 250,
    },
    listTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 18,
    },
    count: {
        fontSize: 48,
        fontWeight: '200',
        color: colors.white,
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.white,
    }
})