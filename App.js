import React, {Component} from "react";
import { StyleSheet, Text, View } from 'react-native';
import Home from "./screens/Home";
import MeteorScreen from "./screens/Meteor";
import ISSLocationScreen from "./screens/ISS";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack =  createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="ISSLocation" component={ISSLocationScreen}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Meteor" component={MeteorScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
