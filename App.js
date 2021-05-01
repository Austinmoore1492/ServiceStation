import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StatusBar,
  Modal,
  Dimensions,
  SafeAreaView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

import colors from "./Colors";
import tempData from "./tempData";
import ServiceList from "./components/ServiceList";
import AddListModal from "./components/AddListModal";

export default class App extends React.Component {
  state = {
    addServiceVisible: false,
    lists: tempData,
  };

  toggleAddService() {
    this.setState({ addServiceVisible: !this.state.addServiceVisible });
  }

  addList = (list) => {
    this.setState({
      lists: [
        ...this.state.lists,
        { ...list, id: this.state.lists.length + 1, service: [] },
      ],
    });
  };

  updateList = (list) => {
    this.setState({
      lists: this.state.lists.map((item) => {
        return item.id === list.id ? list : item;
      }),
    });
  };

  renderList = (list) => {
    return <ServiceList list={list} updateList={this.updateList} />;
  };

  render() {
    const { width } = Dimensions.get("window");

    return (
      <View style={styles.main}>
        <LinearGradient
          start={[1, 1]}
          end={[0, 0]}
          colors={["#0d4559", "#01141c"]}
        >
          <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Modal
              animationType="slide"
              visible={this.state.addServiceVisible}
              onRequestClose={() => this.toggleAddService()}
            >
              <AddListModal
                closeModal={() => this.toggleAddService()}
                addList={this.addList}
              />
            </Modal>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.divider} />
              <Text style={styles.title}>
                Service
                <Text style={{ fontWeight: "300", color: colors.blue }}>
                  Station
                </Text>
              </Text>
              <View style={styles.divider} />
            </View>
            <Text style={[styles.title, { marginTop: 75 }]}>Vehicles</Text>

            {/* VEHICLE RENDER */}
            <View style={styles.boxContainer}>
              <FlatList
                data={this.state.lists}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => this.renderList(item)}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{ paddingLeft: 32 }}
              />
            </View>

            {/* ADD BUTTON */}
            <View style={[styles.addListButton, { shadowColor: colors.shadow,
    shadowOffset: { width: 3, height: 6 }, shadowOpacity: 0.8}]} >
          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddService()}>
            <AntDesign name="plus" size={32} color={colors.blue} ></AntDesign>
            <Text style={{ paddingLeft: 8, color: colors.lightBlue }}>ADD</Text>
          </TouchableOpacity>
        </View>
            {/* <View style={{ width: '80%'}}>
          <TouchableOpacity style={[ styles.addList, { alignSelf: 'stretch', marginTop: -30} ]} onPress={() => this.toggleAddService()}>
              <Text 
              style={{color: colors.white, fontWeight: "600"}}>Add A New Vehicle</Text> 
          </TouchableOpacity>
          </View> */}
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: "100%",
  },
  container: {
    alignItems: "center",
    paddingVertical: 100,
    height: "100%",
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.lightGrey,
    paddingHorizontal: 10,
  },
  boxContainer: {
    height: "60%",
    width: "100%",
  },
  hideBox: {
    height: "100%",
    borderLeftColor: "#01141c",
    borderLeftWidth: 1,
  },
  addList: {
    backgroundColor: '#0d4559',
    position: 'relative',
    borderColor: colors.shadow,
    borderRadius: 60,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addListButton: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    elevation: 5,
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 16,
    marginTop: 8,
    marginLeft: -9
  }
});
