import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {Component} from 'react';
import CUSTOM_COLORS from '../constants/colors';
import {
  IC_Book,
  IC_Course,
  IC_Home,
  IC_Profile,
  IC_Schedule,
} from '../assets/iconsvg';
import CUSTOM_SIZES from '../constants/size';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../screens/HomeScreen';
import CourseScreen from '../../screens/CourseScreen';
import scale from '../constants/responsive';

const Tab = createBottomTabNavigator();

export default class NavigationBottomTab extends Component {
  render() {
    return (
        <NavigationContainer>
            <Tab.Navigator 
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                style: {
                    position: 'absolute',
                    height: scale(85, 'h'),
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    shadowColor: CUSTOM_COLORS.DarkGray, 
                    elevation: 3,
                },
            }}>
                <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View>
                            <IC_Home
                            fill = {focused ? CUSTOM_COLORS.primary : CUSTOM_COLORS.lightGray}
                            fill2 = {focused ? CUSTOM_COLORS.primary : 'transparent'} ></IC_Home>
                        </View>
                    ),
                }}/>
                <Tab.Screen 
                name="Course" 
                component={CourseScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View>
                            <IC_Book
                            fill = {focused ? CUSTOM_COLORS.primary : CUSTOM_COLORS.lightGray}
                            fill2 = {focused ? CUSTOM_COLORS.primary : 'transparent'} ></IC_Book>
                        </View>
                    ),
                }}
                />
                <Tab.Screen 
                name="Todo" 
                component={CourseScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View>
                            <IC_Schedule
                            fill = {focused ? CUSTOM_COLORS.primary : CUSTOM_COLORS.lightGray}
                            fill2 = {focused ? CUSTOM_COLORS.primary : 'transparent'} ></IC_Schedule>
                        </View>
                    ),
                }}
                />
                <Tab.Screen 
                name="Profile" 
                component={CourseScreen}
                options = {{
                    tabBarIcon: ({focused}) => (
                        <View>
                            <IC_Profile
                            fill = {focused ? CUSTOM_COLORS.primary : CUSTOM_COLORS.lightGray}
                            fill2 = {focused ? CUSTOM_COLORS.primary : 'transparent'} ></IC_Profile>
                        </View>
                    ),
                }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
 tabContainer: {

 }
});
