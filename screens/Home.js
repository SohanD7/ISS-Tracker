import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safe} />
        <ImageBackground
          source={require('../assets/bg_image.png')}
          style={styles.background}>
          <View style={styles.header}>
            <Text style={styles.headerText}>ISS Tracker</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("ISSLocation")}}>
            <Text style={styles.buttonText}>ISS Location</Text>
            <Text style={styles.knowMore}>{"Know More --->"}</Text>
            <Text style={styles.one}>1</Text>
            <Image source={require("../assets/iss_icon.png")} style={styles.buttonImage}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("Meteor")}}>
            <Text style={styles.buttonText}>Meteors</Text>
            <Text style={styles.knowMore}>{"Know More --->"}</Text>
            <Text style={styles.one}>2</Text>
            <Image source={require("../assets/meteor_icon.png")} style={styles.buttonImage}></Image>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
    flex: 0.2,
    borderRadius: 30,
    backgroundColor: 'rgba(52,52,52,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    alignItems: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 25,
    paddingLeft: 30,
  },
  knowMore: {
    paddingLeft: 30,
    color:"red",
    fontSize: 20
  },
  one: {
    color: "rgba(180,180,180,0.5)",
    fontSize: 150,
    right: 20,
    position: "absolute",
    bottom: -15,
    zIndex: -5
  },
  buttonImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    right: 20,
    top: -35,
    marginRight: 500,
    position: "absolute"
  }
});
