import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Platform,
  Dimensions,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import axios from 'axios';

export default class MeteorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meteor: {},
    };
  }

  getMeteor = () => {
    axios
      .get(
        'https://api.nasa.gov/neo/rest/v1/feed?api_key=3Bc7B2qcAorAnAIQbUJ2VMLx9UYejaTBGBVDhIOh'
      )
      .then((response) => {
        this.setState({
          meteor: response.data.near_earth_objects,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  componentDidMount() {
    this.getMeteor();
  }

  renderItem=({item})=>
  {
    var meteor = item;
    var bg_image,speed,size;
    if (meteor.threat_score <= 30)
    {
      bg_image = require("../assets/meteor_bg1.png");
      speed = require("../assets/meteor_speed1.gif");
      size = 100
    }
    else if (meteor.threat_score <= 75)
    {
      bg_image = require("../assets/meteor_bg2.png");
      speed = require("../assets/meteor_speed2.gif");
      size = 150;
    } else 
    {
      bg_image = require("../assets/meteor_bg3.png");
      speed = require("../assets/meteor_speed3.gif");
      size = 200;
    }
    return (<View>
      <ImageBackground source={bg_image} style={styles.backgroundImage}>
        <View style={styles.gifContainer}>
          <Image source={speed} style={{width: size, height: size, alignSelf: "center"}}/>
          <View>
            <Text style={[styles.cardTitle,{marginTop: 400,marginLeft: 50}]}>{item.name}</Text>
            <Text style={[styles.cardTitle,{marginTop: 20,marginLeft: 50}]}>Closest to Earth - {item.close_approach_data[0].close_approach_date_full}</Text>
            <Text style={[styles.cardTitle,{marginTop: 5,marginLeft: 50}]}>Minimum Diameter - {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
            <Text style={[styles.cardTitle,{marginTop: 5,marginLeft: 50}]}>Maximum Diameter - {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
            <Text style={[styles.cardTitle,{marginTop: 5,marginLeft: 50}]}>Velocity - {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
            <Text style={[styles.cardTitle,{marginTop: 5,marginLeft: 50}]}>Missing Earth by - {item.close_approach_data[0].miss_distance.kilometers}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>);
  }

  keyExtractor=(item,index)=>
  {
    index.toString();
  }

  render() {
    if (Object.keys(this.state.meteor).length == 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'red', fontSize: 30 }}>Loading...</Text>
        </View>
      );
    } else {
      let meteor_arr = Object.keys(this.state.meteor).map((date) => {
        return this.state.meteor[date];
      });
      let meteors = [].concat.apply([], meteor_arr);
      meteors.forEach((x) => {
        let diameter =
          (x.estimated_diameter.kilometers.estimated_diameter_min +
            x.estimated_diameter.kilometers.estimated_diameter_min) /
          2;
        let threatScore =
          (diameter / x.close_approach_data[0].miss_distance.kilometers) *
          1000000000;
        console.log(threatScore);
        x.threat_score = threatScore;
      });
      meteors.sort(function (a, b) {
        return b.threat_score - a.threat_score;
      });
      meteors = meteors.slice(0, 5); //slice(a,b) a is starting, b is one greater than the last index
      return (
        <View style={styles.container}>
          <FlatList
            data = {meteors}
            keyExtractor = {this.keyExtractor} //makes sure that the index is a character 
            renderItem = {this.renderItem} //how to render 
            horizontal = {true}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  titleBar: { flex: 0.15, justifyContent: 'center', alignItems: 'center' },
  titleText: { fontSize: 30, fontWeight: 'bold', color: 'white' },
  meteorContainer: { flex: 0.85 },
  listContainer: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 10,
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  cardText: { color: 'white' },
  threatDetector: { height: 10, marginBottom: 10 },
  gifContainer: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  meteorDataContainer: { justifyContent: 'center', alignItems: 'center' },
});
