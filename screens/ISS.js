import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Platform,
  Image
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default class ISSLocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }

  getLocation = () => {
    axios
      .get('https://api.wheretheiss.at/v1/satellites/25544')
      .then((response) => {
        this.setState({
          location: response.data,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    if (Object.keys(this.state.location).length == 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{color: 'red',fontSize:30}}>Loading...</Text>
        </View>
      );
    }
    else {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safe} />
        <ImageBackground
          source={require('../assets/iss_bg.jpg')}
          style={styles.background}>
          <View style={styles.header}>
            <Text style={styles.headerText}>ISS Location</Text>
          </View>
          <View style={styles.mapContainer}>
            <MapView 
            reigon= {{
              latitude: this.state.location.latitude,
              longitude: this.state.location.longitude,
              latitudeDelta: 100,
              longitudeDelta: 100
            }}
            style={styles.map}>
              <Marker coordinate={{latitude: this.state.location.latitude,
              longitude: this.state.location.longitude}}>
                <Image source={require("../assets/iss_icon.png")} style={styles.marker}/>
              </Marker>
            </MapView>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Latitude - {this.state.location.latitude}</Text>
            <Text style={styles.infoText}>Longitude  - {this.state.location.longitude}</Text>
            <Text style={styles.infoText}>Velocity (KPH) - {this.state.location.velocity}</Text>
            <Text style={styles.infoText}>Altitude (KM)  - {this.state.location.altitude}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    
  },
  marker: {
    height: 50,
    width: 50
  },
  map: {
    width: "100%",
    height: "100%"
  },
  mapContainer: {
    flex: 1
  },
  infoContainer: {
    flex: 0.2,
    backgroundColor: "lightblue",
    height: "5%",
    width: "100%",
    padding: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50
  },
  infoText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  }
});
